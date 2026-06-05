'use client'

import { useEffect } from 'react'

/**
 * Captures first-party data from the booking form at submit time (before the
 * native POST navigates away) and stashes it in sessionStorage so the success
 * page can attach it for enhanced conversions. No data leaves the browser here;
 * gtag hashes it client-side when the conversion fires (ConversionOnSuccess).
 *
 * Mounted alongside the form. Listens for submit on the form marked
 * data-lead-form. Phone normalised to E.164 (+61...) for best match rates.
 */
export default function LeadDataCapture() {
  useEffect(() => {
    const onSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement | null
      if (!form || !form.matches?.('form[data-lead-form]')) return
      try {
        const fd = new FormData(form)
        const rawPhone = String(fd.get('phone') || '').replace(/[^\d+]/g, '')
        let phone = rawPhone
        if (phone.startsWith('0')) phone = '+61' + phone.slice(1)
        else if (phone && !phone.startsWith('+')) phone = '+61' + phone
        sessionStorage.setItem(
          'mmqld_ec',
          JSON.stringify({
            email: String(fd.get('email') || '').trim().toLowerCase(),
            phone_number: phone,
            first_name: String(fd.get('name') || '').trim().split(/\s+/)[0] || '',
          })
        )
      } catch {
        /* ignore */
      }
    }
    document.addEventListener('submit', onSubmit, { capture: true })
    return () => document.removeEventListener('submit', onSubmit, { capture: true })
  }, [])

  return null
}
