---
title: 'Resolving Google result links'
subtitle: 'What a 503 with EGOOGLELINK means, and how to handle it'
description: 'Google now hands out goto links in its result pages instead of the destination. Microlink resolves them before doing anything else. When Google holds a link, the API answers a 503 with Retry-After and the new EGOOGLELINK error code, and a retry after that wait usually comes back with the destination.'
authors:
  - kiko
date: '2026-11-26'
---

Google result pages no longer always link to the page they found. More and more results, video results above all, point to a Google link instead:

```
https://www.google.com/goto?url=CAES…
```

Pass one of those to the Microlink API as the [url](/docs/api/parameters/url) and you get the destination's metadata, screenshot or PDF, not Google's. Most of the time that takes no extra effort: over a day of traffic, 91% of the Google links sent to the API came back with their destination on the first request.

This post covers the other 9%: what Google does with them and what the API now answers.

**TL;DR**

- A Google result link is resolved to its destination before any other work.
- When Google holds a link, the API answers HTTP `503` with a `Retry-After` header and the error code [EGOOGLELINK](/docs/api/basics/error-codes#egooglelink).
- Microlink remembers Google's wait, so a retry after `Retry-After` continues it instead of starting a new one.
- [microlink.io](https://www.npmjs.com/package/microlink.io) already retries after `Retry-After`. Calling the API directly, add that one retry.
- [Microlink search](/docs/guides/search) never returns a Google link, so there is nothing to resolve.

## How a Google link is resolved

Microlink asks Google where the link goes.

A fresh link usually answers with a redirect to the destination right away. The API asks Google directly and asks a second resolver at the same time, and takes the first destination either one finds. A redirect to another Google page, such as a consent or `/sorry` page, never counts as a destination.

Once found, the destination is remembered for an hour, so asking for the same link again doesn't ask Google again.

## Sometimes Google holds the link

Google answers some links with a wait instead of a destination.

That answer is a "Verifying your request" page with a wait in seconds and a second link. The second link refuses to redirect before the wait is over and redirects once it is, from any IP address.

In our tests the wait followed the results page the link came from. The first link opened from a page usually resolved at once, and each further link from the same page waited longer: a few seconds, then tens of seconds, sometimes over a minute. Spacing the requests out didn't shorten it.

When the wait is a few seconds, Microlink waits it out and answers with the destination in the same request. For a longer wait, the API answers with how long to wait instead of holding your request for all of it.

## What the API answers

A held link answers HTTP `503` with the error code `EGOOGLELINK`.

```
HTTP/2 503
retry-after: 34
cache-control: private, no-cache, no-store, max-age=0
```

```json
{
  "status": "fail",
  "code": "EGOOGLELINK",
  "more": "https://microlink.io/egooglelink",
  "message": "Google is holding `https://www.google.com/goto?url=CAES…` for 34s before it redirects. Retry after that."
}
```

`Retry-After` is the wait Google gave, in seconds, at most 120. A longer wait may answer `503` again after that, and you retry the same way. The response is never cached, so a retry always reaches the API.

Microlink remembers Google's wait for an hour. A retry after `Retry-After` asks Google only for the link that is now ready, so the wait doesn't start over and the retry usually answers with the destination. Retrying earlier is safe too: if what's left of the wait is short, Microlink waits it out, otherwise you get a new `503` with the seconds left.

A link that neither Google nor the second resolver could resolve, with no wait given, answers HTTP `500` with the same code and a `report` link to send us the request. That one is worth telling us about.

Until now, both cases answered `EFATAL`, the code for an error we didn't expect. A held link is expected, so it has a code of its own and no bug report link.

## Handle it with one retry

Retry once after `Retry-After`.

If you call the API with [microlink.io](https://www.npmjs.com/package/microlink.io), our Node.js client, that is already done for you: on a `503` it waits for `Retry-After` and asks again, up to two times. If the link is still held after that, it throws the `503`, and you can retry it later.

```js
import createClient from 'microlink.io'

const microlink = createClient({ apiKey: process.env.MICROLINK_API_KEY })

const data = await microlink.metadata('https://www.google.com/goto?url=CAES…')
console.log(data.url) // the destination
```

If you call the API directly, read `Retry-After` on a `503` and send the same request again after that many seconds.

Two more things help:

- **Leave room in the timeout.** A short [timeout](/docs/api/parameters/timeout) ends requests that were still resolving. A longer one gives Microlink more time to find the destination within the same request, although it can't shorten Google's wait.
- **Keep the destination.** Once you have it, store it instead of the Google link. The destination is what you'll want next time, and the Google link is a detour.

## Or skip Google links entirely

Microlink search returns the real page for every result.

If you collect Google links from Google results yourself, [Microlink search](/docs/guides/search) can do the search for you. It resolves every Google link in its results before answering and drops any it can't resolve in time, so a result never points to a Google link. When that leaves a page short, it fills the gap from the next page if there is time, and otherwise answers with fewer results.

```js
const page = await microlink.search('node.js streams tutorial', { type: 'videos' })

for (const result of page.results) {
  console.log(result.url) // https://www.youtube.com/watch?v=…
}
```

`type` also takes `search`, `news`, `images`, `places`, `shopping` and the other Google verticals, and `page.next()` gives you the next page. The [search guide](/docs/guides/search) has the full list.

The [EGOOGLELINK](/docs/api/basics/error-codes#egooglelink) reference covers both answers. If you see a Google link that never resolves, send us the `report` link from its `500` and we'll look at it.
