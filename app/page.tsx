import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  Check,
  Star,
  Award,
  Users,
  MapPin,
  DollarSign,
  ShieldCheck,
  BadgeCheck,
  Disc3,
  BatteryCharging,
  ThermometerSun,
  Gauge,
  ClipboardCheck,
  MoveVertical,
  Battery,
  ScanLine,
  TriangleAlert,
  Wrench,
  Truck,
  ChevronRight,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'
import { getPriorityServices } from '@/lib/services'
import QuoteForm from '@/components/QuoteForm'

const ALL_SERVICES = [
  { slug: 'brake-repairs', label: 'Brake repair', priceFrom: null, desc: 'Pads, rotors, calipers and brake fluid. On-site, in your driveway.', Icon: Disc3, priority: true },
  { slug: 'starter-alternator', label: 'Alternator & starter motor', priceFrom: null, priceLabel: 'Diagnostic', desc: "Won't start? Slow crank? We diagnose all three causes on-site.", Icon: BatteryCharging, priority: true },
  { slug: 'radiator-cooling-system', label: 'Radiator & water pump', priceFrom: null, priceLabel: 'Pressure test', desc: 'Overheating in traffic? Pressure-test plus fix in your driveway.', Icon: ThermometerSun, priority: true },
  { slug: 'logbook-servicing', label: 'Logbook & general servicing', priceFrom: null, desc: 'Manufacturer-spec, warranty-safe under Australian Consumer Law.', Icon: Gauge, priority: true },
  { slug: 'pre-purchase-inspection', label: 'Pre-purchase inspection', priceFrom: null, desc: 'Detailed inspection with a written report before you buy.', Icon: ClipboardCheck, priority: false },
  { slug: 'battery-replacement', label: 'Battery replacement', priceFrom: null, desc: 'Heavy-duty replacement, fitted in your driveway, old one recycled.', Icon: Battery, priority: false },
  { slug: 'car-diagnostics', label: 'Warning-light diagnostics', priceFrom: null, desc: 'OBD scan plus physical fault-finding, on-site.', Icon: ScanLine, priority: false },
  { slug: 'steering-suspension', label: 'Steering & suspension', priceFrom: null, desc: 'Clunks, vibrations, uneven tyre wear, ball joints, shocks, bushes.', Icon: MoveVertical, priority: false },
  { slug: 'emergency-call-outs', label: 'Emergency call-outs', priceFrom: null, priceLabel: 'Call now', desc: "Broken down? Won't start? Call us first for the fastest response across our coverage area.", Icon: TriangleAlert, priority: false, callOnly: true },
]

const VALUE_PROPS = [
  {
    Icon: Wrench,
    title: 'Mobile mechanic services',
    body: 'From routine logbook servicing to brakes, alternators, radiators and breakdowns. One trusted team for the work we do every day.',
  },
  {
    Icon: Truck,
    title: 'On-site mobile services',
    body: 'We come to your home, office or kerbside. The van is the workshop, fitted with the same diagnostic tools and proper parts a dealership uses.',
  },
  {
    Icon: BadgeCheck,
    title: 'Quality parts and brands',
    body: 'OEM or quality aftermarket parts and fluids that meet or exceed manufacturer specifications. Sized for your vehicle, not whatever the wholesaler had on special.',
  },
  {
    Icon: Award,
    title: 'Expert mechanics',
    body: 'Fully qualified, with 15+ years of dealership-floor experience. Hands-on, accountable, and involved in every job we do.',
  },
] as const

const PROCESS_STEPS = [
  {
    n: 1,
    title: "Tell us what's happening",
    body: "Book online in two minutes, or call us. We send a fixed-price quote before we start anything, even diagnostic work.",
  },
  {
    n: 2,
    title: 'We come to you',
    body: 'Pick a time and place. Home driveway, office car park, kerbside. The van is the workshop.',
  },
  {
    n: 3,
    title: 'Sorted, then signed off',
    body: 'We walk you through the job, hand over an itemised invoice, and you pay by tap, transfer or invoice.',
  },
] as const

