import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  User,
  Car,
  MessageSquare,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react'
import { submitQuoteAction } from '@/app/actions'

/**
 * Public booking-request form.
 *
 * Four grouped sections (inspired by competitor layout):
 *   1. Your details    — name, phone, email, suburb
 *   2. Vehicle         — car make, rego, service dropdown
 *   3. Additional details — optional free-text message
 *   4. Appointment     — preferred date + time-window radio cards
 *
 * On submit, `submitQuoteAction` (server action) writes to Supabase and
 * fires a notification email via Resend. The same submission lands in
 * the operations dashboard at `/dashboard/`.
 *
 * This is a server component. All interactive elements (select, date picker,
 * radio buttons) use native HTML, styled with Tailwind peer selectors.
 */

const SERVICES = [
  { value: 'brake-repair', label: 'Brake repair' },
  { value: 'alternator-starter', label: 'Alternator and starter motor' },
  { value: 'radiator-water-pump', label: 'Radiator and water pump' },
  { value: 'logbook-servicing', label: 'Logbook and general servicing' },
  { value: 'pre-purchase-inspection', label: 'Pre-purchase inspection' },
  { value: 'battery-replacement', label: 'Battery replacement' },
  { value: 'warning-light-diagnostics', label: 'Warning-light diagnostics' },
  { value: 'steering-suspension', label: 'Steering and suspension' },
  { value: 'emergency-breakdown', label: 'Emergency / breakdown' },
  { value: 'not-sure', label: 'Not sure / general enquiry' },
]

const TIME_WINDOWS = [
  { value: '7am-10am', label: 'Morning', sub: '7am - 10am' },
  { value: '10am-12pm', label: 'Late morning', sub: '10am - 12pm' },
  { value: '12pm-3pm', label: 'Afternoon', sub: '12pm - 3pm' },
  { value: '3pm-6pm', label: 'Late afternoon', sub: '3pm - 6pm' },
]

// Minimum date for the date picker (today in AEST)
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Brisbane' })

