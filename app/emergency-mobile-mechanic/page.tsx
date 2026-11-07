import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone, TriangleAlert, Check } from 'lucide-react'
import WhyBookStrip from '@/components/WhyBookStrip'
import StickyCallBar from '@/components/StickyCallBar'
import SimpleFaq, { faqSchema, type FaqEntry } from '@/components/SimpleFaq'
import { SITE_URL } from '@/lib/business'

export const metadata: Metadata = {
  title: '24 Hour Mobile Mechanic Brisbane & Logan | My Mechanic QLD',
  description:
    "Car won't start or broken down? We are open 24/7. Call any time and we arrange a mobile mechanic in your area across Brisbane, Logan, Ipswich and the northern Gold Coast.",
  alternates: { canonical: '/emergency-mobile-mechanic/' },
  openGraph: {
    title: '24 hour mobile mechanic | My Mechanic QLD',
    description: "Car won't start or broken down? Open 24/7. Call any time and we arrange a mechanic in your area.",
    url: '/emergency-mobile-mechanic/',
    type: 'website',
  },
}

const QUOTE_HREF = '/book/?service=emergency-breakdown'

const SAFETY = [
  'Move the car off the road if you can do it safely, and turn on your hazard lights.',
  'If you are on a motorway or a busy road and cannot get clear, stay safe away from traffic.',
  'If anyone is hurt or the car is a danger to other traffic, call 000 first.',
  'Then call us on 0451 159 954 and tell us the car, where you are and what happened.',
]

const ON_THE_SPOT = [
  { title: 'Flat or failed battery', body: 'We test the battery and charging system, then fit a new battery if that is the fault.' },
  { title: 'Starter motor and alternator', body: 'Clicking, slow cranking or a battery light. We find which part has failed and replace it where we can.' },
  { title: 'Overheating', body: 'Leaking hoses, radiators, water pumps and thermostats. We check the cooling system before the car is driven again.' },
  { title: 'Warning lights', body: 'We read the fault codes and check the fault by hand, so you know whether the car is safe to drive.' },
  { title: 'Brake problems', body: 'Grinding, a soft pedal or a brake warning light. We inspect the brakes and quote the repair.' },
]

const FAQS: FaqEntry[] = [
  {
    q: 'Are you really open 24 hours?',
    a: 'Yes. We are open 24/7 for calls. Call 0451 159 954 any time, day or night, and we arrange a mechanic in your area.',
  },
  {
    q: 'How quickly can a mechanic get to me?',
    a: 'It depends on where you are, the time and the jobs already booked. When you call, we give you a realistic time for your area rather than a promise we cannot keep.',
  },
  {
    q: "My car won't start. Is it the battery?",
    a: 'Often, but not always. Dim lights and a slow crank usually point to the battery, a single click with bright lights often points to the starter, and a car that starts but goes flat again can be the alternator. We test before we replace anything.',
  },
  {
    q: 'What if the car cannot be fixed where it is?',
    a: 'Some faults need a workshop. If that is the case, we tell you straight away, so you are not paying for work that will not fix the car.',
  },
  {
    q: 'How much does an emergency call-out cost?',
    a: 'We quote a fixed price before any work begins, so you know the cost upfront. If you have a written quote from another business for the same job, we will match it. Afterpay is available.',
  },
]

export default function EmergencyMobileMechanicPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '24 hour mobile mechanic', item: `${SITE_URL}/emergency-mobile-mechanic/` },
    ],
  }

  return (
    <div className="pb-24 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />

      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="eyebrow">Breakdowns and car won&apos;t start</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4 text-balance">
              24 hour mobile mechanic
            </h1>
            <p className="lead mt-5">
              Car won&apos;t start or broken down? We are open 24/7. Call any time and we arrange
              a mechanic in your area across Brisbane, Logan, Ipswich and the northern Gold Coast.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="tel:0451159954" className="btn btn-primary text-base px-6 py-3.5">
                <Phone className="size-[18px]" strokeWidth={2} />
                Call now, 24/7
              </a>
              <Link href={QUOTE_HREF as `/${string}`} className="btn btn-secondary text-base px-6 py-3.5">
                Send your details
                <ArrowRight className="size-[18px]" strokeWidth={2} />
              </Link>
            </div>
            <WhyBookStrip className="mt-7" />
          </div>
          <div className="relative aspect-[3/2] rounded-xl overflow-hidden border border-hairline">
            <Image
              src="/images/section-emergency-real.webp"
              alt="Service van parked behind a ute with its bonnet up at a roadside job"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Safety first */}
      <section className="py-12 md:py-16 bg-surface border-y border-hairline">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <TriangleAlert className="size-6 text-accent-bright" strokeWidth={2} />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Broken down? Do this first.</h2>
          </div>
          <ol className="space-y-3 list-decimal pl-5 text-[1.0625rem] text-ink/90 leading-relaxed">
            {SAFETY.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we fix */}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <span className="eyebrow">Fixed where the car is</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-4">What we can fix on the spot.</h2>
          <p className="text-[1.0625rem] text-muted leading-relaxed max-w-[65ch] mb-8">
            Most breakdowns come down to a handful of parts, and many can be fixed where the car
            has stopped, at home, at work or at the roadside where it is safe to work.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {ON_THE_SPOT.map((i) => (
              <div key={i.title} className="bg-surface border border-hairline rounded-xl p-5 flex gap-3">
                <Check className="size-5 text-accent-bright shrink-0 mt-0.5" strokeWidth={2.25} />
                <div>
                  <h3 className="font-semibold text-ink">{i.title}</h3>
                  <p className="text-[0.9375rem] text-muted leading-relaxed mt-1">{i.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[0.9375rem] text-muted leading-relaxed mt-6">
            Not sure what is wrong? Our guide to{' '}
            <Link href="/blog/car-wont-start-battery-alternator-or-starter/" className="underline">
              telling a battery, alternator and starter fault apart
            </Link>{' '}
            covers the common signs.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-20 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">How it works.</h2>
          <div className="space-y-5 text-[1.0625rem] text-ink/90 leading-relaxed">
            <p><strong className="text-ink">1. Call us any time.</strong> Ring 0451 159 954 and tell us the car, where you are and what it is doing.</p>
            <p><strong className="text-ink">2. We arrange a mechanic.</strong> We arrange a mechanic in your area and give you a realistic time.</p>
            <p><strong className="text-ink">3. Fixed price before work.</strong> The mechanic checks the fault and quotes a fixed price before any work begins. If you have a written quote from another business for the same job, we will match it.</p>
            <p><strong className="text-ink">4. Back on the road.</strong> Most common faults are fixed on the spot. If the car needs a workshop, we tell you straight away.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20">
        <div className="container max-w-3xl">
          <span className="eyebrow">Frequently asked</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-8">Breakdown questions.</h2>
          <SimpleFaq faqs={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">Broken down right now?</h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Call any time, 24/7. We arrange a mechanic in your area.
          </p>
          <a href="tel:0451159954" className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent">
            <Phone className="size-4" strokeWidth={2} />
            0451 159 954
          </a>
        </div>
      </section>

      <StickyCallBar quoteHref={QUOTE_HREF} />
    </div>
  )
}
