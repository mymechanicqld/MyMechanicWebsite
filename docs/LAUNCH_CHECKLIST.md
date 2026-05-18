# Launch Checklist

The cutover from the existing Wix site (`mymechanicqld.com.au`) to the new Next.js site, staged from T-14 days through T+14.

The biggest risk at launch is losing existing rankings. The mitigation is a complete 301 redirect map from every old URL to its new home, applied at the edge before DNS swap. This checklist is built around that priority.

---

## T-14 to T-7: Pre-launch verification

### Code & deploy

- [ ] Vercel project created and connected to the GitHub repo
- [ ] Preview deployment live for every PR; production deploys from `main`
- [ ] Every route confirmed rendering on the preview URL (homepage, /services, all 8 service slugs, /areas, /about, /contact, /faq, /book, /pricing, /warranty, /how-it-works, /blog, all 10 blog post slugs, /privacy-policy, /terms-conditions, /not-found)
- [ ] Lighthouse audit on every page type, target ≥ 90 on Performance, Accessibility, Best Practices, SEO (mobile and desktop)
- [ ] Mobile responsiveness verified at 360, 768, 1024, 1440 widths
- [ ] All forms tested end-to-end with a real submission landing in the configured inbox
- [ ] Phone numbers `tel:` click-to-call working on iOS Safari and Android Chrome
- [ ] Owner walks every page on the preview deployment and signs off in writing

### SEO & schema

