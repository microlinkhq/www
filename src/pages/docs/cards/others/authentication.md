---
title: 'Authentication'
---

When you use a [pro](/#pricing) plan, you have to pass your API key in order to [authenticate](/docs/api/basics/authentication) as part of the request to be authenticated against [Microlink API](/docs/api/getting-started/overview).

That should be done carefully: If you do that publicly, you're compromising your credentials to be leaked by anyone.

In order to prevent that, authentication step should be done at backend side.

You can do that in a trivial using [Microlink Proxy](https://github.com/microlinkhq/proxy) to setup your custom API endpoint, only allowing a list of well-knowledge domains consume your API quota.

After that, just pass your proxy URL as `endpoint` query parameter.
