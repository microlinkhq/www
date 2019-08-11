---
title: 'lang'
--- 

Type: `string`<br/>
default: `en-US`

It setup the preferred language for fetching the content from the target [url](/docs/api/api-parameters/url).

<MultiCodeEditor languages={{
  Shell: `microlink-api https://twitter.com&lang=en-ES`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://twitter.com', { 
      lang: 'en-ES'
  })
  
 console.log(status, data)
}
  `
  }} 
/>

It's equivalent to [Accept-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language).
