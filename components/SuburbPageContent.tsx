import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  Disc3,
  BatteryCharging,
  ThermometerSun,
  Gauge,
  ClipboardCheck,
  Battery,
  ScanLine,
  MoveVertical,
} from 'lucide-react'
import type { Suburb } from '@/lib/suburbs'
import { getNearbySuburbs, ALL_SERVICES } from '@/lib/suburbs'
import {
  SITE_URL,
  BUSINESS_ID,
  BUSINESS_NAME,
  PHONE_E164,
  BASE_ADDRESS,
  BASE_GEO,
  OPENING_HOURS,
} from '@/lib/business'

const ICON_MAP: Record<string, typeof Disc3> = {
  'brake-repairs': Disc3,
  'starter-alternator': BatteryCharging,
  'radiator-cooling-system': ThermometerSun,
  'logbook-servicing': Gauge,
  'pre-purchase-inspection': ClipboardCheck,
  'battery-replacement': Battery,
  'car-diagnostics': ScanLine,
  'steering-suspension': MoveVertical,
}

function getFaq(suburb: Suburb) {
  return [
    {
      question: `Do you service ${suburb.name}?`,
      answer: `Yes. ${suburb.name} is within our regular service area in ${suburb.regionName}. We are based in Springwood, about ${suburb.distanceFromBase} km away. ${suburb.responseTime === 'Often same-day' ? 'Same-day service is often available for your suburb.' : suburb.responseTime === 'Same-day available' ? 'Same-day service is available during business hours.' : 'Bookings are usually confirmed within one to two business days.'}`,
    },
    {
      question: `How much does a mobile mechanic cost in ${suburb.name}?`,
      answer: `Pricing depends on the job. We quote a fixed price in writing before any work begins. Call us with the make, model and year of your vehicle plus what is happening, and we come back with the exact figure during business hours. No surprises on the bill.`,
    },
    {
      question: `What services do you offer in ${suburb.name}?`,
      answer: `We offer brake repair, alternator and starter motor replacement, radiator and water pump replacement, logbook servicing, pre-purchase inspections, battery replacement, warning-light diagnostics, and steering and suspension repair. All services are available mobile in ${suburb.name}.`,
    },
    {
      question: `How quickly can you get to ${suburb.name}?`,
      answer: `${suburb.distanceFromBase <= 10 ? `${suburb.name} is close to our Springwood base. Same-day service is often available, sometimes within a couple of hours.` : suburb.distanceFromBase <= 25 ? `${suburb.name} is a regular stop for us. Same-day service is available during business hours, and we can usually lock in a time within 24 hours of your call.` : `We get out to ${suburb.name} regularly. Bookings are usually confirmed within one to two business days, though we can sometimes fit in urgent jobs sooner.`}`,
    },
    {
      question: `Will a mobile service in ${suburb.name} void my warranty?`,
      answer: `No. Under the Australian Consumer Law, you are free to have your car serviced by any qualified mechanic, including a mobile one, as long as the service follows the manufacturer's specifications. We stamp your logbook and email the invoice, same as a dealership.`,
    },
    {
      question: `Where in ${suburb.name} do you cover?`,
      answer: `All of ${suburb.name}, ${suburb.postcode}, including the streets around ${suburb.landmark}. We come to your home or workplace, so wherever your car is parked in the area, we can get to it.`,
    },
  ]
}

