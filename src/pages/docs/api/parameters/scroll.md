---
title: 'scroll'
---

Type: <Type children='<string>'/>

Scroll to the DOM element matching the given [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) into the browser page.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&scroll=#pricing`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. {
      screenshot: true,
      scroll: '#pricing'
  })
  console.log(status, data)
}
  `
  }}
/>
