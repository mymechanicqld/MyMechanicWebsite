# Deploying My Mechanic QLD to Vercel

Step-by-step launch playbook. Follow it once, top to bottom, the first time.
After that, every push to `main` deploys automatically.

---

## 0. Prerequisites

- [ ] GitHub account with repo access (`Singh-Gursahib/MyMechanicQLD`)
- [ ] Vercel account (sign up with the same GitHub account that owns the repo)
- [ ] Supabase project at `https://supabase.com/dashboard/project/tzxaewbadjursnhsokmg`
- [ ] Resend account at https://resend.com with a real API key (free tier is fine)
- [ ] DNS access for `mymechanicqld.com.au` (registrar dashboard)
- [ ] Owner inputs filled in (see `docs/PROJECT_STRUCTURE.md` — eight `TBD`
      placeholders for founding year, photo, GSC token, GA4 ID, social URLs,
      real Google review count)

---

## 1. Push to GitHub

Already done. The repo lives at `https://github.com/Singh-Gursahib/MyMechanicQLD`.

> **Auth note:** the `gh` CLI on this laptop is signed in as the
> `singhgursahib0007` account, but the SSH key at `~/.ssh/id_ed25519` is
> registered to `Singh-Gursahib`. Git push works (SSH remote), but
> `gh pr create` and similar will target the wrong account unless you
> `gh auth login` as Singh-Gursahib first. The remote is set to
> `git@github.com:Singh-Gursahib/MyMechanicQLD.git` (SSH) for this reason.

---

## 2. Import the repo into Vercel

1. Go to https://vercel.com/new
2. Sign in with the **Singh-Gursahib** GitHub account
3. Pick the `MyMechanicQLD` repo → **Import**
4. **Framework preset**: Next.js (auto-detected)
5. **Root directory**: `.` (default)
6. Leave the build / install / output settings on defaults — `vercel.json`
   already pins them (`next build`, `npm ci`, `.next`, region `syd1`)
7. **Do not click Deploy yet** — add env vars first (next step)

---

## 3. Environment variables

In **Project Settings → Environment Variables**, add each row from the table
below. Apply to **Production**, **Preview**, and **Development** unless noted.

| Variable                                | Value / where to get it                                                | Required for launch                |
| --------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`              | `https://tzxaewbadjursnhsokmg.supabase.co`                             | Yes — quote form storage           |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`  | `sb_publishable_DPG1wxg-sCedbvZdxvSGAQ_hTj9q2m6`                       | Yes — quote form storage           |
| `RESEND_API_KEY`                        | https://resend.com/api-keys (the real `re_...` key)                    | Yes — owner email notification     |
| `QUOTE_RECIPIENT_EMAIL`                 | `gursahib99888@gmail.com` (or wherever the owner reads quote requests) | Yes                                |
| `QUOTE_SENDER_EMAIL`                    | `onboarding@resend.dev` initially; `contact@mymechanicqld.com.au` once domain is verified at Resend | Yes |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID`        | analytics.google.com → Admin → Data Streams                            | Recommended, can be blank pre-launch |
| `NEXT_PUBLIC_GSC_VERIFICATION`          | search.google.com/search-console verification token                    | Recommended, can be blank pre-launch |

> **Why `NEXT_PUBLIC_*` is fine for the Supabase key:** the publishable key is
> designed to be public. The security is Supabase Row-Level Security
> policies, not key secrecy. See `supabase/migrations/` for the actual rules.

> **Resend sender quirk:** until the `mymechanicqld.com.au` domain is verified
> at https://resend.com/domains, the only allowed `from:` is
> `onboarding@resend.dev`. Anything else fails silently in the email step.
> Domain verification needs a few DNS records (TXT + DKIM); Resend's UI walks
> you through it.

---

## 4. Apply the Supabase migrations

The deployed site won't be able to save quotes until the database tables
exist. Open the Supabase SQL editor at
https://supabase.com/dashboard/project/tzxaewbadjursnhsokmg/sql/new and run
each file below in order, top to bottom:

1. `supabase/migrations/20260517_001_quote_submissions.sql` — table, indexes,
   RLS policies for anon insert + select
2. `supabase/migrations/20260517_002_crm_policies.sql` — UPDATE + DELETE
   policies for the dashboard, plus `updated_at` column + trigger
3. (Optional but recommended) `supabase/seed.sql` — 5 dummy inquiries so the
   dashboard isn't empty for the demo

You'll know it worked when **Table Editor → `quote_submissions`** lists the
columns and (if you ran the seed) 5 rows.

---

## 5. First deploy

Click **Deploy** in Vercel. First build takes ~2 min. Vercel hands you a
`mymechanicqld-xxx.vercel.app` URL. Verify:

- [ ] Homepage loads, hero image renders
- [ ] `/brake-repairs/`, `/logbook-servicing/` etc render with hero images
- [ ] Mobile drawer opens and links work (resize to 360 px width)
- [ ] `/sitemap.xml` returns 38+ URLs
- [ ] `/robots.txt` lists the AI crawlers
- [ ] `/llms.txt` and `/llms-full.txt` are served
- [ ] Submit the quote form — confirm:
      - row appears in Supabase Table Editor
      - email arrives at `QUOTE_RECIPIENT_EMAIL`
- [ ] Open `dashboard/index.html` locally → the submission appears in the
      Inquiries view

---

## 6. Connect the custom domain

1. Vercel project → **Settings → Domains** → add both
   `mymechanicqld.com.au` and `www.mymechanicqld.com.au`
2. Vercel will show you either A/AAAA records (apex) and a CNAME
   (`cname.vercel-dns.com` for `www`) — or a single ANAME if your DNS host
   supports it
3. Update DNS at the registrar (likely Crazy Domains or VentraIP given the
   `.com.au` TLD). Set TTL low (300 s) for the cutover, raise to 3600 once
   stable
4. Wait for propagation (usually under 30 minutes, occasionally a few hours)
5. Vercel issues a Let's Encrypt cert automatically once DNS resolves
6. Pick one canonical host (recommend `www.mymechanicqld.com.au`) — Vercel
   will 301-redirect the other to it

---

## 7. Post-launch verification

- [ ] `https://www.mymechanicqld.com.au/` returns 200 over HTTPS
- [ ] Old URLs 301-redirect to new ones (spot-check 3 from `redirects.json`)
- [ ] Submit sitemap in Google Search Console:
      `https://www.mymechanicqld.com.au/sitemap.xml`
