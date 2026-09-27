---
title: 'Product brief #4: CSS styling in SDK 2.0 and more video providers'
subtitle: 'One parameter fewer in SDK 2.0'
description: 'Microlink SDK 2.0 removed the round parameter in favor of plain CSS, and the Microlink API extended video detection to Amazon, Facebook, Instagram, Vimeo, X, YouTube, and more.'
authors:
  - kiko
date: '2018-04-11'
---

import { Microlink } from 'components/markdown/Microlink'

This sprint shipped two changes. [Microlink SDK 2.0](/docs/sdk-legacy/getting-started/overview) removed the `round` parameter from the card preview, so you styled the card with CSS instead. And the `video` property of the Microlink API learned to detect video on more providers, including Amazon, Facebook, Instagram, Vimeo, X, and YouTube.

## SDK 2.0 removed the round parameter

SDK 2.0 was a breaking release. It dropped `round` from the [API Parameters](/docs/sdk-legacy/getting-started/overview) you could pass to customize the card preview. The only thing `round` did was apply a `border-radius` around the card.

We removed it to reduce the number of configurable parameters. Since `round` only set one CSS property, `border-radius`, a stylesheet rule or a `style` prop could do the same job without a dedicated parameter.

The default card style was still there to extend. To show it, here is a link preview for the [browserless](https://browserless.js.org) project, rendered with `media='logo'` and a custom `border-radius`:

<Microlink url='https://browserless.js.org' media='logo' />

## Style the card with CSS instead

With [@microlink/react](/docs/sdk-legacy/integrations/react/), you passed your CSS as the `style` property of the `<Microlink>` component. This example sets `borderRadius: '.42857em'` on the browserless card:

**React**

```jsx
import Microlink from '@microlink/react'

<Microlink
  image='logo'
  url="https://browserless.js.org"
  style={{ borderRadius: '.42857em' }}
/>
```

Read more about the `style` prop in the [styling section](/docs/sdk-legacy/integrations/react/#styling) of the `@microlink/react` docs.

The [vanilla](/docs/sdk-legacy/integrations/vanilla/) version shipped with its own class names, so a stylesheet rule on `.microlink_card` did the same job. The `<a>` tag carried `data-media='logo'` and the `card-preview` class, and `microlink('.card-preview')` turned it into a card once `DOMContentLoaded` fired:

**Vanilla**

```js
<style>
.microlink_card {
  border-radius: .42857em;
}
</style>

<a href="https://browserless.js.org" data-media='logo' class="card-preview"></a>

<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    microlink('.card-preview')
  });
</script>
```

The [styling guide](/docs/sdk-legacy/getting-started/styling/) lists every class name the vanilla build exposes.

## The API detected video on more providers

The `video` property landed in the API in the [previous product brief](/blog/product-brief-3). In this sprint we extended it from the original providers to the most popular sites on the internet, so a URL from any of them came back with its video detected.

**Amazon**

<Microlink url='https://www.amazon.com/dp/B06XCM9LJ4' />

**Facebook**

<Microlink url='https://www.facebook.com/afcajax/videos/1686831701364171' />

**Instagram**

<Microlink url='https://instagram.com/p/BXHj-DllyYU' />

**Vimeo**

<Microlink url='https://vimeo.com/188175573' />

**X**

<Microlink url='https://x.com/verge/status/957383241714970624' />

**YouTube**

<Microlink url='https://www.youtube.com/watch?v=hwMkbaS_M_c' />

The same detection covered [a lot, lot more sites](https://rg3.github.io/youtube-dl/supportedsites.html): the full list of providers supported by youtube-dl.

To try any of them, pass the URL to the API and read the `video` field of the response, as described in the [API overview](/docs/api/getting-started/overview).
