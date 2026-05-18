'use client'

import { useState, useMemo, FormEvent } from 'react'
import Link from 'next/link'
import { CheckCircle2, AlertCircle, XCircle, Phone, ArrowRight, Search } from 'lucide-react'

// Suburbs we fully cover. Lowercase, no punctuation.
const COVERED_SUBURBS: Record<string, { region: string; response: string }> = {
  // Brisbane
  'sunnybank': { region: 'Brisbane', response: '60 min' },
  'mt gravatt': { region: 'Brisbane', response: '45 min' },
  'mount gravatt': { region: 'Brisbane', response: '45 min' },
  'carindale': { region: 'Brisbane', response: '60 min' },
  'wynnum': { region: 'Brisbane (Bayside)', response: '60 min' },
  'cleveland': { region: 'Brisbane (Bayside)', response: '75 min' },
  'chermside': { region: 'Brisbane (Northside)', response: '75 min' },
  'aspley': { region: 'Brisbane (Northside)', response: '75 min' },
  'sandgate': { region: 'Brisbane (Northside)', response: '90 min' },
  'indooroopilly': { region: 'Brisbane (Westside)', response: '75 min' },
  'toowong': { region: 'Brisbane (Westside)', response: '75 min' },
  'nundah': { region: 'Brisbane (Northside)', response: '75 min' },
  'kelvin grove': { region: 'Brisbane (Inner)', response: '75 min' },
  'coorparoo': { region: 'Brisbane (Inner)', response: '60 min' },
  'bulimba': { region: 'Brisbane (Inner)', response: '60 min' },
  'forest lake': { region: 'Brisbane (Southside)', response: '60 min' },
  'redcliffe': { region: 'Brisbane (Northside)', response: '90 min' },
  // Logan (home base)
  'springwood': { region: 'Logan (home base)', response: '30 min' },
  'beenleigh': { region: 'Logan', response: '45 min' },
  'browns plains': { region: 'Logan', response: '45 min' },
  'loganholme': { region: 'Logan', response: '30 min' },
  'logan': { region: 'Logan', response: '45 min' },
  // Ipswich
  'springfield': { region: 'Ipswich', response: '60 min' },
  'springfield lakes': { region: 'Ipswich', response: '60 min' },
  'goodna': { region: 'Ipswich', response: '60 min' },
  'redbank plains': { region: 'Ipswich', response: '60 min' },
  'brassall': { region: 'Ipswich', response: '75 min' },
  'ipswich': { region: 'Ipswich', response: '75 min' },
  // Northern Gold Coast
  'coomera': { region: 'Gold Coast (North)', response: '60 min' },
  'helensvale': { region: 'Gold Coast (North)', response: '60 min' },
  'nerang': { region: 'Gold Coast (North)', response: '75 min' },
  'southport': { region: 'Gold Coast', response: '75 min' },
  'robina': { region: 'Gold Coast', response: '90 min' },
  'oxenford': { region: 'Gold Coast (North)', response: '60 min' },
  'upper coomera': { region: 'Gold Coast (North)', response: '60 min' },
  'pacific pines': { region: 'Gold Coast (North)', response: '60 min' },
}

// Suburbs we might cover with a small travel surcharge, case by case
const BORDERLINE_SUBURBS = new Set([
  'capalaba', 'manly', 'shorncliffe', 'caboolture', 'north lakes',
  'burpengary', 'ferny grove', 'samford', 'ipswich heights',
  'gatton', 'rosewood', 'beaudesert', 'tamborine',
  'broadbeach', 'burleigh heads', 'burleigh', 'mermaid beach',
])

// Postcodes we fully cover
const COVERED_POSTCODES = new Set([
  // Brisbane Southside
  '4101', '4102', '4103', '4104', '4105', '4106', '4107', '4108', '4109',
  '4110', '4111', '4112', '4113', '4114', '4115', '4116', '4117', '4118',
  '4119', '4120', '4121', '4122', '4123', '4151', '4152', '4153', '4154',
  '4155', '4156', '4157', '4158', '4159', '4160', '4161', '4163', '4164',
  '4165', '4169', '4170', '4171', '4172', '4173',
  // Brisbane Northside
  '4000', '4005', '4006', '4007', '4010', '4011', '4012', '4013', '4014',
  '4017', '4018', '4019', '4020', '4034', '4035', '4036', '4051', '4053',
  '4054', '4055', '4059', '4060', '4061', '4064', '4065', '4066', '4067',
  '4068', '4069', '4070', '4073', '4074', '4075', '4076', '4077',
  // Logan
  '4124', '4125', '4127', '4128', '4129', '4130', '4131', '4132', '4133',
  // Ipswich
  '4300', '4301', '4303', '4304', '4305',
  // Northern Gold Coast
  '4209', '4210', '4211', '4212', '4213', '4214', '4215', '4216',
])

