---
title: 'proxy'
isPro: true
---

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>

It sets the proxy HTTP server for resolving any internal sub-requests over the target [url](/docs/api/parameters/url).


We provide an **automatic proxy** included for any [pro](/docs/api/basics/endpoint) plans to handle IP blocking, CAPTCHAs, banners, and any other scraping shield for the [Top 500](/blog/proxy-capabilities) most popular worldwide websites.

Additionally, you can provide your own proxy server:

<MultiCodeEditor languages={mqlCode('https://kikobeats.com', { apiKey: 'MyApiToken', proxy: 'http://myproxy:603f60f5@superproxy.cool:8001' })} />

You can also specify a different proxy server to be used per protocol:

<MultiCodeEditor languages={mqlCode('https://kikobeats.com', { apiKey: 'MyApiToken', proxy: { http: 'http://myproxy:603f60f5@superproxy.cool:8001', https: 'http://myproxy:603f60f5@superproxy.cool:8002'} })} />

The proxy string provided will be parsed as [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api), being the following protocols supported:

- HTTP.
- HTTPS.
- SOCKS (v4 and v5).

You can ensure proxy is properly used checking `x-fetch-mode` header on response, whose value should be prefixed by <Type children="'proxy-*'"/>.

```bash{5}
HTTP/2 200
content-type: application/json; charset=utf-8
x-response-time: 1.7s
x-pricing-plan: pro
x-fetch-mode: prerender-proxy
x-cache-ttl: 86400000
x-request-id: iad:2eb66538-0a16-4c56-b613-511d99507c9f
x-cache-status: BYPASS
cache-control: public, must-revalidate, max-age=0
x-fetch-time: 0ms
```
