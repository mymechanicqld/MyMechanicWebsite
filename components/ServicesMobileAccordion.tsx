'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight, Phone } from 'lucide-react'
import { SERVICE_GROUPS } from '@/lib/navigation'

/**
 * Services section for the mobile drawer.
 *
 * Shows a "Services" header that toggles between a collapsed summary view
 * and a fully expanded view with all services grouped by category. Each
 * service displays an icon, label, and short description. Priority services
 * get a gold indicator. Emergency call-outs link directly to the phone.
 *
 * Starts expanded so users immediately see the full service range.
 */
export default function ServicesMobileAccordion({
  onNavigate,
}: {
  onNavigate: () => void
}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div>
      {/* Section header / toggle */}
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="services-accordion-panel"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full py-3 text-[0.6875rem] font-semibold
                   uppercase tracking-[0.1em] text-accent-bright text-left"
      >
        Services
        <ChevronDown
          className={`size-4 text-accent-bright transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
          strokeWidth={2}
        />
      </button>

      {/* Expandable panel */}
      <div
        id="services-accordion-panel"
        role="region"
        aria-label="Services"
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-3">
            {SERVICE_GROUPS.map((group) => (
              <div key={group.title} className="mb-4 last:mb-0">
                {/* Group heading */}
                <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em]
                               text-subtle mb-2 mt-1 flex items-center gap-2">
                  <span>{group.title}</span>
                  <span className="flex-1 h-px bg-hairline" aria-hidden="true" />
                </div>

                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const content = (
                      <div className="flex gap-3 items-start p-2.5 rounded-xl
                                      hover:bg-soft active:bg-soft transition-colors">
                        <div className="size-9 rounded-lg bg-accent-tint text-accent
                                        grid place-items-center shrink-0 mt-0.5">
                          <item.Icon className="size-[18px]" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[0.9375rem] font-medium text-ink leading-snug">
                              {item.label}
                            </span>
                            {item.priority && (
                              <span className="size-1.5 rounded-full bg-gold shrink-0" title="Popular" />
                            )}
                            {item.callOnly && (
                              <Phone className="size-3 text-accent ml-auto shrink-0" strokeWidth={2} />
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
                          onClick={onNavigate}
                          className="no-underline"
                        >
                          {content}
                        </a>
                      )
                    }

                    return (
                      <Link
                        key={item.slug}
                        href={item.href as `/${string}`}
                        onClick={onNavigate}
                        className="no-underline"
                      >
                        {content}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}

            {/* View all services link */}
            <Link
              href="/services/"
              onClick={onNavigate}
              className="flex items-center justify-center gap-1.5 py-2.5 mt-1
                         text-[0.875rem] font-semibold text-accent-bright no-underline
                         hover:text-accent-hover border border-hairline rounded-lg
                         hover:bg-soft transition-colors"
            >
              View all services
              <ArrowRight className="size-3.5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
