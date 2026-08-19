---
title: 'Errors'
description: 'Handle Microlink SDK failures with MicrolinkError. Every method throws a typed error carrying code, statusCode, and a human-readable description.'
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
- **`statusCode`** — the HTTP status of the failed response.
- **`description`** — a human-readable explanation of what went wrong.

See [error codes](/docs/api/basics/error-codes) for the complete list and how to recover from each one.
