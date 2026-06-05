---
title: 'Search: Content expansion'
description: 'Fetch full HTML or Markdown for search results and SERP pages. Learn the two-step retrieval model that keeps search lightweight and only expands the results worth reading more deeply.'
---

import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Microlink Search is designed around a two-step retrieval model: lightweight structured results first, full page content second. Every result with a `url` exposes lazy `.html()` and `.markdown()` helpers that fetch the page content only when called.

This page covers how those helpers work, when to use each format, and how to apply the pattern in retrieval workflows.

## Result-level expansion

Any result that contains a `url` field gets two lazy methods attached:

```js
const page = await google('technical seo checklist')
const result = page.results[0]

const html = await result.html()
const markdown = await result.markdown()
```

Both methods call the Microlink API under the hood, so each expansion counts as a separate API request. This is intentional — you should only expand the results that are actually worth reading.

### When to use `.html()`

Use `.html()` when you need the raw DOM structure, inline styles, or structured content that Markdown would flatten:

- **Custom parsing**: extract specific elements, tables, or structured data with your own selectors
- **Downstream rendering**: inject the HTML into another page, iframe, or document
- **Preserving layout**: tables, forms, and complex layouts that lose structure in Markdown

### When to use `.markdown()`

Use `.markdown()` when the consumer is a language model or a text-based pipeline:

- **LLM context**: Markdown uses fewer tokens than HTML for the same content
- **RAG indexing**: cleaner text for vector embeddings and chunk splitting
- **Summarization**: models produce better summaries from Markdown than from DOM noise

## Page-level content

The page object itself also exposes `.html()` and `.markdown()` — these fetch the content of the Google SERP page for the query, not an individual result:

```js
const page = await google('technical seo checklist')

const serpHtml = await page.html()
const serpMarkdown = await page.markdown()
```

This is useful when you want the raw SERP layout for analysis, competitive monitoring, or SERP feature detection. In most workflows, result-level expansion is more useful.

## The two-step pattern

The core idea: search first, expand selectively.

```js
const page = await google('site:openai.com function calling guide')

const sources = await Promise.all(
  page.results.slice(0, 3).map(async result => ({
    title: result.title,
    url: result.url,
    markdown: await result.markdown()
  }))
)
```

This keeps your API usage predictable. A search query returns 10 results at the cost of one request. Expanding three of them costs three more. You control the depth.

### Why not expand everything?

Expanding all results by default would be wasteful in most workflows:

- **Cost**: each `.html()` or `.markdown()` call is a separate Microlink API request
- **Latency**: fetching full page content is slower than reading structured results
- **Relevance**: most workflows only need the top 2–5 sources in full

Let your application logic (or the LLM) decide which results deserve deeper inspection.

## Expansion with pagination

Combine pagination with selective expansion to build deep retrieval pipelines:

```js
let page = await google('node.js frameworks')
const allSources = []

while (page && allSources.length < 10) {
  for (const result of page.results) {
    if (allSources.length >= 10) break

    allSources.push({
      title: result.title,
      url: result.url,
      markdown: await result.markdown()
    })
  }

  page = await page.next()
}
```

This pattern is especially useful for research agents that need broad coverage across multiple pages but still want full content for each source.

## Expansion in agent workflows

When `@microlink/google` is exposed as a tool, let the model control expansion depth:

1. **First tool call**: `google(query)` — the model sees structured results
2. **Second tool call**: `result.markdown()` — the model picks which results to read in full
3. **Third tool call**: `page.next()` — the model paginates only if confidence is low

This two-step pattern maps naturally to tool-calling agent loops. The model makes the cost/depth tradeoff on each turn instead of fetching everything upfront.

## See also

- <Link href='/docs/guides/search' children='Search' /> — install the client and make your first query.
- <Link href='/docs/guides/search/search' children='Web Search' />, <Link href='/docs/guides/search/news' children='News' />, <Link href='/docs/guides/search/scholar' children='Scholar' />, and more — field reference for each surface.
- <Link href='/docs/guides/search/patterns' children='Integration patterns' /> — agent tool calling, RAG pipelines, and multi-step research workflows.
- <Link href='/docs/guides/markdown' children='Markdown guide' /> — if you already have a URL and want to convert it to Markdown directly through the Microlink API.
