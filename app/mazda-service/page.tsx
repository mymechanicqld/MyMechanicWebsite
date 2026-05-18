import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  Check,
  Gauge,
  AlertTriangle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mazda Mechanic Brisbane | Mobile Mazda Service & Repair | My Mechanic QLD',
  description:
    "Mobile Mazda mechanic across Brisbane, Logan, Ipswich & Gold Coast. Mazda 3, 6, CX-3, CX-5, CX-30, CX-9, BT-50 servicing and repairs at your driveway. Fixed-price quote before any work begins.",
  alternates: { canonical: '/mazda-service/' },
  openGraph: {
    title: 'Mobile Mazda Mechanic Brisbane | My Mechanic QLD',
    description: 'On-site Mazda servicing and repairs across South East Queensland.',
    url: '/mazda-service/',
    type: 'website',
  },
}

const SITE_URL = 'https://www.mymechanicqld.com.au'

const MODELS = [
  { name: 'Mazda 3', note: 'BL, BM, BN, BP — hatch & sedan' },
  { name: 'Mazda 6', note: 'GJ, GL — sedan & wagon' },
  { name: 'CX-3', note: 'Compact SUV' },
  { name: 'CX-30', note: 'Mid-compact SUV' },
  { name: 'CX-5', note: 'KE, KF — petrol & diesel' },
  { name: 'CX-8', note: 'Petrol & diesel 7-seat' },
  { name: 'CX-9', note: '2.5L turbo petrol' },
  { name: 'BT-50', note: 'Pre-2020 Ranger-based, post-2020 Isuzu-based' },
  { name: 'MX-5', note: 'NC, ND roadster' },
]

const COMMON_ISSUES = [
  {
    title: 'SkyActiv-G carbon buildup on intake valves',
    body: "All direct-injection SkyActiv-G petrol engines (Mazda 3, CX-3, CX-30, CX-5 petrol) build carbon on the intake valves over time. Symptoms appear around 100,000 to 140,000 km: rough idle, slight power loss, occasional misfire on cold start. We diagnose intake-valve carbon and refer you to a workshop for walnut-blasting where the symptoms call for it.",
  },
  {
    title: 'i-Stop start-stop system battery drain',
    body: "Mazda's i-Stop system uses a special enhanced flooded battery. A standard replacement battery often triggers a fault code and disables i-Stop. We fit the correct EFB or AGM battery so i-Stop continues to function correctly.",
  },
  {
    title: 'CX-9 torque converter shudder',
    body: "Early CX-9 (TC platform) automatic transmissions develop a low-speed shudder around 80,000 km, traceable to the torque converter. A transmission fluid drain-and-fill with the correct Mazda-spec ATF sometimes resolves it; otherwise the torque converter needs replacement (workshop job).",
  },
  {
    title: 'CX-5 diesel DPF in city driving',
    body: "The 2.2L SkyActiv-D diesel in the CX-5 clogs the DPF on city-only duty cycles. We perform forced regenerations on-site. Customers using the diesel exclusively for short trips should consider the petrol model on the next replacement.",
  },
  {
    title: 'Mazda 3 BL/BM engine mount wear',
    body: "The right-side engine mount on Mazda 3 BL and early BM models cracks around 120,000 km. Symptoms: vibration through the steering wheel at idle, slight thump when shifting from park to drive. Replacement is straightforward and we do it on-site.",
  },
  {
    title: 'BT-50 (Ranger-based) front shock wear',
    body: "Pre-2020 BT-50 shares running gear with the Ford Ranger. Front shocks wear around 90,000 to 120,000 km. We replace in axle pairs on-site.",
  },
]

const SERVICE_INTERVALS = [
  { model: 'Mazda 3, CX-3, CX-30 (since 2016)', interval: '10,000 km or 12 months' },
  { model: 'Mazda 6, CX-5, CX-8, CX-9', interval: '10,000 km or 12 months' },
  { model: 'BT-50 (Ranger-based, pre-2020)', interval: '15,000 km or 12 months' },
  { model: 'BT-50 (Isuzu-based, post-2020)', interval: '15,000 km or 12 months' },
  { model: 'Mazda MX-5', interval: '10,000 km or 12 months' },
]

