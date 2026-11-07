import { ChevronRight } from 'lucide-react'

export type FaqEntry = { q: string; a: string }

/** FAQPage JSON-LD for a list of questions. Render it alongside <SimpleFaq>. */
export function faqSchema(faqs: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Collapsible FAQ list, same look as the service and pricing pages. */
export default function SimpleFaq({ faqs }: { faqs: FaqEntry[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details key={f.q} className="group bg-surface border border-hairline rounded-xl p-5 md:p-6">
          <summary className="cursor-pointer font-semibold text-ink list-none flex justify-between items-start gap-4 text-[1.0625rem]">
            <span className="flex-1">{f.q}</span>
            <ChevronRight
              className="size-5 text-subtle shrink-0 mt-0.5 transition-transform group-open:rotate-90"
              strokeWidth={2}
            />
          </summary>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
