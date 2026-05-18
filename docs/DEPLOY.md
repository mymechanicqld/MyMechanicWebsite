# Deploying My Mechanic QLD to Vercel

This is the step-by-step launch playbook. Follow it once, top to bottom, the
first time you deploy. After that, every push to `main` deploys
automatically.

---

## 0. Prerequisites

- [ ] GitHub account with repo access
- [ ] Vercel account (sign up with the same GitHub account)
- [ ] DNS access for `mymechanicqld.com.au` (currently at the existing host)
- [ ] Owner inputs filled in (see `docs/PROJECT_STRUCTURE.md` — eight `TBD`
      placeholders for founding year, photo, GSC token, GA4 ID, social URLs,
      real Google review count)

---

## 1. Push to GitHub

```bash
git init                              # if not already a git repo
git add .
git commit -m "Initial commit: My Mechanic QLD rebuild"
gh repo create mymechanicqld --private --source . --push
```

Or, if creating the repo manually on github.com, follow GitHub's "push an
existing repository" instructions.

---

## 2. Import into Vercel

1. Go to https://vercel.com/new
2. Pick the `mymechanicqld` repo
3. **Framework preset**: Next.js (auto-detected)
4. **Root directory**: `.` (default)
5. **Build command**, **output directory**, **install command**: leave on
   defaults — `vercel.json` overrides them correctly
6. Don't click Deploy yet — add environment variables first (next step)

---

## 3. Add environment variables

In the Vercel project settings → Environment Variables, add each of these
from `.env.example`. Mark each as available for **Production**,
**Preview**, and **Development** unless noted.

| Variable                          | Where to get it                           | Required for launch |
| --------------------------------- | ----------------------------------------- | ------------------- |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID`  | analytics.google.com → Admin → Data Streams | Yes               |
| `NEXT_PUBLIC_GSC_VERIFICATION`    | search.google.com/search-console          | Yes                 |
| `RESEND_API_KEY`                  | resend.com/api-keys                       | Yes                 |
| `QUOTE_RECIPIENT_EMAIL`           | The owner's preferred inbox               | Yes                 |
| `QUOTE_SENDER_EMAIL`              | A verified sender on your mail domain     | Yes                 |

Without `RESEND_API_KEY` and `QUOTE_RECIPIENT_EMAIL`, the quote form will
log submissions to the Vercel function log but won't email anyone — wire
this up in `app/actions.ts` before launch.

---

## 4. First deploy

Click **Deploy**. The first build takes ~2 minutes. When it's green, Vercel
hands you a `*.vercel.app` URL. Test:

- [ ] Homepage loads, hero image renders
- [ ] `/brake-repairs/`, `/logbook-servicing/` etc render with hero images
- [ ] Mobile drawer opens and links work (resize to 360 px width)
- [ ] `/sitemap.xml` returns 38 URLs
- [ ] `/robots.txt` lists the AI crawlers
- [ ] `/llms.txt` and `/llms-full.txt` are served
- [ ] Submit the quote form — check Vercel function logs / inbox

---

## 5. Connect the custom domain

1. Vercel project → Settings → Domains → Add `mymechanicqld.com.au` and
   `www.mymechanicqld.com.au`
2. Vercel will give you either A/AAAA records (apex) and a CNAME
   (`cname.vercel-dns.com` for `www`) — or a single ANAME if your DNS host
   supports it
3. Update DNS at the registrar (likely Crazy Domains or VentraIP given the
   `.com.au` TLD). Set TTL low (300 s) for the cutover, raise to 3600 once
   stable
4. Wait for propagation (usually under 30 minutes, occasionally a few hours)
5. Vercel issues a Let's Encrypt cert automatically once DNS resolves

Choose one canonical host in Vercel (recommend `www.mymechanicqld.com.au`)
and Vercel will 301-redirect the other to it.

---

## 6. Post-launch verification

- [ ] `https://www.mymechanicqld.com.au/` returns 200 over HTTPS
- [ ] Old URLs 301-redirect to new ones (spot-check 3 from `redirects.json`)
- [ ] Submit sitemap in Google Search Console:
      `https://www.mymechanicqld.com.au/sitemap.xml`
- [ ] Request indexing for the homepage in GSC
- [ ] Lighthouse audit on the homepage:
      - LCP under 2.5 s (hero is now ~92 KB WebP)
      - CLS under 0.1
      - INP under 200 ms
- [ ] OG preview: paste the URL into https://www.opengraph.xyz/ and confirm
      the og-default.webp renders
- [ ] Run a Rich Results test on `/brake-repairs/` —
      https://search.google.com/test/rich-results

---

## 7. Ongoing

- Every push to `main` deploys to production automatically.
- Every push to any other branch creates a **preview deployment** with its
  own URL (`*.vercel.app`) so you can share drafts without affecting prod.
- Open a PR → preview URL is posted as a comment automatically.
- The GitHub Actions workflow at `.github/workflows/build.yml` runs
  `next build` on every PR as a sanity check — independent of Vercel.

---

## Rollback

If a deploy breaks something:

1. Vercel dashboard → Deployments
2. Find the last known-good deployment
3. Click `…` → **Promote to Production**

This is instant and doesn't require a new build.

---

## Notes specific to this project

- **Trailing slashes**: Enforced by both `next.config.mjs`
  (`trailingSlash: true`) and `vercel.json`. Don't change one without the
  other — they need to agree or you'll get redirect loops.
- **Region**: Set to `syd1` (Sydney) in `vercel.json`. Closest to the
  Brisbane/Logan/Gold Coast user base. Don't change unless you have a
  reason.
- **Image optimization**: Vercel's Image Optimization API kicks in
  automatically for `<Image>` components. The WebP files in
  `public/images/` are already optimized; Vercel will further serve AVIF to
  capable browsers.
- **No database**: This is a static-export-friendly site with one server
  action (`submitQuoteAction`). Everything else prerenders.
