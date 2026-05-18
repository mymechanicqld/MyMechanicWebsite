---
name: mymechanicqld-project
description: Project standards, brand voice, design system, services scope, and SEO approach for the My Mechanic QLD mobile mechanic website rebuild. Use this skill whenever working on anything related to My Mechanic QLD, mymechanicqld.com.au, the rebuild project at /Users/macbook/Documents/MyProjects/MyMechanicQLD, or any task that involves writing copy, designing pages, choosing colours or fonts, building components, generating image prompts, writing meta tags, structuring URLs, naming services, planning blog posts, or making strategic decisions for this site. Trigger even on indirect references like "MMQLD", "the mechanic site", "the Brisbane mobile mechanic project", or whenever the working directory is the project folder. This skill is critical for keeping work consistent and for avoiding the single biggest landmine on this project: mentioning services the business does not actually offer.
---

# My Mechanic QLD Project Standards

This skill encodes the brand, content, design and SEO standards for the My Mechanic QLD website rebuild. It exists because the project has a handful of strict rules. Most importantly, a list of services the business does **not** offer. Without these rules, copy and design choices drift in ways that cost the business real money.

When this skill is in scope, treat the rules below as authoritative. For deeper detail, read the referenced docs in the project's `docs/` folder.

## Project location

- **Working directory:** `/Users/macbook/Documents/MyProjects/MyMechanicQLD`
- **Key docs:**
  - `docs/BUSINESS.md` — owner-confirmed business profile, contact, services, areas
  - `docs/CONTENT_STRATEGY.md` — SEO plan, nav structure, blog backlog
  - `docs/DESIGN_SYSTEM.md` — full design tokens and rules
  - `docs/IMPLEMENTATION_PLAN.md` — staged delivery plan
  - `docs/IMAGES.json` — image manifest with photorealistic AI prompts
  - `concepts/concept-b-professional.html` — the chosen homepage direction
  - `crawl/` — competitor and current-site crawl data
  - `scraped-images/` — images downloaded from the live site (when present)

## The single most important rule: services we do NOT mention

The owner has confirmed the business does **not** offer these services. They must never appear in public-facing content. Not on the homepage, not on service pages, not in blog posts, not in the FAQ, not in meta descriptions, not in image alt text, not in schema markup, not in form dropdowns. Anywhere a user might see them, they are absent:

- Air-conditioning services (regas, repair, replacement)
- Auto electrical work (wiring, ECU, accessories, fault repair beyond reading codes)
- DIY rescue jobs (fixing or finishing what the customer started)
- Jobs where the customer supplies their own parts
- Trucks and trailers
- Heavy machinery
- Motorcycles
- Tyre fitting and tyre repair

This is non-negotiable. The site stays positive about what we *do* offer. Describe scope as "We service cars, SUVs and light utes across South East Queensland" rather than naming exclusions.

If a piece of content drifts toward any of these areas, rewrite it. If a structured field (e.g., a service dropdown in a booking form) has options for these, remove them.

## The services we DO offer

In order of SEO priority:

1. **Brake repair** ★ Top priority
2. **Alternator and starter motor replacement** ★ Top priority
3. **Radiator and water pump replacement** ★ Top priority
4. **General car servicing (logbook + standard)** ★ Top priority
5. Pre-purchase inspection
6. Battery replacement
7. Warning-light diagnostics (reading codes, not fixing electrical faults)
8. Steering and suspension
9. Emergency call-outs / breakdowns

The four starred services drive most of the SEO effort. Lead with them on the homepage, the Repairs hub, and the suburb landing pages.

## Service area

