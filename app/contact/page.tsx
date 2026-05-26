import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  DollarSign,
  type LucideIcon,
} from 'lucide-react'
import QuoteForm from '@/components/QuoteForm'

export const metadata: Metadata = {
  title: 'Contact My Mechanic QLD | Phone 0451 159 954',
  description:
    'Phone, email and hours for My Mechanic QLD, a mobile mechanic serving Brisbane, Logan, Ipswich and the Gold Coast. Same-day service available.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    title: 'Contact My Mechanic QLD',
    description: 'Phone 0451 159 954 or send a quote request. Mon to Fri 7am to 6pm, Sat 8am to 5pm.',
    url: '/contact/',
    type: 'website',
  },
}

const CONTACTS = [
  {
    Icon: Phone,
    label: 'Phone',
    value: '0451 159 954',
    href: 'tel:0451159954',
    hint: 'Call us during business hours for a same-day quote.',
  },
  {
    Icon: Mail,
    label: 'Email',
    value: 'contact@mymechanicqld.com.au',
    href: 'mailto:contact@mymechanicqld.com.au',
    hint: 'We reply to email within one business day.',
  },
  {
    Icon: Clock,
    label: 'Hours',
    value: 'Mon to Fri 7am to 6pm. Sat 8am to 5pm.',
    hint: 'Closed Sundays. After-hours emergency call-outs case by case.',
  },
  {
    Icon: MapPin,
    label: 'Coverage',
    value: 'Brisbane · Logan · Ipswich · Gold Coast',
    hint: 'Based in Springwood, Brisbane Southside.',
  },
]

const SITE_URL = 'https://www.mymechanicqld.com.au'

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>
}) {
  const { submitted } = await searchParams

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact/` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Contact</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Talk to a mechanic, not a call centre.
          </h1>
          <p className="lead mt-6">
            When you call, you get one of the mechanics on the van. Tell us what&apos;s happening
            and we come back with a fixed-price quote during business hours.
          </p>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="pb-14 md:pb-20 lg:pb-24">
        <div className="container grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Left: contact details */}
          <div className="lg:sticky lg:top-28 grid gap-3">
            {CONTACTS.map((c) => (
              <ContactCard key={c.label} {...c} />
            ))}

            <div className="bg-soft border border-hairline rounded-xl p-5 mt-3">
              <div className="text-xs font-semibold text-ink uppercase tracking-[0.05em] mb-3">
                Why book us
              </div>
              <ul className="grid gap-2.5 text-[0.9375rem] text-muted">
                <li className="flex gap-2.5 items-center">
                  <DollarSign className="size-4 text-accent-bright shrink-0" strokeWidth={2.25} />
                  Fixed-price quotes before any work
                </li>
                <li className="flex gap-2.5 items-center">
                  <ShieldCheck className="size-4 text-accent-bright shrink-0" strokeWidth={2.25} />
                  Workmanship warranty on every job
                </li>
                <li className="flex gap-2.5 items-center">
                  <BadgeCheck className="size-4 text-accent-bright shrink-0" strokeWidth={2.25} />
                  Warranty-safe logbook servicing
                </li>
              </ul>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-surface border border-hairline rounded-2xl p-6 md:p-8 lg:p-10">
            <QuoteForm submitted={!!submitted} redirectTo="/contact/" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Same-day mobile mechanic, when you need us.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            For urgent breakdowns or won&apos;t-start situations, the phone is faster than the form.
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
              Book online
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactCard({
  Icon,
  label,
  value,
  hint,
  href,
}: {
  Icon: LucideIcon
  label: string
  value: string
  hint: string
  href?: string
}) {
  const inner = (
    <div className="flex gap-4 items-start p-5 bg-surface border border-hairline rounded-xl hover:border-accent transition-colors">
      <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
        <Icon className="size-5" strokeWidth={1.75} />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.06em] text-subtle font-semibold mb-1">
          {label}
        </div>
        <div className="text-ink font-semibold text-[1.0625rem] leading-snug">{value}</div>
        <div className="text-[0.875rem] text-muted mt-1.5">{hint}</div>
      </div>
    </div>
  )
  return href ? (
    <a href={href} className="block no-underline hover:text-ink">
      {inner}
    </a>
  ) : (
    inner
  )
}