export default function SuburbPageContent({ suburb }: { suburb: Suburb }) {
  const nearby = getNearbySuburbs(suburb)
  const faq = getFaq(suburb)

  // JSON-LD: AutomotiveBusiness scoped to this suburb, referencing the
  // sitewide business entity by @id, with geo, hours and scoped areaServed.
  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': ['AutomotiveBusiness', 'AutoRepair', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: BUSINESS_NAME,
    url: `${SITE_URL}/${suburb.slug}/`,
    telephone: PHONE_E164,
    priceRange: '$$',
    address: BASE_ADDRESS,
    geo: { '@type': 'GeoCoordinates', ...BASE_GEO },
    openingHoursSpecification: OPENING_HOURS,
    areaServed: {
      '@type': 'City',
      name: suburb.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: suburb.name,
        addressRegion: 'QLD',
        postalCode: String(suburb.postcode),
        addressCountry: 'AU',
      },
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: SITE_URL + '/areas/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: suburb.regionName,
        item: `${SITE_URL}/${suburb.regionSlug}/`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: suburb.name,
        item: `${SITE_URL}/${suburb.slug}/`,
      },
    ],
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/areas/' },
    { name: suburb.regionName, url: `/${suburb.regionSlug}/` },
    { name: suburb.name, url: `/${suburb.slug}/` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-bg border-b border-hairline py-3 text-[0.8125rem] text-subtle"
      >
        <div className="container flex items-center gap-2 flex-wrap">
          {breadcrumbs.map((b, i) => (
            <span key={b.url} className="inline-flex items-center gap-2">
              {i > 0 && (
                <ChevronRight className="size-3 text-subtle/60" strokeWidth={2} />
              )}
              {i === breadcrumbs.length - 1 ? (
                <span className="text-ink font-medium">{b.name}</span>
              ) : (
                <Link
                  href={b.url as `/${string}`}
                  className="text-subtle hover:text-accent-bright no-underline"
                >
                  {b.name}
                </Link>
              )}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-4xl">
          <span className="eyebrow">
            Mobile mechanic · {suburb.regionName}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4 text-balance">
            Mobile mechanic in{' '}
            <span className="text-accent">{suburb.name}</span>
          </h1>
          <p className="lead mt-6 max-w-[56ch]">
            We bring workshop-standard car servicing and repairs to your driveway
            in {suburb.name}, {suburb.postcode}. Qualified mechanics, fixed-price
            quotes, and a workmanship warranty on every job.
          </p>

          <div className="flex flex-wrap gap-6 mt-7 text-[0.9375rem] text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-accent-bright" strokeWidth={2} />
              <strong className="text-ink font-semibold">
                {suburb.distanceFromBase} km
              </strong>
              from our base
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-accent-bright" strokeWidth={2} />
              <strong className="text-ink font-semibold">
                {suburb.responseTime}
              </strong>
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck
                className="size-4 text-accent-bright"
                strokeWidth={2}
              />
              <strong className="text-ink font-semibold">
                Workmanship warranty
              </strong>
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/book/" className="btn btn-primary">
              Get a quote in {suburb.name}
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn btn-secondary">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>

      {/* Services available */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-y border-hairline">
        <div className="container">
          <span className="eyebrow">What we do in {suburb.name}</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-4 max-w-[26ch]">
            Every service, mobile to {suburb.name}.
          </h2>
          <p className="lead mb-10 max-w-[56ch]">
            From brake repairs to logbook servicing, we bring the workshop to
            your driveway. All services below are available in {suburb.name},{' '}
            {suburb.postcode}.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ALL_SERVICES.map((s) => {
              const Icon = ICON_MAP[s.slug] ?? Disc3
              const isPriority =
                s.slug === 'brake-repairs' ||
                s.slug === 'starter-alternator' ||
                s.slug === 'radiator-cooling-system' ||
                s.slug === 'logbook-servicing'
              return (
                <Link
                  key={s.slug}
                  href={`/${s.slug}/` as `/${string}`}
                  className="group bg-surface border border-hairline rounded-2xl p-6
                             flex flex-col gap-4 no-underline transition-all
                             hover:border-accent hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start">
                    <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center">
                      <Icon className="size-[22px]" strokeWidth={1.75} />
                    </div>
                    {isPriority && (
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
                        Most popular
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-[1.0625rem] font-semibold text-ink mb-1.5 leading-snug">
                      {s.label}
                    </h3>
                    <p className="text-[0.875rem] text-muted leading-relaxed">
                      {s.shortDesc}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-accent-bright inline-flex items-center gap-1 mt-auto">
                    Learn more
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Local context */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Mobile mechanic across {suburb.name}
          </h2>
          <div className="space-y-4 text-[1.0625rem] text-muted leading-[1.7]">
            <p>{suburb.localContext}</p>
            <p>
              We are based in Springwood, about {suburb.distanceFromBase} km from{' '}
              {suburb.name}. When you book a job near {suburb.landmark}, we load
              the van with the right parts for your vehicle and come straight to
              you. The van is the workshop, with professional-grade diagnostic
              tools and the parts for the job on board.
            </p>
            <p>
              We quote a fixed price before we start. If we find something else
              while we are in there, we stop and call you with a separate quote
              before touching it. Nothing appears on the bill that you did not
              agree to.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Fixed-price quote upfront',
                body: 'You see the full cost before we lift a spanner. No surprises.',
              },
              {
                title: 'Workmanship warranty',
                body: 'Every repair is backed by our workmanship warranty per our terms.',
              },
              {
                title: 'OEM-spec parts',
                body: 'Quality parts sized for your vehicle, not whatever was cheapest.',
              },
              {
                title: 'Warranty-safe servicing',
                body: 'Logbook stamped, invoice emailed. Your new-car warranty stays intact.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3.5 items-start p-5 bg-surface border border-hairline rounded-xl"
              >
                <Check
                  className="size-5 text-accent-bright shrink-0 mt-0.5"
                  strokeWidth={2.25}
                />
                <div>
                  <h3 className="font-semibold text-ink text-[0.9375rem] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[0.875rem] text-muted leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <span className="eyebrow">Frequently asked</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-8">
            Mobile mechanic in {suburb.name}: your questions.
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group bg-surface border border-hairline rounded-xl p-5 md:p-6"
              >
                <summary className="cursor-pointer font-semibold text-ink list-none flex justify-between items-start gap-4">
                  <span className="flex-1">{item.question}</span>
                  <ChevronRight
                    className="size-5 text-subtle shrink-0 mt-0.5 transition-transform group-open:rotate-90"
                    strokeWidth={2}
                  />
                </summary>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby suburbs */}
      {nearby.length > 0 && (
        <section className="py-14 md:py-20 lg:py-24">
          <div className="container">
            <span className="eyebrow">Nearby suburbs</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-6">
              We also service these suburbs near {suburb.name}.
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={`/${n.slug}/` as `/${string}`}
                  className="group flex items-center justify-between p-5 bg-surface border border-hairline
                             rounded-xl no-underline text-ink hover:border-accent transition-colors"
                >
                  <div>
                    <div className="font-semibold">{n.name}</div>
                    <div className="text-[0.8125rem] text-subtle mt-0.5">
                      {n.regionName} · {n.postcode}
                    </div>
                  </div>
                  <ArrowRight
                    className="size-4 text-subtle group-hover:text-accent"
                    strokeWidth={2}
                  />
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href={`/${suburb.regionSlug}/` as `/${string}`}
                className="inline-flex items-center gap-1 text-accent-bright font-semibold no-underline hover:text-accent-hover"
              >
                See all {suburb.regionName} suburbs
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Book your mobile mechanic in {suburb.name}.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Fixed-price quote before we start. {suburb.responseTime}.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/book/"
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
