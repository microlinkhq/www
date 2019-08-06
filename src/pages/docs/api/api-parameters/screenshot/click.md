---
title: 'click'
--- 

Type: `string|string[]`

Click the DOM element matching the given  [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&click=#features`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      click: '#features'
  })
  console.log(status, data)
}
  `
  }} 
/>
