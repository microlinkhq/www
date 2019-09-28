---
title: 'Rate Limit'
---

The API has a daily quota, just being possible to perform a certain number of requests every 24 hours. 

Your API quota depends on the [endpoint](/docs/api/api-basics/endpoint) you are using:

- **Free**: It is the plan applied for unauthenticated requests. It has a soft limitation of 50 <Label display='inline' children='reqs' suffix='/day' />.
- **Pro**: It is the plan applied for authenticated requests. It iss based on your plan associated with your API Key, starting from 1000 <Label display='inline' children='reqs' suffix='/day' />.

After 24 hours, the API quota is reset, giving you a fresh start again. 

Your current rate limit status is reflected as part of your response with the following headers:

- `x-rate-limit-limit`: The maximum number of requests that the consumer is permitted to make per minute.
- `x-rate-limit-reset`: The number of requests remaining in the current rate limit window.
- `x-rate-limit-remaining`: The time at which the current rate limit window resets in UTC epoch seconds.

We don't apply any throttling limitation: You can perform as much parallel requests as your daily quota allowed you

If you are hitting the daily quota very often and you want to upgrade your plan, just [contact us](mailto:hello@microlink.io?subject=Rate%20Limit%3A%20Increment%20Quota&body=Hello%2C%20I%20want%20to%20upgrade%20my%20plan.%20Can%20you%20suggest%20me%20the%20plan%20that%20fit%20better%20my%20user%20case%3F%0A%0AThanks%20for%20all.).

