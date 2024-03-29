---
title: 'Endpoint'
---

Microlink API is exposed from two endpoints:

- **free** ([api.microlink.io](https://api.microlink.io)): The endpoint to be used for unauthenticated requests. It has daily rate limit.
- **pro** ([pro.microlink.io](https://pro.microlink.io)): The endpoint to be used for authenticated requests. It needs a previously register API key.

All you need to do for accessing any of these endpoints it to hit them using HTTP GET method, nothing else.

```bash
microlink https://github.io/microlinkhq&userAgent=googlebot
```

<Figcaption children='Any additional API Parameter needs to be provided as query parameter.' />

The endpoint accepts multiple query parameters. It doesn't matter if they are camel or snake case, both styles are supported.

```bash
microlink https://github.io/microlinkhq&user_agent=googlebot
```

<Figcaption children='Provide the same API parameter but using snake_case has the same effect.' />

If you are using [Microlink Query Language](/docs/mql/getting-started/overview), the endpoint is automatically determined in case you provide an API Key.

```js
const mql = require('@microlink/mql')

const { status, data, response } = await mql(
  'https://github.io/microlinkhq', {
    apiKey: 'MyApiKey',
    userAgent: 'googlebot'
  }
)
```
