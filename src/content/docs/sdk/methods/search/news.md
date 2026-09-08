---
title: 'news'
isPro: true
description: 'Get Google News articles as structured data with the Microlink SDK: headline, publisher, publication date, snippet, and thumbnail.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'news'"/>

Recent articles with publisher, date, and thumbnail. Pass `type: 'news'` to [search](/docs/sdk/methods/search):

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

## Result

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

See the [news guide](/docs/guides/search/news) for monitoring patterns.
