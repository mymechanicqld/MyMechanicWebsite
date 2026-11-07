import { getServiceSlugs } from '@/lib/services'
import { getAllPosts } from '@/lib/posts'
import {
  getSuburbsByRegion,
  getRegionSlugs,
  isIndexableSuburb,
} from '@/lib/suburbs'
import { getAreaHubSlugs } from '@/lib/area-hubs'
import lastmodData from '@/lib/lastmod.json'

const SITE_URL = 'https://www.mymechanicqld.com.au'

export interface SitemapEntry {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: number
}

/**
 * Real content dates per URL path, generated from git by `npm run lastmod`
 * (scripts/gen-lastmod.mjs). A page missing from it gets no <lastmod> rather
 * than a made-up one: every URL carrying the same build time tells Google the
 * dates are meaningless.
 */
const LASTMOD = lastmodData as Record<string, string>

function lastmodFor(path: string): string | undefined {
  return LASTMOD[path]
}

/** The segments that make up the sitemap index (empty regions are left out). */
export function sitemapSegments(): string[] {
  return ['core', ...getRegionSlugs().filter((r) => regionEntries(r).length > 0)]
}

/**
 * Indexable suburb pages for one region. Service x suburb pages and suburbs
 * without hand-written copy are noindexed, so they are not listed (see
 * isIndexableSuburb in lib/suburbs.ts).
 */
export function regionEntries(regionId: string, _now?: string): SitemapEntry[] {
  return getSuburbsByRegion(regionId)
    .filter(isIndexableSuburb)
    .map((s) => ({
      loc: `${SITE_URL}/${s.slug}/`,
      lastmod: s.override?.updated,
      changefreq: 'monthly',
      priority: 0.7,
    }))
}

/** Static pages, service hubs, region hubs and blog. */
export async function coreEntries(_now?: string): Promise<SitemapEntry[]> {
  const staticPages: SitemapEntry[] = [
    { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: 1.0 },
    { loc: `${SITE_URL}/services/`, changefreq: 'monthly', priority: 0.9 },
    { loc: `${SITE_URL}/areas/`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_URL}/pricing/`, changefreq: 'monthly', priority: 0.85 },
    { loc: `${SITE_URL}/emergency-mobile-mechanic/`, changefreq: 'monthly', priority: 0.9 },
    { loc: `${SITE_URL}/car-service/`, changefreq: 'monthly', priority: 0.9 },
    { loc: `${SITE_URL}/warranty/`, changefreq: 'monthly', priority: 0.75 },
    { loc: `${SITE_URL}/how-it-works/`, changefreq: 'monthly', priority: 0.75 },
    { loc: `${SITE_URL}/check-coverage/`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/toyota-mechanic/`, changefreq: 'monthly', priority: 0.85 },
    { loc: `${SITE_URL}/hilux-service/`, changefreq: 'monthly', priority: 0.85 },
    { loc: `${SITE_URL}/mazda-service/`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_URL}/ford-ranger/`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_URL}/about/`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/contact/`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/faq/`, changefreq: 'monthly', priority: 0.7 },
    { loc: `${SITE_URL}/book/`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_URL}/privacy-policy/`, changefreq: 'yearly', priority: 0.3 },
    { loc: `${SITE_URL}/terms-conditions/`, changefreq: 'yearly', priority: 0.3 },
  ].map((e) => ({ ...e, lastmod: lastmodFor(e.loc.slice(SITE_URL.length)) }))

  const serviceEntries: SitemapEntry[] = getServiceSlugs().map((slug) => ({
    loc: `${SITE_URL}/${slug}/`,
    lastmod: lastmodFor(`/${slug}/`),
    changefreq: 'monthly',
    priority: 0.9,
  }))

  // Region hubs plus cross-region area hubs such as /brisbane-south/
  const regionHubEntries: SitemapEntry[] = [
    ...getRegionSlugs(),
    ...getAreaHubSlugs(),
  ].map((slug) => ({
    loc: `${SITE_URL}/${slug}/`,
    lastmod: lastmodFor(`/${slug}/`),
    changefreq: 'monthly',
    priority: 0.85,
  }))

  const posts = await getAllPosts()
  const blogIndex: SitemapEntry[] = [
    {
      loc: `${SITE_URL}/blog/`,
      lastmod: posts[0]
        ? new Date(posts[0].date_updated || posts[0].date_published).toISOString()
        : undefined,
      changefreq: 'weekly',
      priority: 0.8,
    },
  ]
  const postEntries: SitemapEntry[] = posts.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}/`,
    lastmod: new Date(p.date_updated || p.date_published).toISOString(),
    changefreq: 'monthly',
    priority: p.pillar ? 0.8 : 0.6,
  }))

  return [
    ...staticPages,
    ...serviceEntries,
    ...regionHubEntries,
    ...blogIndex,
    ...postEntries,
  ]
}

/** Render a <urlset> XML document from entries. */
export function renderUrlset(entries: SitemapEntry[]): string {
  const urls = entries
    .map((e) => {
      const parts = [`    <loc>${e.loc}</loc>`]
      if (e.lastmod) parts.push(`    <lastmod>${e.lastmod}</lastmod>`)
      if (e.changefreq) parts.push(`    <changefreq>${e.changefreq}</changefreq>`)
      if (e.priority != null) parts.push(`    <priority>${e.priority}</priority>`)
      return `  <url>\n${parts.join('\n')}\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** Newest lastmod among a segment's entries, so the index carries real dates too. */
function newest(entries: SitemapEntry[]): string | undefined {
  return entries.map((e) => e.lastmod).filter((d): d is string => Boolean(d)).sort().at(-1)
}

/** Render the <sitemapindex> XML document pointing at each segment. */
export async function renderIndex(_now?: string): Promise<string> {
  const core = newest(await coreEntries())
  const sitemaps = sitemapSegments()
    .map((seg) => {
      const lastmod = seg === 'core' ? core : newest(regionEntries(seg))
      const lm = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''
      return `  <sitemap>\n    <loc>${SITE_URL}/sitemap-${seg}.xml</loc>${lm}\n  </sitemap>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>\n`
}
