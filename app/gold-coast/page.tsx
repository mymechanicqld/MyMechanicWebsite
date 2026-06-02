import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RegionHubContent from '@/components/RegionHubContent'
import { getRegion, getSuburbsByRegion } from '@/lib/suburbs'

const REGION_ID = 'gold-coast'

export function generateMetadata(): Metadata {
  const region = getRegion(REGION_ID)
  if (!region) return {}
  const count = getSuburbsByRegion(REGION_ID).length
  return {
    title: `Mobile Mechanic Gold Coast | ${count} Northern Suburbs | My Mechanic QLD`,
    description: `Mobile mechanic across ${count} northern Gold Coast suburbs, from Coomera to Robina. Brake repair, servicing, batteries and more at your driveway. Fixed-price quotes.`,
    alternates: { canonical: `/${REGION_ID}/` },
    openGraph: {
      title: 'Mobile mechanic on the Gold Coast | My Mechanic QLD',
      description: `Mobile mechanic across ${count} northern Gold Coast suburbs, from Coomera to Robina.`,
      url: `/${REGION_ID}/`,
      type: 'website',
    },
  }
}

export default function GoldCoastRegionPage() {
  const region = getRegion(REGION_ID)
  if (!region) notFound()
  return <RegionHubContent region={region} />
}