export default function QuoteForm({
  submitted,
  redirectTo = '/',
}: {
  submitted?: boolean
  redirectTo?: string
}) {
  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="size-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 grid place-items-center mb-5">
          <CheckCircle2 className="size-7" strokeWidth={1.75} />
        </div>
        <h3 className="text-2xl font-bold text-ink mb-2">Thanks, we&apos;ve got it.</h3>
        <p className="text-muted max-w-[40ch] mx-auto">
          We&apos;ll come back with a fixed-price quote during business hours. If
          it&apos;s urgent, call us on 0451 159 954.
        </p>
        <Link href={redirectTo as `/${string}`} className="btn btn-secondary mt-6 inline-flex">
          Send another request
        </Link>
      </div>
    )
  }

  return (
    <form action={submitQuoteAction} className="grid gap-0">
      <input type="hidden" name="redirect_to" value={redirectTo} />

      {/* ── Section 1: Your details ─────────────────────────────── */}
      <SectionHeader icon={User} title="Your details" />
      <div className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full Name" name="name" placeholder="Your name" required />
          <Field label="Phone Number" name="phone" type="tel" placeholder="04XX XXX XXX" required />
        </div>
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
        <Field label="Suburb" name="suburb" placeholder="e.g. Sunnybank" required />
      </div>

      <Divider />

      {/* ── Section 2: Vehicle ──────────────────────────────────── */}
      <SectionHeader icon={Car} title="Vehicle" />
      <div className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Car Make" name="car_make" placeholder="e.g. Toyota, Holden" />
          <Field label="Registration Number" name="rego" placeholder="ABC123" required uppercase />
        </div>

        {/* Service dropdown */}
        <label className="block">
          <span className="block text-xs font-semibold text-ink uppercase tracking-[0.05em] mb-1.5">
            Service <span className="text-accent-bright">*</span>
          </span>
          <select
            name="service_needed"
            required
            defaultValue=""
            className={
              'w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink ' +
              'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors ' +
              'appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2378716C%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E")] ' +
              'bg-[length:16px_16px] bg-[position:right_12px_center] bg-no-repeat pr-10'
            }
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Divider />

      {/* ── Section 3: Additional details ───────────────────────── */}
      <SectionHeader icon={MessageSquare} title="Additional details" />
      <div>
        <Field
          label=""
          name="message"
          type="textarea"
          placeholder="Anything else we should know? Symptoms, sounds, dashboard lights, what has been done already."
          hideLabel
        />
        <p className="text-xs text-subtle mt-1.5">
          Optional. Helps our mechanic bring the right tools and parts.
        </p>
      </div>

      <Divider />

      {/* ── Section 4: Appointment ──────────────────────────────── */}
      <SectionHeader icon={CalendarDays} title="Appointment" />
      <div className="grid gap-4">
        <Field label="Date" name="preferred_date" type="date" min={today} />

        {/* Time-window radio cards */}
        <div>
          <span className="block text-xs font-semibold text-ink uppercase tracking-[0.05em] mb-2.5">
            Preferred window
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {TIME_WINDOWS.map((tw) => (
              <label key={tw.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="preferred_time"
                  value={tw.value}
                  className="peer sr-only"
                />
                <div
                  className={
                    'rounded-lg border border-border bg-surface px-3 py-3 text-center transition-colors ' +
                    'hover:border-accent/60 ' +
                    'peer-checked:border-accent peer-checked:bg-accent-tint peer-checked:ring-1 peer-checked:ring-accent/30 ' +
                    'peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 peer-focus-visible:ring-offset-2'
                  }
                >
                  <div className="text-sm font-semibold text-ink peer-checked:text-accent">{tw.label}</div>
                  <div className="text-xs text-muted mt-0.5">{tw.sub}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <p className="text-xs text-subtle -mt-1">
          We will confirm a precise arrival time when we call you.
        </p>
      </div>

      <Divider />

      {/* ── Bottom: consent + submit ────────────────────────────── */}
      <label className="flex items-start gap-3 text-[0.8125rem] text-muted cursor-pointer">
        <input
          type="checkbox"
          name="consent_privacy"
          value="yes"
          required
          className="mt-[3px] size-4 accent-accent rounded border border-border flex-shrink-0"
        />
        <span>
          By checking this box, you agree to our{' '}
          <Link href={"/privacy-policy/" as `/${string}`} className="underline">
            Privacy Policy
          </Link>{' '}
          and consent to the use of your information.
        </span>
      </label>

      <p className="text-xs text-subtle mt-3 leading-relaxed">
        This is a booking request, not a confirmed appointment. We will come back with a
        fixed-price quote and confirm a time that works for you.
      </p>

      <button type="submit" className="btn btn-primary justify-center w-full mt-4 py-3.5 text-base">
        Submit booking request
        <ArrowRight className="size-4" strokeWidth={2} />
      </button>
    </form>
  )
}

/* ── Local helper components ─────────────────────────────────────── */

function SectionHeader({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="size-9 rounded-lg bg-accent-tint text-accent grid place-items-center shrink-0">
        <Icon className="size-[18px]" strokeWidth={1.75} />
      </div>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
    </div>
  )
}

function Divider() {
  return <div className="border-t border-hairline my-6" />
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  uppercase,
  min,
  hideLabel,
}: {
  label: string
  name: string
  type?: 'text' | 'tel' | 'email' | 'textarea' | 'date'
  placeholder?: string
  required?: boolean
  uppercase?: boolean
  min?: string
  hideLabel?: boolean
}) {
  const baseInput =
    'w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink ' +
    'placeholder:text-subtle/70 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors'

  return (
    <label className="block">
      {!hideLabel && (
        <span className="block text-xs font-semibold text-ink uppercase tracking-[0.05em] mb-1.5">
          {label}
          {required && <span className="text-accent-bright"> *</span>}
        </span>
      )}
      {type === 'textarea' ? (
        <textarea
          name={name}
          rows={3}
          placeholder={placeholder}
          required={required}
          className={baseInput + ' resize-y'}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          min={min}
          autoCapitalize={uppercase ? 'characters' : undefined}
          className={baseInput + (uppercase ? ' uppercase tracking-[0.04em] font-mono' : '')}
        />
      )}
    </label>
  )
}
