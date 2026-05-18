# AI / LLM Optimization (GEO)

How to get cited by ChatGPT, Claude, Perplexity, Gemini, Bing Copilot, Apple Intelligence and the next-generation of AI search tools. Sister doc to [SEO_PLAYBOOK.md](SEO_PLAYBOOK.md) and [SEO_KEYWORDS.md](SEO_KEYWORDS.md).

The technical name for this work is **Generative Engine Optimization (GEO)** or sometimes LLMO. The mechanics overlap with classical SEO but are different in three key ways: AI tools value structured factual content over keyword-stuffed pages, they cite specific authoritative answers rather than rank a list, and they synthesise rather than redirect.

The North Star: when a customer asks an AI tool "best mobile mechanic in Brisbane" or "how much does a brake job cost in Brisbane", **the AI should know enough about us to recommend us, or at minimum mention us as a credible option**.

---

## How AI tools find our site

Four channels, in rough order of current impact:

### 1. Direct crawlers

The major AI tools run their own web crawlers. Each has a distinct user agent and a different role:

| Crawler | Operator | Role |
|---|---|---|
| `GPTBot` | OpenAI | Training data + ChatGPT Search |
| `ChatGPT-User` | OpenAI | User-initiated browsing inside ChatGPT |
| `OAI-SearchBot` | OpenAI | SearchGPT real-time index |
| `ClaudeBot` | Anthropic | Training data + Claude's web tools |
| `anthropic-ai` | Anthropic | Legacy crawler name still in use |
| `Claude-Web` | Anthropic | User-initiated browsing inside Claude |
| `PerplexityBot` | Perplexity | Index + real-time citations |
| `Perplexity-User` | Perplexity | User-initiated |
| `Google-Extended` | Google | Bard / Gemini opt-in (separate from regular Googlebot) |
| `Applebot-Extended` | Apple | Apple Intelligence opt-in |
| `Bingbot` | Microsoft | Powers Bing Copilot natively |

**Our position:** every one of these crawlers is explicitly allowed in `app/robots.ts`. Some site owners block these (to prevent training); we want the opposite. Being indexed by these crawlers is how we get cited.

### 2. The Bing search index

