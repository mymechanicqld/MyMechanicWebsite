import suburbData from '@/content/suburbs.json'
import overrideData from '@/content/suburb-overrides.json'

export interface Suburb {
  slug: string
  name: string
  region: string
  regionName: string
  regionSlug: string
  postcode: number
  distanceFromBase: number
  responseTime: string
  nearby: string[]
  /** A recognisable local landmark, shopping centre or facility */
  landmark: string
  /** Unique 2-3 sentence description of the suburb's character */
  localContext: string
  /** Brief note on the suburb's housing stock */
  housingNote: string
  /** Hand-written content that replaces the shared template copy, if any */
  override?: SuburbOverride
}

/**
 * Optional hand-written copy for a single suburb page, kept in
 * content/suburb-overrides.json (suburbs.json is a tool export, so it is not
 * edited by hand). Every field is optional and falls back to the template.
 */
export interface SuburbOverride {
  metaTitle?: string
  metaDescription?: string
  ogTitle?: string
  eyebrow?: string
  /** Full H1 text. The suburb name inside it is highlighted. */
  h1?: string
  heroLead?: string
  servicesEyebrow?: string
  servicesHeading?: string
  servicesIntro?: string
  /** Per-service card text, keyed by service slug */
  serviceNotes?: Record<string, string>
  localHeading?: string
  localParagraphs?: string[]
  trustPoints?: { title: string; body: string }[]
  /** Replaces the generic nearby-suburbs grid with annotated links */
  coverage?: {
    eyebrow: string
    heading: string
    intro: string
    items: { slug: string; note: string }[]
    footer?: string
    footerLink?: { href: string; label: string }
  }
  faqHeading?: string
  faq?: { question: string; answer: string }[]
  ctaHeading?: string
  ctaBody?: string
  /** Date this hand-written copy last changed (YYYY-MM-DD). Used as the
   *  sitemap lastmod, so Google sees a real content date. */
  updated?: string
}

export interface SuburbWithMeta extends Suburb {
  /** Priority services available (always the same four, but typed for templates) */
  priorityServices: typeof PRIORITY_SERVICES
}

export const PRIORITY_SERVICES = [
  {
    slug: 'brake-repairs',
    label: 'Brake repair',
    shortDesc: 'Pads, rotors, calipers and brake fluid flush',
    symptom: 'Squealing or grinding when you brake',
  },
  {
    slug: 'starter-alternator',
    label: 'Alternator and starter motor',
    shortDesc: 'Charging faults, slow cranking, no-start diagnosis',
    symptom: "Car won't start or cranks slowly",
  },
  {
    slug: 'radiator-cooling-system',
    label: 'Radiator and water pump',
    shortDesc: 'Cooling system pressure test, leak repair, overheating fix',
    symptom: 'Temperature gauge climbing or coolant leaking',
  },
  {
    slug: 'logbook-servicing',
    label: 'Logbook and general servicing',
    shortDesc: 'Manufacturer-spec service, warranty-safe, logbook stamped',
    symptom: 'Car due for its scheduled service',
  },
] as const

export const ALL_SERVICES = [
  ...PRIORITY_SERVICES,
  {
    slug: 'pre-purchase-inspection',
    label: 'Pre-purchase inspection',
    shortDesc: 'Independent written report before you buy a used car',
    symptom: 'Buying a used car and want it checked first',
  },
  {
    slug: 'battery-replacement',
    label: 'Battery replacement',
    shortDesc: 'Delivered, fitted and old battery recycled on-site',
    symptom: 'Battery flat or not holding charge',
  },
  {
    slug: 'car-diagnostics',
    label: 'Warning-light diagnostics',
    shortDesc: 'OBD scan plus physical fault-finding',
    symptom: 'Dashboard warning light is on',
  },
  {
    slug: 'steering-suspension',
    label: 'Steering and suspension',
    shortDesc: 'Control arms, ball joints, shocks, bushes',
    symptom: 'Clunks, vibrations or uneven tyre wear',
  },
] as const

