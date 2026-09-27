---
title: 'Automate a headless browser with +30 query parameters'
description: 'Control a headless browser via API. Use 30+ parameters to automate screenshots, PDFs, metadata extraction, and browser actions without managing infrastructure.'
authors:
  - kiko
date: '2020-01-26'
---

![](/images/S2D1sZR.png)

[Microlink API](/docs/api/getting-started/overview) now supports **+30 query parameters** for controlling a browser instance. Each feature is enabled or disabled with a query parameter, so you can automate a real browser with a single URL instead of running one yourself.

**TL;DR**

- Microlink API supports **+30 query parameters** for controlling a browser instance, each one enabling or disabling a feature.
- `url` is the only required parameter.
- Data parameters such as `screenshot`, `pdf`, and `meta` enrich the response with data detected from the target URL.
- Browser parameters such as `click`, `scroll`, and `waitForSelector` make the browser act on the page before you get the result.
- Response parameters such as `filter`, `ttl`, and `staleTtl` shape what comes back.

A web browser is one of the most complex pieces of software you use. Its internal sub-systems work together to resolve any kind of URL on the Internet, even if the content was written with HTML tables in 1992. Microlink API puts a high-level API in front of it. When we started the service, only a few things could be done this way.

[url](/docs/api/parameters/url) is the only required parameter. You can combine it with any of the parameters below, grouped by what they change: the data in the response, the way the browser behaves, and the shape of the response itself.

## Data parameters detect content from the target URL

These parameters enrich the response payload with data detected from the target URL, from `audio` and `video` sources to a `screenshot` or `pdf` of the page.

- [audio](/docs/api/parameters/audio): enables audio source detection from the target URL.
- [data](/docs/api/parameters/data): gets specific content extraction from the target URL.
- [filename](/docs/api/parameters/filename): defines the filename of the generated asset.
- [function](/docs/api/parameters/function): runs JavaScript code with runtime access to a headless browser.
- [iframe](/docs/api/parameters/iframe): gets, when possible, the embedded representation of the target URL.
- [insights](/docs/api/parameters/insights): gets Lighthouse performance metrics from the target URL.
- [meta](/docs/api/parameters/meta): gets unified metadata from the target URL.
- [palette](/docs/api/parameters/palette): gets color information for any image present in the response data.
- [pdf](/docs/api/parameters/pdf): gets a PDF of the target URL.
- [screenshot](/docs/api/parameters/screenshot): takes a screenshot of the target URL.
- [video](/docs/api/parameters/video): enables video source detection from the target URL.

## Browser parameters tell the page how to load and act

These parameters tell the browser to act in a certain way or perform tasks on the page, such as `click`, `scroll`, or `waitForSelector`, before you get the result.

- [adblock](/docs/api/parameters/adblock): enables or disables blocking of abusive third-party content on the browser page.
- [animations](/docs/api/parameters/animations): enables or disables CSS animations and transitions on the browser page.
- [click](/docs/api/parameters/click): clicks DOM elements matching the given CSS selectors.
- [colorScheme](/docs/api/parameters/colorScheme): sets the browser’s preferred color theme.
- [device](/docs/api/parameters/device): emulates a specific device (viewport, user agent, dimensions, etc).
- [javascript](/docs/api/parameters/javascript): enables or disables the JavaScript engine on the entire browser page.
- [mediaType](/docs/api/parameters/mediaType): changes the CSS media type of the page.
- [modules](/docs/api/parameters/modules): injects `<script type="module">` into the browser page.
- [ping](/docs/api/parameters/ping): enables or disables resolving every URL present in the payload.
- [prerender](/docs/api/parameters/prerender): enables or disables browser navigation.
- [proxy](/docs/api/parameters/proxy): uses a proxy server as an intermediary during the requests.
- [retry](/docs/api/parameters/retry): sets the number of exponential backoff retries to perform after an unexpected browser error.
- [scripts](/docs/api/parameters/scripts): injects `<script>` into the browser page.
- [scroll](/docs/api/parameters/scroll): scrolls to the DOM element matching the given CSS selector.
- [styles](/docs/api/parameters/styles): injects `<style>` into the browser page.
- [viewport](/docs/api/parameters/viewport): sets the properties of the browser’s visible area.
- [waitForSelector](/docs/api/parameters/waitForSelector): waits for one or more CSS selectors to appear in the page.
- [waitForTimeout](/docs/api/parameters/waitForTimeout): waits a quantity of time in milliseconds before processing the content of the browser page.
- [waitUntil](/docs/api/parameters/waitUntil): waits for one or more browser events before considering navigation succeeded.

## Response parameters shape what comes back

These parameters modify the response data so it fits how you consume it, from `filter` for bandwidth to `ttl` and `staleTtl` for the cache layer.

- [embed](/docs/api/parameters/embed): embeds a specific response data field, respecting its content type.
- [filter](/docs/api/parameters/filter): filters a list of properties from the response data to save bandwidth.
- [force](/docs/api/parameters/force): forces a fresh response, bypassing the cache layer.
- [headers](/docs/api/parameters/headers): customizes requests using custom HTTP headers.
- [timeout](/docs/api/parameters/timeout): defines the maximum time allowed to resolve a request.
- [ttl](/docs/api/parameters/ttl): sets the cache time-to-live before a resource is refreshed.
- [staleTtl](/docs/api/parameters/staleTtl): sets when a cached resource is considered stale and refreshed in the background.

Start with `url`, add `screenshot`, `pdf`, or `meta` for the output you need, then layer browser parameters like `waitForSelector` or `click` on top.