- [ ] Every page has a unique `<title>` and unique meta description
- [ ] Every page has a canonical URL set
- [ ] Open Graph (og:title, og:description, og:image, og:url) present on every page
- [ ] Twitter Card present on every page
- [ ] JSON-LD validates in [Google's Rich Results Test](https://search.google.com/test/rich-results) on every page type: homepage (LocalBusiness), service page (Service + FAQPage + BreadcrumbList), blog post (BlogPosting + BreadcrumbList), pricing/warranty/how-it-works (FAQPage + HowTo), FAQ (FAQPage)
- [ ] `/sitemap.xml` accessible and lists all expected URLs
- [ ] `/robots.txt` accessible, allows all, points at sitemap

### Content

- [ ] All 8 service pages publish from MDX without errors
- [ ] All 10 Wave 1 blog posts publish from MDX without errors
- [ ] All stronger-than-Auto-King pages live (`/pricing/`, `/warranty/`, `/how-it-works/`)
- [ ] About page photo updated with a real on-the-job image (resolve `[TBD: founding year]` placeholder in BUSINESS.md)
- [ ] Contact page has the real phone, email, and trading hours (already correct, verify)

### Images

- [ ] Every hero image compressed to WebP under 200KB (the scraped originals run up to 4.3MB)
- [ ] Image dimensions match the slot they fill (use `next/image` `sizes` attribute)
- [ ] OG share images (1200×630) generated for every key page, either via `next/og` route or as static files
- [ ] Logo SVG variants ready: full colour, single colour, white-on-dark, favicon (16, 32, 180, 192, 512), social square (1200×1200)
- [ ] Owner portrait shot and replacing the current stand-in across `/about/`, the homepage owner section and the blog post bylines

### Redirects

- [ ] `python generate_redirects.py` re-run after the final list of new pages is locked
- [ ] `redirects.json` reviewed in `docs/REDIRECT_MAP.md`
- [ ] All redirects imported into `next.config.mjs` and deployed to the preview
- [ ] Every entry in the redirect map tested with `curl -I` against the preview URL, confirms a `301` and the expected destination
- [ ] Spot-check the top 20 most-trafficked old URLs against current Google Search Console performance data

---

## T-7 to T-3: Final QA

### Analytics & tracking

- [ ] Google Analytics 4 property created
- [ ] GA4 measurement ID added to `.env.local` and to Vercel environment variables (production scope)
- [ ] GA4 conversion events configured: `form_submit`, `phone_click`, `quote_request`
- [ ] Google Search Console verified on `https://www.mymechanicqld.com.au` (both `www` and root if applicable)
- [ ] Microsoft Clarity installed for free heatmaps and session recordings
- [ ] Call tracking optional (CallRail or similar, ~$45/mo, decision deferred to month 2)

### Backups

- [ ] Current Wix site exported via Wix's site backup / contents export
- [ ] DNS records documented as they stand today (A, AAAA, CNAME, MX, TXT, the lot, with current TTL values)
- [ ] DNS TTL on the A and CNAME records lowered to 5 minutes at least 48 hours before launch (so we can revert quickly if needed)

### Cross-browser smoke test

- [ ] Chrome (desktop and Android)
- [ ] Safari (desktop and iOS)
- [ ] Firefox desktop
- [ ] Edge desktop

---

## T-1 (the day before)

- [ ] Final Vercel production build successful
- [ ] All redirects tested one more time on the production deployment behind the preview URL
- [ ] Owner signs off on the final preview
- [ ] DNS swap plan written: which records to change, what to change them to, what the rollback DNS values are
- [ ] Launch window scheduled (recommended: 6am to 8am AEST on a weekday morning, lowest traffic)

---

## Launch day (T-0)

In rough order:

1. [ ] Update DNS A record and CNAME to point at Vercel's IPs / `cname.vercel-dns.com`
2. [ ] Wait for DNS propagation, typically 5–30 minutes with the lowered TTL
3. [ ] Verify the primary domain resolves to the new site (use `dig` and a tool like [whatsmydns.net](https://www.whatsmydns.net/))
4. [ ] Smoke test the top 10 URLs from a clean browser session: `/`, `/brake-repairs/`, `/logbook-servicing/`, `/services/`, `/about/`, `/contact/`, `/pricing/`, `/blog/`, the warranty blog post, a randomly-chosen suburb URL (should 301 to `/areas/`)
5. [ ] Submit the contact form with a real test entry; confirm it arrives in the inbox
6. [ ] Submit the booking form with a real test entry
7. [ ] Test `tel:` click-to-call on a real phone (iOS + Android)
8. [ ] Verify SSL certificate is valid (Vercel auto-provisions, but confirm in browser)
9. [ ] Verify GA4 is firing on every page (use the GA4 DebugView and the realtime report)
10. [ ] Submit `sitemap.xml` in Google Search Console
11. [ ] Request indexing for the homepage, the four priority service pages and the two pillar blog posts via GSC URL inspection
12. [ ] Run Screaming Frog free crawl (up to 500 URLs) on the production domain, fix any crawl errors immediately
13. [ ] Verify zero 404s on existing indexed URLs by re-crawling the old crawl list
14. [ ] Update Google Business Profile: confirm the website URL is current, add new photos if any
15. [ ] Submit the same `sitemap.xml` to Bing Webmaster Tools (free, takes 5 minutes)

---

## T+1 to T+7

Daily:

- [ ] GSC Coverage report: any new "Excluded" or "Error" entries?
- [ ] GSC Performance report: organic clicks and impressions compared to the pre-launch baseline (expect a small dip in the first week, recovery by week two)
- [ ] GA4 organic traffic comparison vs pre-launch baseline
- [ ] Rank tracker check for the top 20 keywords (free options: Serpwatch trial, Ahrefs free webmaster tools, or manual Google checks in incognito)

End of week:

- [ ] Full Screaming Frog crawl, fix any new crawl errors
- [ ] Owner review of any customer feedback on the new site
- [ ] Adjustments documented in a launch retro and queued for the next sprint

---

## T+8 to T+14

- [ ] Confirm all old URLs are 301ing correctly in GSC (the "URL inspection" tool shows the canonical and redirect target)
- [ ] Submit any remaining unindexed pages via URL inspection
- [ ] Check Core Web Vitals in GSC (field data from real users), target: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] Begin Wave 2 blog posts per `CONTENT_STRATEGY.md`
- [ ] Review and refine GA4 conversion event setup based on real customer behaviour

---

## Rollback plan

If anything fails catastrophically (site unreachable, certificate invalid, redirects looping):

1. **Revert DNS** to point back at Wix. With the lowered TTL, this propagates within 5 to 30 minutes.
2. **Any visitors during the broken window** will have seen an error. Acceptable risk for a short window; unacceptable for more than an hour.
3. **Document what went wrong** before retrying. Do not retry the same day unless the fix is obvious and tested on the preview.

The single most important rule: **the redirect map must never point at URLs that 404 on the new site.** Test every redirect manually before flipping DNS.

---

## Owners

| Task | Owner |
|---|---|
| Domain registrar account access | TBD |
| Vercel account / billing | TBD |
| GSC verification | TBD |
| GA4 setup | TBD |
| Smoke testing on launch day | TBD |
| Content QA & sign-off | Owner |

Each empty `TBD` needs an actual name and phone number before launch day, so we know who to call when something needs a decision.
