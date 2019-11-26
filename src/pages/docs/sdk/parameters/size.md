---
title: 'size'
--- 

Type: <TypeContainer><Type children='<string>'/></TypeContainer><br/>
Default: <Type children="'normal'"/><br/>
Values: <TypeContainer><Type children="'small'"/> | <Type children="'normal'"/> | <Type children="'large'"/></TypeContainer>

Determines the size of the card.

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