Bing Copilot (Microsoft's integrated AI), ChatGPT Search and Perplexity all use Bing as a foundational index alongside their own. Strong performance in Bing translates to strong citation in those AI tools. Submitting `sitemap.xml` to Bing Webmaster Tools is in the launch checklist.

### 3. The Google index

Google AI Overviews use Google's regular index as the source for citations. Strong classical SEO performance → better AI Overview placement. The work in [SEO_PLAYBOOK.md](SEO_PLAYBOOK.md) covers this.

### 4. The `llms.txt` and `llms-full.txt` files

An emerging open standard (originating from [llmstxt.org](https://llmstxt.org/)) for sites to provide AI agents with a curated, markdown-formatted summary of their content. Backed by Anthropic and growing in adoption. Cheaper for an AI agent to read than crawling 30 individual pages.

**Our position:** both files live in `public/` and are served at `https://www.mymechanicqld.com.au/llms.txt` and `https://www.mymechanicqld.com.au/llms-full.txt`. They cover business identity, services, pricing, service areas, and the four most-cited educational answers.

---

## What gets cited (and what doesn't)

LLMs do not "rank" results the way classical search engines do. They synthesise answers from multiple sources and cite the ones they found most authoritative or most directly answering the question. Three patterns matter:

### Pattern 1: Direct factual answers to specific questions

Content that opens with the answer, then explains, gets cited disproportionately. Compare:

**Citation-friendly opening:**
> "No. Under the Australian Consumer Law, you are free to have your car serviced by any qualified mechanic, including a mobile one, as long as the service follows the manufacturer's specifications and uses appropriate parts."

**Citation-hostile opening:**
> "When considering whether a mobile logbook service could affect your warranty, there are many factors to consider..."

The first is a direct answer the LLM can quote. The second is content the LLM has to summarise itself. We write the first kind. Every blog post pillar lead with "The short version".

### Pattern 2: Specific numbers, brands and credentials

LLMs prefer concrete claims with numerical backing:

- "From $249 for front brake pads and rotors on most sedans" is more useful than "competitive pricing"
- "Bosch, Bendix, Brembo or genuine OEM parts" is more useful than "quality parts"
- "Cert III qualified, 15+ years of dealership experience" is more useful than "experienced mechanic"
- "50 to 60 km radius from Springwood" is more useful than "South East Queensland"

Every priority page on the site includes specifics like these by default.

### Pattern 3: Structured data that the LLM can parse

Schema.org JSON-LD is read directly by AI tools and used to populate their entity understanding. We have:

- `LocalBusiness` / `AutoRepair` site-wide
- `Service` on each service page
- `FAQPage` on FAQ, pricing, warranty, how-it-works, and every service page
- `HowTo` on how-it-works
- `ItemList` on services hub
- `BlogPosting` + `Person` on every blog post
- `BreadcrumbList` on every non-home page
- `OfferCatalog` listing all services with prices

This is more schema markup than 95% of small businesses ship. AI tools notice.

---

## What we built specifically for AI

### `public/llms.txt`

Curated markdown index of the site. Follows the [llmstxt.org](https://llmstxt.org/) specification:

- H1 with business name
- Blockquote with one-line description
- Paragraphs with key facts (phone, hours, services, principles)
- H2 sections grouping pages by purpose (Services, Pricing, Educational content, Service areas, Company, Optional)
- Each link includes a description so the agent knows what's behind it

### `public/llms-full.txt`

Extended summary, ~3000 words. Covers the same ground as `llms.txt` plus full descriptions of each service, the four most-cited educational answers fully written out, complete service-area details, and trust signals. This is the file an AI agent reads when they have context budget for it.

### Explicit AI bot allows in `robots.txt`

15 AI crawlers (listed above) explicitly allowed. The default-deny logic some of these crawlers use means an explicit allow is meaningfully better than relying on `User-Agent: *`.

### The `/blog/how-to-choose-the-best-mobile-mechanic-in-brisbane/` pillar

A 2,500+ word criteria-based guide that directly answers the high-intent query "best mobile mechanic in Brisbane". Honest, structured, includes us with self-scoring on the same criteria. This is the type of content AI tools cite for comparison-shopping queries.

---

## Why we don't try to game AI tools

A real category of "AI SEO" advice involves stuffing pages with hidden text, fake schema, or AI-only content. Three reasons we don't:

1. **It works for one cycle, then dies.** OpenAI, Anthropic and Google update their citation logic regularly. Manipulative content gets demoted within months.
2. **It poisons the brand entity.** If our schema markup is detected as inaccurate, every AI tool stops trusting any of it. Single repair is worth fifty quality articles.
3. **Real content compounds.** A 2,000-word honest guide on a topic gets cited indefinitely. A keyword-stuffed page on the same topic gets cited once before the LLM realises it was junk.

The strategy is to be the best honest answer to the questions our customers actually ask. Repeat, indefinitely.

---

## Quick wins still on the roadmap

Things we have not yet done that will further help AI citation, in priority order:

### 1. Get the owner cited on third-party sites

LLMs trust entities that exist beyond their own website. The owner being mentioned by name in industry publications, podcasts, local news, or even a long-form forum post (Whirlpool, Reddit r/cars_australia) compounds.

The play: a single quote in a Brisbane Times automotive piece, or a 20-minute appearance on a local podcast, generates entity recognition that flows into every AI tool's understanding of us.

### 2. Build out the suburb pages

Currently, all suburb URLs redirect to `/areas/`. When dedicated suburb pages exist (Stage 5), each becomes a hyper-local answer to "mobile mechanic [suburb]" queries that AI tools cite for that suburb specifically.

### 3. Add real customer reviews with full text

Schema markup with `Review` (not just `AggregateRating`) creates citation surface. We need the owner to enable Google Business Profile review pulls before this is possible. Faking reviews is non-negotiably off-limits.

### 4. Get listed in trusted directories

Bing Places, Google Business Profile, Apple Maps, Yellow Pages, True Local, MotorMouth, Hotfrog. Each citation reinforces the entity. The launch checklist covers GBP; the others are post-launch tasks.

### 5. Build a Wikipedia-eligible story

Small businesses do not get Wikipedia articles. But a single newsworthy event (a service-area expansion, an industry award, a charity partnership, a feature in a major Brisbane publication) eventually becomes citable on Wikipedia. Not for now, but worth tracking.

### 6. Expand `llms.txt` as content grows

Every time a new service page, blog post or stronger-than-AutoKing page ships, add it to `llms.txt` with a one-line description. Treat the file like a curator's index, not an autogenerated dump.

### 7. Voice search optimization

Apple's Siri, Amazon Alexa and Google Assistant all use slightly different signals. Apple weights Apple Maps + structured data; Google weights Google Business Profile + Speakable schema; Alexa weights Bing + Yelp. The cross-platform work is GBP + Bing Places.

### 8. AnswerThePublic and SEMrush "questions" lists

Two free tools surface the questions customers actually search. Adding new blog posts that directly answer those questions creates AI-citable content at low cost.

---

## What we will measure

There is no GSC equivalent for AI tools yet. So measurement is manual:

### Monthly

- Search ChatGPT (in the free version, with Search enabled) for the top 10 high-intent queries we want to rank for. Note whether the response cites us, mentions us, or ignores us.
- Same for Claude, Perplexity and Gemini.
- Same for Bing Copilot.
- Track the trend.

Example queries to test monthly:

1. "Who is a good mobile mechanic in Brisbane?"
2. "How much does a brake job cost in Brisbane?"
3. "Does using a mobile mechanic void my new car warranty in Australia?"
4. "Best pre-purchase car inspection Brisbane"
5. "Mobile mechanic near Sunnybank"
6. "My car won't start, what do I do?"
7. "How often should I service my car in Australia?"
8. "Mobile mechanic vs workshop in Brisbane"
9. "Mechanic that comes to your house Brisbane"
10. "Logbook service while keeping new car warranty Brisbane"

### Quarterly

- Re-audit `llms.txt` for accuracy and completeness.
- Re-audit schema markup with Google's Rich Results Test.
- Check whether AI tools have started using us in their cited examples.
- Update the entity story if there have been business changes.

---

## What does not work

Things we have explicitly decided not to do:

- **Hidden text or AI-only content.** Anything served differently to crawlers vs humans is detected eventually.
- **Fake reviews or aggregate ratings.** Schema markup with fabricated review counts is detectable and ruinous to entity trust.
- **Hyper-aggressive keyword stuffing in `llms.txt`.** The file gets read as plain markdown; spammy content kills credibility.
- **Trying to write content "for AI" instead of for humans.** AI tools are increasingly good at telling the difference. Content that reads naturally to a human is what gets cited.
- **Buying off-site citations.** Paid placements look like paid placements. Earn them.

---

## The compounding view

AI citation is a different game from classical SEO because there is no #1 ranking position. There is "always cited when relevant" or "never cited". Once a topic is owned (we are the most-cited answer for "does mobile mechanic void warranty in Australia"), that compounds across every AI tool and lasts as long as the content remains accurate.

We aim to own a small set of high-intent queries completely:

- "does a mobile mechanic void warranty in Australia"
- "how much does a brake job cost in Brisbane"
- "best mobile mechanic Brisbane"
- "mobile mechanic vs workshop"
- "won't start battery alternator or starter"
- "pre purchase inspection what to check"

Each one has a dedicated, substantive, honest piece of content. Each is structured for citation. Each is referenced from `llms.txt`.

When we own those six queries across the major AI tools, the second-order traffic (people asking adjacent questions, AI tools recommending us as a credible expert in the space) compounds without further investment.

That is the real game.