const REGIONS = [
  { name: 'Brisbane', sub: 'Across the Northside, Inner West and Bayside', href: '/areas/#brisbane' },
  { name: 'Logan', sub: 'Home base · Same-day service available', href: '/areas/#logan' },
  { name: 'Ipswich', sub: 'Springfield, Goodna, Brassall & more', href: '/areas/#ipswich' },
  { name: 'Gold Coast', sub: 'Coomera, Helensvale, Southport', href: '/areas/#gold-coast' },
] as const

const REVIEWS = [
  {
    quote:
      'Over the last two weeks I had My Mechanic QLD replace the rear brake pads and rotors and the front control arms on my 2011 Hyundai iX35. Shanty and Norman did an exceptional job. Same-day callout, spot-on pricing and timeframes. I cannot praise Shanty enough — highly recommend.',
    name: 'Greg Gillham',
    place: 'Brisbane · Brakes + control arms',
    when: '4 months ago',
    stars: 5,
  },
  {
    quote:
      "My car wasn't working on Christmas Eve and everywhere was closed. They came out within 2 hours and diagnosed and fixed the issue within 10 minutes. Other places suggested I have the car towed or were closing soon. Definitely paying for convenience, but also great service.",
    name: 'Holly Wilkinson',
    place: 'Brisbane · Emergency call-out',
    when: '4 months ago',
    stars: 5,
  },
  {
    quote:
      'Car brakes decided to die, one call and they were there within 2 hours all fixed and on our way. Very reasonable pricing for the service they provide. Will definitely use again.',
    name: 'Jake',
    place: 'Brisbane · Brake repair',
    when: '3 months ago',
    stars: 5,
  },
  {
    quote:
      'Thank you for a fast and reliable service. Really appreciate your help replacing my new car battery.',
    name: 'Miriama Tiatia',
    place: 'Brisbane · Battery replacement',
    when: '3 months ago',
    stars: 5,
  },
  {
    quote:
      'Shanty was so kind and honest when he came to look at my car. Appreciate the help from the phone calls with the lovely lady in admin organising everything, to Shanty and the other worker being thorough but quick when they arrived. Thank you!',
    name: 'Soph Denholm',
    place: 'Brisbane · General service',
    when: '2 months ago',
    stars: 5,
  },
  {
    quote:
      'Responded to my inquiry within 15 minutes. They had my car back in operation 2 hours later. They were friendly and quick and I will definitely use them again.',
    name: 'Douglas Woolard',
    place: 'Brisbane · Repair',
    when: '2 months ago',
    stars: 5,
  },
] as const

const FAQS = [
  {
    q: 'What is a mobile mechanic?',
    a: 'A mobile mechanic comes to you. We work out of a fully equipped service van that carries the same diagnostic gear and parts a workshop has, just rolled up in your driveway, office car park or kerb. The work is the same. The trip to the workshop disappears.',
  },
  {
    q: 'When should I service my car?',
    a: 'Most cars need a service every 10,000 to 15,000 km, or every six to twelve months, whichever comes first. Your logbook tells you the exact interval for your make. If you are unsure, call us with the make, model and year and we will tell you straight away.',
  },
  {
    q: 'Are your prices really fixed?',
    a: 'Yes. We quote you a fixed price before any spanners come out. If we find something else while we are in there, we stop and call you with a separate fixed quote before doing anything extra. Nothing ever appears on the bill that you did not agree to.',
  },
  {
    q: 'Will a mobile service void my new-car warranty?',
    a: "No. Under the Australian Consumer Law, you are free to have your car serviced by any qualified mechanic, including a mobile one, as long as the service follows the manufacturer's specifications and uses appropriate parts. The dealership cannot refuse warranty just because someone else did the work.",
  },
  {
    q: 'What vehicles do you service?',
    a: 'We service cars, SUVs and light utes from all the common Australian brands. Toyota, Mazda, Hyundai, Ford, Holden, Mitsubishi, Nissan, Subaru, Kia, Volkswagen and Skoda. Less common European luxury and EVs are case by case. Call us and we will tell you straight.',
  },
  {
    q: 'Do you cover my suburb?',
    a: 'We cover Brisbane, Logan, Ipswich and the Gold Coast, based in Springwood on the Southside. That includes Sunnybank, Carindale, Chermside, Wynnum, Cleveland, Springfield, Goodna, Coomera, Southport and many more. If you are unsure about your suburb, call us on 0451 159 954.',
  },
  {
    q: 'My car will not start. What do I do?',
    a: 'Three things to check first. Dashboard lights dim or off usually means the battery. A single click but no engine crank usually means the starter motor or a flat battery. The engine cranks but does not catch usually points to fuel or ignition. Call us and we will diagnose it on-site. Same-day service is available.',
  },
  {
    q: 'How much does a car service cost in Brisbane?',
    a: 'Routine servicing in Brisbane typically ranges from $188 to $449 as a general market guide, depending on make, model and whether it is a minor or major service, before parts and any extra repairs. We quote fixed-price upfront for your specific vehicle. Call us with the make, model and year and we will give you an exact number on the spot.',
  },
  {
    q: 'Do I need to stay with the car while you work?',
    a: 'Not at all. We just need a quick hand-off and a chat about what is happening. Then you go back to whatever you were doing. We text you when we are done, walk you through what we did, and you pay by tap, transfer or invoice.',
  },
  {
    q: 'How fast can you come out?',
    a: 'Same-day service is available, especially for breakdowns and quick repairs. Logbook services and bigger jobs are usually booked ahead. Call us with your situation and we will give you the soonest realistic time.',
  },
] as const

