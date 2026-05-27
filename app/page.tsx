import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  Check,
  Star,
  Award,
  MapPin,
  ShieldCheck,
  Truck,
  ChevronRight,
  Clock,
  DollarSign,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import QuoteForm from '@/components/QuoteForm'
import Reveal from '@/components/Reveal'
import ReviewCarousel from '@/components/ReviewCarousel'
import TrustMarquee from '@/components/TrustMarquee'

/* ────────────────────────────────────────────────────────────────────── */
/*  Data                                                                 */
/* ────────────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    slug: 'brake-repairs',
    title: 'Brake repairs',
    desc: 'Pads, rotors, calipers and fluid. We replace what needs replacing and leave what does not.',
    image: '/images/service-brakes.webp',
    alt: 'Mechanic fitting a new brake pad onto a disc rotor',
  },
  {
    slug: 'starter-alternator',
    title: 'Alternator and starter motor',
    desc: 'Slow crank, no start, or a flat battery that keeps coming back. We test, diagnose and replace on-site.',
    image: '/images/service-alternator.webp',
    alt: 'Mechanic working under the bonnet on an alternator with the branded van in the background',
  },
  {
    slug: 'radiator-cooling-system',
    title: 'Radiator and cooling system',
    desc: 'Overheating in traffic or losing coolant? Pressure test, diagnose and fix at your location.',
    image: '/images/service-radiator.webp',
    alt: 'Mechanic performing a cooling system pressure test with gauge',
  },
  {
    slug: 'logbook-servicing',
    title: 'Logbook servicing',
    desc: 'Manufacturer-spec service using quality parts. Warranty-safe under Australian Consumer Law.',
    image: '/images/service-logbook.webp',
    alt: 'Oil being poured during a logbook service with Penrite and Ryco products visible',
  },
] as const

const REVIEWS = [
  {
    quote:
      'Over the last two weeks I had My Mechanic QLD replace the rear brake pads and rotors and the front control arms on my 2011 Hyundai iX35. Shanty and Norman did an exceptional job. Same-day callout, spot-on pricing and timeframes. I cannot praise Shanty enough.',
    name: 'Greg Gillham',
    place: 'Brisbane',
    when: '4 months ago',
    stars: 5,
  },
  {
    quote:
      "My car wasn't working on Christmas Eve and everywhere was closed. They came out within 2 hours and diagnosed and fixed the issue within 10 minutes. Definitely paying for convenience, but also great service.",
    name: 'Holly Wilkinson',
    place: 'Brisbane',
    when: '4 months ago',
    stars: 5,
  },
  {
    quote:
      'Car brakes decided to die, one call and they were there within 2 hours all fixed and on our way. Very reasonable pricing for the service they provide. Will definitely use again.',
    name: 'Jake',
    place: 'Brisbane',
    when: '3 months ago',
    stars: 5,
  },
  {
    quote:
      'Thank you for a fast and reliable service. Really appreciate your help replacing my new car battery.',
    name: 'Miriama Tiatia',
    place: 'Brisbane',
    when: '3 months ago',
    stars: 5,
  },
  {
    quote:
      'Shanty was so kind and honest when he came to look at my car. Appreciate the help from the phone calls with the lovely lady in admin organising everything, to Shanty and the other worker being thorough but quick when they arrived.',
    name: 'Soph Denholm',
    place: 'Brisbane',
    when: '2 months ago',
    stars: 5,
  },
  {
    quote:
      'Responded to my inquiry within 15 minutes. They had my car back in operation 2 hours later. They were friendly and quick and I will definitely use them again.',
    name: 'Douglas Woolard',
    place: 'Brisbane',
    when: '2 months ago',
    stars: 5,
  },
] as const

const WHY_US = [
  {
    Icon: Award,
    title: '15+ years in the trade',
    body: 'Dealership-trained mechanics who have seen every common make and model on Australian roads.',
  },
  {
    Icon: DollarSign,
    title: 'Fixed-price quotes',
    body: 'You see the full cost before any work begins. No surprises on the bill.',
  },
  {
    Icon: ShieldCheck,
    title: 'Warranty-safe servicing',
    body: 'Logbook services that protect your new-car warranty under Australian Consumer Law.',
  },
  {
    Icon: Truck,
    title: 'We come to you',
    body: 'Home, office or kerbside. The van is the workshop, fully equipped with diagnostic tools and proper parts.',
  },
] as const

const STEPS = [
  {
    n: 1,
    title: 'Tell us what is happening',
    body: 'Book online or call us. Describe the issue and we will send you a fixed-price quote.',
  },
  {
    n: 2,
    title: 'We come to you',
    body: 'Pick a time and place. We arrive with the right tools, parts and diagnostic equipment.',
  },
  {
    n: 3,
    title: 'Sorted and signed off',
    body: 'We walk you through the work, hand over an itemised invoice and you pay by tap, transfer or invoice.',
  },
] as const

const FAQS = [
  {
    q: 'What areas do you cover?',
    a: 'We cover Brisbane, Logan, Ipswich and the northern Gold Coast. We are based in Springwood on the Southside and travel within roughly an hour of there. If you are unsure, call us and we will tell you straight away.',
  },
  {
    q: 'Are your prices really fixed?',
    a: 'Yes. We quote the job before any work starts. If we find something else, we stop and call you with a separate quote. Nothing goes on the bill that you did not agree to.',
  },
  {
    q: 'Will a mobile service void my warranty?',
    a: 'No. Under Australian Consumer Law, you can have your car serviced by any qualified mechanic as long as the service follows the manufacturer specifications and uses appropriate parts.',
  },
  {
    q: 'How fast can you come out?',
    a: 'Same-day service is often available for breakdowns and quick repairs. Bigger jobs like logbook services are usually booked a day or two ahead. Call us and we will give you the soonest realistic time.',
  },
  {
    q: 'What vehicles do you work on?',
    a: 'Cars, SUVs and light utes from the common Australian brands. Toyota, Mazda, Hyundai, Ford, Holden, Mitsubishi, Nissan, Subaru, Kia, Volkswagen and more. If you are not sure, call us.',
  },
] as const

/* ────────────────────────────────────────────────────────────────────── */
/*  Page                                                                 */
/* ────────────────────────────────────────────────────────────────────── */

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string }>
}) {
  const { submitted } = await searchParams

  return (
    <>
      {/* ══════════ 1. Hero ══════════ */}
      <section className="relative isolate overflow-hidden bg-ink">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-bg.webp"
            alt="My Mechanic QLD mechanic standing beside the branded service van in a Queensland driveway"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-transparent" />
        </div>

        <div className="container py-20 md:py-28 lg:py-36">
          <Reveal variant="up" duration={0.8}>
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tighter">
                Mobile mechanic Brisbane.<br />
                <span className="text-accent-bright">We come to you.</span>
              </h1>
              <p className="text-lg text-white/80 mt-5 max-w-[48ch] leading-relaxed">
                Qualified mechanics with 15+ years of dealership experience, now mobile across Brisbane and surrounding areas. Fixed-price quotes before we start.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm text-white/70">
                {[
                  '15+ years experience',
                  'Fixed-price quotes',
                  'Warranty-safe servicing',
                  'Same-day available',
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <Check className="size-4 text-accent-bright shrink-0" strokeWidth={2.5} />
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/book/" className="btn btn-primary btn-shimmer">
                  Get a quote
                  <ArrowRight className="size-4" strokeWidth={2} />
                </Link>
                <a
                  href="tel:0451159954"
                  className="btn bg-transparent text-white border-white/30 hover:bg-white/10"
                >
                  <Phone className="size-4" strokeWidth={2} />
                  0451 159 954
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ 2. Trust strip (auto-scrolling marquee) ══════════ */}
      <TrustMarquee />

      {/* ══════════ 3. Reviews carousel ══════════ */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-b border-hairline">
        <div className="container">
          <Reveal variant="up">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <span className="eyebrow">Customer reviews</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
                  Hear it from our customers.
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <div className="text-gold inline-flex gap-px">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" strokeWidth={1.5} />
                  ))}
                </div>
                <span className="font-medium text-ink">Highly rated</span>
                <span>on Google</span>
              </div>
            </div>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <ReviewCarousel reviews={REVIEWS} />
          </Reveal>
        </div>
      </section>

      {/* ══════════ 4. Services (4 cards with images) ══════════ */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container">
          <Reveal variant="up">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="eyebrow">Our services</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3">
                What we do, every day.
              </h2>
              <p className="lead mx-auto mt-4">
                Four core services that account for most of our work. Each one done on-site,
                with proper parts, by qualified mechanics.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} variant="up" delay={i * 0.08} duration={0.6}>
                <Link
                  href={`/${s.slug}/` as `/${string}`}
                  className="group bg-surface border border-hairline rounded-2xl overflow-hidden
                             flex flex-col no-underline text-ink card-hover hover:border-accent"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col gap-2 flex-1">
                    <h3 className="text-lg font-semibold leading-snug">{s.title}</h3>
                    <p className="text-[0.875rem] text-muted leading-relaxed flex-1">{s.desc}</p>
                    <span className="text-sm font-semibold text-accent-bright inline-flex items-center gap-1 mt-2">
                      Learn more
                      <ArrowRight className="size-3.5 card-arrow" strokeWidth={2} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delay={0.3}>
            <div className="text-center mt-10">
              <Link
                href="/services/"
                className="inline-flex items-center gap-1.5 text-accent-bright font-semibold no-underline hover:text-accent-hover"
              >
                View all 9 services
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ 5. Emergency breakdown ══════════ */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-y border-hairline overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal variant="scale" duration={0.9} className="min-w-0">
            <div className="relative aspect-video lg:aspect-[3/2] rounded-xl overflow-hidden border border-hairline">
              <Image
                src="/images/section-emergency.webp"
                alt="My Mechanic QLD van arriving at a roadside breakdown at golden hour"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal variant="up" delay={0.1} duration={0.8} className="min-w-0">
            <div>
              <span className="eyebrow">Emergency call-outs</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-4">
                Broken down? Call us first.
              </h2>
              <p className="text-[1.0625rem] text-muted leading-relaxed mb-4">
                Car will not start, stalled on the road or something just gave out? We respond
                across Brisbane, Logan, Ipswich and the Gold Coast. Same-day service is available
                and we arrive with the diagnostic tools and parts to get you moving again.
              </p>
              <p className="text-[1.0625rem] text-muted leading-relaxed mb-6">
                We diagnose the problem on-site, give you a fixed-price quote and get to work.
                No tow truck needed for most jobs.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:0451159954"
                  className="btn btn-primary"
                >
                  <Phone className="size-4" strokeWidth={2} />
                  Call now
                </a>
                <Link href="/emergency-call-outs/" className="btn btn-secondary">
                  Learn more
                  <ArrowRight className="size-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ 6. Pre-purchase inspections ══════════ */}
      <section className="py-14 md:py-20 lg:py-24 overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal variant="up" duration={0.8} className="min-w-0">
            <div className="order-2 lg:order-1">
              <span className="eyebrow">Pre-purchase inspections</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-4">
                Buying a used car? Get it checked first.
              </h2>
              <p className="text-[1.0625rem] text-muted leading-relaxed mb-4">
                We inspect the car at the seller's location before you hand over any money.
                You get a detailed written report covering the engine, brakes, suspension,
                electrics and body condition.
              </p>
              <p className="text-[1.0625rem] text-muted leading-relaxed mb-6">
                If something is wrong, we tell you what it will cost to fix. Honest advice
                so you can make a smart decision.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/book/" className="btn btn-primary">
                  Book an inspection
                  <ArrowRight className="size-4" strokeWidth={2} />
                </Link>
                <Link href="/pre-purchase-inspection/" className="btn btn-secondary">
                  Learn more
                  <ArrowRight className="size-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal variant="scale" delay={0.1} duration={0.9} className="order-1 lg:order-2 min-w-0">
            <div className="relative aspect-video lg:aspect-[3/2] rounded-xl overflow-hidden border border-hairline">
              <Image
                src="/images/section-inspection.webp"
                alt="Mechanic inspecting a used car with a torch and clipboard while the buyer watches"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ 7. Why choose us ══════════ */}
      <section className="py-14 md:py-20 lg:py-24 bg-surface border-y border-hairline">
        <div className="container">
          <Reveal variant="up">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="eyebrow">Why choose us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3">
                What sets us apart.
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map(({ Icon, title, body }, i) => (
              <Reveal key={title} variant="up" delay={i * 0.08} duration={0.6}>
                <div className="bg-bg border border-hairline rounded-2xl p-6 md:p-7
                                card-hover hover:border-accent text-center">
                  <div
                    className="size-12 rounded-xl bg-accent-tint text-accent grid place-items-center mx-auto mb-5 card-icon icon-float"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <Icon className="size-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold text-ink mb-2 leading-snug">{title}</h3>
                  <p className="text-[0.875rem] text-muted leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 8. How it works ══════════ */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="container">
          <Reveal variant="up">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="eyebrow">How it works</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3">
                Three steps. That is it.
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line between steps (desktop) */}
            <div
              className="hidden md:block absolute top-7 left-[16.67%] right-[16.67%] border-t-2 border-dashed border-accent/15"
              aria-hidden="true"
            />

            {STEPS.map((step, i) => (
              <Reveal key={step.n} variant="up" delay={i * 0.12} duration={0.6}>
                <div className="text-center">
                  <div className="size-14 rounded-full bg-accent text-white grid place-items-center
                                  font-bold text-xl mx-auto mb-5 step-pulse relative z-10">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-[0.9375rem] text-muted leading-relaxed max-w-[36ch] mx-auto">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 9. FAQ ══════════ */}
      <section className="py-14 md:py-20 lg:py-24 bg-soft border-y border-hairline">
        <div className="container max-w-3xl">
          <Reveal variant="up">
            <div className="text-center mb-10">
              <span className="eyebrow">Common questions</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
                Questions we get asked a lot.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <Reveal key={item.q} variant="up" delay={i * 0.05} duration={0.5}>
                <details className="group bg-surface border border-hairline rounded-xl p-5 md:p-6
                                    faq-hover hover:border-accent">
                  <summary className="cursor-pointer font-semibold text-ink list-none flex justify-between
                                      items-start gap-4 text-[1.0625rem]">
                    <span className="flex-1">{item.q}</span>
                    <ChevronRight
                      className="size-5 text-subtle shrink-0 mt-0.5 transition-transform group-open:rotate-90"
                      strokeWidth={2}
                    />
                  </summary>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delay={0.3}>
            <div className="text-center mt-8">
              <Link
                href="/faq/"
                className="inline-flex items-center gap-1 text-accent-bright font-semibold no-underline hover:text-accent-hover"
              >
                See the full FAQ
                <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ 10. Quote form + CTA ══════════ */}
      <section id="quote" className="py-14 md:py-20 lg:py-24 bg-bg">
        <div className="container grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
          <Reveal variant="up" className="lg:sticky lg:top-28">
            <span className="eyebrow">Get a quote</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3 max-w-[18ch]">
              Ready to book?
            </h2>
            <p className="lead mt-5">
              Send us your details and we will come back with a fixed-price quote.
              Same-day service is available during business hours.
            </p>

            <div className="space-y-4 mt-8">
              <ContactRow Icon={Phone} label="Phone" value="0451 159 954" href="tel:0451159954" />
              <ContactRow
                Icon={Clock}
                label="Hours"
                value="Mon to Fri 7am to 6pm, Sat 8am to 5pm"
              />
              <ContactRow
                Icon={MapPin}
                label="Coverage"
                value="Brisbane, Logan, Ipswich, Gold Coast"
              />
            </div>
          </Reveal>

          <Reveal variant="up" delay={0.15} duration={0.7}>
            <div className="bg-surface border border-hairline rounded-2xl p-6 md:p-8 lg:p-10 form-glow">
              <QuoteForm submitted={!!submitted} redirectTo="/" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ Final CTA ══════════ */}
      <section className="py-14 md:py-20 bg-accent text-white text-center">
        <Reveal variant="fade" duration={0.8} className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[22ch] mx-auto mb-4">
            Book your mobile mechanic today.
          </h2>
          <p className="text-white/85 max-w-[46ch] mx-auto mb-8 text-[1.0625rem]">
            Same-day appointments often available. Fixed-price quotes before any work begins.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="#quote"
              className="btn bg-white text-accent hover:bg-accent-tint hover:text-accent btn-shimmer"
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
        </Reveal>
      </section>
    </>
  )
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Helpers                                                              */
/* ────────────────────────────────────────────────────────────────────── */

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
