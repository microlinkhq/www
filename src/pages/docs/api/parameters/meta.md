---
title: 'meta'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

It enables normalized metadata detection over the target URL.

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&meta`,
  'Node.js': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://microlink.io', { 
      meta: true
  })
  
 console.log(status, data)
}
  `
  }} 
/>

The normalized metadata is enabled by default, so you don't need to set it as `true` explicitly.

```json
{
  status: "success",
  data: {
    title: "Microlink — Browser as API",
    description: "Enter a URL, receive information. beauty link previews, take a screenshot, generate a PDF, automate web performance. Turns websites into data.",
    lang: "en",
    author: null,
    publisher: "Microlink",
    image: {
      url: "https://cdn.microlink.io/www/home.jpeg",
      type: "jpg",
      size: 35344,
      height: 734,
      width: 1226,
      size_pretty: "35.3 kB"
    },
    date: "2021-01-15T19:23:13.396Z",
    url: "https://microlink.io",
    logo: {
      url: "https://cdn.microlink.io/logo/trim.jpeg",
      type: "jpg",
      size: 8285,
      height: 500,
      width: 500,
      size_pretty: "8.29 kB"
    }
  },
  statusCode: 200,
  headers: {
    date: "Fri, 15 Jan 2021 19:23:12 GMT",
    content-type: "text/html; charset=utf-8",
    set-cookie: "__cfduid=ddac71f1d000b5f9bbb0bd6fa40c6cd311610738592; expires=Sun, 14-Feb-21 19:23:12 GMT; path=/; domain=.microlink.io; HttpOnly; SameSite=Lax; Secure",
    content-disposition: "inline; filename="index.html"",
    cache-control: "public, max-age=0, must-revalidate",
    access-control-allow-origin: "*",
    x-vercel-cache: "HIT",
    age: "2658",
    x-vercel-id: "iad1::6tlf6-1610738592626-133f697f9fb0",
    strict-transport-security: "max-age=63072000",
    cf-cache-status: "DYNAMIC",
    cf-request-id: "07a919834a00003dec0f318000000001",
    expect-ct: "max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"",
    report-to: "{"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report?s=uSmIJ8cwSAslkeRTgPQSuql5rTpPCYeCpqcO%2BlE53Vjlhwl0CF1seXdlAHBbrQEJCuBxTXVt9o7B%2BLyxqeiP62UTUoWpmDTVaW47EgM%3D"}],"group":"cf-nel","max_age":604800}",
    nel: "{"report_to":"cf-nel","max_age":604800}",
    server: "cloudflare",
    cf-ray: "6121f84ba87c3dec-EWR",
    content-encoding: "br"
  }
}
```

<Figcaption children='The payload includes `statusCode` and `headers` as part of response.' />

If you don't need any of this, you can explicitly disable the default behavior 

<MultiCodeEditor languages={{
  Shell: `microlink https://microlink.io&meta=false`,
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

This will be reflected at `x-fetch-mode` response header whose value should be <Type children="'skipped'"/>.

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
