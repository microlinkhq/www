---
title: 'contrast'
--- 

Type: `boolean`<br/>
Default: `false`

When enabled, it will generate a high contrast card based on predominant colors detected in the feature image from the target URL.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BsMKPL2nDgX/'
    contrast
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { contrast: true })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BsMKPL2nDgX/){:.card-preview data-contrast='true'}
`}} 
/>

<Figcaption children="The contrast mode has better accessibility ratio."  />

<Microlink url='https://instagram.com/p/BsMKPL2nDgX/' contrast />
<Microlink url='https://instagram.com/p/BsMKPL2nDgX/' contrast size='large' />
