import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone, Check } from 'lucide-react'
import WhyBookStrip from '@/components/WhyBookStrip'
import StickyCallBar from '@/components/StickyCallBar'
import SimpleFaq, { faqSchema, type FaqEntry } from '@/components/SimpleFaq'
import { SITE_URL } from '@/lib/business'

export const metadata: Metadata = {
  title: 'Mobile Car Service Brisbane & Logan | From $369 | My Mechanic QLD',
  description:
    'Mobile car servicing at your home or work across Brisbane, Logan, Ipswich and the northern Gold Coast. Minor, major and logbook services from $369, fixed price first. Open 24/7.',
  alternates: { canonical: '/car-service/' },
  openGraph: {
    title: 'Mobile car service | My Mechanic QLD',
    description: 'Minor, major and logbook services at your home or work, from $369. Fixed price first.',
    url: '/car-service/',
    type: 'website',
  },
}

const QUOTE_HREF = '/book/?service=general-servicing'

const TYPES = [
  {
    name: 'Minor service',
    when: 'Usually every 10,000 to 15,000 km, or six to twelve months',
    items: ['Engine oil and oil filter', 'Fluids checked and topped up', 'Tyre pressures set', 'Safety check of brakes, lights, belts, hoses and leaks'],
  },
  {
    name: 'Major service',
    when: 'Usually every 30,000 to 60,000 km, depending on the make',
    items: ['Everything in a minor service', 'Air filter and cabin filter', 'Brake fluid, and spark plugs on petrol engines, when due', 'A deeper inspection and battery health test'],
  },
  {
    name: 'Logbook service',
    when: 'Whatever your logbook calls for at your current kilometres',
    items: ['Done to the manufacturer’s schedule', 'Logbook stamped', 'Keeps your new-car warranty intact', 'Itemised invoice emailed'],
  },
]

const FAQS: FaqEntry[] = [
  {
    q: 'How much does a car service cost?',
    a: 'A standard service starts from $369 for most cars. Major services, larger vehicles and longer trips cost more, and we confirm the exact price for your make and model before we book. If you have a written quote from another business for the same service, we will match it.',
  },
  {
    q: 'Which service does my car need?',
    a: 'Your logbook or owner’s manual sets the schedule by kilometres and months. Send us the make, model, year and current kilometres and we will tell you which service is due.',
  },
  {
    q: 'Will a mobile service affect my new-car warranty?',
    a: 'No. Under the Australian Consumer Law you can have your car serviced by any qualified mechanic, as long as the work follows the manufacturer’s schedule and specifications. We stamp the logbook and email the invoice.',
  },
  {
    q: 'Where do you do the service?',
    a: 'At your home or work, wherever the car is parked on safe, level ground. Many customers book a service at work and pick the car up at the end of the day.',
  },
  {
    q: 'What if you find something else during the service?',
    a: 'We stop, show you what we found and give you a fixed quote for it. Nothing is added to the bill without your agreement.',
  },
]

export default function CarServicePage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services/` },
      { '@type': 'ListItem', position: 3, name: 'Car service', item: `${SITE_URL}/car-service/` },
    ],
  }
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Mobile car servicing',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: ['Brisbane', 'Logan', 'Ipswich', 'Gold Coast'].map((name) => ({ '@type': 'City', name })),
    offers: { '@type': 'Offer', price: 369, priceCurrency: 'AUD', description: 'Standard service, from' },
  }

  return (
    <div className="pb-24 lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />

      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="eyebrow">Servicing</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4 text-balance">
              Mobile car service at your home or work
            </h1>
            <p className="lead mt-5">
              Minor, major and logbook services from $369, done where your car is parked. Fixed
              price agreed before we start.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href={QUOTE_HREF as `/${string}`} className="btn btn-primary">
                Get my service price
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <a href="tel:0451159954" className="btn btn-secondary">
                <Phone className="size-4" strokeWidth={2} />
                Call now, 24/7
              </a>
            </div>
            <WhyBookStrip className="mt-7" />
          </div>
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-hairline">
            <Image
              src="/images/hero-van-real.webp"
              alt="Service van with tool drawers open beside a car being serviced in a home driveway"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Which service */}
      <section className="py-12 md:py-20 bg-surface border-y border-hairline">
        <div className="container">
          <span className="eyebrow">Which service do you need?</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-8 max-w-[24ch]">Minor, major or logbook.</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {TYPES.map((t) => (
              <div key={t.name} className="bg-bg border border-hairline rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-ink">{t.name}</h3>
                <p className="text-[0.875rem] text-subtle mt-1">{t.when}</p>
                <ul className="mt-4 space-y-2">
                  {t.items.map((i) => (
                    <li key={i} className="flex gap-2.5 text-[0.9375rem] text-ink/90">
                      <Check className="size-[18px] text-accent-bright shrink-0 mt-0.5" strokeWidth={2.25} />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[0.9375rem] text-muted mt-6">
            The full checklist for each service is on our{' '}
            <Link href="/logbook-servicing/" className="underline">logbook servicing page</Link>.
          </p>
        </div>
      </section>

      {/* Price + how */}
      <section className="py-12 md:py-20">
        <div className="container max-w-3xl space-y-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">What it costs.</h2>
            <div className="space-y-4 text-[1.0625rem] text-muted leading-[1.7]">
              <p>
                A standard service starts from <strong className="text-ink">$369</strong> for most
                cars. Major services, larger vehicles and longer trips cost more, and we confirm the
                exact price for your make and model before we book.
              </p>
              <p>
                If you have a written quote from another business for the same service, we will
                match it. Afterpay is available. See{' '}
                <Link href="/pricing/" className="underline">how our pricing works</Link>.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">How it works.</h2>
            <div className="space-y-4 text-[1.0625rem] text-ink/90 leading-relaxed">
              <p><strong className="text-ink">1. Tell us the car.</strong> Call any time, 24/7, or send the make, model, year and kilometres online.</p>
              <p><strong className="text-ink">2. Get a fixed price.</strong> We tell you which service is due and confirm the price. Online requests are answered by the next business day.</p>
              <p><strong className="text-ink">3. We service it where it is parked.</strong> At home or at work. You get an itemised invoice by email, and a stamped logbook for logbook services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 bg-soft border-t border-hairline">
        <div className="container max-w-3xl">
          <span className="eyebrow">Frequently asked</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-8">Car service questions.</h2>
          <SimpleFaq faqs={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">Book your car service.</h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            From $369 for most cars. Fixed price before we start.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={QUOTE_HREF as `/${string}`} className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent">
              Get my service price
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn bg-transparent text-white border-white/40 hover:bg-white/10">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>

      <StickyCallBar quoteHref={QUOTE_HREF} />
    </div>
  )
}
