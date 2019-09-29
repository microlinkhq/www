---
title: 'muted'
--- 

Type: `boolean`<br/>
Default: `true`

It specifies that the audio output of the video should be muted.

with `muted` enabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BvDTdWdnzkj/'
    media='video'
    autoPlay={false}
    controls
    muted
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, controls: true, muted: true })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BvDTdWdnzkj/){:.card-preview data-media='video' data-autoPlay='false' data-controls='true' data-muted='true'}
`}} 
/>

<Microlink url='https://instagram.com/p/BvDTdWdnzkj/' media='video' autoPlay={false} controls />

with `muted` disabled:

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://instagram.com/p/BvDTdWdnzkj/'
    media='video'
    autoPlay={false}
    controls
    muted={false}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { media: 'video', autoPlay: false, controls: true, muted: false })
  })
</script>
`, Jekyll: `
[](https://instagram.com/p/BvDTdWdnzkj/){:.card-preview data-media='video' data-autoPlay='false' data-controls='true' data-muted='false'}
`}} 
/>

<Microlink url='https://instagram.com/p/BvDTdWdnzkj/' media='video' autoPlay={false} muted={false} />
