---
title: 'apiKey'
description: Authenticate your Microlink SDK requests using your API key to increase rate limits and access Pro features.
---

import { DemoIntegrations } from 'components/markdown/DemoIntegrations'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/>

The API Key associated with your plan for [authenticating](/docs/api/basics/authentication) your requests.

<DemoIntegrations
  parameters={{apiKey: 'MyApiKey'}}
  caption="The free daily quota will be used if you don't provide a registered API key."
  showCard={false}
/>

When you do not attach an API Key, you are going to use the free quota until you reach the daily rate limit.

To get a better daily quota, you'll need to have a plan. See [pricing](/#pricing) to know the plans.

After payment, you'll recieve the API key (via email) that you need to attach to authenticate requests.
