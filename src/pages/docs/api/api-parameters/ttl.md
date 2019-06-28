---
title: 'ttl'
--- 

> This feature is only for pro plans.

Type: `number`<br/>
Default: `3600000`<br/>

It establishes the maximum quantity of time a resource served from cache layer is considered as valid.

The value provided need to be at least **1 hour** and not higher than **24 hours**, specified in milliseconds.

The idea behind exposing this API parameter is to optimize better how much time the target URL can be cached:

- If you are targetting an URL that changes very often and response time is not critical for you, a small value will work better.
- If you are targetting an URL that doesn't change too much or you want to maximize cache hits, getting faster response time, a higher value works better.

The value provided will reflected as `x-cache-ttl` as part of the response headers

<MultiCodeEditor languages={{
  Shell: `microlink-api https://www.twitter.com/microlinkhq | grep -i "x-cache-ttl"`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://www.reddit.com')
  
  console.log(response.headers.['x-cache-ttl' ) // => '3h 56m 35.2s'
}
  `
  }} 
/>
