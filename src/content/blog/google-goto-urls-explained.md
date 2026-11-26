---
title: 'Google Goto URLs, explained'
subtitle: 'The real URLs hidden behind Google redirects'
description: 'A Google goto URL hides the real URL of a search result behind a Google redirect. Sometimes Google makes you wait N seconds before it reveals the destination: Microlink waits short holds out, answers longer ones with a 503 and Retry-After, and finishes the wait on your retry. Microlink Search never returns one.'
authors:
  - kiko
date: '2026-11-26'
---

import { GotoDiagram, RetryDiagram } from 'components/pages/blog/google-goto-urls-explained'

Some customers pass a Google result link as the [url](/docs/api/parameters/url) query parameter to the Microlink API:

```bash
curl -G https://api.microlink.io --data-urlencode 'url=https://www.google.com/goto?url=CAES…'
```

Most of those requests come back with the page behind the link on the first request. The rest are links Google holds for longer than the request can wait, and they now answer HTTP `503` with a `Retry-After` header and their own error code, `EGOOGLELINK`, instead of `EFATAL`.

**TL;DR**

- A Google result link is resolved to its destination before any other work.
- When Google holds a link longer than the request can wait, the API answers HTTP `503` with a `Retry-After` header and the error code [EGOOGLELINK](/docs/api/basics/error-codes#egooglelink).
- Microlink remembers Google's wait, so a retry after `Retry-After` continues it instead of starting a new one.
- Our [official SDK](https://www.npmjs.com/package/microlink.io) already retries after `Retry-After`. Calling the API directly, retry after `Retry-After` on every `503`.
- [Microlink Search](/docs/guides/search) never returns a Google link, so there is nothing to resolve.

## What are Google goto URLs

A Google goto URL is an intermediate Google URL that holds the real URL of a search result.

![](/images/google-search-results.png)

Google result pages hand out these `google.com/goto` links instead of the page they found.

## How a Google goto URL is resolved

Google resolves the link when someone opens it.

A goto URL as Google hands it out looks like this:

```text
https://www.google.com/goto?gsessionid=Q8vm…&pdlt=1&url=CAES…
```

- **`https://www.google.com/goto`:** Google's redirect endpoint.
- **`gsessionid`:** the Google search session the link came from. Links from the same results page share it.
- **`pdlt`:** a Google parameter it doesn't document.
- **`url=CAES…`:** the token that holds the real URL. Only Google can turn it back into the destination.

Opening the link asks Google for the destination, and Google answers in one of two ways:

<GotoDiagram />

- **Redirect:** an HTTP `302` to the destination. Most links answer this way, right away.
- **Hold:** an HTTP `200` "Verifying your request" page with a wait in seconds and a second goto link. The second link answers `400` before the wait is over and a `302` to the destination after it.

The IP address plays no part in it. The second link answers the same from any IP address, and in our tests opening links from a different IP address got the same waits.

Google can also redirect to a page of its own, such as a consent or `/sorry` page, instead of the destination.

## How Microlink resolves a goto URL

Microlink must always return the destination URL.

When Google holds a link, it makes us wait N seconds before it tells us where it goes. In our tests, N grew with each link opened from the same results page, from a few seconds to over a minute.

Microlink opens the goto link, stores the second link Google gives with the wait, and then it depends on N:

- **N fits in the time the request can wait** (a few seconds): Microlink waits N, opens the second link, and answers with the destination in the same request.
- **N is longer:** the API answers `503` with `Retry-After: N`, at most 120 seconds, and the retry usually finishes the job. A wait over 120 seconds can answer `503` again, and you retry the same way.

The retry workflow:

<RetryDiagram />

Our [official SDK](https://www.npmjs.com/package/microlink.io) runs this workflow for you: on a `503` it waits for `Retry-After` and sends the same request again, up to two times.

```js
import createClient from 'microlink.io'

const microlink = createClient({ apiKey: process.env.MICROLINK_API_KEY })

const url = 'https://www.google.com/goto?url=CAES…'

const data = await microlink.metadata(url)

console.log(data.url) // the destination ✨
```

## Microlink Search

When using [Microlink Search](/docs/guides/search), results are always the real page, never a goto URL.

```js
const page = await microlink.search('node.js streams tutorial', { type: 'videos' })

for (const result of page.results) {
  console.log(result.url) // https://www.youtube.com/watch?v=…
}
```
