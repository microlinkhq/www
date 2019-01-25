import React from 'react'
import components, { PreCode, Paraph, Strong } from 'components/markdown'
import { Microlink } from 'components/patterns'
import { Box } from 'components/elements'
import md from 'markdown-in-js'
import postLayout from 'layouts/post'

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

${<Microlink url='https://browserless.js.org' image='logo' />}

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

${(
  <Box mt={5} mb={5}>
    <Paraph mb={3} style={{ textAlign: 'center' }}>
      <Strong>Amazon</Strong>
    </Paraph>
    <Microlink url='https://www.amazon.com/dp/B06XCM9LJ4' />
  </Box>
)}

  ${(
    <Box mb={5}>
      <Paraph mb={3} style={{ textAlign: 'center' }}>
        <Strong>Facebook</Strong>
      </Paraph>
      <Microlink url='https://www.facebook.com/afcajax/videos/1686831701364171' />
    </Box>
  )}

  ${(
    <Box mb={5}>
      <Paraph mb={3} style={{ textAlign: 'center' }}>
        <Strong>Instagram</Strong>
      </Paraph>
      <Microlink url='https://www.instagram.com/p/BXHj-DllyYU' />
    </Box>
  )}

  ${(
    <Box mb={5}>
      <Paraph mb={3} style={{ textAlign: 'center' }}>
        <Strong>Twitter</Strong>
      </Paraph>
      <Microlink url='https://twitter.com/verge/status/957383241714970624' />
    </Box>
  )}

  ${(
    <Box mb={5}>
      <Paraph mb={3} style={{ textAlign: 'center' }}>
        <Strong>Vimeo</Strong>
      </Paraph>
      <Microlink url='https://vimeo.com/188175573' />
    </Box>
  )}

  ${(
    <Box mb={5}>
      <Paraph mb={3} style={{ textAlign: 'center' }}>
        <Strong>YouTube</Strong>
      </Paraph>
      <Microlink url='https://www.youtube.com/watch?v=hwMkbaS_M_c' />
    </Box>
  )}

and [a lot, lot more](https://rg3.github.io/youtube-dl/supportedsites.html).
`
)
