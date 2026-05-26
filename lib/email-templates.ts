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
 *   Preferred Date, Preferred Time, Additional details
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

  // Format preferred time window for display
  const timeLabels: Record<string, string> = {
    '7am-10am': 'Morning (7am - 10am)',
    '10am-12pm': 'Late morning (10am - 12pm)',
    '12pm-3pm': 'Afternoon (12pm - 3pm)',
    '3pm-6pm': 'Late afternoon (3pm - 6pm)',
  }
  const timeDisplay = submission.preferred_time
    ? escape(timeLabels[submission.preferred_time] ?? submission.preferred_time)
    : ''

  const subject = `New booking — ${submission.full_name}${rego ? ` (${rego})` : ''}${service ? ` · ${service}` : ''} · ${submission.suburb}`

  // Build optional booking-details rows
  const detailRows: string[] = []

  if (service) {
    detailRows.push(detailRow('Service', `<strong style="color:#0C0A09;">${service}</strong>`))
  }
  if (carMake) {
    detailRows.push(detailRow('Car make', carMake))
  }
  if (dateDisplay) {
    detailRows.push(detailRow('Preferred date', dateDisplay))
  }
  if (timeDisplay) {
    detailRows.push(detailRow('Preferred time', timeDisplay))
  }

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escape(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#FAFAF8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0C0A09;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAFAF8;padding:24px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border:1px solid #E7E5E4;border-radius:14px;overflow:hidden;">

<!-- Brand header -->
<tr>
<td style="background-color:#1E3A8A;padding:20px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="vertical-align:middle;">
<span style="display:inline-block;color:#FFFFFF;font-size:16px;font-weight:700;letter-spacing:0.02em;line-height:1;">MY MECHANIC QLD</span>
<div style="color:#BFDBFE;font-size:12px;font-weight:500;margin-top:4px;letter-spacing:0.06em;text-transform:uppercase;">New booking request</div>
</td>
<td align="right" style="vertical-align:middle;">
<span style="display:inline-block;background-color:#FFFFFF;color:#1E3A8A;padding:6px 12px;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Action needed</span>
</td>
</tr>
</table>
</td>
</tr>

<!-- Hero: customer name + contact rail -->
<tr>
<td style="padding:32px 28px 8px 28px;">
<div style="font-size:13px;font-weight:600;color:#78716C;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Customer</div>
<div style="font-size:26px;font-weight:700;color:#0C0A09;letter-spacing:-0.01em;line-height:1.15;">${fullName}</div>
<div style="font-size:14px;color:#57534E;margin-top:6px;">
<a href="mailto:${escape(submission.email)}" style="color:#1E3A8A;text-decoration:none;font-weight:600;">${escape(submission.email)}</a>
&nbsp;·&nbsp;<a href="tel:${phoneTel}" style="color:#1E3A8A;text-decoration:none;font-weight:600;">${phone}</a>
&nbsp;·&nbsp;${suburb}
</div>
</td>
</tr>

<!-- Rego badge -->
<tr>
<td style="padding:20px 28px 0 28px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="background-color:#1E3A8A;border-radius:8px;padding:10px 16px;">
<div style="color:#BFDBFE;font-size:9px;font-weight:700;letter-spacing:0.18em;line-height:1;">REGO</div>
<div style="color:#FFFFFF;font-size:18px;font-weight:700;letter-spacing:0.12em;font-family:'SF Mono',Menlo,Consolas,monospace;margin-top:3px;line-height:1;">${rego || '—'}</div>
</td>
</tr>
</table>
</td>
</tr>

<!-- Booking details -->
${detailRows.length > 0 ? `<tr>
<td style="padding:24px 28px 0 28px;">
<div style="font-size:11px;font-weight:600;color:#78716C;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;">Booking details</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E7E5E4;border-radius:8px;overflow:hidden;">
${detailRows.join('')}
</table>
</td>
</tr>` : ''}

<!-- Message body (only if provided) -->
${message ? `<tr>
<td style="padding:24px 28px 8px 28px;">
<div style="font-size:11px;font-weight:600;color:#78716C;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Additional notes</div>
<div style="font-size:15px;color:#0C0A09;line-height:1.65;white-space:pre-wrap;background-color:#F5F5F4;border-left:3px solid #1E3A8A;border-radius:0 8px 8px 0;padding:14px 16px;">${message}</div>
</td>
</tr>` : ''}

<!-- CTA buttons -->
<tr>
<td style="padding:24px 28px 28px 28px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="padding-right:8px;">
<a href="tel:${phoneTel}" style="display:inline-block;background-color:#1E3A8A;color:#FFFFFF;padding:12px 22px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.01em;">Call ${phone}</a>
</td>
<td>
<a href="mailto:${escape(submission.email)}" style="display:inline-block;background-color:#FFFFFF;color:#1E3A8A;padding:11px 21px;border:1px solid #1E3A8A;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.01em;">Reply by email</a>
</td>
</tr>
</table>
</td>
</tr>

<!-- Footer -->
<tr>
<td style="border-top:1px solid #E7E5E4;padding:18px 28px;background-color:#FAFAF8;">
<div style="font-size:12px;color:#78716C;line-height:1.5;">
${submission.consent_privacy ? 'Customer consented to the Privacy Policy.' : 'Consent flag was not set. Review before storing data.'}<br/>
Saved in the operations dashboard. Submitted ${new Date().toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Australia/Brisbane' })} AEST.
</div>
</td>
</tr>

</table>
<div style="margin-top:14px;font-size:11px;color:#A8A29E;">My Mechanic QLD · Springwood, Queensland · 0451 159 954</div>
</td></tr>
</table>
</body>
</html>`

  // Plain-text lines — only include fields that have content
  const lines: string[] = [
    'NEW BOOKING REQUEST — MY MECHANIC QLD',
    String.fromCharCode(0x2500).repeat(37),
    '',
    `Name:    ${submission.full_name}`,
    `Phone:   ${submission.phone}`,
    `Email:   ${submission.email}`,
    `Rego:    ${rego || '—'}`,
    `Suburb:  ${submission.suburb}`,
  ]

  if (service)      lines.push(`Service: ${SERVICE_LABELS[submission.service_needed!] ?? submission.service_needed}`)
  if (carMake)      lines.push(`Car:     ${submission.vehicle_make}`)
  if (dateDisplay)  lines.push(`Date:    ${dateDisplay}`)
  if (timeDisplay)  lines.push(`Time:    ${timeLabels[submission.preferred_time!] ?? submission.preferred_time}`)

  if (message) {
    lines.push('', 'Additional notes:', submission.symptoms!)
  }

  lines.push(
    '',
    String.fromCharCode(0x2500).repeat(37),
    `Reply: mailto:${submission.email}`,
    `Call:  ${submission.phone}`,
    '',
    submission.consent_privacy
      ? 'Customer consented to the Privacy Policy.'
      : 'Consent flag NOT set. Review before storing data.',
  )

  const text = lines.join('\n')

  return { subject, html, text }
}

/** Render a single detail row for the HTML booking-details table. */
function detailRow(label: string, value: string): string {
  return `<tr>
<td style="padding:10px 14px;font-size:12px;font-weight:600;color:#78716C;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #F5F5F4;width:120px;vertical-align:top;">${escape(label)}</td>
<td style="padding:10px 14px;font-size:14px;color:#0C0A09;border-bottom:1px solid #F5F5F4;vertical-align:top;">${value}</td>
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
