import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export type FaqItem = { question: string; answer: string }
export type BreadcrumbItem = { name: string; url: string }

export interface ServiceFrontmatter {
  slug: string
  priority: boolean
  service_category: string
  nav_label: string

  title: string
  meta_description: string
  canonical: string

  og_title: string
  og_description: string
  og_image: string

  hero_title: string
  hero_subtitle: string
  hero_image: string
  hero_image_alt: string

  price_from: number
  price_label: string
  duration: string
  warranty: string
  parts_brands: string[]

  schema: {
    type: string
    service_type: string
    provider_type: string
    area_served: string[]
  }

  related_services: string[]
  breadcrumb: BreadcrumbItem[]
  faq: FaqItem[]
}

export interface Service extends ServiceFrontmatter {
  bodyHtml: string
}

const SERVICES_DIR = path.join(process.cwd(), 'content', 'services')

export function getServiceSlugs(): string[] {
  if (!fs.existsSync(SERVICES_DIR)) return []
  return fs
    .readdirSync(SERVICES_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''))
}

export async function getService(slug: string): Promise<Service | null> {
  const candidates = [`${slug}.mdx`, `${slug}.md`].map((name) =>
    path.join(SERVICES_DIR, name)
  )
  const filePath = candidates.find((p) => fs.existsSync(p))
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return {
    ...(data as ServiceFrontmatter),
    bodyHtml: processed.toString(),
  }
}

export async function getAllServices(): Promise<Service[]> {
  const slugs = getServiceSlugs()
  const services = await Promise.all(slugs.map(getService))
  return services.filter((s): s is Service => s !== null)
}

export async function getPriorityServices(): Promise<Service[]> {
  const all = await getAllServices()
  return all.filter((s) => s.priority)
}
