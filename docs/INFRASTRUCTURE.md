# Infrastructure & Deployment Configuration

Living reference for **how My Mechanic QLD runs in production**. Updated whenever a service is added, swapped, or a DNS / env-var / migration change is made.

For the *first-time* setup walkthrough see [`docs/DEPLOY.md`](./DEPLOY.md). This document is what's live right now and how the moving parts fit together.

Last reviewed: **May 2026**.

---

## 1. Architecture at a glance

```
                                  ┌─────────────────────┐
                                  │  Customer browser   │
                                  └──────────┬──────────┘
                                             │ HTTPS
                                             ▼
            ┌──────────────────────────────────────────────────────────┐
            │  mymechanicqld.com.au  /  www.mymechanicqld.com.au       │
            │                                                          │
            │  DNS hosted at VentraIP (cPanel / Synergy)               │
            │  • Apex A → 216.198.79.1            (Vercel anycast IP)  │
            │  • www  CNAME → 4d49fe13d5422e6f.vercel-dns-017.com.     │
            └──────────────────────────────────────┬───────────────────┘
                                                   │
                                                   ▼
                          ┌───────────────────────────────────────────┐
                          │       Vercel — my-mechanic-website        │
                          │       Region: syd1 (Sydney)               │
                          │       Framework: Next.js 16.2.6            │
                          │                                           │
                          │  ┌───────────────────────────────────┐    │
                          │  │ Edge / CDN  (cache + redirects)   │    │
                          │  └───────────────┬───────────────────┘    │
                          │                  │                        │
                          │  ┌───────────────▼───────────────────┐    │
                          │  │ Static pages (43 prerendered)     │    │
                          │  │ + ƒ server-rendered (home, book,  │    │
                          │  │   contact)                        │    │
                          │  └───────────────┬───────────────────┘    │
                          │                  │                        │
                          │  ┌───────────────▼───────────────────┐    │
                          │  │ Server actions                    │    │
                          │  │   submitQuoteAction (form post)   │    │
                          │  └───────┬──────────────────┬────────┘    │
                          └──────────┼──────────────────┼─────────────┘
                                     │                  │
                                     ▼                  ▼
                       ┌─────────────────────┐  ┌──────────────────────┐
                       │  Supabase           │  │  Resend              │
                       │  Postgres + RLS     │  │  Transactional email │
                       │  quote_submissions  │  │  → mymechanicqld@... │
                       └─────────────────────┘  └──────────────────────┘
                                ▲
                                │ read-only
                       ┌────────┴─────────────┐
                       │  dashboard/          │
                       │  index.html (CRM)    │
                       │  Standalone HTML —   │
                       │  not deployed, lives │
                       │  on the owner's      │
                       │  laptop.             │
                       └──────────────────────┘
```

---

## 2. Source code & repositories

