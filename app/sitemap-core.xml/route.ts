import { coreEntries, renderUrlset } from '@/lib/sitemap-data'

export const dynamic = 'force-static'

export async function GET() {
  const now = new Date().toISOString()
  const entries = await coreEntries(now)
  return new Response(renderUrlset(entries), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
