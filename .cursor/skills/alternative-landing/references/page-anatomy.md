# Page anatomy

How an alternative page is built today (since PR #2418 and #2420). Copy the closest existing page instead of writing sections by hand: every section below is a shared component that takes data, so a new page is mostly a `shared.js`.

## Files

| File | Holds |
| --- | --- |
| `src/pages/alternative/<slug>.js` | Imports, the section list and `Head`. About 50 lines. No copy, no styles. |
| `src/components/pages/<slug>/shared.js` | Every string, number, list and constant the page renders. |
| `src/components/pages/<slug>/hero.js` | Only when the hero needs a custom visual. Otherwise use the shared `AlternativeHero`. |
| `src/components/pages/<slug>/<section>.js` | Only for a competitor-specific section (billing, credits, ownership…). |

Register the page in `src/helpers/alternatives.js` (`ALTERNATIVE_GROUPS`, which feeds the footer and `/alternative`), add its footer label to `FOOTER_LABELS` in `test/integration/alternatives-catalog.js`, and map its path to the right product in `src/helpers/dashboard-url.js` (`SCREENSHOT_COMPETITORS` or `PATH_PRODUCTS`), so signups attribute to the right product.

## Three shapes

Pick the shape, then copy the reference page.

### A. Benchmarked screenshot competitor

The competitor exists in `src/pages/benchmarks/screenshot-api.js`. Reference: `screenshotone`. Same shape: apiflash, screenshotapi, screenshotlayer, screenshotmachine, thumio, urlbox.

```jsx
<Hero />                                   // hero.js: AlternativeHeroActions + RaceContainer
<AlternativeSpeed benchmark={BENCHMARK_DATA} speed={SPEED} />
<AlternativeWhySwitch {...WHY_SWITCH} />
<ProductPriceComparison {...PRICE_COMPARISON} />
<AlternativeComparison {...COMPARISON} />
<ProductStrengths id='<slug>-strengths' {...HONESTY} />
<ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
<CallToAction id='cta' {...CTA} />
```

`shared.js` additionally exports `BENCHMARK_DATA` (Microlink plus the competitor, copied from the benchmark page with the same `testUrls`), `SPEED = benchmarkClaims(BENCHMARK_DATA, '<key>')` and `SERVICE_COLORS` (`microlink` and the competitor; the competitor is `colors.gray5`).

### B. Price card without a benchmark

Screenshot competitors not in the benchmark, embed and AI-data competitors. References: `cloudflare` and `url2png` (curl-vs-curl hero on `Terminal`), `firecrawl` and `context-dev` (price cards in the hero), `iframely` and `embedly` (embed demo imported from `components/pages/embed`).

Same list as A without `AlternativeSpeed`. No `BENCHMARK_DATA`, `SPEED` or `RaceContainer`.

### C. Reference page with its own argument

The competitor is better compared through one specific mechanism (a credit table, an ownership list, a throughput ceiling, a migration map). References: `puppeteer`, `playwright`, `browserbase`, `scrapingbee`, `scraperapi`, `serpapi`, `clearbit`, `jina-reader`.

```jsx
<AlternativeHero {...HERO} />               // or a hero.js when the visual is custom (serpapi)
<CompetitorSpecificSection />               // billing, credits, ownership, paths…
<ProductTimings {...TIMINGS} />            // optional: serpapi has no timings band
<ProductPricing caption={PRICING_CAPTION} />
<ProductComparison {...COMPARISON} competitorKey='<slug>' />
<ProductStrengths id='<slug>-strengths' {...HONESTY} />
<ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
<CallToAction id='cta' {...CTA} />
<ProductTrademarks>{TRADEMARKS}</ProductTrademarks>   // when naming third-party marks
```

Shape C pages vary: copy the reference whose argument is closest, not this sample. SerpApi, for example, has no timings band and places its Migration section after Strengths.

Competitor-specific tables use `FeatureTable` and `TableScroll` from `components/patterns/ProductStory`.

## `shared.js` exports (shapes A and B)

| Export | Feeds |
| --- | --- |
| `META` (`title`, `description`) | `Head` |
| `STRUCTURED` | `Head` (`faqPageStructured(FAQ_ITEMS)` plus the page schema) |
| `HERO` or hero constants | `Hero` / `AlternativeHero` (`competitor`, `tagline`, `description`, `cta`, `secondaryHref`, `secondaryLabel`) |
| `WHY_SWITCH` (`caption`, `items: [{ number, title, description }]`) | `AlternativeWhySwitch` |
| `PRICE_COMPARISON` (`title`, `caption`, `microlink`, `competitor`, `note`) | `ProductPriceComparison` |
| `COMPARISON` (`caption`, `columns`, `rows`, `competitorKey`, `lastVerified`) | `AlternativeComparison` |
| `HONESTY` (`title`, `caption`, `items: [{ title, description }]`) | `ProductStrengths` |
| `FAQ_CAPTION`, `FAQ_ITEMS: [{ question, answer, text }]` | `ProductFaq` (`answer` is JSX, `text` is the plain-text copy for schema) |
| `CTA` (`caption`, `cta: 'alternative-<slug>:footer-cta'`, `links`) | `CallToAction` |

### Pricing data

```js
const CHECKED_AT = 'YYYY-MM-DD'                 // the day you read the competitor pricing page
export const LAST_VERIFIED = formatCheckedAt(CHECKED_AT)

export const PRICE_COMPARISON = {
  title: <AlternativePricingTitle lead='More requests.' highlight='Lower price.' />,
  caption: …,                                   // states both prices; computed from constants
  microlink: {
    cta: 'alternative-<slug>:pricing',
    secondaryHref: '/screenshot',               // rendered under the caption, not in the card
    secondaryLabel: 'Explore the Screenshot API',
    items: [ … ]                                // extra Microlink facts; base facts come from microlinkFacts()
  },
  competitor: {
    name: '<Competitor> <Plan>',
    price: COMPETITOR_PRICE,
    quota: COMPETITOR_VOLUME,
    unit: 'screenshots',                        // the competitor's billing unit: screenshots, credits, hits…
    items: [ …, missing('80 requests/minute cap') ],   // missing() renders a limitation with a "–" icon
    source: 'https://competitor.com/pricing',
    checkedAt: CHECKED_AT
  },
  note: …                                       // one computed sentence, e.g. "$30 more per month for 36,000 fewer screenshots"
}
```

Every Microlink number comes from `helpers/pro-plans` (`DEFAULT_PLAN`, `pricePerThousand`), `helpers/free-tier` and `helpers/cdn-edges`. Every competitor number is a named constant at the top of `shared.js`, and every sentence that mentions a derived value (ratio, gap, cost) computes it from those constants.

### Comparison rows

`{ feature, href?, note?, microlink, <competitorKey> }`. Values: `true` (check), `false` (renders "-"), or a short string. No `highlight`. Order: shared capabilities, Microlink-only, competitor-only. Rows link to the Microlink doc or feature page with `href` when one exists.

## Visual rules the components already enforce

Do not restyle these at the call site; the shared components and the guard tests own them. The full list lives in `.agents/skills/alternative-pages/SKILL.md` › Design rules.

- Tables: blog style, bold only in the header, black text, Microlink logo in the comparison header.
- Text: black; `black60` only with `fontSize: 0`. No pink text.
- Hero: "The <competitor> <GradientText>alternative</GradientText>", Button plus ArrowLink.
- Speed tables: Microlink times carry `(-N%)` against the fastest other provider.
- Pricing: the Microlink card holds only the featured signup button.
