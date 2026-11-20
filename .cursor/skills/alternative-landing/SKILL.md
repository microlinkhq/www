---
name: alternative-landing
description: Create or improve one competitor alternative page under src/pages/alternative/. For audits or changes across all 21 pages at once, use .agents/skills/alternative-pages.
---

# Alternative landing pages

Build or refresh one page at `/alternative/<slug>`.

The goal is not generic comparison copy. It is a page that:

- uses the shared alternative-page components, so it matches the other 21 pages with no restyling
- researches the competitor honestly from real sources
- takes benchmark numbers only from `src/pages/benchmarks/screenshot-api.js`
- has its own angle, so it does not cannibalize another alternative page

Two companion documents:

- `references/page-anatomy.md`: how a page is built (files, the three page shapes, `shared.js` exports, pricing data, registration).
- `.agents/skills/alternative-pages/SKILL.md`: the rules all 21 pages share (design rules, facts that come from helpers, guards, gotchas). Read its "Design rules" and "Guards" sections before you write anything.

## Read first

1. `.claude/product-marketing-context.md`, if present
2. `references/microlink-features.md`
3. `references/page-anatomy.md`
4. `.agents/skills/alternative-pages/SKILL.md`
5. `AGENTS.md`
6. The reference page for the shape you pick (below), and every other `src/components/pages/<slug>/shared.js` for the anti-cannibalization pass

## Pick the category and the shape

Ask the user which Microlink product the competitor competes with, or confirm your read of the competitor's homepage ("I see X leads with LLM-ready markdown, so I'll use the AI-data shape. Confirm?"). If the competitor straddles categories, pick the dominant product. Never mix shapes.

| Category | CTA product | Shape (see `page-anatomy.md`) | Reference |
| --- | --- | --- | --- |
| Screenshot API, benchmarked | `/screenshot` | A: race hero + `AlternativeSpeed` | `screenshotone` |
| Screenshot API, not benchmarked | `/screenshot` | B: curl-vs-curl hero | `cloudflare`, `url2png` |
| Embed / link previews | `/embed` | B: embed demo hero from `components/pages/embed` | `iframely`, `embedly` |
| AI data / scraping (markdown, brand data) | `/markdown` or `/metadata` | B: price cards in the hero | `firecrawl`, `context-dev` |
| A tool you run yourself, or a credit/throughput model that needs its own explanation | the matching product | C: `AlternativeHero` + a competitor-specific section | `puppeteer`, `scrapingbee`, `serpapi` |

`AlternativeSpeed` and `RaceContainer` only exist for competitors in `src/pages/benchmarks/screenshot-api.js`. A screenshot competitor that is not benchmarked uses shape B. Never fabricate a speed section.

## Core rules

- Never guess the competitor URL. Ask if it is missing.
- Never invent competitor features, pricing, SLA, rate limits, integrations or infrastructure claims. Every competitor claim must be on the competitor's own site or docs.
- Never claim a Microlink feature that is not in `references/microlink-features.md`.
- Never type a Microlink number. Import it from the helpers listed in `microlink-features.md`.
- Never invent or extrapolate benchmark numbers. Speed copy comes from `benchmarkClaims` ("N.N× faster on average, up to X×"), never from hand math.
- Never restyle shared sections at the call site: no colors, weights or font sizes on tables, cards or headings. The components and the guard tests own the look.
- Never ship a placeholder or an unverified claim. If a claim matters and cannot be verified, stop and ask.
- No code comments, no em dashes in copy, `…` instead of `...`.

## Source hierarchy

1. Competitor website and official docs
2. `src/pages/benchmarks/screenshot-api.js`
3. `references/microlink-features.md` and the helpers it points to
4. Third-party reviews, only to find positioning, likely objections and missing official pages. Never as proof of a hard claim.

## Workflow

### 1. Gather inputs

Confirm the category, the competitor name, the competitor URL and the slug. For a benchmarked screenshot competitor, map it to its key in `BENCHMARK_DATA.results`.

### 2. Research the competitor

Fetch at minimum the homepage, the features or product page, the pricing page, and the API docs. Search for missing official pages (`"<Competitor> pricing <year>"`, `"<Competitor> docs"`, `"<Competitor> alternatives"`, `"<Competitor> limitations"`).

Build a ledger in the scratchpad:

- verified features and verified missing features
- pricing tiers, billing unit, quotas, rate limits, overage, free plan (with the URL and the date you read it)
- integrations and workflow tooling
- where the competitor is genuinely better (these become `HONESTY` items)
- open questions that remain unverified

