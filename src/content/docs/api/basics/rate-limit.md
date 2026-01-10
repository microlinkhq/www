---
title: 'Rate limit'
description: Understand Microlink API rate limits for free and pro endpoints. Learn how to monitor usage via x-rate-limit headers, handle HTTP 429 errors, and scale your quota for high-concurrency needs.
---

import Label from 'components/elements/Label'

The API quota is the number of requests you can perform during a quantity of time.

Your API quota depends on the [endpoint](/docs/api/basics/endpoint) you are using:

- **free**: It's the plan applied for unauthenticated requests. It has a soft limitation of 50 <Label display='inline' children='reqs' suffix='/day' />.
- **pro**: It's the plan applied for authenticated requests. It's based on the plan associated with your [API Key](/docs/api/basics/authentication), starting from 14,000 <Label display='inline' children='reqs' suffix='/month' />.

You can perform HTTP calls always you are under your the API quota limit.

When you reach the API quota limit, you will experience [HTTP 429 errors](https://httpstatuses.com/429), meaning you need to wait until the API quota reset (or upgrade your plan).

When the API quota is reset, you have a fresh start again.

For the free endpoint, your current rate limit status is reflected as part of your response with the following headers:

- `x-rate-limit-limit`: The maximum number of requests that the consumer is permitted to make per minute.
- `x-rate-limit-remaining`: The number of requests remaining in the current rate limit window.
- `x-rate-limit-reset`: The time at which the current rate limit window resets in UTC epoch seconds.

We don't apply any throttling limitation: You can perform as much parallel requests as your daily quota allowed you.

If you are hitting the daily quota very often and you want to upgrade your plan, just [contact us](mailto:hello@microlink.io?subject=Increment%20API%20quota%20rate%20limit&body=Hello%2C%20I%20want%20to%20upgrade%20my%20plan.%20Can%20you%20suggest%20me%20the%20plan%20that%20fit%20better%20for%20my%20user%20case.Thanks%20for%20everything.).
