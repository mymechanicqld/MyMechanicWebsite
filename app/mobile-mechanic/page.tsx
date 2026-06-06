import type { Metadata } from 'next'
import {
  Phone, ArrowRight, MapPin, Clock, DollarSign, ShieldCheck, BadgeCheck,
  Wrench, Car, Star, CheckCircle2,
} from 'lucide-react'
import QuoteForm from '@/components/QuoteForm'
import ReviewCarousel from '@/components/ReviewCarousel'
import StickyCallBar from '@/components/StickyCallBar'

export const metadata: Metadata = {
  title: 'Mobile Mechanic Near You | We Come To You | My Mechanic QLD',
  description:
    'Qualified mobile mechanic across Brisbane, Logan, Ipswich and the Gold Coast. We come to your home or work. Fixed-price quote upfront, same-day service available. Call 0451 159 954.',
  alternates: { canonical: '/mobile-mechanic/' },
  // Paid-traffic landing page — keep out of the organic index to avoid
  // duplicate-content competition with the homepage and area pages.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Mobile Mechanic Near You | My Mechanic QLD',
    description:
      'We come to your home or work across SE Queensland. Fixed-price quote upfront, same-day service available.',
    url: '/mobile-mechanic/',
    type: 'website',
  },
}

// 6 real Google reviews (kept in sync with the homepage).
const REVIEWS = [
  { quote: 'Over the last two weeks I had My Mechanic QLD replace the rear brake pads and rotors and the front control arms on my 2011 Hyundai iX35. Shanty and Norman did an exceptional job. Same-day callout, spot-on pricing and timeframes. I cannot praise Shanty enough.', name: 'Greg Gillham', place: 'Brisbane', when: '4 months ago', stars: 5 },
  { quote: "My car wasn't working on Christmas Eve and everywhere was closed. They came out within 2 hours and diagnosed and fixed the issue within 10 minutes. Definitely paying for convenience, but also great service.", name: 'Holly Wilkinson', place: 'Brisbane', when: '4 months ago', stars: 5 },
  { quote: 'Car brakes decided to die, one call and they were there within 2 hours all fixed and on our way. Very reasonable pricing for the service they provide. Will definitely use again.', name: 'Jake', place: 'Brisbane', when: '3 months ago', stars: 5 },
  { quote: 'Thank you for a fast and reliable service. Really appreciate your help replacing my new car battery.', name: 'Miriama Tiatia', place: 'Brisbane', when: '3 months ago', stars: 5 },
  { quote: 'Shanty was so kind and honest when he came to look at my car. Appreciate the help from the phone calls with the lovely lady in admin organising everything, to Shanty and the other worker being thorough but quick when they arrived.', name: 'Soph Denholm', place: 'Brisbane', when: '2 months ago', stars: 5 },
  { quote: 'Responded to my inquiry within 15 minutes. They had my car back in operation 2 hours later. They were friendly and quick and I will definitely use them again.', name: 'Douglas Woolard', place: 'Brisbane', when: '2 months ago', stars: 5 },
] as const

const TRUST = [
  { Icon: Car, label: 'We come to your home or work' },
  { Icon: DollarSign, label: 'Fixed-price quote upfront' },
  { Icon: Clock, label: 'Same-day service available' },
  { Icon: ShieldCheck, label: 'Workmanship guaranteed' },
]

const SERVICES = [
  'Brake repairs', 'Logbook & general servicing', 'Battery replacement',
  'Warning-light diagnostics', 'Alternator & starter motor', 'Radiator & cooling',
  'Steering & suspension', 'Pre-purchase inspections', 'Breakdowns & car won’t start',
]

const AREAS = [
  'Sunnybank', 'Mount Gravatt', 'Carindale', 'Carina', 'Cannon Hill', 'Wynnum',
  'Capalaba', 'Cleveland', 'Browns Plains', 'Logan', 'Loganholme', 'Beenleigh',
  'Springwood', 'Hamilton', 'Greenslopes', 'Ipswich', 'Goodna', 'Helensvale', 'Ormeau',
]

