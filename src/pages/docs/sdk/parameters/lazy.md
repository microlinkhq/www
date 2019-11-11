---
title: 'lazy'
---

Type: `boolean | object`<br/>
Default: `true`<br/>

When `true`, card content will be loaded lazily under the user's scroll behavior, using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    lazy
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { lazy: true })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-lazy='true'}
`}} 
/>

<Figcaption children='Using `lazy` allows to load content on-demand, avoiding unnecessary API calls' />

Additionally, you can pass your own [IntersectionObserver options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) to customize when the card content should be fetched.

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react' 
  
export default () => (
  <Microlink
    url='https://microlink.io'
    lazy={{ threshold: 0.5 }}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { threshold: 0.5 })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-lazy="{ 'threshold': 0.5 }"}
`}} 
/>

<Figcaption children='The card content will be fetched when 50% of the card reaches the viewport.' />
