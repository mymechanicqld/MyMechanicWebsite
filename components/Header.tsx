import Image from 'next/image'
import Link from 'next/link'
import { Clock, Phone, ArrowRight } from 'lucide-react'
import MobileDrawer from './MobileDrawer'
import ServicesDropdown from './ServicesDropdown'
import { PLAIN_NAV_ITEMS } from '@/lib/navigation'

export default function Header() {
  return (
    <>
      {/* Utility bar */}
      <div className="bg-ink text-stone-300 text-[0.8125rem] py-2">
        <div className="container flex justify-between gap-4 flex-wrap items-center">
          <div className="flex gap-6 flex-wrap items-center">
            <span className="inline-flex items-center gap-2">
              <Clock className="size-[14px]" strokeWidth={1.75} />
              Mon–Fri 7am–6pm · Sat 8am–5pm
            </span>
          </div>
          <a
            href="tel:0451159954"
            className="text-white font-medium inline-flex items-center gap-2 hover:text-white"
          >
            <Phone className="size-[14px]" strokeWidth={1.75} />
            0451 159 954
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-bg/95 backdrop-blur-md sticky top-0 z-50 border-b border-hairline">
        <div className="container flex items-center justify-between py-4 gap-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-bold text-[1.0625rem] text-ink no-underline tracking-tight hover:text-ink"
            aria-label="My Mechanic QLD home"
          >
            <span className="size-9 rounded-md bg-accent grid place-items-center shadow-sm shrink-0">
              <Image
                src="/images/logo-white.webp"
                alt=""
                width={28}
                height={28}
                className="size-[26px]"
                priority
              />
            </span>
            My Mechanic QLD
          </Link>

          <nav className="hidden lg:flex gap-7 items-center" aria-label="Primary">
            <ServicesDropdown />
            {PLAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href as `/${string}`}
                className="text-[0.9375rem] font-medium text-ink no-underline hover:text-accent-bright"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:inline-flex items-center gap-2">
            <Link
              href={"/book/" as `/${string}`}
              className="btn btn-primary"
            >
              Get a quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </div>

          <MobileDrawer />
        </div>
      </header>
    </>
  )
}
