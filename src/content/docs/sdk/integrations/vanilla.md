---
title: 'Vanilla'
description: 'Add beautiful link previews to any website with Microlink Vanilla. Integrate via CDN or npm, use CSS selectors for auto-replacement, and pass API parameters.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { Microlink } from 'components/markdown/Microlink'

It's available as [npm package](https://www.npmjs.com/package/@microlink/vanilla).

```bash
npm install @microlink/vanilla --save
```

Or via a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@microlink/vanilla@latest/dist/microlink.min.js"></script>
```

The vanilla bundle is based on the [React](/docs/sdk/integrations/react) version and exported as Universal Module Definition (_UMD_).

Since the bundle doesn't include the dependencies, we recommend loading them from a **CDN**:

```html
<!-- dependencies -->
<script src="https://cdn.jsdelivr.net/npm/react@16/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-is@latest/umd/react-is.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/styled-components@5/dist/styled-components.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@microlink/mql@latest/dist/mql.min.js"></script>
<!-- Microlink SDK -->
<script src="https://cdn.jsdelivr.net/npm/@microlink/vanilla@latest/dist/microlink.min.js"></script>
```

or even better, you can combine all the things in a single request:

```html
<!-- react + styled-components + microlink -->
<script src="https://cdn.jsdelivr.net/combine/npm/react@16/umd/react.production.min.js,npm/react-dom@16/umd/react-dom.production.min.js,npm/react-is@16/umd/react-is.production.min.js,npm/styled-components@5/dist/styled-components.min.js,npm/@microlink/mql@latest/dist/mql.min.js,npm/@microlink/vanilla@5/dist/microlink.min.js"></script>
```

You can save some bytes if you use [preact](https://preactjs.com) instead of React:

```html
<!-- preact + styled-components + microlink -->
<script src="https://cdn.jsdelivr.net/combine/npm/preact@10/dist/preact.umd.min.js,npm/preact@10/hooks/dist/hooks.umd.min.js,npm/preact@10/compat/dist/compat.umd.min.js,gh/smoljs/react/react.js,npm/react-is@16/umd/react-is.production.min.js,npm/styled-components@5/dist/styled-components.min.js,npm/@microlink/mql@latest/dist/mql.min.js,npm/@microlink/vanilla@5/dist/microlink.min.js"></script>
```

After that, `microlink` will be available in the global scope.

```html
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    // Example 1
    // Replace all `a` tags for microlink cards
    microlink('a')
    // Example 2
    // Replace all elements with `link-preview` class
    // for microlink cards
    microlink('.link-previews')
    // Example 3
    // Replace all elements with `link-preview` class
    // for microlink cards, passing API specific options
    microlink('.link-previews', { size: 'large' })
  })
</script>
```

<Figcaption children='We recommend calling the `microlink` method before the DOM finishes loading.' />

The vanilla interface is pretty simliar to jQuery/Zepto: You need to provide a CSS selector as the target element you want to convert into a preview.

<Microlink url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk' size='large' />

You can pass any [Microlink API](/docs/api/getting-started/overview) query parameter as an object property, e.g., [size](/docs/sdk/parameters/size/).

```html
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('.link-previews', {
      size: 'large'
    })
  })
</script>
```

<Figcaption children='The API parameters passed there will be attached for all the links.' />

If you want to pass specific API Parameters just for some cases, you can pass them as [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

```html
<a
  src="https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk"
  class="link-preview"
  data-size="large"
  data-media='["logo", "image"]'
  data-set-data='{"title": "hello world"}'
>
</a>
```

<Figcaption children='You can pass objects, arrays, booleans or even JSON structures as data attributes.' />

Although it's shipped with default styles, you can customize it using [CSS variables](https://microlink.io/docs/sdk/getting-started/styling#css-variables) or [CSS classes](/docs/sdk/getting-started/styling#css-classes).

```html
<style>
  .microlink_card {
    font-family: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace';
    max-width: 100%;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('.link-previews', {
      size: 'large'
    })
  })
</script>
```

<Microlink url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk' style={{fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace', maxWidth: '100%'}} size='large' />
