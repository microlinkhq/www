---
title: 'proxy'
isPro: true
--- 

Type: <Type children='<string>'/>

One of the most frustrating parts of automated web scraping is constantly dealing with IP blocks and CAPTCHAs.

The [pro](/docs/api/basics/endpoint) plan includes handle proxies, CAPTCHAs, and other scraping shield protections in a transparent way for the [Top 500](https://moz.com/top500) most popular worldwide websites.

If that isn't enough for your use case, you can specify your own proxy server to be used during the API requests, being a mediator between Microlink API and the target URL server destination. 

<MultiCodeEditor languages={{
  Shell: `microlink-api https://kikobeats.com&proxy=superproxy.cool:22225:603f60f5:*****`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const ONE_HOUR_MS = 3600000
  const { status, data, response } = await mql('https://kikobeats.com', {
    proxy: 'https://user:password@host:1337'
  })
  console.log(status, data)
}
  `
  }}
/>

The proxy string provided will be parsed as [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api).

You can esure proxy is properly used checking `x-fetch-mode` header on response, whose value should be <Type children="'proxy-*'"/>.

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
