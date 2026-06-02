import { getServiceSlugs } from '@/lib/services'
import { getAllPosts } from '@/lib/posts'
import {
  getSuburbsByRegion,
  getRegionSlugs,
  PRIORITY_SERVICES,
} from '@/lib/suburbs'

const SITE_URL = 'https://www.mymechanicqld.com.au'

export interface SitemapEntry {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: number
}

const PRIORITY_SERVICE_SLUGS = PRIORITY_SERVICES.map((s) => s.slug)

/** The segments that make up the sitemap index. */
export function sitemapSegments(): string[] {
  return ['core', ...getRegionSlugs()]
}

/** All local-page URLs for one region: standalone suburb + service x suburb. */
export function regionEntries(regionId: string, now: string): SitemapEntry[] {
  const suburbs = getSuburbsByRegion(regionId)
  const entries: SitemapEntry[] = []
  for (const s of suburbs) {
    entries.push({
      loc: `${SITE_URL}/${s.slug}/`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.7,
    })
    for (const serviceSlug of PRIORITY_SERVICE_SLUGS) {
      entries.push({
        loc: `${SITE_URL}/${serviceSlug}/${s.slug}/`,
        lastmod: now,
        changefreq: 'monthly',
        priority: 0.65,
      })
    }
  }
  return entries
}

/** Static pages, service hubs, region hubs and blog. */
export async function coreEntries(now: string): Promise<SitemapEntry[]> {
  const staticPages: SitemapEntry[] = [
    { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: 1.0 },
    { loc: `${SITE_URL}/services/`, changefreq: 'monthly', priority: 0.9 },
    { loc: `${SITE_URL}/areas/`, changefreq: 'monthly', priority: 0.8 },
    { loc: `${SITE_URL}/pricing/`, changefreq: 'monthly', priority: 0.85 },
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
  ].map((e) => ({ ...e, lastmod: now }))

  const serviceEntries: SitemapEntry[] = getServiceSlugs().map((slug) => ({
    loc: `${SITE_URL}/${slug}/`,
    lastmod: now,
    changefreq: 'monthly',
    priority: 0.9,
  }))

  const regionHubEntries: SitemapEntry[] = getRegionSlugs().map((slug) => ({
    loc: `${SITE_URL}/${slug}/`,
    lastmod: now,
    changefreq: 'monthly',
    priority: 0.85,
  }))

  const posts = await getAllPosts()
  const blogIndex: SitemapEntry[] = [
    {
      loc: `${SITE_URL}/blog/`,
      lastmod: posts[0]
        ? new Date(posts[0].date_updated || posts[0].date_published).toISOString()
        : now,
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

/** Render the <sitemapindex> XML document pointing at each segment. */
export function renderIndex(now: string): string {
  const sitemaps = sitemapSegments()
    .map(
      (seg) =>
        `  <sitemap>\n    <loc>${SITE_URL}/sitemap-${seg}.xml</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemaps}\n</sitemapindex>\n`
}
