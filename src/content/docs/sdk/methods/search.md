---
title: 'search'
isPro: true
description: 'Get Google results as structured data with the Microlink SDK: web, news, images, videos, places, maps, shopping, scholar, patents, and autocomplete, with pagination and per-result content expansion.'
---

Google results as structured data. Unlike the other methods, `search` takes a query instead of a URL and requires an [`apiKey`](/docs/sdk/getting-started/overview#authentication) on every request:

```js
const microlink = createClient({ apiKey: process.env.MICROLINK_API_KEY })

const page = await microlink.search('Lotus Elise S2')

console.log(page.results)
```

The resolved page carries `results` — each with `title`, `url`, and `description` — plus `knowledgeGraph`, `peopleAlsoAsk`, and `relatedSearches` when Google returns them.

## Options

- `type` `<string>` — the search vertical: `'search'` (default), `'news'`, `'images'`, `'videos'`, `'places'`, `'maps'`, `'shopping'`, `'scholar'`, `'patents'`, or `'autocomplete'`. Each vertical has its own result shape; see the [search guide](/docs/guides/search) for the fields.
- `limit` `<number>` — the maximum number of results per page.
- `location` `<string>` — a two-letter country code geo-targeting the results, e.g. `'us'` or `'es'`.
- `period` `<string>` — restricts results by recency: `'hour'`, `'day'`, `'week'`, `'month'`, or `'year'`.
- `page` `<number>` — the results page to fetch (default: `1`).
- `html` `<boolean>` — eagerly fetches the HTML of the results page and of every result (default: `false`).
- `markdown` `<boolean>` — eagerly fetches the Markdown of the results page and of every result (default: `false`).

```js
const { results } = await microlink.search('open source llm', {
  type: 'news',
  period: 'week',
  location: 'us',
  limit: 10
})
```

## Pagination

Every page exposes `next()`, which resolves to the following page of the same query with the same options:

```js
const first = await microlink.search('node.js frameworks')
const second = await first.next()
```

Or jump straight to a page with the `page` option:

```js
const { results } = await microlink.search('node.js frameworks', { page: 3 })
```

## Content expansion

Every result can expand itself lazily: `result.markdown()` and `result.html()` fetch the linked page through Microlink and resolve to its content, so an agent can read only the results worth reading. The page itself exposes the same `markdown()` and `html()` for the results page:

```js
const page = await microlink.search('web performance budgets', { limit: 3 })

for (const result of page.results) {
  const markdown = await result.markdown()
  console.log(result.title, markdown.length)
}
```

Pass `markdown: true` or `html: true` to fetch everything up front instead; the functions then resolve immediately with the prefetched content.

## Examples

Recent product prices from the shopping vertical:

```js
const { results } = await microlink.search('mechanical keyboard', {
  type: 'shopping',
  location: 'us'
})

for (const { title, price } of results) console.log(title, price.amount, price.symbol)
```

Query suggestions to expand an agent's search:

```js
const { results } = await microlink.search('how to cache', { type: 'autocomplete' })

console.log(results.map(({ value }) => value))
```

`search` issues its requests through its own transport, so the [shared options](/docs/sdk/getting-started/options) for browser and page control don't apply; `timeout` does.

See the [search guide](/docs/guides/search) for every vertical's fields and [integration patterns](/docs/guides/search/patterns) for agents, RAG, and monitoring.
