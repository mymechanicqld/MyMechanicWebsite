import type { MetadataRoute } from 'next'
import { getServiceSlugs } from '@/lib/services'
import { getAllPosts } from '@/lib/posts'
import { getAllSuburbs, PRIORITY_SERVICES } from '@/lib/suburbs'

const SITE_URL = 'https://www.mymechanicqld.com.au'

/**
 * Auto-generated sitemap. Discovers service slugs, suburb slugs, and blog
 * posts at build time so adding new content picks it up automatically.
 *
 * Segmented by page type for clarity in Search Console.
 * Submit `${SITE_URL}/sitemap.xml` in Google Search Console after launch.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // ---- Static pages ----
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/services/`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/areas/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/pricing/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/warranty/`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/how-it-works/`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/check-coverage/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/toyota-mechanic/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/hilux-service/`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/mazda-service/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/ford-ranger/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/faq/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/book/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: `${SITE_URL}/privacy-policy/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-conditions/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ---- Service pages ----
  const serviceEntries: MetadataRoute.Sitemap = getServiceSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  // ---- Suburb pages ----
  const suburbs = getAllSuburbs()
  const suburbEntries: MetadataRoute.Sitemap = suburbs.map((s) => ({
    url: `${SITE_URL}/${s.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // ---- Service × suburb pages (priority services only) ----
  const serviceSuburbEntries: MetadataRoute.Sitemap = []
  for (const service of PRIORITY_SERVICES) {
    for (const suburb of suburbs) {
      serviceSuburbEntries.push({
        url: `${SITE_URL}/${service.slug}/${suburb.slug}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.65,
      })
    }
  }

  // ---- Blog ----
  const posts = await getAllPosts()
  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/blog/`,
      lastModified: posts[0]
        ? new Date(posts[0].date_updated || posts[0].date_published)
        : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}/`,
    lastModified: new Date(p.date_updated || p.date_published),
    changeFrequency: 'monthly',
    priority: p.pillar ? 0.8 : 0.6,
  }))

  return [
    ...staticEntries,
    ...serviceEntries,
    ...suburbEntries,
    ...serviceSuburbEntries,
    ...blogIndex,
    ...postEntries,
  ]
}
