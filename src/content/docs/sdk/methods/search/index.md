---
title: 'search'
isPro: true
description: 'Get Google results as structured data with the Microlink SDK: web, news, images, videos, places, maps, shopping, scholar, patents, and autocomplete, with pagination and per-result content expansion.'
---

import { Type } from 'components/markdown/Type'

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

Type: <Type children="'search'"/><br/>
Default: <Type children="'search'"/>

Web results with knowledge graph, related questions, and related searches. This is the surface you get when `type` is omitted:

```js
const page = await microlink.search('technical seo checklist')
```

Each result carries `title`, `url`, and `description`:

```js
page.results[0]
// {
//   title: 'Full Technical SEO Checklist (from Start to Finish) - Semrush',
//   url: 'https://www.semrush.com/blog/technical-seo-checklist/',
//   description: 'The full technical SEO checklist covers crawling and indexing issues…'
// }
```

The page can also return these top-level fields alongside `results`:

| Field | Type | Description |
|-------|------|-------------|
| `knowledgeGraph` | `object?` | Entity panel with `title`, `type`, `website`, `image`, `description`, `descriptionSource`, `descriptionLink`, and `attributes` |
| `peopleAlsoAsk` | `array?` | Related questions with `question`, `snippet`, `title`, and `link` |
| `relatedSearches` | `array?` | Suggested follow-up queries with `query` |

```js
const page = await microlink.search('apple inc')

page.knowledgeGraph.attributes
// { Headquarters: 'Cupertino, CA', Founded: 'April 1, 1976, Los Altos, CA', … }

page.relatedSearches.map(s => s.query)
// ['Apple Inc full form', 'Apple Inc address', 'Apple Inc stock']
```

## news

Type: <Type children="'news'"/>

Recent articles with publisher, date, and thumbnail. Use it when freshness matters:

```js
const { results } = await microlink.search('artificial intelligence', { type: 'news' })

results[0]
// {
//   title: 'Artificial Intelligence Floods Court Dockets with Home-Brewed Lawsuits',
//   url: 'https://www.nytimes.com/2026/05/25/us/politics/artificial-intelligence-courts.html',
//   description: 'For years, courts have welcomed cases brought by self-represented litigants…',
//   date: '2026-05-25T15:13:08.232Z',
//   publisher: 'The New York Times',
//   image: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:…' }
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Article headline |
| `url` | `string` | Publisher URL |
| `description` | `string` | Article snippet |
| `date` | `string` | ISO 8601 publication date |
| `publisher` | `string` | Source name |
| `image` | `{ url }?` | Thumbnail image |

Narrow the window with `period`, or the region with `location`:

```js
await microlink.search('tech acquisitions', { type: 'news', period: 'week' })
await microlink.search('regulatory update', { type: 'news', location: 'de', period: 'day' })
```

## images

Type: <Type children="'images'"/>

Full-resolution image URLs with dimensions:

```js
const { results } = await microlink.search('northern lights', { type: 'images' })

results[0]
// {
//   title: 'Northern lights (aurora borealis) — What they are and how to see them | Space',
//   url: 'https://www.space.com/15139-northern-lights-auroras-earth-facts-sdcmp.html',
//   creator: 'Frank Olsen',
//   image: { url: 'https://cdn.mos.cms.futurecdn.net/57jQMDN5MZLYfV8ps8HuZQ.jpg', width: 2121, height: 1193 },
//   thumbnail: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:…', width: 300, height: 168 }
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Image title or alt text |
| `url` | `string` | Source page URL |
| `image` | `{ url, width, height }` | Full-resolution image |
| `thumbnail` | `{ url, width, height }` | Smaller preview |
| `google` | `{ url }?` | Google Images viewer link |
| `creator` | `string?` | Image creator attribution |
| `credit` | `string?` | Image credit or copyright |

## videos

Type: <Type children="'videos'"/>

Video metadata with duration and channel:

