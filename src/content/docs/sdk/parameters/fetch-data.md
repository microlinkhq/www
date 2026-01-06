---
title: 'fetchData'
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type, TypeContainer } from 'components/markdown/Type'

Type: <TypeContainer><Type children='<boolean>'/></TypeContainer><br/>
Default: <Type children="true"/>

It determines how the data is fetched through [Microlink API](/docs/sdk/parameters/fetch-data/).

When it's `true`, an internal network call will be performed for getting the data.  

<DemoIntegrations
  parameters={{url: '{{demolinks.netflix.url}}', fetchData: true}}
  caption="A network call will be performed internally for getting the data."
/>

Passing a `false` disables this behavior. You can combine it with [setData](/docs/sdk/parameters/set-data/).
