import { regionEntries, renderUrlset } from '@/lib/sitemap-data'

export const dynamic = 'force-static'

export function GET() {
  const now = new Date().toISOString()
  return new Response(renderUrlset(regionEntries('brisbane', now)), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
