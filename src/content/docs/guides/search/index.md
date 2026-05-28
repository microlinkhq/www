---
title: 'Search'
isPro: true
description: 'Structured search results as JSON — no HTML parsing, no browser. Built for agents, prompts, and RAG pipelines.'
---

import { Link } from 'components/elements/Link'

Microlink Search turns public search surfaces into structured JSON through the [`@microlink/google`](https://www.npmjs.com/package/@microlink/google) Node.js client.

No HTML parsing, no browser, no proxy fleet to manage. Send a query, get normalized results back. Microlink handles the infrastructure, rotation, and result extraction so your code stays focused on what to do with the data.

## Install

The [@microlink/google](https://www.npmjs.com/package/@microlink/google) library handles the API call, pagination, and lazy content expansion for you:

```bash
npm install @microlink/google
```

## Your first query

Create a client with your <Link href='https://microlink.io/#pricing' children='API key' />, then query any surface:

```js
import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('technical seo checklist')

console.log(page.results[0])
// { title: '...', url: '...', description: '...' }
```

When you omit `type`, the client defaults to web search. The same `google(query, options)` shape works for every surface.

## Choose the right surface

Use `type` to route the query to the surface that best matches your workflow:

| If you need | Use |
|-------------|-----|
| Broad web retrieval, knowledge graph, related questions | `search` (default) |
| Recent articles with publisher and date | `news` |
| Image URLs with dimensions | `images` |
| Video metadata with duration | `videos` |
| Local listings with coordinates | `places` |
| Rich place data with hours and ratings | `maps` |
| Product prices and merchant comparison | `shopping` |
| Academic papers and citations | `scholar` |
| Patent filings and prior art | `patents` |
| Query expansion and suggestions | `autocomplete` |

Start with the lightest surface that answers the question. Each surface has its own result shape — see the individual pages below for field references and examples.

## What's next

- **<Link href='/docs/guides/search/search' children='Web Search' />** — knowledge graph, related questions, and related searches.
- **<Link href='/docs/guides/search/news' children='News' />** — articles with publisher, date, and thumbnail.
- **<Link href='/docs/guides/search/images' children='Images' />** — full-resolution URLs with dimensions.
- **<Link href='/docs/guides/search/videos' children='Videos' />** — metadata with duration and channel.
- **<Link href='/docs/guides/search/places' children='Places' />** — local listings with coordinates and contact info.
- **<Link href='/docs/guides/search/maps' children='Maps' />** — rich place data with hours, ratings, and pricing.
- **<Link href='/docs/guides/search/shopping' children='Shopping' />** — parsed prices and structured ratings.
- **<Link href='/docs/guides/search/scholar' children='Scholar' />** — papers, citations, and PDF links.
- **<Link href='/docs/guides/search/patents' children='Patents' />** — filings with dates, figures, and PDF links.
- **<Link href='/docs/guides/search/autocomplete' children='Autocomplete' />** — search suggestions for query expansion.
- **<Link href='/docs/guides/search/content-expansion' children='Content expansion' />** — fetch HTML or Markdown for the results worth reading more deeply.
- **<Link href='/docs/guides/search/patterns' children='Integration patterns' />** — agent tool calling, RAG pipelines, news monitoring, and more.
