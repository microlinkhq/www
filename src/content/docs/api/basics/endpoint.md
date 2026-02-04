---
title: 'Endpoint'
description: 'Access Microlink API via free and pro endpoints. Learn how to perform HTTP GET requests, use camelCase or snake_case query parameters, and automate endpoint selection using Microlink Query Language (MQL).'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

Microlink API is exposed from two endpoints:

- **free** ([api.microlink.io](https://api.microlink.io)): The endpoint to be used for unauthenticated requests. It has daily rate limit.
- **pro** ([pro.microlink.io](https://pro.microlink.io)): The endpoint to be used for authenticated requests. It needs a previously register API key.

All you need to do for accessing any of these endpoints it to hit them using HTTP GET method, nothing else.

<MultiCodeEditorInteractive 
  mqlCode={{ url: 'https://github.com/microlinkhq', headers: { userAgent: 'googlebot' } }} 
/>

<Figcaption children='Any additional API Parameter needs to be provided as query parameter.' />

The endpoint accepts multiple query parameters. It doesn't matter if they are camel or snake case, both styles are supported.

<MultiCodeEditorInteractive 
  mqlCode={{ url: 'https://github.com/microlinkhq', headers: { user_agent: 'googlebot' } }} 
/>

<Figcaption children='Provide the same API parameter but using snake_case has the same effect.' />

If you are using [Microlink Query Language](/docs/mql/getting-started/overview) (MQL), the endpoint is automatically determined in case you provide an API Key.

<MultiCodeEditorInteractive 
  mqlCode={{ url: 'https://github.com/microlinkhq', headers: { apiKey: 'YOUR_API_TOKEN', userAgent: 'googlebot' } }} 
/>
