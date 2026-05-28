import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  Disc3,
  BatteryCharging,
  ThermometerSun,
  Gauge,
  ClipboardCheck,
  MoveVertical,
  Battery,
  ScanLine,
  TriangleAlert,
} from 'lucide-react'

// Note: TriangleAlert / Phone used in the emergency phone-CTA card rendered in the SERVICES grid.

export const metadata: Metadata = {
  title: 'Mobile Mechanic Services Brisbane, Logan, Ipswich & Gold Coast | My Mechanic QLD',
  description:
    'Mobile brake repair, alternator and starter, radiator and water pump, logbook servicing, pre-purchase inspections, batteries, diagnostics, suspension. Fixed-price quotes upfront, workmanship warranty on every job.',
  alternates: { canonical: '/services/' },
  openGraph: {
    title: 'Mobile mechanic services | My Mechanic QLD',
    description:
      'Nine services delivered on-site across Brisbane, Logan, Ipswich and the Gold Coast.',
    url: '/services/',
    type: 'website',
  },
}

const SERVICES = [
  {
    slug: 'brake-repairs',
    label: 'Brake repair',
    priceFrom: null,
    desc: 'Squealing, grinding, or a soft pedal? We replace pads and rotors with OEM or quality aftermarket parts, on-site.',
    Icon: Disc3,
    priority: true,
  },
  {
    slug: 'starter-alternator',
    label: 'Alternator & starter motor',
    priceFrom: null,
    priceLabel: 'Diagnostic',
    desc: 'Slow crank, stalling, won\'t start. We test battery, alternator and starter on-site, then replace only what is actually faulty.',
    Icon: BatteryCharging,
    priority: true,
  },
  {
    slug: 'radiator-cooling-system',
    label: 'Radiator & water pump',
    priceFrom: null,
    priceLabel: 'Pressure test',
    desc: 'Overheating in traffic? We pressure-test the cooling system in your driveway and replace radiators, water pumps, hoses and thermostats.',
    Icon: ThermometerSun,
    priority: true,
  },
  {
    slug: 'logbook-servicing',
    label: 'Logbook & general servicing',
    priceFrom: null,
    desc: 'Manufacturer-spec scheduled servicing with OEM-quality filters and fluids. Keeps your new-car warranty intact.',
    Icon: Gauge,
    priority: true,
  },
  {
    slug: 'pre-purchase-inspection',
    label: 'Pre-purchase inspection',
    priceFrom: null,
    desc: 'Independent inspection with a detailed written report before you commit to buying a used car.',
    Icon: ClipboardCheck,
    priority: false,
  },
  {
    slug: 'battery-replacement',
    label: 'Battery replacement',
    priceFrom: null,
    desc: 'Heavy-duty replacement, delivered, installed, old battery responsibly recycled. Quick on-site fit.',
    Icon: Battery,
    priority: false,
  },
  {
    slug: 'car-diagnostics',
    label: 'Warning-light diagnostics',
    priceFrom: null,
    desc: 'Engine light, transmission light, ABS, traction control. Professional OBD scan plus physical fault-finding, with a clear written explanation.',
    Icon: ScanLine,
    priority: false,
  },
  {
    slug: 'steering-suspension',
    label: 'Steering & suspension',
    priceFrom: null,
    desc: 'Clunks, vibrations, uneven tyre wear. Control arms, ball joints, shocks, bushes. Repaired on-site at your home.',
    Icon: MoveVertical,
    priority: false,
  },
  {
    slug: 'emergency-call-outs',
    label: 'Emergency call-outs',
    priceFrom: null,
    priceLabel: 'Call now',
    desc: 'Broken down? Won’t start? Call us first for the fastest response. We aim for same-day where possible across our coverage area.',
    Icon: TriangleAlert,
    priority: false,
    callOnly: true,
  },
]

const SITE_URL = 'https://www.mymechanicqld.com.au'

export default function ServicesHubPage() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mobile mechanic services',
    description:
      'Nine mobile mechanic services available at customer locations across Brisbane, Logan, Ipswich and the Gold Coast.',
    numberOfItems: SERVICES.filter((s) => !('callOnly' in s && s.callOnly)).length,
    itemListElement: SERVICES.filter((s) => !('callOnly' in s && s.callOnly)).map(
      (s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Service',
          name: s.label,
          url: `${SITE_URL}/${s.slug}/`,
          ...(s.priceFrom != null && {
            offers: {
              '@type': 'Offer',
              price: String(s.priceFrom),
              priceCurrency: 'AUD',
              availability: 'https://schema.org/InStock',
            },
          }),
        },
      })
    ),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services/` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Our mobile services</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Workshop-grade repairs, delivered to your driveway.
          </h1>
          <p className="lead mt-6">
            Nine mobile services across Brisbane, Logan, Ipswich and the Gold Coast. Fixed-price
            quotes, OEM-spec parts, and a workmanship warranty on every job.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href={"/book/" as `/${string}`} className="btn btn-primary">
              Get a fixed-price quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn btn-secondary">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>

      {/* All services */}
      <section className="pb-14 md:pb-20 lg:pb-24">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => {
              const isPhone = s.callOnly === true
              const cardClass =
                'group bg-surface border border-hairline rounded-2xl p-6 md:p-7 ' +
                'flex flex-col gap-4 no-underline transition-all ' +
                'hover:border-accent hover:-translate-y-0.5 ' +
                'hover:shadow-[0_1px_2px_rgba(12,10,9,.04),0_8px_24px_rgba(30,58,138,.06)]'
              const body = (
                <>
                  <div className="flex justify-between items-start gap-3">
                    <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
                      <s.Icon className="size-[22px]" strokeWidth={1.75} />
                    </div>
                    {s.priority && (
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em]
                                       px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
                        Most popular
                      </span>
                    )}
                    {isPhone && (
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em]
                                       px-2 py-1 rounded-full bg-accent-tint text-accent border border-accent/30">
                        Call us
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink mb-1.5 leading-snug">{s.label}</h3>
                    <p className="text-[0.9375rem] text-muted leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <div className="text-[0.875rem] text-ink">
                      {s.priceFrom !== null ? (
                        <>
                          <span className="text-xs uppercase tracking-[0.05em] text-subtle font-medium mr-1.5">
                            {s.priceLabel ?? 'From'}
                          </span>
                          <span className="font-semibold">${s.priceFrom}</span>
                        </>
                      ) : (
                        <span className="text-xs uppercase tracking-[0.05em] text-subtle font-medium">
                          {s.priceLabel ?? 'Get a quote'}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-accent-bright inline-flex items-center gap-1">
                      {isPhone ? (
                        <>
                          <Phone className="size-3.5" strokeWidth={2} />
                          0451 159 954
                        </>
                      ) : (
                        <>
                          Read more
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                        </>
                      )}
                    </span>
                  </div>
                </>
              )
              return isPhone ? (
                <a key={s.slug} href="tel:0451159954" className={cardClass}>
                  {body}
                </a>
              ) : (
                <Link key={s.slug} href={`/${s.slug}/` as `/${string}`} className={cardClass}>
                  {body}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Tell us the symptoms in plain English and we&apos;ll work it out. Fixed-price quote upfront.
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
