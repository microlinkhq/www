---
title: 'Embed'
description: Deploy your custom designs globally by embedding generated image URLs directly into your website's markup. Cards are generated on-the-fly and then served via a high-performance CDN.
---

import { Link } from 'components/elements/Link/base'
import { Figcaption } from 'components/markdown/Figcaption'

Once your composition has been created, is time to spread to the world.

![](https://cdn.microlink.io/docs/cards-embed.png)

<Figcaption>See live demo at <Link href='https://cards.microlink.io/editor/?preset=simple&p=2gE1PD4KICA8c3R5bGUgY2hpbGRyZW49e2AgICAgCiAgICAuY29udGVudCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOwogICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICBiYWNrZ3JvdW5kOiBibGFjazsKICAgICAgY29sb3I6IHdoaXRlOwogICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOwogICAgfQogIGB9Lz4KICA8ZGl2IGNsYXNzTmFtZT0iY29udGVudCI-CiAgICA8aDE-e3F1ZXJ5LmhlYWRsaW5lfTwvaDE-CiAgICA8aDM-e3F1ZXJ5LmNhcHRpb259PC9oMz4KICA8L2Rpdj4KPC8-' children='Microlink Cards' />.</Figcaption>

The generated image can be consumed directly from markup. Just place the URL as Open Graph, JSON+LD or regular metadata as part of your content.

The interface suggest you the code snippet to use; It should be more than enough.

The first request will generate the image on the fly; the successive requests will consume the image from the cache using [Microlink CDN](/blog/edge-cdn/).

Cached requests don't impact your plan quota. See [pricing](/docs/cards/others/pricing) for more information.

