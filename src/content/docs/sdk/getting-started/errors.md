---
title: 'Errors'
description: 'Handle Microlink SDK failures with MicrolinkError. Every method throws a typed error carrying code, statusCode, and a human-readable description, and the client keeps the last request around for debugging.'
---

Every method throws a `MicrolinkError` when the underlying API call fails, so a single `try/catch` covers the whole client. Retries happen automatically underneath before the error surfaces.

```js
import createClient, { MicrolinkError } from 'microlink.io'

const microlink = createClient()

try {
  const { url } = await microlink.screenshot('https://example.com')
} catch (error) {
  if (error instanceof MicrolinkError) {
    console.error(error.code, error.statusCode, error.description)
  }
}
```

The error carries:

- **`code`** — the API [error code](/docs/api/basics/error-codes), such as `EAUTH` or `EBRWSRTIMEOUT`.
- **`status`** — the API [status](/docs/api/basics/format#status) of the failed response, `'fail'` or `'error'`.
- **`statusCode`** — the HTTP status of the failed response.
- **`description`** — a human-readable explanation of what went wrong.
- **`message`** — the code and the description joined, e.g. `'EAUTH, Invalid API key'`.
- **`url`** — the API URL that was requested, useful to reproduce the call from a browser or `curl`.
- **`headers`** — the response headers, including `x-request-id` to reference the request when reaching support.
- **`more`** — a link to the documentation of the error code.
- **`data`** — the partial payload returned by the API, when any. Field-level validation errors describe the offending field here.

`MicrolinkError` is also exported by `require('microlink.io')`, so CommonJS code can check `error instanceof MicrolinkError` the same way.

See [error codes](/docs/api/basics/error-codes) for the complete list and how to recover from each one.

## Client-side validation

Some errors never reach the API. Passing something that isn't an `http` or `https` URL throws `EINVALURLCLIENT` immediately, before any request is made, and a response that cannot be parsed surfaces as `EFATALCLIENT`. Both are regular `MicrolinkError` instances.

## Inspect the last request

The client keeps the last request it made under `microlink.last`, which is handy when a call doesn't return what you expect:

```js
const markdown = await microlink.markdown('https://example.com')

console.log(microlink.last.requestUrl)
// => 'https://api.microlink.io/?url=https%3A%2F%2Fexample.com&meta=false&data.markdown.attr=markdown'

console.log(microlink.last.response.headers.get('x-cache-status'))
// => 'HIT'
```

It exposes `requestUrl`, the API URL that was called; `requestOptions`, the HTTP options sent with it, headers included; and `response`, the raw HTTP response with `url`, `statusCode`, `headers`, and `body` — the complete API envelope, with its [status](/docs/api/basics/format#status) and the full `data` payload a method unwraps from. The [CLI](/docs/sdk/getting-started/cli) prints the same information with `--trace`.

[run](/docs/sdk/methods/run) issues its requests through its own transport, so `last` reflects the most recent call of any other method.
