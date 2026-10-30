/**
 * Central business NAP + geo constants and schema helpers.
 * Keeps structured data consistent across the homepage, region hubs,
 * suburb pages and service x suburb pages. Suburb/region pages reference
 * the sitewide business entity by @id rather than duplicating every field.
 */

export const SITE_URL = 'https://www.mymechanicqld.com.au'
export const BUSINESS_ID = `${SITE_URL}/#business`
export const BUSINESS_NAME = 'My Mechanic QLD'
export const PHONE_E164 = '+61451159954'
export const EMAIL = 'mymechanicqld@gmail.com'

export const BASE_GEO = {
  latitude: -27.6125,
  longitude: 153.1339,
}

export const BASE_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Springwood',
  addressRegion: 'QLD',
  postalCode: '4127',
  addressCountry: 'AU',
} as const

/** Open 24/7 for calls since 30 Oct 2026. 00:00 to 23:59 on every day is
 *  Google's documented way to mark a business as open 24 hours. */
export const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
] as const

/** Reference to the sitewide business entity defined in app/layout.tsx */
export const businessRef = { '@id': BUSINESS_ID }

/**
 * Build a Service schema scoped to a single suburb. The provider points at
 * the sitewide business entity via @id, and areaServed is the specific suburb.
 */
export function suburbServiceSchema(opts: {
  serviceType: string
  suburbName: string
  postcode: number | string
  hasOffer?: boolean
  price?: number
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.serviceType,
    provider: {
      '@type': 'AutomotiveBusiness',
      '@id': BUSINESS_ID,
      name: BUSINESS_NAME,
      telephone: PHONE_E164,
      url: SITE_URL,
      address: BASE_ADDRESS,
      geo: { '@type': 'GeoCoordinates', ...BASE_GEO },
      openingHoursSpecification: OPENING_HOURS,
      priceRange: '$$',
    },
    areaServed: {
      '@type': 'City',
      name: opts.suburbName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: opts.suburbName,
        addressRegion: 'QLD',
        postalCode: String(opts.postcode),
        addressCountry: 'AU',
      },
      containedInPlace: { '@type': 'State', name: 'Queensland' },
    },
  }
  if (opts.hasOffer && opts.price) {
    schema.offers = {
      '@type': 'Offer',
      price: opts.price,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
    }
  }
  return schema
}
