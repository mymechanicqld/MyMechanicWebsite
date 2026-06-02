import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Disc3,
  BatteryCharging,
  ThermometerSun,
  Gauge,
} from 'lucide-react'
import {
  getSuburbsByRegion,
  ALL_SERVICES,
  type Region,
} from '@/lib/suburbs'

const SITE_URL = 'https://www.mymechanicqld.com.au'

const PRIORITY_ICONS = [Disc3, BatteryCharging, ThermometerSun, Gauge]

export default function RegionHubContent({ region }: { region: Region }) {
  const suburbs = getSuburbsByRegion(region.id)
  const priorityServices = ALL_SERVICES.slice(0, 4)

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/areas/' },
    { name: region.name, url: `/${region.slug}/` },
  ]

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

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Mobile mechanic',
    provider: {
      '@type': 'AutomotiveBusiness',
      name: 'My Mechanic QLD',
      telephone: '+61451159954',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: region.name,
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
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
          <span className="eyebrow">Mobile mechanic · {region.name}</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4 text-balance">
            Mobile mechanic in{' '}
            <span className="text-accent">{region.name}</span>
          </h1>
          <p className="lead mt-6 max-w-[58ch]">{region.intro}</p>

          <div className="flex flex-wrap gap-6 mt-7 text-[0.9375rem] text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-accent-bright" strokeWidth={2} />
              <strong className="text-ink font-semibold">
                {suburbs.length} suburbs
              </strong>
              covered
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-accent-bright" strokeWidth={2} />
              <strong className="text-ink font-semibold">Same-day</strong>
              service available
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent-bright" strokeWidth={2} />
              <strong className="text-ink font-semibold">
                Workmanship warranty
              </strong>
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/book/" className="btn btn-primary">
              Get a quote in {region.name}
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn btn-secondary">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>

      {/* Priority services */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-y border-hairline">
        <div className="container">
          <span className="eyebrow">Most-booked in {region.name}</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-8 max-w-[24ch]">
            The jobs we do most across {region.name}.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {priorityServices.map((s, i) => {
              const Icon = PRIORITY_ICONS[i]
              return (
                <Link
                  key={s.slug}
                  href={`/${s.slug}/` as `/${string}`}
                  className="group bg-surface border border-hairline rounded-2xl p-6
                             flex flex-col gap-4 no-underline transition-all
                             hover:border-accent hover:-translate-y-0.5"
                >
                  <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center">
                    <Icon className="size-[22px]" strokeWidth={1.75} />
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

      {/* How we work in this region */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            How our {region.name} service works
          </h2>
          <div className="space-y-4 text-[1.0625rem] text-muted leading-[1.7]">
            <p>{region.detail}</p>
            <p>
              We quote a fixed price in writing before we start any job. The van
              carries professional-grade diagnostic tools and the parts for the
              work, so most repairs are finished in your driveway in one visit.
            </p>
          </div>
        </div>
      </section>

      {/* All suburbs in region */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-y border-hairline">
        <div className="container">
          <span className="eyebrow">Every suburb we cover</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-6">
            {suburbs.length} {region.name} suburbs, one mobile workshop.
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {suburbs.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/` as `/${string}`}
                className="group flex items-center justify-between p-4 bg-surface border border-hairline
                           rounded-xl no-underline text-ink hover:border-accent transition-colors"
              >
                <div>
                  <div className="font-semibold text-[0.9375rem]">{s.name}</div>
                  <div className="text-[0.75rem] text-subtle mt-0.5">
                    {s.postcode}
                  </div>
                </div>
                <ArrowRight
                  className="size-4 text-subtle group-hover:text-accent shrink-0"
                  strokeWidth={2}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[24ch] mx-auto mb-4">
            Mobile mechanic anywhere in {region.name}.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Fixed-price quote before we start. Same-day service available.
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