For embed competitors also confirm the pricing unit (per request, per hit, per domain), documented rate limits, and whether they ship any proxy, antibot or CAPTCHA layer. Embed pages include the rows "Built-in rotating proxy", "Proxy geolocation" and "Antibot and CAPTCHA (30+ providers)", and one FAQ question about replacing a separate proxy service (see `iframely`).

If a claim is only visible behind JavaScript, a calculator or a login, treat it as unverified and ask before using it.

### 3. Anti-cannibalization pass

Read `META.title`, `META.description`, the hero tagline, captions, the CTA and the FAQ questions of every other page. Current angles:

| Page | Angle |
| --- | --- |
| apiflash | production screenshot workloads |
| browserbase | rendered output in one call, no session to drive |
| clearbit | logos from any URL, with brand colors |
| cloudflare | screenshots with batteries included (cache, proxy, adblock) |
| context-dev | brand and web data in one request |
| embedly | lower per-URL pricing |
| firecrawl | LLM-ready markdown at one flat price, no credit math |
| iframely | developer-first embed API |
| jina-reader | bills per request |
| playwright | screenshot and PDF API, keep Playwright for tests |
| puppeteer | headless Chrome as an API, no Chrome to run |
| scraperapi | one price for every URL |
| scrapingbee | a bill you can forecast |
| screenshotapi | screenshots plus metadata |
| screenshotlayer | more throughput |
| screenshotmachine | broader browser workflows |
| screenshotone | faster cold starts |
| serpapi | no hourly cap |
| thumio | fully loaded screenshots |
| url2png | a more modern screenshot API |
| urlbox | better cost per render |

Pick a primary and a secondary angle that nobody else leads with. If the best angle collides, change it or ask. Do not reuse title patterns or near-identical FAQ wording.

### 4. Build the page

Follow `references/page-anatomy.md`:

1. Copy the reference page for the shape: `src/pages/alternative/<ref>.js`, `src/components/pages/<ref>/shared.js` and `hero.js` if it has one.
2. Replace every competitor constant at the top of `shared.js` with researched values, and set `CHECKED_AT` to the day you read the pricing page. Rewrite every caption, note and FAQ answer that states a derived number so it computes from the constants.
3. Write the copy for your angle: hero tagline and description, `WHY_SWITCH` (3–6 items), `COMPARISON.rows` (shared, then Microlink-only, then competitor-only), `HONESTY` (3–6 real competitor strengths), `FAQ_ITEMS` (7–9 questions with `{ question, answer, text }`), `CTA`.
4. `META` gets a unique title and description. `STRUCTURED` includes `faqPageStructured(FAQ_ITEMS)`, and `text` must match the visible answer.
5. Register the page (`src/helpers/alternatives.js`, `FOOTER_LABELS` in `test/integration/alternatives-catalog.js`, `src/helpers/dashboard-url.js`).

Add a competitor-specific section (shape C) only when research strongly supports it, it makes the page materially more useful, and it does not collide with another page. If unsure, propose it to the user first.

### 5. Verify

Run the guards listed in `.agents/skills/alternative-pages/SKILL.md` › Guards, then `npm run test:unit` and `npm run test:integration`. Then check the page with the `verify` skill at 1440, 820 and 390 px: no horizontal overflow, the hero, pricing cards and tables render, the speed section (shape A) shows `(-N%)` on Microlink times.

### 6. Improve an existing page

1. Identify its shape from the page file's section list (`page-anatomy.md`).
2. Re-research the competitor: homepage, docs, features, pricing.
3. Check for stale pricing (`CHECKED_AT`), stale feature claims, stale FAQ answers and stale strengths. For screenshot pages, compare `BENCHMARK_DATA` against the benchmark page.
4. Re-run the anti-cannibalization pass.
5. Fix inaccuracies first, then positioning, then SEO uniqueness. Bump `CHECKED_AT` only if you re-read the pricing page.

### 7. Report back

Always report: the chosen angle, sources used (with dates), anything still unverified, cannibalization or SEO risks, and suggested next improvements.

## SEO pass

When asked, or when the title, meta or FAQ choices are unclear, follow `~/.claude/skills/seo-audit/SKILL.md` for keyword targeting, title and meta uniqueness, internal cannibalization, heading structure and schema completeness.

## Final guardrails

- Do not claim a competitor feature because it is common in the category.
- Do not write "fastest" or "best" unless the benchmark or a source supports it.
- Do not let benchmark copy dominate when the real difference is elsewhere.
- Do not copy FAQ wording from another alternative page.
- Do not mix shapes or patch the wrong reference into the right one.
- Do not duplicate embed demo internals; import them from `components/pages/embed`.
- The pre-commit hook formats staged files with `prettier-standard` and `standard --fix`. Do not run a repo-wide formatter by hand.
