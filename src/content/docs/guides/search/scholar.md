---
title: 'Search: Scholar'
description: 'Academic papers with citation counts and PDF links. Use it for technical or scientific research workflows that need papers, citations, and publication context.'
---

import { Link } from 'components/elements/Link'

Academic papers with citation counts and PDF links. Use it for technical or scientific research workflows that need papers, citations, and publication context.

```js
const page = await google('attention is all you need', { type: 'scholar' })
```

## Result fields

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

```js
const page = await google('attention is all you need', { type: 'scholar' })

page.results[0]
// {
//   title: 'Attention is all you need',
//   url: 'https://proceedings.neurips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html',
//   description: '... to attend to all positions in the decoder up to and including that position. We need to prevent...',
//   publisher: 'A Vaswani, N Shazeer, N Parmar… - Advances in neural …, 2017 - proceedings.neurips.cc',
//   year: 2017,
//   citations: 249883,
//   pdf: { url: 'https://proceedings.neurips.cc/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf' },
//   id: '5Gohgn6QFikJ'
// }
```

Sort or filter by `citations` to surface the most impactful papers. Use `pdf.url` when your workflow needs the full document content.

## See also

- <Link href='/docs/guides/search/patents' children='Patents' /> — for prior-art research and filing lookup instead of academic papers.
- <Link href='/docs/guides/search/patterns' children='Integration patterns' /> — academic research and citation analysis workflows.
