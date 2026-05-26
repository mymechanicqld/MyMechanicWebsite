# My Mechanic QLD — Website

Production Next.js site for [mymechanicqld.com.au](https://www.mymechanicqld.com.au/), a professional mobile mechanic serving Brisbane, Logan, Ipswich and the Gold Coast. The rebuild replaces the legacy site with a content-first, SEO-optimised stack designed to outrank the local market leader ([autoking.com.au](https://www.autoking.com.au/)).

---

## What's in here

- **Public website** — 38 routes, Next.js App Router, fully prerendered
- **Quote-request pipeline** — form → Supabase + Resend email (parallel writes)
- **Operations dashboard** — standalone HTML, live Supabase reads, brand-styled
- **AI-readable indexes** — `llms.txt` + `llms-full.txt` for citation in ChatGPT, Claude, Perplexity, Gemini
- **301 redirects** — full URL preservation from the legacy site
- **Brand & SEO documentation** — six playbooks under `docs/`

---

## Tech stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript + React 19 |
| Styling | Tailwind CSS 3 with custom design tokens |
| Icons | Lucide (no emojis, no Material misuse) |
| Content | MDX via `gray-matter` + `remark` + `remark-gfm` + `remark-html` |
| Database | Supabase (Postgres) with RLS |
| Email | Resend transactional API |
| Images | `next/image` + `sharp` for batch WebP conversion |
| Hosting target | Vercel (Sydney region `syd1`) |
| Analytics | Google Analytics 4 + Search Console (env-driven) |

---

## Quick start

```bash
# 1. Clone and install
npm install

# 2. Copy env template and fill in credentials
cp .env.example .env.local
# Then edit .env.local — at minimum RESEND_API_KEY needs your real key

# 3. Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Required env vars (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://depduvjclelykqcnhlsm.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_cgK1KYRlLrYrn1YjhQTVcg_hSJzcOxr
RESEND_API_KEY=re_xxx                    # https://resend.com/api-keys
QUOTE_RECIPIENT_EMAIL=gursahib99888@gmail.com
QUOTE_SENDER_EMAIL=onboarding@resend.dev # switch to contact@mymechanicqld.com.au after domain verified
```

`NEXT_PUBLIC_GA4_MEASUREMENT_ID` and `NEXT_PUBLIC_GSC_VERIFICATION` are launch-only — see [docs/DEPLOY.md](docs/DEPLOY.md).

---

## Repository layout

```
/
├── app/                          Next.js App Router pages
│   ├── layout.tsx                Site-wide metadata + LocalBusiness JSON-LD + icons
│   ├── page.tsx                  Homepage
│   ├── actions.ts                Server actions (Supabase + Resend wiring)
│   ├── [slug]/                   Catch-all service page template (reads MDX)
│   ├── blog/[slug]/              Blog post template (reads MDX)
│   ├── icon.png, apple-icon.png  Auto-detected favicons
│   ├── sitemap.ts, robots.ts     Generated sitemap + robots
│   └── (top-level pages)         /about, /pricing, /warranty, /faq, /book, /contact,
│                                 /case-studies, /check-coverage, /how-it-works,
│                                 /toyota-mechanic, /hilux-service, /mazda-service,
│                                 /ford-ranger, /privacy-policy, /terms-conditions, /services
├── components/                   Header, Footer, MobileDrawer, QuoteForm, CoverageChecker
├── content/
│   ├── services/                 8 MDX files (brake-repairs, logbook-servicing, etc.)
│   └── posts/                    11 blog post MDX files
├── lib/
│   ├── services.ts               MDX loader for service pages
│   ├── posts.ts                  MDX loader for blog posts
│   ├── supabase.ts               Supabase client (server-side)
│   └── email-templates.ts        Branded HTML email template
├── supabase/
│   ├── config.toml               CLI config
│   ├── migrations/               SQL migrations (quote_submissions table + RLS)
│   └── seed.sql                  5 dummy inquiries for local testing
├── dashboard/index.html          Standalone HTML dashboard (open in browser)
├── public/
│   ├── images/                   Compressed WebP heroes, OG card, logos
│   ├── llms.txt, llms-full.txt   AI-readable site indexes
│   ├── favicon-*.png, icon-*.png, apple-touch-icon.png, site.webmanifest
├── scripts/
│   └── compress-images.mjs       Adaptive sharp compressor (re-run when adding heroes)
├── docs/                         Brand, SEO, content, deploy playbooks
├── redirects.json                301 redirect map from legacy URLs
├── next.config.mjs               Trailing slashes + redirects + security headers
├── vercel.json                   Region + framework preset
└── .github/workflows/build.yml   CI sanity build on every PR
```

---

## Booking-request pipeline

The booking form on every page (`/book/`, `/#quote`, `/contact/`) submits via a Next.js server action that runs **two writes in parallel**:

1. **Supabase** — insert into `quote_submissions` table (permanent record, feeds the dashboard)
2. **Resend** — branded HTML notification to `QUOTE_RECIPIENT_EMAIL` (currently **`mymechanicqld@gmail.com`**), with `Reply-To` set to the customer's email

Failures in one path do not block the other. If both fail, the customer can still call.

### Form structure

The form (`components/QuoteForm.tsx`) has four grouped sections with icon headers, inspired by a competitor's booking layout but adapted to the My Mechanic QLD brand and quote-first business model.

**Section 1 — Your details** (required fields marked with \*)

| # | Label              | Form name           | DB column         | Notes                                               |
|---|--------------------|---------------------|-------------------|-----------------------------------------------------|
| 1 | Full Name \*       | `name`              | `full_name`       | Full name, single line                              |
| 2 | Phone Number \*    | `phone`             | `phone`           | Free-text, `tel://` link in the email               |
| 3 | Email \*           | `email`             | `email`           | Used as `Reply-To` on the notification email        |
| 4 | Suburb \*          | `suburb`            | `suburb`          |                                                     |

**Section 2 — Vehicle**

| # | Label                    | Form name         | DB column         | Notes                                               |
|---|--------------------------|-------------------|-------------------|-----------------------------------------------------|
| 5 | Car Make                 | `car_make`        | `vehicle_make`    | Optional. e.g. "Toyota Camry"                       |
| 6 | Registration Number \*   | `rego`            | `vehicle_rego`    | Normalised to upper-case before storage             |
| 7 | Service \*               | `service_needed`  | `service_needed`  | Dropdown with 10 options (9 services + "Not sure")  |

**Section 3 — Additional details**

| # | Label              | Form name  | DB column  | Notes                                                          |
|---|--------------------|------------|------------|----------------------------------------------------------------|
| 8 | (textarea)         | `message`  | `symptoms` | Optional. Free-text for extra detail about the car issue       |

**Section 4 — Appointment**

| # | Label              | Form name        | DB column        | Notes                                                     |
|---|--------------------|------------------|------------------|-----------------------------------------------------------|
| 9 | Date               | `preferred_date` | `preferred_date` | Optional. Native date picker, min = today (AEST)          |
| 10| Preferred window   | `preferred_time` | `preferred_time` | Optional. 4 radio-button cards (Morning / Late morning / Afternoon / Late afternoon) |

**Bottom**

| # | Label              | Form name          | DB column          | Notes                                              |
|---|--------------------|--------------------|--------------------|-----------------------------------------------------|
| 11| Privacy consent \* | `consent_privacy`  | `consent_privacy`  | Checkbox. Sent as `"yes"`, coerced to boolean true  |

A hidden `redirect_to` field sends the user back to the originating page after submission (validated against a whitelist to prevent open redirects).

The server action (`app/actions.ts`) rejects any submission that's missing a required field or where `consent_privacy` is not true. Audit metadata (IP address, user-agent, source) is added server-side.

### One-time database setup

The Supabase project is created and credentials are in `.env.local`. To apply the schema, open the [SQL editor](https://supabase.com/dashboard/project/depduvjclelykqcnhlsm/sql/new) and run each migration in order:

1. `supabase/migrations/20260517_001_quote_submissions.sql` — table, indexes, RLS
2. `supabase/migrations/20260517_002_crm_policies.sql` — UPDATE/DELETE policies + `updated_at` trigger
3. `supabase/migrations/20260524_003_simplify_form.sql` — adds `vehicle_rego` and `consent_privacy` columns
4. `supabase/migrations/20260526_004_form_redesign.sql` — adds `preferred_date` column for the appointment section
5. (Optional, for testing) `supabase/seed.sql` — 5 dummy inquiries

### Email: domain verification

Until `mymechanicqld.com.au` is verified at [resend.com/domains](https://resend.com/domains), emails must send from `onboarding@resend.dev`. Once the DNS records are in place, switch `QUOTE_SENDER_EMAIL` in `.env.local` (and Vercel env vars) to `contact@mymechanicqld.com.au`.

---

## Operations dashboard

Standalone single-file dashboard at [`dashboard/index.html`](dashboard/index.html). No build step — open it directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000 --directory dashboard
# Then visit http://localhost:8000
```

Features: live stats by status, search across name/email/suburb/vehicle/symptom, status filter chips, click-row to open detail with reply/call buttons, auto-refresh every 30 s. Brand palette (navy on stone), `noindex,nofollow`, mobile-responsive.

The publishable key is in plain text in the file — RLS allows only `select` and `insert` from this key. If you want to deploy the dashboard publicly later, add a password gate or wire up Supabase magic-link auth and tighten the RLS policy.

---

## Brand & content rules (critical)

**Single biggest landmine on this project**: never mention services the business does not actually offer. See `.claude/skills/mymechanicqld-project/SKILL.md` for the full list and [docs/BUSINESS.md](docs/BUSINESS.md) for the source of truth.

Services we do **not** offer (never put on a public page, never list in nav, never agree to in a chat):

- Air-conditioning regas or repair
- Auto electrical work beyond batteries and code reading
- DIY rescues (customer started the job, we finish)
- Customer-supplied parts (we only fit what we sourced)
- Trucks, trailers, machinery, motorcycles, vehicles over 4.5 tonnes
- Wheel alignment, tyre fitting, panel beating

### Verified vs fabricated claims

Every claim on the site must be traceable to the old-site scrape or the owner's confirmed input. The audit lives in conversation history but the practical rules are:

- ✅ "15+ years experience", "same-day service available", "5-star rated", "OEM or quality aftermarket parts that meet or exceed manufacturer specifications", "workmanship warranty per our terms + ACL rights"
- ❌ Specific dollar prices, specific parts brand names (Bosch/Bendix/Brembo/etc.), "12-month workmanship warranty", "4,000+ jobs", "4.9 / 5", "30+ suburbs", "inside the hour", "28-point inspection", "family-run"

If in doubt, use the market range ($188–$449 for routine servicing) from the old FAQ, or fall back to "fixed-price quote upfront — call us for a real number".

### Brand voice (Australian English)

- No em-dashes anywhere (use commas, full stops, or restructure)
- No AI-isms ("dive into", "navigate the complexities", "tapestry of", "in the realm of")
- Sentences read like a human copywriter wrote them
- Australian spelling: "tyre", "kerb", "centre", "colour"

---

## Documentation

| Doc | Purpose |
|---|---|
| [docs/BUSINESS.md](docs/BUSINESS.md) | Source of truth: services, hours, coverage, owner inputs |
| [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) | URL→file map, request flow, how to add a new page |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Colours, typography, spacing, component patterns |
| [docs/CONTENT_STRATEGY.md](docs/CONTENT_STRATEGY.md) | Priority services, nav structure, blog plan |
| [docs/SEO_PLAYBOOK.md](docs/SEO_PLAYBOOK.md) | Pre-publish checklist, meta tag rules, schema strategy |
| [docs/SEO_KEYWORDS.md](docs/SEO_KEYWORDS.md) | Full keyword research grouped by intent |
| [docs/AI_OPTIMIZATION.md](docs/AI_OPTIMIZATION.md) | GEO strategy — getting cited by ChatGPT/Claude/Perplexity |
| [docs/REDIRECT_MAP.md](docs/REDIRECT_MAP.md) | Legacy → new URL mappings |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Vercel deploy playbook step-by-step |
| [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) | Pre/post-launch verification list |
| [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) | Nine-stage delivery plan |
| [docs/IMAGES.json](docs/IMAGES.json) | Per-image AI prompt manifest |

---

## Scripts & tooling

```bash
npm run dev      # Local dev server (localhost:3000)
npm run build    # Production build — must pass before every push
npm run start    # Run the built site locally
npm run lint     # ESLint (not yet initialised)

# One-off: re-compress hero images when adding new ones
node scripts/compress-images.mjs
```

### Image compression

`scripts/compress-images.mjs` is an adaptive sharp script. Drop new PNG/JPG heroes into `public/images/`, run the script, and it converts to WebP under 200 KB, stepping down quality if needed. Also regenerates the OG card from the hero.

After running, clear the Next.js image cache (`.next/cache/images`) and hard-refresh to see updates.

---

## Deploy

See [docs/DEPLOY.md](docs/DEPLOY.md) for the full step-by-step. Summary:

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Next.js auto-detected
3. Add the five env vars listed in `.env.example` to Vercel project settings
4. Click Deploy — first build is ~2 min, every push to `main` deploys to production automatically, every other branch becomes a preview deployment
5. Point `mymechanicqld.com.au` DNS at Vercel, wait for cert, Vercel handles the rest

The GitHub Actions workflow at `.github/workflows/build.yml` runs `next build` on every PR as a sanity check, independent of Vercel.

### Rollback

Vercel dashboard → Deployments → find last known-good → `…` menu → **Promote to Production**. Instant, no rebuild.

---

## Status

| Stage | State |
|---|---|
| Discovery + competitor crawl | ✅ Done |
| Design system + concepts | ✅ Done |
| Core pages (homepage, services, areas, etc.) | ✅ 38 routes live |
| MDX content (8 services, 11 blog posts) | ✅ Published |
| Technical SEO (schema, sitemap, robots, redirects) | ✅ Done |
| AI optimisation (llms.txt, AI-crawler allows) | ✅ Done |
| Quote form → Supabase + Resend | ✅ Wired, needs DB migration applied |
| Dashboard | ✅ Built |
| Image compression | ✅ All heroes under 200 KB WebP |
| Brand voice + claim audit | ✅ Done (no fabrications remaining) |
| Mobile responsiveness | ✅ Tested 360 / 640 / 768 / 1024 / 1440 |
| Vercel deploy config | ✅ `vercel.json` + `.env.example` + `DEPLOY.md` |
| **Domain verification (Resend)** | ⏳ Owner action |
| **Real Resend API key in `.env.local`** | ⏳ Owner action |
| **GA4 + GSC credentials** | ⏳ Owner action |
| **Google Business Profile claim** | ⏳ Owner action |
| **Push to production** | ⏳ Ready when above is done |

---

_Last updated: 2026-05-17_
