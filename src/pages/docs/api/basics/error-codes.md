---
title: Error codes
---

Microlink API considers an unexpected situation any request performed on which [status](/docs/api/basics/format#status) is different from `'success'`.

When this happens, the response payload includes some useful information in order to determine the root cause of the problem:

- `id`: The unique identifier associated with the request.
- `code`: The error code that represents the final request state.
- `message`: A brief explanantion about why the error happened.
- `more`: A link pointing this documentation.
- `report`: A link for reporting the problem directly to us.

## EAUTH

**Message**

Authentication failed. Make sure you are attaching your API key as `x-api-key` header.

**Solution**

Ensure your API key we send you via email and it's attached as `x-api-key` against `pro.microlink.io` endpoint.

## EBRWSRTIMEOUT

**Message**

The URL provided reached the maximum browser navigation time allowed.

**Solution**

Any request has a maximum timeout of 24s associated, meaning that any request needs to be resolved before that umbral.

Additionally, some API parameters (such as [insights](/docs/api/parameters/insights), [pdf](/docs/api/parameters/pdf), [prerender](/docs/api/parameters/prerender) or [screenshot](/docs/api/parameters/screenshot)) have a browser navigation associated. During it, the target URL is resolved from the perspective of a browser.

The maximum time associated with a browser navigation is 23s, considering the browser hangs if navigation isn't resolved after this time.

In order to avoid this error, browser navigation time need to be done below the threshold.

## EFATAL

**Message**

Resolves the target URL failed. Make sure your URL is valid and it has HTML content.

**Solution**

This is the generic error used when it wasn't possible to determine the root cause of the problem.

If you are experimenting with this error, please [contact us](mailto:hello@microlink.io), reporting the request `id` to make it possible to reproduce the original request.

## EFILENAME

**Message**

You need a PRO plan for using [filename](/docs/api/parameters/filename) query parameter.

**Solution**

See [pricing](/#pricing) for upgrading your plan.

## EFATALCLIENT

**Message**

(no message)

**Solution**

There is a network problem trying to reach the API endpoint.

If you are experimenting with this error, please [contact us](mailto:hello@microlink.io).

## EFORBIDDENURL

**Message**

The URL is being resolved into an IP address whose range is not allowed.

**Solution**

The service will only resolve URLs that point to unicast IP addresses.

## EHEADERS

**Message**

You need a PRO plan for using [headers](/docs/api/parameters/headers) query parameters.

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

The [ttl](/docs/api/parameters/ttl) value should be a value between `1m` to `31d` range.

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

The request has `x-api-key` header present and it has been performed against `api.microlink.io` endpoint.

**Solution**

In order to [authenticate](/docs/api/basics/authentication/) your requests, you need to perform them against `pro.microlink.io` endpoint.

## EPROXY

**Message**

You need a PRO plan for using [proxy](/docs/api/parameters/proxy) query parameter.

**Solution**

See [pricing](/#pricing) for upgrading your plan.

## ERATE

**Message**

Your daily rate limit has been reached. You need to wait or extend your plan.

**Solution**

You need to extend your [rate limit](/docs/api/basics/rate-limit/) quota or wait until you're quota reset.

## ETIMEOUT

**Message**

The request reached maximum timeout.

**Solution**

Any request has a maximum timeout of 28s associated, meaning that any request needs to be resolved before that umbral.

## ETTL

**Message**

You need a PRO plan for using [ttl](/docs/api/parameters/ttl) query parameter.

**Solution**

See [pricing](/#pricing) for upgrading your plan.

## ESTTL

**Message**

You need a PRO plan for using [staleTtl](/docs/api/parameters/staleTtl) query parameter.

**Solution**

See [pricing](/#pricing) for upgrading your plan.
