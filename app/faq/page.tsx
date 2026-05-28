import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ | Mobile Mechanic Brisbane, Logan, Ipswich & Gold Coast | My Mechanic QLD',
  description:
    'Common questions about mobile mechanic services, pricing, warranty, coverage and booking, answered plainly. Call 0451 159 954 for anything not covered.',
  alternates: { canonical: '/faq/' },
  openGraph: {
    title: 'Frequently asked questions | My Mechanic QLD',
    description:
      'Plain-English answers about mobile mechanic services, pricing, warranty and coverage across South East Queensland.',
    url: '/faq/',
    type: 'website',
  },
}

type FaqItem = { q: string; a: string }
type FaqCategory = { id: string; name: string; items: FaqItem[] }

const CATEGORIES: FaqCategory[] = [
  {
    id: 'booking',
    name: 'Booking and quotes',
    items: [
      {
        q: 'How do I book a mobile mechanic?',
        a: 'Call us on 0451 159 954 during business hours, or send your details through the quote form. We come back with a fixed-price quote during business hours. Once you confirm, we book a day and a time and turn up.',
      },
      {
        q: 'Are your prices really fixed?',
        a: 'Yes. We quote you a fixed price before we lift a spanner. If something else turns up during the job, we stop and call you with a separate fixed quote before doing anything extra. Nothing appears on the bill that you did not agree to.',
      },
      {
        q: 'Do you charge a call-out fee?',
        a: 'No call-out fee within our coverage area. The price you see in the quote is the full price for the job.',
      },
      {
        q: 'Can I get a quote without you coming out first?',
        a: 'Yes. For most common jobs (logbook services, brake replacements, batteries, alternators) we can quote based on the make, model, year and the symptoms you describe. Pre-purchase inspections and some diagnostic jobs need us on-site to confirm the price.',
      },
      {
        q: 'How fast can you come out?',
        a: 'Same-day service is available, especially for breakdowns and quick repairs. Logbook services and bigger jobs are usually booked ahead. Call us with your situation and we will give you the soonest realistic time.',
      },
    ],
  },
  {
    id: 'coverage',
    name: 'Service area and response',
    items: [
      {
        q: 'Which suburbs do you cover?',
        a: 'We work a wide stretch of South East Queensland from Springwood, covering Brisbane, Logan, Ipswich and the northern Gold Coast. That includes Sunnybank, Carindale, Chermside, Wynnum, Cleveland, Springfield, Goodna, Coomera, Southport, Robina, Helensvale and many more. See the locations page for the full list.',
      },
      {
        q: 'What if I am just outside your coverage area?',
        a: 'Call us anyway on 0451 159 954. Some weeks we have time for a slightly longer trip. We will tell you straight if we can or can not get there.',
      },
      {
        q: 'How long does it take you to get to my place?',
        a: 'It depends on where you are and what is happening on the day. We text you with an ETA on the day of the booking. Logan and southern Brisbane are closest to our home base, so they typically see the fastest response.',
      },
      {
        q: 'Do you work Saturdays?',
        a: 'Yes, Saturday 8am to 5pm. Sundays we are closed.',
      },
    ],
  },
  {
    id: 'pricing-warranty',
    name: 'Pricing and warranty',
    items: [
      {
        q: 'How much does a logbook service cost?',
        a: 'As a general guide to the Brisbane market, routine servicing is reported to range from $188 to $449 depending on vehicle and service tier. Your fixed-price quote from us will be specific to your make, model and what the logbook calls for.',
      },
      {
        q: 'How much does a brake job cost?',
        a: 'Brake repair pricing depends on the vehicle and which axles need work. Sedans and small SUVs sit at the lower end, mid-size SUVs and utes (Hilux, Ranger) sit in the middle, and large SUVs and 4WDs (Land Cruiser, Pajero) at the upper end. Quotes include parts, labour, fluid top-up and a road test. Call us with the make and model for a real price.',
      },
      {
        q: 'What does your warranty cover?',
        a: 'Workmanship on every job we perform, per our Terms & Conditions. If something we fitted or fixed fails because of the workmanship within the warranty terms, we come back and put it right at no cost. Parts also carry their manufacturer warranty (duration varies by part). Our warranty sits alongside, not in place of, your statutory rights under the Australian Consumer Law.',
      },
      {
        q: 'Will a mobile service void my new-car warranty?',
        a: 'No. Under the Australian Consumer Law, you are free to have your car serviced by any qualified mechanic, including a mobile one, as long as the service follows the manufacturer\'s specifications and uses appropriate parts. The dealership cannot refuse warranty just because someone else did the work.',
      },
      {
        q: 'How do you handle payment?',
        a: 'Tap or insert with the card reader, bank transfer, or emailed invoice. We send an itemised invoice straight to your email after every job.',
      },
    ],
  },
  {
    id: 'vehicles',
    name: 'Vehicles we service',
    items: [
      {
        q: 'What makes do you service?',
        a: 'The major Australian sellers. Toyota, Mazda, Hyundai, Ford, Holden, Mitsubishi, Nissan, Subaru, Kia, Volkswagen, Skoda. Less common European luxury and EVs are case by case. Call us with the make, model and year and we will tell you straight.',
      },
      {
        q: 'Do you do diesel servicing?',
        a: 'Yes. We service common diesel utes and 4WDs (Hilux, Ranger, Triton, Prado, Patrol, Land Cruiser, BT-50). We do not do heavy commercial diesels.',
      },
      {
        q: 'Do you work on hybrids and EVs?',
        a: 'We service hybrids (Camry Hybrid, RAV4 Hybrid, Corolla Hybrid) for everything except the high-voltage drivetrain. Full-electric vehicles are case by case. Call us before booking.',
      },
      {
        q: 'What about classic or modified cars?',
        a: 'Older classics yes, depending on the job. Heavily modified cars we usually pass to a specialist. We will tell you straight if it is outside our wheelhouse.',
      },
    ],
  },
  {
    id: 'situations',
    name: 'Specific situations',
    items: [
      {
        q: 'My car will not start. What do I check?',
        a: 'Three things. Dashboard lights dim or off usually means the battery. A single click but no engine crank usually means the starter motor or a flat battery. The engine cranks but does not catch usually points to fuel or ignition. Call us and we will diagnose it on-site. Same-day service is available.',
      },
      {
        q: 'My check-engine light is on. Should I keep driving?',
        a: 'A steady light usually means a non-urgent fault and you can drive home and book a diagnostic. A flashing light means stop driving as soon as it is safe to. Either way, call us and we will read the codes and confirm.',
      },
      {
        q: 'My brakes are squealing. How urgent is it?',
        a: 'A light squeal on a quiet morning is often the pad wear indicator telling you it is time. Grinding means the pad has worn through to metal and is damaging the rotor. Either way, get it booked soon. New pads on damaged rotors do not last.',
      },
      {
        q: 'My car is overheating. What do I do?',
        a: 'Pull over as soon as it is safe to. Do not lift the radiator cap when the engine is hot. Driving an overheating car costs you head gaskets and cylinder heads. Call us and we will quote a pressure test and come out.',
      },
    ],
  },
  {
    id: 'about-mobile',
    name: 'About mobile mechanics',
    items: [
      {
        q: 'What is a mobile mechanic?',
        a: 'A mobile mechanic comes to you. We work out of a fully equipped service van that carries the same diagnostic gear and parts a workshop has, just rolled up in your driveway, office car park or kerb. The work is the same. The trip to the workshop disappears.',
      },
      {
        q: 'Do I need to stay with the car while you work?',
        a: 'Not at all. We just need a quick hand-off and a chat about what is happening. Then you go back to whatever you were doing. We text you when we are done, walk you through what we did, and you pay by tap, transfer or invoice.',
      },
      {
        q: 'Are you qualified and insured?',
        a: 'Yes. Our mechanics are fully qualified with years of hands-on experience across all common makes and models. We carry public liability and tools-in-transit insurance.',
      },
      {
        q: 'Can you do everything a workshop can do?',
        a: 'Almost. We can do brake jobs, logbook services, cooling-system repairs, charging and starting work, suspension work, pre-purchase inspections and diagnostics on-site. The few things that genuinely need a workshop (engine-out builds, wheel alignments on an alignment rig, panel beating) we will tell you straight to take elsewhere.',
      },
    ],
  },
]