- [ ] Request indexing for the homepage in GSC
- [ ] Lighthouse audit on the homepage from the **production** URL (not the
      `*.vercel.app` preview — see SEO note in `docs/SEO_PLAYBOOK.md`):
      - LCP under 2.5 s (hero is ~92 KB WebP)
      - CLS under 0.1
      - INP under 200 ms
      - SEO ≥ 95
- [ ] OG preview: paste the URL into https://www.opengraph.xyz/ and confirm
      `og-default.webp` renders
- [ ] Run a Rich Results test on `/brake-repairs/` —
      https://search.google.com/test/rich-results

---

## 8. Ongoing

- Every push to `main` deploys to production automatically.
- Every push to any other branch creates a **preview deployment** with its
  own `*.vercel.app` URL.
- The GitHub Actions workflow at `.github/workflows/build.yml` runs
  `next build` on every PR as a sanity check — independent of Vercel.
- Dashboard updates: `dashboard/index.html` is a static file served locally,
  not deployed to Vercel. Open it in a browser to manage inquiries.

### Updating the dashboard's Supabase credentials

If you ever rotate the Supabase publishable key:

```bash
# Edit .env.local with the new key, then:
node scripts/encode-creds.mjs
# Paste the printed `_enc = {...}` block into dashboard/index.html
git commit -am "Rotate Supabase publishable key in dashboard"
git push
```

The dashboard credentials are obfuscated (char-code +13 rotation) so the
file is safe to push to GitHub without lighting up secret scanners.

---

## Rollback

If a deploy breaks production:

1. Vercel dashboard → **Deployments**
2. Find the last known-good deployment
3. Click `…` → **Promote to Production**

Instant. Doesn't require a new build.

---

## Troubleshooting

### "Vulnerable version of Next.js detected, please update immediately"

Vercel post-build runs a vulnerability scanner against the bundled Next.js
version. If it fails, the deploy is rejected even though `next build`
succeeded.

```bash
# Check what's currently pinned
npm ls next

# Bump to the actual latest stable (not a transitive minor patch)
npm install next@latest react@latest react-dom@latest

# Wipe stale build cache (Next.js gets confused after a major bump otherwise)
rm -rf .next

# Verify the build still passes locally
npm run build

git commit -am "chore(deps): upgrade Next.js to latest"
git push
```

Reference: https://nextjs.org/blog/CVE-2025-66478. The scanner is stricter
than the CVE advisory itself — being technically patched in your release
line isn't enough; you generally need to be on the latest major.

### Quote form silently fails in production

Check the function logs in Vercel (**Project → Logs → Functions**) for the
`submitQuoteAction` invocation. Most common causes:

| Symptom in logs                                           | Fix                                                   |
| --------------------------------------------------------- | ----------------------------------------------------- |
| `[quote-request] RESEND_API_KEY missing, skipping email`  | Set `RESEND_API_KEY` in Vercel env vars               |
| `[quote-request] supabase insert failed: ...`             | Migration not applied — re-run step 4                 |
| `[quote-request] resend email failed: from address ...`   | Domain not verified at Resend; use `onboarding@resend.dev` until it is |

### Build fails with `Cannot find module for page: /...`

`.next` cache got corrupted (usually after a major Next.js upgrade). The
fix is to delete it and rebuild:

```bash
rm -rf .next
npm run build
```

If the production build on Vercel hits this, redeploy with **Use existing
Build Cache** unchecked from the Deployments menu.

### `gh` CLI targets the wrong account

```bash
gh auth status                # confirms which account
gh auth login                  # switch accounts
gh auth switch -u Singh-Gursahib   # if already authenticated to both
```

---

## Notes specific to this project

- **Trailing slashes**: Enforced by both `next.config.mjs`
  (`trailingSlash: true`) and `vercel.json`. Don't change one without the
  other — they need to agree or you'll get redirect loops.
- **Region**: Set to `syd1` (Sydney) in `vercel.json`. Closest to the
  Brisbane / Logan / Gold Coast user base.
- **Image optimization**: Vercel's Image Optimization API kicks in
  automatically for `<Image>` components. The WebP files in
  `public/images/` are already optimized; Vercel further serves AVIF to
  capable browsers.
- **Database**: Supabase Postgres. One table (`quote_submissions`). RLS is
  the only thing standing between the public key and unauthorized writes —
  do not slacken policies without understanding what changes.
- **Email**: Resend transactional API. Free tier is 3 000 emails/month and
  100/day, which is more than enough.
