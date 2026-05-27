'use client'

import { Award, ShieldCheck, Truck, Star } from 'lucide-react'

const ITEMS = [
  { Icon: Award, text: '15+ years in the trade' },
  { Icon: ShieldCheck, text: 'Warranty-safe servicing' },
  { Icon: Truck, text: 'Fully mobile across SEQ' },
  { Icon: Star, text: 'Highly rated on Google' },
] as const

export default function TrustMarquee() {
  /* Double the base set so each half exceeds any viewport width,
     then duplicate the whole thing for a seamless infinite loop. */
  const half = [...ITEMS, ...ITEMS]          // 8 items
  const all  = [...half, ...half]            // 16 items → translate -50% loops perfectly

  return (
    <div
      className="bg-surface border-b border-hairline py-3.5 overflow-hidden"
      role="marquee"
      aria-label="15+ years in the trade, warranty-safe servicing, fully mobile across SEQ, highly rated on Google"
    >
      <div className="marquee-track">
        {all.map(({ Icon, text }, i) => (
          <span key={i} className="flex items-center gap-2 shrink-0 px-5" aria-hidden="true">
            <Icon className="size-4 text-accent" strokeWidth={1.75} />
            <span className="font-medium text-ink text-sm whitespace-nowrap">{text}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
