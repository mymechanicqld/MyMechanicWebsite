# Content and SEO Strategy

How we win organic traffic over the next twelve months. Designed to scale to 300+ indexed URLs without thin-content risk.

---

## The thesis

The competitor (Auto King) outranks us on **content volume**, not technical SEO. Their sitemap holds ~768 URLs to our 52. They have hundreds of long-form articles built up over fifteen years. Our advantages (cleaner technical SEO, real suburb landing pages, faster modern stack) are wasted without content on top of them.

The fix is to publish more good content, better structured, faster than they ever did.

---

## What we focus the SEO push on

The owner is clearest on his "bread and butter" services. Those are the four lines that pay the bills and where every available SEO dollar should land first.

| Priority service | SEO weight | Service hub URL | Suburb landing page pattern |
|---|---|---|---|
| Brake repair | ★ Top | `/brake-repairs/` | `/brake-repairs/{suburb}/` |
| Alternator and starter motor | ★ Top | `/starter-alternator/` | `/starter-alternator/{suburb}/` |
| Radiator and water pump | ★ Top | `/radiator-cooling-system/` | `/radiator-cooling-system/{suburb}/` |
| General car servicing | ★ Top | `/servicing/` | `/servicing/{suburb}/` |
| Pre-purchase inspection | High | `/pre-purchase-inspection/` | `/pre-purchase-inspection/{suburb}/` |

Secondary services (battery, diagnostics, steering and suspension, emergency call-outs) get hub pages but not the full suburb roll-out at launch.

---

## Service area

The owner lives in Springwood and works within a **50 to 60 km radius**. That defines our geographic content strategy.

Coverage anchors:

- **Brisbane** (Northside, Southside, Bayside, inner west)
- **Logan** (the home base, fastest response times)
- **Ipswich** (including Springfield, Goodna, Redbank Plains)
- **Gold Coast** (northern GC — Coomera, Helensvale, Southport, Robina, Nerang)

**[RESOLVED]** The owner selected 160 suburbs via the Firebase-backed suburb selector tool (`tools/service-areas.html`). The full list is stored in Firebase (project: `website-6df83`, doc: `settings/service-areas`) and exported to `content/suburbs.json`. All 160 suburbs now have dedicated pages.

---

## Site architecture: nav structure mirrors the competitor

Auto King's nav (Home · Roadworthy Certificate · Pre Purchase Inspections · Repairs · Servicing · Contact · More) works for a reason. We adopt a similar shape, leaving out services we do not offer.

### Top navigation (final structure)

| Item | URL | Contents |
|---|---|---|
| Home | `/` | Homepage |
| Repairs | `/services/` | Existing services hub. Surfaces brake repair, alternator and starter, radiator and water pump, steering and suspension, batteries, diagnostics, emergency. |
| Servicing | `/servicing/` | Hub. Logbook servicing · General service |
| Pre-Purchase Inspections | `/pre-purchase-inspection/` | Single service landing |
| Locations | `/locations/` | Hub. Brisbane · Logan · Ipswich · Gold Coast, plus the suburb pages |
| About | `/about/` | Owner story, qualifications, the team |
| Contact | `/contact/` | Phone, email, hours, contact form |

### Secondary navigation (footer + utility links)

- Blog (`/blog/`) — accessed from the footer and from each service hub's sidebar.
- FAQ (`/faq/`) — footer.
- Book a service (`/book/`) — surfaces as the primary CTA in the header, not as a nav item.
- Privacy policy and terms — footer only.

### Pillar / cluster model

Each priority service has a pillar plus supporting blog content.

