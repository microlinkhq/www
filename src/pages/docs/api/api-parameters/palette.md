---
title: 'palette'
--- 

Type: `boolean` <br/>
Default: `false`

Enabling it will return you more information related with color schema of the images detected

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io', { 
      palette: true 
  })
    
  console.log(status, data)
}
  `,
  cURL: `curl https://api.microlink.io?url=https://microlink.io&palette=true`, 
  }} 
/>

The following fields will be added per each image detected in the payload:

- `palette`: A collection of hexadecimal colors from most dominant color to least.
- `background_color`: The best color with good [WCAG contrast ratio](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) that can be used as background color representation of the image.
- `color`: The best color overlayed over `background_color`.
- `alternative_color`: It will be the second best color. If there are only two colors parsed, it will default to `color`.