```js
const { results } = await microlink.search('node.js streams', { type: 'videos' })

results[0]
// {
//   title: 'Learn Node.js Streams in 25 minutes',
//   channel: 'Dipesh Malvia',
//   url: 'https://www.youtube.com/watch?v=EcznOgzOdxI',
//   description: 'In this video we will understand what are streams…',
//   date: '2024-08-22T12:00:00.000Z',
//   publisher: 'YouTube',
//   duration: 1502000,
//   duration_pretty: '25m'
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Video title |
| `url` | `string` | Video page URL |
| `description` | `string` | Video description snippet |
| `image` | `{ url }?` | Video thumbnail |
| `video` | `{ url }?` | Direct video URL if available |
| `duration` | `number?` | Duration in milliseconds |
| `duration_pretty` | `string?` | Human-readable duration (`'25m'`, `'1h'`) |
| `publisher` | `string?` | Platform name |
| `channel` | `string?` | Channel or creator name |
| `date` | `string?` | ISO 8601 publish date |

## places

Type: <Type children="'places'"/>

Local listings with coordinates and contact info:

```js
const { results } = await microlink.search('coworking spaces barcelona', { type: 'places' })

results[0]
// {
//   title: 'Betahaus | Coworking Barcelona',
//   address: 'Carrer de Vilafranca, 7, 08024 Barcelona, Spain',
//   latitude: 41.406982,
//   longitude: 2.1567652,
//   rating: 4.8,
//   ratingCount: 417,
//   category: 'Coworking space',
//   phone: { number: '+34 655 62 71 49' },
//   url: 'https://www.betahaus.es/…',
//   cid: '15533147541347981884'
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Business name |
| `address` | `string` | Street address |
| `latitude` | `number` | Geographic latitude |
| `longitude` | `number` | Geographic longitude |
| `rating` | `number?` | Average rating |
| `ratingCount` | `number?` | Number of reviews |
| `category` | `string?` | Business category |
| `phone` | `{ number }?` | Phone number |
| `url` | `string?` | Website URL |
| `cid` | `string` | Google CID identifier |

