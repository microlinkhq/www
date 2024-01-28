---
title: 'Microlink API: Browser automation'
date: '2020-01-26'
---

![](https://i.imgur.com/S2D1sZR.png)

A web browser is one of the most complex pieces of software, with some internal sub-systems that work together for resolving any kind of URL on the Internet, even if the content was written with HTML tables in 1992.

[Microlink API](/docs/api/getting-started/overview) is a service that provides a high-level API to control a browser instance in the simplest way possible, where the different features can be enabled or disabled using query parameters.

When we started the service, just a few things could be done. **Now, we’re supporting +30 query parameters**.

Just [url](/docs/api/parameters/url) is the only parameter that needs to be specified, but also any of the following query parameters:

## Data

> Enrich the response payload for detecting data from the target URL.

- [audio](/docs/api/parameters/audio): enables audio source detection from the target URL.
- [data](/docs/api/parameters/data): gets specific content extraction from the target URL.
- [filename](/docs/api/parameters/filename): defines the filename asset generated.
- [function](/docs/api/parameters/function): runs JavaScript code with runtime access to a headless browser.
- [iframe](/docs/api/parameters/iframe): gets, if it's possible, the embedded representation of the target URL.
- [insights](/docs/api/parameters/insights): gets lighthouse performance metrics from the target URL.
- [meta](/docs/api/parameters/meta): gets unified medata from the target URL.
- [palette](/docs/api/parameters/palette): gets color information over any image present on the response data.
- [pdf](/docs/api/parameters/pdf): gets a PDF over the target URL.
- [screenshot](/docs/api/parameters/screenshot): takes a screenshot over the target URL.
- [video](/docs/api/parameters/video): enables video source detection from the target URL.

## Browser

> Tell the browser to act in a certain way or perform some tasks.

- [adblock](/docs/api/parameters/adblock): enable/disable adblock over abusive third-party content over the browser page.
- [animations](/docs/api/parameters/animations): enable/disable CSS animations and transitions into the browser page.
- [click](/docs/api/parameters/click): clicks DOM elements matching the given CSS selectors.
- [codeScheme](/docs/api/parameters/codeScheme): sets the code syntax highlighting color theme to use.
- [colorScheme](/docs/api/parameters/colorScheme): sets preferred browser color theme preference.
- [device](/docs/api/parameters/device): emulates an specific device (viewport, user agent, dimensions, etc).
- [javascript](/docs/api/parameters/javascript): enable/disable the javascript engine on the entire browser page.
- [mediaType](/docs/api/parameters/mediaType): changes the CSS media type of the page.
- [modules](/docs/api/parameters/modules): injects `<script type="module">` into the browser page.
- [ping](/docs/api/parameters/ping): enable/disable to resolve all URLs present into the payload.
- [prerender](/docs/api/parameters/prerender): enable/disable browser navigation.
- [proxy](/docs/api/parameters/proxy): uses a proxy server as an intermediary during the requests.
- [retry](/docs/api/parameters/retry): sets the number of exponential backoff retries to perform under an unexpected browser error.
- [scripts](/docs/api/parameters/scripts): injects `<script>` into the browser page.
- [scroll](/docs/api/parameters/scroll): scrolls to the DOM element matching the given CSS selector.
- [styles](/docs/api/parameters/styles): injects `<style>` into the browser page.
- [viewport](/docs/api/parameters/viewport): establishes a set of properties related with the browser visible area.
- [waitForSelector](/docs/api/parameters/waitForSelector): waits for a CSS selector(s) to appear in page.
- [waitForTimeout](/docs/api/parameters/waitForTimeout): waits a quantity of time in milliseconds before processing the content of the browser page.
- [waitUntil](/docs/api/parameters/waitUntil): waits browser event(s) before considering navigation succeeded.

## Response

> Apply some modifications over the response data for better accommodation.

- [embed](/docs/api/parameters/embed): embed a specific response data field respecting the content type.
- [filter](/docs/api/parameters/filter): filters a list of properties from the response data for bandwidth saving.
- [force](/docs/api/parameters/force): forces a new fresh response data bypassing the cache layer.
- [headers](/docs/api/parameters/headers): customizes requests using custom HTTP headers.
- [timeout](/docs/api/parameters/timeout): defines maximum quantity of time allowed for resolving a request.
- [ttl](/docs/api/parameters/ttl): establishes the cache layer specifying the time-to-live before refresh a resource.
- [staleTtl](/docs/api/parameters/staleTtl): establishes the cache layer specifying when a resource can be considered stale, refreshing on the background.
