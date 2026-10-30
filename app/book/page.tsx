import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import QuoteForm from '@/components/QuoteForm'
import WhyBookStrip from '@/components/WhyBookStrip'

export const metadata: Metadata = {
  title: 'Get a Quote | Book a Mobile Mechanic Brisbane, Logan & Gold Coast',
  description:
    'Tell us about your car and we come back with a fixed-price quote. Open 24/7 for calls on 0451 159 954.',
  alternates: { canonical: '/book/' },
  openGraph: {
    title: 'Book a mobile mechanic | My Mechanic QLD',
    description: 'Send us your details and we come back with a fixed-price quote. Workmanship warranty on every job.',
    url: '/book/',
    type: 'website',
  },
}

const NEXT_STEPS = [
  {
    n: 1,
    title: 'We confirm your quote',
    body: 'By the next business day, we email you a fixed price plus the soonest time we can come out.',
  },
  {
    n: 2,
    title: 'We agree a time',
    body: 'You pick the day and place. Home driveway, office car park, kerbside. Same day where available.',
  },
  {
    n: 3,
    title: 'We turn up and do the job',
    body: 'Fully qualified, fully equipped. We text you when we arrive and again when we are done.',
  },
]

const SITE_URL = 'https://www.mymechanicqld.com.au'

export default function BookPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Get a quote', item: `${SITE_URL}/book/` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero + form. DOM order is intro, form, extras so the form starts on the
          first phone screen; on desktop the grid puts the extras back in the
          left column under the intro. */}
      <section className="py-8 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-x-16 lg:gap-y-8 items-start">
          {/* Intro */}
          <div className="lg:col-start-1 lg:row-start-1">
            <h1 className="text-[2.1rem] sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter">
              Get a fixed-price quote
            </h1>
            <p className="lead mt-4 lg:mt-6">
              Tell us about your car and we email you a fixed price by the next business day.
            </p>
            <p className="mt-3 text-[0.9375rem] text-ink">
              Need help now? Call any time, 24/7:{' '}
              <a href="tel:0451159954" className="font-semibold text-accent-bright whitespace-nowrap">
                0451 159 954
              </a>
            </p>
          </div>

          {/* Form */}
          <div className="bg-surface border border-hairline rounded-2xl p-5 md:p-8 lg:p-10 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <QuoteForm redirectTo="/book/" />
          </div>

          {/* Extras: below the form on phones, under the intro on desktop */}
          <div className="lg:col-start-1 lg:row-start-2">
            <WhyBookStrip />

            <div className="mt-8 p-5 rounded-xl bg-soft border border-hairline">
              <div className="text-xs font-semibold text-ink uppercase tracking-[0.05em] mb-2">
                Rather talk to us?
              </div>
              <p className="text-[0.9375rem] text-muted leading-relaxed mb-4">
                To connect quickly, give us a call.
              </p>
              <a href="tel:0451159954" className="btn btn-primary inline-flex">
                <Phone className="size-4" strokeWidth={2} />
                0451 159 954
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-14 md:py-20 bg-surface border-y border-hairline">
          <div className="container max-w-4xl">
            <div className="mb-10 text-center">
              <span className="eyebrow">After you submit</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
                What happens next.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {NEXT_STEPS.map((step) => (
                <div key={step.n} className="flex gap-5 items-start">
                  <div className="size-12 rounded-full bg-accent text-white grid place-items-center font-bold shrink-0 text-lg">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-ink mb-2">{step.title}</h3>
                    <p className="text-[0.9375rem] text-muted leading-relaxed">{step.body}</p>
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
            Prefer to call?
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Open 24/7. You speak directly with a mechanic.
          </p>
          <a
            href="tel:0451159954"
            className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent"
          >
            <Phone className="size-4" strokeWidth={2} />
            0451 159 954
          </a>
        </div>
      </section>
    </>
  )
}
