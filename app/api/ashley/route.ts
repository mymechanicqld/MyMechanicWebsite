/* ============================================================================
   Ashley model proxy
   ----------------------------------------------------------------------------
   The owner app (mymechanicqld.github.io/Owner-App) is a static site on GitHub
   Pages with no backend of its own, and its repository is PUBLIC. An OpenRouter
   key shipped in that repo would be scraped and drained within days, so the key
   lives here instead, in this project's Vercel environment variables, and the
   app calls this endpoint.

   What this route guarantees:
     - The OpenRouter key never reaches the browser.
     - No attribution headers are sent. OpenRouter's optional "HTTP-Referer" and
       "X-Title" headers put the calling app's name and URL on their dashboard
       and public rankings; we deliberately omit them, so requests carry nothing
       identifying this project beyond the key itself.
     - `provider.data_collection: "deny"` routes only to providers that do not
       retain or train on the payload. Customer names and emails travel in the
       conversation, so this is not optional.
     - The model, token ceiling and step size are fixed server side. A tampered
       client cannot swap in an expensive model.

   Environment variables (set in Vercel > Settings > Environment Variables):
     OPENROUTER_API_KEY   required. The sk-or-v1-... key.
     ASHLEY_APP_KEY       required. Shared secret the owner app sends back.
     ASHLEY_MODEL         optional. Defaults to google/gemini-3.7-flash.
   ========================================================================== */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const DEFAULT_MODEL = 'google/gemini-3.7-flash'

/* Only the owner app may call this. Everything else is rejected before we spend
   a single token. Origin is trivially spoofed by a script outside a browser, so
   it is a filter, not the security boundary; ASHLEY_APP_KEY is. */
const ALLOWED_ORIGINS = new Set([
  'https://mymechanicqld.github.io',
  'http://localhost:8771',
  'http://127.0.0.1:8771',
])

/* Ceilings. The owner app asks for far less than these; they exist so a
   tampered client cannot turn the endpoint into free unlimited inference. */
const MAX_MESSAGES = 60
const MAX_TOOLS = 30
const MAX_BODY_BYTES = 400_000
const MAX_OUTPUT_TOKENS = 2_000

/* Coarse per-IP throttle. Vercel may run several instances, so this is a
   speed bump against a runaway loop or casual abuse rather than a hard quota.
   A determined attacker is handled by rotating ASHLEY_APP_KEY. */
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 40
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) {
    // keep the map from growing without bound on a long-lived instance
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k)
  }
  return recent.length > MAX_PER_WINDOW
}

function corsHeaders(origin: string | null): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin && ALLOWED_ORIGINS.has(origin) ? origin : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Ashley-Key',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function fail(status: number, message: string, origin: string | null) {
  return NextResponse.json({ error: message }, { status, headers: corsHeaders(origin) })
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) })
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')

  if (origin && !ALLOWED_ORIGINS.has(origin)) return fail(403, 'Origin not allowed', origin)

  const appKey = process.env.ASHLEY_APP_KEY
  const orKey = process.env.OPENROUTER_API_KEY
  if (!appKey || !orKey) return fail(503, 'Assistant is not configured yet', origin)
  if (req.headers.get('x-ashley-key') !== appKey) return fail(401, 'Not authorised', origin)

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) return fail(429, 'Too many requests, give it a moment', origin)

  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) return fail(413, 'Conversation too large', origin)

  let incoming: Record<string, unknown>
  try {
    incoming = JSON.parse(raw)
  } catch {
    return fail(400, 'Malformed request', origin)
  }

  const messages = incoming.messages
  if (!Array.isArray(messages) || !messages.length) return fail(400, 'No messages supplied', origin)
  if (messages.length > MAX_MESSAGES) return fail(400, 'Conversation too long', origin)

  const tools = Array.isArray(incoming.tools) ? incoming.tools.slice(0, MAX_TOOLS) : undefined

  /* The model is chosen here, never by the caller. */
  const body: Record<string, unknown> = {
    model: process.env.ASHLEY_MODEL || DEFAULT_MODEL,
    messages,
    temperature: typeof incoming.temperature === 'number' ? Math.min(Math.max(incoming.temperature, 0), 1) : 0.3,
    max_tokens: Math.min(Number(incoming.max_tokens) || MAX_OUTPUT_TOKENS, MAX_OUTPUT_TOKENS),
    provider: { data_collection: 'deny' },
  }
  if (tools?.length) {
    body.tools = tools
    body.tool_choice = 'auto'
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 50_000)
  try {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      // Deliberately no HTTP-Referer / X-Title. See the header comment.
      headers: { Authorization: `Bearer ${orKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
    const text = await res.text()
    if (!res.ok) {
      // Pass the status through so the client can distinguish a rate limit from
      // an outage, but never echo the provider's body: it can quote the request.
      console.error('[ashley] OpenRouter %d: %s', res.status, text.slice(0, 300))
      return fail(res.status === 429 ? 429 : 502, res.status === 429
        ? 'The model is rate limited right now, try again shortly'
        : 'The model provider is having trouble, try again shortly', origin)
    }
    return new NextResponse(text, {
      status: 200,
      headers: { ...corsHeaders(origin), 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    const aborted = err instanceof Error && err.name === 'AbortError'
    console.error('[ashley] request failed:', err)
    return fail(504, aborted ? 'The model took too long, try again' : 'Could not reach the model', origin)
  } finally {
    clearTimeout(timer)
  }
}
