---
title: 'Versioning'
description: 'Understand how Microlink API evolves: an unversioned, additive-only surface, a published deprecation policy with six months of notice, and Deprecation and Sunset headers.'
---

Microlink API is **unversioned**. There is no `/v1/` prefix and no version header to pin: [api.microlink.io](/docs/api/basics/endpoint) and [pro.microlink.io](/docs/api/basics/endpoint) always serve the current surface.

That works because the surface is **additive-only**.

## What additive-only means

New [query parameters](/docs/api/parameters/url) and new [data fields](/docs/api/getting-started/data-fields) ship continuously. What never happens:

- An existing query parameter is removed, renamed, or given a different meaning.
- An existing data field disappears from the response, or changes its type.
- A default value changes in a way that alters the output of a request that does not set it.

A change that cannot be made additively ships as a **separate endpoint**, never as new behaviour of an existing one. An integration written today keeps working tomorrow without pinning anything.

Requests are also forward-compatible in the other direction: unknown query parameters are ignored rather than rejected, so a client can send a parameter that a future release will understand.

## Deprecation policy

Nothing is deprecated today. When something is:

1. It is announced on the [changelog](/changelog) at least **6 months** before removal.
2. The affected responses carry a [`Deprecation`](https://www.rfc-editor.org/rfc/rfc9745.html) header for the whole notice period, and a [`Sunset`](https://www.rfc-editor.org/rfc/rfc8594.html) header with the instant it stops working.
3. The documentation page for the deprecated parameter names the replacement.

## Machine-readable surface

The whole API surface is published as an [OpenAPI 3.1 specification](https://microlink.io/openapi.json), generated from these documentation pages on every deploy, so it cannot drift from what is documented here.

It carries the parameter types and defaults, the [response format](/docs/api/basics/format), the [error model](/docs/api/basics/error-codes) with its full code enum, the [rate limit](/docs/api/basics/rate-limit) headers, and this policy under `info.x-versioning`.
