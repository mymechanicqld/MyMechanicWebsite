import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Fraunces } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

// ── GA4 ──────────────────────────────────────────────────────────────
// Replace with your real Measurement ID from analytics.google.com
// Admin > Data Streams > Web > Measurement ID (starts with G-)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-6YSECEQTDG'

// ── Google Ads ────────────────────────────────────────────────────────
// Conversion-tracking tag from Google Ads (starts with AW-). Runs off the
// same gtag.js instance as GA4 — we just register a second `config` ID.
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-17575487896'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
})

const SITE_URL = 'https://www.mymechanicqld.com.au'
const PHONE = '0451 159 954'
const PHONE_E164 = '+61451159954'
const EMAIL = 'contact@mymechanicqld.com.au'

const DEFAULT_TITLE = 'Mobile Mechanic Brisbane, Logan, Ipswich & Gold Coast | My Mechanic QLD'
// Description is symptom-led where possible: most customers search by what's
// wrong, not by service name. Kept under 160 characters for full SERP display.
const DEFAULT_DESCRIPTION =
  "Mobile mechanic Brisbane, Logan, Ipswich & Gold Coast. Car broken down? Brakes squealing? Overheating? We come to you. Fixed-price quotes upfront, workmanship warranty on every job."

// Keywords are largely ignored by Google but still read by Bing and some
// vertical engines. Picked to span every search-intent category: symptom-led,
// emergency, service-led, suburb, vehicle-make, trust. Full strategy in
// docs/SEO_KEYWORDS.md.
const DEFAULT_KEYWORDS = [
  // Core service + region
  'mobile mechanic Brisbane',
  'mobile mechanic Logan',
  'mobile mechanic Ipswich',
  'mobile mechanic Gold Coast',
  'mobile mechanic near me',
  'mechanic that comes to you',
  // Emergency / urgent
  'emergency mechanic Brisbane',
  'car broken down Brisbane',
  "car won't start Brisbane",
  'same day mechanic Brisbane',
  'roadside mechanic Brisbane',
  'Saturday mechanic Brisbane',
  // Symptom-led
  'brakes squealing fix',
  'check engine light Brisbane',
  'car overheating help',
  'battery flat Brisbane',
  'alternator not charging',
  'car cranks but wont start',
  // Service + region
  'mobile brake repair Brisbane',
  'mobile car service Brisbane',
  'mobile logbook service Brisbane',
  'mobile alternator replacement Brisbane',
  'mobile starter motor replacement Brisbane',
  'mobile water pump replacement Brisbane',
  'mobile radiator repair Brisbane',
  'mobile battery replacement Brisbane',
  'mobile car diagnostics Brisbane',
  'pre-purchase car inspection Brisbane',
  // Cost
  'how much does a brake job cost Brisbane',
  'fixed price mechanic Brisbane',
  // Trust
  'honest mechanic Brisbane',
  'local mechanic Brisbane',
  'workmanship warranty mechanic',
  'qualified mechanic Brisbane',
  // Vehicle-make
  'Toyota mechanic Brisbane',
  'Hilux service Brisbane',
  'Mazda service Brisbane',
  'Ford Ranger service Brisbane',
  // Priority suburbs
  'mobile mechanic Springwood',
  'mobile mechanic Sunnybank',
  'mobile mechanic Carindale',
  'mobile mechanic Chermside',
  'mobile mechanic Springfield',
  'mobile mechanic Southport',
  'mobile mechanic Robina',
  'mobile mechanic Coomera',
]

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#0C0A09' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: 'My Mechanic QLD', url: SITE_URL }],
  creator: 'My Mechanic QLD',
  publisher: 'My Mechanic QLD',
  category: 'Auto Repair',
  applicationName: 'My Mechanic QLD',
  generator: 'Next.js',

  alternates: {
    canonical: '/',
  },

  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },

  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'My Mechanic QLD',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: '/',
    images: [
      {
        url: '/images/og-default.webp',
        width: 1200,
        height: 630,
        alt: 'My Mechanic QLD mobile mechanic service van in a Brisbane driveway',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/images/og-default.webp'],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',

  // TBD: paste the actual GSC verification token once the property is verified
  // verification: { google: '...' },
}

// LocalBusiness / AutoRepair JSON-LD applied site-wide.
// Re-uses @id pointers so other schemas can reference this entity instead of
// duplicating fields.
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['AutoRepair', 'LocalBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: 'My Mechanic QLD',
  alternateName: ['My Mechanic Queensland', 'My Mechanic Qld'],
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  telephone: PHONE_E164,
  email: EMAIL,
  image: [`${SITE_URL}/images/hero-van.webp`, `${SITE_URL}/images/owner-on-job.webp`],
  logo: `${SITE_URL}/images/logo.png`,
  priceRange: '$$',
  paymentAccepted: 'Cash, Credit Card, Debit Card, Bank Transfer, EFTPOS',
  currenciesAccepted: 'AUD',
  // Service-area business (we come to the customer, no walk-in address)
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Springwood',
    addressRegion: 'QLD',
    postalCode: '4127',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -27.6125,
    longitude: 153.1339,
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: -27.6125,
      longitude: 153.1339,
    },
    geoRadius: 60000, // 60 km, in metres
    description: 'Mobile mechanic serving Brisbane, Logan, Ipswich and the Gold Coast from Springwood.',
  },
  areaServed: [
    { '@type': 'City', name: 'Brisbane', sameAs: 'https://en.wikipedia.org/wiki/Brisbane' },
    { '@type': 'City', name: 'Logan', sameAs: 'https://en.wikipedia.org/wiki/Logan_City' },
    { '@type': 'City', name: 'Ipswich', sameAs: 'https://en.wikipedia.org/wiki/Ipswich,_Queensland' },
    { '@type': 'City', name: 'Gold Coast', sameAs: 'https://en.wikipedia.org/wiki/Gold_Coast,_Queensland' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '17:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mobile mechanic services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Brake Repair', url: `${SITE_URL}/brake-repairs/` },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Alternator and Starter Motor Replacement',
          url: `${SITE_URL}/starter-alternator/`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Radiator and Water Pump Replacement',
          url: `${SITE_URL}/radiator-cooling-system/`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Logbook and General Car Servicing',
          url: `${SITE_URL}/logbook-servicing/`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pre-Purchase Inspection',
          url: `${SITE_URL}/pre-purchase-inspection/`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Battery Replacement', url: `${SITE_URL}/battery-replacement/` },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Warning-Light Diagnostics', url: `${SITE_URL}/car-diagnostics/` },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Steering and Suspension Repair',
          url: `${SITE_URL}/steering-suspension/`,
        },
      },
    ],
  },
  knowsAbout: [
    'Mobile mechanic services',
    'Brake repair',
    'Alternator replacement',
    'Starter motor replacement',
    'Radiator replacement',
    'Water pump replacement',
    'Logbook servicing',
    'Pre-purchase vehicle inspection',
    'Car battery replacement',
    'Engine diagnostics',
    'Suspension repair',
  ],
  // sameAs URLs go here once social profiles are confirmed:
  // sameAs: [
  //   'https://www.facebook.com/mymechanicqld',
  //   'https://www.google.com/maps/place/...',
  // ],
  // aggregateRating goes here once we have verified Google review stats:
  // aggregateRating: {
  //   '@type': 'AggregateRating',
  //   ratingValue: '4.9',
  //   reviewCount: '237',
  // },
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'My Mechanic QLD',
  description: DEFAULT_DESCRIPTION,
  publisher: { '@id': `${SITE_URL}/#business` },
  inLanguage: 'en-AU',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        {/* GA4 — loads after page is interactive so it does not block render */}
        {GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
                gtag('config', '${GOOGLE_ADS_ID}');`}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                     focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
