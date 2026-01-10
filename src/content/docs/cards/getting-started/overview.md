---
title: 'Overview'
description: Create, automate, and scale dynamic visual assets with Microlink Cards, merges code and data. Use a React-based interactive editor, generate optimized images on the fly.
---

import { Link } from 'components/elements/Link/base'
import { Figcaption } from 'components/markdown/Figcaption'

![](https://cdn.microlink.io/docs/cards-overview.png)

<Figcaption>See live demo at <Link href='https://cards.microlink.io/editor/?preset=simple&p=2gE1PD4KICA8c3R5bGUgY2hpbGRyZW49e2AgICAgCiAgICAuY29udGVudCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOwogICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICBiYWNrZ3JvdW5kOiBibGFjazsKICAgICAgY29sb3I6IHdoaXRlOwogICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOwogICAgfQogIGB9Lz4KICA8ZGl2IGNsYXNzTmFtZT0iY29udGVudCI-CiAgICA8aDE-e3F1ZXJ5LmhlYWRsaW5lfTwvaDE-CiAgICA8aDM-e3F1ZXJ5LmNhcHRpb259PC9oMz4KICA8L2Rpdj4KPC8-' children='Microlink Cards' />.</Figcaption>

[Microlink Cards](https://cards.microlink.io) is the easiest way to create and share dynamic images at scale. It's an interactive editor for mixing code and data, used for automatizing marketing and design departments in just one tool. You can see the [source code on GitHub](https://github.com/microlinkhq/cards).

![](https://cdn.microlink.io/docs/cards-embed.png)

As output of the process, an optimized image will be generated on the fly using cloud-based browsers, served via [Microlink CDN](/blog/edge-cdn/) using [Microlink API](/docs/api/getting-started/overview).

**Interactive Editor**

The editor is your productivity tool. It aims to be lightweight and fast to quickly respond to changes. It can switch between different themes, use key bindings for quick access and get the final URL on save.

**Stateful Presets**

You can reuse a previously declared preset. If you edit the default code or query variables, a unique URL will be generated for consuming the new mix.

Anyone can create a preset and the tool is shipped with a good set of popular presets by default.

**Feed with data**

A preset can be feed with data using query variables. Declare the preset once, reuse it forever. You can feed your preset with different query variables every time and you will a totally new mix.

Anything can be a query variable, meaning a color theme, a string or an external API call.

**Jamstack player**

The tool has been designed to be consumed in a simple way, similar to the rest of [Jamstack](https://jamstack.org) buddies.

Complementary, you can use any Jamstack oriented software inside the tool, such as load external stylesheets, load a third party script (like fonts) or feed data from an API.

**Powered with React**

All the things are written with React. That means that anything present in the React ecosystem can be potentially used, being more than a simple editor.
