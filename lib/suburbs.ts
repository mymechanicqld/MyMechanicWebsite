import suburbData from '@/content/suburbs.json'

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

const suburbs: Suburb[] = suburbData.suburbs as Suburb[]

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
