---
title: 'shopping'
isPro: true
description: 'Get Google Shopping results as structured data with the Microlink SDK: parsed prices, merchant, ratings, and product identifiers.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'shopping'"/>

Product listings with parsed prices and structured ratings. Pass `type: 'shopping'` to [search](/docs/sdk/methods/search):

```js
const { results } = await microlink.search('macbook pro', { type: 'shopping' })

results[0]
// {
//   title: '14-inch MacBook Pro Apple M5 chip CPU and GPU',
//   url: 'https://www.google.com/search?ibp=oshop&q=macbook+pro&prds=…',
//   publisher: 'Apple',
//   price: { symbol: '$', amount: 1699 },
//   rating: { score: 4.8, total: 5, reviews: 2400 },
//   id: '1293272249390991376'
// }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Product name |
| `url` | `string` | Merchant URL |
| `publisher` | `string` | Merchant or retailer name |
| `price` | `{ symbol, amount }` | Parsed price with currency symbol and numeric amount |
| `image` | `{ url }?` | Product image |
| `rating` | `{ score, total, reviews? }?` | Rating with score, total (scale), and review count |
| `id` | `string?` | Product identifier |

`price.amount` is already a number, so you can filter and average without parsing currency strings:

```js
const affordable = results.filter(r => r.price.amount < 500)
```

See the [shopping guide](/docs/guides/search/shopping) for price-monitoring workflows.
