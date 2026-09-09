---
title: 'search'
isPro: true
description: 'Get Google results as structured data with the Microlink SDK: web, news, images, videos, places, maps, shopping, scholar, patents, and autocomplete, with pagination and per-result content expansion.'
---

import SearchType from './search.md'
import News from './news.md'
import Images from './images.md'
import Videos from './videos.md'
import Places from './places.md'
import Maps from './maps.md'
import Shopping from './shopping.md'
import Scholar from './scholar.md'
import Patents from './patents.md'
import Autocomplete from './autocomplete.md'

Google results as structured data. Unlike the other methods, `search` takes a query instead of a URL and requires an [`apiKey`](/docs/sdk/getting-started/overview#authentication) on every request:

```js
const microlink = createClient({ apiKey: process.env.MICROLINK_API_KEY })

const page = await microlink.search('Lotus Elise S2')

console.log(page.results)
```

The resolved page carries `results` — the shape of each item depends on `type` — plus page extras such as `knowledgeGraph` when the vertical returns them. Every example on this page assumes the `microlink` client above.

## A type

`type` routes the query to a Google surface. Each one has its own result shape:

| Type | What you get |
|------|----------------|
| [search](#search) | Web results, knowledge graph, related questions, related searches (default) |
| [news](#news) | Articles with publisher, date, and thumbnail |
| [images](#images) | Full-resolution image URLs with dimensions |
| [videos](#videos) | Video metadata with duration and channel |
| [places](#places) | Local listings with coordinates and contact info |
| [maps](#maps) | Rich place data with hours, ratings, and pricing |
| [shopping](#shopping) | Product listings with parsed prices |
| [scholar](#scholar) | Academic papers with citations and PDF links |
| [patents](#patents) | Patent filings with ISO 8601 dates |
| [autocomplete](#autocomplete) | Query suggestions |

Omit `type` and you get [search](#search). Start with the lightest surface that answers the question.

## search

<SearchType />

## news

<News />

## images

<Images />

## videos

<Videos />

## places

<Places />

## maps

<Maps />

## shopping

<Shopping />

## scholar

<Scholar />

## patents

<Patents />

## autocomplete

<Autocomplete />

## Options

- [type](#a-type) `<string>` — the search vertical. One of the values above (default: `'search'`).
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

`search` issues its requests through its own transport, so the [shared options](/docs/sdk/getting-started/options) for browser and page control don't apply; `timeout` does.

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

Results that carry a `url` can expand themselves lazily: `result.markdown()` and `result.html()` fetch the linked page through Microlink and resolve to its content, so an agent can read only the results worth reading. Autocomplete results expose only `value` and have nothing to expand. The page itself exposes the same `markdown()` and `html()` for the results page:

```js
const page = await microlink.search('web performance budgets', { limit: 3 })

for (const result of page.results) {
  const markdown = await result.markdown()
  console.log(result.title, markdown.length)
}
```

Pass `markdown: true` or `html: true` to fetch everything up front instead; the functions then resolve immediately with the prefetched content. Those options apply to URL-backed results only.

See the [search guide](/docs/guides/search) for workflow-first pages per surface and [integration patterns](/docs/guides/search/patterns) for agents, RAG, and monitoring.
