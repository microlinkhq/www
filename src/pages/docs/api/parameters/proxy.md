---
title: 'proxy'
isPro: true
--- 

Type: <Type children='<string>'/>

It sets the proxy HTTP server for resolving the sub-requests over the target [url](/docs/api/parameters/url).

<MultiCodeEditor languages={mqlCode('https://kikobeats.com', { apiKey: 'MyApiToken', proxy: 'https://user:password@host:1337' })} />

One of the most frustrating parts of automated web scraping is constantly dealing with IP blocks and CAPTCHAs.

The [pro](/docs/api/basics/endpoint) plan includes handle proxies, CAPTCHAs, and other scraping shield protections in a transparent way for the [Top 500](https://github.com/Kikobeats/top-sites) most popular worldwide websites.

You can [read more](/blog/proxy-capabilities) about how it works.

If that isn't enough for your use case, you can always specify your own proxy server to be used during the API requests, being a mediator between Microlink API and the target URL server destination. 

The proxy string provided will be parsed as [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api), being the following protocols supported:

- HTTP.
- HTTPS.
- SOCKS (v4 and v5).

You can ensure proxy is properly used checking `x-fetch-mode` header on response, whose value should be prefixed by <Type children="'proxy-*'"/>.

<MultiCodeEditor languages={mqlCode('https://kikobeats.com', { apiKey: 'MyApiToken', proxy: 'superproxy.cool:22225:603f60f5:*****' })} />
