import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  PhoneCall,
  ClipboardCheck,
  Calendar,
  Truck,
  Wrench,
  CheckCircle2,
  CreditCard,
  Mail,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'How a Mobile Mechanic Works | My Mechanic QLD',
  description:
    "Booking a mobile mechanic for the first time? Here is the full process, from quote to invoice, with what we bring, what you need to do, and how payment works.",
  alternates: { canonical: '/how-it-works/' },
  openGraph: {
    title: 'How a mobile mechanic works | My Mechanic QLD',
    description:
      'The end-to-end process, explained plainly. From quote to drive-away.',
    url: '/how-it-works/',
    type: 'website',
  },
}

const STEPS = [
  {
    n: 1,
    Icon: PhoneCall,
    title: 'Tell us what is happening',
    body: 'Call us on 0451 159 954 or use the quote form. Give us the make, model and year, the suburb you are in, and a plain-English description of what the car is doing. The more detail, the more accurate the quote.',
    duration: '2 minutes',
  },
  {
    n: 2,
    Icon: ClipboardCheck,
    title: 'Get a fixed-price quote',
    body: "We come back with a written fixed-price quote. The quote covers parts, labour, fluids and any consumables. If the job needs an on-site diagnostic first, the quote will say so and the diagnostic fee is credited against the repair.",
    duration: 'During business hours',
  },
  {
    n: 3,
    Icon: Calendar,
    title: 'Pick a time and place',
    body: 'You choose a day and a location. Home driveway or office car park. Most weekdays we have same-day or next-day slots. Bigger jobs (water pumps, suspension overhauls) are usually 2 to 4 days out. We confirm by SMS the day before.',
    duration: 'Same week typical',
  },
  {
    n: 4,
    Icon: Truck,
    title: 'We arrive at the agreed time',
    body: 'You will get a text when we are 30 minutes away. We turn up in a clearly-marked service van with the right parts already on board for the job we quoted. We need a safe spot to work and an introduction to the vehicle, that is it.',
    duration: 'On the day',
  },
  {
    n: 5,
    Icon: Wrench,
    title: 'The work happens',
    body: 'You are welcome to watch or to head back inside, whichever you prefer. We text you if anything unexpected comes up. Most jobs are 1 to 4 hours. If a job is going to run long, we tell you well before it does.',
    duration: '1 to 4 hours typical',
  },
  {
    n: 6,
    Icon: CheckCircle2,
    title: 'Walk-through and payment',
    body: 'When the job is done, we walk you through what we did, hand back the keys, and you pay by tap, transfer or invoice. The itemised invoice lands in your email within minutes, with the warranty terms attached.',
    duration: '15 minutes',
  },
]

const FAQS = [
  {
    q: 'Do I need to stay with the car while you work?',
    a: 'No. We just need a quick hand-off and a chat about what is happening. Then you go back to whatever you were doing. We text you when we are done and walk you through what we did before we leave.',
  },
  {
    q: 'Where do you actually work on the car?',
    a: 'Wherever the car is. The most common spot is the customer\'s home driveway. Office car parks work too, as long as there is enough room beside the car and the building allows it. Apartment carparks are usually fine. The two things we need are: enough working room around the vehicle, and a safe, level surface to jack up where required.',
  },
  {
    q: 'What if it rains on the day?',
    a: 'Light rain we work in (the van has a side awning for parts and tools). Heavy rain or a thunderstorm we reschedule, because the work has to be done safely and properly, and slipping on a wet driveway with a wheel in your hand is neither. We do not charge for weather-rescheduled jobs.',
  },
  {
    q: 'What if you find something extra during the job?',
    a: 'We stop, take a photo, and call you with a fixed quote for the extra work. You decide whether to proceed. Nothing gets added to the bill that you have not agreed to in advance. Most of the time the extra work is minor (a worn hose, a noisy bushing) and the call takes 2 minutes.',
  },
  {
    q: 'How do I pay?',
    a: 'Tap or insert with the card reader, bank transfer, or emailed invoice with 7-day terms (agreed in advance). We do not store card details. Payments are processed by a third-party provider.',
  },
  {
    q: 'What if I need to reschedule?',
    a: 'No problem if it is more than 24 hours out. Send us a message or call us. Same-day cancellation terms are in our Terms & Conditions, but we would always try to reschedule with you first.',
  },
  {
    q: 'What do you actually bring on the van?',
    a: 'The right parts for the job we quoted, plus the common consumables (oils, fluids, filters, gaskets). A torque wrench and the workshop manual for your model. Pretty much everything a workshop has, just on wheels.',
  },
]

const SITE_URL = 'https://www.mymechanicqld.com.au'

