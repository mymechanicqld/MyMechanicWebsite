'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import {
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Phone,
  MapPin,
  Users,
  MessageCircle,
  DollarSign,
  ShieldCheck,
  Lightbulb,
  Map,
  HelpCircle,
  BookOpen,
} from 'lucide-react'
import ServicesMobileAccordion from './ServicesMobileAccordion'
import { PLAIN_NAV_ITEMS } from '@/lib/navigation'

const NAV_ICONS: Record<string, typeof MapPin> = {
  '/areas/': MapPin,
  '/about/': Users,
  '/contact/': MessageCircle,
}

const WHY_US_ITEMS = [
  { label: 'Pricing', href: '/pricing/', Icon: DollarSign },
  { label: 'Warranty', href: '/warranty/', Icon: ShieldCheck },
  { label: 'How it works', href: '/how-it-works/', Icon: Lightbulb },
  { label: 'Coverage checker', href: '/check-coverage/', Icon: Map },
  { label: 'FAQ', href: '/faq/', Icon: HelpCircle },
  { label: 'Blog', href: '/blog/', Icon: BookOpen },
]

/**
 * Mobile navigation drawer.
 *
 * Full-screen slide-in panel with:
 * - Services section (expanded by default, showing all services with icons and descriptions)
 * - Page links (Locations, About, Contact) with icons
 * - "Why us" section with icon-labeled links
 * - Sticky CTA footer (Get a quote + phone)
 *
 * The backdrop and panel are rendered via `createPortal` to `document.body`
 * so they escape the header's `backdrop-blur` containing block (which would
 * otherwise constrain `position: fixed` children to the header's bounds).
 */
export default function MobileDrawer() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Wait for client mount so `document.body` is available for the portal
  useEffect(() => setMounted(true), [])

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

      {/* Portal to body — escapes header's backdrop-blur containing block */}
      {mounted && createPortal(
        <>
          {/* Backdrop */}
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
            className={`fixed top-0 right-0 bottom-0 z-[100] w-[min(380px,90vw)] bg-surface
                        flex flex-col shadow-2xl
                        transition-transform duration-300 ease-out
                        ${open ? 'translate-x-0' : 'translate-x-full'}`}
          >
            {/* ── Header ── */}
            <div className="flex justify-between items-center px-5 py-3.5 border-b border-hairline shrink-0">
              <Link
                href="/"
                onClick={close}
                className="inline-flex items-center gap-2.5 font-bold text-[1.0625rem] text-ink
                           no-underline tracking-tight hover:text-ink"
                aria-label="My Mechanic QLD home"
              >
                <span className="size-8 rounded-md bg-accent grid place-items-center shrink-0">
                  <Image
                    src="/images/logo-white.webp"
                    alt=""
                    width={24}
                    height={24}
                    className="size-[22px]"
                  />
                </span>
                My Mechanic QLD
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={close}
                className="inline-flex items-center justify-center size-9 rounded-lg
                           bg-transparent border border-hairline text-ink hover:border-ink"
              >
                <X className="size-[18px]" strokeWidth={1.75} />
              </button>
            </div>

            {/* ── Scrollable content ── */}
            <nav
              className="flex flex-col px-5 py-4 flex-1 min-h-0 overflow-y-auto overscroll-contain
                         gap-1"
              aria-label="Mobile primary"
            >
              {/* Services (expanded by default with full service cards) */}
              <ServicesMobileAccordion onNavigate={close} />

              {/* Divider */}
              <div className="h-px bg-hairline my-2" aria-hidden="true" />

              {/* Page links with icons */}
              <div>
                <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em]
                               text-accent-bright py-2">
                  Explore
                </div>
                {PLAIN_NAV_ITEMS.map((item) => {
                  const Icon = NAV_ICONS[item.href] || ChevronRight
                  return (
                    <Link
                      key={item.href}
                      href={item.href as `/${string}`}
                      onClick={close}
                      className="flex items-center gap-3 py-2.5 px-2.5 rounded-xl text-[0.9375rem]
                                 font-medium text-ink no-underline hover:bg-soft active:bg-soft
                                 transition-colors"
                    >
                      <div className="size-8 rounded-lg bg-surface border border-hairline
                                      grid place-items-center shrink-0">
                        <Icon className="size-4 text-muted" strokeWidth={1.75} />
                      </div>
                      {item.label}
                      <ChevronRight className="size-4 text-subtle/50 ml-auto" strokeWidth={1.75} />
                    </Link>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="h-px bg-hairline my-2" aria-hidden="true" />

              {/* Why us */}
              <div>
                <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em]
                               text-accent-bright py-2">
                  Why us
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {WHY_US_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as `/${string}`}
                      onClick={close}
                      className="flex items-center gap-2 py-2 px-2.5 rounded-lg text-[0.8125rem]
                                 text-muted no-underline hover:bg-soft active:bg-soft
                                 hover:text-ink transition-colors"
                    >
                      <item.Icon className="size-3.5 text-subtle shrink-0" strokeWidth={1.75} />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* ── Sticky CTA footer ── */}
            <div className="flex flex-col gap-2 px-5 py-4 border-t border-hairline bg-soft shrink-0">
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
        </>,
        document.body
      )}
    </>
  )
}
