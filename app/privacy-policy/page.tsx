import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | My Mechanic QLD',
  description:
    'How My Mechanic QLD collects, uses and stores personal information when you visit our website or book a service.',
  alternates: { canonical: '/privacy-policy/' },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'May 2026'

const SITE_URL = 'https://www.mymechanicqld.com.au'

export default function PrivacyPolicyPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Privacy policy', item: `${SITE_URL}/privacy-policy/` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tighter mt-4">
            Privacy policy
          </h1>
          <p className="text-muted mt-4">Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <div className="prose-mmq">
            <p>
              My Mechanic QLD respects your privacy. This page explains what personal information we
              collect when you visit our website or book a service, how we use it, and the rights
              you have over it under Australian law.
            </p>

            <h2>1. Who we are</h2>
            <p>
              In this policy, &quot;we&quot;, &quot;our&quot; and &quot;us&quot; refer to My
              Mechanic QLD, a mobile mechanic business operating across South East Queensland. You
              can contact us on{' '}
              <a href="tel:0451159954">0451 159 954</a> or at{' '}
              <a href="mailto:contact@mymechanicqld.com.au">contact@mymechanicqld.com.au</a>.
            </p>

            <h2>2. What we collect</h2>
            <p>
              We collect only the information we need to quote, book and complete the service you
              ask us for.
            </p>
            <ul>
              <li>Your name, phone number and email address</li>
              <li>Your suburb or address, so we can come to you</li>
              <li>Details of your vehicle (make, model, year, registration where relevant)</li>
              <li>What you tell us about the symptoms or service required</li>
              <li>Preferred appointment time when you submit a quote request</li>
              <li>IP address and browser/user-agent string, captured automatically when you submit a form for security and spam-detection purposes</li>
              <li>Records of the work we have done for you, including dates, parts and prices</li>
              <li>Payment details when you settle an invoice (processed by a third-party payment provider; we do not store card numbers)</li>
            </ul>

            <h2>3. How we use it</h2>
            <p>
              We use your information to provide quotes, arrange appointments, complete repairs,
              issue invoices, follow up after a job, and meet our obligations under the Australian
              Consumer Law (for example, warranty records). We may use your email to send service
              reminders if you have asked for them.
            </p>
            <p>
              We do not sell your information. We do not share it with third parties for marketing.
            </p>

            <h2>4. When we share information</h2>
            <p>
              We share information only when it is needed to deliver the service or when the law
              requires it. The most common cases are:
            </p>
            <ul>
              <li>Parts suppliers, so we can order the correct part for your vehicle</li>
              <li>Our email and CRM providers, who store contact records on our behalf</li>
              <li>Government agencies or insurers, where we are legally required to disclose</li>
            </ul>
            <p>
              We do not currently process payments through the website. If you pay an invoice
              online in future, the payment would go through a PCI-compliant processor (such as
              Stripe or Square) and that processor — not us — handles your card details.
            </p>
            <p>All third-party providers we use are bound to keep your information confidential.</p>

            <h2>5. Cookies and website analytics</h2>
            <p>
              Our website uses cookies and similar tracking technologies (such as Google Analytics
              and Microsoft Clarity) to understand how visitors use the site. This helps us improve
              the site over time. The data collected is aggregated and does not identify individual
              users by name. You can disable cookies in your browser if you prefer.
            </p>
            <p>
              These providers store and process data outside Australia, typically in the United
              States. We rely on their contractual and certification commitments under Australian
              Privacy Principle 8.
            </p>

            <h2>6. How long we keep it</h2>
            <p>
              We keep your service records for at least seven years to meet the warranty,
              accounting and tax obligations of an Australian small business. After that, we delete
              or anonymise the records.
            </p>

            <h2>7. Your rights</h2>
            <p>
              Under the Privacy Act 1988 (Cth) and the Australian Privacy Principles, you have the
              right to:
            </p>
            <ul>
              <li>Ask what personal information we hold about you</li>
              <li>Ask us to correct or update it</li>
              <li>Ask us to delete it, where we are not required to keep it</li>
              <li>Make a complaint about how we have handled your information</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:contact@mymechanicqld.com.au">contact@mymechanicqld.com.au</a> or call{' '}
              <a href="tel:0451159954">0451 159 954</a>. If you are not satisfied with our response,
              you can make a complaint to the Office of the Australian Information Commissioner at{' '}
              <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">oaic.gov.au</a>.
            </p>

            <h2>8. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. The &quot;last updated&quot; date at the
              top of the page tells you when the most recent change was made. Material changes will
              be highlighted on this page.
            </p>

            <h2>9. Contact us</h2>
            <p>
              For any privacy question, email <a href="mailto:contact@mymechanicqld.com.au">contact@mymechanicqld.com.au</a>{' '}
              or call <a href="tel:0451159954">0451 159 954</a>.
            </p>

            <hr />
            <p>
              See also our{' '}
              <Link href={"/terms-conditions/" as `/${string}`}>Terms and conditions</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
