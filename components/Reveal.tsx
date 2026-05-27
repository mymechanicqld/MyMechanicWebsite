'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Variant = 'up' | 'fade' | 'scale'

/**
 * Scroll-triggered reveal wrapper.
 *
 * Observes its root element via IntersectionObserver. When >= 12% of the
 * element enters the viewport the `.is-visible` class is added, triggering
 * the CSS animation defined in globals.css.
 *
 * - `variant` controls the animation style (slide-up, fade, scale).
 * - `delay` adds an `animation-delay` for staggering grid children.
 * - `duration` controls the animation length (default 0.7s).
 * - `once` (default true) means the animation only fires once.
 * - Respects `prefers-reduced-motion` via CSS (see globals.css).
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.7,
  once = true,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  variant?: Variant
  delay?: number
  duration?: number
  once?: boolean
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          if (once) observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref as never}
      className={`reveal reveal--${variant} ${className}`}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: delay ? `${delay}s` : undefined,
      }}
    >
      {children}
    </Tag>
  )
}
