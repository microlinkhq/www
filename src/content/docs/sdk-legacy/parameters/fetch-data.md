---
title: 'fetchData'
description: 'Control how link data is retrieved. Enable internal API calls for real-time metadata extraction or disable it to provide custom pre-fetched data manually.'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type, TypeContainer } from 'components/markdown/Type'

> **The legacy Microlink Embed SDK is no longer maintained.** It keeps working and you can still use it, but it won't receive further updates. The new [Microlink SDK](/integrations/sdk) — the [microlink.io](/docs/sdk/getting-started/overview/) package — is the way to consume the Microlink API going forward.

Type: <TypeContainer><Type children='<boolean>'/></TypeContainer><br/>
Default: <Type children="true"/>

It determines how the data is fetched through [Microlink API](/docs/sdk-legacy/parameters/fetch-data/).

When it's `true`, an internal network call will be performed for getting the data.  

<DemoIntegrations
  parameters={{url: '{{demolinks.netflix.url}}', fetchData: true}}
  caption="A network call will be performed internally for getting the data."
/>

Passing a `false` disables this behavior. You can combine it with [setData](/docs/sdk-legacy/parameters/set-data/).
