'use client'

import { useEffect } from 'react'
import { fireConversion, ADS_CALL_LABEL } from '@/lib/gtag'

/**
 * One delegated, capture-phase listener catches every <a href="tel:..."> tap
 * site-wide (there are 11+ phone anchors across Header, Footer, hero, coverage,
 * etc.) and fires the "Phone Call - Website Tap" Google Ads conversion.
 *
 * 83% of ad spend is mobile, where users tap the number directly, so this is
 * the dominant call-tracking path. Mounted once in the root layout.
 */
export default function TelClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.('a[href^="tel:"]')
      if (anchor) fireConversion(ADS_CALL_LABEL)
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
