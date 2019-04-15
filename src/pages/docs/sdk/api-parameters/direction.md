---
title: 'direction'
--- 

Type: `string`<br/>
Default: `ltr`<br/>
Values: `'ltr'|'rtl'`

It sets the direction of the card.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    media='logo'
    direction='ltr'
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'logo', direction:'ltr' })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-media='logo' data-direction='ltr'}
`}} 
/>

<Microlink url='https://microlink.io' media='logo' />

<Figcaption children="The default direction is rtl."  />

Alternatively you can set `rlt` that means *right-to-left*

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    media='logo'
    direction='rlt'
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'logo', direction:'rlt' })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-media='logo' data-direction='rlt'}
`}} 
/>

<Microlink url='https://microlink.io' direction='rtl' media='logo' />
