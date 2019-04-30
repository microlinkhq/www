---
title: 'size'
--- 

Type: `string`<br/>
Default: `normal`<br/>
Values: `'normal'|'large'`

It set the size layout of the card.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    media='logo'
    size='normal'
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'logo', size: 'normal' })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-media='logo' data-size='normal'}
`}} 
/>

<Microlink url='https://microlink.io' media='logo' />

<Figcaption children="The default direction is normal."  />

Alternatively you can set `large`

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    media='logo'
    size='large'
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'logo', size: 'large' })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-media='logo' data-size='large'}
`}} 
/>

<Microlink url='https://microlink.io' size='large' media='logo' />
