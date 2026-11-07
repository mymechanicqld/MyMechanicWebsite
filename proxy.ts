import { NextResponse, type NextRequest } from 'next/server'

/**
 * Lowercase any page path that has capital letters: /Wynnum -> /wynnum/.
 *
 * This lives here, not in next.config.mjs redirects, because Next.js matches
 * redirect sources case-insensitively: a "/Wynnum" rule also matched
 * "/wynnum/" and redirected it to itself (the Sept 2026 loop). Here the path
 * is compared exactly, so a lowercase URL is never touched.
 *
 * Config redirects run before this, so the legacy map in redirects.json still
 * applies first.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === pathname.toLowerCase()) return NextResponse.next()

  const url = request.nextUrl.clone() // keeps the query string (gclid etc.)
  url.pathname = pathname.toLowerCase().replace(/\/?$/, '/')
  return NextResponse.redirect(url, 301)
}

export const config = {
  // Pages only: skip Next internals, the API and anything that looks like a file.
  matcher: ['/((?!_next/|api/|.*\\.[a-zA-Z0-9]+$).*)'],
}
