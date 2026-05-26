import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Phone, Clock, Tag } from 'lucide-react'
import { getAllPosts, formatPostDate, type Post } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Mobile Mechanic Blog | Plain-English Guides to Car Servicing | My Mechanic QLD',
  description:
    "Plain-English car servicing and repair guides, written by a qualified mechanic. Warranty advice, repair costs in Brisbane, common-fault diagnostics, and used-car buying tips.",
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'Mobile Mechanic Blog | My Mechanic QLD',
    description:
      "Plain-English car servicing and repair guides, written by a qualified mechanic.",
    url: '/blog/',
    type: 'website',
  },
}

const CATEGORIES = [
  'Services explained',
  'Car care guides',
  'Buying guides',
  'DIY tips',
  'Local guides',
]

const SITE_URL = 'https://www.mymechanicqld.com.au'

export default async function BlogIndexPage() {
  const posts = await getAllPosts()

  if (posts.length === 0) {
    return <EmptyState />
  }

  const [featured, ...rest] = posts

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
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
          <span className="eyebrow">The blog</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mt-4">
            Plain-English guides, written by a mechanic.
          </h1>
          <p className="lead mt-6">
            Real answers about car servicing, repair costs, warranty rights and what to watch for
            when buying a used car. Written by the team that does the work, not by a content
            agency.
          </p>
        </div>
      </section>

      {/* Category chips */}
      <div className="border-y border-hairline bg-soft py-4 sticky top-[88px] z-30 hidden md:block">
        <div className="container flex gap-1 flex-wrap text-[0.875rem] items-center">
          <Tag className="size-4 text-subtle mr-2" strokeWidth={2} />
          <span className="text-subtle text-xs uppercase tracking-[0.06em] font-semibold mr-2">
            Topics
          </span>
          {CATEGORIES.map((c) => {
            const count = posts.filter((p) => p.category === c).length
            return (
              <span
                key={c}
                className="px-3 py-1 rounded-md bg-surface border border-hairline text-ink text-[0.8125rem]"
              >
                {c}
                {count > 0 && (
                  <span className="ml-1.5 text-subtle">({count})</span>
                )}
              </span>
            )
          })}
        </div>
      </div>

      {/* Featured */}
      <section className="py-14 md:py-20">
        <div className="container">
          <span className="eyebrow">Latest</span>
          <h2 className="sr-only">Featured post</h2>
          <FeaturedCard post={featured} className="mt-4" />
        </div>
      </section>

      {/* Other posts */}
      {rest.length > 0 && (
        <section className="pb-14 md:pb-20 lg:pb-24">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
              More from the blog
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[24ch] mx-auto mb-4">
            Got a question we have not covered?
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
              href="/book/"
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

function FeaturedCard({ post, className = '' }: { post: Post; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}/` as `/${string}`}
      className={`group grid md:grid-cols-[1fr_1fr] gap-8 lg:gap-12 bg-surface border border-hairline rounded-2xl overflow-hidden no-underline text-ink hover:border-accent transition-colors ${className}`}
    >
      <div className="relative aspect-[4/3] md:aspect-auto min-h-[260px] md:min-h-[360px] overflow-hidden border-b md:border-b-0 md:border-r border-hairline">
        <Image
          src={post.hero_image}
          alt={post.hero_image_alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
      </div>
      <div className="p-7 md:p-10 lg:p-12 flex flex-col gap-4 justify-center">
        <PostMeta post={post} />
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
          {post.title}
        </h3>
        <p className="text-[1.0625rem] text-muted leading-relaxed">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1 text-accent-bright font-semibold mt-2">
          Read the article
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}/` as `/${string}`}
      className="group bg-surface border border-hairline rounded-2xl overflow-hidden no-underline text-ink hover:border-accent hover:-translate-y-0.5 transition-all flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-hairline">
        <Image
          src={post.hero_image}
          alt={post.hero_image_alt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <PostMeta post={post} small />
        <h3 className="text-lg md:text-xl font-bold tracking-tight leading-tight">{post.title}</h3>
        <p className="text-[0.9375rem] text-muted leading-relaxed flex-1">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1 text-accent-bright font-semibold text-sm mt-1">
          Read more
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  )
}

function PostMeta({ post, small }: { post: Post; small?: boolean }) {
  const cls = small ? 'text-[0.75rem]' : 'text-xs'
  return (
    <div
      className={`uppercase tracking-[0.06em] text-subtle font-semibold flex gap-2.5 flex-wrap items-center ${cls}`}
    >
      <span className="text-accent-bright">{post.category}</span>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3" strokeWidth={2} />
        {post.reading_time} min read
      </span>
      <span aria-hidden>·</span>
      <span>{formatPostDate(post.date_updated || post.date_published)}</span>
    </div>
  )
}

function EmptyState() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-bg to-surface">
      <div className="container max-w-2xl text-center">
        <span className="eyebrow">The blog</span>
        <h1 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-tighter mt-4">
          Coming soon.
        </h1>
        <p className="lead mx-auto mt-6">
          Plain-English car care and repair guides, written by the team. First posts publish in the
          next few weeks. In the meantime, get in touch.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-7">
          <a href="tel:0451159954" className="btn btn-primary">
            <Phone className="size-4" strokeWidth={2} />
            0451 159 954
          </a>
          <Link href="/book/" className="btn btn-secondary">
            Get a quote
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}
