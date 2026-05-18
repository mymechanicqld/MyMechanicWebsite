'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronRight, ArrowRight, Phone } from 'lucide-react'

type NavItem = { label: string; href: string }

/**
 * Mobile navigation drawer.
 *
 * Backdrop and panel are siblings (not nested). The panel is `position: fixed`
 * directly so the body's `overflow-x: hidden` cannot clip it, and so the
 * transform on the panel does not need a containing block of its own.
 *
 * Visibility is controlled by `opacity` + `pointer-events`, never by Tailwind's
 * `invisible` class — which can cascade through to hide children mid-transition
 * on mobile Safari.
 */
export default function MobileDrawer({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('lock-scroll', open)
    return () => document.body.classList.remove('lock-scroll')
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-controls="mobile-drawer"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center size-11 rounded-lg
                   bg-surface border border-hairline text-ink hover:border-ink transition-colors"
      >
        <Menu className="size-[22px]" strokeWidth={1.75} />
      </button>

      {/* Backdrop (separate sibling, not a parent of the panel) */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-[90] bg-ink/55 transition-opacity duration-300 ease-out ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        className={`fixed top-0 right-0 bottom-0 z-[100] w-[min(360px,88vw)] bg-surface
                    flex flex-col shadow-2xl
                    transition-transform duration-300 ease-out
                    ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-hairline shrink-0">
          <Link
            href="/"
            onClick={close}
            className="inline-flex items-center gap-2.5 font-bold text-[1.0625rem] text-ink no-underline tracking-tight hover:text-ink"
            aria-label="My Mechanic QLD home"
          >
            <span className="size-9 rounded-md bg-accent grid place-items-center shrink-0">
              <Image
                src="/images/logo-white.webp"
                alt=""
                width={28}
                height={28}
                className="size-[26px]"
              />
            </span>
            My Mechanic QLD
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="inline-flex items-center justify-center size-10 rounded-lg
                       bg-transparent border border-hairline text-ink hover:border-ink"
          >
            <X className="size-[18px]" strokeWidth={1.75} />
          </button>
        </div>

        <nav
          className="flex flex-col px-6 py-2 flex-1 min-h-0 overflow-y-auto overscroll-contain"
          aria-label="Mobile primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as `/${string}`}
              onClick={close}
              className="flex items-center justify-between py-3.5 text-base font-medium
                         text-ink no-underline border-b border-hairline hover:text-accent-bright"
            >
              {item.label}
              <ChevronRight className="size-[18px] text-subtle" strokeWidth={1.75} />
            </Link>
          ))}

          <div className="mt-3 pt-3">
            <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-subtle mb-1 px-1">
              Why us
            </div>
            {[
              { label: 'Pricing', href: '/pricing/' },
              { label: 'Warranty', href: '/warranty/' },
              { label: 'How it works', href: '/how-it-works/' },
              { label: 'Coverage checker', href: '/check-coverage/' },
              { label: 'FAQ', href: '/faq/' },
              { label: 'Blog', href: '/blog/' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href as `/${string}`}
                onClick={close}
                className="flex items-center justify-between py-2.5 text-[0.9375rem]
                           text-muted no-underline hover:text-accent-bright"
              >
                {item.label}
                <ChevronRight className="size-4 text-subtle/60" strokeWidth={1.75} />
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-2.5 px-6 py-5 border-t border-hairline bg-soft shrink-0">
          <Link
            href={"/book/" as `/${string}`}
            onClick={close}
            className="btn btn-primary justify-center"
          >
            Get a quote
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
          <a
            href="tel:0451159954"
            onClick={close}
            className="btn btn-secondary justify-center"
          >
            <Phone className="size-4" strokeWidth={2} />
            0451 159 954
          </a>
        </div>
      </aside>
    </>
  )
}
