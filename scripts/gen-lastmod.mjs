#!/usr/bin/env node
/**
 * Writes lib/lastmod.json: URL path -> date its content last changed, for the
 * sitemap <lastmod>. Run before committing content changes:
 *
 *   npm run lastmod
 *
 * Dates come from git, so they are real content dates rather than the build
 * time. (Vercel clones shallowly, so this cannot run at build time.) A source
 * file with uncommitted changes gets today's date, since it is about to ship.
 *
 * Blog posts and suburb pages are not listed here: posts carry date_updated /
 * date_published in frontmatter, suburb overrides carry an `updated` field.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, writeFileSync } from 'node:fs'

const today = new Date().toISOString().slice(0, 10)

function fileDate(file) {
  if (!existsSync(file)) return null
  const dirty = execFileSync('git', ['status', '--porcelain', '--', file]).toString().trim()
  if (dirty) return today
  const iso = execFileSync('git', ['log', '-1', '--format=%cs', '--', file]).toString().trim()
  return iso || today
}

/** Latest date across a page's source files. */
function pageDate(files) {
  const dates = files.map(fileDate).filter(Boolean).sort()
  return dates.at(-1) ?? null
}

const pages = {
  '/': ['app/page.tsx'],
}

// Static pages: every app/<name>/page.tsx that is not a dynamic route.
for (const dir of readdirSync('app', { withFileTypes: true })) {
  if (!dir.isDirectory() || dir.name.startsWith('[') || dir.name.startsWith('(')) continue
  if (dir.name === 'api' || dir.name.startsWith('sitemap')) continue
  if (existsSync(`app/${dir.name}/page.tsx`)) pages[`/${dir.name}/`] = [`app/${dir.name}/page.tsx`]
}

// Shared components that make up the region and area hubs.
for (const r of ['brisbane', 'logan', 'ipswich', 'gold-coast']) {
  if (pages[`/${r}/`]) pages[`/${r}/`].push('components/RegionHubContent.tsx', 'lib/suburbs.ts')
}
if (pages['/brisbane-south/']) pages['/brisbane-south/'].push('components/AreaHubContent.tsx', 'lib/area-hubs.ts')

// Service pages are MDX content.
for (const f of readdirSync('content/services')) {
  if (f.endsWith('.mdx')) pages[`/${f.replace(/\.mdx$/, '')}/`] = [`content/services/${f}`]
}

const out = Object.fromEntries(
  Object.entries(pages)
    .map(([path, files]) => [path, pageDate(files)])
    .filter(([, d]) => d)
    .sort(([a], [b]) => a.localeCompare(b)),
)
writeFileSync('lib/lastmod.json', JSON.stringify(out, null, 2) + '\n')
console.log(`lib/lastmod.json: ${Object.keys(out).length} pages`)
