---
title: 'apiKey'
--- 

Type: `string`<br/>
Default: `undefined`

The API Key associated with your plan for authenticating your requests.

```jsx
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://microlink.io'
    apiKey='MyApiKey'
  />
)
```

<Figcaption children="The free daily quota will be used if you don't provide a previously API key registered."  />

When you do not attach an API Key, you are going to use the free quota until you reach the daily rate limit.

To have a better daily quota, you need to have a plan. See [pricing](/#pricing) to know the plans.

After paying, you going to have the API key in your mail that you need to attach here for authenticating requests.
