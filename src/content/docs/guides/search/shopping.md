---
title: 'Search: Shopping'
description: 'Product listings with parsed prices and structured ratings. Use it for product intelligence, price comparison, and merchant research.'
---

import { Link } from 'components/elements/Link'

Product listings with parsed prices and structured ratings. Use it for product intelligence, price comparison, and merchant research.

```js
const page = await google('macbook pro', { type: 'shopping' })
```

## Result fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Product name |
| `url` | `string` | Merchant URL |
| `publisher` | `string` | Merchant or retailer name |
| `price` | `{ symbol, amount }` | Parsed price with currency symbol and numeric amount |
| `image` | `{ url }?` | Product image |
| `rating` | `{ score, total, reviews? }?` | Rating with score, total (scale), and review count |
| `id` | `string?` | Product identifier |

```js
const page = await google('macbook pro', { type: 'shopping' })

page.results[0]
// {
//   title: '14-inch MacBook Pro Apple M5 chip CPU and GPU',
//   url: 'https://www.google.com/search?ibp=oshop&q=macbook+pro&prds=...',
//   publisher: 'Apple',
//   price: { symbol: '$', amount: 1699 },
//   rating: { score: 4.8, total: 5, reviews: 2400 },
//   id: '1293272249390991376'
// }
```

Prices are already parsed into numeric `amount` values — no need to strip currency strings in your pipeline:

```js
const page = await google('macbook pro', { type: 'shopping' })

const affordable = page.results.filter(r => r.price.amount < 500)
const avgPrice = page.results.reduce((sum, r) => sum + r.price.amount, 0) / page.results.length
```

## See also

- <Link href='/docs/guides/search/search' children='Web Search' /> — when you need general web results instead of product listings.
- <Link href='/docs/guides/search/patterns' children='Integration patterns' /> — product intelligence and price monitoring workflows.
