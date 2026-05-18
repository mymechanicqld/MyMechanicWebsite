# Design System

The visual language for the new site. Drives the Tailwind config, governs the homepage concepts, and ensures consistency across every page type.

**Design intent:** clean, premium, modern service-business feel. Inspired by Anthropic's quiet confidence — content-forward, generous whitespace, light theme, blue accents, restrained type. Avoids automotive industry clichés (no chrome, no checkered flags, no fire effects, no oversaturated reds).

---

## Colour palette

### Core

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-bg-soft` | `#FAFAF7` | Section alt-background (warm off-white) |
| `--color-bg-muted` | `#F4F4EF` | Card backgrounds, subtle separation |
| `--color-border` | `#E5E5DD` | Hairline dividers, card borders |
| `--color-border-strong` | `#D4D4C8` | Form input borders |

### Text

| Token | Hex | Use |
|---|---|---|
| `--color-text` | `#1A1A1A` | Body copy (very dark grey, not pure black) |
| `--color-text-heading` | `#0F172A` | Headings (slate-900) |
| `--color-text-muted` | `#525252` | Secondary copy, captions |
| `--color-text-subtle` | `#737373` | Labels, metadata |
| `--color-text-inverse` | `#FFFFFF` | Text on dark/blue backgrounds |

### Accent — Blue

| Token | Hex | Use |
|---|---|---|
| `--color-accent-50` | `#EFF6FF` | Faint tint backgrounds |
| `--color-accent-100` | `#DBEAFE` | Highlight backgrounds |
| `--color-accent-500` | `#3B82F6` | Hover states, secondary actions |
| `--color-accent-600` | `#2563EB` | **Primary brand blue** — buttons, links |
| `--color-accent-700` | `#1D4ED8` | Hover on primary |
| `--color-accent-900` | `#1E3A8A` | Heading accents, deep blue elements |

### Functional

| Token | Hex | Use |
|---|---|---|
| `--color-success` | `#059669` | Success messages, "warranty safe" badges |
| `--color-warning` | `#D97706` | Warnings (use sparingly) |
| `--color-error` | `#DC2626` | Form errors |

### Notes on use
- **Light theme only** at launch. No dark mode in v1.
- **One blue, used consistently.** `--color-accent-600` is the brand blue. Don't introduce teals, purples, or extra hues.
- **No gradients on primary surfaces.** A single soft gradient (white → `#FAFAF7`) is acceptable for hero sections.
- **No shadows on cards by default** — borders only. Shadows reserved for floating elements (dropdowns, modals).

---

## Typography

### Type families

| Role | Font | Fallback stack | Weight range |
|---|---|---|---|
| Display & headings | **Fraunces** (Google Fonts) — variable serif | `ui-serif, Georgia, serif` | 400, 500, 600 |
| Body & UI | **Inter** (Google Fonts) — variable sans | `ui-sans-serif, system-ui, sans-serif` | 400, 500, 600, 700 |
| Mono / data | **JetBrains Mono** | `ui-monospace, SFMono-Regular, Consolas, monospace` | 400, 500 |

**Why Fraunces:** subtle, modern serif with personality. Reads as premium and editorial without being precious. Pairs cleanly with Inter.

**Alternative if Fraunces feels too editorial:** swap to Inter for everything (single-family system, very common for SaaS-style cleanliness). Concept 2 demonstrates this approach.

### Type scale

Mobile-first, scales up on `lg+`. Units in `rem` (1rem = 16px).

| Token | Size (mobile / desktop) | Line height | Letter spacing | Use |
|---|---|---|---|---|
| `text-display-xl` | 2.5rem / 4.5rem (40px / 72px) | 1.05 | -0.02em | Hero H1 only |
| `text-display-lg` | 2rem / 3.5rem (32px / 56px) | 1.1 | -0.02em | Page H1 |
| `text-display-md` | 1.75rem / 2.5rem (28px / 40px) | 1.15 | -0.015em | Section H2 |
| `text-display-sm` | 1.375rem / 1.75rem (22px / 28px) | 1.25 | -0.01em | H3 |
| `text-body-lg` | 1.125rem / 1.25rem (18px / 20px) | 1.6 | 0 | Lead paragraphs |
| `text-body` | 1rem / 1.0625rem (16px / 17px) | 1.65 | 0 | Body copy |
| `text-body-sm` | 0.9375rem (15px) | 1.55 | 0 | Secondary body, captions |
| `text-label` | 0.8125rem (13px) | 1.4 | 0.04em uppercase | Eyebrow labels |
| `text-meta` | 0.75rem (12px) | 1.4 | 0.02em | Timestamps, fine print |

**Headings use Fraunces. Everything else uses Inter.**

### Type rules
- Body line length: 60–75ch. Use `max-w-prose` (Tailwind).
- No fully-justified text.
- Never use display sizes for body copy.
- Bold sparingly — only true emphasis.
- Avoid italics on serif headings (Fraunces handles emphasis through weight better).

---

## Spacing scale

Based on a 4px grid. Use Tailwind's default scale.

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | Icon/text gap |
| `space-2` | 8px | Tight grouping |
| `space-3` | 12px | Default inline gap |
| `space-4` | 16px | Default stack gap |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section internal gap |
| `space-12` | 48px | Section internal gap (lg) |
| `space-16` | 64px | Between major blocks |
| `space-24` | 96px | Section vertical (mobile) |
| `space-32` | 128px | Section vertical (desktop) |

