---
title: Cache
---

Microlink API offers a builtin caching layer for speed up consecutive API calls based on query parameters.

The first time you query for a resource that not was previously served, it will be created, what is known as cache **MISS**.

The cache status is reflected using the response header as `cf-cache-status`.

<MultiCodeEditor languages={{
  Shell: `curl -I -s -X GET https://api.microlink.io?url=https://www.reddit.com | grep -i "cf-cache-status"`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://www.reddit.com')
  
  console.log(response.headers.['cf-cache-status' ) // => 'MISS'
}
  `
  }} 
/>

The successive requests for the resource will consume the cached version of the resource, what is known as cache **HIT**.

<MultiCodeEditor languages={{
  Shell: `curl -I -s -X GET https://api.microlink.io?url=https://www.reddit.com | grep -i "cf-cache-status"`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://www.reddit.com')
  
  console.log(response.headers.['cf-cache-status' ) // => 'HIT'
}
  `
  }} 
/>

The period of time the resource is cached is known as **Time To Live** ([ttl](/docs/api/parameters/ttl)) and it specifies the maximum quantity of time the resource will served from cache. 

You can see the remain time before [ttl](/docs/api/parameters/ttl) expiration as `x-cache-expired-at` in the reponse headers.

<MultiCodeEditor languages={{
  Shell: `curl -I -s -X GET https://api.microlink.io?url=https://www.reddit.com | grep -i "x-cache-expired-at"`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://www.reddit.com')
  
  console.log(response.headers.['x-cache-expired-at' ) // => '3h 56m 35.2s'
}
  `
  }} 
/>

Also, [ttl](/docs/api/parameters/ttl) is properly reflected as `cache-control` response header to tell browsers how much time they can serve the same resource until refresh it.

If you want to bypass and get a fresh response, you can use [force](/docs/api/parameters/force) for regenerating the cache copy without waiting [ttl](/docs/api/parameters/ttl) expiration time.
