---
title: 'viewport'
---

Type: `object`<br/>

It establishes a set of properties related with the visible area and device capabilities.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://eosrei.github.io/emojione-color-font/full-demo.html&screenshot&width=800&height=600`,
  'Node.js': `const mql = require('@microlink/mql')

module.exports = async () => {
  const { status, data, response } = await mql(
    'https://eosrei.github.io/emojione-color-font/full-demo.html'. {
      screenshot: true,
      viewport: {
        width: 800,
        height: 600
      }
  })
  console.log(status, data)
}
  `
  }}
/>

The viewport can be defined by:

- `width` <Type><number></Type>: The page width in pixels
- `height` <Type><number></Type>: The page height in pixels.
- `deviceScaleFactor` <Type><number></Type>: Specify device scale factor. Defaults to <Type>1</Type>.
- `isMobile` <Type><boolean></Type>: Whether the meta viewport tag is taken into account. Defaults to <Type>false</Type>.
- `hasTouch` <Type><boolean></Type>: Specifies if viewport supports touch events. Defaults to <Type>false</Type>.
- `isLandscape` <Type><boolean></Type>: Specifies if viewport is in landscape mode. Defaults to <Type>false</Type>.

See [device](/docs/api/parameters/screenshot/device) for using viewport presets.
