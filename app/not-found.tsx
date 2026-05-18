import Link from 'next/link'
import { ArrowRight, Phone, Home, Search } from 'lucide-react'

export const metadata = {
  title: 'Page not found | My Mechanic QLD',
  description: 'The page you were looking for has moved or no longer exists.',
}

const POPULAR = [
  { label: 'Brake repair', href: '/brake-repairs/' },
  { label: 'Logbook servicing', href: '/logbook-servicing/' },
  { label: 'Alternator & starter motor', href: '/starter-alternator/' },
  { label: 'Radiator & water pump', href: '/radiator-cooling-system/' },
  { label: 'Pre-purchase inspection', href: '/pre-purchase-inspection/' },
  { label: 'All services', href: '/services/' },
  { label: 'Where we work', href: '/areas/' },
  { label: 'Contact us', href: '/contact/' },
]

export default function NotFound() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-bg to-surface">
      <div className="container max-w-3xl text-center">
        <div className="text-[0.75rem] font-semibold text-accent-bright uppercase tracking-[0.18em] mb-5">
          Error 404
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tighter">
          That page has moved.
        </h1>
        <p className="text-lg md:text-xl text-muted mt-6 max-w-prose mx-auto leading-relaxed">
          The page you were looking for is no longer at this address. Try one of the popular pages
          below, or call us on{' '}
          <a href="tel:0451159954" className="font-semibold underline">
            0451 159 954
          </a>
          .
        </p>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link href={"/" as `/${string}`} className="btn btn-primary">
            <Home className="size-4" strokeWidth={2} />
            Back to home
          </Link>
          <Link href={"/services/" as `/${string}`} className="btn btn-secondary">
            <Search className="size-4" strokeWidth={2} />
            Browse services
          </Link>
          <a href="tel:0451159954" className="btn btn-secondary">
            <Phone className="size-4" strokeWidth={2} />
            0451 159 954
          </a>
        </div>

        <div className="mt-16 text-left">
          <div className="text-xs font-semibold text-ink uppercase tracking-[0.06em] mb-4 text-center">
            Popular pages
          </div>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {POPULAR.map((p) => (
              <Link
                key={p.href}
                href={p.href as `/${string}`}
                className="flex items-center justify-between px-4 py-3.5 bg-surface border border-hairline
                           rounded-lg text-ink no-underline hover:border-accent hover:bg-accent-tint
                           transition-colors text-[0.9375rem] font-medium"
              >
                {p.label}
                <ArrowRight className="size-4 text-subtle" strokeWidth={2} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