const SITE_URL = 'https://www.mymechanicqld.com.au'

export default function FAQPage() {
  // FAQPage JSON-LD with every question
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CATEGORIES.flatMap((c) => c.items).map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq/` },
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
          <span className="eyebrow">Frequently asked</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Plain answers to the questions we get every week.
          </h1>
          <p className="lead mt-6">
            Booking a mobile mechanic for the first time? Start here. Anything we missed, call us on{' '}
            <a href="tel:0451159954" className="font-semibold underline">0451 159 954</a>.
          </p>
        </div>
      </section>

      {/* Quick-jump nav */}
      <div className="border-y border-hairline bg-soft py-4 sticky top-[88px] z-30 hidden md:block">
        <div className="container flex gap-1 flex-wrap text-[0.875rem]">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="px-3.5 py-1.5 rounded-md bg-surface border border-hairline text-ink hover:border-accent hover:text-accent no-underline"
            >
              {c.name}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ categories */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container max-w-4xl">
          <div className="space-y-14">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} id={cat.id} className="scroll-mt-32">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{cat.name}</h2>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <details
                      key={item.q}
                      className="group bg-surface border border-hairline rounded-xl p-5 md:p-6 hover:border-border transition-colors"
                    >
                      <summary className="cursor-pointer font-semibold text-ink list-none flex justify-between items-start gap-4 text-[1.0625rem]">
                        <span className="flex-1">{item.q}</span>
                        <ChevronRight
                          className="size-5 text-subtle shrink-0 mt-0.5 transition-transform group-open:rotate-90"
                          strokeWidth={2}
                        />
                      </summary>
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Got a question we haven&apos;t answered?
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Call us during business hours and one of the mechanics will pick up.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="tel:0451159954"
              className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent"
            >
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
            <Link
              href={"/book/" as `/${string}`}
              className="btn bg-transparent text-white border-white/40 hover:bg-white/10"
            >
              Get a quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
