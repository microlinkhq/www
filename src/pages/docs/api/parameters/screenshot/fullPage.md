---
title: 'fullPage'
---

Type: <Type children='<boolean>'/><br/>
Default: <Type children='false'/>

It takes a full scrollable page [screenshot](/docs/api/parameters/screenshot) over the target [url](/docs/api/parameters/url).

<Image maxWidth='40%' src="https://cdn.microlink.io/docs/recipes.png" />

<MultiCodeEditor languages={mqlCode('https://microlink.io/recipes', { screenshot: { fullPage: true } })} />

The response time could be slower since the browser has to wait more elements before taking the screenshot.

