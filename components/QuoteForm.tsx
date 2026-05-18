import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { submitQuoteAction } from '@/app/actions'

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
      <Field label="Service required" name="service" type="select">
        <option>Brake repair</option>
        <option>Alternator or starter motor</option>
        <option>Radiator or water pump</option>
        <option>Logbook or general service</option>
        <option>Pre-purchase inspection</option>
        <option>Battery replacement</option>
        <option>Warning-light diagnostics</option>
        <option>Steering or suspension</option>
        <option>Emergency call-out</option>
        <option>Other (describe below)</option>
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Vehicle make" name="make" placeholder="e.g. Toyota" />
        <Field label="Vehicle year" name="year" placeholder="e.g. 2019" />
      </div>
      <Field label="Your suburb" name="suburb" placeholder="e.g. Sunnybank" required />
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your name" name="name" placeholder="First name" required />
        <Field label="Phone" name="phone" type="tel" placeholder="0400 000 000" required />
      </div>
      <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
      <Field
        label="What's happening with the car?"
        name="message"
        type="textarea"
        placeholder="e.g. Brake squeal when slowing down. Started a week ago."
      />
      <button type="submit" className="btn btn-primary justify-center mt-2">
        Send me a quote
        <ArrowRight className="size-4" strokeWidth={2} />
      </button>
      <p className="text-xs text-subtle text-center">
        By submitting you agree to our{' '}
        <Link href={"/privacy-policy/" as `/${string}`} className="underline">
          privacy policy
        </Link>
        . We don&apos;t share your details.
      </p>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  children,
}: {
  label: string
  name: string
  type?: 'text' | 'tel' | 'email' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  children?: React.ReactNode
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
      ) : type === 'select' ? (
        <select name={name} required={required} className={baseInput} defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {children}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={baseInput}
        />
      )}
    </label>
  )
}
