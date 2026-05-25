'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import { supabase, type QuoteSubmissionInsert } from '@/lib/supabase'
import { renderQuoteNotificationEmail } from '@/lib/email-templates'

/**
 * Quote-request submission from the public form.
 *
 * Form fields (mirroring the original mymechanicqld.com.au site):
 *   name, phone, email, rego, suburb, message, consent_privacy
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

  // Server-side guardrails. Client-side `required` attributes cover the
  // happy path; this is for hardened clients (curl, broken JS, etc.).
  if (
    !submission.full_name ||
    !submission.email ||
    !submission.phone ||
    !submission.vehicle_rego ||
    !submission.suburb ||
    !submission.symptoms ||
    !submission.consent_privacy
  ) {
    console.warn('[quote-request] missing required fields, ignoring', submission)
    redirect('/?submitted=true#quote')
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
  redirect('/?submitted=true#quote')
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
    vehicle_rego:    get('rego').toUpperCase(), // normalise plates to upper-case
    suburb:          get('suburb'),
    symptoms:        get('message'),            // stored content of "How can we help?"
    consent_privacy: formData.get('consent_privacy') === 'yes',
    source:          'website',
  }
}

async function saveToSupabase(submission: QuoteSubmissionInsert) {
  const { error } = await supabase.from('quote_submissions').insert(submission)
  if (error) throw error
}

async function sendNotificationEmail(submission: QuoteSubmissionInsert) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === 're_xxxxxxxxx') {
    console.warn('[quote-request] RESEND_API_KEY missing, skipping email')
    return
  }

  const from = process.env.QUOTE_SENDER_EMAIL ?? 'onboarding@resend.dev'
  const to = process.env.QUOTE_RECIPIENT_EMAIL ?? 'mymechanicqld@gmail.com'

  const { subject, html, text } = renderQuoteNotificationEmail(submission)
  const replyTo = submission.email

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