**Vertical rhythm:** sections separated by `py-24 lg:py-32`. Inside a section, child elements stack with `space-y-8` or `space-y-12`.

---

## Layout

- **Max content width:** `1200px` (`max-w-7xl` in Tailwind = 1280px is acceptable).
- **Page gutters:** `px-6` mobile, `px-8` tablet, `px-12` desktop.
- **Prose max width:** `65ch` for long-form body content.
- **Grid:** 12-column on desktop, single column on mobile. Use CSS Grid, not flex, for true grid layouts.

### Breakpoints (Tailwind defaults)

| Token | Min width | Use |
|---|---|---|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Wide desktops |

Design mobile-first. Hero and CTA must be perfect at 360px wide.

---

## Components — visual rules

### Buttons

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `--color-accent-600` | white | none | `--color-accent-700` |
| Secondary | white | `--color-accent-600` | `--color-accent-600` (1px) | `--color-accent-50` bg |
| Ghost | transparent | `--color-text` | none | `--color-bg-muted` bg |
| Link | transparent | `--color-accent-600` | underline on hover | `--color-accent-700` |

- Border radius: `6px` (`rounded-md`). Avoid pill buttons except for tag-style elements.
- Padding: `px-5 py-2.5` (default), `px-6 py-3` (large CTA).
- Font: Inter 500.
- Phone CTA gets an inline phone icon to the left of the number.

### Cards

- White background or `--color-bg-soft` for alt sections.
- Border: 1px solid `--color-border`.
- Border radius: `12px` (`rounded-xl`).
- Padding: `p-6` mobile, `p-8` desktop.
- No drop shadow by default. Hover state can add a subtle shadow + 1px upward translate.

### Forms

- Input height: 44px minimum (touch target).
- Border: 1px `--color-border-strong`.
- Focus ring: 2px `--color-accent-500` with 2px offset.
- Labels: above input, `text-label` style.
- Error: red border + below-input message in `--color-error`.
- Required fields marked with `*` in the label, not relying on colour.

### Section header pattern

```
[ Eyebrow label — text-label uppercase, blue ]
[ Section heading — text-display-md, serif ]
[ Lead paragraph — text-body-lg, max-w-prose, muted ]
```

Consistent across the entire site. Used on the homepage, service pages, blog category pages, etc.

---

## Imagery rules

- **Photorealistic only.** No illustration, no 3D renders, no stock-photo clichés (handshakes over keyboards).
- **Natural lighting** — Queensland daylight, mid-morning or late-afternoon.
- **Authentic Australian context** — real Australian house styles (Queenslanders, brick-and-tile, modern infill), real cars (Toyota, Mazda, Hyundai, Ford Ranger, Hilux), Australian numberplates redacted/blurred.
- **No staged smiles.** People look focused, professional, occasionally pleased — not advertising-grin happy.
- **Brand-blue work shirts** are good (mechanic uniform). Avoid red/yellow workwear.
- **Aspect ratios:**
  - Hero: 16:9 (1920×1080)
  - Service card: 4:3 (800×600)
  - Blog hero: 3:2 (1200×800)
  - Square OG: 1:1 (1200×1200)
- **File formats:** WebP primary, JPG fallback. Compress to < 200KB after sizing.
- **Alt text:** descriptive, not stuffed with keywords. "Mechanic checking the brake pads on a silver Toyota Camry in a Brisbane driveway" — good. "Mobile mechanic Brisbane brake repair best service" — bad (keyword spam).

Full image manifest with AI prompts in [IMAGES.json](IMAGES.json).

---

## Iconography

- Use **Lucide** (open-source, MIT) for all UI icons. Consistent stroke width (1.5px).
- **No emoji** in production UI.
- Service icons (logbook, brakes, battery, etc.) — pick from Lucide where possible; commission custom SVGs only for the few that aren't available.
- Icon colour: matches surrounding text colour unless intentionally accented.

---

## Motion

- Default transition: `150ms ease-out`.
- Card hover: 1px upward translate + subtle shadow, 200ms.
- Page transitions: none (instant). Avoid full-page fades — they feel slow.
- Respect `prefers-reduced-motion` — disable all non-essential animation.

---

## Accessibility

Non-negotiable, will be tested in Lighthouse and axe.

- WCAG 2.1 AA contrast minimums on all text.
- Focus visible on every interactive element.
- All form inputs have associated labels.
- All images have alt text.
- All icons used alone have `aria-label`.
- Skip-to-content link at top of every page.
- No reliance on colour alone to convey meaning.
- All interactive elements 44×44px minimum touch target.
- Headings hierarchical (no H1 → H3 skips).

---

## Anti-patterns (do not do these)

- ❌ Auto-playing video/audio
- ❌ Chat bot pop-ups
- ❌ Exit-intent modals
- ❌ Sticky everything (max 1 sticky element per page)
- ❌ Hover-only navigation (breaks on touch)
- ❌ Parallax (slow on mobile, accessibility nightmare)
- ❌ Mystery-meat navigation (icons with no labels)
- ❌ "Click here" links
- ❌ Carousels for hero content (low engagement, hurts SEO)
- ❌ Multiple CTAs competing in one section
- ❌ Stock photo of a person holding a wrench while pointing at the camera
