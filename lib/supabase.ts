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
  full_name: string
  email: string
  phone?: string | null
  suburb?: string | null
  vehicle_make?: string | null
  vehicle_model?: string | null
  vehicle_year?: number | null
  service_needed?: string | null
  symptoms?: string | null
  preferred_time?: string | null
  ip_address?: string | null
  user_agent?: string | null
  source?: string
}