export default function MazdaServicePage() {
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mobile Mazda mechanic Brisbane',
    serviceType: 'Mazda servicing and repair',
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
    brand: { '@type': 'Brand', name: 'Mazda' },
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Mazda service', item: `${SITE_URL}/mazda-service/` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Mazda specialist · Mobile</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Mobile Mazda mechanic, Brisbane to Gold Coast.
          </h1>
          <p className="lead mt-6">
            Mazda 3, 6, CX-3, CX-5, CX-30, CX-8, CX-9, BT-50, MX-5. SkyActiv-G and SkyActiv-D
            engines. On-site servicing and repairs across South East Queensland. Manufacturer-spec
            parts, Mazda Genuine or OEM-spec filters, the correct Mazda-spec ATF for the automatic.
            Workmanship warranty per our terms, plus your Australian Consumer Law rights.
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

      <section className="py-12 md:py-16 bg-surface border-y border-hairline">
        <div className="container max-w-4xl">
          <span className="eyebrow">Models we service most</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-8">
            Every Mazda from the MX-5 to the CX-9.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {MODELS.map((m) => (
              <div key={m.name} className="bg-bg border border-hairline rounded-xl p-4 flex items-center gap-3">
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
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container max-w-3xl">
          <div className="flex gap-3 items-start mb-6">
            <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
              <Gauge className="size-[22px]" strokeWidth={1.75} />
            </div>
            <div>
              <span className="eyebrow">Service intervals</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">Mazda servicing schedule.</h2>
            </div>
          </div>
          <p className="prose-mmq mb-6">
            Most Mazdas (since the 2016 SkyActiv generation) run a 10,000 km or 12-month interval.
            Stricter than Toyota or Hyundai but consistent with Mazda&apos;s engineering specs.
            Short-trip drivers should halve it.
          </p>
          <div className="overflow-x-auto border border-hairline rounded-xl">
            <table className="w-full border-collapse min-w-[480px]">
              <thead className="bg-soft">
                <tr>
                  <th className="text-left text-xs font-semibold text-subtle uppercase tracking-[0.06em] p-3.5 border-b border-hairline">Model</th>
                  <th className="text-left text-xs font-semibold text-subtle uppercase tracking-[0.06em] p-3.5 border-b border-hairline">Interval</th>
                </tr>
              </thead>
              <tbody>
                {SERVICE_INTERVALS.map((row, i) => (
                  <tr key={row.model} className={i % 2 === 1 ? 'bg-soft/40' : 'bg-surface'}>
                    <td className="text-[0.9375rem] p-3.5 border-b border-hairline/60 text-ink/90">{row.model}</td>
                    <td className="text-[0.9375rem] p-3.5 border-b border-hairline/60 font-semibold text-ink">{row.interval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <div className="flex gap-3 items-start mb-8">
            <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
              <AlertTriangle className="size-[22px]" strokeWidth={1.75} />
            </div>
            <div>
              <span className="eyebrow">Common Mazda issues</span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">What we know to look for.</h2>
            </div>
          </div>
          <div className="space-y-5">
            {COMMON_ISSUES.map((issue) => (
              <div key={issue.title} className="bg-surface border border-hairline rounded-xl p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 leading-snug">{issue.title}</h3>
                <p className="text-[0.9375rem] text-muted leading-relaxed">{issue.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container max-w-3xl">
          <div className="bg-surface border border-hairline rounded-2xl p-6 md:p-8">
            <span className="eyebrow">Mazda pricing</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-4">
              Fixed price, in writing, before any work begins.
            </h2>
            <p className="text-[0.9375rem] text-muted leading-relaxed mb-5">
              Mazda pricing depends on the model, year, engine and what specifically needs doing.
              Call us with your details and we will give you a real number on the spot.
            </p>
            <p className="text-[0.875rem] text-muted">
              See <Link href={"/pricing/" as `/${string}`} className="text-accent-bright font-semibold">how our pricing works</Link>{' '}
              for the principles behind every quote.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Book a mobile Mazda mechanic.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Fixed-price quote before any work begins. Same-day service available.
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
