/**
 * Area hubs: indexable pages that group suburbs across region boundaries
 * (e.g. Brisbane South spans both the Brisbane and Logan regions). They are
 * not REGIONS, so they get no sitemap segment of their own; their URL is
 * listed in the core sitemap next to the region hubs.
 */

export interface AreaHubCluster {
  name: string
  blurb: string
  /** Suburb slugs that exist in content/suburbs.json */
  suburbs: string[]
}

export interface AreaHub {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  ogTitle: string
  eyebrow: string
  h1: string
  /** Part of the H1 shown in the accent colour */
  h1Accent: string
  heroLead: string
  /** Extra suburbs we cover that do not have their own page (schema only) */
  extraAreaNames: string[]
  servicesHeading: string
  serviceNotes: Record<string, string>
  howHeading: string
  howParagraphs: string[]
  clustersHeading: string
  clustersIntro: string
  clusters: AreaHubCluster[]
  faq: { question: string; answer: string }[]
  ctaHeading: string
  ctaBody: string
}

export const AREA_HUBS: AreaHub[] = [
  {
    slug: 'brisbane-south',
    name: 'Brisbane South',
    metaTitle: 'Mobile Mechanic Brisbane South | Southside Suburbs | My Mechanic QLD',
    metaDescription:
      "Mobile mechanic for Brisbane's southside, from Mount Gravatt and Carindale to Sunnybank and Eight Mile Plains. Based in Springwood, often same-day. Fixed-price quotes.",
    ogTitle: "Mobile mechanic for Brisbane's southside | My Mechanic QLD",
    eyebrow: 'Mobile mechanic · Brisbane South',
    h1: 'Mobile mechanic across Brisbane South',
    h1Accent: 'Brisbane South',
    heroLead:
      "From Mount Gravatt and Carindale down to Sunnybank, Eight Mile Plains and Springwood, we fix cars in southside driveways and work car parks. We are based in Springwood, so most of Brisbane's southside is a short run up the M1.",
    extraAreaNames: ['Sunnybank Hills'],
    servicesHeading: 'The southside jobs we do most.',
    serviceNotes: {
      'brake-repairs':
        'The hills around Mount Gravatt and stop-start traffic on Logan Road are hard on pads and rotors. We replace pads, rotors and calipers on-site.',
      'starter-alternator':
        'No start at home or in the office car park? We test the starter and charging system and replace the faulty part where the car sits.',
      'radiator-cooling-system':
        'Running hot on the M1 or the Gateway? We pressure test, find the leak and replace radiators, water pumps and hoses.',
      'logbook-servicing':
        'Manufacturer-spec servicing at home or at work. Logbook stamped, so your new-car warranty is protected.',
    },
    howHeading: 'How we get around the southside',
    howParagraphs: [
      'Our base is Springwood, on the southern edge of the southside where Brisbane meets Logan. The M1 runs north from us through Eight Mile Plains and Upper Mount Gravatt, Logan Road runs roughly alongside it, and the Gateway Motorway takes us across towards Carindale. Very little of the southside is a long drive for us.',
      'Southside jobs are a mix of family homes, townhouse complexes and office car parks around places like Brisbane Technology Park and Westfield Garden City. We work wherever the car is parked safely, as long as there is room to open the doors and get under it.',
      'Every job is quoted at a fixed price in writing before we start. If we spot something else along the way, we stop, show you and quote it separately. You decide whether it gets done.',
    ],
    clustersHeading: 'Southside suburbs we cover.',
    clustersIntro:
      'Grouped by how we get to them from Springwood. Pick your suburb for local details, or call if yours is in between.',
    clusters: [
      {
        name: 'Springwood and the M1 corridor',
        blurb:
          'The closest stretch of the southside to our base. The M1 and Logan Road run straight up through here, so these are often same-day jobs.',
        suburbs: [
          'springwood',
          'rochedale-south',
          'underwood',
          'eight-mile-plains',
          'rochedale',
          'runcorn',
        ],
      },
      {
        name: 'Mount Gravatt and surrounds',
        blurb:
          'Around Westfield Garden City, Griffith University and Toohey Forest. Sloping blocks are common here, so tell us if the driveway is steep and we will find a flat spot to work.',
        suburbs: [
          'mount-gravatt',
          'upper-mount-gravatt',
          'mansfield',
          'wishart',
          'holland-park',
          'tarragindi',
        ],
      },
      {
        name: 'Sunnybank and MacGregor',
        blurb:
          'Busy shopping strips around Sunnybank Plaza and Market Square, with plenty of townhouse complexes. Sunnybank Hills is covered too. In a complex, a visitor park usually works if the body corporate allows it.',
        suburbs: ['sunnybank', 'macgregor', 'salisbury'],
      },
      {
        name: 'Carindale, Coorparoo and the inner southside',
        blurb:
          'Further north and east, out towards Old Cleveland Road. A longer run from Springwood, so same-day is available but booking a day ahead gives you more choice of times.',
        suburbs: ['carindale', 'coorparoo', 'camp-hill', 'greenslopes'],
      },
    ],
    faq: [
      {
        question: 'Which Brisbane South suburbs do you cover?',
        answer:
          'Every suburb listed on this page, plus the streets in between, including Sunnybank Hills. If you are on the southside and not sure, call 0451 159 954 and we will confirm.',
      },
      {
        question: 'How quickly can a mobile mechanic get to the southside?',
        answer:
          'Suburbs closest to our Springwood base, like Eight Mile Plains, Rochedale and Runcorn, often get same-day service. Further north, around Coorparoo and Carindale, same-day is available and booking a day ahead gives you the widest choice of times.',
      },
      {
        question: 'Can you work on my car at the office?',
        answer:
          'Yes, if there is safe, level space and the car park manager is happy for us to work there. Office car parks around Eight Mile Plains and Upper Mount Gravatt suit us well, and you can get on with your day while we work.',
      },
      {
        question: 'Will a mobile service on the southside protect my new-car warranty?',
        answer:
          'Yes. Under the Australian Consumer Law any qualified mechanic can service your car, provided the work follows the manufacturer schedule and specifications. We stamp the logbook and email the invoice.',
      },
    ],
    ctaHeading: 'Book a southside mobile mechanic.',
    ctaBody: 'Fixed-price quote before we start. Same-day service available.',
  },
]

const hubBySlug = new Map(AREA_HUBS.map((h) => [h.slug, h]))

export function getAreaHub(slug: string): AreaHub | null {
  return hubBySlug.get(slug) ?? null
}

export function getAreaHubSlugs(): string[] {
  return AREA_HUBS.map((h) => h.slug)
}
