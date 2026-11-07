import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  ChevronRight,
  Phone,
  Check,
  Clock,
  ShieldCheck,
  DollarSign,
  type LucideIcon,
} from 'lucide-react'
import {
  getService,
  getServiceSlugs,
  getAllServices,
  type Service,
} from '@/lib/services'
import { getSuburb, getSuburbSlugs, isIndexableSuburb } from '@/lib/suburbs'
import SuburbPageContent from '@/components/SuburbPageContent'
import StickyCallBar from '@/components/StickyCallBar'
import WhyBookStrip from '@/components/WhyBookStrip'

const SITE_URL = 'https://www.mymechanicqld.com.au'

/** Which quote-form option each service page preselects, and its button text. */
const QUOTE_CTA: Record<string, { service: string; label: string }> = {
  'logbook-servicing': { service: 'logbook-servicing', label: 'Get my service price' },
  'pre-purchase-inspection': { service: 'pre-purchase-inspection', label: 'Book an inspection' },
  'brake-repairs': { service: 'brake-pads', label: 'Get a brake quote' },
  'battery-replacement': { service: 'battery-replacement', label: 'Get a battery quote' },
  'steering-suspension': { service: 'steering-suspension', label: 'Get a fixed quote' },
  'car-diagnostics': { service: 'diagnosis', label: 'Book a diagnosis' },
  'starter-alternator': { service: 'alternator-replacement', label: 'Get a fixed quote' },
  'radiator-cooling-system': { service: 'radiator-water-pump', label: 'Get a fixed quote' },
}

function quoteCta(slug: string) {
  const cta = QUOTE_CTA[slug]
  return {
    href: cta ? `/book/?service=${cta.service}` : '/book/',
    label: cta?.label ?? 'Get a fixed quote',
  }
}

export async function generateStaticParams() {
  const serviceSlugs = getServiceSlugs().map((slug) => ({ slug }))
  const suburbSlugs = getSuburbSlugs().map((slug) => ({ slug }))
  return [...serviceSlugs, ...suburbSlugs]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  // Check service first
  const service = await getService(slug)
  if (service) {
    return {
      title: service.title,
      description: service.meta_description,
      alternates: { canonical: service.canonical },
      openGraph: {
        title: service.og_title,
        description: service.og_description,
        images: [service.og_image],
        url: service.canonical,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: service.og_title,
        description: service.og_description,
        images: [service.og_image],
      },
    }
  }

  // Check suburb
  const suburb = getSuburb(slug)
  if (suburb) {
    const o = suburb.override
    const title = o?.metaTitle ?? `Mobile Mechanic ${suburb.name} | My Mechanic QLD`
    const description =
      o?.metaDescription ??
      `Mobile mechanic in ${suburb.name}, ${suburb.postcode}. Brake repair, logbook servicing, alternator replacement and more at your driveway. Fixed-price quotes, workmanship warranty on every job.`
    const ogTitle = o?.ogTitle ?? `Mobile mechanic in ${suburb.name} | My Mechanic QLD`
    return {
      title,
      description,
      alternates: { canonical: `/${suburb.slug}/` },
      // Template-only suburb pages stay reachable but out of the index until
      // they get hand-written copy (see isIndexableSuburb).
      ...(isIndexableSuburb(suburb) ? {} : { robots: { index: false, follow: true } }),
      openGraph: {
        title: ogTitle,
        description,
        url: `/${suburb.slug}/`,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: ogTitle,
        description,
      },
    }
  }

  return {}
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Try service first
  const service = await getService(slug)
  if (service) {
    return <ServicePageContent service={service} />
  }

  // Try suburb
  const suburb = getSuburb(slug)
  if (suburb) {
    return <SuburbPageContent suburb={suburb} />
  }

  notFound()
}

/* ------------------------------------------------------------------ */
/*  Service page (unchanged from original)                            */
/* ------------------------------------------------------------------ */

