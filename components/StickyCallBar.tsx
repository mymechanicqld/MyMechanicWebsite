import { Phone, ArrowRight } from 'lucide-react'

/**
 * Mobile-only sticky bottom bar: one-tap call + jump-to-quote.
 * Phone taps are caught by the global TelClickTracker (fires the call conversion).
 * Hidden on large screens. Pages that use it should add bottom padding on mobile
 * (e.g. pb-24 lg:pb-0) so it doesn't cover content.
 */
export default function StickyCallBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-white/10
                    bg-accent/95 backdrop-blur supports-[backdrop-filter]:bg-accent/90
                    px-3 py-2.5 flex items-center gap-2.5
                    pb-[max(0.625rem,env(safe-area-inset-bottom))]">
      <a
        href="tel:0451159954"
        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-white
                   text-accent font-semibold py-3 text-[0.95rem]"
      >
        <Phone className="size-4" strokeWidth={2.25} />
        Call 0451 159 954
      </a>
      <a
        href="#quote"
        className="inline-flex items-center justify-center gap-1 rounded-lg border border-white/40
                   text-white font-semibold py-3 px-4 text-[0.95rem]"
      >
        Quote
        <ArrowRight className="size-4" strokeWidth={2.25} />
      </a>
    </div>
  )
}