const LATEST_POST = {
  title: 'Does a mobile logbook service void your new-car warranty?',
  excerpt:
    "The short answer is no. Australian Consumer Law protects your right to have your car serviced by any qualified mechanic, as long as the service follows the manufacturer's specifications. Here is what that means in practice.",
  href: '/blog/does-a-mobile-logbook-service-void-your-new-car-warranty/' as const,
  readingTime: '6 min read',
  date: 'Updated 16 March 2026',
  image: '/images/logbook-servicing-hero.webp',
  alt: 'OEM filters and oil laid out for a logbook service',
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>
}) {
  const { submitted } = await searchParams
  const priority = await getPriorityServices()

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="py-14 md:py-20 lg:py-24 bg-gradient-to-b from-bg to-surface">
        <div className="container grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="eyebrow">Mobile mechanics · South East Queensland</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.02] tracking-tighter mt-4 text-balance">
              Workshop standards.<br />
              <span className="text-accent">Your driveway.</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted mt-6 max-w-[40ch] leading-[1.55]">
              Qualified mechanics with 15+ years of dealership experience, now mobile. We bring
              proper diagnostic equipment, OEM-grade parts and fixed-price quotes straight to your
              door.
            </p>
            <ul className="mt-7 grid gap-2.5 text-[0.9375rem] text-muted">
              {[
                'Fixed-price quote before we start the job',
                'OEM or quality aftermarket parts to manufacturer spec',
                'Workmanship warranty per our terms, plus your Australian Consumer Law rights',
                'Same-day service available',
              ].map((line) => (
                <li key={line} className="flex items-center gap-3">
                  <Check className="size-[18px] text-accent-bright shrink-0" strokeWidth={2.25} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 mt-8 items-center">
              <Link href="/book/" className="btn btn-primary">
                Get a quote
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
              <div className="phone-block">
                <a href="tel:0451159954" className="text-ink no-underline hover:text-ink">
                  <span className="block text-[0.75rem] text-subtle font-medium uppercase tracking-[0.05em]">
                    Call us today
                  </span>
                  <span className="block font-bold text-ink">0451 159 954</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative aspect-[5/6] min-h-[320px] md:min-h-[400px] rounded-xl overflow-hidden border border-hairline">
            <Image
              src="/images/hero-van.webp"
              alt="My Mechanic QLD mechanic handing keys back to a customer beside the branded service van in a driveway"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <div className="bg-surface border-y border-hairline py-6">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 items-center">
          {[
            { Icon: Award, label: '15+ years', sub: 'In the trade' },
            { Icon: Star, label: 'Highly rated by customers', sub: 'Google reviews' },
            { Icon: Truck, label: 'Same-day', sub: 'Service available' },
            { Icon: MapPin, label: 'Mobile to you', sub: 'Brisbane, Logan, Ipswich & Gold Coast' },
          ].map(({ Icon, label, sub }) => (
            <div key={label} className="flex gap-3.5 items-center">
              <div className="size-10 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <div className="text-[0.875rem] text-muted leading-tight">
                <strong className="block text-ink font-semibold text-[0.9375rem]">{label}</strong>
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Value props (4 cards) ---------- */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container">
          <div className="mb-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
            <div>
              <span className="eyebrow">Local reliability. Professional standards.</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 max-w-[22ch]">
                Professional mobile mechanics, built around the customer.
              </h2>
            </div>
            <p className="lead">
              We bring the technical expertise of a dealership and the personal care of a local
              business to your driveway. Same diagnostic gear. Same OEM parts. Half the hassle.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUE_PROPS.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-surface border border-hairline rounded-2xl p-6 md:p-7
                           hover:border-accent transition-colors"
              >
                <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center mb-5">
                  <Icon className="size-[22px]" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-ink mb-2 leading-snug">{title}</h3>
                <p className="text-[0.9375rem] text-muted leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- All services grid (9 services) ---------- */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-y border-hairline">
        <div className="container">
          <div className="mb-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
            <div>
              <span className="eyebrow">Our mobile services</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 max-w-[22ch]">
                Nine services we&apos;re trusted with, every day.
              </h2>
            </div>
            <p className="lead">
              The four marked &ldquo;most popular&rdquo; are our bread and butter, but every service
              below is done by the same qualified team to the same standard, on-site at your
              location.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALL_SERVICES.map((s) => {
              const isPhone = s.callOnly === true
              const cardClass =
                'group bg-surface border border-hairline rounded-2xl p-6 md:p-7 ' +
                'flex flex-col gap-4 no-underline transition-all ' +
                'hover:border-accent hover:-translate-y-0.5 ' +
                'hover:shadow-[0_1px_2px_rgba(12,10,9,.04),0_8px_24px_rgba(30,58,138,.06)]'
              const body = (
                <>
                  <div className="flex justify-between items-start gap-3">
                    <div className="size-11 rounded-xl bg-accent-tint text-accent grid place-items-center shrink-0">
                      <s.Icon className="size-[22px]" strokeWidth={1.75} />
                    </div>
                    {s.priority && (
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em]
                                       px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
                        Most popular
                      </span>
                    )}
                    {isPhone && (
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em]
                                       px-2 py-1 rounded-full bg-accent-tint text-accent border border-accent/30">
                        Call us
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink mb-1.5 leading-snug">{s.label}</h3>
                    <p className="text-[0.9375rem] text-muted leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <div className="text-[0.875rem] text-ink">
                      {s.priceFrom !== null ? (
                        <>
                          <span className="text-xs uppercase tracking-[0.05em] text-subtle font-medium mr-1.5">
                            {s.priceLabel ?? 'From'}
                          </span>
                          <span className="font-semibold">${s.priceFrom}</span>
                        </>
                      ) : (
                        <span className="text-xs uppercase tracking-[0.05em] text-subtle font-medium">
                          {s.priceLabel ?? 'Get a quote'}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-accent-bright inline-flex items-center gap-1">
                      {isPhone ? (
                        <>
                          <Phone className="size-3.5" strokeWidth={2} />
                          0451 159 954
                        </>
                      ) : (
                        <>
                          Read more
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                        </>
                      )}
                    </span>
                  </div>
                </>
              )
              return isPhone ? (
                <a key={s.slug} href="tel:0451159954" className={cardClass}>
                  {body}
                </a>
              ) : (
                <Link key={s.slug} href={`/${s.slug}/` as `/${string}`} className={cardClass}>
                  {body}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- When customers call us (symptom-led) ---------- */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container">
          <div className="mb-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
            <div>
              <span className="eyebrow">When customers call us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 max-w-[24ch]">
                Eight reasons people pick up the phone.
              </h2>
            </div>
            <p className="lead">
              Most calls come in around the same handful of symptoms. If any of these are happening
              with your car right now, we can usually help the same day across our coverage area.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                symptom: 'My car will not start',
                sub: 'Battery, alternator or starter motor',
                href: '/starter-alternator/',
                Icon: BatteryCharging,
              },
              {
                symptom: 'My brakes are squealing',
                sub: 'Pad and rotor replacement at your driveway',
                href: '/brake-repairs/',
                Icon: Disc3,
              },
              {
                symptom: 'My car is overheating',
                sub: 'Cooling system pressure test and fix',
                href: '/radiator-cooling-system/',
                Icon: ThermometerSun,
              },
              {
                symptom: 'Check engine light is on',
                sub: 'Full diagnostic with written quote',
                href: '/car-diagnostics/',
                Icon: ScanLine,
              },
              {
                symptom: 'My battery keeps going flat',
                sub: 'Test, diagnose, replace if needed',
                href: '/battery-replacement/',
                Icon: Battery,
              },
              {
                symptom: 'My car is due for a service',
                sub: 'Warranty-safe logbook servicing',
                href: '/logbook-servicing/',
                Icon: Gauge,
              },
              {
                symptom: "I'm buying a used car",
                sub: 'Detailed pre-purchase inspection',
                href: '/pre-purchase-inspection/',
                Icon: ClipboardCheck,
              },
              {
                symptom: 'Strange noise or vibration',
                sub: 'Diagnose and repair on-site',
                href: '/steering-suspension/',
                Icon: MoveVertical,
              },
            ].map(({ symptom, sub, href, Icon }) => (
              <Link
                key={href}
                href={href as `/${string}`}
                className="group bg-surface border border-hairline rounded-2xl p-5 md:p-6
                           flex flex-col gap-3 no-underline transition-all
                           hover:border-accent hover:-translate-y-0.5"
              >
                <div className="size-10 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base md:text-[1.0625rem] font-semibold text-ink leading-snug">
                    {symptom}
                  </h3>
                  <p className="text-[0.875rem] text-muted mt-1.5">{sub}</p>
                </div>
                <span className="text-[0.8125rem] font-semibold text-accent-bright inline-flex items-center gap-1 mt-auto pt-2">
                  See how we help
                  <ArrowRight
                    className="size-3 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Mid CTA band ---------- */}
      <section className="py-12 md:py-16 bg-ink text-white">
        <div className="container grid md:grid-cols-[1.4fr_auto] gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight max-w-[20ch]">
              Stop guessing. Start fixing.
            </h2>
            <p className="text-white/75 mt-4 max-w-[52ch] text-[1.0625rem] leading-relaxed">
              Putting off the brake noise, the warning light, the slow morning crank gets expensive
              fast. Get a fixed-price quote, usually the same business day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#quote" className="btn bg-white text-ink hover:bg-accent-tint hover:text-ink">
              Get a quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </a>
            <a
              href="tel:0451159954"
              className="btn bg-transparent text-white border-white/30 hover:bg-white/10"
            >
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container">
          <div className="mb-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-end">
            <div>
              <span className="eyebrow">How it works</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 max-w-[22ch]">
                Three steps, from quote to keys back in your hand.
              </h2>
            </div>
            <p className="lead">
              Booking should be the easy part. The harder bit is the actual mechanic work, and
              that&apos;s our job, not yours.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="flex gap-5 items-start">
                <div className="size-12 rounded-full bg-accent text-white grid place-items-center font-bold shrink-0 text-lg">
                  {step.n}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-[0.9375rem] text-muted leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why we work this way ---------- */}
      <section className="py-14 md:py-20 lg:py-24 bg-surface border-y border-hairline">
        <div className="container grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[2/3] min-h-[360px] lg:min-h-[520px] rounded-xl overflow-hidden border border-hairline">
            <Image
              src="/images/owner-on-job.webp"
              alt="My Mechanic QLD mechanic working on a customer's car in a Queensland driveway with the branded mobile workshop van parked alongside and a full tool set laid out on a drop sheet"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-[60ch]">
            <span className="eyebrow">Why we work this way</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-6 max-w-[18ch]">
              We built the business we&apos;d want to call.
            </h2>
            <div className="space-y-4 text-[1.0625rem] text-muted leading-[1.7]">
              <p>
                After fifteen years inside dealership workshops, we kept seeing the same scene play
                out. A customer drops the car at 8am, takes an Uber to work, refreshes their phone
                all day, and comes back at 5 to a bill that&apos;s somehow $400 over the quote.
              </p>
              <p>
                We started My Mechanic QLD to fix that. We come to the customer. We quote the job
                before we start it. We use the same diagnostic gear and OEM-spec parts a dealership
                does. And every repair is signed off with a workmanship warranty.
              </p>
              <p>
                <strong className="text-ink font-semibold">
                  If something on your car isn&apos;t right, call us directly.
                </strong>{' '}
                You&apos;ll get one of our mechanics on the line, not a call centre.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-hairline">
              <a
                href="tel:0451159954"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-tint text-accent
                           rounded-lg font-semibold text-sm no-underline hover:bg-accent hover:text-white"
              >
                <Phone className="size-4" strokeWidth={2} />
                0451 159 954
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container">
          <div className="mb-12">
            <span className="eyebrow">Customer reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 max-w-[22ch]">
              Real reviews. Real cars. Real driveways.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="bg-surface border border-hairline rounded-2xl p-7 flex flex-col gap-5"
              >
                <div className="text-gold inline-flex gap-px">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" strokeWidth={1.5} />
                  ))}
                  {Array.from({ length: 5 - r.stars }).map((_, i) => (
                    <Star key={`e${i}`} className="size-4 text-stone-300" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-ink flex-1">{r.quote}</p>
                <div className="flex justify-between pt-4 border-t border-hairline items-center">
                  <div className="text-[0.875rem] text-muted">
                    <strong className="text-ink font-semibold">{r.name}</strong> · {r.place}
                  </div>
                  <div className="text-xs text-subtle">{r.when}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <a
              href="https://www.google.com/maps/place/My+Mechanic+Qld/@-27.6993955,153.0561455,17z/data=!4m8!3m7!1s0x2ad9c25f5ced039d:0x125bb19c4e239265!8m2!3d-27.6993955!4d153.0561455!9m1!1b1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Read more reviews on Google
            </a>
            <a
              href="https://g.page/r/CSJT8_It4K0WEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Leave a review
            </a>
          </div>
          <div className="mt-10 flex gap-3 items-center text-[0.9375rem] text-muted">
            <div className="text-gold inline-flex gap-px">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" strokeWidth={1.5} />
              ))}
            </div>
            <span>
              <strong className="text-ink">Highly rated by customers</strong> · Google reviews
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Coverage ---------- */}
      <section className="py-14 md:py-20 lg:py-24 bg-surface border-t border-hairline">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="eyebrow">Where we work</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-4 max-w-[22ch]">
              Brisbane, Logan, Ipswich &amp; the Gold Coast.
            </h2>
            <p className="lead mt-4">
              We&apos;re based in Springwood on Brisbane&apos;s Southside and serve a wide stretch
              of South East Queensland, covering Brisbane, Logan, Ipswich and the Gold Coast.
            </p>
            <div className="grid gap-2 mt-6">
              {REGIONS.map((r) => (
                <Link
                  key={r.href}
                  href={r.href as `/${string}`}
                  className="flex justify-between items-center px-5 py-4 bg-soft border border-hairline
                             rounded-lg text-ink no-underline hover:border-accent hover:bg-accent-tint
                             transition-colors"
                >
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-[0.8125rem] text-subtle mt-0.5">{r.sub}</div>
                  </div>
                  <ArrowRight className="size-4 text-subtle" strokeWidth={2} />
                </Link>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] min-h-[260px] lg:min-h-[340px] rounded-xl overflow-hidden border border-hairline order-1 lg:order-2">
            <Image
              src="/images/coverage-onsite.webp"
              alt="My Mechanic QLD servicing a vehicle in a customer driveway"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------- From the blog ---------- */}
      <section className="py-14 md:py-20 lg:py-24 bg-bg">
        <div className="container">
          <div className="mb-10 flex justify-between items-end flex-wrap gap-4">
            <div>
              <span className="eyebrow">From the blog</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 max-w-[22ch]">
                Plain-English answers, written by a mechanic.
              </h2>
            </div>
            <Link
              href={"/blog/" as `/${string}`}
              className="inline-flex items-center gap-1 text-accent-bright font-semibold no-underline hover:text-accent-hover"
            >
              All posts <ArrowUpRight className="size-4" strokeWidth={2} />
            </Link>
          </div>

          <Link
            href={LATEST_POST.href}
            className="group grid md:grid-cols-[1fr_1fr] gap-8 lg:gap-12 bg-surface border border-hairline rounded-2xl overflow-hidden no-underline text-ink hover:border-accent transition-colors"
          >
            <div className="relative aspect-[4/3] md:aspect-auto min-h-[240px] md:min-h-[320px] overflow-hidden border-b md:border-b-0 md:border-r border-hairline">
              <Image
                src={LATEST_POST.image}
                alt={LATEST_POST.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-7 md:p-10 lg:p-12 flex flex-col gap-4 justify-center">
              <div className="text-xs uppercase tracking-[0.06em] text-subtle font-semibold flex gap-3 flex-wrap">
                <span>Services explained</span>
                <span aria-hidden>·</span>
                <span>{LATEST_POST.readingTime}</span>
                <span aria-hidden>·</span>
                <span>{LATEST_POST.date}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                {LATEST_POST.title}
              </h3>
              <p className="text-[1.0625rem] text-muted leading-relaxed">{LATEST_POST.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-accent-bright font-semibold mt-2">
                Read the article
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-y border-hairline">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="eyebrow">Common questions</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3">
              Your questions, answered.
            </h2>
            <p className="lead mx-auto mt-4">
              Booking a mobile mechanic for the first time? Start here. Anything we missed, call us
              on 0451 159 954.
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.q}
                className="group bg-surface border border-hairline rounded-xl p-5 md:p-6 transition-colors hover:border-border"
              >
                <summary className="cursor-pointer font-semibold text-ink list-none flex justify-between items-start gap-4 text-[1.0625rem]">
                  <span className="flex-1">{item.q}</span>
                  <ChevronRight
                    className="size-5 text-subtle shrink-0 mt-0.5 transition-transform group-open:rotate-90"
                    strokeWidth={2}
                  />
                </summary>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href={"/faq/" as `/${string}`}
              className="inline-flex items-center gap-1 text-accent-bright font-semibold no-underline hover:text-accent-hover"
            >
              See the full FAQ
              <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Quote form ---------- */}
      <section id="quote" className="py-14 md:py-20 lg:py-24 bg-bg">
        <div className="container grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">Get a quote</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 max-w-[18ch]">
              Tell us what&apos;s happening with your car.
            </h2>
            <p className="lead mt-5">
              Send us your details and we&apos;ll come back with a fixed-price quote. Same-day
              service is available during business hours.
            </p>

            <div className="space-y-4 mt-8">
              <ContactRow Icon={Phone} label="Phone" value="0451 159 954" href="tel:0451159954" />
              <ContactRow
                Icon={Mail}
                label="Email"
                value="contact@mymechanicqld.com.au"
                href="mailto:contact@mymechanicqld.com.au"
              />
              <ContactRow
                Icon={Clock}
                label="Hours"
                value="Mon–Fri 7am–6pm · Sat 8am–5pm"
              />
              <ContactRow
                Icon={MapPin}
                label="Coverage"
                value="Brisbane, Logan, Ipswich, Gold Coast"
              />
            </div>
          </div>

          <div className="bg-surface border border-hairline rounded-2xl p-6 md:p-8 lg:p-10">
            <QuoteForm submitted={!!submitted} redirectTo="/" />
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Book your mobile mechanic today.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Same-day appointments often available. Fixed-price quotes given before any work begins.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#quote"
              className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent"
            >
              Get a quote
              <ArrowRight className="size-4" strokeWidth={2} />
            </a>
            <a
              href="tel:0451159954"
              className="btn bg-transparent text-white border-white/40 hover:bg-white/10"
            >
              <Phone className="size-4" strokeWidth={2} />
              0451 159 954
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------- helpers ---------- */

function ContactRow({
  Icon,
  label,
  value,
  href,
}: {
  Icon: LucideIcon
  label: string
  value: string
  href?: string
}) {
  const Content = (
    <>
      <div className="size-10 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
        <Icon className="size-5" strokeWidth={1.75} />
      </div>
      <div className="leading-tight">
        <div className="text-xs uppercase tracking-[0.06em] text-subtle font-semibold mb-0.5">
          {label}
        </div>
        <div className="text-ink font-medium text-[0.9375rem]">{value}</div>
      </div>
    </>
  )
  if (href) {
    return (
      <a href={href} className="flex gap-3.5 items-center no-underline hover:text-ink">
        {Content}
      </a>
    )
  }
  return <div className="flex gap-3.5 items-center">{Content}</div>
}
