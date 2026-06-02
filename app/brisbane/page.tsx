import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RegionHubContent from '@/components/RegionHubContent'
import { getRegion, getSuburbsByRegion } from '@/lib/suburbs'

const REGION_ID = 'brisbane'

export function generateMetadata(): Metadata {
  const region = getRegion(REGION_ID)
  if (!region) return {}
  const count = getSuburbsByRegion(REGION_ID).length
  return {
    title: `Mobile Mechanic Brisbane | ${count} Suburbs Covered | My Mechanic QLD`,
    description: `Mobile mechanic across ${count} Brisbane suburbs. Brake repair, logbook servicing, batteries and more at your driveway. Fixed-price quotes, workmanship warranty.`,
    alternates: { canonical: `/${REGION_ID}/` },
    openGraph: {
      title: 'Mobile mechanic in Brisbane | My Mechanic QLD',
      description: `Mobile mechanic across ${count} Brisbane suburbs. Fixed-price quotes, workmanship warranty on every job.`,
      url: `/${REGION_ID}/`,
      type: 'website',
    },
  }
}

export default function BrisbaneRegionPage() {
  const region = getRegion(REGION_ID)
  if (!region) notFound()
  return <RegionHubContent region={region} />
}
