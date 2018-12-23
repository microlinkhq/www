import React from 'react'
import components, { PreCode } from 'components/markdown'
import md from 'markdown-in-js'

import postLayout from 'layouts/post'
import Microlink from '@microlink/react'

export const frontmatter = {
  title: 'Product Brief #4: SDK 2.0 & more video providers',
  slug: 'sdk-2-0-more-video-providers',
  date: '11 April 2018'
}

export default postLayout(frontmatter)(
  md(components)`
## Microlink SDK

### Release 2.0

We are happy to introduce the [SDK 2.0](https://docs.microlink.io/sdk), the easiest way to add link previews in your website without effort.

The version 2.0 introduce a breaking change: It removes the \`round\` property from the [API Parameters](https://docs.microlink.io/sdk/getting-started/api-parameters) that you can pass for customize the card preview.

The property \`round\` was related with apply a \`border-radius\` around your preview card.

We decide make this little change in order the reduce the number of configurable [API Parameters](https://docs.microlink.io/sdk/getting-started/api-parameters).

But you can still extend the default style using CSS.

For example, let's create a link preview for [browserless](https://browserless.js.org) project using custom \`border-radius\` style.

${(
    <Microlink
      url='https://browserless.js.org'
      style={{ borderRadius: '.42857em' }}
      image='logo'
    />
  )}

**React**

Using [@microlink/react](https://docs.microlink.io/sdk/getting-started/react/) just pass your custom CSS as \`style\` property:

${(
    <PreCode>{`import Microlink from '@microlink/react'

<Microlink
  iamge='logo'
  url="https://browserless.js.org"
  style={{ borderRadius: '.42857em' }}
/>`}</PreCode>
  )}

Read more about [styling](https://docs.microlink.io/sdk/getting-started/react/#styling) in documentation.

**Vanilla**

The [vanilla](https://docs.microlink.io/sdk/getting-started/vanilla/) version can apply the custom style using the class names shipped with the component:

${(
    <PreCode>{`<style>
.microlink_card {
  border-radius: .42857em;
}
</style>

<a href="https://browserless.js.org" data-image='logo' class="card-preview"></a>

<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    microlink('.card-preview')
  });
</script>`}</PreCode>
  )}

Read more about [styling](https://docs.microlink.io/sdk/getting-started/vanilla/#styling) at documentation.

## Microlink API

### Video detection

In this product sprint we focused on improving our \`video\` property added into our [API](https://docs.microlink.io/api/#introduction) in the [previous product brief](/blog/video-support-prerendering-sdk-features).

We extended the original idea, adding support for detecting more video providers. The most popular internet sites are covered, such as

**Amazon**

${<Microlink url='https://www.amazon.com/dp/B06XCM9LJ4' />}

**Facebook**

${<Microlink url='https://www.facebook.com/afcajax/videos/1686831701364171' />}

**Instagram**

${<Microlink url='https://www.instagram.com/p/BXHj-DllyYU' />}

**Twitter**

${<Microlink url='https://twitter.com/verge/status/957383241714970624' />}

**Vimeo**

${<Microlink url='https://vimeo.com/188175573' />}

**YouTube**

${<Microlink url='https://www.youtube.com/watch?v=hwMkbaS_M_c' />}

and [a lot, lot more](https://rg3.github.io/youtube-dl/supportedsites.html).

# Come chat with us!

![](https://i.imgur.com/wDY14fM.png)

${(
    <div
      style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }}
    >
      <iframe
        frameBorder='0'
        target='_parent'
        src='https://chat.microlink.io/iframe/dialog'
        style={{
          width: '250px',
          height: '250px'
        }}
      />
    </div>
  )}

All of these improvements or features are **community driven**: We listen to your feedback and act accordingly.

Whether you are are building a product and you need fancy previews, you’re an indie hacker or simply you like frontend stuff, come [chat](https://chat.microlink.io/) with us 🙂.

`
)
