---
title: 'Search: Images'
description: 'Full-resolution image URLs with dimensions. Use it for visual references, asset discovery, and image metadata retrieval.'
---

import { Link } from 'components/elements/Link'

Full-resolution image URLs with dimensions. Use it for visual references, asset discovery, and image metadata retrieval.

```js
const page = await google('northern lights', { type: 'images' })
```

## Result fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Image title or alt text |
| `url` | `string` | Source page URL |
| `image` | `{ url, width, height }` | Full-resolution image |
| `thumbnail` | `{ url, width, height }` | Smaller preview |
| `google` | `{ url }?` | Google Images viewer link |
| `creator` | `string?` | Image creator attribution |
| `credit` | `string?` | Image credit or copyright |

```js
const page = await google('northern lights', { type: 'images' })

page.results[0]
// {
//   title: 'Northern lights (aurora borealis) — What they are and how to see them | Space',
//   url: 'https://www.space.com/15139-northern-lights-auroras-earth-facts-sdcmp.html',
//   creator: 'Frank Olsen',
//   image: {
//     url: 'https://cdn.mos.cms.futurecdn.net/57jQMDN5MZLYfV8ps8HuZQ.jpg',
//     width: 2121,
//     height: 1193
//   },
//   thumbnail: {
//     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKTwHpVqCxOgupSwj5tnQkfBpG8thtV5J4A&s',
//     width: 300,
//     height: 168
//   }
// }
```

## See also

- <Link href='/docs/guides/search/videos' children='Videos' /> — when you need video metadata instead of static images.
- <Link href='/docs/guides/search/content-expansion' children='Content expansion' /> — fetch the source page content for any image result.
