import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react'
import CoverageChecker from '@/components/CoverageChecker'

export const metadata: Metadata = {
  title: 'Coverage Checker | Does My Mechanic QLD Cover My Suburb?',
  description:
    "Enter your suburb or postcode to confirm we cover your area. Mobile mechanic across Brisbane, Logan, Ipswich and the Gold Coast.",
  alternates: { canonical: '/check-coverage/' },
  openGraph: {
    title: 'Coverage checker | My Mechanic QLD',
    description: "Check in two seconds whether we come to your suburb. Postcode or suburb name works.",
    url: '/check-coverage/',
    type: 'website',
  },
}

export default function CheckCoveragePage() {
  return (
    <>
      {/* Hero + checker */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Coverage checker</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Do we come to your suburb?
          </h1>
          <p className="lead mt-6">
            Type your suburb name or postcode below. We will tell you straight, including expected
            response time on a typical weekday.
          </p>

          <div className="mt-9 p-5 sm:p-7 rounded-2xl border border-hairline bg-surface shadow-[0_1px_2px_rgba(12,10,9,.04)]">
            <CoverageChecker />
          </div>

          <div className="mt-6 text-[0.875rem] text-subtle">
            Tip: we accept both suburb names (Sunnybank, Carindale, Springfield) and 4-digit
            postcodes (4109, 4152, 4300).
          </div>
        </div>
      </section>

      {/* Coverage map / facts */}
      <section className="py-14 md:py-20 bg-surface border-y border-hairline">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-bg border border-hairline rounded-2xl p-6">
              <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center mb-4">
                <MapPin className="size-[22px]" strokeWidth={1.75} />
              </div>
              <h2 className="text-lg font-semibold mb-2">Wide coverage area</h2>
              <p className="text-[0.9375rem] text-muted leading-relaxed">
                Measured from Springwood, our home base on Brisbane's Southside. Covers Brisbane,
                Logan, Ipswich and the northern Gold Coast.
              </p>
            </div>
            <div className="bg-bg border border-hairline rounded-2xl p-6">
              <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center mb-4">
                <Clock className="size-[22px]" strokeWidth={1.75} />
              </div>
              <h2 className="text-lg font-semibold mb-2">30 to 90 min response</h2>
              <p className="text-[0.9375rem] text-muted leading-relaxed">
                Fastest in Logan and southern Brisbane (30 to 45 min). Up to 75 to 90 min for the
                northern Gold Coast or the outer Brisbane suburbs.
              </p>
            </div>
            <div className="bg-bg border border-hairline rounded-2xl p-6">
              <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center mb-4">
                <Phone className="size-[22px]" strokeWidth={1.75} />
              </div>
              <h2 className="text-lg font-semibold mb-2">Borderline? Call us.</h2>
              <p className="text-[0.9375rem] text-muted leading-relaxed">
                For borderline suburbs (outer Ipswich, far Northside Brisbane, or anywhere a
                little beyond the standard radius), we sometimes stretch with a small travel fee.
                The phone is the quickest answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Confirmed we cover you? Book a quote.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Fixed-price quote during business hours. Same-day appointments common.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={"/book/" as `/${string}`}
              className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent"
            >
              Get a quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a
              href="tel:0451159954"
              className="btn bg-transparent text-white border-white/40 hover:bg-white/10"
            >
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
