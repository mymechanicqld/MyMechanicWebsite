# Local SEO and Re-indexing Guide

How to get My Mechanic QLD ranking for "mobile mechanic [suburb]" across all
160 suburbs in Brisbane, Logan, Ipswich and the Gold Coast.

This guide is the practical follow-up to the local SEO build. Work through it
in order after the site is deployed.

---

## 1. What changed on the site

We rebuilt the local pages so Google sees each suburb as genuinely different,
not 160 copies of the same page with the name swapped (which Google now
filters out aggressively).

- **160 suburb pages** now each have a unique paragraph about that suburb, a
  real local landmark, accurate neighbouring suburbs, and a location-specific
  FAQ.
- **4 new regional hub pages**: `/brisbane/`, `/logan/`, `/ipswich/`,
  `/gold-coast/`. These tie the suburbs together and give Google a clear
  structure.
- **640 service-and-suburb pages** (e.g. `/brake-repairs/sunnybank/`) also
  carry the unique local content.
- **Stronger structured data** so Google understands we are a mobile mechanic
  serving each specific suburb.
- **Region-segmented sitemaps** so we can watch indexing per region.
- **IndexNow** so we can ping search engines the moment a page changes.

---

## 2. Deploy first

None of the steps below work until the new site is live on the real domain.
Deploy, then confirm these URLs load in a browser:

- `https://www.mymechanicqld.com.au/sitemap.xml` (should show 5 sub-sitemaps)
- `https://www.mymechanicqld.com.au/sitemap-logan.xml` (should list Logan URLs)
- `https://www.mymechanicqld.com.au/7f1e86871dd8fe55bbdaee180c6c8302.txt`
  (should show the IndexNow key, a line of letters and numbers)
- A few suburb pages, e.g. `/sunnybank/`, `/coomera/`, `/springfield/`

---

## 3. Google Search Console (the main job)

### 3a. Submit the sitemaps

In Search Console, open **Indexing > Sitemaps** and submit each of these one at
a time (use the full URL):

```
sitemap.xml
sitemap-core.xml
sitemap-brisbane.xml
sitemap-logan.xml
sitemap-ipswich.xml
sitemap-gold-coast.xml
```

Submitting each region separately is the trick that lets you see, a few weeks
later, exactly how many Logan pages got indexed versus Gold Coast, so you know
where to push.

### 3b. Hand-submit your most important pages

Search Console has a **URL Inspection** tool at the top. Paste a URL, then
click **Request indexing**. There is a daily limit (around 10 to 12), so spend
it on the pages that matter most first:

- The 4 region hubs (`/brisbane/`, `/logan/`, `/ipswich/`, `/gold-coast/`)
- Your highest-value suburbs (the ones you most want work from)
- The 4 main service pages

Do a handful each day for the first two weeks. Prioritise Logan and the
Southside, since that is where you respond fastest and convert best.

---

## 4. IndexNow (instant ping, no waiting)

IndexNow tells Bing and other engines about new or changed pages immediately.
It is already set up. After the site is live, run this once from the project
folder:

```
npm run indexnow
```

That submits all 819 URLs. When you later change or add pages, you can ping
just one region:

```
npm run indexnow -- --region logan
```

Or specific URLs:

```
npm run indexnow -- https://www.mymechanicqld.com.au/sunnybank/
```

If you ever see `HTTP 403`, it means the key file at the link in section 2 is
not loading. Fix that first, then re-run.

---

## 5. Do not dump all 800 pages on Google at once

Google can flag a site that suddenly publishes hundreds of near-identical-looking
pages overnight. Even though ours are unique, play it safe:

1. **Week 1:** Let the 4 region hubs and your top 30 to 40 suburbs index first.
   Request those by hand (section 3b) and submit `sitemap-core.xml` plus
   `sitemap-logan.xml`.
2. **Week 2 to 3:** Submit `sitemap-brisbane.xml`. Watch the indexing rate.
3. **Week 4+:** Submit `sitemap-ipswich.xml` and `sitemap-gold-coast.xml`.

If at any point the **Pages** report shows lots of "Crawled, currently not
indexed", stop submitting more and improve the pages that are not getting in
(add a customer review, a real job photo, more local detail). That status means
Google saw the page but did not think it was worth indexing yet.

---

## 6. Google Business Profile (this is huge for local)

Your website rankings and your Google Business Profile (the map listing) are two
separate things. For a mobile business, the map listing has its own rules:

- **You will rank in the map pack near your base (Springwood / Logan), not 40km
  away.** That is just how Google Maps works for service businesses. Distant
  suburbs are won through the website pages we built, not the map.
- Set yourself up as a **service-area business** (hide the street address, list
  the regions you cover).
- Set the **primary category** to "Mobile mechanic" or "Auto repair shop".
- Add **every service** in the services section using the same names as the
  website (brake repair, logbook service, etc.).
- **Reviews are the single biggest lever.** Ask every happy customer for a
  Google review and, where natural, to mention their suburb ("great service in
  Carindale"). Suburb mentions in reviews genuinely help.
- Post **photos** regularly: the van, jobs in progress, before and after. Aim
  for a few new ones each week.
- Reply to every review, good or bad.

---

## 7. What to expect, and when

- **Days 1 to 3:** Bing picks up the IndexNow submissions quickly.
- **Weeks 1 to 2:** Google indexes the hubs and the pages you hand-submitted.
- **Weeks 2 to 6:** The bulk of the suburb pages get indexed as Google crawls
  through the sitemaps and internal links.
- **Months 2 to 4:** Rankings for "mobile mechanic [suburb]" start to settle
  and climb, especially for suburbs near your base and any with reviews.

There is no button that forces Google to rank you faster. The levers you
control are: unique useful pages (done), clean indexing signals (done), strong
internal links (done), and reviews (ongoing, and the most important one from
here).

---

## 8. Monthly check-up

Once a month, in Search Console:

1. **Performance** report: filter queries by "mechanic" and look for suburb
   names showing up. These are the suburbs you are starting to win.
2. **Pages** report: check the indexed count per sitemap. If a region is
   lagging, add reviews and local detail to those pages.
3. **Re-run** `npm run indexnow` after any batch of content edits.
