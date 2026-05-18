import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  Check,
  Gauge,
  AlertTriangle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hilux Mechanic Brisbane | Mobile Hilux Service & Repair | My Mechanic QLD',
  description:
    "Mobile Hilux mechanic across Brisbane, Logan, Ipswich & Gold Coast. SR, SR5, Rogue, Workmate. Diesel servicing, DPF, brakes, suspension. Fixed-price quote in writing before any work begins.",
  alternates: { canonical: '/hilux-service/' },
  openGraph: {
    title: 'Mobile Hilux Mechanic Brisbane | My Mechanic QLD',
    description: 'On-site Hilux servicing and repairs across South East Queensland.',
    url: '/hilux-service/',
    type: 'website',
  },
}

const SITE_URL = 'https://www.mymechanicqld.com.au'

const VARIANTS = [
  { name: 'SR / SR5', note: 'Petrol & diesel, 2WD & 4WD' },
  { name: 'Rogue', note: '2.8L diesel 4WD' },
  { name: 'Rugged X', note: '2.8L diesel 4WD' },
  { name: 'Workmate', note: 'Petrol & diesel, cab chassis' },
  { name: 'GR Sport', note: '2.8L diesel 4WD' },
  { name: 'Older Hilux (1997–2015)', note: '3.0L 1KD-FTV, 2.5L 2KD-FTV' },
]

const COMMON_ISSUES = [
  {
    title: 'DPF clogging on short-tripped diesels',
    body: "The 1GD-FTV (2.8L, post-2015) diesel builds particulate matter in the DPF that needs a 30-minute highway run every couple of weeks to burn off. Trucks used only for the school run or kerbside trade work clog the filter, trigger a warning light, and need a forced regeneration. We do forced regens on-site.",
  },
  {
    title: 'EGR cooler and intake manifold carbon buildup',
    body: "Diesel Hilux engines route exhaust gas back through the intake (the EGR system). Soot accumulates on the intake valves and inside the cooler over time. By 120,000 km, most diesel Hilux engines benefit from an intake clean. Symptoms: rough idle, occasional black smoke under acceleration, P040x fault codes.",
  },
  {
    title: 'Injector wear and stiction on 1KD-FTV (pre-2015)',
    body: "The older 3.0L 1KD-FTV is a strong engine that suffers from injector tip wear by 200,000 km. Symptoms: hard cold starts, rough idle, white smoke on cold mornings. Injector replacement is a workshop job; we diagnose and refer.",
  },
  {
    title: 'Front upper ball joints on IFS Hilux',
    body: "The independent front suspension on Hilux models from 2005 onwards wears at the upper ball joints first (clunk on speed bumps, vague steering at speed). We replace pairs on-site.",
  },
  {
    title: 'Cracked chassis on heavily-towed dual-cabs',
    body: "Dual-cab Hilux trucks used for fleet towing past their rated capacity sometimes develop chassis cracks near the rear shock mounts or the chassis-rail-to-tray bolts. We always inspect this on pre-purchase inspections of used Hilux dual-cabs. The crack is hard to fix and often a walk-away.",
  },
  {
    title: 'Auto transmission flushes (AB60F)',
    body: "Hilux auto transmissions (the AB60F 6-speed) need a fluid drain-and-fill every 60,000 km even though the official Toyota schedule is silent on it. We drop the pan, replace the filter, and drain-and-fill with the correct WS-spec fluid.",
  },
]

const SERVICE_INTERVALS = [
  { model: 'Hilux 1GD-FTV (2015 onwards)', interval: '15,000 km or 12 months' },
  { model: 'Older Hilux 1KD-FTV / 2KD-FTV (pre-2015 diesel)', interval: '10,000 km or 6 months' },
  { model: 'Hilux petrol (2TR-FE 4-cylinder)', interval: '15,000 km or 12 months' },
  { model: 'Hilux used heavily for towing or off-road', interval: 'Halve the manufacturer interval' },
]

