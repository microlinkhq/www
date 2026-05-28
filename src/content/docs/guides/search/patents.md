---
title: 'Search: Patents'
description: 'Patent filings with ISO 8601 dates and metadata. Use it for prior-art research, invention monitoring, and filing lookup.'
---

import { Link } from 'components/elements/Link'

Patent filings with ISO 8601 dates and metadata. Use it for prior-art research, invention monitoring, and filing lookup.

```js
const page = await google('compiler optimization', { type: 'patents' })
```

## Result fields

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

```js
const page = await google('compiler optimization', { type: 'patents' })

page.results[0]
// {
//   title: 'Prefetching associated with predicated load instructions',
//   inventor: 'Douglas C. Burger',
//   assignee: 'Microsoft Technology Licensing, Llc',
//   language: 'en',
//   url: 'https://patents.google.com/patent/US20170083338A1/en',
//   pdf: { url: 'https://patentimages.storage.googleapis.com/.../US20170083338A1.pdf' },
//   priority: { date: '2015-09-19T00:00:00.000Z' },
//   filing: { date: '2016-03-04T00:00:00.000Z' },
//   publication: { date: '2017-03-23T00:00:00.000Z', number: 'US20170083338A1' },
//   figures: [
//     { image: { url: 'https://...' }, thumbnail: { url: 'https://...' } }
//   ]
// }
```

## See also

- <Link href='/docs/guides/search/scholar' children='Scholar' /> — for academic papers and citations instead of patent filings.
- <Link href='/docs/guides/search/content-expansion' children='Content expansion' /> — fetch the full patent page as HTML or Markdown.
