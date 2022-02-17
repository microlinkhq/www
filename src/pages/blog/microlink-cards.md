---
title: 'Microlink Cards: Under the hood'
date: '2021-04-06'
---

![](https://i.imgur.com/YbOSJHy.png)

Even some [early adopters](https://microlink.us17.list-manage.com/subscribe/post?u=13504896341022a643b87c538&id=0d0978d452) knew about this service almost one year ago [one year ago](https://mailchi.mp/4273d2f40705/introducing-microlink-cards), [Microlink Cards](https://cards.microlink.io) has been officially [launched](https://www.producthunt.com/posts/microlink-cards) today.

During this time, **Microlink Cards** has been refined until reaching its final form, taking some engineering decisions under the hood.

There are some decisions worth to mention, specially when you're building things at scale.

## The online editor

**Microlink Cards** claims to use an online code editor.

How real is that? A code editor can be huge and hard to embed in a web application.

Well, Microlink Cards is using [Monaco Editor](https://microsoft.github.io/monaco-editor/) which is a core component used by [VS Code](https://code.visualstudio.com/docs/editor/editingevolved), meaning you will have the same code editor features, like autocomplete, among others.

![](https://i.imgur.com/SPMzFhm.png)

Although Monaco Editor is lighter than it may seem, it has to load asynchronously to prevent blocking the rendering step in a web browser.

We found [monaco-react](https://github.com/suren-atoyan/monaco-react) a very well React wrapper that handles the setup process in a simple way.

We combined it with [react-live](https://github.com/FormidableLabs/react-live) for rendering the code in a live preview mode, giving you the instant code change experience and making it possible to load React components inside the embedded code editor. How crazy is that?

## State without database

We wanted to avoid any database interaction since it will introduce a failure point and extra cost in terms of money and maintenance.

If you don't have a database, you don't need to maintain it.

Every time you do a code or data change, it will be encoded on the query parameters, generating a unique URL to retrieve the state.

```bash
https://cards.microlink.io/editor?color=white&bg=black
```

That's great for data, but what about code? can we encode all the editor code inside the query parameters?

Well, you can do it, but that will produce so long URLs:

```bash
https://cards.microlink.io/editor?code=%3C%3E%0A++%3CBox%0A++++as%3D%27header%27%0A++++sx%3D%7B%7B%0A++++++position%3A+%27absolute%27%2C…
```

We didn't find an official [URL length limitation](https://stackoverflow.com/a/417184) but looks like it could be around 2,000 characters. Also, we are not particularly interested in long URLs, they look terrible.

In order to minimize the size of the URLs, we apply [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html) compression algorithm.

```js
import LZString from 'lz-string'

export const marshall = value => LZString.compressToEncodedURIComponent(value)

export const unmarshall = value =>
  LZString.decompressFromEncodedURIComponent(value)
```

In this way, the output will be an ASCII string representing the original string encoded in Base64 in a URL friendly way, saving bandwidth and CPU in the process.

## The image generation

Lastly, **Microlink Cards** is part of the [Microlink](https://microlink.io) ecosystem.

Microlink's mission is to provide cloud-based browsers, ready to be used for end-users to enable any browser flow, such as taking a screenshot, getting full HTML, generating PDF, and more.

Here it is the inception: **Microlink Cards** is a product built using Microlink.

You can see **Microlink Cards** as a free canvas to draw any image composition that generates a unique URL.

That URL is provided to [Microlink API](https://microlink.io/docs/api/getting-started/overview) enabling [screenshot](https://microlink.io/docs/api/parameters/screenshot) feature to produce an image as output, distributed over [Microlink CDN](https://microlink.io/blog/edge-cdn/).
