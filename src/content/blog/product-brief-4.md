---
title: 'Product Brief #4: SDK v2 & More Video Providers'
description: 'Explore Microlink SDK v2.0 with improved styling flexibility and expanded video detection for major platforms like YouTube, Facebook, and Instagram.'
authors:
  - kiko
date: '2018-04-11'
---

import { Microlink } from 'components/markdown/Microlink'

## Microlink SDK

### Release 2.0

We are happy to introduce the [SDK 2.0](/docs/sdk/getting-started/overview), the easiest way to add link previews in your website without effort.

The version 2.0 introduce a breaking change: It removes the `round` property from the [API Parameters](/docs/sdk/getting-started/overview) that you can pass for customize the card preview.

The property `round` was related with apply a `border-radius` around your preview card.

We decide make this little change in order the reduce the number of configurable [API Parameters](/docs/sdk/getting-started/overview).

But you can still extend the default style using CSS.

For example, let's create a link preview for [browserless](https://browserless.js.org) project using custom `border-radius` style.

<Microlink url='https://browserless.js.org' media='logo' />

**React**

Using [@microlink/react](/docs/sdk/integrations/react/) just pass your custom CSS as `style` property:

```jsx
import Microlink from '@microlink/react'

<Microlink
  image='logo'
  url="https://browserless.js.org"
  style={{ borderRadius: '.42857em' }}
/>
```

Read more about [styling](/docs/sdk/integrations/react/#styling) in documentation.

**Vanilla**

The [vanilla](/docs/sdk/getting-started/overview/getting-started/vanilla/) version can apply the custom style using the class names shipped with the component:

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

Read more about [styling](/docs/sdk/getting-started/overview/getting-started/vanilla/#styling) at documentation.

## Microlink API

### Video detection

In this product sprint we focused on improving our `video` property added into our [API](/docs/api/getting-started/overview) in the [previous product brief](/blog/product-brief-3).

We extended the original idea, adding support for detecting more video providers. The most popular internet sites are covered, such as

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

and [a lot, lot more](https://rg3.github.io/youtube-dl/supportedsites.html).
