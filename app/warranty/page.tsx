import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  Check,
  X,
  ShieldCheck,
  BadgeCheck,
  ChevronRight,
  Clock,
  FileText,
  Scale,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Workmanship & Parts Warranty | My Mechanic QLD',
  description:
    "Every repair we do is backed by a workmanship and parts warranty, plus your statutory rights under the Australian Consumer Law. Here is what is covered, what is not, and how to claim.",
  alternates: { canonical: '/warranty/' },
  openGraph: {
    title: 'Workmanship & parts warranty | My Mechanic QLD',
    description:
      'Every repair, backed in writing. Plain-English explanation of what we cover and how to claim, alongside your ACL rights.',
    url: '/warranty/',
    type: 'website',
  },
}

const COVERED = [
  'Workmanship on every job we perform, including diagnosis, fitting, adjustment and final road test',
  'Parts we have sourced and fitted, covered by the part manufacturer warranty (duration and terms vary by part)',
  'Return visits required to put right any failure caused by the original workmanship, within the warranty period printed on your invoice',
  'Diagnosis time for any return visit under warranty (no diagnostic fee charged twice for the same fault)',
]

const NOT_COVERED = [
  'Wear-and-tear on consumable parts (brake pads, filters, fluids) used past their normal service life',
  'Damage caused by accidents, misuse, or further modification after our work',
  'Failures caused by continuing to drive a vehicle we recommended not to',
  'Pre-existing faults that we did not work on',
  'Parts supplied by the customer (we only fit parts we have sourced)',
  'Work performed by another mechanic after ours',
]

const STEPS = [
  {
    n: 1,
    Icon: Phone,
    title: 'Call or email us',
    body: "Tell us what's happening. Reference the invoice number if you have it, or the date and the suburb the job was done in. We will find the job in our records.",
  },
  {
    n: 2,
    Icon: Clock,
    title: 'We book a return visit',
    body: 'For safety issues (brakes, steering, won\'t start) we prioritise. Bring the car to a safe location and we come to it.',
  },
  {
    n: 3,
    Icon: BadgeCheck,
    title: 'We diagnose and rectify',
    body: 'If the fault is workmanship-related and within the warranty period printed on your invoice, we put it right at no cost to you. If the fault is something separate (a new issue, wear-and-tear, damage from elsewhere), we tell you straight and quote it as a normal repair. You decide whether to proceed.',
  },
]

const FAQS = [
  {
    q: 'What does "workmanship warranty" actually mean?',
    a: 'It covers anything that fails because of how we did the job, rather than because the part itself was faulty or because the job needed to be done a different way. Examples: a hose clamp that comes loose, a bolt that was not torqued correctly, a fluid that was overfilled or underfilled, a fitment that was not aligned properly. The full terms are set out in our Terms & Conditions.',
  },
  {
    q: 'How does the parts warranty work?',
    a: 'Every part we fit carries its own manufacturer warranty. Duration and process vary by part and manufacturer, and the warranty commences after full payment of the invoice. Where applicable we handle the manufacturer claim on your behalf, so you only deal with us.',
  },
  {
    q: 'Does the warranty cover my whole car?',
    a: 'No. It covers what we worked on. If we replaced your front brakes and a month later the alternator fails, that is not a warranty claim, the alternator is a separate part we did not touch. We will of course come and look at the alternator, but as a normal paid job.',
  },
  {
    q: 'What if I bought the part somewhere else?',
    a: 'We do not fit parts supplied by the customer. The reason is exactly the warranty conversation, we cannot stand behind workmanship on a part we have not sourced. If we sourced the wrong part, that is on us. If you sourced the wrong part, no mechanic in Australia can warrant the job. We will source the right part and fit it under our normal pricing.',
  },
  {
    q: 'What if I have moved or sold the car?',
    a: 'The warranty stays with the original work, not the original owner. If the new owner takes the car to another mechanic and they identify a workmanship issue, the new owner can contact us with the original invoice and we will look at it.',
  },
  {
    q: 'Australian Consumer Law and your warranty, what is the relationship?',
    a: 'Our workmanship and parts warranty sits alongside, and does not limit, your rights under the Australian Consumer Law. The ACL gives you statutory rights that cannot be excluded, including the right to a refund or replacement for a major failure and compensation for any reasonably foreseeable loss. Our warranty is in addition to those rights, not in place of them.',
  },
]

