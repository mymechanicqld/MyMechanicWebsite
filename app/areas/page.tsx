import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, MapPin, Clock, ChevronRight } from 'lucide-react'
import { getSuburbsByRegion, getRegions } from '@/lib/suburbs'

const SITE_URL = 'https://www.mymechanicqld.com.au'

export const metadata: Metadata = {
  title: 'Service Areas | Mobile Mechanic Brisbane, Logan, Ipswich & Gold Coast | My Mechanic QLD',
  description:
    'Mobile mechanic covering 160+ suburbs across Brisbane, Logan, Ipswich and the northern Gold Coast, based in Springwood.',
  alternates: { canonical: '/areas/' },
  openGraph: {
    title: 'Where we work | My Mechanic QLD',
    description:
      'Mobile mechanic covering 160+ suburbs across Brisbane, Logan, Ipswich and the northern Gold Coast.',
    url: '/areas/',
    type: 'website',
  },
}

const REGION_META: Record<
  string,
  { hint: string; image: string }
> = {
  brisbane: {
    hint: 'Northside to Bayside, inner west to the Southside.',
    image: '/images/coverage-onsite.webp',
  },
  logan: {
    hint: 'Home base. Fastest response, often same-day.',
    image: '/images/owner-on-job.webp',
  },
  ipswich: {
    hint: 'Springfield through Brassall and west to Ipswich CBD.',
    image: '/images/hero-van.webp',
  },
  'gold-coast': {
    hint: 'Northern Gold Coast, from Coomera south to Robina.',
    image: '/images/coverage-onsite.webp',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
    { '@type': 'ListItem', position: 2, name: 'Service Areas', item: SITE_URL + '/areas/' },
  ],
}

export default function AreasHubPage() {
  const regions = getRegions()
  const totalSuburbs = regions.reduce(
    (n, r) => n + getSuburbsByRegion(r.id).length,
    0
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="bg-bg border-b border-hairline py-3 text-[0.8125rem] text-subtle"
      >
        <div className="container flex items-center gap-2 flex-wrap">
          <Link href="/" className="text-subtle hover:text-accent-bright no-underline">
            Home
          </Link>
          <ChevronRight className="size-3 text-subtle/60" strokeWidth={2} />
          <span className="text-ink font-medium">Service Areas</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Where we work</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Brisbane, Logan, Ipswich and the Gold Coast, at your driveway.
          </h1>
          <p className="lead mt-6">
            We service cars right across South East Queensland. {totalSuburbs}{' '}
            suburbs, four regions, one mobile workshop. Click any suburb below
            to see what we offer there.
          </p>
          <div className="flex flex-wrap gap-6 mt-7 text-[0.9375rem] text-muted">
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-accent-bright" strokeWidth={2} />
              <strong className="text-ink font-semibold">Same-day</strong>
              service available
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-accent-bright" strokeWidth={2} />
              <strong className="text-ink font-semibold">{totalSuburbs} suburbs</strong>
              across SEQ
            </span>
          </div>
        </div>
      </section>

      {/* Region cards with linked suburbs */}
      <section className="pb-14 md:pb-20 lg:pb-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-5">
            {regions.map((r) => {
              const meta = REGION_META[r.id]
              const suburbs = getSuburbsByRegion(r.id)
              return (
                <div
                  key={r.id}
                  id={r.slug}
                  className="bg-surface border border-hairline rounded-2xl overflow-hidden flex flex-col scroll-mt-28"
                >
                  <div className="relative aspect-[16/9] border-b border-hairline">
                    <Image
                      src={meta.image}
                      alt={`${r.name} service area`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
                    <div>
                      <h2 className="text-2xl font-bold text-ink mb-1.5">
                        {r.name}
                        <span className="text-subtle font-normal text-base ml-2">
                          {suburbs.length} suburbs
                        </span>
                      </h2>
                      <p className="text-[0.9375rem] text-muted">{meta.hint}</p>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.06em] text-subtle font-semibold mb-2.5">
                        Suburbs we service
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {suburbs.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/${s.slug}/` as `/${string}`}
                            className="inline-block px-2.5 py-1 rounded-md text-[0.8125rem] sm:text-[0.875rem]
                                       bg-bg border border-hairline text-ink no-underline
                                       hover:bg-accent-tint hover:border-accent hover:text-accent
                                       transition-colors leading-snug"
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
