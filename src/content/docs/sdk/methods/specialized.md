---
title: 'Specialized'
description: 'The deeper Microlink SDK capabilities: remote code execution, structured Google search, media extraction, custom data rules, technology detection, and Lighthouse reports.'
---

The specialized methods cover the deeper capabilities — remote code execution, search, media extraction, custom extraction rules, and tech detection. All of them accept the [shared options](/docs/sdk/getting-started/options); the ones with method-specific keys list them below.

## run

Execute your own JavaScript against a live page and get the value back. Code that never touches `page` runs faster and cheaper:

```js
const { value } = await microlink.run('https://example.com', () => 40 + 2)
```

Ask for `page` to drive a real browser session:

```js
const { value } = await microlink.run('https://example.com', async ({ page }) => {
  await page.waitForSelector('h1')
  return page.$eval('h1', el => el.textContent)
})
```

Extra options become named arguments, and the full result also exposes `isFulfilled`, `logging`, and `profiling`:

```js
const { value, logging, profiling } = await microlink.run(
  'https://example.com',
  ({ page, selector }) => page.$eval(selector, el => el.textContent),
  { selector: 'h1' }
)
```

`function` is an alias of `run`. See the [function guide](/docs/guides/function) for writing patterns, package dependencies, and profiling.

## search

Google results as structured data. Unlike the other methods, `search` requires an [`apiKey`](/docs/sdk/getting-started/overview#authentication) on every request. The resolved page carries `results`, `knowledgeGraph`, `peopleAlsoAsk`, and `relatedSearches`:

```js
const page = await microlink.search('Lotus Elise S2')

console.log(page.results)
```

Options:

- `type` `<string>` — the search vertical: `'search'` (default), `'news'`, `'images'`, `'videos'`, `'places'`, `'maps'`, `'shopping'`, `'scholar'`, `'patents'`, or `'autocomplete'`.
- `limit` `<number>` — the maximum number of results per page.
- `location` `<string>` — a two-letter country code geo-targeting the results, e.g. `'us'` or `'es'`.
- `period` `<string>` — restricts results by recency: `'hour'`, `'day'`, `'week'`, `'month'`, or `'year'`.

```js
const { results } = await microlink.search('open source llm', {
  type: 'news',
  period: 'week',
  location: 'us',
  limit: 10
})
```

Every result can expand itself lazily — `result.markdown()`, `result.html()` — and pages paginate with `page.next()`:

```js
let page = await microlink.search('node.js frameworks')

while (page) {
  for (const result of page.results) console.log(result.title)
  page = await page.next()
}
```

## video

The primary video of the page as a direct, playable asset:

```js
const { url, type } = await microlink.video('https://vimeo.com/76979871')
```

## audio

The primary audio track as a direct asset:

```js
const { url } = await microlink.audio('https://open.spotify.com/track/3BovdzfaX4jb5KFQwoPfAw')
```

## extract

Typed values pulled with CSS selector rules, using the [MQL rules grammar](/docs/mql/rules/basic):

```js
const { image } = await microlink.extract('https://microlink.io', {
  image: {
    selector: 'meta[property="og:image"]',
    attr: 'content',
    type: 'image'
  }
})
```

A third argument takes the [shared options](/docs/sdk/getting-started/options), useful for pairing rules with `prerender` or `waitForSelector`:

```js
const { price } = await microlink.extract(
  'https://example.com/product',
  { price: { selector: '.price', type: 'number' } },
  { waitForSelector: '.price' }
)
```

## technologies

The tech stack powering any site:

```js
const technologies = await microlink.technologies('https://microlink.io')
```

## lighthouse

A full [Lighthouse report](/docs/api/parameters/insights/lighthouse) for any URL:

```js
const report = await microlink.lighthouse('https://example.com')
```

Options:

- `onlyCategories` `<string[]>` — runs only the given categories, e.g. `['performance', 'accessibility']`.
- `onlyAudits` `<string[]>` — runs only the given audits.
- `skipAudits` `<string[]>` — skips the given audits.
- `output` `<string> | <string[]>` — the report format: `'json'`, `'html'`, or `'csv'` (default: `'json'`).

Audit just two categories and get the report as a self-contained HTML page:

```js
const report = await microlink.lighthouse('https://example.com', {
  onlyCategories: ['performance', 'accessibility'],
  output: 'html'
})
```
