---
title: 'embed'
--- 

Type: <Type children='<string>'/>

The embed parameter is for embedding a field directly in your HTML markup, using the properly encoding (text, images, etc).

![]({{demolinks.ycombinator.screenshot.url}})

<MultiCodeEditor languages={{
  Shell: `microlink {{demolinks.ycombinator.url}}&screenshot&embed=screenshot.url`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    '{{demolinks.ycombinator.url}}', { 
      screenshot: true, 
      embed: 'screenshot.url' 
  })
    
 console.log(status, data)
}
  `
  }} 
/>

<Figcaption children='You can use dot notation to reference a nested data field of the payload.' />

When you use `embed`, the `Content-Type` of the response will be the same than the value specified.
