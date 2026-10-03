/**
 * The service choices offered on the public quote form, grouped by category.
 *
 * Single source of truth for the form (components/QuoteForm.tsx), the server
 * action (app/actions.ts) and the notification email (lib/email-templates.ts).
 *
 * Storage (Supabase `quote_submissions`):
 *   service_needed    the option slug. Same column and format as before, so the
 *                     owner app, dashboard and email assistant keep working.
 *   service_category  the group slug, derived on the server from the option.
 *                     Nullable, so older rows are left exactly as they were.
 *
 * Slugs are stored data. Never rename one that has been live: add a new slug
 * and move the old one into LEGACY_SERVICE_LABELS instead.
 */

export const SERVICE_CATEGORIES = [
  'standard-servicing',
  'diagnosis',
  'pre-purchase-inspection',
  'maintenance',
] as const

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number]

export interface ServiceOption {
  value: string
  label: string
}

export interface ServiceGroup {
  category: ServiceCategory
  label: string
  options: ServiceOption[]
}

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    category: 'standard-servicing',
    label: 'Standard servicing',
    options: [
      { value: 'logbook-servicing', label: 'Logbook servicing' },
      { value: 'general-servicing', label: 'General servicing' },
    ],
  },
  {
    category: 'diagnosis',
    label: 'Diagnosis',
    options: [{ value: 'diagnosis', label: 'Fault diagnosis' }],
  },
  {
    category: 'pre-purchase-inspection',
    label: 'Pre-purchase inspections',
    options: [{ value: 'pre-purchase-inspection', label: 'Pre-purchase inspection' }],
  },
  {
    category: 'maintenance',
    label: 'Maintenance',
    options: [
      { value: 'brake-pads', label: 'Brake pad replacement' },
      { value: 'brake-pads-and-rotors', label: 'Brake pad and rotor replacement' },
      { value: 'alternator-replacement', label: 'Alternator replacement' },
      { value: 'starter-motor-replacement', label: 'Starter motor replacement' },
      { value: 'radiator-water-pump', label: 'Radiator and water pump' },
    ],
  },
]

/**
 * Slugs the form offered before the October 2026 regroup. Over a thousand
 * stored inquiries use them, and a customer with an old copy of the page open
 * can still submit one, so they stay accepted and labelled. They get no
 * category, since they do not map cleanly onto the new groups.
 */
export const LEGACY_SERVICE_LABELS: Record<string, string> = {
  'brake-repair': 'Brake repair',
  'alternator-starter': 'Alternator and starter motor',
  'battery-replacement': 'Battery replacement',
  'warning-light-diagnostics': 'Warning-light diagnostics',
  'steering-suspension': 'Steering and suspension',
  'emergency-breakdown': 'Emergency / breakdown',
  'not-sure': 'Not sure / general enquiry',
}

const CATEGORY_BY_SERVICE = new Map<string, ServiceCategory>(
  SERVICE_GROUPS.flatMap((g) => g.options.map((o) => [o.value, g.category] as const)),
)

const CATEGORY_LABELS = new Map<ServiceCategory, string>(
  SERVICE_GROUPS.map((g) => [g.category, g.label]),
)

/** Display label for every slug we have ever stored, current and legacy. */
export const SERVICE_LABELS: Record<string, string> = {
  ...LEGACY_SERVICE_LABELS,
  ...Object.fromEntries(SERVICE_GROUPS.flatMap((g) => g.options.map((o) => [o.value, o.label]))),
}

/** True for any slug the server should accept, current or legacy. */
export function isKnownService(slug: string): boolean {
  return slug in SERVICE_LABELS
}

/** The group a current option belongs to, or null for legacy or unknown slugs. */
export function serviceCategoryFor(slug: string): ServiceCategory | null {
  return CATEGORY_BY_SERVICE.get(slug) ?? null
}

export function serviceCategoryLabel(category: string | null | undefined): string {
  return category ? CATEGORY_LABELS.get(category as ServiceCategory) ?? '' : ''
}