export default function WarrantyPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="eyebrow">Our warranty</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4 text-balance">
              Workmanship and parts. Backed in writing.
            </h1>
            <p className="lead mt-6">
              Every job we do is backed by a workmanship warranty, plus the part manufacturer
              warranty on every component we fit. If something we fitted or fixed fails due to
              faulty workmanship within the warranty period printed on your invoice, we come back
              and put it right at no cost to you. This page spells out what that means in practice.
            </p>
            <p className="mt-4 text-[0.9375rem] text-muted leading-relaxed">
              The workmanship-warranty period is set out on every invoice and varies by job type —
              typically the more substantial the repair, the longer the period. Parts also carry
              their own manufacturer warranty (duration and process vary by part). Your statutory
              rights under the Australian Consumer Law apply in addition to this warranty, not in
              place of it.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link href="/book/" className="btn btn-primary">
                Get a quote
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <a href="tel:0451159954" className="btn btn-secondary">
                <Phone className="size-4" strokeWidth={2} />
                0451 159 954
              </a>
            </div>
          </div>
          <div className="bg-surface border border-hairline rounded-2xl p-6 md:p-8 grid gap-5">
            {[
              { Icon: ShieldCheck, label: 'Workmanship covered', sub: 'On every job we perform' },
              { Icon: BadgeCheck, label: 'Parts manufacturer warranty', sub: 'Duration varies by part' },
              { Icon: FileText, label: 'In writing on every invoice', sub: 'Reference your invoice to claim' },
              { Icon: Scale, label: 'Plus statutory ACL rights', sub: 'Our warranty is in addition' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex gap-4 items-center">
                <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
                  <Icon className="size-[22px]" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="font-semibold text-ink leading-tight">{label}</div>
                  <div className="text-[0.875rem] text-muted mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Covered / not covered */}
      <section className="py-14 md:py-20 bg-surface border-y border-hairline">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <div className="flex gap-3 items-center mb-5">
                <div className="size-10 rounded-lg bg-accent-tint text-accent grid place-items-center">
                  <Check className="size-5" strokeWidth={2.25} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">What is covered</h2>
              </div>
              <ul className="space-y-2.5 text-[0.9375rem] text-ink/90">
                {COVERED.map((item) => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <Check className="size-[18px] text-accent-bright shrink-0 mt-0.5" strokeWidth={2.25} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex gap-3 items-center mb-5">
                <div className="size-10 rounded-lg bg-bg text-ink/70 grid place-items-center border border-hairline">
                  <X className="size-5" strokeWidth={2.25} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold">What is not covered</h2>
              </div>
              <ul className="space-y-2.5 text-[0.9375rem] text-ink/90">
                {NOT_COVERED.map((item) => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <X className="size-[18px] text-subtle shrink-0 mt-0.5" strokeWidth={2.25} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[0.875rem] text-subtle mt-4 leading-relaxed">
                If we cannot rectify under warranty, we will tell you straight why and quote the
                normal repair. No surprises. Full terms are in our{' '}
                <Link href={"/terms-conditions/" as `/${string}`} className="text-accent-bright font-semibold">
                  Terms &amp; Conditions
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to claim */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container max-w-4xl">
          <div className="mb-12 max-w-prose">
            <span className="eyebrow">Making a claim</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
              Three steps, no paperwork to chase.
            </h2>
            <p className="lead mt-4">
              We keep records of every job we do. You do not need to keep your invoice safe to make
              a claim, though it does speed things up if you have it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {STEPS.map((step) => (
              <div key={step.n} className="bg-surface border border-hairline rounded-2xl p-6 md:p-7">
                <div className="flex gap-3 items-center mb-4">
                  <div className="size-9 rounded-full bg-accent text-white grid place-items-center font-bold text-sm shrink-0">
                    {step.n}
                  </div>
                  <div className="size-9 rounded-lg bg-accent-tint text-accent grid place-items-center">
                    <step.Icon className="size-5" strokeWidth={1.75} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2 leading-snug">{step.title}</h3>
                <p className="text-[0.9375rem] text-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACL band */}
      <section className="py-12 md:py-16 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <div className="flex gap-4 items-start">
            <div className="size-11 rounded-xl bg-accent text-white grid place-items-center shrink-0">
              <Scale className="size-5" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3">Australian Consumer Law</h2>
              <p className="text-[0.9375rem] md:text-base text-ink/90 leading-relaxed">
                Our services come with guarantees that cannot be excluded under the Australian
                Consumer Law. You are entitled to a replacement or refund for a major failure and
                compensation for any other reasonably foreseeable loss or damage. You are also
                entitled to have the services remedied if they are not of acceptable quality and
                the failure does not amount to a major failure. Our workmanship warranty is in
                addition to your statutory rights, not a substitute for them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container max-w-3xl">
          <span className="eyebrow">Warranty FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-8">
            The questions we get most often.
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
          <p className="text-[0.9375rem] text-muted mt-8">
            Have a warranty question we have not covered? Email{' '}
            <a
              href="mailto:contact@mymechanicqld.com.au"
              className="text-accent-bright font-semibold"
            >
              contact@mymechanicqld.com.au
            </a>{' '}
            or call <a href="tel:0451159954" className="text-accent-bright font-semibold">0451 159 954</a>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Book a job with the warranty built in.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Every repair we do is backed by our workmanship warranty plus the part manufacturer
            warranty, alongside your statutory rights under Australian Consumer Law.
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
