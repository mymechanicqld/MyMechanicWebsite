'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ArrowRight, Phone } from 'lucide-react'
import { SERVICE_GROUPS } from '@/lib/navigation'

/**
 * Desktop services mega-menu.
 *
 * Hover opens the dropdown after a short delay. Clicking the "Services" label
 * navigates to /services/. Escape closes. Click-outside closes. The component
 * is hidden below the `lg` breakpoint (the mobile drawer handles small screens).
 */
export default function ServicesDropdown() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Click outside
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  // Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        setOpen(false)
        // Refocus the trigger
        wrapperRef.current?.querySelector<HTMLElement>('[data-trigger]')?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const handleMouseEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    enterTimer.current = setTimeout(() => setOpen(true), 80)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (enterTimer.current) clearTimeout(enterTimer.current)
    leaveTimer.current = setTimeout(() => setOpen(false), 250)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    },
    []
  )

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger — clicking navigates, hovering opens dropdown */}
      <Link
        href="/services/"
        data-trigger
        role="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="services-mega-menu"
        onKeyDown={handleKeyDown}
        className="text-[0.9375rem] font-medium text-ink no-underline hover:text-accent-bright
                   inline-flex items-center gap-1"
      >
        Services
        <ChevronDown
          className={`size-3.5 text-subtle transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
        />
      </Link>

      {/* Invisible bridge — prevents hover gap between trigger and panel */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full w-full h-4 ${
          open ? '' : 'pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Dropdown panel */}
      <div
        id="services-mega-menu"
        role="menu"
        aria-label="Services"
        className={`absolute top-[calc(100%+0.75rem)] left-0
                    w-[min(780px,92vw)]
                    bg-surface border border-hairline rounded-xl
                    shadow-[0_4px_24px_rgba(12,10,9,.08),0_1px_2px_rgba(12,10,9,.04)]
                    p-5 md:p-6
                    transition-all duration-150 ease-out origin-top
                    motion-reduce:transition-none
                    ${open
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-1 pointer-events-none'
                    }`}
      >
        <div className="grid grid-cols-3 gap-5">
          {SERVICE_GROUPS.map((group) => (
            <div key={group.title} role="group" aria-label={group.title}>
              <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent-bright mb-3 px-1">
                {group.title}
              </div>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const inner = (
                    <div className="flex gap-3 items-start">
                      <div className="size-9 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0 mt-0.5">
                        <item.Icon className="size-[18px]" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[0.9375rem] font-medium text-ink leading-snug">
                            {item.label}
                          </span>
                          {item.priority && (
                            <span className="size-1.5 rounded-full bg-gold shrink-0" title="Popular service" />
                          )}
                        </div>
                        <p className="text-[0.8125rem] text-muted leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )

                  if (item.callOnly) {
                    return (
                      <a
                        key={item.slug}
                        href={item.href}
                        role="menuitem"
                        className="rounded-lg p-2.5 no-underline hover:bg-soft transition-colors"
                      >
                        {inner}
                      </a>
                    )
                  }

                  return (
                    <Link
                      key={item.slug}
                      href={item.href as `/${string}`}
                      role="menuitem"
                      className="rounded-lg p-2.5 no-underline hover:bg-soft transition-colors"
                    >
                      {inner}
                    </Link>
                  )
                })}
              </div>

              {/* CTA card in the "Get Help" column */}
              {group.title === 'Get Help' && (
                <>
                  <div className="mt-3 rounded-xl bg-accent-tint border border-accent/15 p-4">
                    <p className="text-[0.875rem] font-semibold text-ink mb-1">
                      Not sure which service?
                    </p>
                    <p className="text-[0.8125rem] text-muted mb-3 leading-snug">
                      Describe the problem and we will quote it.
                    </p>
                    <Link
                      href={'/book/' as `/${string}`}
                      role="menuitem"
                      className="btn btn-primary text-[0.8125rem] px-3.5 py-2"
                    >
                      Get a quote
                      <ArrowRight className="size-3.5" strokeWidth={2} />
                    </Link>
                  </div>

                  <Link
                    href="/services/"
                    role="menuitem"
                    className="mt-3 px-1 text-[0.8125rem] font-semibold text-accent-bright
                               no-underline hover:text-accent-hover inline-flex items-center gap-1"
                  >
                    View all services
                    <ArrowRight className="size-3" strokeWidth={2} />
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
