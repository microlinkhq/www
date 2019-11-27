---
title: 'element'
---

Type: <Type children='<string>'/>

Capture the DOM element matching the given [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://caniuse.com/#feat=http3&screenshot&element=article`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://caniuse.com/#feat=http3'. { 
      screenshot: true,
      element: 'article'
  })
  console.log(status, data)
}
  `
  }} 
/>

It will wait for the element to appear in the page and to be visible.
