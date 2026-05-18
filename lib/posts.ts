import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

export interface PostFrontmatter {
  slug: string
  title: string
  meta_description: string
  excerpt: string

  category: string
  tags: string[]
  pillar?: boolean

  author: string
  author_bio: string
  author_image?: string

  date_published: string
  date_updated?: string

  hero_image: string
  hero_image_alt: string
  og_image?: string

  related?: string[]
  related_services?: string[]
}

export interface Post extends PostFrontmatter {
  bodyHtml: string
  reading_time: number
  word_count: number
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''))
}

function computeReadingTime(content: string) {
  // Strip markdown syntax roughly, then count words
  const stripped = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/[#*_>|-]/g, ' ')
  const words = stripped.trim().split(/\s+/).filter(Boolean).length
  return {
    reading_time: Math.max(1, Math.round(words / 200)),
    word_count: words,
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const candidates = [`${slug}.mdx`, `${slug}.md`].map((name) =>
    path.join(POSTS_DIR, name)
  )
  const filePath = candidates.find((p) => fs.existsSync(p))
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const stats = computeReadingTime(content)

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)

  return {
    ...(data as PostFrontmatter),
    bodyHtml: processed.toString(),
    ...stats,
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(slugs.map(getPost))
  return posts
    .filter((p): p is Post => p !== null)
    .sort(
      (a, b) =>
        new Date(b.date_published).getTime() - new Date(a.date_published).getTime()
    )
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const all = await getAllPosts()
  const others = all.filter((p) => p.slug !== post.slug)

  // 1. Explicit related (if author specified them)
  const explicit = post.related
    ? post.related
        .map((s) => others.find((p) => p.slug === s))
        .filter((p): p is Post => p !== undefined)
    : []

  // 2. Same category
  const sameCategory = others.filter(
    (p) => p.category === post.category && !explicit.some((e) => e.slug === p.slug)
  )

  // 3. Anything else (newest first), already sorted
  const rest = others.filter(
    (p) =>
      !explicit.some((e) => e.slug === p.slug) &&
      !sameCategory.some((c) => c.slug === p.slug)
  )

  return [...explicit, ...sameCategory, ...rest].slice(0, limit)
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
