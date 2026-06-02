import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  Star,
} from 'lucide-react'
import { getService, getServiceSlugs } from '@/lib/services'
import {
  getSuburb,
  getSuburbSlugs,
  getNearbySuburbs,
  PRIORITY_SERVICES,
  type Suburb,
} from '@/lib/suburbs'

const SITE_URL = 'https://www.mymechanicqld.com.au'

// Generate pages for priority services x all suburbs
const TARGET_SERVICE_SLUGS = PRIORITY_SERVICES.map((s) => s.slug)

export async function generateStaticParams() {
  const suburbSlugs = getSuburbSlugs()
  const params: { slug: string; suburb: string }[] = []
  for (const serviceSlug of TARGET_SERVICE_SLUGS) {
    for (const suburbSlug of suburbSlugs) {
      params.push({ slug: serviceSlug, suburb: suburbSlug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; suburb: string }>
}): Promise<Metadata> {
  const { slug, suburb: suburbSlug } = await params
  const service = await getService(slug)
  const suburb = getSuburb(suburbSlug)
  if (!service || !suburb) return {}

  const title = `${service.nav_label} ${suburb.name} | Mobile ${service.nav_label} | My Mechanic QLD`
  const description = `Mobile ${service.nav_label.toLowerCase()} in ${suburb.name}, ${suburb.postcode}. ${service.hero_subtitle.split('.')[0]}. Fixed-price quote upfront, workmanship warranty.`

  return {
    title,
    description,
    alternates: { canonical: `/${slug}/${suburb.slug}/` },
    openGraph: {
      title: `${service.nav_label} in ${suburb.name} | My Mechanic QLD`,
      description,
      url: `/${slug}/${suburb.slug}/`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.nav_label} in ${suburb.name} | My Mechanic QLD`,
      description,
    },
  }
}

function getServiceSuburbFaq(
  serviceName: string,
  serviceSlug: string,
  suburb: Suburb
) {
  const faqs: { question: string; answer: string }[] = []

  if (serviceSlug === 'brake-repairs') {
    faqs.push(
      {
        question: `How much does a brake job cost in ${suburb.name}?`,
        answer: `Pricing depends on whether you need pads only, pads and rotors, or a full overhaul. We quote a fixed price for your specific vehicle before any work starts. Call us with the make, model and year and we come back with the exact figure.`,
      },
      {
        question: `Can you replace brakes at my house in ${suburb.name}?`,
        answer: `Yes. We carry proper jack stands, a torque wrench and the right parts on the van. Brake work is one of the most common jobs we do on-site. Most pad and rotor replacements are finished in two to three hours in your driveway.`,
      },
      {
        question: `How do I know if my brakes need replacing?`,
        answer: `Common signs: a high-pitched squeal when braking (the wear indicator), grinding (pads worn through), a pulsing brake pedal (warped rotors), the pedal feeling low or soft (hydraulic issue), or the brake warning light on the dash. If any of these are happening, call us.`,
      },
      {
        question: `What brake parts do you use?`,
        answer: `We fit quality aftermarket or OEM parts sized for your vehicle. The grade depends on the vehicle and what makes sense for the owner. We never fit cheap unbranded pads just to hit a lower quote number.`,
      }
    )
  } else if (serviceSlug === 'starter-alternator') {
    faqs.push(
      {
        question: `My car won't start in ${suburb.name}. Can you help?`,
        answer: `Yes. The three common causes are a flat battery, a failing starter motor, or a failing alternator. We diagnose on-site using professional-grade testing equipment and quote the fix before we start.`,
      },
      {
        question: `How much does an alternator replacement cost in ${suburb.name}?`,
        answer: `The cost varies by vehicle, because alternator units and labour times differ significantly between makes. We quote a fixed price once we know the make, model and year of your car.`,
      },
      {
        question: `How can I tell if it is the battery or the alternator?`,
        answer: `Quick test: if the dashboard lights are dim or off when you turn the key, it is usually the battery. If the car starts but the battery keeps going flat the next morning, the alternator is not charging it. We carry the equipment to test both on-site.`,
      },
      {
        question: `Can a mobile mechanic replace an alternator at home?`,
        answer: `Yes, for most vehicles. The alternator is an engine-bay component accessible without hoisting the car on most popular models. We carry the right tools and can usually complete the job in your driveway in two to four hours.`,
      }
    )
  } else if (serviceSlug === 'radiator-cooling-system') {
    faqs.push(
      {
        question: `My car is overheating in ${suburb.name}. What should I do?`,
        answer: `Pull over safely, turn the engine off and let it cool. Do not open the radiator cap while it is hot. Call us and we will diagnose the cause on-site. Common reasons include low coolant from a leak, a failed thermostat, a failing water pump, or a blocked radiator.`,
      },
      {
        question: `How much does a radiator replacement cost in ${suburb.name}?`,
        answer: `It depends on the vehicle and whether you need the radiator, the water pump, or both. We pressure-test the cooling system to find the exact fault, then quote a fixed price before we start.`,
      },
      {
        question: `Can you fix a coolant leak at my home?`,
        answer: `In most cases, yes. We pressure-test the system to locate the leak, then replace the failed component, whether that is a hose, the radiator, the water pump, or a gasket. We carry the test equipment and common parts on the van.`,
      },
      {
        question: `How long does a water pump replacement take?`,
        answer: `Typically three to five hours depending on the vehicle. Some engines are more straightforward than others. We quote the expected timeframe along with the fixed price.`,
      }
    )
  } else if (serviceSlug === 'logbook-servicing') {
    faqs.push(
      {
        question: `Can I get a logbook service at home in ${suburb.name}?`,
        answer: `Yes. We perform manufacturer-spec logbook servicing at your driveway in ${suburb.name}. We use the correct-grade oil and filters, stamp the logbook, and email the invoice.`,
      },
      {
        question: `Will a mobile logbook service void my warranty?`,
        answer: `No. Under the Australian Consumer Law, you are free to have your car serviced by any qualified mechanic as long as the service follows manufacturer specifications. We stamp the logbook and provide a full invoice. The dealership cannot refuse warranty for this reason.`,
      },
      {
        question: `How much is a car service in ${suburb.name}?`,
        answer: `Pricing depends on make, model and whether it is a minor or major service. We quote a fixed price for your specific vehicle before we start. Call us with the details and we come back with the number during business hours.`,
      },
      {
        question: `How often should I service my car?`,
        answer: `Most modern cars need a service every 10,000 to 15,000 km, or every six to twelve months, whichever comes first. Your logbook tells you the exact interval for your make. If you are overdue or unsure, call us with the make, model and year and we will tell you what is needed.`,
      }
    )
  }

  // Common question for all service-suburb pages
  faqs.push({
    question: `How quickly can you get to ${suburb.name}?`,
    answer: `${suburb.distanceFromBase <= 10 ? `${suburb.name} is close to our Springwood base. Same-day service is often available, sometimes within a couple of hours.` : suburb.distanceFromBase <= 25 ? `${suburb.name} is a regular stop for us. Same-day bookings are available during business hours.` : `We service ${suburb.name} regularly. Bookings are usually confirmed within one to two business days, though we can sometimes fit in urgent work sooner.`}`,
  })

  return faqs
}

