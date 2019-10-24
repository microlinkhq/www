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

Doing that you can speed up response timing for those cases you are not interested in consuming the metadata, like [screenshot](/docs/api/parameters/screenshot) or [video](/docs/api/parameters/video).

This will be reflected at `x-fetch-mode` response header whose value should be `skipped`.

<MultiCodeEditor languages={{
  Shell: `curl -I -s -X GET https://api.microlink.io?url=https://microlink.io&meta=false&screenshot | grep -i "x-fetch-mode"`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://instagram.com/p/BvDTdWdnzkj/', { 
      meta: false,
      screenshot: true
    })
  
  console.log(response.headers['x-fetch-mode']) // => skipped
}
  `
  }} 
/>
