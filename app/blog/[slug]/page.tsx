import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Phone,
  Clock,
  Calendar,
  User,
} from 'lucide-react'
import {
  getPost,
  getPostSlugs,
  getRelatedPosts,
  formatPostDate,
  type Post,
} from '@/lib/posts'
import { getService, type Service } from '@/lib/services'

const SITE_URL = 'https://www.mymechanicqld.com.au'

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const ogImage = post.og_image || post.hero_image
  const canonical = `/blog/${post.slug}/`

  return {
    title: post.title,
    description: post.meta_description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.meta_description,
      images: [ogImage],
      url: canonical,
      type: 'article',
      publishedTime: post.date_published,
      modifiedTime: post.date_updated || post.date_published,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta_description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const [related, services] = await Promise.all([
    getRelatedPosts(post, 3),
    Promise.all(
      (post.related_services || []).map((s) => getService(s))
    ).then((arr) => arr.filter((s): s is Service => s !== null)),
  ])

  const postUrl = `${SITE_URL}/blog/${post.slug}/`

  // BlogPosting JSON-LD
  const postingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta_description,
    image: `${SITE_URL}${post.hero_image}`,
    datePublished: post.date_published,
    dateModified: post.date_updated || post.date_published,
    author: {
      '@type': 'Person',
      name: post.author,
      description: post.author_bio,
    },
    publisher: {
      '@type': 'Organization',
      name: 'My Mechanic QLD',
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    wordCount: post.word_count,
  }

  // BreadcrumbList JSON-LD
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postingLd) }}
      />
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
          <Link
            href="/"
            className="text-subtle hover:text-accent-bright no-underline"
          >
            Home
          </Link>
          <ChevronRight className="size-3 text-subtle/60" strokeWidth={2} />
          <Link
            href="/blog/"
            className="text-subtle hover:text-accent-bright no-underline"
          >
            Blog
          </Link>
          <ChevronRight className="size-3 text-subtle/60" strokeWidth={2} />
          <span className="text-ink font-medium truncate max-w-[60vw]">{post.title}</span>
        </div>
      </nav>

      {/* Article header */}
      <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <div className="text-xs uppercase tracking-[0.06em] text-accent-bright font-semibold mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.08] tracking-tighter text-balance">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 items-center mt-7 text-[0.875rem] text-muted">
            <span className="inline-flex items-center gap-2">
              <User className="size-4 text-subtle" strokeWidth={2} />
              By <strong className="text-ink font-semibold">{post.author}</strong>
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-subtle" strokeWidth={2} />
              {formatPostDate(post.date_published)}
              {post.date_updated && post.date_updated !== post.date_published && (
                <span className="text-subtle">
                  · updated {formatPostDate(post.date_updated)}
                </span>
              )}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-subtle" strokeWidth={2} />
              {post.reading_time} min read
            </span>
          </div>
        </div>
      </section>

      {/* Hero image */}
      <div className="container max-w-4xl">
        <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden border border-hairline">
          <Image
            src={post.hero_image}
            alt={post.hero_image_alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container max-w-3xl">
          <div
            className="prose-mmq"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        </div>
      </section>

      {/* Author bio */}
      <section className="py-10 md:py-14 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <div className="flex gap-5 items-start">
            <div className="size-14 rounded-full bg-accent-tint text-accent grid place-items-center font-bold text-lg shrink-0">
              {initials(post.author)}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.06em] text-subtle font-semibold mb-1">
                Written by
              </div>
              <div className="font-bold text-ink text-lg mb-1">{post.author}</div>
              <p className="text-[0.9375rem] text-muted leading-relaxed">{post.author_bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      {services.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container max-w-4xl">
            <span className="eyebrow">Related services</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3 mb-7">
              The work this article is about.
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}/` as `/${string}`}
                  className="bg-surface border border-hairline rounded-xl p-5 no-underline text-ink hover:border-accent hover:-translate-y-0.5 transition-all flex flex-col gap-2"
                >
                  <div className="text-xs uppercase tracking-[0.06em] text-subtle font-semibold">
                    {s.service_category}
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">{s.nav_label}</h3>
                  <span className="text-sm font-semibold text-accent-bright inline-flex items-center gap-1 mt-1">
                    {s.price_label || 'Read more'}
                    <ArrowRight className="size-3.5" strokeWidth={2} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-12 md:py-16 lg:py-20 bg-soft border-y border-hairline">
          <div className="container">
            <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
              <div>
                <span className="eyebrow">Keep reading</span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-3">
                  More from the blog
                </h2>
              </div>
              <Link
                href="/blog/"
                className="inline-flex items-center gap-1 text-accent-bright font-semibold no-underline hover:text-accent-hover text-[0.9375rem]"
              >
                All posts
                <ArrowUpRight className="size-4" strokeWidth={2} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}/` as `/${string}`}
                  className="group bg-surface border border-hairline rounded-2xl overflow-hidden no-underline text-ink hover:border-accent hover:-translate-y-0.5 transition-all flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-hairline">
                    <Image
                      src={p.hero_image}
                      alt={p.hero_image_alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2.5 flex-1">
                    <div className="text-[0.6875rem] uppercase tracking-[0.06em] text-accent-bright font-semibold">
                      {p.category}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight leading-tight">{p.title}</h3>
                    <p className="text-[0.875rem] text-muted leading-relaxed flex-1">
                      {p.excerpt.split('.')[0]}.
                    </p>
                    <span className="text-[0.8125rem] text-subtle inline-flex items-center gap-2 mt-1">
                      <Clock className="size-3" strokeWidth={2} />
                      {p.reading_time} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[24ch] mx-auto mb-4">
            Got a specific question about your car?
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Call us during business hours and one of the mechanics will pick up. No call-out fee
            for a chat.
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

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
