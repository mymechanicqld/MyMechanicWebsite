'use client'

import { useEffect } from 'react'
import { fireConversion, setUserData, ADS_FORM_LABEL } from '@/lib/gtag'

/**
 * Fires the "Lead – Form" Google Ads conversion exactly once when the booking
 * success state renders (the form server-redirects to ?submitted=true, so there
 * is no submit-time client code — the success render is the reliable fire point).
 *
 * De-duped per browser session so a refresh of the success URL cannot re-count.
 * If the form captured first-party data (LeadDataCapture), it is attached for
 * enhanced conversions, then cleared.
 */
export default function ConversionOnSuccess() {
  useEffect(() => {
    const KEY = 'mmqld_lead_fired'
    if (sessionStorage.getItem(KEY)) return

    // Enhanced conversions: attach hashed-ready user data if we captured it.
    try {
      const raw = sessionStorage.getItem('mmqld_ec')
      if (raw) {
        setUserData(JSON.parse(raw))
        sessionStorage.removeItem('mmqld_ec')
      }
    } catch {
      /* ignore malformed EC payload */
    }

    fireConversion(ADS_FORM_LABEL, {
      transaction_id: `lead-${Date.now()}`, // dedup key on the Ads side
    })
    sessionStorage.setItem(KEY, '1')

    // Strip ?submitted=true so the success URL cannot be shared/bookmarked to inflate counts.
    try {
      const url = new URL(window.location.href)
      if (url.searchParams.has('submitted')) {
        url.searchParams.delete('submitted')
        window.history.replaceState({}, '', url.pathname + url.search + url.hash)
      }
    } catch {
      /* no-op */
    }
  }, [])

  return null
}
