---
title: 'Authentication'
---

When you use a [pro](/#pricing) plan, you have to pass your API key in order to [authenticate](/docs/api/basics/authentication) as part of the request to be authenticated against [Microlink API](/docs/api/getting-started/overview).

That should be done carefully: If you do that publicly, you’re compromising your credentials to be leaked by anyone.

In order to prevent that, the authentication step should be done on the backend side. Check our repositories [proxy](https://github.com/microlinkhq/proxy) and [edge-proxy](https://github.com/microlinkhq/edge-proxy) to accomplish that, only allowing a list of well-known domains to consume your API quota.

After that, just pass your proxy URL as `endpoint` query parameter.

