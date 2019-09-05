---
title: 'waitUntil'
--- 

Type: `string|string[]`<br/>
Default: `['networkidle0']`<br/>
Values: `'load'|'domcontentloaded'|'networkidle0'|'networkidle2'`

It specifies a list of events until consider navigation successful:

- [`load`](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event): It considers navigation successful when the whole page, including all dependent resources such as stylesheets images, has been loaded. In certain cases, it might not happen at all.
- [`domcontentloaded`](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event): It's fired as soon as the page DOM has been loaded, without waiting for resources finish loading.
- `networkidle0`: It considers navigation successful when page has no networrk activity for half a second. This might never happen if the page is constantly loading multiple resources.
- `networkidle2`: It considers navigation successful when page has no more then 2 network requests for half a second. This is useful if page runs a long polling in the background.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&waitUntil=domcontentloaded`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. { 
      screenshot: true
      waitUntil: 'domcontentloaded'
  })
  console.log(status, data)
}
  `
  }} 
/>

Different arguments work for different pages. When neither of them work, a good solution would be to navigate with `domcontentloaded` argument and then simply wait for the needed element to appear on page.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&screenshot&waitUntil=domcontentloaded&waitFor=h1`,
  'Node.js': `const mql = require('@microlink/mql')

module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io'. {
      screenshot: true
      waitUntil: 'domcontentloaded'
      waitFor: 'h1'
  })
  console.log(status, data)
}
  `
  }} 
/>
