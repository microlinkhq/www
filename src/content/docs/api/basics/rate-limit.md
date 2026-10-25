---
title: 'Rate limit'
description: 'Understand Microlink API rate limits for free and pro endpoints. Monitor usage via x-rate-limit headers, handle HTTP 429, and scale your quota for high-concurrency.'
---

import Label from 'components/elements/Label'
import {
  FREE_PLAN_REQUESTS_PER_DAY,
  FREE_PLAN_CONCURRENT_REQUESTS,
  KEYLESS_REQUESTS_PER_DAY
} from 'helpers/free-tier'

The API quota is the number of requests you can perform during a quantity of time.

Your API quota depends on your plan:

- **free**: unauthenticated {KEYLESS_REQUESTS_PER_DAY} <Label display='inline' children='reqs' suffix='/day' />, authenticated {FREE_PLAN_REQUESTS_PER_DAY} <Label display='inline' children='reqs' suffix='/day' />.
- **pro**: It's based on the plan associated with your [API Key](/docs/api/basics/authentication), starting from 46,000 <Label display='inline' children='reqs' suffix='/month' />.

You can perform HTTP calls as long as you are under your API quota limit.

When you reach the API quota limit, you will experience [429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429), meaning you need to wait until the API quota reset (or upgrade your plan).

When the API quota is reset, you have a fresh start again.

All requests return your current quota on the response:

- `x-rate-limit-limit`: The maximum number of requests permitted in the current window.
- `x-rate-limit-remaining`: The number of requests remaining in the current window.
- `x-rate-limit-reset`: The time at which the window resets, in UTC epoch seconds.

The keyless endpoint reports the daily window. With an API key the response reports the quota on your key: the free key resets daily, and paid plans reset at the start of the next month in UTC. Keyed numbers are refreshed in the background, so they can lag the live counter by a few minutes.

The free API key runs up to {FREE_PLAN_CONCURRENT_REQUESTS} concurrent requests. Requests above that limit also get 429, even with quota left: when the 429 has no `x-rate-limit-remaining` header, or it is above zero, wait a second and retry instead of waiting for the reset.

The keyless endpoint and paid plans don't throttle: you can run as many parallel requests as your quota allows.

If you are hitting the daily quota very often and you want to upgrade your plan, just [contact us](mailto:hello@microlink.io?subject=Increment%20API%20quota%20rate%20limit&body=Hello%2C%20I%20want%20to%20upgrade%20my%20plan.%20Can%20you%20suggest%20me%20the%20plan%20that%20fit%20better%20for%20my%20user%20case.Thanks%20for%20everything.).
