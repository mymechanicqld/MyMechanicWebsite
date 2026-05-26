# My Mechanic QLD — Business Profile

Source of truth for the website rebuild. Confirmed answers from the owner are captured below.

---

## 1. Identity

| Field | Value |
|---|---|
| Business name | **My Mechanic QLD** |
| Trading name | My Mechanic Qld |
| Owner / Director | TBD: confirm name (internal reference only, not displayed on site) |
| Year established | TBD: confirm founding year |
| Ownership type | Family-owned and operated |
| Business model | Mobile mechanic. We come to the customer's home, work or roadside. |
| Owner location | **Springwood, Logan** (used as the geographic anchor for service radius) |

## 2. Contact

| Channel | Value |
|---|---|
| Phone | **0451 159 954** |
| Email | **contact@mymechanicqld.com.au** |
| Trading hours | Monday to Friday 7am to 6pm. Saturday 8am to 5pm. Sunday closed. |
| Emergency / after-hours | TBD: confirm policy |
| Social media | TBD: confirm Facebook, Instagram, Google Business profile URLs |
| Registered business address | TBD: confirm (needed for LocalBusiness schema and Google Business Profile) |

## 3. Service area

**Confirmed by owner:** target Brisbane, Logan, Ipswich and the Gold Coast, within a **50 to 60 km radius of Springwood** (Southside of Brisbane).

That radius reaches:
- North as far as Sandgate, Aspley, Chermside, Nundah
- East to Wynnum, Cleveland, Capalaba
- West to Springfield, Goodna, Redbank Plains, Ipswich, Brassall
- South to Coomera, Helensvale, Nerang, Robina, Southport
- Within: all of Logan (Springwood, Beenleigh, Browns Plains, Loganholme), Mt Gravatt, Sunnybank, Carindale, Bulimba, Coorparoo, Toowong, Indooroopilly, Kelvin Grove, Forest Lake

**[RESOLVED] Full suburb list confirmed.** The owner selected 160 suburbs across 4 regions via the Firebase-backed suburb selector tool (`tools/service-areas.html`). Data is stored in Firebase (project: `website-6df83`, document: `settings/service-areas`) and exported to `content/suburbs.json`. Each suburb entry includes: slug, name, region, postcode, distance from Springwood base, estimated response time, and 4 nearest neighbours. All 160 suburbs now have dedicated landing pages, and 640 service × suburb pages are built (4 priority services × 160 suburbs).

## 4. Services we provide

