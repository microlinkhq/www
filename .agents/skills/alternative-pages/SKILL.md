---
name: alternative-pages
description: Audit or change all 21 /alternative/* competitor pages together in microlink/www. Use when re-verifying competitor pricing, Microlink plan facts or benchmark claims, or when applying one design or copy change across every alternative page.
---

# Alternative pages

The 21 pages under `/alternative/*` share one structure and one set of rules. Touch them as a set: the inventory, the guards and the visual check below cover all 21, not just the page you started from.

To create a new page or rework one page's angle, use `.cursor/skills/alternative-landing/SKILL.md` (research, anti-cannibalization, `references/page-anatomy.md`). This skill owns the rules every page shares; that one points back here for them.

## Map

| What | Where |
| --- | --- |
| Page file (thin, imports only) | `src/pages/alternative/<slug>.js` |
| Copy, data, constants | `src/components/pages/<slug>/shared.js` |
| Hero | `src/components/pages/<slug>/hero.js`, or the shared `ProductStory/alternative-hero.js` |
| Extra sections (reference pages) | `src/components/pages/<slug>/*.js` (billing, credits, throughput, ownership, paths…) |
| Shared sections | `src/components/patterns/ProductStory/`: `alternative-*.js`, `price-comparison.js`, `comparison.js`, `section.js`, `strengths.js`, `story-card.js` |
| Speed section (7 benchmark pages) | `src/components/patterns/SpeedSection/` (`claims.js` holds the math) |
| Tables | `src/components/elements/Table/Table.js` |

Two families. Run `.agents/skills/alternative-pages/inventory.sh` to see which page is which, with its check date and pricing sources:

- **price-card (13):** apiflash, cloudflare, context-dev, embedly, firecrawl, iframely, screenshotapi, screenshotlayer, screenshotmachine, screenshotone, thumio, url2png, urlbox. Competitor pricing lives in `PRICE_COMPARISON` in `shared.js`, dated by `CHECKED_AT` (rendered as "Price checked <Month Year>" and "Last verified").
- **reference (8):** browserbase, clearbit, jina-reader, playwright, puppeteer, scraperapi, scrapingbee, serpapi. Pricing lives in per-page tables (`CREDITS`, `BILLING`, `THROUGHPUT`, …) and prose, dated by a written "Month Year".

## Facts that are never typed by hand

Microlink numbers come from helpers. If you find a Microlink price, quota or count typed as a literal in a page, replace it with the helper.

| Fact | Source |
| --- | --- |
| Pro plans, price, requests, per-1,000 price | `src/helpers/pro-plans.js` (`PLANS`, `DEFAULT_PLAN`, `pricePerThousand`) |
| Free plan quota, keyless quota, concurrency | `src/helpers/free-tier.js` |
| Edge node count | `src/helpers/cdn-edges.js` (`CDN_EDGES`) |
| Benchmark ratios and durations | `benchmarkClaims` / `formatDuration` / `relativeSpeed` / `percentDifference` in `SpeedSection/claims.js` |

Wording that must stay identical on every page: "No rate limit on paid plans"; a built-in rotating proxy on by default; free plan "25 requests/day, renews daily, no credit card" (from `FREE_PLAN_REQUESTS_PER_DAY`). Never claim volume discounts (only 10% annual), and never publish an enterprise price.

## Workflow: re-verify pricing

1. **Inventory.** Run `inventory.sh`. Every page lists its date and its pricing URLs. A page with `pricing_links=-` cites pricing without a link: find the claim in its `shared.js` and add the source.
2. **Fetch each source.** Open every pricing URL (WebFetch, or the microlink MCP `microlink_markdown`). Read the actual page, not a cached memory of it. For each page record in a log under the scratchpad: competitor plan name, price, volume, overage, limits, and what the page says now. Pricing behind a calculator or login is "unverified", with what would settle it.
3. **Diff against the page.** Compare every competitor number in `shared.js` (cards, tables, FAQ answers, captions, notes) against the log. Grep the folder for the old value before you change it, so prose that repeats a number is not left stale.
4. **Edit the data, not the derived text.** Change the constant; captions, ratios, "N× the volume" and "$N more" lines are computed from it. If a sentence hard-codes a derived number, rewrite it to compute.
5. **Bump the date only for pages you verified.** Set `CHECKED_AT` (price-card) or the written "Month Year" (reference) to the day you fetched the source. A page you could not verify keeps its old date and goes in the report.
6. **Guards and tests** (below), then the **visual check**.
7. **Report:** per page, what changed (old → new, with source URL), what was unverified, and the commit.

## Design rules (enforced or reviewed)

- **Tables:** blog style from `FeatureTable`: no card, no fills, bold only in `thead`, every cell black. Links stay link-blue. The comparison header shows the Microlink logo. Do not pass colors or weights to table cells; the base table overrides them.
- **Speed tables:** neutral. The Microlink time carries its change against the fastest other provider in parentheses, e.g. `6,361 (-50%)`, via `percentDifference`. No pink, no gray for winners or losers.
- **Text color:** black. Gray (`black60`) only in a block that also sets `fontSize: 0` (14px notes, sources, footnotes). No pink text.
- **Hero:** "The <competitor> <GradientText>alternative</GradientText>", gradient on "alternative" only. Primary action is `Button` (`as='a'`), secondary is an `ArrowLink`.
- **Pricing cards:** the Microlink card ends with a single `variant='featured'` button. The product link ("Explore the … API") sits centered under the section caption, never in the card.
- **No gradient text inside tables.** No em dashes in copy.

## Guards

```bash
npx vitest run --project integration \
  test/integration/alternative-text-colors.js \
  test/integration/alternative-speed-claims.js \
  test/integration/alternatives-catalog.js \
  test/integration/pro-plan-price.js \
  test/integration/free-tier-quota.js \
  test/integration/button-usage.js \
  test/integration/typography-overrides.js
npx vitest run --project unit \
  test/unit/components/pages/alternative-price-comparisons.js \
  test/unit/components/patterns/ProductStory \
  test/unit/components/patterns/SpeedSection \
  test/unit/components/elements/Table
```

Then `npm run test:unit` and `npm run test:integration`. `test/integration/skills-catalog.js` fails on master independently of these pages; say so rather than hide it.

## Visual check

Use the `verify` skill. For each of the 21 pages at 1440, 820 and 390 px: no document or table overflow, and spot the section you changed. A scan that walks text nodes and reports any non-black color outside 14px notes catches color regressions faster than screenshots.

## Gotchas

- **Stale dev server.** Gatsby dev sometimes keeps serving an old chunk after an edit. Confirm with `curl -s http://localhost:8000/commons.js | grep <new code>`; if it stays stale, restart `npm run dev`. A blank or old page is not a code bug.
- **`css` + `as='a'` on `Button`** (or through `SignupLink component={Button}`) swaps the whole component for a plain `<a>`. Size the button from its container instead.
- **Lint order.** Run `npx standard --fix` after `prettier-standard`; prettier re-adds JSX newlines that `standard` rejects.
- **Shared components.** `story-card.js` is also used by `/embed` and `/link-preview`; the pricing plans and CTA band are shared with every product page. Change those only when the request covers the product pages too.
- **Before/after artifact.** The review page is https://claude.ai/artifact/Th82yezR5FGy3k6u6bCTVL (13 price-card pages). After a visible change, recapture the "after" frames at 1440px full page and republish to the same URL.
