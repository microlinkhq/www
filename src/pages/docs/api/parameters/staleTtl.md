---
title: 'staleTtl'
isPro: true
--- 

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/></TypeContainer><br/>
Default: <Type children="undefined"/>

When it's provided, it enables the ability to serve a stale response while a background refresh cache copy is being generated.

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&ttl=1d&staleTtl=1h`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://microlink.io', {
    ttl: '1d',
    staleTtl: '1h',
  })
  console.log(status, data)
}
  `
  }} 
/>

The value provided can't be higher than [ttl](/docs/api/parameters/ttl).

A good pattern there is to sets `staleTtl=0` to always revalidate in the background, maximizing the cache usage serving the last cache copy generated while the revalidation will refresh it.
