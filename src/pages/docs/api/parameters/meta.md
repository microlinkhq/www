---
title: 'meta'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

It enables normalized metadata detection over the target [url](/docs/api/parameters/url).

<MultiCodeEditor languages={mqlCode('https://www.youtube.com/watch?v=9P6rdqiybaw', { 
  meta: true
})} />

The normalized data fields is enabled by default, so you don't need to set it as `true` explicitly.

```json

  "status": "success",
  "data": {
    "title": "Wormholes Explained – Breaking Spacetime",
    "description": "Are wormholes real or are they just magic disguised as physics and maths? And if they are real how do they work and where can we find them?Sources and furthe...",
    "lang": "en",
    "author": null,
    "publisher": "YouTube",
    "image": {
      "url": "https://img.youtube.com/vi/9P6rdqiybaw/maxresdefault.jpg",
      "type": "jpg",
      "size": 120116,
      "height": 720,
      "width": 1280,
      "size_pretty": "120 kB"
    },
    "date": "2021-12-17T23:29:01.000Z",
    "url": "https://www.youtube.com/watch?v=9P6rdqiybaw",
    "logo": {
      "url": "https://www.youtube.com/s/desktop/21ad9f7d/img/favicon_144x144.png",
      "type": "png",
      "size": 1664,
      "height": 145,
      "width": 145,
      "size_pretty": "1.66 kB"
    }
  },
  "statusCode": 200,
  "redirects": [],
  "headers": {
    "content-type": "text/html; charset=utf-8",
    "x-content-type-options": "nosniff",
    "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
    "pragma": "no-cache",
    "expires": "Mon, 01 Jan 1990 00:00:00 GMT",
    "date": "Fri, 17 Dec 2021 23:29:01 GMT",
    "x-frame-options": "SAMEORIGIN",
    "strict-transport-security": "max-age=31536000",
    "permissions-policy": "ch-ua-arch=*, ch-ua-bitness=*, ch-ua-full-version=*, ch-ua-model=*, ch-ua-platform=*, ch-ua-platform-version=*",
    "report-to": "{'group':'ATmXEA_aXV-idIZ-e5x1JSbJUg8hfAx2dSl3lQ','max_age':2592000,'endpoints':[{'url':'https://csp.withgoogle.com/csp/report-to/encsid_ATmXEA_aXV-idIZ-e5x1JSbJUg8hfAx2dSl3lQ'}]}",
    "cross-origin-opener-policy-report-only": "same-origin; report-to='ATmXEA_aXV-idIZ-e5x1JSbJUg8hfAx2dSl3lQ'",
    "p3p": "CP='This is not a P3P policy! See http://support.google.com/accounts/answer/151657?hl=en for more info.'",
    "content-encoding": "br",
    "transfer-encoding": "chunked",
    "server": "ESF",
    "x-xss-protection": "0",
    "set-cookie": [
      "GPS=1; Domain=.youtube.com; Expires=Fri, 17-Dec-2021 23:59:01 GMT; Path=/; Secure; HttpOnly",
      "YSC=5Bj9waYfmPE; Domain=.youtube.com; Path=/; Secure; HttpOnly; SameSite=none",
      "VISITOR_INFO1_LIVE=9cYL5Jyupro; Domain=.youtube.com; Expires=Wed, 15-Jun-2022 23:29:01 GMT; Path=/; Secure; HttpOnly; SameSite=none"
    ],
    "alt-svc": "h3=':443'; ma=2592000,h3-29=':443'; ma=2592000,h3-Q050=':443'; ma=2592000,h3-Q046=':443'; ma=2592000,h3-Q043=':443'; ma=2592000,quic=':443'; ma=2592000; v='46,43'",
    "connection": "close"
  }
}
```

<Figcaption children='The payload includes `statusCode` and `headers` as part of response.' />

If you don't need any of this, you can explicitly disable the default behavior 

<MultiCodeEditor languages={mqlCode('https://www.youtube.com/watch?v=9P6rdqiybaw', { 
  meta: false
})} />

Doing that you can speed up response timing for those cases you are not interested in consuming the metadata, like [screenshot](/docs/api/parameters/screenshot) or [video](/docs/api/parameters/video).

This will be reflected at `x-fetch-mode` response header whose value should be <Type children="'skipped'"/>.

<MultiCodeEditor languages={{
  Shell: `curl -I -s -X GET https://api.microlink.io?url=https://www.youtube.com/watch?v=9P6rdqiybaw&meta=false&screenshot | grep -i "x-fetch-mode"`,
  'JavaScript': `const mql = require('@microlink/mql')
 
module.exports = async () => {
  const { status, data, response } = await mql(
    'https://www.youtube.com/watch?v=9P6rdqiybaw', { 
      meta: false,
      screenshot: true
    })
  
  console.log(response.headers['x-fetch-mode']) // => skipped
}
  `
  }} 
/>
