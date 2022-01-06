---
title: 'element'
---

Type: <Type children='<string>'/>

Capture the DOM element matching the given [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

<MultiCodeEditor languages={{
  Shell: `microlink https://ipinfo.io&screenshot&element=#ipw_main_area`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://ipinfo.io'. { 
      screenshot: true,
      element: '#ipw_main_area'
  })
  console.log(data)
}
  `
  }} 
/>

It will wait for the element to appear in the page and to be visible.
