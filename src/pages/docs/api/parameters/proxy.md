---
title: 'proxy'
isPro: true
--- 

Type: <Type children='<string>'/>

Establishes a proxy server to be used during the API requests, being a mediator between Microlink API and the target URL server destination. 

<MultiCodeEditor languages={{
  Shell: `microlink-api https://kikobeats.com&proxy=superproxy.cool:22225:603f60f5:*****`,
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

You can esure proxy bypass is properly done checking `x-fetch-mode` header on response, whose value should be <Type children="'fetch-proxy'"/>.

<MultiCodeEditor languages={{
  Shell: `curl -I -s -X GET https://api.microlink.io?url=https://instagram.com/p/BvDTdWdnzkj&apiKey=MyApiToken&proxy=superproxy.cool:22225:603f60f5:***** | grep -i "x-fetch-mode"`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://instagram.com/p/BvDTdWdnzkj/', { 
      apiKey: 'MyApiToken',
      proxy: 'superproxy.cool:22225:603f60f5:*****'
    })
  
  console.log(response.headers['x-fetch-mode']) // => fetch-proxy
}
  `
  }} 
/>
