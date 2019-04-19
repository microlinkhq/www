---
title: Cache
---

We have a builtin caching layer for speed up consecutive API calls with the same query parameters.

First time you query for a resource that not was previously served, we will create it, what is known as cache *MISS*.

The cache status is reflected using the response header as `x-cache-status`.

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://www.reddit.com')
  
  console.log(response.headers.['x-cache-status' ) // => 'MISS'
}
  `,
  cURL: `
curl -i https://api.microlink.io/?url=https://www.reddit.com \\
| grep -i "x-cache-status`, 
  }} 
/>

The successive requests for the resource will consume the cached version of the resource, what is known as cache *HIT*.

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://www.reddit.com')
  
  console.log(response.headers.['x-cache-status' ) // => 'HIT'
}
  `,
  cURL: `
curl -i https://api.microlink.io/?url=https://www.reddit.com \\
| grep -i "x-cache-status`, 
  }} 
/>

The period of time the resource is cached is known as *Time To Live* (TTL) and it is fixed to **1 hour**.

That means, every 1 hour the cached response copy is invalidated and will generate a new one in the next API call.

You can see the TTL value in a human friendly way as `x-cache-expired-at` in the reponse headers.

<MultiCodeEditor languages={{
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql('https://www.reddit.com')
  
  console.log(response.headers.['x-cache-expired-at' ) // => '3h 56m 35.2s'
}
  `,
  cURL: `
curl -i https://api.microlink.io/?url=https://www.reddit.com \\
| grep -i "x-cache-expired-at`, 
  }} 
/>

It's reflected as `cache-control` as well to tell browsers how much time they can serve the same resource until cache expiration.

If you want to bypass and get a fresh response, you can use [force](/docs/api/api-parameters/force) for regenerating the cache copy without waiting TTL expiration time.