Choose [places](#places) for simple listings. Choose [maps](#maps) when you need opening hours, price levels, or place IDs.

## maps

Type: <Type children="'maps'"/>

Richer place data than [places](#places) — opening hours, price levels, place types, and thumbnails:

```js
const { results } = await microlink.search('restaurants madrid', { type: 'maps' })

results[0]
// {
//   title: 'Rosi La Loca',
//   address: 'C. de Cádiz, 4, Centro, 28012 Madrid, Spain',
//   latitude: 40.4158037,
//   longitude: -3.7029837,
//   rating: 4.7,
//   ratingCount: 25007,
//   type: 'Restaurant',
//   types: ['Restaurant', 'Lounge bar'],
//   price: { level: '€20–40' },
//   phone: { number: '+34 915 32 66 81' },
//   opening: { hours: { Monday: '12:30 PM–1:30 AM', … } },
//   url: 'http://www.rosilaloca.com/',
//   place: { id: 'ChIJgwIBTHkoQg0RD1lm5kc2tWI' },
//   cid: '7112650868937611535'
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Place name |
| `address` | `string` | Full address |
| `latitude` | `number` | Geographic latitude |
| `longitude` | `number` | Geographic longitude |
| `rating` | `number?` | Average rating |
| `ratingCount` | `number?` | Number of reviews |
| `price` | `{ level }?` | Price level indicator |
| `type` | `string?` | Primary place type |
| `types` | `string[]?` | All place types |
| `url` | `string?` | Website URL |
| `phone` | `{ number }?` | Phone number |
| `description` | `string?` | Place description |
| `opening` | `{ hours }?` | Opening hours by day |
| `thumbnail` | `{ url }?` | Place thumbnail image |
| `cid` | `string` | Google CID identifier |
| `fid` | `string?` | Google FID identifier |
| `place` | `{ id }?` | Google Place ID |

## shopping

Type: <Type children="'shopping'"/>

Product listings with parsed prices and structured ratings:

```js
const { results } = await microlink.search('macbook pro', { type: 'shopping' })

results[0]
// {
//   title: '14-inch MacBook Pro Apple M5 chip CPU and GPU',
//   url: 'https://www.google.com/search?ibp=oshop&q=macbook+pro&prds=…',
//   publisher: 'Apple',
//   price: { symbol: '$', amount: 1699 },
//   rating: { score: 4.8, total: 5, reviews: 2400 },
//   id: '1293272249390991376'
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Product name |
| `url` | `string` | Merchant URL |
| `publisher` | `string` | Merchant or retailer name |
| `price` | `{ symbol, amount }` | Parsed price with currency symbol and numeric amount |
| `image` | `{ url }?` | Product image |
| `rating` | `{ score, total, reviews? }?` | Rating with score, total (scale), and review count |
| `id` | `string?` | Product identifier |

`price.amount` is already a number, so you can filter and average without parsing currency strings:

```js
const affordable = results.filter(r => r.price.amount < 500)
```

## scholar

Type: <Type children="'scholar'"/>

Academic papers with citation counts and PDF links:

```js
const { results } = await microlink.search('attention is all you need', { type: 'scholar' })

results[0]
// {
//   title: 'Attention is all you need',
//   url: 'https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html',
//   description: '…to attend to all positions in the decoder…',
//   publisher: 'A Vaswani, N Shazeer, N Parmar… - Advances in neural …, 2017',
//   year: 2017,
//   citations: 249883,
//   pdf: { url: 'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf' },
//   id: '5Gohgn6QFikJ'
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Paper title |
| `url` | `string` | Paper or abstract URL |
| `description` | `string` | Paper snippet |
| `publisher` | `string` | Authors, journal, and year in publisher line format |
| `year` | `number` | Publication year |
| `citations` | `number` | Citation count |
| `pdf` | `{ url }?` | Direct PDF link when available |
| `id` | `string` | Google Scholar ID |

Sort or filter by `citations` to surface the most impactful papers. Use `pdf.url` when the workflow needs the full document.

## patents

Type: <Type children="'patents'"/>

Patent filings with ISO 8601 dates, figures, and PDF links:

```js
const { results } = await microlink.search('compiler optimization', { type: 'patents' })

results[0]
// {
//   title: 'Prefetching associated with predicated load instructions',
//   inventor: 'Douglas C. Burger',
//   assignee: 'Microsoft Technology Licensing, Llc',
//   language: 'en',
//   url: 'https://patents.google.com/patent/US20170083338A1/en',
//   pdf: { url: 'https://patentimages.storage.googleapis.com/…/US20170083338A1.pdf' },
//   priority: { date: '2015-09-19T00:00:00.000Z' },
//   filing: { date: '2016-03-04T00:00:00.000Z' },
//   publication: { date: '2017-03-23T00:00:00.000Z', number: 'US20170083338A1' },
//   figures: [{ image: { url: 'https://…' }, thumbnail: { url: 'https://…' } }]
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Patent title |
| `description` | `string` | Patent abstract or summary |
| `url` | `string` | Google Patents URL |
| `inventor` | `string` | Inventor name |
| `assignee` | `string` | Assignee organization |
| `language` | `string` | Patent language code |
| `priority` | `{ date }` | Priority date (ISO 8601) |
| `filing` | `{ date }` | Filing date (ISO 8601) |
| `grant` | `{ date }?` | Grant date (ISO 8601) |
| `publication` | `{ date, number }` | Publication date and number |
| `pdf` | `{ url }?` | Direct PDF link |
| `thumbnail` | `{ url }?` | Patent figure thumbnail |
| `figures` | `array?` | Patent figures with `image` and `thumbnail` objects |
| `id` | `string?` | Patent identifier |

## autocomplete

Type: <Type children="'autocomplete'"/>

Query suggestions as the user types. Lightweight enough to run before a heavier surface:

```js
const { results } = await microlink.search('javascript debounce', { type: 'autocomplete' })

results.map(({ value }) => value)
// [
//   'javascript debounce',
//   'javascript debounce function',
//   'javascript debounce vs throttle',
//   …
// ]
```

| Field | Type | Description |
|-------|------|-------------|
| `value` | `string` | Suggested query string |

Use it to discover what people are actually searching for, then route those expanded queries to [search](#search), [news](#news), or [scholar](#scholar).

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
