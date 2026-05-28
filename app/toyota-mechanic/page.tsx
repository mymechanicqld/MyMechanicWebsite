import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  Check,
  Wrench,
  Gauge,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Toyota Mechanic Brisbane | Mobile Service & Repair | My Mechanic QLD',
  description:
    "Mobile Toyota mechanic across Brisbane, Logan, Ipswich & Gold Coast. Camry, Corolla, RAV4, Kluger, Prado, Land Cruiser servicing and repairs at your driveway. Fixed-price quote before any work begins.",
  alternates: { canonical: '/toyota-mechanic/' },
  openGraph: {
    title: 'Mobile Toyota Mechanic Brisbane | My Mechanic QLD',
    description:
      'Toyota servicing and repairs at your driveway across South East Queensland.',
    url: '/toyota-mechanic/',
    type: 'website',
  },
}

const SITE_URL = 'https://www.mymechanicqld.com.au'

const MODELS = [
  { name: 'Corolla', note: '1.8L petrol, hybrid' },
  { name: 'Camry', note: '2.5L petrol, hybrid' },
  { name: 'RAV4', note: 'petrol, hybrid' },
  { name: 'Kluger', note: 'V6 + hybrid AWD' },
  { name: 'Yaris', note: 'Yaris & Yaris Cross' },
  { name: 'C-HR', note: 'petrol, hybrid' },
  { name: 'Prado', note: '2.8L diesel, 4.0L petrol' },
  { name: 'Land Cruiser', note: '70, 200, 300 series' },
  { name: 'Fortuner', note: '2.8L diesel' },
]

const COMMON_ISSUES = [
  {
    title: 'Oil consumption on older 2AZ-FE engines',
    body: "Pre-2010 Camry and RAV4 with the 2AZ-FE 2.4L engine often consume oil through worn piston rings by 180,000 km. We check oil level every visit and recommend an interval reduction if consumption is high.",
  },
  {
    title: 'Water pump failures on V6 Klugers and Prados',
    body: "The 2GR-FE V6 and the 1GR-FE V6 both develop water pump weeps around 140,000 to 180,000 km. The pump is timing-chain driven on the 2GR-FE, so we recommend planning the replacement.",
  },
  {
    title: 'VVT-i oil control valve failures',
    body: "Almost every Toyota petrol engine since 2005 uses VVT-i (variable valve timing). The oil control valve clogs over time, especially with extended service intervals. Symptoms: rough idle, oil pressure warning, sometimes a P0011 or P0012 fault code.",
  },
  {
    title: 'Hilux and Prado DPF regeneration issues',
    body: "Modern 2.8L 1GD-FTV diesels (Hilux, Prado, Fortuner) clog the diesel particulate filter when short-tripped. We perform forced regenerations on-site; a properly serviced filter regenerates passively on a 30-minute highway run.",
  },
  {
    title: 'Land Cruiser 200 series fuel filter neglect',
    body: "The 1VD-FTV V8 diesel in the 200 series needs the secondary fuel filter changed at every major service, not just every other one. Skipped filter intervals lead to injector wear that can be a major repair.",
  },
  {
    title: 'Older Hilux IFS suspension wear',
    body: "Independent front suspension on Hilux models from 2005 onwards wears at the upper ball joints first, lower control arm bushes second. We replace pairs, not individuals, on the front of any IFS Hilux.",
  },
]

const SERVICE_INTERVALS = [
  { model: 'Corolla, Camry, RAV4, Kluger, Yaris, C-HR (since 2015)', interval: '15,000 km or 12 months, whichever first' },
  { model: 'Prado, Fortuner, Hilux 1GD-FTV (post-2015 diesel)', interval: '15,000 km or 12 months' },
  { model: 'Older Hilux 1KD-FTV / 2KD-FTV (pre-2015 diesel)', interval: '10,000 km or 6 months' },
  { model: 'Land Cruiser 200 / 300 series diesel', interval: '10,000 km or 6 months (severe duty)' },
  { model: 'Toyota hybrid models (Camry, RAV4, Corolla Hybrid)', interval: '15,000 km or 12 months' },
]

