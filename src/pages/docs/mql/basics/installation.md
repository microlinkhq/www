---
title: 'Installation'
---

It is available as an [npm package](https://www.npmjs.com/package/@microlink/react).

<Terminal>npm install @microlink/mql --save</Terminal>

MQL has been designed to be consumed in different ways, one of the most common being from **Node.js** using **CommonJS**.

```js
const mql = require('@microlink/mql')
```

It's ready to be consumed as **ESM**:

```js
import mql from 'microlink/mql'
```

And last but not least, it can be loaded as **UMD**:

```html
<script src="https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.6/dist/mql.min.js"></script>
```

I case you need to consume it using UMD, keep in mind the [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) dependency is not included with the build bundle.

Although it's [widely supported](https://caniuse.com/#feat=fetch), we recommend use [polyfill.io](https://polyfill.io/v3/) CDN for that purpose, it will only load polyfill if fetch is not globally detected.

```html
<script>
  crossorigin="anonymous" 
  src="https://polyfill.io/v3/polyfill.min.js?features=fetch">
</script>
```

Some extra and no elemental features are not available on the browser environment bundle, to keep it as small and lightweight as possible.
