---
title: 'patents'
isPro: true
description: 'Get Google Patents filings as structured data with the Microlink SDK: inventor, assignee, ISO 8601 dates, figures, and PDF links.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'patents'"/>

Patent filings with ISO 8601 dates, figures, and PDF links. Pass `type: 'patents'` to [search](/docs/sdk/methods/search):

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

## Result

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

See the [patents guide](/docs/guides/search/patents) for prior-art workflows.
