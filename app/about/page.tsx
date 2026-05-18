import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  Award,
  ShieldCheck,
  Users,
  MapPin,
  Wrench,
  Star,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About My Mechanic QLD | Mobile Mechanic Brisbane & SEQ',
  description:
    "Professional mobile mechanics with 15+ years of dealership experience, serving South East Queensland. Fixed-price quotes and a workmanship warranty on every job.",
  alternates: { canonical: '/about/' },
  openGraph: {
    title: 'About My Mechanic QLD',
    description:
      'Professional mobile mechanics built around the customer. Qualified, accountable, and involved in every job.',
    url: '/about/',
    type: 'website',
  },
}

const PRINCIPLES = [
  {
    Icon: Wrench,
    title: 'We come to the customer',
    body: 'No-one should lose half a day to a service. The van is the workshop. Home driveway, office car park, kerbside, we turn up where you are.',
  },
  {
    Icon: ShieldCheck,
    title: 'Fixed price, written upfront',
    body: 'You see the full price before we lift a spanner. If something else turns up mid-job, we stop and call you with a separate quote.',
  },
  {
    Icon: Award,
    title: 'Real parts, written warranty',
    body: 'OEM or quality aftermarket parts and fluids that meet or exceed manufacturer specifications. Sized for your vehicle. Backed by a workmanship warranty per our terms, in addition to your rights under the Australian Consumer Law.',
  },
  {
    Icon: Users,
    title: 'Hands-on, accountable',
    body: 'Every job is handled by a qualified mechanic who is invested in the outcome. Call the number above and you get one of us, not a call centre.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="eyebrow">About us</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4 text-balance">
              Professional mobile mechanics, built around the customer.
            </h1>
            <p className="lead mt-6">
              My Mechanic QLD brings 15+ years of dealership-floor experience to your driveway.
              Workshop-grade diagnostic equipment, OEM parts, fixed-price quotes and a workmanship
              warranty on every job.
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
          <div className="relative aspect-[4/5] min-h-[340px] lg:min-h-[440px] rounded-xl overflow-hidden border border-hairline">
            <Image
              src="/images/owner-on-job.webp"
              alt="My Mechanic QLD on a job beside the service van"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 md:py-20 lg:py-24 bg-surface border-y border-hairline">
        <div className="container max-w-3xl">
          <span className="eyebrow">Our story</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-8 max-w-[20ch]">
            Fifteen years inside dealership workshops. Then we changed the model.
          </h2>
          <div className="space-y-5 text-[1.0625rem] leading-[1.75] text-ink/90">
            <p>
              We spent our first fifteen years on the trade inside dealership workshops. Long enough
              to see the same scene repeat almost every day. A customer drops the car at 8am, takes
              an Uber to work, refreshes their phone all day, and comes back at 5 to a bill
              that&apos;s somehow $400 over the quote.
            </p>
            <p>
              That isn&apos;t how anyone should be treated. So we bought a service van, kitted it
              out with the same diagnostic gear and OEM parts we had in the workshop, and started
              turning up at people&apos;s houses instead. The work didn&apos;t change. The waiting
              room disappeared.
            </p>
            <p>
              Today the business covers South East Queensland with a qualified mobile mechanic at the wheel of every job.
              Logbook services, brake jobs, charging-system repairs, cooling-system overhauls,
              pre-purchase inspections. Same van. Same standards. Same fixed-price promise.
            </p>
            <p>
              The quote you see before we start is the quote you pay. If something on your car
              isn&apos;t right, call us directly on{' '}
              <a href="tel:0451159954" className="font-semibold">
                0451 159 954
              </a>
              . You&apos;ll get one of the mechanics, not a call centre.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <span className="eyebrow">What we stand for</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 max-w-[20ch]">
              Four principles, every job.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRINCIPLES.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-surface border border-hairline rounded-2xl p-6 md:p-7"
              >
                <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center mb-5">
                  <Icon className="size-[22px]" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2 leading-snug">{title}</h3>
                <p className="text-[0.9375rem] text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-12 md:py-16 bg-soft border-y border-hairline">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { Icon: Award, big: '15+ years', sub: 'In the trade' },
              { Icon: Star, big: 'Highly rated', sub: 'Customer reviews' },
              { Icon: MapPin, big: 'Mobile to you', sub: 'Brisbane, Logan, Ipswich & Gold Coast' },
            ].map(({ Icon, big, sub }) => (
              <div key={sub} className="flex flex-col items-center gap-2">
                <div className="size-12 rounded-xl bg-accent text-white grid place-items-center mb-1">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-ink tracking-tight">{big}</div>
                <div className="text-sm text-muted">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Workshop quality, your driveway.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Get a fixed-price quote for any job during business hours.
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
