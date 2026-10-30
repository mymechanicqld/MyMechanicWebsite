import type { Metadata } from 'next'
import {
  Phone, ArrowRight, MapPin, Clock, DollarSign, ShieldCheck, Scale, CreditCard,
  Wrench, Car, Star, CheckCircle2, MessageSquare,
} from 'lucide-react'
import QuoteForm from '@/components/QuoteForm'
import ReviewCarousel from '@/components/ReviewCarousel'
import StickyCallBar from '@/components/StickyCallBar'

export const metadata: Metadata = {
  title: 'Mobile Mechanic Near You | We Come To You | My Mechanic QLD',
  description:
    'Mobile mechanic across Brisbane, Logan, Ipswich and the Gold Coast. Open 24/7. We come to your home or work, quote a fixed price upfront and price match written quotes. Call 0451 159 954.',
  alternates: { canonical: '/mobile-mechanic/' },
  // Paid-traffic landing page — keep out of the organic index to avoid
  // duplicate-content competition with the homepage and area pages.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Mobile Mechanic Near You | My Mechanic QLD',
    description:
      'Open 24/7. We come to your home or work across SE Queensland. Fixed upfront quote, and we price match written quotes.',
    url: '/mobile-mechanic/',
    type: 'website',
  },
}

// 6 real Google reviews (kept in sync with the homepage). No dates: they go stale.
const REVIEWS = [
  { quote: 'Over the last two weeks I had My Mechanic QLD replace the rear brake pads and rotors and the front control arms on my 2011 Hyundai iX35. Shanty and Norman did an exceptional job. Same-day callout, spot-on pricing and timeframes. I cannot praise Shanty enough.', name: 'Greg Gillham', place: 'Brisbane', stars: 5 },
  { quote: "My car wasn't working on Christmas Eve and everywhere was closed. They came out within 2 hours and diagnosed and fixed the issue within 10 minutes. Definitely paying for convenience, but also great service.", name: 'Holly Wilkinson', place: 'Brisbane', stars: 5 },
  { quote: 'Car brakes decided to die, one call and they were there within 2 hours all fixed and on our way. Very reasonable pricing for the service they provide. Will definitely use again.', name: 'Jake', place: 'Brisbane', stars: 5 },
  { quote: 'Thank you for a fast and reliable service. Really appreciate your help replacing my new car battery.', name: 'Miriama Tiatia', place: 'Brisbane', stars: 5 },
  { quote: 'Shanty was so kind and honest when he came to look at my car. Appreciate the help from the phone calls with the lovely lady in admin organising everything, to Shanty and the other worker being thorough but quick when they arrived.', name: 'Soph Denholm', place: 'Brisbane', stars: 5 },
  { quote: 'Responded to my inquiry within 15 minutes. They had my car back in operation 2 hours later. They were friendly and quick and I will definitely use them again.', name: 'Douglas Woolard', place: 'Brisbane', stars: 5 },
] as const

// Mirrors the offers in the ads. Price match is always "written quotes, same job".
const TRUST = [
  { Icon: Clock, label: 'Open 24/7. Call any time' },
  { Icon: DollarSign, label: 'Fixed upfront quote' },
  { Icon: Scale, label: 'We price match written quotes for the same job' },
  { Icon: Car, label: 'Same day where available' },
  { Icon: MessageSquare, label: 'Talk directly with the mechanic' },
  { Icon: ShieldCheck, label: 'Workmanship guaranteed' },
  { Icon: CreditCard, label: 'Afterpay available' },
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

export default function MobileMechanicLanding() {
  return (
    <main className="pb-24 lg:pb-0">
      {/* ── Hero + form (above the fold) ─────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1fr_1.05fr] gap-9 lg:gap-14 items-start">
          {/* Left: pitch */}
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Brisbane, Logan, Ipswich and Gold Coast</span>
            <h1 className="text-[2.1rem] sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
              Mobile mechanic, we come to you
            </h1>
            <p className="lead mt-5">
              Open 24/7. Call any time and we arrange a mechanic in your area. Servicing and repairs
              at your home or work across Brisbane, Logan, Ipswich and the northern Gold Coast.
            </p>

            {/* Rating line (real Google reviews) */}
            <a
              href="https://g.page/r/CSJT8_It4K0WEAI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 mt-6 w-fit hover:opacity-80 transition-opacity"
              aria-label="Read our reviews on Google"
            >
              <span className="text-gold inline-flex gap-px">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-[18px] fill-current" strokeWidth={1.5} />
                ))}
              </span>
              <span className="text-[0.9375rem] text-ink font-semibold underline underline-offset-2">Read our Google reviews</span>
            </a>

            {/* Primary actions */}
            <div className="flex flex-wrap gap-3 mt-7">
              <a href="tel:0451159954" className="btn btn-primary text-base px-6 py-3.5">
                <Phone className="size-[18px]" strokeWidth={2} />
                Call now, 24/7
              </a>
              <a href="#quote" className="btn btn-secondary text-base px-6 py-3.5">
                Get a fixed quote
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
            <div className="mb-5">
              <h2 className="text-xl font-bold text-ink">Get your fixed-price quote</h2>
              <p className="text-[0.9375rem] text-muted mt-1">
                Call any time, 24/7. Online requests are answered by the next business day.
              </p>
            </div>
            <QuoteForm redirectTo="/mobile-mechanic/" />
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
              Reviews from our customers.
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
            Call any time, 24/7, or send your details for a fixed-price quote.
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
