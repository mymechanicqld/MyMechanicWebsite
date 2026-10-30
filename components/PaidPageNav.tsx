'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

/**
 * Pages that only paid ad traffic lands on. They get a minimal header (logo,
 * phone, one quote button) so visitors are not pulled away into the 70-odd
 * links of the full menu.
 */
const PAID_PATHS = new Set(['/mobile-mechanic'])

function useIsPaidPage(): boolean {
  const path = (usePathname() ?? '').replace(/\/+$/, '')
  return PAID_PATHS.has(path)
}

/** Renders its children everywhere except on paid landing pages. */
export function UnlessPaidPage({ children }: { children: ReactNode }) {
  return useIsPaidPage() ? null : <>{children}</>
}

/** The single header action on paid landing pages: jump to the on-page form. */
export function PaidPageQuoteButton() {
  if (!useIsPaidPage()) return null
  return (
    <a href="#quote" className="btn btn-primary whitespace-nowrap shrink-0 px-4 sm:px-5">
      Get a quote
      <ArrowRight className="size-4 hidden sm:block" strokeWidth={2} />
    </a>
  )
}
