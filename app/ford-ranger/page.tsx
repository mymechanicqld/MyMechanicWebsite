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
  title: 'Ford Ranger Mechanic Brisbane | Mobile Service & Repair | My Mechanic QLD',
  description:
    "Mobile Ford Ranger mechanic across Brisbane, Logan, Ipswich & Gold Coast. PX, PX2, PX3 and Next-Gen Ranger servicing and repairs. 2.0 Bi-Turbo, 3.0 V6, 3.2 5-cyl. Fixed-price quote before any work begins.",
  alternates: { canonical: '/ford-ranger/' },
  openGraph: {
    title: 'Mobile Ford Ranger Mechanic Brisbane | My Mechanic QLD',
    description: 'Ford Ranger servicing and repairs at your driveway across South East Queensland.',
    url: '/ford-ranger/',
    type: 'website',
  },
}

const SITE_URL = 'https://www.mymechanicqld.com.au'

const VARIANTS = [
  { name: 'PX (2011–2015)', note: '2.2L & 3.2L diesel' },
  { name: 'PX2 (2015–2018)', note: '2.2L & 3.2L diesel' },
  { name: 'PX3 (2018–2022)', note: '2.0L Bi-Turbo, 3.2L 5-cyl' },
  { name: 'Next-Gen Ranger (2022+)', note: '2.0L SiT, Bi-Turbo, 3.0L V6' },
  { name: 'Raptor (2018–2022, 2.0 Bi-Turbo)', note: 'High-spec performance' },
  { name: 'Everest', note: 'Ranger-based 7-seat SUV' },
]

const COMMON_ISSUES = [
  {
    title: '3.2L 5-cyl EGR cooler failures',
    body: "The 3.2L 5-cylinder diesel in PX2 and PX3 Rangers has well-documented EGR cooler failures around 100,000 to 150,000 km. Symptoms: white smoke under load, coolant loss, sometimes a P0401 fault code. It is a significant workshop repair; we diagnose and refer for the actual replacement (engine bay access needs a hoist).",
  },
  {
    title: 'Oil cooler failures (3.2L 5-cyl)',
    body: "The oil cooler on the 3.2L sits internally and develops cross-leaks between the oil and coolant circuits. Symptoms: milky oil on the dipstick, sometimes a sweet smell. Like the EGR cooler, the repair needs a workshop hoist.",
  },
  {
    title: '6R80 automatic transmission roughness',
    body: "The ZF-derived 6R80 6-speed auto in PX and PX2 Rangers can develop harsh 2-3 shift behaviour around 120,000 km. Often a fluid drain-and-fill with the correct Ford-spec ATF improves it dramatically. We do this on-site.",
  },
  {
    title: 'Front diff bearing whine (4WD models)',
    body: "Ranger and Everest 4WD models develop a faint whine from the front differential around 130,000 km, especially if the four-wheel-drive system has been engaged often (sand driving, beach work). Diagnosis is on-site; the repair is typically a workshop job.",
  },
  {
    title: 'Bi-Turbo timing belt service (2.0L)',
    body: "The 2.0L Bi-Turbo in PX3 Rangers uses a wet timing belt. Ford specifies a long replacement interval — check your logbook for the current figure on your year and model. We do not do this on-site (it requires special tools and a clean environment), but we monitor for early signs and refer for the work.",
  },
  {
    title: 'Front brake rotor warping under towing load',
    body: "Rangers used heavily for towing (caravans, boats, work trailers) often warp the front brake rotors before the pads are even worn. Symptoms: pedal pulsing under brakes, particularly from highway speed. We replace front pads and rotors as an axle set on-site.",
  },
]

const SERVICE_INTERVALS = [
  { model: 'Ranger PX, PX2, PX3 (all diesels)', interval: '15,000 km or 12 months' },
  { model: 'Next-Gen Ranger 2.0 / 3.0 V6 (2022+)', interval: '15,000 km or 12 months' },
  { model: 'Ranger Raptor 3.0 V6 petrol', interval: '15,000 km or 12 months' },
  { model: 'Ranger / Everest used for heavy towing', interval: 'Halve the manufacturer interval' },
]

export default function FordRangerPage() {
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mobile Ford Ranger mechanic Brisbane',
    serviceType: 'Ford Ranger servicing and repair',
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
    brand: { '@type': 'Brand', name: 'Ford Ranger' },
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Ford Ranger', item: `${SITE_URL}/ford-ranger/` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Ford Ranger specialist · Mobile</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Mobile Ford Ranger mechanic, Brisbane to Gold Coast.
          </h1>
          <p className="lead mt-6">
            PX, PX2, PX3, Next-Gen Ranger and Everest. 2.2L and 3.2L 5-cylinder diesels, 2.0L
            Bi-Turbo, 3.0L V6. Mobile servicing and repairs across South East Queensland.
            Manufacturer-spec parts and the correct Ford-spec ATF for your transmission.
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
          <span className="eyebrow">Ranger generations we service</span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-8">
            From the 2011 PX to the V6 Next-Gen.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {VARIANTS.map((v) => (
              <div key={v.name} className="bg-bg border border-hairline rounded-xl p-4 flex items-center gap-3">
                <div className="size-9 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
                  <Check className="size-[18px]" strokeWidth={2.25} />
                </div>
                <div>
                  <div className="font-semibold text-ink leading-tight">{v.name}</div>
                  <div className="text-[0.8125rem] text-muted">{v.note}</div>
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
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">Ranger servicing schedule.</h2>
            </div>
          </div>
          <p className="prose-mmq mb-6">
            All recent Rangers run a 15,000 km or 12-month interval. Towing-heavy use halves it.
            The Next-Gen V6 in particular benefits from sticking to the schedule because the
            engine is more sensitive to oil quality than the older 5-cylinder.
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
              <span className="eyebrow">Common Ranger issues</span>
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
            <span className="eyebrow">Ranger pricing</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-4">
              Fixed price, in writing, before any work begins.
            </h2>
            <p className="text-[0.9375rem] text-muted leading-relaxed mb-5">
              Ranger pricing depends on the variant, engine, kilometres and what specifically needs
              doing. Call us with your details and we will give you a real number on the spot.
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
            Book a mobile Ranger mechanic.
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
