---
title: 'Search'
description: 'Use Microlink Search and @microlink/google to query public search surfaces as structured data, choose the right surface, and expand only the results worth reading more deeply.'
---

import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Microlink Search turns public search surfaces into structured JSON through the `@microlink/google` Node.js client. It is designed for SEO tooling, monitoring jobs, research copilots, and agent workflows that need fresh results without maintaining a parser fleet.

This guide stays focused on the package workflow: install the client, choose the right surface with `type`, then paginate or expand only the results that deserve deeper inspection.

## Install and initialize

Install the package, then create one client you can reuse across every supported surface:

```bash
npm install @microlink/google
```

```js
import createGoogleClient from '@microlink/google'

const google = createGoogleClient({
  apiKey: process.env.MICROLINK_API_KEY
})
```

The only requirement is a Microlink API key. Keep it on the server side or inside your agent backend, not in public browser code.

## Search is paid from the first request <ProBadge />

Search does not have a free tier. Reliable public-result collection depends on production-ready managed proxy capacity from the first request, so even small workloads use the same paid delivery model as production workloads.

That point matters in practice:

- plan for authenticated server-side usage from day one
- do not expose the API key in public clients or shareable tool URLs
- expect the same proxy-backed behavior in testing that you will use in production

See <Link href='https://microlink.io/pricing' children='pricing' /> if you need plan details.

## Your first query

Start with the default surface:

```js
const page = await google('technical seo checklist')

console.log(page.results)
```

When you omit `options.type`, the client uses `search`. The same function shape works for every other supported surface.

## The mental model

The main API is intentionally small:

```js
const page = await google(query, {
  type: 'search',
  location: 'us',
  period: 'week'
})
```

Use that model to reason about the package:

- `query` is required and supports standard search operators such as `site:` or `filetype:`.
- `type` routes the request to a specific public search surface.
- `location` uses an ISO 3166-1 alpha-2 country code and influences ranking, language, and local intent.
- `period` narrows results to a recent window: `hour`, `day`, `week`, `month`, or `year`.

A typical page object starts with a stable core:

```json
{
  "type": "search",
  "results": [
    {
      "title": "Technical SEO Checklist",
      "url": "https://example.com/checklist",
      "description": "A practical checklist for audits and recurring reviews."
    }
  ]
}
```

Some surfaces also expose extra fields. For example, the default `search` surface can include `knowledgeGraph`, `peopleAlsoAsk`, and `relatedSearches`.

## Choose a surface

Use `type` to match the workflow to the result shape:

- `search` for broad web retrieval, related questions, and source discovery:
  ```js
  google('technical seo checklist')
  ```
- `news` for recent developments, publisher monitoring, and incident tracking:
  ```js
  google('open source llm', { type: 'news' })
  ```
- `images` for visual references, image discovery, and asset research:
  ```js
  google('northern lights', { type: 'images' })
  ```
- `videos` for video discovery, tutorials, and creator research:
  ```js
  google('cooking tutorial', { type: 'videos' })
  ```
- `places` for local entities, addresses, phone numbers, and coordinates:
  ```js
  google('coffee shops denver', { type: 'places' })
  ```
- `maps` for richer place metadata such as ratings, hours, and pricing:
  ```js
  google('apple store new york', { type: 'maps' })
  ```
- `shopping` for product intelligence, price comparison, and merchant research:
  ```js
  google('macbook pro', { type: 'shopping' })
  ```
- `scholar` for papers, citations, and technical or academic research:
  ```js
  google('transformer architecture', { type: 'scholar' })
  ```
- `patents` for prior-art research, filing lookup, and invention monitoring:
  ```js
  google('touchscreen gestures apple', { type: 'patents' })
  ```
- `autocomplete` for query expansion, demand modeling, and prompt seeding:
  ```js
  google('how to fine tune', { type: 'autocomplete' })
  ```

Start with the lightest surface that answers the question. If the workflow is about freshness, switch to `news`. If it is about product comparison, switch to `shopping`. If it is about expanding recall, use `autocomplete` before you fetch full documents.

## Localize and filter by time

The quickest way to improve relevance is to tune `location` and `period` instead of adding extra parsing logic later:

```js
const page = await google('recetas de pasta', {
  type: 'news',
  location: 'es',
  period: 'week'
})
```

Use `location` when the same query means different things across countries. Use `period` when your workflow depends on recency, such as news monitoring, launch tracking, or alerting.

## Paginate naturally

Result pages chain through `.next()`:

```js
const page1 = await google('node.js frameworks')
const page2 = await page1.next()
const page3 = await page2.next()
```

That makes recurring jobs easier to read than manual cursor handling. A simple loop is often enough:

```js
let page = await google('node.js frameworks')

while (page) {
  for (const result of page.results) {
    console.log(result.title)
  }

  page = await page.next()
}
```

## Expand only the best matches

Search works best as a two-step retrieval model: lightweight results first, deeper content second.

Any result with a `url` can expose lazy `.html()` and `.markdown()` helpers:

```js
const page = await google('site:openai.com function calling guide')

const sources = await Promise.all(
  page.results.slice(0, 3).map(async result => ({
    title: result.title,
    url: result.url,
    html: await result.html(),
    markdown: await result.markdown()
  }))
)
```

This pattern is especially useful for agents, RAG pipelines, and editorial research. You avoid fetching full documents for every result and only expand the handful that look promising.

## Good fit for agents and copilots

`@microlink/google` is a good tool boundary because the input stays small and the output is already normalized:

1. Search for the topic with `google(query, options)`.
2. Inspect the first page of structured results.
3. Expand a few sources with `.html()` or `.markdown()` when the model needs more context.
4. Call `.next()` only if confidence is still low or recall needs to improve.

That keeps tool calls cheaper and easier to reason about than handing an agent raw search-result HTML.

## Naming and fair-use note

This guide uses the package name `@microlink/google` and surface names such as `search`, `news`, and `maps` only to identify the public interfaces the client supports.

Microlink Search is an independent Microlink product. It is not affiliated with, endorsed by, or provided by Google. Avoid third-party logos, copyrighted visual assets, or wording that suggests an official partnership when you document or market your own integration.

## What's next

- Wrap `google(query, options)` as a tool in your agent framework or internal research workflow.
- Add `location` and `period` before you build ranking or monitoring logic on top of the results.
- Keep `.html()` and `.markdown()` for the top matches instead of expanding every result by default.

## See also

- <Link href='/docs/guides/metadata' children='Metadata' /> — if you already have a URL and only need normalized preview fields.
- <Link href='/docs/guides/markdown' children='Markdown' /> — if you want to convert discovered pages into Markdown for indexing or LLM context.
- <Link href='/docs/guides/data-extraction' children='Data extraction' /> — if you want to parse custom structured fields from the pages that Search discovers.
- <Link href='https://search.microlink.io' children='Search setup docs' /> and <Link href='https://www.npmjs.com/package/@microlink/google' children='@microlink/google on npm' /> — the canonical product and package references behind this guide.
