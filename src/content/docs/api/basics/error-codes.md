---
title: Error codes
description: 'Troubleshoot Microlink API error codes including EAUTH, ERATE, and EBRWSRTIMEOUT. Find solutions for authentication issues, rate limits, timeouts, and specific Pro plan parameter requirements.'
---

import { Type } from 'components/markdown/Type'

import ProBadge from 'components/patterns/ProBadge/ProBadge'

Microlink API considers an unexpected situation any request performed on which [status](/docs/api/basics/format#status) is different from <Type children="'success'"/>.

When this happens, the response payload includes some useful information in order to determine the root cause of the problem:

- `id`: The unique identifier associated with the request.
- `code`: The error code that represents the final request state.
- `message`: A brief explanantion about why the error happened.
- `more`: A link pointing this documentation.
- `report`: A link for reporting the problem directly to us.

If you are experience any of these errors are you not sure how to proceed, please feel free to [reach us](mailto:hello@microlink.io).

## EAUTH

**Message**

Invalid API key. Make sure you are attaching your API key as `x-api-key` header.

**Solution**

Ensure to [authenticate](/docs/api/basics/authentication/) your requests providing an API key attached as `x-api-key`.

## EBRWSRTIMEOUT

**Message**

The URL provided reached the maximum browser navigation time allowed.

**Solution**

When the target [url](/docs/api/parameters/url) reached the [timeout](/docs/api/parameters/timeout) associated with the request lifecycle, this error is thrown.

In order to avoid this error, the request should be resolved before timeout.

## EFATAL

**Message**

Resolved the target URL failed. Make sure your URL is valid and it has HTML content.

**Solution**

This is the generic error used when it wasn't possible to determine the root cause of the problem.

If you are experimenting with this error, please [contact us](mailto:hello@microlink.io), reporting the request `id` to make it possible to reproduce the original request.

## EFILENAME

**Message**

You need a <ProBadge/> plan for using [filename](/docs/api/parameters/filename) query parameter.

**Solution**

See [pricing](/#pricing) for upgrading your plan.

## EFATALCLIENT

**Message**

(no message)

**Solution**

There is a network problem trying to reach the API [endpoint](/docs/api/basics/endpoint).

If you are experimenting with this error, please [contact us](mailto:hello@microlink.io).

## EFORBIDDENURL

**Message**

The URL is being resolved into an IP address whose range is not allowed.

**Solution**

The service will only resolve URLs that point to unicast IP addresses.

## EHEADERS

**Message**

You need a <ProBadge/> plan for using [headers](/docs/api/parameters/headers) query parameters.

**Solution**

See [pricing](/#pricing) for upgrading your plan.

## EINVALURL

**Message**

The target URL is considered not valid.

**Solution**

Ensure the [url](/docs/api/parameters/url) provided has protocol, hostname and follows [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api) standard.

## EINVALPROXY

**Message**

The proxy URL is considered not valid.

**Solution**

Ensure the [url](/docs/api/parameters/proxy) provided can be parsed as [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api).

## EINVALURLCLIENT

**Message**

The target URL is considered not valid.

**Solution**

Ensure the [url](/docs/api/parameters/url) provided has protocol, hostname and follows [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api) standard.

## EINVALTTL

**Message**

The `ttl` value is invalid.

**Solution**

The [ttl](/docs/api/parameters/ttl) value should be a value between <Type children="'1m'"/> to <Type children="'31d'"/> range.

## EINVALSTTL

**Message**

The `staleTtl` value is invalid.

**Solution**

The [staleTtl](/docs/api/parameters/staleTtl) value should be a value less than the current [ttl](/docs/api/parameters/ttl) provided.

## EMAXREDIRECTS

**Message**

The target URL reached the maximum number of redirect after 10 times.

**Solution**

Ensure the [url](/docs/api/parameters/url) provided reaches the destination URL in less than 10 hops.

## EPRO

**Message**

The request has `x-api-key` header present and it has been performed against [api.microlink.io](https://api.microlink.io) endpoint.

**Solution**

In order to [authenticate](/docs/api/basics/authentication/) your requests, you need to perform them against [pro.microlink.io](https://pro.microlink.io). Check [endpoint](/docs/api/basics/endpoint) to know more.

## EPROXY

**Message**

You need a <ProBadge/> plan for using [proxy](/docs/api/parameters/proxy) query parameter.

**Solution**

See [pricing](/#pricing) for upgrading your plan.

## EPROXYNEEDED

**Message**

The URL provided uses antibot protection. Upgrade to a <ProBadge/> plan.

**Solution**

See [pricing](/#pricing) for upgrading your plan.

## ERATE

**Message**

Your daily rate limit has been reached. You need to wait or extend your plan.

**Solution**

You need to extend your [rate limit](/docs/api/basics/rate-limit/) quota or wait until you’re quota reset.

## ETIMEOUT

**Message**

The request reached maximum timeout.

**Solution**

When the target [url](/docs/api/parameters/url) reached the [timeout](/docs/api/parameters/timeout) associated with the request lifecycle, this error is thrown.

In order to avoid this error, the request should be resolved before timeout.

## ETTL

**Message**

You need a <ProBadge/> plan for using [ttl](/docs/api/parameters/ttl) query parameter.

**Solution**

See [pricing](/#pricing) for upgrading your plan.

## ESTTL

**Message**

You need a <ProBadge/> plan for using [staleTtl](/docs/api/parameters/staleTtl) query parameter.

**Solution**

See [pricing](/#pricing) for upgrading your plan.