const overrideFile = overrideData as unknown as {
  suburbs: Record<string, SuburbOverride>
  /** Suburbs we have a page for that the selector-tool export does not include
   *  (e.g. Stretton, which has its own Google Business Profile). */
  addedSuburbs?: Omit<Suburb, 'override'>[]
}
const overrides = overrideFile.suburbs

const suburbs: Suburb[] = [
  ...(suburbData.suburbs as Suburb[]),
  ...(overrideFile.addedSuburbs ?? []),
].map((s) => (overrides[s.slug] ? { ...s, override: overrides[s.slug] } : s))

/**
 * Indexing policy (Nov 2026 audit). Template-only suburb pages share most of
 * their wording, which Google treats as doorway pages, so a suburb page is only
 * indexed once it has hand-written copy in content/suburb-overrides.json.
 * Everything else stays live for visitors (noindex, follow) but is left out of
 * the sitemap. Gold Coast beach suburbs are past our realistic range and are
 * never indexed, even with an override.
 */
const NEVER_INDEX = new Set(['surfers-paradise', 'broadbeach', 'main-beach'])

export function isIndexableSuburb(s: Suburb): boolean {
  return Boolean(s.override) && !NEVER_INDEX.has(s.slug)
}

const bySlug = new Map<string, Suburb>()
const byRegion = new Map<string, Suburb[]>()

for (const s of suburbs) {
  bySlug.set(s.slug, s)
  const list = byRegion.get(s.region) || []
  list.push(s)
  byRegion.set(s.region, list)
}

export function getSuburbSlugs(): string[] {
  return suburbs.map((s) => s.slug)
}

export function getSuburb(slug: string): Suburb | null {
  return bySlug.get(slug) ?? null
}

export function getAllSuburbs(): Suburb[] {
  return suburbs
}

export function getSuburbsByRegion(region: string): Suburb[] {
  return byRegion.get(region) ?? []
}

export function getNearbySuburbs(suburb: Suburb): Suburb[] {
  return suburb.nearby
    .map((slug) => bySlug.get(slug))
    .filter((s): s is Suburb => s !== undefined)
}

export interface Region {
  id: string
  name: string
  slug: string
  /** Short hint shown on the areas hub cards */
  hint: string
  /** Unique intro paragraph for the region hub page */
  intro: string
  /** Second paragraph: how we work in this region */
  detail: string
  /** Hand-written sections for the region hub (Nov 2026: hubs were thinner
   *  than the template pages they link to). Each section has a heading,
   *  paragraphs, and optional suburb links shown as chips. */
  sections?: { heading: string; paragraphs: string[]; suburbs?: string[] }[]
  /** Hub FAQ, rendered with FAQPage schema */
  faq?: { question: string; answer: string }[]
}