export default function ToyotaMechanicPage() {
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mobile Toyota mechanic Brisbane',
    serviceType: 'Toyota servicing and repair',
    provider: {
      '@type': 'AutoRepair',
      name: 'My Mechanic QLD',
      url: SITE_URL,
      telephone: '+61451159954',
    },
    areaServed: [
      { '@type': 'City', name: 'Brisbane' },
      { '@type': 'City', name: 'Logan' },
      { '@type': 'City', name: 'Ipswich' },
      { '@type': 'City', name: 'Gold Coast' },
    ],
    brand: { '@type': 'Brand', name: 'Toyota' },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Toyota mechanic', item: `${SITE_URL}/toyota-mechanic/` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Toyota specialist · Mobile</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Mobile Toyota mechanic, Brisbane to Gold Coast.
          </h1>
          <p className="lead mt-6">
            Camry, Corolla, RAV4, Kluger, Hilux, Prado, Land Cruiser. We service most Toyota
            models on-site for logbook servicing, brakes, batteries, suspension, cooling-system
            work and pre-purchase inspections at the customer&apos;s home, office or kerbside.
            Manufacturer-spec servicing, OEM-spec filters and correct-grade oil. Fixed-price
            quotes and a workmanship warranty per our terms, plus your Australian Consumer Law
            rights.
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
      </section>

      {/* Models */}
      <section className="py-12 md:py-16 bg-surface border-y border-hairline">
        <div className="container max-w-4xl">
          <span className="eyebrow">Models we service most</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-8">
            From the Yaris hatchback to the 70 Series Land Cruiser.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MODELS.map((m) => (
              <div
                key={m.name}
                className="bg-bg border border-hairline rounded-xl p-4 flex items-center gap-3"
              >
                <div className="size-9 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
                  <Check className="size-[18px]" strokeWidth={2.25} />
                </div>
                <div>
                  <div className="font-semibold text-ink leading-tight">{m.name}</div>
                  <div className="text-[0.8125rem] text-muted">{m.note}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[0.9375rem] text-muted mt-6">
            Less common Toyota models (Aurion, 86, Supra, older Tarago) are case by
            case. Call us with the year and model and we will tell you straight.
          </p>
        </div>
      </section>

      {/* Service intervals */}
      <section className="py-14 md:py-20">
        <div className="container max-w-3xl">
          <div className="flex gap-3 items-start mb-6">
            <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
              <Gauge className="size-[22px]" strokeWidth={1.75} />
            </div>
            <div>
              <span className="eyebrow">Service intervals</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
                Toyota servicing schedule, by model.
              </h2>
            </div>
          </div>
          <p className="prose-mmq mb-6">
            Toyota Australia moved most petrol models to a 15,000 km or 12-month interval (whichever
            comes first) in 2015. Older diesels still want 10,000 km. Short-trip drivers should
            halve the interval whatever the model.
          </p>
          <div className="overflow-x-auto border border-hairline rounded-xl">
            <table className="w-full border-collapse min-w-[480px]">
              <thead className="bg-soft">
                <tr>
                  <th className="text-left text-xs font-semibold text-subtle uppercase tracking-[0.06em] p-3.5 border-b border-hairline">
                    Model range
                  </th>
                  <th className="text-left text-xs font-semibold text-subtle uppercase tracking-[0.06em] p-3.5 border-b border-hairline">
                    Service interval
                  </th>
                </tr>
              </thead>
              <tbody>
                {SERVICE_INTERVALS.map((row, i) => (
                  <tr key={row.model} className={i % 2 === 1 ? 'bg-soft/40' : 'bg-surface'}>
                    <td className="text-[0.9375rem] p-3.5 border-b border-hairline/60 text-ink/90">
                      {row.model}
                    </td>
                    <td className="text-[0.9375rem] p-3.5 border-b border-hairline/60 font-semibold text-ink">
                      {row.interval}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[0.875rem] text-subtle mt-4">
            We follow the logbook for your specific year and model. The schedule above is general
            guidance for the most common variants.
          </p>
        </div>
      </section>

      {/* Common issues */}
      <section className="py-14 md:py-20 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <div className="flex gap-3 items-start mb-8">
            <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
              <AlertTriangle className="size-[22px]" strokeWidth={1.75} />
            </div>
            <div>
              <span className="eyebrow">Common issues we see</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
                The faults we know to look for.
              </h2>
            </div>
          </div>
          <div className="space-y-5">
            {COMMON_ISSUES.map((issue) => (
              <div
                key={issue.title}
                className="bg-surface border border-hairline rounded-xl p-5 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-semibold mb-2 leading-snug">
                  {issue.title}
                </h3>
                <p className="text-[0.9375rem] text-muted leading-relaxed">{issue.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing callout */}
      <section className="py-14 md:py-20">
        <div className="container max-w-3xl">
          <div className="bg-surface border border-hairline rounded-2xl p-6 md:p-8">
            <span className="eyebrow">Toyota pricing</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-4">
              Fixed price, in writing, before any work begins.
            </h2>
            <p className="text-[0.9375rem] text-muted leading-relaxed mb-5">
              Toyota pricing depends on the model, year, engine and what specifically needs doing.
              Call us with your details and we will give you a real number on the spot.
            </p>
            <p className="text-[0.875rem] text-muted">
              See <Link href={"/pricing/" as `/${string}`} className="text-accent-bright font-semibold">how our pricing works</Link>{' '}
              for the principles behind every quote.
            </p>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-14 md:py-20 bg-surface border-y border-hairline">
        <div className="container max-w-3xl">
          <span className="eyebrow">Why Toyota owners pick us</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-8">
            Four things you get with every visit.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { Icon: Wrench, title: 'Experienced mechanic', body: 'Years of hands-on experience across Toyota models before going mobile.' },
              { Icon: ShieldCheck, title: 'Genuine or OEM-spec parts', body: 'OEM or quality aftermarket parts and fluids that meet or exceed Toyota Genuine specifications.' },
              { Icon: Check, title: 'Warranty-safe servicing', body: 'Manufacturer-spec logbook stamping so your new-car warranty stays intact, as protected by Australian Consumer Law consumer guarantees.' },
              { Icon: Gauge, title: 'Fixed-price quotes', body: 'In writing before any work begins. No surprise additions on the invoice.' },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="bg-bg border border-hairline rounded-xl p-5">
                <div className="size-10 rounded-lg bg-accent-tint text-accent grid place-items-center mb-4">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-ink mb-1.5">{title}</h3>
                <p className="text-[0.9375rem] text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Book a mobile Toyota mechanic.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Fixed-price quote before any work begins. Same-day service available across our
            coverage area.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={"/book/" as `/${string}`} className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent">
              Get a quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn bg-transparent text-white border-white/40 hover:bg-white/10">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
