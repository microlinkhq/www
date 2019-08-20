---
title: 'url'
--- 

**Required**

Type: `string`

The target URL for getting information based on the content.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a')
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview}
`}} 
/>


<Figcaption children='`url` is the only api parameter.' />

<Microlink url='https://microlink.io' media='logo' />

It should be reachable by the service. For example, if you want to extract content behind a login panel, the URL provided should contain the authentication step as part of the query string.

If the URL provided has query strings, it should be properly escaped in order to not interfere with the rest of the API Parameters.

Also, the protocol matters: If the target URL has relative URLs inside (e.g., images or videos), then the URL provided will be used to resolve relative URLs into absolute.

This means that if you provide an HTTPS URL, then all relative URLs will be resolved under SSL.
