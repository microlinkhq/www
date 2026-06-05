---
title: 'Search: News'
description: 'Recent articles with publisher, date, and thumbnail. Use it when freshness matters and your workflow depends on publication timestamps.'
---

import { Link } from 'components/elements/Link'

Recent articles with publisher, date, and thumbnail. Use it when freshness matters and your workflow depends on publication timestamps.

```js
const page = await google('artificial intelligence', { type: 'news' })
```

## Result fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Article headline |
| `url` | `string` | Publisher URL |
| `description` | `string` | Article snippet |
| `date` | `string` | ISO 8601 publication date |
| `publisher` | `string` | Source name |
| `image` | `{ url }?` | Thumbnail image |

```js
const page = await google('artificial intelligence', { type: 'news' })

page.results[0]
// {
//   title: 'Artificial Intelligence Floods Court Dockets with Home-Brewed Lawsuits',
//   url: 'https://www.nytimes.com/2026/05/25/us/politics/artificial-intelliegence-courts.html',
//   description: 'For years, courts have welcomed cases brought by self-represented litigants. Now those plaintiffs have A.I., and their filings are consuming...',
//   date: '2026-05-25T15:13:08.232Z',
//   publisher: 'The New York Times',
//   image: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaMy...' }
// }
```

Combine with `period` to narrow the time window:

```js
await google('tech acquisitions', { type: 'news', period: 'week' })
```

Combine with `location` for regional coverage:

```js
await google('regulatory update', { type: 'news', location: 'de', period: 'day' })
```

## See also

- <Link href='/docs/guides/search/search' children='Web Search' /> — when you need broad web retrieval instead of time-sensitive articles.
- <Link href='/docs/guides/search/patterns' children='Integration patterns' /> — news monitoring with multi-region queries.
