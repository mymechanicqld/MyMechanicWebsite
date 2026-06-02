import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RegionHubContent from '@/components/RegionHubContent'
import { getRegion, getSuburbsByRegion } from '@/lib/suburbs'

const REGION_ID = 'ipswich'

export function generateMetadata(): Metadata {
  const region = getRegion(REGION_ID)
  if (!region) return {}
  const count = getSuburbsByRegion(REGION_ID).length
  return {
    title: `Mobile Mechanic Ipswich | ${count} Suburbs Covered | My Mechanic QLD`,
    description: `Mobile mechanic across ${count} Ipswich suburbs, from Springfield to Brassall. Brake repair, logbook servicing, batteries and more at your driveway. Fixed-price quotes.`,
    alternates: { canonical: `/${REGION_ID}/` },
    openGraph: {
      title: 'Mobile mechanic in Ipswich | My Mechanic QLD',
      description: `Mobile mechanic across ${count} Ipswich suburbs, from Springfield to Brassall.`,
      url: `/${REGION_ID}/`,
      type: 'website',
    },
  }
}

export default function IpswichRegionPage() {
  const region = getRegion(REGION_ID)
  if (!region) notFound()
  return <RegionHubContent region={region} />
}
