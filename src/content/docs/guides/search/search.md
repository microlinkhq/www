---
title: 'Search: Web Search'
description: 'Web results with knowledge graph, related questions, and related searches. The default surface when you omit type.'
---

import { Link } from 'components/elements/Link'

Web results with knowledge graph, related questions, and related searches. This is the default surface when you omit `type`.

```js
const page = await google('technical seo checklist')
```

## Result fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Page title from the SERP entry |
| `url` | `string` | Destination URL |
| `description` | `string` | Snippet or meta description |

```js
const page = await google('technical seo checklist')

page.results[0]
// {
//   title: 'Full Technical SEO Checklist (from Start to Finish) - Semrush',
//   url: 'https://www.semrush.com/blog/technical-seo-checklist/',
//   description: 'The full technical SEO checklist covers crawling and indexing issues, optimizing for user experience,. While creating this checklist, we also ...'
// }
```

## Page extras

The `search` surface can also return these top-level fields alongside `results`:

| Field | Type | Description |
|-------|------|-------------|
| `knowledgeGraph` | `object?` | Entity panel with `title`, `type`, `website`, `image`, `description`, `descriptionSource`, `descriptionLink`, and `attributes` |
| `peopleAlsoAsk` | `array?` | Related questions with `question`, `snippet`, `title`, and `link` |
| `relatedSearches` | `array?` | Suggested follow-up queries with `query` |

### Knowledge graph

When the query matches a well-known entity, the response includes structured attributes:

```js
const page = await google('apple inc')

page.knowledgeGraph
// {
//   title: 'Apple',
//   attributes: {
//     'Headquarters': 'Cupertino, CA',
//     'Founded': 'April 1, 1976, Los Altos, CA',
//     'Founders': 'Steve Jobs, Steve Wozniak, and Ronald Wayne',
//     'CEO': 'Tim Cook (Aug 24, 2011–Sep 1, 2026)',
//     'Customer service': '1 (800) 275-2273'
//   }
// }
```

### Related searches

Use `relatedSearches` for query expansion in retrieval workflows:

```js
const page = await google('apple inc')

page.relatedSearches.map(s => s.query)
// ['Apple Inc full form', 'Apple Inc address', 'Apple Inc usa', 'Apple Inc stock']
```

## See also

- <Link href='/docs/guides/search/news' children='News' /> — if your workflow depends on freshness and publication timestamps.
- <Link href='/docs/guides/search/autocomplete' children='Autocomplete' /> — expand queries before running heavier searches.
- <Link href='/docs/guides/search/content-expansion' children='Content expansion' /> — fetch HTML or Markdown for the results worth reading more deeply.
