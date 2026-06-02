import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RegionHubContent from '@/components/RegionHubContent'
import { getRegion, getSuburbsByRegion } from '@/lib/suburbs'

const REGION_ID = 'logan'

export function generateMetadata(): Metadata {
  const region = getRegion(REGION_ID)
  if (!region) return {}
  const count = getSuburbsByRegion(REGION_ID).length
  return {
    title: `Mobile Mechanic Logan | ${count} Suburbs, Same-Day Available | My Mechanic QLD`,
    description: `Logan is our home base. Fast mobile mechanic service across ${count} Logan suburbs, often same-day. Brake repair, servicing, batteries and more at your driveway.`,
    alternates: { canonical: `/${REGION_ID}/` },
    openGraph: {
      title: 'Mobile mechanic in Logan | My Mechanic QLD',
      description: `Logan is our home base. Mobile mechanic across ${count} suburbs, often same-day.`,
      url: `/${REGION_ID}/`,
      type: 'website',
    },
  }
}

export default function LoganRegionPage() {
  const region = getRegion(REGION_ID)
  if (!region) notFound()
  return <RegionHubContent region={region} />
}
