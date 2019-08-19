---
title: 'lazy'
---

Type: `boolean | object`<br/>
Default: `true`<br/>

Use the `IntersectionObserver` API to only load the card details when it's in the viewport. Passing a boolean toggles the feature with default parameters, and an object containing [API options](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) enables it, with the specified options.

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

<Microlink url='https://microlink.io' lazy={{ threshold: 0.5 }} />

<Figcaption children='The API request will launch when 50% of the card reaches the viewport.'  />

Alternatively you can disable it with `false`

<MultiCodeEditor languages={{
  React: `import Microlink from '@microlink/react'

export default () => (
  <Microlink
    url='https://microlink.io'
    lazy={false}
  />
)
`, Vanilla: `
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('a', { lazy: false })
  })
</script>
`, Jekyll: `
[](https://microlink.io){:.card-preview data-lazy="false"}
`}}
/>

<Microlink url='https://microlink.io' lazy={false} />
