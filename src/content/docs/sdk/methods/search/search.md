---
title: 'search'
isPro: true
description: 'Get Google web results as structured data with the Microlink SDK: title, URL, and snippet, plus knowledge graph, related questions, and related searches.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'search'"/><br/>
Default: <Type children="'search'"/>

Web results with knowledge graph, related questions, and related searches. This is the default surface of [search](/docs/sdk/methods/search) when `type` is omitted:

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

## Page extras

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

See the [web search guide](/docs/guides/search/search) for knowledge-graph and query-expansion workflows.
