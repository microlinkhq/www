---
title: 'images'
isPro: true
description: 'Get Google Images results as structured data with the Microlink SDK: full-resolution URLs, dimensions, thumbnails, and creator attribution.'
---

import { Type } from 'components/markdown/Type'

Type: <Type children="'images'"/>

Full-resolution image URLs with dimensions. Pass `type: 'images'` to [search](/docs/sdk/methods/search):

```js
const { results } = await microlink.search('northern lights', { type: 'images' })

results[0]
// {
//   title: 'Northern lights (aurora borealis) — What they are and how to see them | Space',
//   url: 'https://www.space.com/15139-northern-lights-auroras-earth-facts-sdcmp.html',
//   creator: 'Frank Olsen',
//   image: { url: 'https://cdn.mos.cms.futurecdn.net/57jQMDN5MZLYfV8ps8HuZQ.jpg', width: 2121, height: 1193 },
//   thumbnail: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:…', width: 300, height: 168 }
// }
```

## Result

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Image title or alt text |
| `url` | `string` | Source page URL |
| `image` | `{ url, width, height }` | Full-resolution image |
| `thumbnail` | `{ url, width, height }` | Smaller preview |
| `google` | `{ url }?` | Google Images viewer link |
| `creator` | `string?` | Image creator attribution |
| `credit` | `string?` | Image credit or copyright |

See the [images guide](/docs/guides/search/images) for asset-discovery workflows.