type Result =
  | { kind: 'covered'; region: string; response: string }
  | { kind: 'borderline' }
  | { kind: 'not-covered' }
  | { kind: 'invalid' }

function normalise(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/\bsaint\b/g, 'st')
    .replace(/[.,]/g, '')
    .replace(/\s+/g, ' ')
}

function check(query: string): Result {
  const q = normalise(query)
  if (!q) return { kind: 'invalid' }

  // Postcode lookup
  if (/^\d{4}$/.test(q)) {
    if (COVERED_POSTCODES.has(q)) {
      return { kind: 'covered', region: 'Covered area', response: 'Within 60–90 min typically' }
    }
    return { kind: 'not-covered' }
  }

  // Suburb lookup
  if (q in COVERED_SUBURBS) return { kind: 'covered', ...COVERED_SUBURBS[q] }
  if (BORDERLINE_SUBURBS.has(q)) return { kind: 'borderline' }

  // Partial match: if the input contains a covered suburb name, count as covered
  for (const suburb of Object.keys(COVERED_SUBURBS)) {
    if (q.includes(suburb)) return { kind: 'covered', ...COVERED_SUBURBS[suburb] }
  }

  return { kind: 'not-covered' }
}

export default function CoverageChecker() {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => (submitted ? check(query) : null), [query, submitted])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const reset = () => {
    setQuery('')
    setSubmitted(false)
  }

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 size-[18px] text-subtle"
            strokeWidth={2}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (submitted) setSubmitted(false)
            }}
            placeholder="Suburb or postcode (e.g. Sunnybank or 4109)"
            aria-label="Enter your suburb or postcode"
            className="w-full pl-11 pr-4 py-3.5 rounded-lg border border-border bg-surface text-ink
                       text-[1rem] placeholder:text-subtle/70
                       focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary justify-center px-6 py-3.5 shrink-0"
        >
          Check coverage
        </button>
      </form>

      {result && <ResultPanel result={result} onReset={reset} />}
    </div>
  )
}

function ResultPanel({ result, onReset }: { result: Result; onReset: () => void }) {
  if (result.kind === 'invalid') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-5 p-5 rounded-xl border border-border bg-soft text-muted text-[0.9375rem]"
      >
        Please enter a suburb name or postcode.
      </div>
    )
  }

  if (result.kind === 'covered') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-5 p-5 sm:p-6 rounded-xl border border-emerald-300 bg-emerald-50"
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="size-6 text-emerald-700 shrink-0 mt-0.5" strokeWidth={2} />
          <div className="flex-1">
            <div className="font-bold text-emerald-900 text-lg">Yes, we cover that area.</div>
            <p className="text-emerald-900/85 mt-1.5 text-[0.9375rem]">
              {result.region}. Typical response time: <strong>{result.response}</strong>.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href={"/book/" as `/${string}`} className="btn btn-primary">
                Get a quote
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <a
                href="tel:0451159954"
                className="btn btn-secondary bg-white"
              >
                <Phone className="size-4" strokeWidth={2} />
                0451 159 954
              </a>
              <button
                type="button"
                onClick={onReset}
                className="text-[0.875rem] text-emerald-900/80 underline self-center ml-1"
              >
                Check another
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (result.kind === 'borderline') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-5 p-5 sm:p-6 rounded-xl border border-amber-300 bg-amber-50"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="size-6 text-amber-700 shrink-0 mt-0.5" strokeWidth={2} />
          <div className="flex-1">
            <div className="font-bold text-amber-900 text-lg">Borderline — call us.</div>
            <p className="text-amber-900/85 mt-1.5 text-[0.9375rem]">
              That area is just outside our usual 50–60 km radius. Some weeks we can stretch a bit
              further with a small travel surcharge. The fastest way to find out is a quick phone
              call.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="tel:0451159954" className="btn btn-primary">
                <Phone className="size-4" strokeWidth={2} />
                Call 0451 159 954
              </a>
              <button
                type="button"
                onClick={onReset}
                className="text-[0.875rem] text-amber-900/80 underline self-center ml-1"
              >
                Check another
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-5 p-5 sm:p-6 rounded-xl border border-hairline bg-surface"
    >
      <div className="flex items-start gap-3">
        <XCircle className="size-6 text-subtle shrink-0 mt-0.5" strokeWidth={2} />
        <div className="flex-1">
          <div className="font-bold text-ink text-lg">Outside our coverage area.</div>
          <p className="text-muted mt-1.5 text-[0.9375rem]">
            We work a wide stretch of South East Queensland from Springwood (Brisbane Southside). If you are sure
            of the suburb name and it should be in range, call us and we will check the postcode
            properly. Otherwise, you may be better served by a mobile mechanic local to your area.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <a href="tel:0451159954" className="btn btn-secondary">
              <Phone className="size-4" strokeWidth={2} />
              Call to double-check
            </a>
            <button
              type="button"
              onClick={onReset}
              className="text-[0.875rem] text-muted underline self-center ml-1"
            >
              Check another
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
