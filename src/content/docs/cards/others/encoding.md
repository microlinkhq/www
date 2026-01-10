---
title: 'Encoding'
description: Manage how your design state and configuration are stored within the URL to ensure compatibility with the Microlink API.
---

**Microlink Cards** are shipped as stateful application, where the state is all time encoded in the URL.

That design decision has some tradeoff: Any modification over [presets](/docs/cards/getting-started/presets) original code will be living into the URL, making it to looks very long. To avoid that, just [add your preset](https://github.com/microlinkhq/cards/tree/master/src/components/presets).

Additonally, any value in the URL should be encoded properly to be consumed by [Microlink API](/docs/api/getting-started/overview), meaning you need to use [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) or equivalent.

Last, any other query parameter present into the URL that it isn't part of the query variable will be passed to [Microlink API](/docs/api/getting-started/overview). You can see an [example](https://github.com/microlinkhq/cdn/blob/master/src/banner.js#L32).


