import {
  Disc3,
  BatteryCharging,
  ThermometerSun,
  MoveVertical,
  Gauge,
  ClipboardCheck,
  ScanLine,
  Battery,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────

export interface ServiceNavItem {
  slug: string
  label: string
  href: string
  Icon: LucideIcon
  desc: string
  priority?: boolean
  callOnly?: boolean
}

export interface ServiceGroup {
  title: string
  items: ServiceNavItem[]
}

export interface PlainNavItem {
  label: string
  href: string
}

// ── Service groups for the mega-menu / mobile accordion ────────────

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: 'Repairs',
    items: [
      {
        slug: 'brake-repairs',
        label: 'Brake repair',
        href: '/brake-repairs/',
        Icon: Disc3,
        desc: 'Pads, rotors, calipers and brake fluid.',
        priority: true,
      },
      {
        slug: 'starter-alternator',
        label: 'Alternator & starter motor',
        href: '/starter-alternator/',
        Icon: BatteryCharging,
        desc: "Won't start? Slow crank? On-site diagnosis.",
        priority: true,
      },
      {
        slug: 'radiator-cooling-system',
        label: 'Radiator & water pump',
        href: '/radiator-cooling-system/',
        Icon: ThermometerSun,
        desc: 'Overheating? Pressure test and fix on-site.',
        priority: true,
      },
      {
        slug: 'steering-suspension',
        label: 'Steering & suspension',
        href: '/steering-suspension/',
        Icon: MoveVertical,
        desc: 'Clunks, vibrations, ball joints, shocks.',
      },
    ],
  },
  {
    title: 'Servicing & Inspections',
    items: [
      {
        slug: 'logbook-servicing',
        label: 'Logbook & general servicing',
        href: '/logbook-servicing/',
        Icon: Gauge,
        desc: 'Warranty-safe, manufacturer-spec service.',
        priority: true,
      },
      {
        slug: 'pre-purchase-inspection',
        label: 'Pre-purchase inspection',
        href: '/pre-purchase-inspection/',
        Icon: ClipboardCheck,
        desc: 'Detailed inspection with a written report.',
      },
      {
        slug: 'car-diagnostics',
        label: 'Warning-light diagnostics',
        href: '/car-diagnostics/',
        Icon: ScanLine,
        desc: 'OBD scan plus physical fault-finding.',
      },
    ],
  },
  {
    title: 'Get Help',
    items: [
      {
        slug: 'battery-replacement',
        label: 'Battery replacement',
        href: '/battery-replacement/',
        Icon: Battery,
        desc: 'Delivered, fitted and old one recycled.',
      },
      {
        slug: 'emergency-call-outs',
        label: 'Emergency call-outs',
        href: 'tel:0451159954',
        Icon: TriangleAlert,
        desc: 'Broken down? Call us for same-day response.',
        callOnly: true,
      },
    ],
  },
]

// ── Plain nav items (non-dropdown links) ───────────────────────────

export const PLAIN_NAV_ITEMS: PlainNavItem[] = [
  { label: 'Locations', href: '/areas/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
]
