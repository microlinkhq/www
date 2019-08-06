---
title: 'scrollTo'
---

Type: `string`

Scroll to the DOM element matching the given [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&scrollTo=#pricing`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true,
      scrollTo: '#pricing'
  })
  console.log(status, data)
}
  `
  }} 
/>
