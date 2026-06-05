---
title: 'Search: Integration patterns'
description: 'Practical patterns for using @microlink/google in agent frameworks, RAG pipelines, news monitoring, entity lookup, academic research, and product intelligence workflows.'
---

import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

This page collects the most common ways teams integrate `@microlink/google` into production systems. Each pattern includes the surface choice, the query strategy, and the expansion depth that makes sense for the workflow.

## Agent tool calling

Expose `google(query, options)` as a tool and let the model decide when to search, which surface to use, and when to expand:

```js
import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const searchTool = {
  name: 'web_search',
  description: 'Search the web for current information. Returns structured results.',
  parameters: {
    query: { type: 'string', description: 'The search query' },
    type: {
      type: 'string',
      enum: ['search', 'news', 'scholar', 'shopping', 'images', 'places'],
      description: 'Which search surface to use'
    }
  },
  execute: async ({ query, type = 'search' }) => {
    const page = await google(query, { type })
    return page.results.map(r => ({
      title: r.title,
      url: r.url,
      description: r.description
    }))
  }
}
```

The key insight: keep the tool result lightweight. Return `title`, `url`, and `description` from the first call. If the model needs full page content, expose `.markdown()` as a second tool.

### Separate expansion tool

```js
const expandTool = {
  name: 'read_page',
  description: 'Fetch the full content of a URL as Markdown.',
  parameters: {
    url: { type: 'string', description: 'URL to read' }
  },
  execute: async ({ url }) => {
    const page = await google(url)
    const result = page.results.find(r => r.url === url)
    return result ? await result.markdown() : null
  }
}
```

This two-tool pattern gives the model explicit control over cost and depth.

## RAG source expansion

Start with search to find relevant sources, then expand the best matches into your retrieval pipeline:

```js
const page = await google('site:openai.com function calling guide')

const documents = await Promise.all(
  page.results.slice(0, 3).map(async result => ({
    title: result.title,
    url: result.url,
    content: await result.markdown()
  }))
)
```

For broader coverage, combine `autocomplete` to discover related queries, then search each one:

```js
const suggestions = await google('how to fine tune', { type: 'autocomplete' })
const queries = suggestions.results.slice(0, 5).map(s => s.value)

const allResults = []
for (const query of queries) {
  const page = await google(query)
  allResults.push(...page.results)
}
```

### When to paginate

Pagination adds recall at the cost of latency and API calls. Paginate when:

- your query is broad and the first page may miss relevant sources
- you need comprehensive coverage for competitive analysis or literature reviews
- the model's confidence is still low after the first page

```js
let page = await google('vector database benchmarks')
const sources = [...page.results]

if (sources.length < 5) {
  page = await page.next()
  sources.push(...page.results)
}
```

## News monitoring

Use `news` with `period` to build monitoring and alerting workflows:

```js
const page = await google('data breach', {
  type: 'news',
  period: 'day'
})

const alerts = page.results.map(result => ({
  title: result.title,
  publisher: result.publisher,
  date: result.date,
  url: result.url
}))
```

For multi-region monitoring, run parallel queries with different `location` values:

```js
const regions = ['us', 'gb', 'de', 'jp']

const results = await Promise.all(
  regions.map(async location => {
    const page = await google('regulatory update', {
      type: 'news',
      location,
      period: 'week'
    })
    return { location, results: page.results }
  })
)
```

## Entity and local lookup

Use `places` or `maps` when your workflow needs business or geographic context:

```js
const page = await google('coworking spaces barcelona', { type: 'places' })

const locations = page.results.map(result => ({
  name: result.title,
  address: result.address,
  coordinates: {
    lat: result.latitude,
    lng: result.longitude
  },
  rating: result.rating
}))
```

Use `maps` instead of `places` when you also need opening hours, price levels, or Google Place IDs for downstream API calls:

```js
const page = await google('restaurants near times square', { type: 'maps' })

page.results[0].opening?.hours
// { Monday: '11:00 AM – 10:00 PM', ... }

page.results[0].place?.id
// 'ChIJgTwKgJcpQg0RaSKMYcHeNsQ'
```

## Academic research

Use `scholar` to build literature review or citation analysis workflows:

```js
const page = await google('retrieval augmented generation', { type: 'scholar' })

const papers = page.results
  .sort((a, b) => b.citations - a.citations)
  .slice(0, 5)
  .map(result => ({
    title: result.title,
    year: result.year,
    citations: result.citations,
    pdf: result.pdf?.url,
    url: result.url
  }))
```

For research agents, combine `scholar` with content expansion to fetch full papers:

```js
const page = await google('transformer architecture', { type: 'scholar' })

for (const result of page.results.slice(0, 3)) {
  if (result.pdf?.url) {
    console.log(`PDF available: ${result.pdf.url}`)
  } else {
    const content = await result.markdown()
    console.log(`Abstract page: ${content.slice(0, 500)}`)
  }
}
```

## Product intelligence

Use `shopping` for price monitoring, competitive analysis, and product comparison:

```js
const page = await google('mechanical keyboard', { type: 'shopping' })

const products = page.results.map(result => ({
  name: result.title,
  price: result.price.amount,
  currency: result.price.symbol,
  merchant: result.publisher,
  rating: result.rating?.score
}))
```

Prices are already parsed into numeric values, so you can sort, filter, and aggregate without string processing:

```js
const affordable = products.filter(p => p.price < 150)
const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length
```

## Vertical routing

Instead of a single search tool, route the query to the most appropriate surface based on intent:

```js
const route = (intent) => {
  const routes = {
    current_events: 'news',
    product_lookup: 'shopping',
    academic_paper: 'scholar',
    local_business: 'places',
    general: 'search'
  }
  return routes[intent] || 'search'
}

const page = await google(query, { type: route(detectedIntent) })
```

This reduces noise in the results and gives the downstream consumer exactly the fields it needs.

## Query expansion

Use `autocomplete` to discover related queries before running heavier searches:

```js
const suggestions = await google('how to deploy', { type: 'autocomplete' })

console.log(suggestions.results.map(s => s.value))
// [
//   'how to deploy a website',
//   'how to deploy to production',
//   'how to deploy docker container',
//   ...
// ]
```

This is useful for:

- **Coverage**: expand a vague query into specific variants before searching
- **Demand modeling**: understand what people are actually searching for
- **Prompt seeding**: generate suggestions for search UIs or chat interfaces

## See also

- <Link href='/docs/guides/search' children='Search' /> — install the client and make your first query.
- <Link href='/docs/guides/search/search' children='Web Search' />, <Link href='/docs/guides/search/news' children='News' />, <Link href='/docs/guides/search/scholar' children='Scholar' />, and more — field reference for each surface.
- <Link href='/docs/guides/search/content-expansion' children='Content expansion' /> — the two-step retrieval model and when to use `.html()` vs `.markdown()`.