| Repo | Role | URL |
|---|---|---|
| **Primary** | Production source of truth — connected to Vercel | [`mymechanicqld/MyMechanicWebsite`](https://github.com/mymechanicqld/MyMechanicWebsite) |
| **Backup mirror** | Original repo from initial build, kept in sync | [`Singh-Gursahib/MyMechanicQLD`](https://github.com/Singh-Gursahib/MyMechanicQLD) |

**Branch policy:** `main` only. Every push triggers a Vercel deploy.

**Push remote (local):**
```
mmqld  → git@github.com:mymechanicqld/MyMechanicWebsite.git   (primary)
origin → git@github.com:Singh-Gursahib/MyMechanicQLD.git      (mirror)
```

**Auth note:** the SSH key at `~/.ssh/id_ed25519` authenticates as `Singh-Gursahib`. Push access to the `mymechanicqld` org is via that account being a member of the org. `gh auth status` may show a different account — the gh CLI uses HTTPS / token auth, separate from SSH push.

---

## 3. Vercel project

| Setting | Value |
|---|---|
| **Project name** | `my-mechanic-website` |
| **Framework preset** | Next.js (auto-detected) |
| **Build command** | `next build` (set in `vercel.json`) |
| **Install command** | `npm ci` |
| **Output directory** | `.next` |
| **Region** | `syd1` (Sydney) — pinned in `vercel.json` |
| **Node version** | 22.x (Vercel default, auto-aligned to package engines) |
| **Auto-deploy** | On every push to `main` |
| **Preview deployments** | On every PR / non-main branch |
| **Project ID** | (visible in Vercel → Project Settings → General) |
| **Default `*.vercel.app`** | `my-mechanic-website-six.vercel.app` |

**Trailing slashes:** enforced by both `next.config.mjs` (`trailingSlash: true`) and `vercel.json`. They must agree to avoid redirect loops.

**Image optimisation:** Vercel's Image Optimization API kicks in automatically for `<Image>` components. WebP source files in `public/images/` are further served as AVIF to capable browsers.

---

## 4. Domain & DNS

**Domain registrar / DNS host:** [VentraIP](https://ventraip.com.au) (cPanel-style DNS panel — "Synergy")

**Nameservers (managed at VentraIP, do not change):**
- `ns1.syd7.hostingplatform.net.au`
- `ns2.syd7.hostingplatform.net.au`

**DNS records currently in place:**

| Type | Hostname | Value | TTL | Purpose |
|---|---|---|---|---|
| **A** | `mymechanicqld.com.au` | `216.198.79.1` | 3600 | Apex → Vercel anycast IP |
| **CNAME** | `www.mymechanicqld.com.au` | `4d49fe13d5422e6f.vercel-dns-017.com.` | 14400 | www subdomain → Vercel (new IP-range CNAME, May 2026) |
| **CNAME** | `mail.mymechanicqld.com.au` | `mymechanicqld.com.au` | 14400 | Webmail access (Microsoft 365) |
| **CNAME** | `6flhdg33g2kl.mymechanicqld.com.au` | `gv-touqeb77wssc7k.dv.googlehosted.com` | 14400 | Google Workspace domain verification |
| **MX** | `mymechanicqld.com.au` | `mymechanicqld-com-au.mail.protection.outlook.com` | 14400 | Inbound mail → Microsoft 365 |
| **TXT** | (various) | `v=DKIM1; k=rsa; ...` | — | DKIM email signing |
| **NS** | `mymechanicqld.com.au` | `ns1.syd7.hostingplatform.net.au` | 86400 | Nameserver delegation |
| **NS** | `mymechanicqld.com.au` | `ns2.syd7.hostingplatform.net.au` | 86400 | Nameserver delegation |

**Stale records to review (not actively used by the website):**
- `lp.mymechanicqld.com.au` → `secure.pageserve.co` — leftover landing-page CNAME from a prior marketing tool. Safe to delete unless a flyer / campaign URL still references it.

**Canonical host:** the apex `mymechanicqld.com.au` is set as canonical in Vercel. `www.mymechanicqld.com.au` 301-redirects to the apex. (Switch this in Vercel → Project Settings → Domains if you want `www` to be canonical instead.)

**SSL:** Let's Encrypt certificate, issued and renewed automatically by Vercel.

**Old Vercel records (still working but deprecated):**
- Apex A `76.76.21.21` (use `216.198.79.1` instead — already updated)
- CNAME `cname.vercel-dns.com` (use the project-specific `4d49fe13d5422e6f.vercel-dns-017.com.` instead — already updated)

---

## 5. Environment variables

All set in **Vercel → Project Settings → Environment Variables** (Production, Preview, Development) and mirrored in local `.env.local`.

### Required for the quote form to work

| Variable | Value (Production) | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tzxaewbadjursnhsokmg.supabase.co` | Public — exposed in client bundle |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_DPG1wxg-sCedbvZdxvSGAQ_hTj9q2m6` | Public anon key — security is RLS, not key secrecy |
| `RESEND_API_KEY` | `re_...` (real key) | Server-only — get from [resend.com/api-keys](https://resend.com/api-keys) |
| `QUOTE_RECIPIENT_EMAIL` | `mymechanicqld@gmail.com` | Where quote notifications land |
| `QUOTE_SENDER_EMAIL` | `onboarding@resend.dev` | Switch to `contact@mymechanicqld.com.au` once domain is verified at Resend |

### Optional / for analytics

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-6YSECEQTDG` | GA4 Measurement ID. **Also hard-coded as fallback** in `app/layout.tsx` so the tag still fires if this var is unset. Get from [analytics.google.com](https://analytics.google.com) Admin → Data Streams |
| `NEXT_PUBLIC_GSC_VERIFICATION` | *(blank or token)* | Google Search Console verification meta tag content |

**Reference template:** [`.env.example`](../.env.example) is the source of truth for what every variable does.

---

## 6. Supabase

**Project:** `tzxaewbadjursnhsokmg` (URL: `https://tzxaewbadjursnhsokmg.supabase.co`)

**Dashboard:** [supabase.com/dashboard/project/tzxaewbadjursnhsokmg](https://supabase.com/dashboard/project/tzxaewbadjursnhsokmg)

**Region:** Closest Supabase region to Sydney users (set at project creation).

**Single table:** `public.quote_submissions`

### Applied migrations

| File | Purpose | Status |
|---|---|---|
| [`20260517_001_quote_submissions.sql`](../supabase/migrations/20260517_001_quote_submissions.sql) | Initial table + indexes + RLS (anon insert/select) | ✅ Applied |
| [`20260517_002_crm_policies.sql`](../supabase/migrations/20260517_002_crm_policies.sql) | UPDATE / DELETE policies for the CRM dashboard + `updated_at` trigger | ✅ Applied |
| [`20260524_003_simplify_form.sql`](../supabase/migrations/20260524_003_simplify_form.sql) | Adds `vehicle_rego` and `consent_privacy` columns to match the simplified form | ✅ Applied |

**To apply a new migration:** paste the SQL into the [Supabase SQL editor](https://supabase.com/dashboard/project/tzxaewbadjursnhsokmg/sql/new) and click Run. There is no CLI deploy step.

### Row-Level Security (RLS)

| Policy | Roles | Action |
|---|---|---|
| `public_can_insert` | `anon`, `authenticated` | INSERT — the public form writes new submissions |
| `public_can_select` | `anon`, `authenticated` | SELECT — the dashboard reads everything |
| `public_can_update` | `anon`, `authenticated` | UPDATE — the dashboard mutates status / notes |
| `public_can_delete` | `anon`, `authenticated` | DELETE — the dashboard archives rows |

> **Note:** RLS is intentionally permissive because the dashboard is an internal tool. If the dashboard is ever exposed publicly, tighten these policies to require Supabase auth.

### Columns (May 2026 schema)

Current (post-2026-05-24 simplification, matches the public form):
- `full_name`, `email`, `phone`, `vehicle_rego`, `suburb`, `symptoms`, `consent_privacy`

Audit / server-populated:
- `id`, `created_at`, `updated_at`, `ip_address`, `user_agent`, `source`

Operational:
- `status` (`new` | `contacted` | `quoted` | `booked` | `won` | `lost` | `archived`)
- `notes` (CRM-side notes)

Legacy (nullable, retained for historical rows):
- `vehicle_make`, `vehicle_model`, `vehicle_year`, `service_needed`, `preferred_time`

---

## 7. Email — Resend

**Account:** [resend.com](https://resend.com) (owner's account)

**API key:** stored in `RESEND_API_KEY` env var. Generate at [resend.com/api-keys](https://resend.com/api-keys).

**Domain verification:** `mymechanicqld.com.au` needs to be verified at [resend.com/domains](https://resend.com/domains) to send from a custom address. Until then `QUOTE_SENDER_EMAIL` must be `onboarding@resend.dev`. Once DNS records (SPF / DKIM) are added at VentraIP and Resend confirms verification, switch the env var to `contact@mymechanicqld.com.au`.

**Free tier limits:** 3,000 emails/month, 100/day — well above current volume.

**Template:** all email styling lives in [`lib/email-templates.ts`](../lib/email-templates.ts). Inline CSS only (email clients strip `<style>` blocks). Brand palette: navy `#1E3A8A` on stone `#FAFAF8`.

**What gets sent:** every quote-form submission triggers a notification email to `QUOTE_RECIPIENT_EMAIL`, with `Reply-To` set to the customer's email so a one-tap reply goes straight back.

---

## 8. Build pipeline & CI

**Continuous deploy:** Vercel watches `main`. Push → build → deploy → live, typically under 2 minutes end-to-end.

**Preview deploys:** every non-main branch and every PR builds to a unique `*.vercel.app` URL, automatically posted as a PR comment.

**GitHub Actions:** [`.github/workflows/build.yml`](../.github/workflows/build.yml) runs `next build` on every PR as a sanity check, independent of Vercel. Catches build breakages even if Vercel happens to be slow.

**Local build sanity check:**
```bash
npm ci
npm run build
# ✓ Compiled successfully
# ✓ Generating static pages (43/43)
```

---

## 9. Common operations

### Deploy a code change

Push to `main`. That's it.

```bash
git add .
git commit -m "fix: …"
git push                  # → origin (Singh-Gursahib mirror)
git push mmqld main       # → primary repo, triggers Vercel build
```

### Roll back a bad deploy

1. Vercel Dashboard → **Deployments**
2. Find the last known-good deploy
3. **`⋯` → Promote to Production**

Instant. Doesn't require a new build.

### Update an env var

1. Vercel Dashboard → **Settings → Environment Variables**
2. Edit the var, save
3. Click **Deployments → ⋯ → Redeploy** on the current production deploy *(env vars only take effect on a fresh build)*
4. Also update `.env.local` locally if it's a value you use in dev

### Change a DNS record

1. Log in to [VentraIP](https://ventraip.com.au) → Services → MyMechanicQLD → Manage DNS
2. Edit / add / delete the record
3. Save
4. Wait 5–30 min for propagation (TTL-dependent)
5. Verify with `dig` (see CLI snippets below)
6. Click **Refresh** on the Vercel Domains panel

### Apply a new Supabase migration

1. Add the SQL file to `supabase/migrations/` (filename: `YYYYMMDD_NNN_description.sql`)
2. Commit and push
3. Open [Supabase SQL editor](https://supabase.com/dashboard/project/tzxaewbadjursnhsokmg/sql/new)
4. Paste the SQL, click **Run**
5. Update the migrations table in this doc

### Verify the dashboard CRM still works

`open dashboard/index.html` (any browser). The file is a standalone HTML page that reads directly from Supabase via the publishable key (obfuscated in-source via a +13 char-code rotation).

### Rotate the Supabase publishable key

1. Generate the new key in the Supabase dashboard
2. Update `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel + `.env.local`
3. Update the obfuscated `_enc` block in `dashboard/index.html`:
   ```bash
   node scripts/encode-creds.mjs
   # Paste the printed `_enc = {...}` block over the existing one
   ```
4. Redeploy the Vercel project

---

## 10. Troubleshooting log

Real issues that have come up, and what fixed them. Append new ones as they happen.

### "Vulnerable version of Next.js detected, please update immediately"

Vercel post-build runs a vulnerability scanner. If the scanner flags the bundled Next.js version, the deploy is rejected even though `next build` succeeded.

**Fix:**
```bash
npm install next@latest react@latest react-dom@latest
rm -rf .next
npm run build              # confirm local build still passes
git commit -am "chore(deps): upgrade Next.js"
git push mmqld main
```

The scanner is stricter than the CVE advisory itself — being on a "patched" point release in your release line isn't always enough. Usually they want the latest major.

### Build fails with `Cannot find module for page: /...`

`.next` cache corrupted, usually after a major Next.js upgrade.

**Fix:** delete `.next` locally, rebuild, push.

For Vercel, redeploy with **Use existing Build Cache** unchecked from the Deployments menu.

### `gh` CLI targets the wrong account

The SSH key authenticates as Singh-Gursahib (works for both repos); the `gh` CLI uses its own token auth and may be signed in elsewhere.

```bash
gh auth status                            # see which account is active
gh auth login                             # sign in fresh
gh auth switch -u Singh-Gursahib          # already-authenticated switch
```

### Quote form silently fails in production

Check the function logs in Vercel (**Project → Logs → Functions**) for the `submitQuoteAction` invocation:

| Symptom in logs | Fix |
|---|---|
| `[quote-request] RESEND_API_KEY missing, skipping email` | Set the real Resend key in Vercel env vars + redeploy |
| `[quote-request] supabase insert failed: ...` | Migration `20260524_003_simplify_form.sql` likely not applied |
| `[quote-request] resend email failed: from address ...` | Resend domain not verified yet — use `onboarding@resend.dev` as sender |

### `www` subdomain shows Invalid Configuration in Vercel

DNS not propagated, or CNAME is wrong / missing.

**Fix:** add a CNAME at VentraIP: `www` → `4d49fe13d5422e6f.vercel-dns-017.com.` (or `cname.vercel-dns.com` as a fallback). Wait 15 min, click Refresh.

### Vercel "DNS Change Recommended" amber banner

Vercel rolled out a new IP range. The old records still work — banner is informational. Update the CNAME at VentraIP to the new project-specific value Vercel shows (currently `4d49fe13d5422e6f.vercel-dns-017.com.`).

---

## 11. Handy CLI snippets

```bash
# Confirm apex resolves to Vercel
dig mymechanicqld.com.au A +short
# → 216.198.79.1

# Confirm www CNAME
dig www.mymechanicqld.com.au CNAME +short
# → 4d49fe13d5422e6f.vercel-dns-017.com.

# Confirm HTTPS / cert
curl -sI https://www.mymechanicqld.com.au | head -1
# → HTTP/2 200  (or 301 if www isn't canonical)

# Live tail Vercel logs
npx vercel logs --follow

# Pull production env vars to .env.local (overwrites!)
npx vercel env pull

# Force-redeploy current production without code changes
# (useful after editing env vars)
npx vercel redeploy --prod
```

---

## 12. Contacts & accounts

| Service | Account / owner | Where to log in |
|---|---|---|
| **Vercel** | Owner's GitHub | [vercel.com/dashboard](https://vercel.com/dashboard) |
| **GitHub (primary)** | `mymechanicqld` org | [github.com/mymechanicqld](https://github.com/mymechanicqld) |
| **GitHub (backup)** | `Singh-Gursahib` | [github.com/Singh-Gursahib/MyMechanicQLD](https://github.com/Singh-Gursahib/MyMechanicQLD) |
| **Supabase** | Owner's account | [supabase.com/dashboard](https://supabase.com/dashboard) |
| **Resend** | Owner's account | [resend.com](https://resend.com) |
| **VentraIP** | Owner's account | [ventraip.com.au/my-account](https://ventraip.com.au/my-account) |
| **Microsoft 365** *(email)* | Owner's account | [admin.microsoft.com](https://admin.microsoft.com) |
| **Google Search Console** | Owner's Google account | [search.google.com/search-console](https://search.google.com/search-console) |
| **Google Analytics** | Owner's Google account | [analytics.google.com](https://analytics.google.com) |

---

## 13. Change history

Significant infrastructure changes. Append new entries to the top.

- **2026-05-26 — GA4 env var name tidied.** Fixed mismatch where `.env.example` documented `NEXT_PUBLIC_GA4_MEASUREMENT_ID` but `app/layout.tsx` was reading `NEXT_PUBLIC_GA_ID`. Standardised on `NEXT_PUBLIC_GA_ID`. GA4 tag (`G-6YSECEQTDG`) was already live on every page via the hard-coded fallback in layout.tsx.
- **2026-05-26 — Vercel DNS recommendation applied.** Updated the `www` CNAME at VentraIP from `cname.vercel-dns.com` to the project-specific `4d49fe13d5422e6f.vercel-dns-017.com.` to use Vercel's expanded IP range.
- **2026-05-26 — Domain connected.** Apex `mymechanicqld.com.au` A record pointed at `216.198.79.1`; `www` CNAME added; old hosting-provider A records removed at VentraIP. SSL auto-issued.
- **2026-05-25 — Repo split.** Created `mymechanicqld/MyMechanicWebsite` as the primary repo; admin tools (`tools/`, `dashboard/`, `concepts/`, `.claude/`) moved to `.gitignore` to keep the website repo focused.
- **2026-05-24 — Form simplified.** Public quote form reduced to seven required fields (Name, Phone, Email, Rego, Suburb, How can we help?, Privacy consent) matching the original site. Migration `003` added `vehicle_rego` + `consent_privacy` columns. Email recipient changed to `mymechanicqld@gmail.com`.
- **2026-05-18 — Content audit.** ACL warranty wording, fabricated reviews, and forbidden-services drift cleaned up across the site.
- **2026-05-17 — Initial production deploy.** Next.js 16.2.6, Supabase migrations 001 + 002 applied, Resend wired (still on `onboarding@resend.dev` sender pending domain verification).