export const REGIONS: Region[] = [
  {
    id: 'brisbane',
    name: 'Brisbane',
    slug: 'brisbane',
    hint: 'Northside to Bayside, inner west to the Southside.',
    intro:
      'We cover Brisbane from the Bayside suburbs through the inner city to the leafy western suburbs, and right across the Southside. From character Queenslanders in Paddington to brick-and-tile family homes in Carindale, we bring the workshop to your driveway.',
    detail:
      'Working out of Springwood on the Southside, we reach most Brisbane suburbs comfortably. Inner-city and Southside jobs are often same-day, while northside and Bayside bookings are usually locked in within a day or two.',
    sections: [
      {
        heading: 'Brisbane southside, closest to our base',
        paragraphs: [
          'Most of our Brisbane work is on the southside, because it is closest to our Springwood base. Rochedale, Eight Mile Plains, Runcorn and Stretton are minutes away, and Mount Gravatt, Mansfield, Wishart, Sunnybank and MacGregor are a short run up the M1 or Logan Road. Same-day service is often available across this area.',
          'Our Brisbane South page groups these suburbs by how we reach them from Springwood, with local details for each area.',
        ],
        suburbs: ['rochedale', 'eight-mile-plains', 'runcorn', 'stretton', 'mount-gravatt', 'upper-mount-gravatt', 'mansfield', 'wishart', 'sunnybank', 'macgregor', 'salisbury', 'holland-park', 'tarragindi'],
      },
      {
        heading: 'Inner city and the eastern suburbs',
        paragraphs: [
          'Closer to the CBD, we work in Coorparoo, Greenslopes, Camp Hill, Woolloongabba and Kangaroo Point, and across the river in New Farm and Fortitude Valley. Many cars here are kept in unit or office car parks. With permission from building management, servicing, batteries and most brake jobs can be done where the car is parked.',
          'East of the southside, Carindale, Cannon Hill, Morningside and Bulimba are a regular run along Old Cleveland Road and the Gateway. Booking a day ahead gives you the widest choice of times.',
        ],
        suburbs: ['coorparoo', 'greenslopes', 'camp-hill', 'woolloongabba', 'kangaroo-point', 'new-farm', 'fortitude-valley', 'carindale', 'cannon-hill', 'morningside', 'bulimba'],
      },
      {
        heading: 'Northside, Bayside and the western suburbs',
        paragraphs: [
          'We also cover the northside, the Bayside and the western suburbs. These are the longest runs from Springwood, so bookings are usually confirmed within a day or two rather than the same day. If your job is urgent, call and we will tell you straight what we can do.',
        ],
        suburbs: ['wynnum', 'tingalpa', 'chermside', 'aspley', 'toowong', 'indooroopilly'],
      },
      {
        heading: 'Units, offices and steep driveways',
        paragraphs: [
          'Brisbane has more apartments, townhouse complexes and office car parks than anywhere else we work, and plenty of sloping blocks around Mount Gravatt, Holland Park and the inner suburbs. None of that stops a mobile job. In a unit or office building we need the OK from building management and enough room to work safely. On a steep driveway, we look for a flat spot nearby, or do the work on the street where it is safe.',
          'Tell us where the car is parked when you book, and whether it is in a basement, a visitor park or on the street. We will tell you upfront if a particular job needs more space than the spot allows.',
        ],
      },
      {
        heading: 'The jobs Brisbane drivers call us for',
        paragraphs: [
          'Short city trips are hard on batteries, so battery and charging faults are one of our most common Brisbane jobs, particularly in the inner city. We test the battery, alternator and starter before replacing anything, because a car that keeps going flat is not always a battery problem.',
          'Logbook servicing is the other big one. A mobile service at home or in the office car park saves a trip to the dealer, and as long as it follows the manufacturer\'s schedule your new-car warranty stays intact. Brakes, cooling systems and pre-purchase inspections for private used-car sales round out most of our Brisbane work.',
        ],
      },
      {
        heading: 'Open 24/7, fixed price, price match',
        paragraphs: [
          'We are open 24/7 for calls. Call 0451 159 954 any time and we arrange a mechanic in your area. Online requests are answered by the next business day.',
          'Every job starts with a fixed price in writing, covering parts, labour and fluids. If we find something else during the job, we stop and quote it separately, and nothing is added without your agreement. If you have a written quote from another business for the same job, we will match it. Afterpay is available.',
        ],
      },
    ],
    faq: [
      {
        question: 'Which parts of Brisbane do you cover?',
        answer: 'All of Brisbane, from our base in Springwood. The southside is closest and often same-day. The inner city and eastern suburbs are a regular run, and the northside, Bayside and western suburbs are usually booked a day or two ahead.',
      },
      {
        question: 'Can you work in my apartment or office car park?',
        answer: 'Usually, yes, with permission from building management or the body corporate and enough room to work safely. Tell us where the car is parked when you book.',
      },
      {
        question: 'Are you open after hours?',
        answer: 'Yes. We are open 24/7 for calls. Call 0451 159 954 any time and we arrange a mechanic in your area.',
      },
      {
        question: 'Do you price match?',
        answer: 'Yes. If you have a written quote from another business for the same job, we will match it.',
      },
      {
        question: 'Will a mobile logbook service affect my new-car warranty?',
        answer: 'No. Under the Australian Consumer Law you can have your car serviced by any qualified mechanic, as long as the work follows the manufacturer\'s schedule and specifications. We stamp the logbook and email the invoice.',
      },
    ],
  },
  {
    id: 'logan',
    name: 'Logan',
    slug: 'logan',
    hint: 'Home base. Fastest response, often same-day.',
    intro:
      'Logan is our home turf. We are based in Springwood, right in the middle of it, so Logan jobs get the fastest response of any region we cover. From Beenleigh to Browns Plains and out to Jimboomba, this is where we work most.',
    detail:
      'Because we are local, same-day service is common across Logan. We know the area, the traffic and the quickest routes, so we spend less time driving and more time fixing your car.',
    sections: [
      {
        heading: 'Northern Logan, our home patch',
        paragraphs: [
          'Our van starts each day in Springwood, so the suburbs around it get our quickest response. Daisy Hill, Slacks Creek, Underwood, Shailer Park and Rochedale South are all a few minutes away, and Loganholme is a short run down the M1 to where the Logan Motorway joins it. When a car will not start first thing in the morning, this is where we can usually help the same day.',
          'Northern Logan is a mix of established brick homes, newer estates and busy commercial strips along the M1 and around the Logan Hyperdome. A lot of our work here happens in home driveways, but plenty is done in staff car parks while the owner is at work.',
        ],
        suburbs: ['springwood', 'daisy-hill', 'slacks-creek', 'underwood', 'shailer-park', 'loganholme', 'rochedale-south', 'tanah-merah', 'cornubia'],
      },
      {
        heading: 'Central and western Logan',
        paragraphs: [
          'West of the M1, Logan Central, Woodridge, Kingston and Marsden are a short drive along Kingston Road and the Logan Motorway. Further west, Browns Plains, Regents Park, Hillcrest and Crestmead sit around Grand Plaza and the Mount Lindesay Highway. These are regular same-day or next-day jobs for us.',
          'Many households here run more than one car, often an older daily driver alongside a family SUV or ute. Brakes, batteries, alternators and cooling systems are the jobs we are called for most, along with logbook servicing on newer cars.',
          'Shift workers are a big part of this area too, with Logan Hospital and the Griffith University campus at Meadowbrook nearby. If you work long or odd hours, we can often do the job in your staff car park while you are on shift, with permission from the car park manager, so you are not losing a day off to a workshop visit.',
        ],
        suburbs: ['logan-central', 'woodridge', 'kingston', 'marsden', 'browns-plains', 'regents-park', 'hillcrest', 'crestmead', 'meadowbrook', 'loganlea'],
      },
      {
        heading: 'Southern Logan and the Beenleigh corridor',
        paragraphs: [
          'Down the M1 from Springwood, we cover Waterford, Bethania, Edens Landing, Holmview, Beenleigh and Eagleby. These are a slightly longer run, so booking a day ahead gives you the widest choice of times, but we take urgent jobs here when we can.',
        ],
        suburbs: ['waterford', 'waterford-west', 'bethania', 'edens-landing', 'holmview', 'beenleigh', 'eagleby', 'park-ridge', 'logan-reserve'],
      },
      {
        heading: 'The jobs Logan drivers call us for',
        paragraphs: [
          'Batteries and cooling systems come first in summer. Queensland heat shortens battery life, and long idles in motorway traffic push a tired cooling system over the edge. We test the battery and charging system before replacing anything, and we pressure-check the cooling system to find the actual leak rather than just topping it up.',
          'Brakes are next. Stop-start traffic on the M1, Kingston Road and the Mount Lindesay Highway wears pads steadily, and a squeal left too long turns into rotors as well. We replace pads, rotors and calipers in your driveway with quality parts sized for the car.',
          'Logbook servicing is steady all year, especially across the newer estates around Park Ridge, Logan Reserve and Holmview, where many cars are still under new-car warranty. We also inspect plenty of used cars for buyers dealing with private sellers around Logan, so you know what you are buying before you pay.',
        ],
      },
      {
        heading: 'Getting ready for the mechanic',
        paragraphs: [
          'We need safe, level ground with room to work around the car. A driveway, carport or garage is ideal, and a staff car park works if management agrees. In summer, shade helps, so tell us if the car can sit under a carport. Leave the keys handy and let us know about locked gates or dogs, and you do not need to stay with the car while we work. Give us the make, model and year when you book, so we bring the right parts for the job.',
        ],
      },
      {
        heading: 'Open 24/7, fixed price, price match',
        paragraphs: [
          'We are open 24/7 for calls. Call 0451 159 954 any time and we arrange a mechanic in your area. Online requests are answered by the next business day.',
          'Every job starts with a fixed price in writing, covering parts, labour and fluids. If we find something else during the job, we stop and quote it separately, and nothing is added without your agreement. If you have a written quote from another business for the same job, we will match it. Afterpay is available.',
        ],
      },
    ],
    faq: [
      {
        question: 'Where in Logan are you based?',
        answer: 'Springwood, 4127. It is our home base, so Springwood and the suburbs around it, such as Daisy Hill, Slacks Creek and Underwood, get our quickest response.',
      },
      {
        question: 'How fast can you get to me in Logan?',
        answer: 'Same-day service is common across northern and central Logan. Southern suburbs such as Beenleigh and Eagleby are a longer run, so a day ahead gives you more choice of times. Call and we give you a realistic time straight away.',
      },
      {
        question: 'Are you open after hours?',
        answer: 'Yes. We are open 24/7 for calls. Call 0451 159 954 any time and we arrange a mechanic in your area.',
      },
      {
        question: 'Do you price match?',
        answer: 'Yes. If you have a written quote from another business for the same job, we will match it. Send it with your booking request or read it out when you call.',
      },
      {
        question: 'Can you work on my car at work instead of at home?',
        answer: 'Often, yes. We need safe, level ground and permission from whoever manages the car park. Servicing, brakes, batteries and most alternator jobs suit a staff car park well.',
      },
    ],
  },
  {
    id: 'ipswich',
    name: 'Ipswich',
    slug: 'ipswich',
    hint: 'Springfield through Brassall and west to Ipswich CBD.',
    intro:
      'We service Ipswich from the fast-growing Springfield and Ripley estates through to the established suburbs around the CBD and out to Brassall. The area mixes brand-new family homes with older worker cottages, and we look after both.',
    detail:
      'Ipswich sits a short run down the Centenary and Logan motorways from our Springwood base. Springfield and Goodna jobs are often same-day, with the rest of Ipswich usually booked within a day or two.',
  },
  {
    id: 'gold-coast',
    name: 'Gold Coast',
    slug: 'gold-coast',
    hint: 'Northern Gold Coast, from Coomera south to Robina.',
    intro:
      'We cover the northern Gold Coast, from the booming Coomera and Pacific Pines growth corridor south through Southport and across to Robina. Plenty of new estates, family SUVs and tradie utes keeping the construction going.',
    detail:
      'The northern Gold Coast is a straight run down the M1 from Springwood. We service it regularly, with bookings usually confirmed within a day or two, and we will tell you straight if your suburb is past our usual reach.',
  },
]

const regionById = new Map(REGIONS.map((r) => [r.id, r]))

export function getRegion(id: string): Region | null {
  return regionById.get(id) ?? null
}

export function getRegionSlugs(): string[] {
  return REGIONS.map((r) => r.slug)
}

export function getRegions(): Region[] {
  return REGIONS
}
