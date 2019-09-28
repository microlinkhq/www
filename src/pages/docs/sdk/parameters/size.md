---
title: 'size'
--- 

Type: `string`<br/>
Default: `normal`<br/>
Values: `'small'|'normal'|'large'`

It determines the size of the card.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <>
  <Microlink
    url='https://microlink.io'
    media='logo'
    size='small'
  />
  <Microlink
    url='https://microlink.io'
    media='image'
  />
  <Microlink
    url='https://microlink.io'
    media='video'
    size='large'
  />
  </>
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

<Microlink url='https://microlink.io' media='logo' size='small' />
<Microlink url='https://microlink.io' media='logo' />
<Microlink url='https://microlink.io' media='logo' size='large' />
