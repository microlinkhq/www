---
title: 'places'
isPro: true
description: 'Get Google Places listings as structured data with the Microlink SDK: address, coordinates, rating, phone, and category.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'places'"/>

Local listings with coordinates and contact info. Pass `type: 'places'` to [search](/docs/sdk/methods/search):

```js
const { results } = await microlink.search('coworking spaces barcelona', { type: 'places' })

results[0]
// {
//   title: 'Betahaus | Coworking Barcelona',
//   address: 'Carrer de Vilafranca, 7, 08024 Barcelona, Spain',
//   latitude: 41.406982,
//   longitude: 2.1567652,
//   rating: 4.8,
//   ratingCount: 417,
//   category: 'Coworking space',
//   phone: { number: '+34 655 62 71 49' },
//   url: 'https://www.betahaus.es/…',
//   cid: '15533147541347981884'
// }
```

## Result

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Business name |
| `address` | `string` | Street address |
| `latitude` | `number` | Geographic latitude |
| `longitude` | `number` | Geographic longitude |
| `rating` | `number?` | Average rating |
| `ratingCount` | `number?` | Number of reviews |
| `category` | `string?` | Business category |
| `phone` | `{ number }?` | Phone number |
| `url` | `string?` | Website URL |
| `cid` | `string` | Google CID identifier |

Choose `places` for simple listings. Choose [maps](/docs/sdk/methods/search/maps) when you need opening hours, price levels, or place IDs.

See the [places guide](/docs/guides/search/places) for local lookup workflows.
