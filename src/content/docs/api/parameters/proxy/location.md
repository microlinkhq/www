---
title: 'proxy › location'
description: 'Route the request through a proxy IP in a specific country to fetch region-specific content.'
isPro: true
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/><br/>
Default: <Type children="'US'"/><br/>
Values: ISO 3166-1 alpha-2 country code

It routes the request through a [proxy](/docs/api/parameters/proxy) IP in the given country over the target [url](/docs/api/parameters/url).

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://geolocation.microlink.io',
  proxy: { location: 'US' }
}} />

The value is case-insensitive. Unknown codes are rejected with [EINVALQUERY](/docs/api/basics/error-codes#einvalquery). `location` and [url](/docs/api/parameters/proxy/url) are exclusive.
