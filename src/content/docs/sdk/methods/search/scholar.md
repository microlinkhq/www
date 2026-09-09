---
title: 'scholar'
isPro: true
description: 'Get Google Scholar papers as structured data with the Microlink SDK: citations, publication year, publisher line, and PDF links.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'scholar'"/>

Academic papers with citation counts and PDF links. Pass `type: 'scholar'` to [search](/docs/sdk/methods/search):

```js
const { results } = await microlink.search('attention is all you need', { type: 'scholar' })

results[0]
// {
//   title: 'Attention is all you need',
//   url: 'https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html',
//   description: '…to attend to all positions in the decoder…',
//   publisher: 'A Vaswani, N Shazeer, N Parmar… - Advances in neural …, 2017',
//   year: 2017,
//   citations: 249883,
//   pdf: { url: 'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf' },
//   id: '5Gohgn6QFikJ'
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Paper title |
| `url` | `string` | Paper or abstract URL |
| `description` | `string` | Paper snippet |
| `publisher` | `string` | Authors, journal, and year in publisher line format |
| `year` | `number` | Publication year |
| `citations` | `number` | Citation count |
| `pdf` | `{ url }?` | Direct PDF link when available |
| `id` | `string` | Google Scholar ID |

Sort or filter by `citations` to surface the most impactful papers. Use `pdf.url` when the workflow needs the full document.

See the [scholar guide](/docs/guides/search/scholar) for research and citation workflows.
