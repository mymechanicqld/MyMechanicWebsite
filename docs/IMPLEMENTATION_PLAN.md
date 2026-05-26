# Implementation Plan

Staged plan from discovery to launch and ongoing SEO. Every stage lists deliverables and an acceptance bar before moving on. The information architecture mirrors the competitor's, which is proven to work in this category.

---

## Stage 0 — Foundations (in flight)

**Goal:** Lock the business profile, content audit, design direction and image specs before a line of code is written.

**Deliverables**
- [x] Competitor crawl and analysis ([crawl/](../crawl/))
- [x] [BUSINESS.md](BUSINESS.md), updated with the owner's confirmed answers
- [x] [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md) with the priority services and nav structure
- [x] [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)
- [x] [IMAGES.json](IMAGES.json)
- [x] Three homepage concepts in [`concepts/`](../concepts/)
- [ ] Owner picks one homepage concept and provides the outstanding items at the bottom of [BUSINESS.md](BUSINESS.md#12-outstanding-items-needing-the-owner)

**Acceptance:** Outstanding owner items resolved. One homepage concept chosen.

---

## Stage 1 — Brand assets, photography and images

**Goal:** Every image the new site will use is on disk, named, and optimised before the build starts.

**Deliverables**

1. **Scrape the live site.** `scrape_images.py` (in the repo root) refetches every page from the existing crawl, extracts every `<img>`, `srcset`, `data-src` and `background-image`, and downloads the lot into `scraped-images/`. Produces `scraped-images/manifest.json` (every unique image with usage map) and `scraped-images/by-page.json` (images grouped by page slug).
2. **Triage the scraped set.** Open the manifest. Drop obvious junk (tracking pixels, Wix system icons, anything under ~20KB that isn't a logo). Keep the high-resolution variants of duplicates. Flag images we want to keep using as-is on the new site, and images we want to replace.
3. **Logo refinement.** Audit the current logo from the scraped set. Redraw as SVG with variants (full colour, single colour, white-on-dark, favicon, social square).
4. **Owner photography.** A short photo session with the owner: head-and-shoulders portrait, wider shot next to the van, action shot on a job. This is non-negotiable. The owner section anchors the site.
5. **Fill the gaps with AI.** Anywhere the scraped set doesn't have a usable image for a page or section, generate one from the relevant prompt in [IMAGES.json](IMAGES.json). Every prompt contains "photorealistic".
6. **Optimisation pass.** Resize to spec, compress to WebP plus JPG fallback, strip EXIF.
7. **Stock fallback.** Any AI image that fails the photorealism bar gets replaced with a licensed Unsplash or Pexels shot, and the manifest is updated.
8. **OG share image template.** A 1200×630 background plus a programmatic title overlay applied per page.

**Acceptance:** Every page in the new sitemap has a usable, optimised image (scraped, AI or stock) under 200KB sitting at a known local path.

---

## Stage 2 — Information architecture

**Goal:** Final URL structure, sitemap and wireframes for every page type. Mirrors the competitor's nav at the top level.

**Final top navigation**

```
Home (logo)  ·  Repairs  ·  Servicing  ·  Pre-Purchase Inspections  ·  Locations  ·  About  ·  Contact   [Phone CTA]
```

**Final URL structure (preserve existing URLs from `mymechanicqld.com.au`)**

The existing site already ranks for several of these slugs. We keep them as-is to preserve any link equity and avoid a mass-redirect operation on launch day. New pages slot in alongside.

```
/                                              Homepage
/services/                                     Services hub (existing)

# Service pages — flat, exactly as the existing site has them indexed
/brake-repairs/                                ★ SEO priority (existing)
/starter-alternator/                           ★ SEO priority (existing)
/radiator-cooling-system/                      ★ SEO priority (existing)
/logbook-servicing/                            ★ SEO priority (existing)
/pre-purchase-inspection/                      (existing)
/battery-replacement/                          (existing)
/car-diagnostics/                              (existing)
/steering-suspension/                          (existing)

# Region + suburb pages — flat URLs preserved from existing site
/areas/                                        Areas hub (links to all 160 suburbs)
/brisbane/, /logan/, /ipswich/, /gold-coast/   301 → /areas/ (region hubs consolidated)
/{suburb}/                                     160 dedicated suburb pages (e.g. /sunnybank/, /carindale/)
                                               Full list in content/suburbs.json, sourced from Firebase

# Programmatic SEO — new, nested under each priority service
/brake-repairs/{suburb}/                       e.g. /brake-repairs/sunnybank/
/starter-alternator/{suburb}/                  e.g. /starter-alternator/carindale/
/radiator-cooling-system/{suburb}/             e.g. /radiator-cooling-system/springfield/
/logbook-servicing/{suburb}/                   e.g. /logbook-servicing/coomera/

# Stronger-than-Auto-King pages — new (see Stage 4.5)
/pricing/                                      Transparent starting prices
/warranty/                                     The 12-month workmanship warranty, spelled out
/how-it-works/                                 Visual booking-and-service walkthrough
/case-studies/                                 "What we found" series for pre-purchase inspections
/mobile-vs-workshop/                           Pillar comparison content
/check-coverage/                               Postcode lookup confirming we cover the area
/toyota-mechanic/, /mazda-service/,            Make-specific landing pages (programmatic)
  /ford-ranger/, /hilux-service/, ...

# Standard
/about/                                        Owner story, qualifications, team
/contact/                                      Phone, email, hours, form, map
/faq/                                          FAQ page (FAQPage schema)
/book/                                         Quote / booking
/blog/                                         Blog index
/blog/{slug}/                                  Individual posts (flat slug, no /category/ in URL)
/privacy-policy/, /terms-conditions/           Existing copy ported

# Decommission
/home-old                                      Existing site has this. Delete and 301 to /.
```

**Why flat URLs for services and suburbs.** The existing live site indexes `/brake-repairs/` and `/sunnybank/`, not `/repairs/brake-repair/` and `/locations/brisbane/sunnybank/`. Switching slugs would burn whatever existing rankings the site holds. Programmatic service-by-suburb pages get a sensible new nesting (`/brake-repairs/sunnybank/`) which does not conflict with anything currently indexed.

**Page-type wireframes (low-fi)**

- Homepage
- Service hub (Repairs, Servicing)
- Single service page (the four priority services use one template)
- Suburb page
- Service × suburb page
- Blog post
- Category index
- About, Contact, FAQ

**Component inventory**

`Header`, `MobileNav`, `Footer`, `Button`, `Section`, `EyebrowLabel`, `PriceAnchor`, `ServiceCard`, `SuburbCard`, `RegionCard`, `TestimonialQuote`, `FoundersNote`, `BookingForm`, `QuickQuoteForm`, `FAQAccordion`, `BlogCard`, `BreadcrumbTrail`, `CtaBanner`, `TrustStrip`, `LucideIcon`.

**Acceptance:** Wireframes signed off. Sitemap finalised.

---

## Stage 3 — Tech setup and component library

**Goal:** Working Next.js skeleton with the design system encoded, before any real pages exist.

1. **Repo init.** Next.js 15 (App Router) + TypeScript + Tailwind. ESLint, Prettier, Husky.
2. **Vercel project.** Auto-deploy on `main`, preview deploys on PRs.
3. **Tailwind config** driven by `DESIGN_SYSTEM.md`: colour tokens, font scale, spacing, breakpoints, radii.
4. **Lucide icons** via `lucide-react` (the npm package, not the CDN — we want SSR-friendly SVGs).
5. **Component library** under `/components/`, every component documented in a `/_dev/components` route or Storybook.
6. **MDX setup** with `@next/mdx`, frontmatter parsing, reading-time, TOC extraction.
7. **SEO primitives.** `<Metadata>` helper, OG image generator (`next/og`), JSON-LD `<Script>` injector.

**Acceptance:** Vercel preview live. Every component in the inventory has a Storybook entry. CI green.

---

## Stage 4 — Homepage and static pages

**Goal:** Build the chosen homepage concept and every non-templated page.

1. **Homepage** — the chosen concept implemented in React.
2. **About** — owner story, qualifications, the team.
3. **Contact** — phone, email, hours, embedded map, contact form.
4. **FAQ** — `FAQPage` schema.
5. **Services hub** (`/services/`).
6. **Areas hub** (`/areas/`).
7. **Booking page** (`/book/`) — **[DONE]** Redesigned quote/booking form with 4 grouped sections (Your details, Vehicle, Additional details, Appointment). Service dropdown (10 options matching the 9 offered services + "Not sure"), car make, date picker, time-window radio cards. Same form component used on homepage (`/#quote`), `/book/`, and `/contact/`. Backend: server action parses all fields, inserts into Supabase `quote_submissions`, sends branded HTML notification email via Resend. Redirect-to-originating-page (whitelist-validated). Migration `20260526_004_form_redesign.sql` adds `preferred_date` column.
8. **Privacy and T&Cs** — port existing copy, reformat.
9. **404 and 500** — branded, with route suggestions.

Each page hits:

- Lighthouse: Performance ≥ 90, Accessibility 100, SEO 100, Best Practices ≥ 95.
- Unique `<title>`, meta description, canonical, OG, JSON-LD.
- Mobile-responsive at 360, 768, 1024, 1440 widths.

**Acceptance:** Owner walks every page on Vercel preview and signs off.

---

## Stage 4.5 — Pages that beat the competitor

**Goal:** Ship pages Auto King doesn't have, in areas where we can credibly win.

The reasoning behind each one:

### 1. Pricing page (`/pricing/`)

Auto King's headline message is "we will beat any price", but they don't show any prices. We can list real starting prices for the four priority services and the pre-purchase inspection. Customers searching "brake repair cost Brisbane" land here. Trust signal plus a high-intent SEO target.

**Contains:** A table with starting prices for brake repair, alternator and starter, radiator and water pump, logbook servicing, pre-purchase inspection. A short paragraph explaining when extra cost might apply. A "get a fixed-price quote" CTA.

### 2. Warranty page (`/warranty/`)

The 12-month, 20,000 km workmanship warranty is one of our strongest trust signals. Auto King's site barely mentions warranty. A dedicated page explains exactly what's covered, what's not, and how to claim. Excellent E-E-A-T signal.

**Contains:** Plain-English explanation of the warranty terms, what's covered, what's not, how to claim, parts-vs-workmanship distinction, statutory rights under the Australian Consumer Law.

### 3. How it works (`/how-it-works/`)

Mobile mechanics are still unfamiliar to a chunk of the audience. A visual walkthrough of the booking-to-finished process reduces hesitancy. Auto King has nothing equivalent. Strong conversion driver.

**Contains:** Six step screenshots: book online, get quote, confirm time, mechanic arrives, work done, drive away. Real photos. FAQ at the bottom.

### 4. Case studies (`/case-studies/`)

The "what we found" series, mostly pre-purchase inspection stories. Real cars, real findings, real outcomes. E-E-A-T gold. Drives high-intent traffic for "is this car a lemon" queries. Auto King has nothing like this.

**Contains:** Index of case studies. Each case is its own page (`/case-studies/{slug}/`) with photos, the customer's situation, what we found, the outcome.

### 5. Mobile vs workshop (`/mobile-vs-workshop/`)

A genuine comparison pillar page. Honest about when a workshop is better (engine-out work, alignments, panel beating) — which lets us be more credible about when we're better. Auto King has a thin blog post on this; we'll have the definitive page.

**Contains:** Comparison table, four real scenarios, when to pick each, FAQ.

### 6. Coverage checker (`/check-coverage/`)

Postcode lookup. The user types in their suburb or postcode and we tell them yes, no, or "borderline, call us". Removes the most common reason a prospect bounces (not sure they cover my area). Auto King has a static list of suburbs.

**Contains:** Single input, instant result, embedded CTAs.

### 7. Make-specific service pages

Programmatic, one per popular make: `/toyota-mechanic/`, `/mazda-service/`, `/ford-ranger/`, `/hilux-service/`, `/holden/`, `/hyundai/`, `/mitsubishi/`. Each captures search intent for "Toyota mechanic Brisbane" etc.

**Contains per page:** Brand-specific service intervals, common issues we see, what we charge for that brand's logbook service, real examples. 800+ unique words per page.

**Roll-out:** ship Pricing, Warranty, How it works in Stage 4. Add Case studies, Mobile-vs-workshop, Coverage checker and the first three make-specific pages in Stage 4.5. Remaining make-specific pages roll out in Stage 9.

---

## Stage 5 — Service pages, suburb pages, programmatic SEO (the backbone)

**Goal:** Build out the templated service and suburb pages — both the existing flat URLs and the new programmatic service × suburb pages. This is where ranking volume comes from.

1. **Service page template.** Data-driven from `/content/services/{slug}.mdx`. Used by all eight existing service URLs (`/brake-repairs/`, `/starter-alternator/`, `/radiator-cooling-system/`, `/logbook-servicing/`, `/pre-purchase-inspection/`, `/battery-replacement/`, `/car-diagnostics/`, `/steering-suspension/`). Includes hero, "what's included", price anchor, process, FAQ, suburbs serviced, related services, JSON-LD (`Service` + `FAQPage` + `BreadcrumbList`).
2. ~~**Suburb page template.** Data-driven from `/content/suburbs/{slug}.mdx`. Used by all 30+ existing flat suburb URLs.~~ **[DONE]** **160 suburb pages built.** Data-driven from `content/suburbs.json` (fetched from Firebase). Handled by `app/[slug]/page.tsx` (shared route with service pages) and `components/SuburbPageContent.tsx`. Each page includes: hero, 8-service grid, local context, trust signals, FAQ (5 questions with suburb-specific data), nearby suburbs cross-links, CTA. JSON-LD: `LocalBusiness` with `areaServed`, `BreadcrumbList`, `FAQPage`.
3. ~~**Service × suburb template.** Lives at `/{service-slug}/{suburb-slug}/`.~~ **[DONE]** **640 service × suburb pages built** (4 priority services × 160 suburbs). Handled by `app/[slug]/[suburb]/page.tsx`. Each page includes: service-specific hero, detailed service description, suburb-specific FAQ (4-5 unique questions per service type), cross-links to other priority services in same suburb, cross-links to same service in nearby suburbs. JSON-LD: `Service` with suburb-specific `areaServed`, `BreadcrumbList`, `FAQPage`.
4. **Region hubs** at `/brisbane/`, `/logan/`, `/ipswich/`, `/gold-coast/` — these redirect to `/areas/` which now serves as the unified region hub with all 160 suburbs displayed as clickable links, organised by region.
5. **Make-specific pages** at `/toyota-mechanic/`, `/mazda-service/`, etc. — same template as the service pages, slightly different copy emphasis.

**Data pipeline.** Owner selects suburbs via `tools/service-areas.html` (Firebase-backed). Suburbs exported to `content/suburbs.json` with metadata (slug, region, postcode, distance from base, response time, 4 nearest neighbours). `lib/suburbs.ts` provides typed access with O(1) lookups.

**Routing.** Both service and suburb pages share the `app/[slug]/page.tsx` dynamic route. The component checks for a service match first, then a suburb match, then returns `notFound()`. `generateStaticParams` returns all 168 slugs (8 services + 160 suburbs).

**Roll-out status.** All 160 suburbs and 640 service-suburb pages ship at launch. Total: 843 static pages generated on first successful build.

**Acceptance.** Every templated page passes Lighthouse and a custom duplication-detection script that fails if any page shares more than 60% of its body with another page.

---

## Stage 6 — Blog engine plus first ten posts

**Goal:** A working blog with categories, related posts, owner byline, and the launch backlog published.

1. **Blog architecture** per [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md). MDX with frontmatter (title, description, category, tags, author, datePublished, dateUpdated, heroImage, readingTime).
2. **Owner author profile** with photo, bio, qualifications. Bylined on every post.
3. **Related posts** by category and tag overlap.
4. **Reading time** auto-calculated.
5. **Table of contents** auto-generated from H2/H3.
6. **JSON-LD** (`BlogPosting`, `Person`, `BreadcrumbList`).
7. **First ten posts** from the Wave 1 list in [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md), each 1,200–2,000 words, owner-bylined, with hero image, linking to at least two service hubs and one suburb page.

**Acceptance:** Blog index live, ten posts published, each linked from at least one service page.

---

## Stage 7 — SEO infrastructure and analytics

**Goal:** Everything Google needs to crawl, index and rank, plus everything we need to measure.

1. ~~`sitemap.xml`, segmented (pages, services, suburbs, blog), submitted to GSC.~~ **[DONE]** `app/sitemap.ts` auto-discovers all pages at build time. Segments: static pages (17), service pages (8), suburb pages (160), service × suburb pages (640), blog index + posts. ~830 URLs total. Submit `https://www.mymechanicqld.com.au/sitemap.xml` in GSC.
2. `robots.txt`, allow all, pointing to the sitemap.
3. ~~**301 redirect map** from every URL on the existing Wix site to the new URL.~~ **[DONE]** `redirects.json` cleaned up. Removed 27 suburb-to-`/areas/` redirects that were destroying SEO equity (those suburbs now have dedicated pages). Kept region redirects (`/brisbane/`, `/logan/`, `/ipswich/`, `/gold-coast/` → `/areas/`). Added `/mt-gravatt` → `/mount-gravatt/` and `/Wynnum` → `/wynnum/` for slug/case fixes. `/redcliffe` → `/areas/` kept (owner deselected Redcliffe).
4. **Canonical URLs** on every page.
5. ~~**JSON-LD coverage** as listed in [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md#schema-strategy).~~ **[DONE]** Site-wide `LocalBusiness`/`AutoRepair` + `WebSite` in `app/layout.tsx`. Per-page schemas: suburb pages get `LocalBusiness` + `BreadcrumbList` + `FAQPage`; service-suburb pages get `Service` + `BreadcrumbList` + `FAQPage`; areas hub gets `BreadcrumbList`.
6. **Open Graph and Twitter Card** on every page.
7. **Google Search Console** verified (DNS method). Sitemap ready to submit.
8. ~~**GA4** with conversion events.~~ **[DONE]** GA4 installed in `app/layout.tsx` via `next/script` with `afterInteractive` strategy. Measurement ID: `G-6YSECEQTDG` (configurable via `NEXT_PUBLIC_GA_ID` env var). Conversion events (form submission, phone click, quote request) to be configured in GA4 admin.
9. **Google Business Profile** brought in line with the new site (description, services, photos, posts).
10. **Microsoft Clarity** for free heatmaps and session recordings.
11. **Call tracking** (optional, ~$30/mo): CallRail or similar.
12. **Core Web Vitals** confirmed in field data after launch: LCP < 2.5s, INP < 200ms, CLS < 0.1.

**Acceptance:** GSC shows all pages indexed within 14 days. Rich Results Test passes on every templated page type.

---

## Stage 8 — Launch and migration

**Goal:** Move from the live Wix site to the new Next.js site without losing rankings.

1. **DNS cutover plan.** Keep old site live, deploy new site to a staging subdomain, swap A/CNAME on launch day.
2. **301 redirect map** applied at Vercel.
3. **Pre-launch checklist.**
   - Every form tested end-to-end.
   - Phone numbers click-to-call on mobile.
   - Schema validates in Rich Results Test.
   - Lighthouse passing on ten random URLs.
   - 404 / 500 pages working.
   - SSL valid.
   - GA4 firing.
   - GSC verified on the new property.
4. **Post-launch monitoring (first 14 days).**
   - Daily GSC coverage check.
   - Daily organic traffic check in GA4.
   - Crawl errors via Screaming Frog (free up to 500 URLs).
   - Rank tracker baseline for top 20 keywords.

**Acceptance:** Zero 404s on existing indexed URLs. GSC coverage stable or growing 14 days after launch.

---

## Stage 9 — Ongoing SEO and content (months 2–12)

**Cadence**

- Two blog posts per week, months 2–6. Then one per week.
- One new suburb page per week.
- One programmatic service × suburb batch per month (e.g. brake repair × 20 suburbs).
- Monthly content refresh: update four older posts, bump the date.
- Quarterly Google Business Profile updates: new photos, new posts, new services.

**Monthly KPIs reviewed**

Organic sessions, indexed pages, top-3 and top-10 rankings, form submissions, phone clicks, new Google reviews, Domain Rating.

---

## Cost summary

| Item | One-off | Monthly |
|---|---|---|
| Domain (existing) | $0 | ~$2 |
| Vercel (free or Pro) | $0 | $0–20 |
| AI image generation (1 month sub) | ~$30 | $0 |
| Email (Resend free tier) | $0 | $0 |
| Lucide icons (open source) | $0 | $0 |
| Call tracking (optional, CallRail) | — | ~$45 |
| Rank tracking (free or Ahrefs free tier) | $0 | $0 |
| **Total** | **~$30** | **~$0–65** |

No paid SEO software required to launch.

---

## Risk register

| Risk | Mitigation |
|---|---|
| Migration loses existing rankings | Full 301 redirect map plus GSC monitoring for thirty days |
| Programmatic suburb pages read as thin | Strict 700+ unique words, manual sign-off, local landmark paragraph |
| AI images look synthetic | Tight photorealistic prompts, reject anything uncanny, stock fallback |
| Owner doesn't have time to write content | Owner approves outlines, writer drafts, owner edits to add voice |
| Schema marked but rejected | Rich Results Test on every page type before launch |
| Page speed regressions | Lighthouse CI on every PR |
