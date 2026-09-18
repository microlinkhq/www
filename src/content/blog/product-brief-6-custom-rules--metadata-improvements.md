---
title: 'Product brief #6: custom rules turn the API into a scraper'
description: 'Unlock the power of Microlink Custom Rules to transform our API into a "scraper-as-a-service.".'
authors:
  - kiko
date: '2018-06-30'
---

import { Figcaption } from 'components/markdown/Figcaption'

This brief covers four changes to [Microlink API](/docs/api/getting-started/overview): **custom rules** for building your own API response with CSS selectors, a documentation section on compression, informational timing headers on every response, and `size` and `duration` fields for images and videos.

## Custom rules define your own response

[![](/images/subDjQ1.png)](/blog/custom-rules)

<Figcaption>Custom rules build an API response shaped by what you need to extract.</Figcaption>

Microlink API extracts data from any URL. Link previews are one use case, and they are what our [SDK](/docs/sdk-legacy/getting-started/overview/) renders. Because the default response returns generic metadata, the API was hard to apply to other problems, like pulling one specific value out of a page.

**Custom rules** let you set up a custom API response. You specify what you want with CSS selectors, and you declare a type for each value (`url`, `author`, `date`, etc.), so the data never comes back with an unexpected shape.

In other words, you can use Microlink API as a scraper as a service. The [custom rules post](/blog/custom-rules) walks through a full example that extracts data from an Instagram profile.

## Compression now has its own docs section

[![](/images/Jh7GHUP.png)](/docs/api/basics/compression)

<Figcaption>Send the *Accept-Encoding* header to enable compression.</Figcaption>

The API has supported **brotli** and **gzip** from the beginning. We [added a compression section](/docs/api/basics/compression) to the documentation that shows how to turn it on with the `Accept-Encoding` request header.

Compression can **save up to 70% of the payload size**, so check that your HTTP client sends `Accept-Encoding`.

## Timing headers show where a request spends its time

```bash
curl -i -I -X GET https://api.microlink.io/?url=https%3A%2F%2Fwww.reddit.com

x-response-time : 21.518ms
x-fetch-mode    : fetch
x-fetch-time    : 618.055ms
```

<Figcaption>These headers help you optimize the response time of your API calls.</Figcaption>

Every API response now includes new informational headers. In the `reddit.com` request above, fetching the page took 618.055ms of the total, which tells you where to optimize.

- **`x-response-time`:** the total time spent processing the API call, `21.518ms` in the example.
- **`x-fetch-mode`:** how the content was fetched, either `fetch` or `prerendering`. The value follows the [prerender](/docs/api/parameters/prerender) API parameter.
- **`x-fetch-time`:** the time spent in the `x-fetch-mode` step alone, `618.055ms` in the example.

## Images and videos now include size and duration

When [Microlink API](/docs/api/getting-started/overview) detects an `image` or a `video`, the response now adds `size` and `duration`. This request asks for the video of a Vimeo URL:

```bash
curl https://api.microlink.io/?url=https://vimeo.com/188175573?v=hwMkbaS_M_c&video&filter=video
```

The API response looks like this:

```json
{
  "status": "success",
  "data": {
    "video": {
      "url": "https://gcs-vimeo.akamaized.net/exp=1530385652~acl=%2A%2F823603783.mp4%2A~hmac=5237941fe7ed6229d27eb8048360786fd0a164fb877cea8c654dbeee0b2eedd1/vimeo-prod-skyfire-std-us/01/2635/7/188175573/823603783.mp4",
      "width": 1280,
      "height": 720,
      "type": "h264",
      "size": 7228264,
      "size_pretty": "7.23 MB",
      "duration": 28.533333,
      "duration_pretty": "29s"
    }
  }
}
```

Each field also has a `_pretty` version with the same value in human-readable form: `size` is `7228264` bytes and `size_pretty` is `"7.23 MB"`, `duration` is `28.533333` seconds and `duration_pretty` is `"29s"`. Use the raw value for math and the pretty one for display.

To see both fields on your own content, replace the Vimeo link in the `curl` command above with another video URL and keep `filter=video` to return only the `video` object.
