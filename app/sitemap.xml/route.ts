import { renderIndex } from '@/lib/sitemap-data'

export const dynamic = 'force-static'

export function GET() {
  const now = new Date().toISOString()
  return new Response(renderIndex(now), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
