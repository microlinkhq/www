---
title: 'Product brief #7: simpler SDK v4, docs portal, production-ready MQL'
description: 'Experience the next evolution of Microlink with SDK v4.0, featuring a streamlined API and smarter bundling. Plus, explore our new Documentation Portal.'
authors:
  - kiko
date: '2019-05-01'
---

import { Microlink } from 'components/markdown/Microlink'

This brief covered three releases: Microlink SDK 4.0 with fewer, more unified card parameters and a rewritten build, a documentation portal built into the site, and the Microlink Query Language (MQL), which was now production ready.

If you used the SDK, v4 was a major version that renamed or removed four card parameters. The [release notes on GitHub](https://github.com/microlinkhq/sdk/releases/tag/v4.0.0) list every change.

<Microlink url='https://microlink.io/docs/sdk-legacy/getting-started/overview/' media='logo' />

## SDK 4.0 expressed the same cards with fewer parameters

SDK 4.0 had two goals: simplify some connector-specific parameters, and produce smarter bundles. Both prepared the SDK for the next step, bringing [audio](https://github.com/microlinkhq/sdk/issues/135) support, which the [API](/docs/api/parameters/audio) already had, to the SDK level.

```jsx
/* before */
<Microlink reverse video />

/* after */
<Microlink direction='ltr' media='video' />
```

The [Microlink SDK](/docs/sdk-legacy/getting-started/overview/) renders previews for any site on the internet, so over time we had added specific parameters for each new use case. With a wider view of the whole API surface, the same cards could be expressed with fewer, more general parameters, as the snippet above shows. The changes in v4 were:

- **`image` became `media`:** one parameter now selected which media the card showed.
- **`video` was removed:** you passed `media='video'` instead.
- **`reverse` became `direction`:** it took the values `rtl` and `ltr`.
- **`noFetch` was removed:** the SDK deduced it when you called `setData` with an object.

## The build was rewritten around the ESM bundle

The build system decides how the library is bundled for each way you consume it, and v4 **rewrote** it from scratch. It produced both official connectors, [React](/docs/sdk-legacy/integrations/react/) and [Vanilla](/docs/sdk-legacy/integrations/vanilla/).

The React connector was bundled for [CommonJS](https://github.com/microlinkhq/sdk/blob/master/packages/react/package.json#L6) and [ESM](https://github.com/microlinkhq/sdk/blob/master/packages/react/package.json#L7), the two entry points declared in its `package.json`. The build then took that ESM bundle as the input for the Vanilla connector, which it exported as a Universal Module Definition (_UMD_) bundle for the browser.

## The documentation moved into the site

The new documentation portal gave everything involved with Microlink one entry point: the documentation itself, but also examples and code snippets. It was integrated into microlink.io and built with the same visual elements as our [Design System](/design).

Every documentation section also had an **Edit This Page on GitHub** link in its footer. Anyone who spotted a mistake or a missing example could suggest a change to that page on GitHub directly from the footer link.

## MQL was production ready

```jsx
import mql from '@microlink/mql'
const { status, data } = await mql('https://microlink.io')
console.log(data)
```

The Microlink Query Language (_MQL_) replaced [Custom Rules](/blog/custom-rules), as announced in our [Master Plan for 2019](/blog/master-plan-2019/). With this release, **MQL was production ready**.

The [@microlink/mql](https://github.com/microlinkhq/mql) npm package is a JavaScript HTTP client on top of the [Microlink API](/docs/api/getting-started/overview). As the snippet shows, one `mql()` call with a URL returns the response `status` and the extracted `data`. The package also runs directly in the browser, where [its size is 4KB](https://bundlephobia.com/result?p=@microlink/mql).

The first [MQL documentation](/docs/mql/getting-started/overview) pages explained how rules are defined. The next items on the plan were documentation at the API layer, more practical examples, and a separate site to use as an MQL playground.

## Upgrading to v4

To move a card to v4, replace `reverse` with `direction`, `video` with `media='video'`, and `image` with `media`, then drop `noFetch` wherever you call `setData` with an object. The [SDK docs](/docs/sdk-legacy/getting-started/overview/) cover each parameter, and `npm install @microlink/mql` adds the MQL client to any JavaScript project.