async function ServicePageContent({ service }: { service: Service }) {
  const all = await getAllServices()
  const cta = quoteCta(service.slug)
  const related = service.related_services
    .map((s) => all.find((x) => x.slug === s))
    .filter((x): x is Service => x !== undefined)
    .slice(0, 3)

  const serviceLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.schema.service_type,
    provider: {
      '@type': 'AutoRepair',
      name: 'My Mechanic QLD',
      telephone: '+61451159954',
      url: SITE_URL,
      areaServed: service.schema.area_served.map((a) => ({ '@type': 'City', name: a })),
    },
    areaServed: service.schema.area_served.map((a) => ({ '@type': 'City', name: a })),
  }
  if (service.price_from > 0) {
    serviceLd.offers = {
      '@type': 'Offer',
      price: service.price_from,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
    }
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: service.breadcrumb.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.url}`,
    })),
  }

  return (
    <div className="pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-bg border-b border-hairline py-3 text-[0.8125rem] text-subtle"
      >
        <div className="container flex items-center gap-2 flex-wrap">
          {service.breadcrumb.map((b, i) => (
            <span key={b.url} className="inline-flex items-center gap-2">
              {i > 0 && <ChevronRight className="size-3 text-subtle/60" strokeWidth={2} />}
              {i === service.breadcrumb.length - 1 ? (
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
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="eyebrow">{service.service_category}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4 text-balance">
              {service.hero_title}
            </h1>
            <p className="lead mt-5">{service.hero_subtitle}</p>

            {/* Primary actions sit above the spec strip so they land on the
                first phone screen. */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href={cta.href as `/${string}`} className="btn btn-primary">
                {cta.label}
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <a href="tel:0451159954" className="btn btn-secondary">
                <Phone className="size-4" strokeWidth={2} />
                Call now, 24/7
              </a>
            </div>

            <WhyBookStrip className="mt-7" />

            <div className="grid sm:grid-cols-3 gap-4 mt-7 pt-6 border-t border-hairline">
              <Spec icon={DollarSign} label="Pricing" value={service.price_label} />
              <Spec icon={Clock} label="Duration" value={service.duration} />
              <Spec icon={ShieldCheck} label="Warranty" value={service.warranty} />
            </div>
          </div>

          <div className="relative aspect-[5/6] min-h-[320px] md:min-h-[400px] rounded-xl overflow-hidden border border-hairline">
            <Image
              src={service.hero_image}
              alt={service.hero_image_alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-20">
        <div className="container max-w-3xl">
          <div
            className="prose-mmq"
            dangerouslySetInnerHTML={{ __html: service.bodyHtml }}
          />
        </div>
      </section>

      {/* Parts brands */}
      {service.parts_brands?.length > 0 && (
        <section className="py-10 md:py-12 bg-soft border-y border-hairline">
          <div className="container max-w-3xl text-center">
            <span className="eyebrow">Parts we fit</span>
            <p className="text-lg text-ink mt-3">
              {service.parts_brands.join(' · ')}
            </p>
            <p className="text-sm text-muted mt-2 max-w-[60ch] mx-auto">
              We pick the brand sized and graded for your vehicle, not whatever the wholesaler had
              on special.
            </p>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-12 md:py-20">
        <div className="container max-w-3xl">
          <span className="eyebrow">Frequently asked</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-8">
            What customers ask about {service.nav_label.toLowerCase()}.
          </h2>
          <div className="space-y-3">
            {service.faq.map((item) => (
              <details
                key={item.question}
                className="group bg-surface border border-hairline rounded-xl p-5 md:p-6"
              >
                <summary className="cursor-pointer font-semibold text-ink list-none flex justify-between items-start gap-4">
                  <span className="flex-1">{item.question}</span>
                  <ChevronRight className="size-5 text-subtle shrink-0 mt-0.5 transition-transform group-open:rotate-90" strokeWidth={2} />
                </summary>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-12 md:py-20 bg-soft border-t border-hairline">
          <div className="container">
            <span className="eyebrow">Related services</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-8">
              We also handle these.
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.slug}/` as `/${string}`}
                  className="bg-surface border border-hairline rounded-xl p-6 no-underline
                             text-ink hover:border-accent hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-xs uppercase tracking-[0.06em] font-semibold text-subtle mb-2">
                    {r.service_category}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{r.nav_label}</h3>
                  <p className="text-[0.9375rem] text-muted leading-relaxed mb-3">
                    {r.hero_subtitle.split('.')[0]}.
                  </p>
                  <span className="text-sm font-semibold text-accent-bright inline-flex items-center gap-1">
                    Read more
                    <ArrowRight className="size-3.5" strokeWidth={2} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Book your {service.nav_label.toLowerCase()} today.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Open 24/7. Fixed upfront quote, same day where available.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={cta.href as `/${string}`}
              className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent"
            >
              {cta.label}
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

      <StickyCallBar quoteHref={cta.href} />
    </div>
  )
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex gap-3 items-start">
      <Icon className="size-5 text-accent shrink-0 mt-0.5" strokeWidth={1.75} />
      <div>
        <div className="text-xs uppercase tracking-[0.06em] font-semibold text-subtle">
          {label}
        </div>
        <div className="text-[0.9375rem] font-semibold text-ink mt-0.5 leading-snug">{value}</div>
      </div>
    </div>
  )
}