The website will surface these services. Four of them are **SEO priorities** (the owner's stated "bread and butter"):

| # | Service | SEO priority | Notes |
|---|---|---|---|
| 1 | **Brake repair** | ★ Top priority | Pads, rotors, calipers, hydraulics. Owner's strongest revenue line. |
| 2 | **Alternator and starter motor replacement** | ★ Top priority | Won't-start diagnostics, charging fault repair, replacement. |
| 3 | **Radiator and water pump replacement** | ★ Top priority | Cooling system overhaul, overheating diagnosis, hoses, thermostats. |
| 4 | **General car servicing** (logbook + standard) | ★ Top priority | Manufacturer-spec scheduled service, warranty-safe logbook stamping. |
| 5 | Pre-purchase inspection | High | Independent inspection with written report. Bylined as a major service. |
| 6 | Battery replacement | Standard | Delivered and installed. Old battery recycled. |
| 7 | Warning-light diagnostics | Standard | OBD scan plus physical fault-finding. |
| 8 | Steering and suspension | Standard | Control arms, ball joints, shocks, bushes. |
| 9 | Emergency call-outs / breakdowns | Standard | Roadside response within the service radius. |

The four top-priority services should each get a dedicated, deep, ranking-grade landing page early in the content plan.

## 5. Services we do not provide (INTERNAL ONLY)

> **Do not list this section on the website.** The owner asked us to keep the public site focused on what we _do_ provide. This list exists only so that copywriters, the booking form's "service" dropdown, and FAQ content do not accidentally promise these.

The owner confirmed we do not offer:

- Air-conditioning services (regas, repair, replacement)
- Auto electrical work (wiring, ECU, accessories, fault repair beyond reading codes)
- DIY rescue jobs (fixing or finishing a repair the customer started themselves)
- Jobs where the customer supplies their own parts
- Trucks and trailers
- Heavy machinery
- Motorcycles
- Tyre fitting and tyre repair

Public copy should describe our scope positively (e.g., "We service cars, SUVs and light utes across South East Queensland") without naming exclusions.

## 6. Brand positioning

**Positioning statement (draft):**

> For South East Queensland drivers who don't have time to lose half a day at a workshop, My Mechanic QLD is a family-run mobile mechanic that brings dealership-grade servicing and 15+ years of hands-on experience to the customer's driveway, with fixed-price quotes and a 12-month warranty on every repair.

**Brand pillars:**

1. **Convenience without compromise.** Workshop quality at the customer's home or office.
2. **Fixed price.** The customer sees the full cost before we lift a spanner.
3. **Warranty-safe.** Qualified logbook servicing that protects new-car warranty under Australian Consumer Law.
4. **Local and accountable.** Family-run, owner-operated, not a national call centre.
5. **Technical credibility.** Dealership-grade scan tools and OEM-spec parts (Bosch, Bendix, Ryco, NGK, OEM filters).

**Voice and tone:**

- Confident but not boastful. No "#1 in QLD" hype.
- Plain English. No mechanic jargon unless we then explain it.
- Reassuring when the customer is stressed (they often are when their car has broken down).
- Specific over generic. Real models, real parts, real prices.
- Honest. Say what we do and stand behind it. Never overclaim.

**Voice rules for copywriters:**

- No em-dashes (—). Use full stops, commas, or restructure the sentence.
- No "Whether you're A, B, or C" constructions.
- No "Not just X, but Y" constructions.
- No "comprehensive", "seamless", "premium", "tailored" as filler adjectives. If we say "premium" we name the brand.
- Use first-person plural ("we", "our team") for the business voice. The owner's section uses first-person singular ("I").
- Australian spelling (tyre, kerb, organise).
- Prices in AUD with the $ sign and no decimals for round amounts.

## 7. Target audience

**Primary persona — busy professional, 30–55.**
Lives in suburban Brisbane, Logan or the Gold Coast. Two cars in the household, often an SUV plus a daily commuter. Books online, researches first, won't tolerate vague quotes. Time matters more than absolute lowest price.

**Secondary persona — time-poor parent.**
Juggling school runs and work. Cannot afford a day without the car. Cares about brakes, batteries and warranty compliance. Highly responsive to "we come to you".

**Tertiary persona — used-car buyer.**
Found a car on Facebook Marketplace or Carsales. Wants an independent inspection before paying. Price-sensitive but values an honest, detailed report.

## 8. Business goals (12 months)

| Goal | Target | How we measure |
|---|---|---|
| Organic traffic | 10× current baseline | Google Search Console sessions per month |
| Indexed pages | From ~52 today to 250+ | GSC Coverage report |
| Top-3 keyword rankings | 50+ keywords (priority services × suburbs) | Rank tracker |
| Web-sourced leads per month | TBD: baseline first, then double it | GA4 events + call tracking |
| Google review count | +50 reviews | Google Business Profile |
| Domain Rating | Build to DR 20+ | Ahrefs free Site Explorer |

## 9. SEO targeting

**The four priority services drive the SEO plan.** Each gets a hub page plus suburb-level landing pages.

### Priority service keywords

- mobile brake repair Brisbane / Logan / Ipswich / Gold Coast
- mobile alternator replacement Brisbane (and variants for starter motor)
- mobile radiator replacement Brisbane (and water pump variants)
- mobile car service Brisbane / mobile logbook service Brisbane

### Service × suburb keywords (programmatic)

Once the full suburb list is in hand, generate landing pages of the form:
`/services/{priority-service}/{suburb}/`

Targeting the 30+ suburbs already on the current site, plus any extras from the owner's pending suburb file.

### Long-tail content opportunities

- "How much does a brake job cost in Brisbane?"
- "What's the difference between brake pads and rotors?"
- "Signs your alternator is failing (and what it costs to replace)"
- "Why is my car overheating in stop-start traffic?"
- "How often should I get a logbook service in Australia?"
- "Mobile mechanic vs workshop — which is right for you?"
- "Pre-purchase inspection checklist before you buy a used car in QLD"

## 10. Trust signals to surface across the site

Currently underused on the live site. Every page should reach for at least one of these:

- Years trading (claim "15+ years dealership experience" — confirm with owner whether to state founding year as well).
- Owner is Cert III qualified (TBD: confirm exact qualifications and any industry memberships).
- Public liability insured (TBD: confirm cover amount).
- 12-month / 20,000km workmanship warranty on every repair.
- Real Google review count and average rating (TBD: pull current numbers).
- Brands of parts we use: Bosch, Bendix, Brembo (brakes); NGK (ignition); Ryco (filters); Penrite or Castrol (oil). Confirm with owner before going public.

## 11. Compliance and legal

- Australian Consumer Law compliance on quotes and warranties: yes.
- Privacy policy: existing page needs review against current Privacy Act guidance.
- Terms and conditions: existing page needs review.

## 12. Outstanding items needing the owner

1. ~~Full target-suburb list from his Microsoft account.~~ **[RESOLVED]** Owner selected 160 suburbs via Firebase tool. Exported to `content/suburbs.json`.
2. Founding year.
3. Owner name and short bio for the About page and blog bylines.
4. Photo of the owner (head-and-shoulders, navy work shirt, plus one wider shot beside his van).
5. Current Google review count and average rating (we will pull from the live GBP). Needed to uncomment `aggregateRating` in `app/layout.tsx` JSON-LD schema.
6. Indicative starting prices for the four priority services (used as price anchors on the service pages).
7. Preferred parts brands to name on the site.
8. Public liability cover amount and any industry memberships (MTAQ, IAME, etc.).
9. Facebook and Google Maps profile URLs. Needed to uncomment `sameAs` in `app/layout.tsx` JSON-LD schema.

## 13. Technical infrastructure completed

| Item | Status | Details |
|---|---|---|
| GA4 tracking | **Done** | Measurement ID `G-6YSECEQTDG` in `app/layout.tsx`. Configurable via `NEXT_PUBLIC_GA_ID` env var. |
| Sitemap | **Done** | `app/sitemap.ts` auto-generates ~830 URLs (static + services + suburbs + service-suburb + blog). |
| JSON-LD (site-wide) | **Done** | `LocalBusiness`/`AutoRepair` + `WebSite` with `SearchAction` in `app/layout.tsx`. |
| JSON-LD (per page) | **Done** | Suburb pages: `LocalBusiness` + `BreadcrumbList` + `FAQPage`. Service-suburb: `Service` + `BreadcrumbList` + `FAQPage`. Areas hub: `BreadcrumbList`. |
| 301 redirects | **Done** | `redirects.json` cleaned. Removed 27 suburb→/areas/ redirects (suburbs now have pages). Added slug/case fixes. |
| Suburb selector tool | **Done** | `tools/service-areas.html`. Firebase-backed, two-tab UI (edit + saved view). |
| Suburb data pipeline | **Done** | Firebase → `content/suburbs.json` → `lib/suburbs.ts` (typed, O(1) lookups). |
| 160 suburb pages | **Done** | `app/[slug]/page.tsx` + `components/SuburbPageContent.tsx`. |
| 640 service-suburb pages | **Done** | `app/[slug]/[suburb]/page.tsx`. 4 priority services × 160 suburbs. |
| Areas hub | **Done** | `app/areas/page.tsx`. All 160 suburbs as clickable links, organised by region. |
| GSC verification | **Done** | Verified via DNS method. Sitemap ready to submit. |
| Microsoft Clarity | Pending | Free heatmaps and session recordings. |
| GA4 conversion events | Pending | Form submission, phone click, quote request events to configure in GA4 admin. |
