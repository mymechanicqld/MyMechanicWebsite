import { Clock, Scale, FileText, CreditCard, type LucideIcon } from 'lucide-react'

/**
 * The four offers our Google Ads promise, shown on every page ads land on so
 * the page backs up the ad. Keep this list in step with the ads (owned by the
 * Google Ads session).
 *
 * Wording rules: price match is always tied to a written quote for the same
 * job. Never "guarantee", "best price" or "no call-out fee" (some jobs carry a
 * distance charge, shown in the quote).
 */
export const WHY_BOOK: { Icon: LucideIcon; label: string }[] = [
  { Icon: Clock, label: 'Open 24/7' },
  { Icon: Scale, label: 'We price match written quotes' },
  { Icon: FileText, label: 'Fixed upfront quote' },
  { Icon: CreditCard, label: 'Afterpay available' },
]

/** Two across by default, which fits a half-width hero column. Pass
 *  className="sm:grid-cols-4" where the strip has the full content width. */
export default function WhyBookStrip({ className = '' }: { className?: string }) {
  return (
    <ul
      aria-label="Why book with us"
      className={`grid grid-cols-2 gap-x-4 gap-y-3 ${className}`}
    >
      {WHY_BOOK.map(({ Icon, label }) => (
        <li key={label} className="flex items-center gap-2.5 text-[0.9375rem] text-ink leading-snug">
          <span className="size-8 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
            <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  )
}
