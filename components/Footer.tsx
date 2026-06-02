import Image from 'next/image'
import Link from 'next/link'

const REPAIRS = [
  { label: 'Brake repair', href: '/brake-repairs/' },
  { label: 'Alternator & starter', href: '/starter-alternator/' },
  { label: 'Radiator & water pump', href: '/radiator-cooling-system/' },
  { label: 'Steering & suspension', href: '/steering-suspension/' },
]

const SERVICING = [
  { label: 'Logbook & general', href: '/logbook-servicing/' },
  { label: 'Pre-purchase inspection', href: '/pre-purchase-inspection/' },
  { label: 'Diagnostics', href: '/car-diagnostics/' },
  { label: 'Battery replacement', href: '/battery-replacement/' },
]

const WHY_US = [
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Warranty', href: '/warranty/' },
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'Coverage checker', href: '/check-coverage/' },
  { label: 'FAQ', href: '/faq/' },
]

const BY_VEHICLE = [
  { label: 'Toyota mechanic', href: '/toyota-mechanic/' },
  { label: 'Hilux service', href: '/hilux-service/' },
  { label: 'Mazda service', href: '/mazda-service/' },
  { label: 'Ford Ranger', href: '/ford-ranger/' },
]

const COMPANY = [
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
]

const LOCATIONS = [
  { label: 'Brisbane', href: '/brisbane/' },
  { label: 'Logan', href: '/logan/' },
  { label: 'Ipswich', href: '/ipswich/' },
  { label: 'Gold Coast', href: '/gold-coast/' },
  { label: 'All areas', href: '/areas/' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-stone-400 pt-14 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(6,1fr)] gap-8 sm:gap-10 mt-4">
          <div className="lg:col-span-1 md:col-span-3 sm:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-bold text-[1.0625rem] text-white no-underline tracking-tight hover:text-white"
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
            <p className="mt-4 max-w-[34ch] text-[0.9375rem] leading-relaxed">
              Professional mobile mechanics serving South East Queensland within an hour of
              Springwood.
            </p>
          </div>

          <FooterColumn title="Repairs" items={REPAIRS} />
          <FooterColumn title="Servicing" items={SERVICING} />
          <FooterColumn title="Why us" items={WHY_US} />
          <FooterColumn title="By vehicle" items={BY_VEHICLE} />
          <FooterColumn title="Locations" items={LOCATIONS} />
          <FooterColumn title="Company" items={COMPANY} />
        </div>

        <div className="mt-12 pt-6 border-t border-stone-800 flex justify-between flex-wrap gap-3 text-[0.8125rem]">
          <span>© {new Date().getFullYear()} My Mechanic QLD</span>
          <span>
            <Link href={"/privacy-policy/" as `/${string}`} className="text-stone-400 hover:text-white">
              Privacy
            </Link>
            {' · '}
            <Link href={"/terms-conditions/" as `/${string}`} className="text-stone-400 hover:text-white">
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="text-white text-xs uppercase tracking-[0.1em] font-semibold mb-4">
        {title}
      </h4>
      <ul className="flex flex-col gap-2 text-[0.9375rem]">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href as `/${string}`}
              className="text-stone-300 hover:text-white no-underline"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