| Pillar | Cluster examples (blog posts) |
|---|---|
| Brake repair guide | Signs your brakes need replacing · Brake pad vs rotor wear · How much do brakes cost in Brisbane |
| Alternator and starter motor | Why your car cranks slow · Battery vs alternator vs starter (diagnosing won't-start) · How long does an alternator last |
| Radiator and water pump | Why your car overheats in summer traffic · How to spot a coolant leak · When to replace a water pump |
| General car servicing | Logbook servicing explained · How often should you service your car · Does a mobile mechanic void your warranty (port and improve) |

Every cluster post links **up** to its pillar. Every pillar links **down** to all its clusters. Every service hub links to relevant clusters and to the suburb landing pages where that service is offered.

---

## Blog categories (five)

| Category | URL | Purpose |
|---|---|---|
| Car care guides | `/blog/car-care/` | Maintenance and longevity content |
| Services explained | `/blog/services-explained/` | What each service involves and what it costs |
| Local guides | `/blog/local/` | Suburb and regional content for local SEO |
| DIY tips | `/blog/diy/` | Light DIY content that captures intent |
| Buying guides | `/blog/buying/` | Used-car buyer education |

Each category has its own indexable hub with a 300+ word category description, featured pillar, and latest posts.

---

## Launch backlog: first thirty posts

Prioritised against the four SEO priorities, ease of writing, and likely impact.

### Wave 1 (publish by launch — 10 posts)

1. Does a mobile mechanic void your new-car warranty? _(rewrite the existing post)_
2. How much does a brake job cost in Brisbane in 2026? _(brake pillar)_
3. Battery, alternator or starter motor: how to tell what's killing your battery
4. Why is my car overheating in stop-start traffic?
5. Logbook servicing explained: what's actually in your book
6. Brake pads vs rotors: which one is making the noise?
7. Signs the alternator is on the way out
8. Pre-purchase inspection checklist: 28 things we look for
9. How often should you service your car in Australia?
10. Mobile mechanic vs workshop: when each one wins

### Wave 2 (launch + 60 days — 10 posts)

11. When to replace a water pump (and what it really costs)
12. Brake fluid: why it matters and when to flush it
13. How long does a logbook service take?
14. Slow cranking in the morning: a step-by-step diagnostic
15. The cooling system, demystified: radiator, thermostat, hoses, water pump
16. Brake repair costs: pads, rotors, calipers, fluid — what each one means
17. Things to check before a road trip from Brisbane
18. How Queensland heat ruins batteries (and how to extend yours)
19. What a fail-to-start fault code actually means
20. Used-car buying in Queensland: what we find at pre-purchase inspections

### Wave 3 (launch + 120 days — 10 posts)

21. CV joints clicking on lock: causes and repair costs
22. Suspension noises decoded: clunks, knocks, rattles
23. Diesel vs petrol maintenance costs in Queensland
24. Should you really pay for premium fuel?
25. Why your check-engine light keeps coming back on
26. Pre-purchase inspection: what we found on a $30k Hilux
27. Common roadworthy failures in Queensland (and how to avoid them)
28. SUV buyer's guide for Queensland families
29. Servicing intervals by make: Toyota, Mazda, Hyundai, Ford
30. How to extend the life of your brakes (driving habits that matter)

After Wave 3, write what Search Console queries say is already working. Use real data over guesses.

---

## Programmatic SEO: service × suburb

The volume play, built carefully so it does not look thin.

**Pattern:** `/{service-slug}/{suburb}/`, where `{service-slug}` matches the existing flat service URL on `mymechanicqld.com.au` (`/brake-repairs/`, `/starter-alternator/`, `/radiator-cooling-system/`, `/logbook-servicing/`) and `{suburb}` matches the flat suburb URL (`/sunnybank/`, `/carindale/`, etc.).

**Examples:** `/brake-repairs/sunnybank/`, `/starter-alternator/carindale/`, `/logbook-servicing/coomera/`.

### Current status: BUILT

**640 service × suburb pages** are live (4 priority services × 160 suburbs). Implemented in `app/[slug]/[suburb]/page.tsx` with `generateStaticParams`.

Each page includes:
- Service-specific hero with suburb name and service description.
- Detailed service explanation tailored per service type.
- Service-specific FAQ block (4-5 unique questions) with `FAQPage` JSON-LD schema, answers referencing suburb distance and response time.
- Cross-links to other priority services in the same suburb.
- Cross-links to the same service in 4 nearby suburbs.
- Internal links to parent service hub and parent suburb page.
- JSON-LD: `Service` (with suburb-specific `areaServed`), `BreadcrumbList`, `FAQPage`.

**Additionally, 160 standalone suburb pages** are built at `/{suburb}/` (e.g. `/sunnybank/`). Each includes an 8-service grid, local context section, trust signals, FAQ, nearby suburb links, and full JSON-LD.

**Quality bar per page:**

- Service-specific FAQ block (4–6 questions) with `FAQPage` schema.
- Internal links to: parent service hub, parent suburb hub, nearby suburbs.
- Suburb-specific data: distance from Springwood base, estimated response time, postcode, 4 nearest neighbours.

**Roll-out status:**

| Milestone | Status | Pages |
|---|---|---|
| 160 suburb pages | **DONE** | 160 |
| 4 priority services × 160 suburbs | **DONE** | 640 |
| Total programmatic pages | **DONE** | 800 |
| Total site pages (incl. static, service, blog) | **DONE** | ~843 |

All pages ship at launch. The original 6-month roll-out timeline has been superseded.

---

## Internal linking rules

1. **Every service hub** links to all suburb pages where that service is offered, two related blog posts, two related services, and the booking page.
2. **Every suburb page** links to all four priority services, the parent region hub, three nearby suburbs, and one blog post.
3. **Every blog post** links to two service hubs (with descriptive anchor text), one suburb page when geographically relevant, and the parent pillar.
4. **Every pillar** links to every cluster post and to the relevant service hub.
5. **No orphans.** A CI lint job parses the MDX, builds a link graph, and fails if any published URL has fewer than two inbound links from elsewhere in the site.
6. **Anchor text** is descriptive, varied, and matches the destination's H1 topic. Never "click here" or "read more".

---

## Schema strategy

| Page type | JSON-LD |
|---|---|
| Homepage | `LocalBusiness`, `Organization`, `WebSite` (with `SearchAction`) |
| Service hub | `Service`, `FAQPage`, `BreadcrumbList` |
| Suburb page | `LocalBusiness` (with `areaServed`), `BreadcrumbList` |
| Service × suburb page | All of the above |
| Blog post | `BlogPosting`, `Person` (author), `BreadcrumbList` |
| Pillar guide | `Article`, `BreadcrumbList` |
| About | `AboutPage`, `Organization` |
| Contact | `ContactPage`, `LocalBusiness` |
| Reviews | `AggregateRating`, `Review` (only with real, verifiable reviews) |

Never fake reviews in schema. Pull `AggregateRating` from the live Google Business Profile.

---

## E-E-A-T (Experience, Expertise, Authority, Trust)

Underbuilt on the live site, and the single biggest differentiator we can capture.

- **Owner byline** on every blog post and pillar. Photo plus a short bio listing qualifications and years in the trade.
- **About page** leads with the owner story (the founder section is the heart of the site).
- **Service pages** quote real numbers: "We've done over four hundred brake jobs on the Toyota Hilux alone."
- **Customer reviews** show real first names, suburb, and date.
- **External validation:** Google Business Profile rating displayed, any industry memberships (MTAQ etc.) listed once verified.
- **Date stamps** on every blog post: `datePublished` and `dateUpdated`. Bump the updated date when content is refreshed.

---

## Measurement

A simple monthly spreadsheet. Owner-facing.

| Metric | Source | Month-12 target |
|---|---|---|
| Organic sessions | GA4 | 10× baseline |
| Indexed pages | GSC Coverage | 250+ (843 pages in sitemap at launch) |
| Top-3 ranking keywords | Rank tracker | 50+ |
| Top-10 ranking keywords | Rank tracker | 200+ |
| Average position (sitewide) | GSC | < 20 |
| Sitewide CTR | GSC | > 4% |
| Form submissions | GA4 event | TBD baseline first |
| Phone clicks (mobile) | GA4 event | TBD baseline first |
| New Google reviews | GBP | +50 |
| Domain Rating | Ahrefs free | 20+ |
