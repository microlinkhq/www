---
title: 'viewport'
---

Type: <Type children='<object>'/>

It establishes a set of properties related with the browser visible area and device capabilities.

<MultiCodeEditor languages={{
  Shell: `microlink-api {{demolinks.wikipedia.url}}&meta=false&screenshot&viewport.width=640&viewport.height=400&viewport.deviceScaleFactor=2&embed=screenshot.url&viewport.isMobile`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{demolinks.wikipedia.url}}'. {
      meta: false,
      screenshot: true,
      viewport: {
        width: 640,
        height: 400,
        deviceScaleFactor: 2,
        isMobile: true
      }
  })
  console.log(status, data)
}
  `
  }} 
/>


<Figcaption>Establishing a custom viewport.</Figcaption>

The default viewport values are provided by the default [device](/docs/api/parameters/device). The viewport should be defined by:

- `width` <Type children='<number>'/>: The page width in pixels
- `height` <Type children='<number>'/>: The page height in pixels.
- `deviceScaleFactor` <Type children='<number>'/>: Specify device scale factor.
- `isMobile` <Type><Type children='<boolean>'/></Type>: Whether the meta viewport tag is taken into account.
- `hasTouch` <Type><Type children='<boolean>'/></Type>: Specifies if viewport supports touch events.
- `isLandscape` <Type><Type children='<boolean>'/></Type>: Specifies if viewport is in landscape mode.

If you just provide an incomplete set of viewport values, they will be merged with the default values

<MultiCodeEditor languages={{
  Shell: `microlink-api {{demolinks.wikipedia.url}}&meta=false&screenshot&viewport.deviceScaleFactor=0.5&embed=screenshot.url`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{demolinks.wikipedia.url}}'. {
      meta: false,
      screenshot: true,
      viewport: {
        // the rest of value ares are taken
        // from the default \`device\`
        deviceScaleFactor: 0.5
      }
  })
  console.log(status, data)
}
  `
  }} 
/>

<Figcaption>Using the default viewport with lower device scale factor.</Figcaption>

See [device](/docs/api/parameters/device) for using viewport presets.
