import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client.
 *
 * Uses the publishable (anon) key — same key the dashboard uses in the
 * browser. RLS policies restrict what this client can do:
 *   - insert into quote_submissions: yes (public form)
 *   - select from quote_submissions: yes (dashboard reads)
 *   - update/delete: blocked (would need service-role key)
 *
 * If you later need to mutate records from the server (e.g. status updates),
 * add a SUPABASE_SERVICE_ROLE_KEY env var and create a second client.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!url || !key) {
  console.warn(
    '[supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY missing. ' +
      'Quote submissions will fail silently. Add them to .env.local.',
  )
}

export const supabase = createClient(url ?? 'https://placeholder.supabase.co', key ?? 'placeholder', {
  auth: { persistSession: false },
})

export type QuoteSubmissionInsert = {
  // ── Required public-form fields ────────────────────────────────────────
  full_name: string         // "Full Name"
  email: string             // "Email"
  phone: string             // "Phone Number"
  vehicle_rego: string      // "Registration" — licence plate
  suburb: string            // "Suburb"
  address?: string | null   // "Street address" — for the mobile call-out
  service_needed: string    // "Service" — dropdown selection (slug value)
  consent_privacy: boolean  // True when the privacy-policy box was ticked

  // ── Optional form fields (May 2026 redesign) ──────────────────────────
  vehicle_make?: string | null    // "Car Make" — e.g. Toyota Camry
  symptoms?: string | null        // "Additional details" textarea (optional since service dropdown captures intent)
  preferred_date?: string | null  // "Preferred date" — YYYY-MM-DD from date picker

  // ── Legacy (column retained in DB for historical rows, no longer collected) ─
  preferred_time?: string | null

  // ── Audit metadata (server-populated) ──────────────────────────────────
  ip_address?: string | null
  user_agent?: string | null
  source?: string

  // ── Legacy columns retained for historical rows (no longer collected) ──
  vehicle_model?: string | null
  vehicle_year?: number | null
}
