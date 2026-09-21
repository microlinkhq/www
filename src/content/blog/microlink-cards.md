---
title: 'How Microlink Cards stores every design in a URL'
description: 'Learn how Microlink Cards uses Monaco Editor, URL-based state management with lz-string compression, and the Microlink API to generate dynamic social images at scale.'
authors:
  - kiko
date: '2021-04-06'
---

![](/images/YbOSJHy.png)

[Microlink Cards](https://cards.microlink.io) is officially [launched on Product Hunt](https://www.producthunt.com/posts/microlink-cards) today. It is an online code editor that turns a React composition into an image, and it has no database: every design lives in its URL.

**TL;DR**

- Microlink Cards is an online code editor that turns a React composition into an image, and it has **no database**: every design lives in its URL.
- The editor is [Monaco Editor](https://microsoft.github.io/monaco-editor/), the core editor component of VS Code, so you get desktop features such as autocomplete.
- Every code or data change is encoded in the query parameters and compressed with lz-string, so shared URLs stay short well under the practical ceiling of around **2,000 characters**.
- The Microlink API renders each card URL with the screenshot parameter and serves the image from the Microlink CDN.

[Early adopters](https://microlink.us17.list-manage.com/subscribe/post?u=13504896341022a643b87c538&id=0d0978d452) have had access since we [introduced it one year ago](https://mailchi.mp/4273d2f40705/introducing-microlink-cards). That year went into three engineering decisions that matter when a product runs at scale: the editor, the state, and the image generation.

## A VS Code editor in the browser

The editor is where you write a card's code, and a code editor is large and hard to embed in a web application. The first question was whether a real one, with the features of a desktop editor, could run inside a browser tab.

Microlink Cards uses [Monaco Editor](https://microsoft.github.io/monaco-editor/), the core editor component of [VS Code](https://code.visualstudio.com/docs/editor/editingevolved). You get the same editing features you have on the desktop, such as autocomplete.

![](/images/SPMzFhm.png)

Monaco Editor is lighter than it looks, but it still loads asynchronously so it never blocks the browser's rendering step. [monaco-react](https://github.com/suren-atoyan/monaco-react) is the React wrapper that handles that setup for us in a few lines.

We combined it with [react-live](https://github.com/FormidableLabs/react-live), which renders the editor's code as a live preview. Every change you type re-renders instantly, and the code you write can load React components inside the embedded editor.

## State without a database

We avoided a database on purpose. A database introduces a failure point and an extra cost in money and maintenance, and if you do not have a database, you do not need to maintain it.

Instead, every code or data change is encoded in the query parameters, so each state has its own unique URL that restores it:

```bash
https://cards.microlink.io/editor?color=white&bg=black
```

Short values like `color` and `bg` fit in the query string as they are. The editor's full source code does too, but the URL it produces is long:

```bash
https://cards.microlink.io/editor?code=%3C%3E%0A++%3CBox%0A++++as%3D%27header%27%0A++++sx%3D%7B%7B%0A++++++position%3A+%27absolute%27%2C…
```

We did not find an official [URL length limitation](https://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url-in-different-browsers/417184#417184), but the practical ceiling looks to be around 2,000 characters. Long URLs also look terrible when shared, so we wanted them short regardless of the limit.

To keep URLs short, the editor compresses its state with the [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html) algorithm. The whole serialization layer is two exports from `lz-ts`: `marshall` compresses and `unmarshall` restores.

```js
import { compressToURI, decompressFromURI } from 'lz-ts'
export const marshall = compressToURI
export const unmarshall = decompressFromURI
```

`compressToURI` outputs an ASCII string that represents the original code encoded in URL-safe Base64. The result is a shorter URL, which saves bandwidth and CPU every time a card is loaded or shared.

## Images rendered by the Microlink API

Microlink Cards is part of the [Microlink](https://microlink.io) ecosystem. Microlink provides cloud-based browsers for any browser flow, such as taking a screenshot, getting the full HTML, or generating a PDF.

Microlink Cards is a product built on Microlink itself. The editor is a free canvas for any image composition, and each composition has a unique URL.

That URL goes to the [Microlink API](https://microlink.io/docs/api/getting-started/overview) with the [screenshot](https://microlink.io/docs/api/parameters/screenshot) parameter enabled. The API returns the rendered image and serves it from the [Microlink CDN](https://microlink.io/blog/edge-cdn/).

Open the editor at `cards.microlink.io/editor`, change a color or a line of code, and the URL in the address bar is your card.
