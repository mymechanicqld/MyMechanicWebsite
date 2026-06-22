import type { QuoteSubmissionInsert } from './supabase'

/**
 * Human-readable labels for service dropdown slug values.
 * Used in the notification email and anywhere else a slug needs display text.
 */
export const SERVICE_LABELS: Record<string, string> = {
  'brake-repair': 'Brake repair',
  'alternator-starter': 'Alternator and starter motor',
  'radiator-water-pump': 'Radiator and water pump',
  'logbook-servicing': 'Logbook and general servicing',
  'pre-purchase-inspection': 'Pre-purchase inspection',
  'battery-replacement': 'Battery replacement',
  'warning-light-diagnostics': 'Warning-light diagnostics',
  'steering-suspension': 'Steering and suspension',
  'emergency-breakdown': 'Emergency / breakdown',
  'not-sure': 'Not sure / general enquiry',
}

/**
 * Builds the HTML email body for a booking-request notification.
 *
 * Fields rendered (matching the May 2026 public form):
 *   Name, Phone, Email, Rego, Suburb, Service, Car Make,
 *   Preferred Date, Additional details
 *
 * Inlined styles only — email clients (Gmail, Outlook, Apple Mail) strip
 * <style> blocks and ignore most modern CSS. Tables for layout, hex
 * colours matched to the website brand (navy #1E3A8A on stone #FAFAF8).
 */
export function renderQuoteNotificationEmail(submission: QuoteSubmissionInsert): {
  subject: string
  html: string
  text: string
} {
  const fullName = escape(submission.full_name)
  const phone    = escape(submission.phone)
  const phoneTel = submission.phone.replace(/\s/g, '')
  const rego     = escape(submission.vehicle_rego).toUpperCase()
  const suburb   = escape(submission.suburb)
  const message  = submission.symptoms ? escape(submission.symptoms) : ''
  const carMake  = submission.vehicle_make ? escape(submission.vehicle_make) : ''
  const service  = submission.service_needed
    ? escape(SERVICE_LABELS[submission.service_needed] ?? submission.service_needed)
    : ''

  // Format preferred date for display (e.g. "Wed 28 May 2026")
  let dateDisplay = ''
  if (submission.preferred_date) {
    try {
      const d = new Date(submission.preferred_date + 'T00:00:00')
      dateDisplay = d.toLocaleDateString('en-AU', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } catch {
      dateDisplay = escape(submission.preferred_date)
    }
  }

  const subject = `New booking — ${submission.full_name}${rego ? ` (${rego})` : ''}${service ? ` · ${service}` : ''} · ${submission.suburb}`

  const firstName = escape(submission.full_name.split(/\s+/)[0] || submission.full_name)

  // Simple label / value rows. Only include fields that have a value.
  const rows: string[] = [
    row('Phone', `<a href="tel:${phoneTel}" style="color:#1D4ED8;text-decoration:none;">${phone}</a>`),
    row('Email', `<a href="mailto:${escape(submission.email)}" style="color:#1D4ED8;text-decoration:none;">${escape(submission.email)}</a>`),
    row('Suburb', suburb),
    row('Rego', rego || '—'),
  ]
  if (service)     rows.push(row('Service', service))
  if (carMake)     rows.push(row('Car make', carMake))
  if (dateDisplay) rows.push(row('Preferred date', dateDisplay))

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escape(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F4EF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1A1A1A;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F4EF;padding:24px 16px;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#FFFFFF;border:1px solid #E5E5DD;border-radius:10px;overflow:hidden;">

<!-- Header -->
<tr>
<td style="background-color:#1E3A8A;padding:16px 24px;">
<span style="color:#FFFFFF;font-size:15px;font-weight:700;">My Mechanic QLD</span>
<span style="color:#BFDBFE;font-size:12px;font-weight:500;float:right;line-height:22px;">New booking request</span>
</td>
</tr>

<!-- Name + summary -->
<tr>
<td style="padding:24px 24px 4px 24px;">
<div style="font-size:20px;font-weight:700;color:#0F172A;line-height:1.25;">${fullName}</div>
${(service || suburb) ? `<div style="font-size:14px;color:#525252;margin-top:4px;">${[service, suburb].filter(Boolean).join(' · ')}</div>` : ''}
</td>
</tr>

<!-- Details -->
<tr>
<td style="padding:16px 24px 4px 24px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${rows.join('')}
</table>
</td>
</tr>

<!-- Notes (only if provided) -->
${message ? `<tr>
<td style="padding:16px 24px 0 24px;">
<div style="font-size:12px;font-weight:600;color:#737373;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">Notes</div>
<div style="font-size:14px;color:#1A1A1A;line-height:1.6;white-space:pre-wrap;">${message}</div>
</td>
</tr>` : ''}

<!-- Call button -->
<tr>
<td style="padding:22px 24px 24px 24px;">
<a href="tel:${phoneTel}" style="display:inline-block;background-color:#1E3A8A;color:#FFFFFF;padding:11px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">Call ${phone}</a>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="border-top:1px solid #E5E5DD;padding:16px 24px;background-color:#FAFAF8;">
<div style="font-size:12px;color:#78716C;line-height:1.55;">
Reply to this email to message ${firstName} directly.<br/>
Saved to the dashboard · ${new Date().toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Australia/Brisbane' })} AEST.${submission.consent_privacy ? '' : '<br/>Consent flag was not set — review before storing data.'}
</div>
</td>
</tr>

</table>
<div style="margin-top:12px;font-size:11px;color:#A8A29E;">My Mechanic QLD · 0451 159 954</div>
</td></tr>
</table>
</body>
</html>`

  // Plain-text lines — only include fields that have content
  const lines: string[] = [
    'NEW BOOKING REQUEST — MY MECHANIC QLD',
    '',
    `Name:    ${submission.full_name}`,
    `Phone:   ${submission.phone}`,
    `Email:   ${submission.email}`,
    `Suburb:  ${submission.suburb}`,
    `Rego:    ${rego || '—'}`,
  ]

  if (service)      lines.push(`Service: ${SERVICE_LABELS[submission.service_needed!] ?? submission.service_needed}`)
  if (carMake)      lines.push(`Car:     ${submission.vehicle_make}`)
  if (dateDisplay)  lines.push(`Date:    ${dateDisplay}`)

  if (message) {
    lines.push('', 'Notes:', submission.symptoms!)
  }

  lines.push(
    '',
    `Reply to this email to message ${submission.full_name.split(/\s+/)[0] || submission.full_name} directly.`,
  )
  if (!submission.consent_privacy) {
    lines.push('Consent flag was NOT set. Review before storing data.')
  }

  const text = lines.join('\n')

  return { subject, html, text }
}

/** Render a simple label / value row for the details list. */
function row(label: string, value: string): string {
  return `<tr>
<td style="padding:7px 0;font-size:13px;color:#737373;width:118px;vertical-align:top;border-bottom:1px solid #F0F0EC;">${escape(label)}</td>
<td style="padding:7px 0;font-size:14px;color:#1A1A1A;vertical-align:top;border-bottom:1px solid #F0F0EC;">${value}</td>
</tr>`
}

function escape(s: string | number | null | undefined): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
