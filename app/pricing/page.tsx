import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  Check,
  X,
  DollarSign,
  FileText,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing | Mobile Mechanic Brisbane, Logan, Ipswich & Gold Coast | My Mechanic QLD',
  description:
    "How our pricing works. Fixed-price quotes in writing before any spanners come out. OEM-spec parts and labour included, no surprise additions. Call us with your make and model for a real number.",
  alternates: { canonical: '/pricing/' },
  openGraph: {
    title: 'Transparent pricing | My Mechanic QLD',
    description:
      "Fixed-price quote in writing before any spanners come out. Call us with your make and model for a real number.",
    url: '/pricing/',
    type: 'website',
  },
}

const FAQS = [
  {
    q: 'How much does a car service cost in Brisbane?',
    a: 'As a general market guide, routine servicing in Brisbane typically ranges from $188 to $449 depending on whether it is a minor or major service and the size of the vehicle, before any extra repairs. We quote a fixed price upfront for your specific make and model. Call us with the details and we will give you the real number on the spot.',
  },
  {
    q: 'Why are larger vehicles more expensive to service?',
    a: 'Bigger engines use more oil. Mid-size SUV oil changes are 6 to 8 litres. Large diesels can be 10+ litres. Heavy-duty filters cost more. The work itself is also slower because access is tighter on a 4WD. We charge for the actual parts and labour, never a flat fee that subsidises one vehicle from another.',
  },
  {
    q: 'How do you make sure the quote does not change?',
    a: 'We quote based on a real inspection or a detailed phone description, not a guess. The quote covers the parts, labour and fluids for the job described. If we find something else while we are in there, we stop and call you with a separate fixed-price quote before doing anything. Nothing appears on the invoice that you have not agreed to.',
  },
  {
    q: 'What if I have been quoted less elsewhere?',
    a: 'Tell us, and we will tell you straight whether the other quote is realistic. Some workshops use a low headline price and add charges during the job. Others genuinely run different overheads and can quote lower. We do not chase the bottom, but we are happy to explain what is in our price so you can make an honest comparison.',
  },
  {
    q: 'Can I get a quote without you coming out first?',
    a: 'For most common jobs (logbook services, brake replacements, batteries, alternators, water pumps), yes. Tell us the make, model, year and the symptoms and we will send you a fixed price. Pre-purchase inspections and some diagnostic jobs need us on-site to confirm the price.',
  },
  {
    q: 'How do I pay?',
    a: 'Tap or insert with the card reader, bank transfer, or emailed invoice (terms agreed in advance). We send an itemised invoice straight to your email after every job.',
  },
]

const SITE_URL = 'https://www.mymechanicqld.com.au'

export default function PricingPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${SITE_URL}/pricing/` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Pricing</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Fixed price, in writing, before any work begins.
          </h1>
          <p className="lead mt-6">
            We do not publish a price list because no two cars are the same. What we do publish is
            exactly how we put a price together, what is included, and how to get a real number for
            your specific vehicle without a callout.
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

      {/* Three principles */}
      <section className="py-14 md:py-20 bg-surface border-y border-hairline">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <span className="eyebrow">How we price</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 max-w-[20ch]">
              Three principles, every job.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                Icon: FileText,
                title: 'Quote in writing before we start',
                body: 'You see the full price in writing before any spanners come out, including parts, labour, fluids and any consumables.',
              },
              {
                Icon: DollarSign,
                title: 'No surprise additions',
                body: 'If we find something else mid-job, we stop and call you with a separate fixed quote. Nothing extra goes on the invoice without your agreement.',
              },
              {
                Icon: ShieldCheck,
                title: 'Honest market comparison',
                body: 'We tell you straight whether another quote is realistic and what is in our price, so you can make an apples-to-apples comparison.',
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-bg border border-hairline rounded-2xl p-6 md:p-7"
              >
                <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center mb-5">
                  <Icon className="size-[22px]" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2 leading-snug">{title}</h3>
                <p className="text-[0.9375rem] text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market context */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container max-w-3xl">
          <span className="eyebrow">Market context</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 max-w-[22ch]">
            What car servicing actually costs in Brisbane.
          </h2>
          <div className="mt-7 space-y-5 text-[1.0625rem] text-ink/90 leading-[1.75]">
            <p>
              As a general guide to the Brisbane market, routine servicing is reported to range from{' '}
              <strong className="text-ink">$188 to $449</strong> depending on vehicle and service
              tier. Your fixed-price quote from us will be specific to your make, model and what the
              logbook calls for.
            </p>
            <p>
              Most independent workshops in Brisbane charge labour anywhere from{' '}
              <strong className="text-ink">$80 to $160 per hour</strong>, with diagnostic work and
              specialised platforms typically at the upper end. Mobile mechanics often charge less
              per hour because there is no workshop overhead to recover.
            </p>
            <p>
              Where we sit inside that range depends on your vehicle. A minor service on a Mazda 3
              is at the lower end. A major service on a Land Cruiser is at the upper end. We will
              tell you exactly where your job lands before any work starts.
            </p>
          </div>
        </div>
      </section>

      {/* Included / not included */}
      <section className="py-14 md:py-20 bg-soft border-y border-hairline">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <div className="flex gap-3 items-center mb-5">
                <div className="size-10 rounded-lg bg-accent-tint text-accent grid place-items-center">
                  <Check className="size-5" strokeWidth={2.25} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">Every quote includes</h2>
              </div>
              <ul className="space-y-2.5 text-[0.9375rem] text-ink/90">
                {[
                  'OEM-spec or quality aftermarket parts and fluids that meet or exceed manufacturer specifications',
                  'All labour, including diagnosis, fitment and road test',
                  'Fluids and consumables needed for the job',
                  'Disposal of replaced parts where applicable (old battery, brake pads, coolant)',
                  'Workmanship and parts warranty, plus your statutory rights under the Australian Consumer Law',
                  'Itemised invoice emailed after the job',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <Check className="size-[18px] text-accent-bright shrink-0 mt-0.5" strokeWidth={2.25} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex gap-3 items-center mb-5">
                <div className="size-10 rounded-lg bg-soft-foreground/10 text-ink/70 grid place-items-center border border-hairline">
                  <X className="size-5" strokeWidth={2.25} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">Not included</h2>
              </div>
              <ul className="space-y-2.5 text-[0.9375rem] text-ink/90">
                {[
                  'Wheel alignment (this needs a workshop with an alignment rig)',
                  'Tyre fitting and balancing (a separate tyre fitter is better-equipped)',
                  'Major panel beating or smash repair',
                  'Auto electrical work beyond batteries and code reading',
                  'Air-conditioning regas or A/C repair',
                  'Customer-supplied parts (we fit only parts we have sourced)',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <X className="size-[18px] text-subtle shrink-0 mt-0.5" strokeWidth={2.25} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[0.875rem] text-subtle mt-4 leading-relaxed">
                Where a job needs work outside our scope, we will tell you straight and recommend a
                specialist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container max-w-3xl">
          <span className="eyebrow">Pricing FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-8">
            Common pricing questions.
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group bg-surface border border-hairline rounded-xl p-5 md:p-6"
              >
                <summary className="cursor-pointer font-semibold text-ink list-none flex justify-between items-start gap-4 text-[1.0625rem]">
                  <span className="flex-1">{f.q}</span>
                  <ChevronRight
                    className="size-5 text-subtle shrink-0 mt-0.5 transition-transform group-open:rotate-90"
                    strokeWidth={2}
                  />
                </summary>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Get a fixed-price quote for your job.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Call us or fill out the online form with your make, model and what is happening. We
            quote a real price upfront, no surprise additions.
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
