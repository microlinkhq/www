---
title: 'apiKey'
--- 

Type: <Type children='<string>'/>

The API Key associated with your plan for [authenticating](/docs/api/basics/authentication) your requests.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    apiKey='MyApiKey'
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { apiKey: 'MyApiKey' })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-apiKey='MyApiKey'}
`}} 
/>

<Figcaption children="The free daily quota will be used if you don't provide a previously API key registered."  />

When you do not attach an API Key, you are going to use the free quota until you reach the daily rate limit.

To get a better daily quota, you'll need to have a plan. See [pricing](/#pricing) to know the plans.

After payment, you'll recieve the API key (via email) that you need to attach to authenticate requests.
