import type { Metadata } from 'next'
import { ArrowRight, Phone, ShieldCheck, DollarSign, Clock, BadgeCheck } from 'lucide-react'
import QuoteForm from '@/components/QuoteForm'

export const metadata: Metadata = {
  title: 'Get a Quote | Book a Mobile Mechanic Brisbane, Logan & Gold Coast',
  description:
    'Tell us about your car and we come back with a fixed-price quote during business hours. Same-day service available.',
  alternates: { canonical: '/book/' },
  openGraph: {
    title: 'Book a mobile mechanic | My Mechanic QLD',
    description: 'Send us your details and we come back with a fixed-price quote. Workmanship warranty on every job.',
    url: '/book/',
    type: 'website',
  },
}

const TRUST = [
  { Icon: DollarSign, label: 'Fixed-price quote upfront' },
  { Icon: ShieldCheck, label: 'Workmanship warranty on every job' },
  { Icon: BadgeCheck, label: 'Warranty-safe logbook servicing' },
  { Icon: Clock, label: 'Same-day service available' },
]

const NEXT_STEPS = [
  {
    n: 1,
    title: 'We confirm your quote',
    body: 'During business hours, we will email you a fixed price plus the soonest time we can come out.',
  },
  {
    n: 2,
    title: 'We agree a time',
    body: 'You pick the day and place. Home driveway, office car park, kerbside. Most weekdays we can fit you in inside the week.',
  },
  {
    n: 3,
    title: 'We turn up and do the job',
    body: 'Fully qualified, fully equipped. We text you when we arrive and again when we are done.',
  },
]

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>
}) {
  const { submitted } = await searchParams

  return (
    <>
      {/* Hero + form */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Left: intro */}
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Get a quote</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
              Tell us what&apos;s happening with your car.
            </h1>
            <p className="lead mt-6">
              Send us your details and we come back with a fixed-price quote during business hours.
              The more detail you give us up front, the more accurate the quote.
            </p>

            <ul className="grid gap-3 mt-8">
              {TRUST.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                  <div className="size-9 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
                    <Icon className="size-[18px]" strokeWidth={2} />
                  </div>
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-8 p-5 rounded-xl bg-soft border border-hairline">
              <div className="text-xs font-semibold text-ink uppercase tracking-[0.05em] mb-2">
                In a hurry?
              </div>
              <p className="text-[0.9375rem] text-muted leading-relaxed mb-4">
                For breakdowns and same-day callouts, the phone is faster than the form.
              </p>
              <a href="tel:0451159954" className="btn btn-primary inline-flex">
                <Phone className="size-4" strokeWidth={2} />
                0451 159 954
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-surface border border-hairline rounded-2xl p-6 md:p-8 lg:p-10">
            <QuoteForm submitted={!!submitted} redirectTo="/book/" />
          </div>
        </div>
      </section>

      {/* What happens next */}
      {!submitted && (
        <section className="py-14 md:py-20 bg-surface border-y border-hairline">
          <div className="container max-w-4xl">
            <div className="mb-10 text-center">
              <span className="eyebrow">After you submit</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
                What happens next.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {NEXT_STEPS.map((step) => (
                <div key={step.n} className="flex gap-5 items-start">
                  <div className="size-12 rounded-full bg-accent text-white grid place-items-center font-bold shrink-0 text-lg">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink mb-2">{step.title}</h3>
                    <p className="text-[0.9375rem] text-muted leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Prefer to call?
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Mon to Fri 7am to 6pm, Sat 8am to 5pm. You&apos;ll get one of the mechanics, not a call
            centre.
          </p>
          <a
            href="tel:0451159954"
            className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent"
          >
            <Phone className="size-4" strokeWidth={2} />
            0451 159 954
          </a>
        </div>
      </section>
    </>
  )
}
