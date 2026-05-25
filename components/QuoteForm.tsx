import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { submitQuoteAction } from '@/app/actions'

/**
 * Public quote-request form.
 *
 * Field set mirrors the original mymechanicqld.com.au site exactly:
 *   1. Name           (required)
 *   2. Phone number   (required)
 *   3. Email          (required)
 *   4. Rego           (required) — vehicle registration / licence plate
 *   5. Suburb         (required)
 *   6. How can we help?  (required) — free-text textarea
 *   7. Privacy consent checkbox (required)
 *
 * On submit, `submitQuoteAction` (server action) writes to Supabase and
 * fires a notification email via Resend. The same submission lands in
 * the operations dashboard at `/dashboard/`.
 */
export default function QuoteForm({ submitted }: { submitted?: boolean }) {
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
        <Link href={"/" as `/${string}`} className="btn btn-secondary mt-6 inline-flex">
          Send another request
        </Link>
      </div>
    )
  }

  return (
    <form action={submitQuoteAction} className="grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name"          name="name"  placeholder="Your name"   required />
        <Field label="Phone number"  name="phone" type="tel" placeholder="0400 000 000" required />
      </div>
      <Field label="Email"  name="email" type="email" placeholder="you@example.com" required />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Rego"   name="rego"   placeholder="ABC123" required uppercase />
        <Field label="Suburb" name="suburb" placeholder="e.g. Sunnybank" required />
      </div>
      <Field
        label="How can we help?"
        name="message"
        type="textarea"
        placeholder="Tell us what's going on with your car — symptoms, sounds, dashboard lights, what's been done already."
        required
      />

      <label className="flex items-start gap-3 mt-1 text-[0.8125rem] text-muted cursor-pointer">
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

      <button type="submit" className="btn btn-primary justify-center mt-2">
        Send me a quote
        <ArrowRight className="size-4" strokeWidth={2} />
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  uppercase,
}: {
  label: string
  name: string
  type?: 'text' | 'tel' | 'email' | 'textarea'
  placeholder?: string
  required?: boolean
  uppercase?: boolean
}) {
  const baseInput =
    'w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink ' +
    'placeholder:text-subtle/70 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors'

  return (
    <label className="block">
      <span className="block text-xs font-semibold text-ink uppercase tracking-[0.05em] mb-1.5">
        {label}
        {required && <span className="text-accent-bright"> *</span>}
      </span>
      {type === 'textarea' ? (
        <textarea name={name} rows={3} placeholder={placeholder} required={required} className={baseInput} />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          autoCapitalize={uppercase ? 'characters' : undefined}
          className={baseInput + (uppercase ? ' uppercase tracking-[0.04em] font-mono' : '')}
        />
      )}
    </label>
  )
}
