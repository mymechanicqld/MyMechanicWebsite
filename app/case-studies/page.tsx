import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  AlertTriangle,
  DollarSign,
  CheckCircle2,
  ClipboardCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Case Studies | What We Found on Pre-Purchase Inspections | My Mechanic QLD',
  description:
    "Real (anonymised) stories from our pre-purchase inspections across Brisbane, Logan and the Gold Coast. The hidden faults we found, what they would have cost, and what each customer did next.",
  alternates: { canonical: '/case-studies/' },
  openGraph: {
    title: 'Case studies | My Mechanic QLD',
    description: 'Real stories from our pre-purchase inspections and repair jobs.',
    url: '/case-studies/',
    type: 'website',
  },
}

const SITE_URL = 'https://www.mymechanicqld.com.au'

const CASE_STUDIES = [
  {
    id: 'hilux-chassis-crack',
    vehicle: 'Toyota Hilux SR5 dual-cab, diesel auto',
    location: 'Inspection at the seller in Browns Plains',
    askingPrice: 'Mid-range used market price',
    headline: 'A hairline chassis crack the seller did not disclose',
    finding:
      "The ute looked clean on top. Logbook stamped. Service history complete. Two adults had inspected it before us and called it 'a good buy'. Under the rear of the ute, on the chassis rail next to the right rear shock mount, we found a hairline crack.",
    cause:
      "The crack was almost certainly the result of heavy unsupported towing. The ute had no aftermarket suspension. The factory load rating had likely been exceeded repeatedly. The crack had been there a while, the surrounding paint was disturbed and a small amount of surface rust was developing in the gap.",
    advice:
      "Chassis welding on a unibody load-bearing rail is not a small job. Done correctly, it requires the chassis to be jigged and certified. Insurance would not cover it. We told the customer to walk.",
    outcome:
      "The customer walked. He bought a different ute a few weeks later from a private seller. We inspected that one too. Clean. He still owns it.",
    saved: 'Avoided a major structural repair and long-tail risk of failure under load',
    Icon: AlertTriangle,
    accent: 'border-rose-300 bg-rose-50',
    accentText: 'text-rose-900',
    accentTextSoft: 'text-rose-900/85',
  },
  {
    id: 'mazda3-cleared-codes',
    vehicle: 'Mazda 3 Maxx Sport, manual',
    location: 'Inspection at a used-car dealer in Slacks Creek',
    askingPrice: 'Mid-range used market price',
    headline: 'The OBD scan that the dealer hoped we would skip',
    finding:
      "The car presented well. No warning lights, no rough running on the road test, no obvious leaks. Then we pulled the OBD scan. Inside the engine module: zero current codes (as expected), but several historical fault codes all cleared inside the previous 200 km. Misfire codes on cylinders 2 and 4, a lean-running code, and a catalytic converter efficiency code.",
    cause:
      "Someone had recently cleared the codes. The misfire codes alongside the lean-running and catalytic converter efficiency codes told a consistent story: ignition coils on the way out and almost certainly a catalytic converter under stress. The dealer had presumably hoped the customer would do a quick test drive and not notice.",
    advice:
      "We explained the likely near-term repair (ignition coils) and the medium-term repair (catalytic converter). We recommended walking unless the dealer dropped the price meaningfully.",
    outcome:
      "The customer negotiated the price down and decided to proceed. We did the coil replacement a couple of weeks later. The buyer went in with eyes open instead of a nasty surprise on the way home from work.",
    saved: 'Negotiated a lower price, plus visibility on future work',
    Icon: DollarSign,
    accent: 'border-amber-300 bg-amber-50',
    accentText: 'text-amber-900',
    accentTextSoft: 'text-amber-900/85',
  },
  {
    id: 'cx5-clean-buy',
    vehicle: 'Mazda CX-5 GT AWD, petrol auto',
    location: 'Inspection at the seller in Carindale',
    askingPrice: 'Mid-range used market price',
    headline: 'The inspection that confirmed what the seller said',
    finding:
      "Sometimes an inspection just verifies what you are being told. This CX-5 had been a one-owner garaged car from new. Service history was complete and stamped at the dealer for most of its life. Under the bonnet: no leaks, drive belt in good condition, battery a year old. OBD scan: clean, no historical codes. Brakes and tyres had even wear. No accident-repair signs in the body or underbody.",
    cause:
      "Nothing was wrong. The seller's story matched the car. This is the type of result that makes the inspection cost feel like overkill until you realise the price you would have paid if it had been bad.",
    advice:
      "We told the customer the car was as advertised. We pointed out that brakes would need attention in about a year and that the rear shock mounts had the slightest weep developing (typical at this mileage, not a now-issue).",
    outcome:
      "The customer bought it. Six months later he had us back to do a routine logbook service. We mentioned the brake life again; he booked the brake job for three months from now.",
    saved:
      'Mostly peace of mind. He bought the car knowing exactly what he was getting.',
    Icon: CheckCircle2,
    accent: 'border-emerald-300 bg-emerald-50',
    accentText: 'text-emerald-900',
    accentTextSoft: 'text-emerald-900/85',
  },
  {
    id: 'pajero-cylinder-head',
    vehicle: 'Mitsubishi Pajero GLX, diesel auto',
    location: 'Inspection at a private seller in Helensvale',
    askingPrice: 'Mid-range used market price',
    headline: 'A cracked cylinder head we caught on the road test',
    finding:
      "On the cold start, the exhaust steam took longer than normal for a warm Queensland morning to clear. On the road test, under hard acceleration up an incline, a faint puff of white smoke appeared in the rear-view mirror. We brought the car back to the seller, ran the engine to operating temperature, and used a combustion gas tester on the coolant reservoir. Positive for combustion gases. That confirmed it: the cylinder head was cracked, allowing combustion gases into the coolant. The owner had been topping up the coolant regularly but had not connected the dots.",
    cause:
      "The 4M41 engine in this generation Pajero has a known weakness around cylinder 4 if the cooling system has been neglected. The car had run hot at some point in its life. The crack had been progressing slowly. Eventually the head gasket would have failed completely and the engine would have overheated on the highway.",
    advice:
      "A cylinder head replacement on this engine is workshop-only work and a major repair once you factor in machining and timing-chain components that should be replaced at the same time. Plus the loss-of-use during repair. We recommended walking, hard.",
    outcome:
      "The customer walked. The seller eventually disclosed the coolant top-up situation to the next buyer and dropped the price. Two months later, the new buyer rebuilt the engine.",
    saved: 'Avoided a major workshop rebuild and the risk of roadside engine failure',
    Icon: AlertTriangle,
    accent: 'border-rose-300 bg-rose-50',
    accentText: 'text-rose-900',
    accentTextSoft: 'text-rose-900/85',
  },
]