export default function HiluxServicePage() {
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mobile Hilux mechanic Brisbane',
    serviceType: 'Toyota Hilux servicing and repair',
    provider: {
      '@type': 'AutoRepair',
      name: 'My Mechanic QLD',
      url: SITE_URL,
      telephone: '+61451159954',
    },
    areaServed: [
      { '@type': 'City', name: 'Brisbane' },
      { '@type': 'City', name: 'Logan' },
      { '@type': 'City', name: 'Ipswich' },
      { '@type': 'City', name: 'Gold Coast' },
    ],
    brand: { '@type': 'Brand', name: 'Toyota Hilux' },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Hilux service', item: `${SITE_URL}/hilux-service/` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Hilux specialist · Mobile</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Mobile Hilux mechanic, Brisbane to Gold Coast.
          </h1>
          <p className="lead mt-6">
            From the work-fleet Workmate to the trail-ready Rogue, we service every Hilux on-site
            across South East Queensland. Diesel DPF work, EGR cleaning, brakes, suspension,
            logbook services. OEM-spec parts. Workmanship warranty per our terms, plus your
            Australian Consumer Law rights.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href={"/book/" as `/${string}`} className="btn btn-primary">
              Get a quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn btn-secondary">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>

      {/* Variants */}
      <section className="py-12 md:py-16 bg-surface border-y border-hairline">
        <div className="container max-w-4xl">
          <span className="eyebrow">Hilux variants we service</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-8">
            Every Hilux generation from 1997 onwards.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {VARIANTS.map((v) => (
              <div key={v.name} className="bg-bg border border-hairline rounded-xl p-4 flex items-center gap-3">
                <div className="size-9 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
                  <Check className="size-[18px]" strokeWidth={2.25} />
                </div>
                <div>
                  <div className="font-semibold text-ink leading-tight">{v.name}</div>
                  <div className="text-[0.8125rem] text-muted">{v.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service intervals */}
      <section className="py-14 md:py-20">
        <div className="container max-w-3xl">
          <div className="flex gap-3 items-start mb-6">
            <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
              <Gauge className="size-[22px]" strokeWidth={1.75} />
            </div>
            <div>
              <span className="eyebrow">Service intervals</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
                Hilux servicing schedule.
              </h2>
            </div>
          </div>
          <p className="prose-mmq mb-6">
            Newer 1GD-FTV diesels (2015 onwards) run a 15,000 km / 12-month interval. Older 1KD-FTV
            diesels need 10,000 km / 6 months. Anything towed or used off-road should be on the
            shorter interval regardless of model year.
          </p>
          <div className="overflow-x-auto border border-hairline rounded-xl">
            <table className="w-full border-collapse min-w-[480px]">
              <thead className="bg-soft">
                <tr>
                  <th className="text-left text-xs font-semibold text-subtle uppercase tracking-[0.06em] p-3.5 border-b border-hairline">Model</th>
                  <th className="text-left text-xs font-semibold text-subtle uppercase tracking-[0.06em] p-3.5 border-b border-hairline">Interval</th>
                </tr>
              </thead>
              <tbody>
                {SERVICE_INTERVALS.map((row, i) => (
                  <tr key={row.model} className={i % 2 === 1 ? 'bg-soft/40' : 'bg-surface'}>
                    <td className="text-[0.9375rem] p-3.5 border-b border-hairline/60 text-ink/90">{row.model}</td>
                    <td className="text-[0.9375rem] p-3.5 border-b border-hairline/60 font-semibold text-ink">{row.interval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common issues */}
      <section className="py-14 md:py-20 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <div className="flex gap-3 items-start mb-8">
            <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
              <AlertTriangle className="size-[22px]" strokeWidth={1.75} />
            </div>
            <div>
              <span className="eyebrow">Common Hilux issues we see</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
                The faults that come up most.
              </h2>
            </div>
          </div>
          <div className="space-y-5">
            {COMMON_ISSUES.map((issue) => (
              <div key={issue.title} className="bg-surface border border-hairline rounded-xl p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 leading-snug">{issue.title}</h3>
                <p className="text-[0.9375rem] text-muted leading-relaxed">{issue.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing callout */}
      <section className="py-14 md:py-20">
        <div className="container max-w-3xl">
          <div className="bg-surface border border-hairline rounded-2xl p-6 md:p-8">
            <span className="eyebrow">Hilux pricing</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-4">
              Fixed price, in writing, before any work begins.
            </h2>
            <p className="text-[0.9375rem] text-muted leading-relaxed mb-5">
              Hilux pricing depends on your variant, engine, kilometres and what specifically needs
              doing. We will not quote a flat figure that subsidises one job from another. Call us
              with your model, year and what is happening and we will give you a real number on the
              spot.
            </p>
            <p className="text-[0.875rem] text-muted">
              See <Link href={"/pricing/" as `/${string}`} className="text-accent-bright font-semibold">how our pricing works</Link>{' '}
              for the principles behind every quote.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Book a mobile Hilux mechanic.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Fixed-price quote before any work begins. Same-day service available for breakdowns
            and DPF callouts.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={"/book/" as `/${string}`} className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent">
              Get a quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn bg-transparent text-white border-white/40 hover:bg-white/10">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
