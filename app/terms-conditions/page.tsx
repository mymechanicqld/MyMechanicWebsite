import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions | My Mechanic QLD',
  description:
    'Terms governing bookings, quotes, payments, cancellations and warranty for services provided by My Mechanic QLD.',
  alternates: { canonical: '/terms-conditions/' },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = 'May 2026'

const SITE_URL = 'https://www.mymechanicqld.com.au'

export default function TermsConditionsPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Terms and conditions', item: `${SITE_URL}/terms-conditions/` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="py-14 md:py-20 bg-gradient-to-b from-bg to-surface">
        <div className="container max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tighter mt-4">
            Terms and conditions
          </h1>
          <p className="text-muted mt-4">Last updated {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <div className="prose-mmq">
            <p>
              These terms apply when you book a service or repair with My Mechanic QLD. By making a
              booking you agree to them. They sit alongside, and do not limit, your rights under the
              Australian Consumer Law.
            </p>

            <h2>1. Services we offer</h2>
            <p>
              We provide mobile mechanical services for cars, SUVs and light utes across Brisbane,
              Logan, Ipswich and the northern Gold Coast. The full list of services is on our{' '}
              <Link href={"/services/" as `/${string}`}>services page</Link>. We do not work on
              vehicles or work scopes outside that list.
            </p>

            <h2>2. Quotes and pricing</h2>
            <p>
              We provide a fixed-price quote before any work begins. The quote covers the parts,
              labour and fluids needed for the specific job described, including a road test where
              relevant. Quotes are valid for 14 days unless otherwise stated.
            </p>
            <p>
              If, during the job, we identify additional work that is needed or recommended, we
              will stop, contact you, and issue a separate fixed-price quote for that work. We do
              not add unapproved work to your invoice.
            </p>

            <h2>3. Bookings and access</h2>
            <p>
              When you book, we agree a date, time window and location with you. We need:
            </p>
            <ul>
              <li>Safe, legal access to the vehicle (we do not jack up cars on a slope or unstable surface)</li>
              <li>Sufficient working room around the vehicle (typically a driveway, garage or off-street park)</li>
              <li>Mains power or sufficient battery in the vehicle if required by the job</li>
            </ul>
            <p>
              If conditions on the day are unsafe (extreme weather, unsafe surface, unsafe traffic),
              we may reschedule the job at no cost to you.
            </p>

            <h2>4. Cancellations and rescheduling</h2>
            <p>
              You can reschedule or cancel a booking at no cost up to 24 hours before the scheduled
              time. Cancellations within 24 hours may incur a $50 administration fee to cover van
              preparation and lost slot time. We will always try to work with you to reschedule
              instead. Nothing in this clause affects your rights under the Australian Consumer
              Law.
            </p>

            <h2>5. Payment</h2>
            <p>
              Payment is due on completion of the work, by tap card, bank transfer, or emailed
              invoice (terms agreed in advance). We issue an itemised invoice to your email after
              every job. We do not store card details; payments are processed by a third-party
              provider.
            </p>

            <h2>6. Warranty</h2>
            <p>
              We back our work with a workmanship warranty per these terms. If something we fitted
              or fixed fails due to faulty workmanship within the warranty period set out on your
              invoice, we return and put it right at no cost to you. The applicable
              workmanship-warranty period is printed on every invoice and varies by job type.
            </p>
            <p>
              Parts we fit carry their own manufacturer warranty (duration and process vary by part).
              Warranties commence after full payment of the relevant invoice. We handle the claim
              with the manufacturer where applicable.
            </p>
            <p>The workmanship warranty does not cover:</p>
            <ul>
              <li>Damage caused by accidents, misuse or modifications after our work</li>
              <li>Failures caused by the customer continuing to drive a vehicle we recommended not to</li>
              <li>Wear-and-tear on consumable parts (brake pads, filters, fluids) beyond their expected service life</li>
              <li>Pre-existing faults that we did not work on</li>
            </ul>

            <h2>7. Customer-supplied parts</h2>
            <p>
              We do not fit parts supplied by the customer. We fit only parts we have sourced or
              recommended, so the workmanship warranty can apply end-to-end.
            </p>

            <h2>8. Pre-purchase inspections</h2>
            <p>
              A pre-purchase inspection is a visual and diagnostic snapshot of a vehicle at a point
              in time. It is not a guarantee of the vehicle&apos;s future condition. We report on
              what we observe and test on the day. Hidden faults that only emerge later, or faults
              that develop after the inspection, are outside the scope of the inspection report.
            </p>

            <h2>9. Australian Consumer Law</h2>
            <p>
              Our services come with guarantees that cannot be excluded under the Australian
              Consumer Law. You are entitled to a replacement or refund for a major failure and
              compensation for any other reasonably foreseeable loss or damage. You are also
              entitled to have the services remedied if the services are not of acceptable quality
              and the failure does not amount to a major failure.
            </p>

            <h2>10. Liability</h2>
            <p>
              Nothing in this clause limits any liability that cannot be limited under the
              Australian Consumer Law. Subject to that, our liability for any service is limited to
              the amount paid for those services. We are not liable for indirect or consequential
              loss.
            </p>

            <h2>11. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. The version that applies to your booking
              is the version in force on the date you made the booking.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about these terms? Email{' '}
              <a href="mailto:contact@mymechanicqld.com.au">contact@mymechanicqld.com.au</a> or call{' '}
              <a href="tel:0451159954">0451 159 954</a>.
            </p>

            <hr />
            <p>
              See also our <Link href={"/privacy-policy/" as `/${string}`}>Privacy policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