export default function CaseStudiesPage() {
  // ItemList JSON-LD so AI tools and search engines understand the page
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pre-purchase inspection case studies',
    description:
      'Anonymised real stories from pre-purchase inspections carried out by My Mechanic QLD across South East Queensland.',
    numberOfItems: CASE_STUDIES.length,
    itemListElement: CASE_STUDIES.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.headline,
      description: c.finding.slice(0, 200),
      url: `${SITE_URL}/case-studies/#${c.id}`,
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Case studies', item: `${SITE_URL}/case-studies/` },
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
          <span className="eyebrow">Case studies</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            What we actually find on a pre-purchase inspection.
          </h1>
          <p className="lead mt-6">
            Anonymised stories from real customers across Brisbane, Logan and the Gold Coast. Some
            cars we recommended walking away from. Some we cleared. All of them are worth a few
            minutes of reading before you put a deposit down on a used car.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href={"/pre-purchase-inspection/" as `/${string}`} className="btn btn-primary">
              Book a pre-purchase inspection
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn btn-secondary">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-3xl">
          <div className="space-y-10 md:space-y-14">
            {CASE_STUDIES.map((c) => (
              <article
                key={c.id}
                id={c.id}
                className="scroll-mt-32 bg-surface border border-hairline rounded-2xl overflow-hidden"
              >
                <div className={`flex items-start gap-3 p-5 sm:p-6 border-b border-hairline ${c.accent}`}>
                  <c.Icon className={`size-6 shrink-0 mt-0.5 ${c.accentText}`} strokeWidth={2} />
                  <div className="flex-1">
                    <div className={`text-xs uppercase tracking-[0.06em] font-semibold ${c.accentTextSoft} mb-1`}>
                      {c.vehicle}
                    </div>
                    <h2 className={`text-xl md:text-2xl font-bold leading-tight ${c.accentText}`}>
                      {c.headline}
                    </h2>
                    <div className={`text-[0.875rem] ${c.accentTextSoft} mt-2`}>
                      {c.location} · Asking price: {c.askingPrice}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <CaseSection title="What we found" body={c.finding} />
                  <CaseSection title="What caused it" body={c.cause} />
                  <CaseSection title="What we advised" body={c.advice} />
                  <CaseSection title="What the customer did" body={c.outcome} />

                  <div className="pt-4 border-t border-hairline flex items-start gap-3">
                    <DollarSign className="size-5 text-accent-bright shrink-0 mt-0.5" strokeWidth={2} />
                    <div>
                      <div className="text-xs uppercase tracking-[0.06em] font-semibold text-subtle">
                        Estimated saving
                      </div>
                      <div className="font-semibold text-ink mt-1 leading-snug">{c.saved}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The point */}
      <section className="py-12 md:py-16 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <div className="flex gap-4 items-start">
            <div className="size-11 rounded-xl bg-accent text-white grid place-items-center shrink-0">
              <ClipboardCheck className="size-5" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Why these cases matter</h2>
              <p className="text-[1.0625rem] text-ink/90 leading-relaxed">
                Three of the four cases above ended with the customer either walking away or
                renegotiating off the asking price. The fourth confirmed a clean buy, which is
                exactly as useful when the price is real. A pre-purchase inspection is one of the
                cheapest ways to protect yourself when buying a used car. Call us for a fixed-price
                quote on your inspection.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href={"/pre-purchase-inspection/" as `/${string}`} className="btn btn-primary">
                  Book an inspection
                  <ArrowRight className="size-4" strokeWidth={2} />
                </Link>
                <Link
                  href={"/blog/pre-purchase-inspection-checklist/" as `/${string}`}
                  className="btn btn-secondary"
                >
                  Read the inspection checklist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[24ch] mx-auto mb-4">
            Looking at a used car this week?
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            We inspect at the seller&apos;s address across Brisbane, Logan, Ipswich and the Gold Coast.
            Written report with photos emailed inside four hours.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={"/pre-purchase-inspection/" as `/${string}`}
              className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent"
            >
              Book an inspection
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

function CaseSection({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-[0.06em] text-subtle font-semibold mb-1.5">
        {title}
      </h3>
      <p className="text-[0.9375rem] md:text-base text-ink/90 leading-[1.7]">{body}</p>
    </div>
  )
}
