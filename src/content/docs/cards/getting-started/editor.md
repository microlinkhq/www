---
title: 'Editor'
description: 'Design and preview dynamic visual assets directly in the browser using the Cards Editor. Instantly shareable and can be programmatically populated with your own data.'
---

import { Link } from 'components/elements/Link/base'
import { Figcaption } from 'components/markdown/Figcaption'

The editor lets you design in the browser, allowing visualize your composition before the screenshot will be finally taken. The code is written using JSX markup that will be transformed into HTML.

![](https://cdn.microlink.io/docs/cards-editor.png)

<Figcaption>See live demo at <Link href='https://cards.microlink.io/editor/?preset=simple&p=2gE1PD4KICA8c3R5bGUgY2hpbGRyZW49e2AgICAgCiAgICAuY29udGVudCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOwogICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICBiYWNrZ3JvdW5kOiBibGFjazsKICAgICAgY29sb3I6IHdoaXRlOwogICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOwogICAgfQogIGB9Lz4KICA8ZGl2IGNsYXNzTmFtZT0iY29udGVudCI-CiAgICA8aDE-e3F1ZXJ5LmhlYWRsaW5lfTwvaDE-CiAgICA8aDM-e3F1ZXJ5LmNhcHRpb259PC9oMz4KICA8L2Rpdj4KPC8-' children='Microlink Cards' />.</Figcaption>

**Composable**

A set of [primitive UI components](https://theme-ui.com/components) are included by default.

These componentes are completely customized: The `sx` prop lets you add any valid CSS to an element, while using values from your theme to keep styles consistent. You can think of the style object that the sx prop accepts as a superset of CSS.

**Stateful**

Any editor change generates a new mix. This new mix has an unique URL associated, being possible quickly share your mix and easily create modifications over it.

**Feed with data**

The [query variables](/docs/cards/getting-started/query-variables) is the way for connecting your design with your data as an efortless way.

**Vanilla Markup**

On web development, the least common denominator will always be HTML and CSS.

Although the editor accepts JSX markup, it's a superset over HTML/CSS, so you can still using just old but good vanilla style.