export default async function ServiceSuburbPage({
  params,
}: {
  params: Promise<{ slug: string; suburb: string }>
}) {
  const { slug, suburb: suburbSlug } = await params
  const service = await getService(slug)
  const suburb = getSuburb(suburbSlug)
  if (!service || !suburb) notFound()

  const nearby = getNearbySuburbs(suburb)
  const faq = getServiceSuburbFaq(
    service.nav_label,
    service.slug,
    suburb
  )

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: service.nav_label, url: `/${service.slug}/` },
    { name: suburb.regionName, url: `/${suburb.regionSlug}/` },
    { name: suburb.name, url: `/${service.slug}/${suburb.slug}/` },
  ]

  // JSON-LD
  const serviceLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.schema.service_type,
    provider: {
      '@type': 'AutoRepair',
      name: 'My Mechanic QLD',
      telephone: '+61451159954',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Place',
      name: suburb.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: suburb.name,
        addressRegion: 'QLD',
        postalCode: String(suburb.postcode),
        addressCountry: 'AU',
      },
    },
  }
  if (service.price_from > 0) {
    serviceLd.offers = {
      '@type': 'Offer',
      price: service.price_from,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
    }
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.url}`,
    })),
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

  // Other priority services for cross-linking
  const otherServices = PRIORITY_SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
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
                <ChevronRight
                  className="size-3 text-subtle/60"
                  strokeWidth={2}
                />
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
            {service.nav_label} · {suburb.regionName}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4 text-balance">
            Mobile {service.nav_label.toLowerCase()} in{' '}
            <span className="text-accent">{suburb.name}</span>
          </h1>
          <p className="lead mt-6 max-w-[56ch]">
            {service.hero_subtitle} We come to your driveway in{' '}
            {suburb.name}, {suburb.postcode}.
          </p>

          <div className="flex flex-wrap gap-6 mt-7 text-[0.9375rem] text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin
                className="size-4 text-accent-bright"
                strokeWidth={2}
              />
              <strong className="text-ink font-semibold">
                {suburb.name}
              </strong>
              {suburb.postcode}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock
                className="size-4 text-accent-bright"
                strokeWidth={2}
              />
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
              Get a quote for {suburb.name}
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn btn-secondary">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>

      {/* Service detail for this suburb */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {service.nav_label} at your driveway in {suburb.name}
          </h2>
          <div className="space-y-4 text-[1.0625rem] text-muted leading-[1.7]">
            <p>{suburb.localContext}</p>
            <p>
              We bring mobile {service.nav_label.toLowerCase()} directly to your
              address in {suburb.name}, {suburb.postcode}, including the streets
              around {suburb.landmark}. We are based in Springwood, about{' '}
              {suburb.distanceFromBase} km away, so we load the van with parts
              specific to your make and model and come straight to you. No
              waiting rooms, no lost half-days.
            </p>
            <p>
              Every job starts with a fixed-price quote given in writing
              before we lift a spanner. If we find something else during the
              work, we stop and call you with a separate quote before
              touching it. Nothing goes on the bill that you did not agree to
              first.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              'Fixed-price quote in writing before work starts',
              'Professional-grade diagnostic tools on the van',
              'OEM or quality aftermarket parts for your specific vehicle',
              'Workmanship warranty on every repair',
              'Logbook stamped, invoice emailed (servicing jobs)',
              `${suburb.responseTime} for ${suburb.name}`,
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check
                  className="size-5 text-accent-bright shrink-0 mt-0.5"
                  strokeWidth={2.25}
                />
                <span className="text-[0.9375rem] text-ink">{item}</span>
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
            {service.nav_label} in {suburb.name}: your questions.
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

      {/* Other services in this suburb */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container">
          <span className="eyebrow">
            More services in {suburb.name}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-6">
            We also offer these in {suburb.name}.
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/${suburb.slug}/` as `/${string}`}
                className="group bg-surface border border-hairline rounded-xl p-6
                           no-underline text-ink hover:border-accent hover:-translate-y-0.5 transition-all"
              >
                <h3 className="text-lg font-semibold mb-2">{s.label}</h3>
                <p className="text-[0.9375rem] text-muted leading-relaxed mb-3">
                  {s.shortDesc}
                </p>
                <span className="text-sm font-semibold text-accent-bright inline-flex items-center gap-1">
                  {s.label} in {suburb.name}
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby suburbs for this service */}
      {nearby.length > 0 && (
        <section className="py-14 md:py-20 bg-soft border-t border-hairline">
          <div className="container">
            <span className="eyebrow">Nearby</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-6">
              {service.nav_label} in suburbs near {suburb.name}.
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  href={
                    `/${service.slug}/${n.slug}/` as `/${string}`
                  }
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
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[24ch] mx-auto mb-4">
            Book {service.nav_label.toLowerCase()} in {suburb.name} today.
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
