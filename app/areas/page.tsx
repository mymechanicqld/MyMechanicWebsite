import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Service Areas | Mobile Mechanic Brisbane, Logan, Ipswich & Gold Coast | My Mechanic QLD',
  description:
    "Mobile mechanic coverage across Brisbane, Logan, Ipswich and the northern Gold Coast, working out of Springwood.",
  alternates: { canonical: '/areas/' },
  openGraph: {
    title: 'Where we work | My Mechanic QLD',
    description:
      'Mobile mechanic coverage across Brisbane, Logan, Ipswich and the northern Gold Coast.',
    url: '/areas/',
    type: 'website',
  },
}

type Region = {
  slug: string
  name: string
  hint: string
  image: string
  suburbs: string[]
}

const REGIONS: Region[] = [
  {
    slug: 'brisbane',
    name: 'Brisbane',
    hint: 'Northside to Bayside, inner west to the Southside.',
    image: '/images/coverage-onsite.webp',
    suburbs: [
      'Aspley',
      'Bulimba',
      'Carindale',
      'Chermside',
      'Cleveland',
      'Coorparoo',
      'Forest Lake',
      'Indooroopilly',
      'Kelvin Grove',
      'Mt Gravatt',
      'Nundah',
      'Redcliffe',
      'Sandgate',
      'Sunnybank',
      'Toowong',
      'Wynnum',
    ],
  },
  {
    slug: 'logan',
    name: 'Logan',
    hint: 'Home base. Fastest response, often same-day.',
    image: '/images/owner-on-job.webp',
    suburbs: ['Beenleigh', 'Browns Plains', 'Loganholme', 'Springwood'],
  },
  {
    slug: 'ipswich',
    name: 'Ipswich',
    hint: 'Springfield through Brassall and west to Ipswich CBD.',
    image: '/images/hero-van.webp',
    suburbs: ['Brassall', 'Goodna', 'Redbank Plains', 'Springfield'],
  },
  {
    slug: 'gold-coast',
    name: 'Gold Coast',
    hint: 'Northern Gold Coast, from Coomera south to Robina.',
    image: '/images/coverage-onsite.webp',
    suburbs: ['Coomera', 'Helensvale', 'Nerang', 'Robina', 'Southport'],
  },
]

export default function AreasHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Where we work</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Within 50 to 60 km of Springwood, in any direction.
          </h1>
          <p className="lead mt-6">
            We&apos;re based in Springwood on Brisbane&apos;s Southside and work a wide
            radius from there. That covers Brisbane city, all of Logan, most of Ipswich, and the
            northern Gold Coast.
          </p>
          <div className="flex flex-wrap gap-6 mt-7 text-[0.9375rem] text-muted">
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-accent-bright" strokeWidth={2} />
              <strong className="text-ink font-semibold">Same-day</strong>
              service available
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-accent-bright" strokeWidth={2} />
              <strong className="text-ink font-semibold">Mobile to you</strong>
              across SEQ
            </span>
          </div>
        </div>
      </section>

      {/* Region cards */}
      <section className="pb-14 md:pb-20 lg:pb-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-5">
            {REGIONS.map((r) => (
              <div
                key={r.slug}
                id={r.slug}
                className="bg-surface border border-hairline rounded-2xl overflow-hidden flex flex-col scroll-mt-28"
              >
                <div className="relative aspect-[16/9] border-b border-hairline">
                  <Image
                    src={r.image}
                    alt={`${r.name} service area`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
                  <div>
                    <h2 className="text-2xl font-bold text-ink mb-1.5">{r.name}</h2>
                    <p className="text-[0.9375rem] text-muted">{r.hint}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.06em] text-subtle font-semibold mb-2.5">
                      Suburbs we service
                    </div>
                    <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[0.875rem] sm:text-[0.9375rem]">
                      {r.suburbs.map((s) => (
                        <li key={s} className="text-ink/90 leading-snug">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not sure? */}
      <section className="py-14 md:py-20 bg-soft border-y border-hairline">
        <div className="container max-w-3xl text-center">
          <span className="eyebrow">Not in the list?</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-4">
            Some weeks we stretch a bit further.
          </h2>
          <p className="lead mx-auto mb-7">
            If your suburb is just outside our usual radius, call us anyway. We&apos;ll tell you
            straight if we can fit you in this week or not.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="tel:0451159954" className="btn btn-primary">
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
            <Link href={"/book/" as `/${string}`} className="btn btn-secondary">
              Get a quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Local mobile mechanic, in your suburb.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Get a fixed-price quote for any job during business hours.
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