export default function HowItWorksPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to book a mobile mechanic with My Mechanic QLD',
    description:
      'The six-step process from the first phone call to keys back in your hand. Fixed-price quote upfront, work done at your driveway, workmanship warranty on every job.',
    supply: [
      { '@type': 'HowToSupply', name: 'Vehicle make, model and year' },
      { '@type': 'HowToSupply', name: 'Description of the symptoms or service required' },
      { '@type': 'HowToSupply', name: 'Suburb where the vehicle is parked' },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Fully-equipped mobile mechanic service van' },
      { '@type': 'HowToTool', name: 'Professional-grade diagnostic scan tools' },
    ],
    step: STEPS.map((step) => ({
      '@type': 'HowToStep',
      position: step.n,
      name: step.title,
      text: step.body,
      url: `${SITE_URL}/how-it-works/#step-${step.n}`,
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'How it works', item: `${SITE_URL}/how-it-works/` },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">How it works</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            From the first phone call to the keys back in your hand.
          </h1>
          <p className="lead mt-6">
            Booking a mobile mechanic for the first time is a small leap of faith. Here is the full
            process, end to end, so you know what you are getting into before you book.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Link href="/book/" className="btn btn-primary">
              Start the process
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
            <a href="tel:0451159954" className="btn btn-secondary">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>

      {/* Six steps */}
      <section className="py-14 md:py-20 lg:py-24 bg-surface border-y border-hairline">
        <div className="container max-w-4xl">
          <div className="mb-12 max-w-prose">
            <span className="eyebrow">The process</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 max-w-[22ch]">
              Six steps. About a week from first call to invoice.
            </h2>
            <p className="lead mt-4">
              Some jobs are faster (same-day breakdowns, simple battery swaps). Some take longer
              (cooling-system overhauls that need a part ordered in). The shape of the process is
              the same.
            </p>
          </div>

          <ol className="space-y-6 md:space-y-7">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="grid md:grid-cols-[auto_1fr] gap-5 md:gap-7 items-start bg-bg
                           border border-hairline rounded-2xl p-6 md:p-8"
              >
                <div className="flex md:flex-col gap-4 md:gap-3 items-center md:items-start">
                  <div className="size-12 md:size-14 rounded-full bg-accent text-white grid place-items-center
                                  font-bold text-lg md:text-xl shrink-0">
                    {step.n}
                  </div>
                  <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
                    <step.Icon className="size-[22px]" strokeWidth={1.75} />
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight">{step.title}</h3>
                    <span className="text-xs uppercase tracking-[0.06em] text-subtle font-semibold">
                      · {step.duration}
                    </span>
                  </div>
                  <p className="text-[0.9375rem] md:text-base text-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What's in the van */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow">On the day</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 max-w-[18ch]">
                What we bring, and what you do.
              </h2>
              <p className="lead mt-5">
                Mobile work has a different rhythm to a workshop visit. You do not lose your day.
                The van is set up so we can do almost everything a workshop can, in your driveway.
              </p>
            </div>
            <div className="grid gap-5">
              <Detail
                Icon={Truck}
                title="What is on the van"
                body="The right parts for the quoted job (and common consumables) and the workshop manual for your specific model."
              />
              <Detail
                Icon={ClipboardCheck}
                title="What you do on arrival"
                body="Hand over the keys, point at the car, and tell us anything new you have noticed since you booked. That is it. If you want to watch or to ask questions during the job, you are welcome to. If you want to go back inside, you are welcome to do that too."
              />
              <Detail
                Icon={CheckCircle2}
                title="What you do during the job"
                body="Whatever you want. We text you if anything unexpected comes up. Most customers go back to work, the kids, or the kettle. Some sit and chat. Either is fine."
              />
              <Detail
                Icon={CreditCard}
                title="How payment works"
                body="When the job is done we walk you through what we did, then take payment by tap, insert or bank transfer. An itemised invoice lands in your email within minutes."
              />
              <Detail
                Icon={Mail}
                title="What you get after"
                body="An itemised invoice with the warranty terms attached. If the job affects your logbook (we did a logbook service or a major repair), the book is stamped before we leave. For services, we email a service reminder before the next one is due."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <span className="eyebrow">Common questions</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-8">
            What first-time customers ask.
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
            Now you know how it works.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Send us your details and we come back with a fixed-price quote during business hours.
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

function Detail({
  Icon,
  title,
  body,
}: {
  Icon: LucideIcon
  title: string
  body: string
}) {
  return (
    <div className="bg-surface border border-hairline rounded-2xl p-6 md:p-7">
      <div className="flex gap-4 items-start">
        <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
          <Icon className="size-[22px]" strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-ink mb-2 leading-snug">{title}</h3>
          <p className="text-[0.9375rem] text-muted leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  )
}
