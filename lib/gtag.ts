// ─────────────────────────────────────────────────────────────────────
// Google tag (gtag.js) helpers — GA4 + Google Ads conversions.
//
// IMPORTANT: the account's real conversion-tracking ID is AW-17735133165.
// (The site previously used AW-17575487896, which holds NO conversion
// actions, so nothing was ever recorded. See google-ads-mcp/audit/.)
//
// Conversion action labels (from the Google Ads account):
//   Lead – Form               -> AW-17735133165/NlXGCJmBjcEbEO3P4ohC
//   Phone Call - Website Tap  -> AW-17735133165/uMnkCMq1nbkcEO3P4ohC
// ─────────────────────────────────────────────────────────────────────

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-6YSECEQTDG'
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17735133165'

/** Google Ads "send_to" labels for each conversion action. */
export const ADS_FORM_LABEL =
  process.env.NEXT_PUBLIC_ADS_FORM_LABEL || 'AW-17735133165/NlXGCJmBjcEbEO3P4ohC'
export const ADS_CALL_LABEL =
  process.env.NEXT_PUBLIC_ADS_CALL_LABEL || 'AW-17735133165/uMnkCMq1nbkcEO3P4ohC'

type GtagArgs = [string, ...unknown[]]

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void
    dataLayer?: unknown[]
  }
}

/**
 * Fire a Google Ads conversion. Safe no-op if gtag has not loaded yet
 * (e.g. ad-blocker, or script still pending). Value defaults to 1 AUD.
 */
export function fireConversion(
  sendTo: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'conversion', {
    send_to: sendTo,
    value: 1.0,
    currency: 'AUD',
    ...params,
  })
}

/** Set hashed-ready first-party data for enhanced conversions (gtag hashes it). */
export function setUserData(userData: Record<string, string>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('set', 'user_data', userData)
}
