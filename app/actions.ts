'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import { supabase, type QuoteSubmissionInsert } from '@/lib/supabase'
import { renderQuoteNotificationEmail } from '@/lib/email-templates'

/** Pages that are allowed as redirect targets after submission. */
const ALLOWED_REDIRECTS = ['/', '/book/', '/contact/']

/**
 * Quote / booking-request submission from the public form.
 *
 * Form fields (May 2026 redesign):
 *   name, phone, email, suburb, rego, car_make, service_needed,
 *   message, preferred_date, preferred_time, consent_privacy
 *
 * Two destinations, run in parallel:
 *   1. Supabase `quote_submissions` table — permanent record + dashboard feed
 *   2. Resend transactional email — notifies the business inbox immediately
 *
 * Failures in one channel must NOT block the other. We log and continue.
 * The customer is redirected to the success page regardless, because they
 * should not see a server error for an internal-tooling glitch.
 */
export async function submitQuoteAction(formData: FormData) {
  const submission = parseFormData(formData)

  // Determine where to send the customer after submission.
  // Validated against a whitelist to prevent open-redirect attacks.
  const rawRedirect = formData.get('redirect_to')
  const redirectPath =
    typeof rawRedirect === 'string' && ALLOWED_REDIRECTS.includes(rawRedirect)
      ? rawRedirect
      : '/'

  // Server-side guardrails. Client-side `required` attributes cover the
  // happy path; this is for hardened clients (curl, broken JS, etc.).
  if (
    !submission.full_name ||
    !submission.email ||
    !submission.phone ||
    !submission.vehicle_rego ||
    !submission.suburb ||
    !submission.service_needed ||
    !submission.consent_privacy
  ) {
    console.warn('[quote-request] missing required fields, ignoring', submission)
    redirect(`${redirectPath}?submitted=true#quote`)
  }

  // Capture request metadata for audit / spam triage
  const h = await headers()
  submission.ip_address = h.get('x-forwarded-for') ?? h.get('x-real-ip') ?? null
  submission.user_agent = h.get('user-agent') ?? null

  // Run both side-effects in parallel; a failure in one must not block the other
  const [supabaseResult, emailResult] = await Promise.allSettled([
    saveToSupabase(submission),
    sendNotificationEmail(submission),
  ])

  if (supabaseResult.status === 'rejected') {
    console.error('[quote-request] supabase insert failed:', supabaseResult.reason)
  }
  if (emailResult.status === 'rejected') {
    console.error('[quote-request] resend email failed:', emailResult.reason)
  }

  // Always redirect the customer to success — internal failures are recovered
  // from the email backup (if Supabase failed) or the Supabase record (if
  // email failed). If both fail, the customer can still call us.
  redirect(`${redirectPath}?submitted=true#quote`)
}

function parseFormData(formData: FormData): QuoteSubmissionInsert {
  const get = (k: string) => {
    const v = formData.get(k)
    return typeof v === 'string' && v.trim() ? v.trim() : ''
  }

  return {
    full_name:       get('name'),
    phone:           get('phone'),
    email:           get('email'),
    vehicle_rego:    get('rego').toUpperCase(),       // normalise plates to upper-case
    suburb:          get('suburb'),
    address:         get('address') || null,            // street address for the mobile call-out
    service_needed:  get('service_needed'),            // dropdown slug value
    vehicle_make:    get('car_make') || null,           // optional
    symptoms:        get('message') || null,            // optional free-text
    preferred_date:  get('preferred_date') || null,     // YYYY-MM-DD or null
    consent_privacy: formData.get('consent_privacy') === 'yes',
    source:          'website',
  }
}

async function saveToSupabase(submission: QuoteSubmissionInsert) {
  const { error } = await supabase.from('quote_submissions').insert(submission)
  if (!error) return
  // Forward-compatible: if the `address` column has not been added to the DB
  // yet, drop it and retry so the submission is still recorded.
  if (/could not find the 'address' column/i.test(error.message)) {
    const { address: _omit, ...rest } = submission
    const retry = await supabase.from('quote_submissions').insert(rest)
    if (retry.error) throw retry.error
    return
  }
  throw error
}

/**
 * Build a safe `"Display Name" <email>` header value. Quotes the display name
 * so commas/special characters don't break the header, and strips characters
 * that could be used for header injection.
 */
function formatAddress(name: string, email: string): string {
  const cleanEmail = String(email).replace(/[\r\n,<>\s]/g, '')
  const cleanName = String(name).replace(/[\r\n"\\]/g, ' ').replace(/\s+/g, ' ').trim()
  return cleanName ? `"${cleanName}" <${cleanEmail}>` : cleanEmail
}

async function sendNotificationEmail(submission: QuoteSubmissionInsert) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === 're_xxxxxxxxx') {
    console.warn('[quote-request] RESEND_API_KEY missing, skipping email')
    return
  }

  const senderEmail = process.env.QUOTE_SENDER_EMAIL ?? 'bookings@mymechanicqld.com.au'
  const to = process.env.QUOTE_RECIPIENT_EMAIL ?? 'mymechanicqld@gmail.com'

  const { subject, html, text } = renderQuoteNotificationEmail(submission)

  // Sender shows the customer's name in your inbox; Reply-To routes a reply
  // straight to the customer, so Gmail's own "Reply" keeps one clean thread.
  const from = formatAddress(`${submission.full_name} via My Mechanic QLD`, senderEmail)
  const replyTo = formatAddress(submission.full_name, submission.email)

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo,
    subject,
    html,
    text,
  })
  if (error) throw error
  console.log('[quote-request] email sent, id=', data?.id)
}
