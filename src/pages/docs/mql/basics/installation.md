---
title: 'Installation'
---

It is available as [npm package](https://www.npmjs.com/package/@microlink/react)

<Terminal>npm install @microlink/mql --save</Terminal>

MQL has been designed to be consumed from different ways.

Probably the most used is from **Node.js** using **CommonJS**

```js
const mql = require('@microlink/mql')
```

You can consume it from **ESM** as well

```js
import mql from 'microlink/mql'
```

Also, you can bundle it to be used in a browser environment or load it using **UMD**

```html
<script src="https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.6/dist/mql.min.js"></script>
```

In that case the UMD doesn't include [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) dependency.

Although it's [widely supported](https://caniuse.com/#feat=fetch), we recommend use [polyfill.io](https://polyfill.io/v3/) CDN for that purpose, it will only load polyfill if fetch is not globally detected.

```html
<script>
  crossorigin="anonymous" 
  src="https://polyfill.io/v3/polyfill.min.js?features=Object.entries%2Cfetch%2CIntersectionObserverEntry">
</script>
```

Some extra and no elemental features are not availables on the browser environment bundle to keep it small and lightweight as possible.
