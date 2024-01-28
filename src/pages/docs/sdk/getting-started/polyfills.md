---
title: 'Polyfills'
---

Since the **Microlink SDK** consumes the [Microlink API](/docs/api/getting-started/overview) and turns the raw data into a beautiful preview, it needs to perform an internal request to obtain it from the target URL.

To do that, our integrations use the standard [Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API). However, **Microlink SDK** doesn't add it as part of the bundle: It will take it from `window`.

That means that `window.fetch` should be available and accesible.

Although nowadays the [fetch browser compatibility](https://caniuse.com/#search=fetch) is good enough, you need to be sure that the environment **Microlink SDK** is running on has it available.

We recommend using the [polyfill.io](https://polyfill.io/) CDN for that purpose, it will only load the polyfill if `window.fetch` isn't globally detected.

```html
<script>
  crossorigin="anonymous"
  src="https://polyfill.io/v3/polyfill.min.js?features=fetch">
</script>
```

Just add the above to your main markup before the closing `body` tag.
