---
title: 'embed'
--- 

Type: `string`

The embed parameter is for embedding a field directly in your HTML markup, using the properly encoding (text, images, etc).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://news.ycombinator.com&screenshot&embed=screenshot.url`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://news.ycombinator.com', { 
      screenshot: true, 
      embed: 'screenshot.url' 
  })
    
 console.log(status, data)
}
  `
  }} 
/>

<Figcaption children='You can use dot notation to reference a nested data field of the payload.' />

![](https://api.microlink.io/?url=https://news.ycombinator.com&screenshot&embed=screenshot.url)

When you use `embed`, the `Content-Type` of the response will be the same than the value specified.
