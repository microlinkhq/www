---
title: 'url'
description: 'The primary address of the website you want to process. The url parameter is the core requirement for any Microlink API request, serving as the base for metadata extraction.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

**required**

Type: <Type children='<string>'/>

The target URL for getting information based on the content.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://kikobeats.com')} />

<Figcaption children="The url parameter is the only required parameter for any Microlink API request." />

## URL Requirements

The URL provided must be:

- **Publicly reachable** by the service (no localhost or private IPs)
- **Well-formed** following the [WHATWG URL](https://nodejs.org/api/url.html#url_the_whatwg_url_api) standard
- **Including protocol** (http:// or https://)

If you want to extract content behind a login panel, the URL provided should contain the authentication step as part of the query string, or provide the authentication credentials using [headers](/docs/api/parameters/headers).

## URL Encoding

If the URL provided has query string parameters, they should be properly escaped to not interfere with the Microlink API query parameters.

<MultiCodeEditorInteractive mqlCode={mqlCode('https://kikobeats.com?ref=microlink')} />

<Figcaption children="URLs with query parameters are automatically encoded." />

Using [MQL](/docs/mql/getting-started/overview) or [Microlink CLI](/docs/api/getting-started/cli) will escape the URL properly. Otherwise, you need to escape it using [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) or equivalent.

## Protocol Handling

The protocol matters: If the target URL has relative URLs inside (e.g., images or videos), then the URL provided will be used to resolve relative URLs into absolute.

This means that if you provide HTTPS, then all relative URLs will be resolved under SSL.

## Common URL Patterns

Here are examples of different URL types you can process:

**Standard websites**

<MultiCodeEditorInteractive mqlCode={mqlCode('https://github.com/microlinkhq')} />

**URLs with fragments**

<MultiCodeEditorInteractive mqlCode={mqlCode('https://microlink.io/docs/api/getting-started/overview#url-requirements')} />

**Internationalized domain names**

<MultiCodeEditorInteractive mqlCode={mqlCode('https://例え.jp')} />

## Error Handling

If the URL cannot be processed, you'll receive one of these error codes:

- **EINVALURL**: The URL format is invalid
- **EFORBIDDENURL**: The URL resolves to a forbidden IP range
- **EMAXREDIRECTS**: Too many redirects (more than 10 hops)
- **ETIMEOUT**: The URL took too long to respond

See [error codes](/docs/api/basics/error-codes) for the complete list.
