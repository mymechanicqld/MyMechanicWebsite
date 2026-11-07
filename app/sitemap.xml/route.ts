import { renderIndex } from '@/lib/sitemap-data'

export const dynamic = 'force-static'

export async function GET() {
  return new Response(await renderIndex(), {
    headers: { 'Content-Type': 'application/xml' },
  })
}