The owner lives in Springwood (Logan, Brisbane's Southside) and works a **50 to 60 km radius**. That covers:

- Brisbane (Northside through Bayside to inner west)
- Logan (home base, fastest response)
- Ipswich (Springfield, Goodna, Redbank Plains, Brassall and surrounds)
- Northern Gold Coast (Coomera, Helensvale, Nerang, Southport, Robina)

Do not claim coverage outside this radius. Be specific in copy. "Within an hour of Springwood" reads more credibly than "all of South East Queensland".

## Brand voice rules

Australian small-business copy, polished but not corporate. Write like a copywriter who specialises in trades, not like a model.

**Always:**

- Australian spelling: tyre, kerb, organise, colour
- First-person plural (`we`, `our team`) for the business voice
- First-person singular (`I`) for the owner's voice, used only in the owner section and bylined blog posts
- Specific over generic. Name parts brands (Bosch, Bendix, Brembo, Ryco, NGK). Name suburbs. Name models. Give real prices.
- Strong verbs and short sentences mixed with longer ones
- Direct symptoms in service copy: "Squealing or grinding?", "Slow cranking on a cold morning?"
- Prices in AUD with no decimals for round amounts. `$249` not `$249.00`.

**Never:**

- Em-dashes (`—`). Use commas, full stops, or restructure the sentence.
- "Whether you're A, B, or C" constructions
- "Not just X, but Y" constructions
- "Whether you need X, Y or Z, we've got you covered"
- Filler adjectives: comprehensive, seamless, premium, tailored, dedicated, world-class. If you say "premium", name the brand.
- "Trust the experts", "take it to the next level", "in today's fast-paced world"
- Triplet patterns where every sentence has three commas
- Hype claims like "#1 in QLD"
- Emojis in copy or UI

**Voice for the owner section specifically:**

- First-person singular
- Speaks like a tradesperson, not an executive
- References concrete experiences ("fifteen years in dealership workshops")
- Ends with a direct invitation to call the owner's phone

## Design system

The full system is in `docs/DESIGN_SYSTEM.md`. Quick reference:

**Colours**
- Background: warm or stone whites (`#FAFAF8`, `#F5F4EF`, `#FBF8F1`)
- Surface (cards): `#FFFFFF`
- Ink (body text): `#0C0A09` through `#1C1917`
- Muted: `#44403C`
- Accent: deep navy `#1E3A8A`, hover `#1E40AF`, bright `#2563EB`, tint `#E8EEFB`
- Borders: hairline `#E7E5E0`, strong `#D6D3CB`
- Light theme only at launch. No dark mode.

**Typography**

- Inter for body and UI, weights 400–700
- The chosen homepage concept (`concept-b-professional`) uses Inter throughout
- Fraunces (serif) is acceptable for editorial moments but is not the default

**Icons**

- Lucide. `lucide-react` in production, CDN in HTML concepts.
- Stroke width 1.5 to 1.75
- No emojis anywhere in UI or copy

**Spacing**

- 4px grid
- Section padding: 3.5rem mobile, 5rem tablet, 7rem desktop
- Container max-width 1240px with responsive gutters (1.25 / 1.5 / 2rem)

## Nav and URL structure

The IA mirrors the competitor (Auto King) at the top level because it's proven to work in this category.

**Top navigation:**

```
Home   Repairs   Servicing   Pre-Purchase Inspections   Locations   About   Contact     [Get a quote CTA]
```

A utility bar above the header carries the trading hours and the phone number.

**URL pattern.** Preserve the existing URLs from the live `mymechanicqld.com.au` site wherever possible, so SEO equity carries through:

- `/` homepage
- `/brake-repairs/`, `/starter-alternator/`, `/logbook-servicing/`, `/radiator-cooling-system/`, `/battery-replacement/`, `/car-diagnostics/`, `/pre-purchase-inspection/`, `/steering-suspension/` — services, flat URLs as the existing site has them indexed
- `/services/` — services hub
- `/{suburb}/` — suburb pages, flat (e.g. `/sunnybank/`, `/carindale/`)
- `/areas/`, `/brisbane/`, `/logan/`, `/ipswich/`, `/gold-coast/`
- `/about/`, `/contact/`, `/faq/`, `/blog/`, `/blog/{slug}/`

URLs that already exist on `mymechanicqld.com.au` stay the same. New pages get sensible new slugs.

## Image rules

All images must be photorealistic, look photographed, and sit in Australian context. The full image manifest is in `docs/IMAGES.json`. When images have been scraped from the live site, they live in `scraped-images/` and should be preferred over AI generation where the existing photo is good enough.

When writing an AI image prompt:

- **The word "photorealistic" must appear in the prompt.** Non-negotiable.
- Append the global style fragment from `IMAGES.json` (`style_constraints.global_style_appended_to_every_prompt`) and the negative prompt.
- Australian suburban context: real Queensland houses, real cars (Toyota, Mazda, Hyundai, Ford Ranger, Hilux), Australian numberplates blurred or generic.
- Navy work shirt for the mechanic.
- No illustrations, no 3D renders, no stock-photo handshake cliches.
- Alt text describes the image plainly without keyword stuffing.

## SEO approach

Full plan in `docs/CONTENT_STRATEGY.md`. Short version:

- **Pillar and cluster model.** Each of the four priority services has a pillar guide plus 3–5 supporting blog posts.
- **Programmatic SEO.** Priority service × suburb landing pages (e.g. brake repair in Sunnybank), every page hand-edited to 700+ unique words with a real local paragraph.
- **Schema.** `LocalBusiness` sitewide, `Service` per service page, `FAQPage` where there's a FAQ, `BlogPosting` per post, `BreadcrumbList` on every non-home page.
- **E-E-A-T.** Owner-bylined blog posts with photo, qualifications and years in trade. The About page leads with the owner's story.
- **Meta tags.** Unique title and meta description on every page. No duplicate titles (the competitor's biggest mistake).
- **No fake reviews** in `AggregateRating`. Pull from the real Google Business Profile.

## Working checklist before publishing anything

Before a piece of public copy ships, run through this list:

1. Scan for em-dashes. Replace them.
2. Scan for any of the forbidden services. Remove every mention.
3. Confirm Australian spellings.
4. Confirm no emojis.
5. Confirm no triplet or AI-pattern phrases.
6. Confirm Lucide icons (not emoji) used in UI.
7. Confirm any image prompt contains "photorealistic".
8. Confirm the page has a unique title and meta description.
9. Confirm the page has appropriate JSON-LD schema for its type.

## When in doubt

Re-read the relevant doc in `docs/`. If still in doubt, ask the human rather than guess. The cost of generating off-brand content is higher than the cost of a clarifying question.
