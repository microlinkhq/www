---
title: 'ping'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

It ensures any URL returned as part of the response payload is publicly reachable, meaning the URL is accessible via GET/HEAD and HTTP status code is 2xx/3xx.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&ping`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io', { 
      ping: true
  })
  
 console.log(status, data)
}
  `
  }} 
/>

You can explicitly disable this behavior passing, however, we only recommend doing that if you are working with [meta](/docs/api/parameters/meta) in a very specific scenario where ping the URLs detected isn't a necessary thing.
