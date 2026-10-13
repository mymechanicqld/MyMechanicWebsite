import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import AreaHubContent from '@/components/AreaHubContent'
import { getAreaHub } from '@/lib/area-hubs'

const HUB_SLUG = 'brisbane-south'

export function generateMetadata(): Metadata {
  const hub = getAreaHub(HUB_SLUG)
  if (!hub) return {}
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: { canonical: `/${HUB_SLUG}/` },
    openGraph: {
      title: hub.ogTitle,
      description: hub.metaDescription,
      url: `/${HUB_SLUG}/`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: hub.ogTitle,
      description: hub.metaDescription,
    },
  }
}

export default function BrisbaneSouthPage() {
  const hub = getAreaHub(HUB_SLUG)
  if (!hub) notFound()
  return <AreaHubContent hub={hub} />
}
