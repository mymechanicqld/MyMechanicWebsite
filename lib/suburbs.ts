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

export function getRegions() {
  return [
    { id: 'brisbane', name: 'Brisbane', slug: 'brisbane' },
    { id: 'logan', name: 'Logan', slug: 'logan' },
    { id: 'ipswich', name: 'Ipswich', slug: 'ipswich' },
    { id: 'gold-coast', name: 'Gold Coast', slug: 'gold-coast' },
  ]
}
