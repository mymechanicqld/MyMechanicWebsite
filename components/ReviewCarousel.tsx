'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

type Review = {
  quote: string
  name: string
  place: string
  when: string
  stars: number
}

export default function ReviewCarousel({ reviews }: { reviews: readonly Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = reviews.length

  const scrollTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const card = track.children[0] as HTMLElement | undefined
      if (!card) return
      const gap = 20 // matches gap-5 (1.25rem = 20px)
      const cardWidth = card.offsetWidth + gap
      track.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
      setCurrent(index)
    },
    []
  )

  // Auto-advance every 5s
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % total
        scrollTo(next)
        return next
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [paused, total, scrollTo])

  const prev = () => {
    const next = current === 0 ? total - 1 : current - 1
    scrollTo(next)
  }
  const next = () => {
    const nextIdx = (current + 1) % total
    scrollTo(nextIdx)
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Cards track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory
                   scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((r) => (
          <div
            key={r.name}
            className="snap-start shrink-0 w-[85vw] sm:w-[380px] lg:w-[400px]
                       bg-surface border border-hairline rounded-2xl p-6 md:p-7
                       flex flex-col gap-4 card-hover hover:border-accent"
          >
            <div className="text-gold inline-flex gap-px">
              {Array.from({ length: r.stars }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" strokeWidth={1.5} />
              ))}
            </div>
            <p className="text-[0.9375rem] leading-relaxed text-ink flex-1 line-clamp-5">
              {r.quote}
            </p>
            <div className="flex justify-between pt-3 border-t border-hairline items-center">
              <div className="text-[0.875rem] text-muted">
                <strong className="text-ink font-semibold">{r.name}</strong>
                <span className="block text-xs text-subtle mt-0.5">{r.place}</span>
              </div>
              <div className="text-xs text-subtle">{r.when}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          <button
            onClick={prev}
            aria-label="Previous review"
            className="size-10 rounded-full border border-hairline bg-surface grid place-items-center
                       hover:border-accent hover:bg-accent-tint transition-colors"
          >
            <ChevronLeft className="size-4 text-ink" strokeWidth={2} />
          </button>
          <button
            onClick={next}
            aria-label="Next review"
            className="size-10 rounded-full border border-hairline bg-surface grid place-items-center
                       hover:border-accent hover:bg-accent-tint transition-colors"
          >
            <ChevronRight className="size-4 text-ink" strokeWidth={2} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-1.5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 bg-accent'
                  : 'w-1.5 bg-hairline hover:bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
