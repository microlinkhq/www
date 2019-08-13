---
title: 'meta'
--- 

Type: `boolean`<br/>
default: `true`

When is `false`, it disabled the metadata extraction behavior.

<MultiCodeEditor languages={{
  Shell: `microlink-api https://microlink.io&meta=false`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io', { 
      meta: false
  })
  
 console.log(status, data)
}
  `
  }} 
/>

Doing that you can speed up response timing for those cases you are not interested in consuming the metadata, like [screenshot](/docs/api/api-parameters/screenshot).
