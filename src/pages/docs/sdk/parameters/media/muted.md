---
title: 'muted'
--- 

Type: <Type children='<boolean>'/><br/>
Default: <Type children='true'/>

Specifies if the media should be muted.

with `muted` enabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BvDTdWdnzkj/'
    media='video'
    autoPlay={false}
    muted
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, muted: true })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BvDTdWdnzkj/){:.card-preview data-media='video' data-autoPlay='false' data-muted='true'}
`}} 
/>

<Microlink url='https://instagram.com/p/BvDTdWdnzkj/' media='video' autoPlay={false} />

with `muted` disabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BvDTdWdnzkj/'
    media='video'
    autoPlay={false}
    muted={false}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, muted: false })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BvDTdWdnzkj/){:.card-preview data-media='video' data-autoPlay='false' data-muted='false'}
`}} 
/>

<Microlink url='https://instagram.com/p/BvDTdWdnzkj/' media='video' autoPlay={false} muted={false} />
