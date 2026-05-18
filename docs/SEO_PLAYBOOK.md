# SEO Playbook

The operational manual for SEO on this project. Strategy lives in [CONTENT_STRATEGY.md](CONTENT_STRATEGY.md). This document is the day-to-day mechanics: how to write a meta description, what to check before publishing, what to do monthly, what tools to use.

---

## Quick reference: pre-publish checklist

Before pushing any new page (service, suburb, blog post, anything) to production, every item on this list must be true:

- [ ] Title tag is unique site-wide, 50–60 characters, includes the primary keyword and the brand
- [ ] Meta description is unique, 140–160 characters, includes the primary keyword, ends with a soft CTA
- [ ] H1 is on the page once and includes the primary keyword (in a natural way)
- [ ] Canonical URL is set and points to itself (or to the intended canonical if there's a variant)
- [ ] Open Graph title, description and image all present
- [ ] Twitter Card present (defaults from the layout are fine)
- [ ] JSON-LD schema appropriate to the page type
- [ ] At least one image with descriptive alt text (no keyword stuffing)
- [ ] At least three internal links to relevant other pages
- [ ] The page passes Google's [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] The page passes Lighthouse SEO 100 and Accessibility ≥ 95
- [ ] If a blog post: author byline, published date, reading time, category, related services in the frontmatter

This is a hard list. If any item fails, do not publish.

---

## Meta tag rules

### Title tag

**Pattern:** `[Primary keyword] [Location] | [Brand]`

Good:

- `Mobile Brake Repair Brisbane, Logan & Gold Coast | My Mechanic QLD`
- `12-Month Workmanship Warranty | My Mechanic QLD`
- `How Much Does a Brake Job Cost in Brisbane in 2026?`

Length: 50–60 characters typical, 65 absolute maximum (Google truncates beyond that).

Avoid:

- Keyword stuffing: "Mobile mechanic Brisbane, mobile mechanic Logan, mobile mechanic Gold Coast" reads as spam
- Generic page-name fallbacks: "About Us | My Mechanic QLD" — better is "About My Mechanic QLD | Family-Run Mobile Mechanic Brisbane"
- Identical or near-identical titles across pages (the competitor's biggest SEO mistake)

### Meta description

**Pattern:** One sentence that says what the page is, one fact that builds credibility, one soft CTA. Keep it natural; do not stuff keywords.

Good:

- `Squealing or grinding brakes? We replace pads and rotors at your driveway with Bosch, Bendix or Brembo. From $249, 12-month warranty, no call-out fee.`
- `Mobile logbook servicing at your home. Manufacturer-spec service that keeps your new-car warranty intact under Australian Consumer Law. From $189 minor.`

Length: 140–160 characters typical, 165 absolute maximum.

Avoid:

- "Welcome to..." or "Looking for...?" cold openings
- Mirroring the title verbatim (waste of space)
- Generic claims with no proof ("the best", "world-class")

### Open Graph image

Every page should have an `og_image` set to a 1200×630 PNG or JPG. The default in `layout.tsx` is `/images/og-default.png`, which acts as a fallback. Pages with their own hero imagery should override it with a page-specific share image.

For dynamic generation, Next.js supports `next/og` routes that render images on the fly from React components. Use this when the page has a unique title overlay (e.g. blog posts).

### Robots directives

- `index, follow` is the default for every public page
- `noindex` on pages that aren't useful in search (success pages, internal preview routes)
- Never `noindex` the homepage, service pages, blog posts, or location pages

---

## Schema strategy by page type

| Page type | Required schemas |
|---|---|
| Homepage | `LocalBusiness` (sitewide), `Organization`, `WebSite` with `SearchAction` |
| Service page | `Service`, `FAQPage` (when FAQ present), `BreadcrumbList`, plus `LocalBusiness` reference |
| Suburb page | `LocalBusiness` with `areaServed`, `BreadcrumbList` |
| Service × suburb | All of the above |
| Blog post | `BlogPosting`, `Person` (author), `BreadcrumbList` |
| Pillar guide | `Article`, `BreadcrumbList` |
| About | `AboutPage`, `Organization` |
| Contact | `ContactPage`, `LocalBusiness` |
| Pricing | `FAQPage`, optionally `PriceSpecification` per service |
| How it works | `HowTo` with each step |
| Warranty | `FAQPage` |
| Reviews | `AggregateRating`, `Review` (only with real, verifiable reviews — never fabricate) |

Every schema must validate cleanly in [Rich Results Test](https://search.google.com/test/rich-results). A failing schema is worse than no schema.

---

## Image SEO

Images contribute to SEO in three ways: file size (Core Web Vitals), alt text (accessibility + indexable text), and structured data inclusion.

### File names

Use descriptive lowercase-with-hyphens names that include the subject and (where relevant) location:

- Good: `mobile-mechanic-van-brisbane-driveway.webp`
- Bad: `IMG_4521.jpg`, `hero1.png`, `mmq_van-1920w_0e4e49.png`

### Alt text

Describe what the image shows, plainly. Include the subject. Do not keyword-stuff.

- Good: `Mechanic replacing front brake pads on a customer's vehicle in a Brisbane driveway`
- Bad: `Mobile mechanic Brisbane brake repair best service near me`
- Bad: empty `alt=""` (acceptable only for purely decorative images)

### Format and size

- WebP for primary, JPG for fallback (browser support is now near-universal but a fallback is still nice)
- Target file size: under 200KB after compression
- Use `next/image` with the `sizes` attribute to serve the right resolution for the device
- Lazy-load below-the-fold images; eager-load only the LCP image

### Tools

- [Squoosh.app](https://squoosh.app/) for one-off compression
- `sharp` CLI for batch processing in scripts
- Lighthouse's "Properly size images" audit to spot oversized ones

---

## Internal linking rules

Every page should link out and in. The published rules:

1. **Every service hub** links to all suburb pages where the service is offered, two related blog posts, two related services, and the booking page.
2. **Every suburb page** links to all four priority services, the parent region hub, three nearby suburbs, and one blog post.
3. **Every blog post** links to two service hubs with descriptive anchor text (never "click here"), one suburb page when geographically relevant, and the parent pillar.
4. **Every pillar** links to every cluster post and to the relevant service hub.

Anchor text is descriptive and varied. Don't use the same anchor 10 times for the same target (Google reads that as manipulation).

No orphan pages: every published URL must be linked from at least two other pages besides nav and footer.

---

## Local SEO

Local SEO is where this business wins or loses. The basics:

### Google Business Profile

- Single profile claimed and verified
- NAP (name, address, phone) exactly matches the website footer
- Hours of operation match the website
- Service area set to the 50–60 km radius around Springwood
- All 8 services listed as offerings
- 30+ photos uploaded (van, jobs in progress, owner portrait once shot)
- Monthly post (a new blog summary, a customer story, a seasonal reminder)
- Respond to every review within 48 hours, positive and negative

### NAP consistency

The business name, address and phone number should be byte-identical wherever they appear: the website footer, Google Business Profile, every directory listing (Yellow Pages, True Local, Hotfrog, MotorMouth), invoices and quote emails. Inconsistent NAP confuses local search engines.

### Local citations

Submit the business once to each of:

- Yellow Pages Australia
- True Local
- Hotfrog
- StartLocal
- MotorMouth (automotive-specific)
- WOMO (Word of Mouth Online)
- Yelp Australia

Use the same NAP everywhere. No premium listings needed.

### Reviews

Real Google reviews are the single largest local SEO lever. Target: 2 new reviews per week through proactive asking. We email a review-request link in the post-job follow-up, with a one-click Google link.

---

## Page speed and Core Web Vitals

Google measures three metrics in field data (real users on real devices):

- **LCP (Largest Contentful Paint)**: target < 2.5s. Usually the hero image.
- **INP (Interaction to Next Paint)**: target < 200ms. The latency of the first interaction.
- **CLS (Cumulative Layout Shift)**: target < 0.1. Things shouldn't move around as the page loads.

How we hit those:

- Hero images are explicitly sized and use `priority` in `next/image` so they're not lazy-loaded
- Fonts are loaded via `next/font` with `display: swap` (no FOIT)
- No client-side JavaScript on pages that don't need it (most of our pages are pure server components)
- The mobile drawer is the only interactive client component on most pages
- Images are WebP with proper `sizes` attribute

Verify monthly via Lighthouse CI and GSC's Core Web Vitals report.

---

## Monthly SEO routine

The recurring tasks. Half a day per month, mostly.

### Week 1: data review

- GSC Performance: top queries, top pages, click-through rate, average position
- GSC Coverage: any new errors or excluded pages
- GA4: organic sessions, conversion events, top landing pages
- Rank tracker: top 20 keywords positions vs last month
- Note three things that are working, three that aren't

### Week 2: content refresh

- Update four older posts: refresh stats, update prices, bump `dateUpdated`, add internal links to any new posts
- Add a new internal link to one older post from the homepage or services hub
- Take a screenshot of the GSC top queries report; flag any queries the site is ranking 11–20 for that could be pushed into the top 10 with a content update

### Week 3: new content publish

- One new blog post (target: 1,500+ words, internal links, schema, owner byline)
- One refreshed service page if anything has changed (price, parts brands)
- One new suburb page if the suburb roadmap calls for it

### Week 4: local SEO

- Add 3–5 new photos to Google Business Profile
- Publish a GBP post (a quick blog summary works)
- Reply to any new reviews
- Spot-check NAP consistency across 5 random directory listings

---

## Quarterly SEO routine

- Full Lighthouse audit on every page type
- Schema validation pass with Rich Results Test on every page type
- Full Screaming Frog crawl (free up to 500 URLs)
- Backlink check (free: Ahrefs Webmaster Tools)
- Competitor rank comparison: where is Auto King ranking that we aren't?
- Review keyword strategy against actual GSC data: are we ranking for what we targeted? What surprised us?

---

## Annual SEO routine

- Major content refresh: every pillar updated, every priority service page reviewed
- Re-audit `BUSINESS.md` for any business changes (new services, expanded area, etc.)
- Year-over-year traffic and conversion comparison
- Decide whether to invest in any paid tools (Ahrefs, SEMrush) based on the year's growth

---

## Tools we actually use

### Free

- Google Search Console (the most important tool, full stop)
- Google Analytics 4
- Bing Webmaster Tools (Bing/DuckDuckGo data)
- Lighthouse (Chrome DevTools)
- Microsoft Clarity (heatmaps + session recordings)
- Rich Results Test (schema validation)
- Schema.org reference
- Screaming Frog SEO Spider (free up to 500 URLs)
- Ahrefs Webmaster Tools (free for verified sites, limited but useful)
- whatsmydns.net (DNS verification at launch)

### Paid (skip until growth justifies)

- Ahrefs or SEMrush ($129–$199/mo) — only after month 3 if growth is strong
- CallRail ($45/mo) — only if attributing phone leads becomes critical
- Rank tracker like Serpwatch — free tier sufficient initially

---

## Common pitfalls

### Don't

- Duplicate titles or meta descriptions across pages
- Use `noindex` accidentally on a page that should rank (always check the `<meta name="robots">` after publishing)
- Forget the canonical URL on a new page (Next.js makes this easy to miss)
- Stuff keywords into alt text
- Buy backlinks
- Fake reviews in schema markup
- Use generic OG images on important pages
- Publish a page without at least three internal links
- Use the same H1 on multiple pages
- Use redirects where a direct link works
- Chain redirects (every redirect should be a single 301, never a redirect-to-a-redirect)

### Do

- Lead with the most-relevant keyword in titles
- Write meta descriptions like ad copy: one sentence, one fact, one CTA
- Use heading hierarchy (one H1, multiple H2s, H3s nested inside)
- Cross-link service pages and blog posts every time
- Update content older than 12 months
- Reply to every review
- Track what works in GSC and double down on it

---

## When in doubt

If a decision genuinely affects SEO and isn't covered here, the priority order is:

1. **Content quality.** Will this make the page more useful to the reader?
2. **Page speed.** Will this slow down the page?
3. **Schema correctness.** Does the markup match the page content?
4. **Keyword fit.** Does the page rank for what we want it to rank for?

In that order. A page that is faster, more useful, and correctly schema'd will beat a keyword-stuffed page on the same topic, every single time.
