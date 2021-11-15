---
title: 'proxy'
isPro: true
--- 

Type: <Type children='<string>'/>

One of the most frustrating parts of automated web scraping is constantly dealing with IP blocks and CAPTCHAs.

The [pro](/docs/api/basics/endpoint) plan includes handle proxies, CAPTCHAs, and other scraping shield protections in a transparent way for the [Top 500](https://github.com/Kikobeats/top-sites) most popular worldwide websites.

You can [read more](/blog/proxy-capabilities) about how it works.

If that isn't enough for your use case, you can always specify your own proxy server to be used during the API requests, being a mediator between Microlink API and the target URL server destination. 

<MultiCodeEditor languages={{
  Shell: `microlink https://instagram.com/p/BvDTdWdnzkj&proxy=superproxy.cool:22225:603f60f5:***** --apiKey MY_API_KEY`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://kikobeats.com', {
    apiKey: 'MyApiToken',
    proxy: 'https://user:password@host:1337'
  })
  console.log(data)
}
  `
  }}
/>

The proxy string provided will be parsed as [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api), being the following protocols supported:

- HTTP.
- HTTPS.
- SOCKS (v4 and v5).

You can ensure proxy is properly used checking `x-fetch-mode` header on response, whose value should be prefixed by <Type children="'proxy-*'"/>.

<MultiCodeEditor languages={{
  Shell: `https://instagram.com/p/BvDTdWdnzkj&proxy=superproxy.cool:22225:603f60f5:***** --apiKey MY_API_KEY`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://instagram.com/p/BvDTdWdnzkj/', { 
      apiKey: 'MyApiToken',
      proxy: 'superproxy.cool:22225:603f60f5:*****'
    })
  
  console.log(response.headers['x-fetch-mode'])
}
  `
  }} 
/>
