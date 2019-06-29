---
title: 'proxy'
isPro: true
--- 

Type: `string`<br/>

It establishes a proxy server to be used during the API requests, being a mediator between Microlink API and the target URL server destination. 

<MultiCodeEditor languages={{
  Shell: `microlink-api url=https://kikobeats.com&proxy=superproxy.cool:22225:603f60f5:*****`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const ONE_HOUR_MS = 3600000
  const { status, data, response } = await mql('https://kikobeats.com', {
    proxy: 'superproxy.cool:22225:603f60f5:*****'
  })
  console.log(status, data)
}
  `
  }} 
/>

The proxy server provided needs follow the schema `host:port:username:password`.