export default async function MobileMechanicLanding({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>
}) {
  const { submitted } = await searchParams

  return (
    <main className="pb-24 lg:pb-0">
      {/* ── Hero + form (above the fold) ─────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1fr_1.05fr] gap-9 lg:gap-14 items-start">
          {/* Left: pitch */}
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Mobile mechanic, we come to you</span>
            <h1 className="text-[2.1rem] sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
              A qualified mechanic at your driveway, today.
            </h1>
            <p className="lead mt-5">
              No towing, no workshop wait. We service and repair your car at your home or work
              across Brisbane, Logan, Ipswich and the Gold Coast. Fixed-price quote upfront.
            </p>

            {/* Rating line (real Google reviews) */}
            <div className="flex items-center gap-2.5 mt-6">
              <span className="text-gold inline-flex gap-px">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-[18px] fill-current" strokeWidth={1.5} />
                ))}
              </span>
              <span className="text-[0.9375rem] text-ink font-semibold">5-star rated</span>
              <span className="text-[0.9375rem] text-subtle">by drivers across SE Queensland</span>
            </div>

            {/* Primary actions */}
            <div className="flex flex-wrap gap-3 mt-7">
              <a href="tel:0451159954" className="btn btn-primary text-base px-6 py-3.5">
                <Phone className="size-[18px]" strokeWidth={2} />
                Call 0451 159 954
              </a>
              <a href="#quote" className="btn btn-secondary text-base px-6 py-3.5">
                Get a fixed-price quote
                <ArrowRight className="size-[18px]" strokeWidth={2} />
              </a>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3 mt-8">
              {TRUST.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                  <div className="size-9 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
                    <Icon className="size-[18px]" strokeWidth={2} />
                  </div>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div id="quote" className="bg-surface border border-hairline rounded-2xl p-6 md:p-8 scroll-mt-24">
            {!submitted && (
              <div className="mb-5">
                <h2 className="text-xl font-bold text-ink">Get your fixed-price quote</h2>
                <p className="text-[0.9375rem] text-muted mt-1">
                  Tell us about your car. We reply during business hours, or call for same-day.
                </p>
              </div>
            )}
            <QuoteForm submitted={!!submitted} redirectTo="/mobile-mechanic/" />
          </div>
        </div>
      </section>

      {/* ── What we do ───────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-surface border-y border-hairline">
        <div className="container">
          <div className="flex items-center gap-3 mb-7">
            <Wrench className="size-5 text-accent-bright" strokeWidth={2} />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">What we do, at your place</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {SERVICES.map((s) => (
              <div key={s} className="flex items-center gap-2.5 text-[0.9375rem] text-ink">
                <CheckCircle2 className="size-[18px] text-accent shrink-0" strokeWidth={2} />
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-9">
            <span className="eyebrow">What local drivers say</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3">
              Real reviews from real customers.
            </h2>
          </div>
          <ReviewCarousel reviews={REVIEWS} />
        </div>
      </section>

      {/* ── Areas ────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-soft border-y border-hairline">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 text-accent-bright font-semibold mb-3">
            <MapPin className="size-[18px]" strokeWidth={2} />
            <span className="eyebrow !mb-0">Where we come to you</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            Servicing your suburb across South East Queensland.
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {AREAS.map((a) => (
              <span key={a} className="inline-block px-3 py-1.5 rounded-md text-[0.875rem]
                                       bg-bg border border-hairline text-ink">
                {a}
              </span>
            ))}
            <span className="inline-block px-3 py-1.5 rounded-md text-[0.875rem] text-subtle">
              + many more nearby
            </span>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[24ch] mx-auto mb-4">
            Car trouble? We will come to you.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Call now for same-day service, or send your details for a fixed-price quote.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:0451159954" className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent text-base px-6 py-3.5">
              <Phone className="size-[18px]" strokeWidth={2} />
              0451 159 954
            </a>
            <a href="#quote" className="btn bg-transparent text-white border-white/40 hover:bg-white/10 text-base px-6 py-3.5">
              Get a quote
              <ArrowRight className="size-[18px]" strokeWidth={2} />
            </a>
          </div>
        </div>
      </section>

      <StickyCallBar />
    </main>
  )
}
