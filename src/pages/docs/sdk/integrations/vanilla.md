---
title: 'Vanilla'
--- 

It is available as [npm package](https://www.npmjs.com/package/@microlink/vanilla)

<Terminal>npm install @microlink/vanilla --save</Terminal>

The vanilla bundle is based on the React version, but exported as Universal Module Definition (*UMD*).

Since the bundle doesn't include the depdendencies, we recommend load it from a **CDN**.

```html
<script src="https://cdn.jsdelivr.net/npm/react@16/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/styled-components@4/dist/styled-components.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@microlink/vanilla@4.0.0-alpha.3/dist/microlink.min.js"></script>
```

or even better, combine them just in one line:

```html
<script src="https://cdn.jsdelivr.net/combine/npm/react@16/umd/react.production.min.js,npm/react-dom@16/umd/react-dom.production.min.js,npm/@microlink/vanilla@4.0.0-alpha.3/dist/microlink.min.js"></script>
```

After that, `microlink` will available in the global scope.

```html
  <script>
  document.addEventListener('DOMContentLoaded', function (event) {
    // Example 1
    // Replace all `a` tags for microlink cards
    microlink('a')
    // Example 2
    // Replace all elements with `link-preview` class
    // for microlink cards
    microlink('.link-previews')
    // Example 3
    // Replace all elements with `link-preview` class
    // for microlink cards, passing API specific options
    microlink('.link-previews', { size: 'large' })
  })
</script>
```

<Figcaption children='We recommend calling the `microlink` method before the DOM finishes loading.' />

The vanilla interface is pretty simliar to jQuery/Zepto: You need to provide a CSS selector as target element you want to convert into beautiful preview.

<Microlink url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk' size='large' />

You can pass any [API Parameter](/api-parameter) as an object property, e.g., [size](/docs/sdk/api-parameters/size/).

```html
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('.link-previews', { 
      size: 'large'
    })
  })
</script>
```

<Figcaption children='The API parameters passed there will be attached for all the links.' />

If you want to pass specific API Parameters just for some cases, you need to pass them as [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

```html
<a 
  src="https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk" 
  class="link-preview" 
  data-size="large"
  data-media='["logo", "image"]'
  data-set-data='{"title": "hello world"}'>
</a>
```

<Figcaption children='You can pass objects, arrays, booleans or even JSON structures as data attributes.' />

Although it is shipped with a default styles, you can customize it using [CSS Classnames](docs/sdk/getting-started/considerations/#css-classnames)

```html
<style>
  .microlink-card {
    font-family: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace';
    max-width: 100%;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('.link-previews', { 
      size: 'large'
    })
  })
</script>
```

<Microlink url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk' style={{margin: 'auto', fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}} size='large' />
