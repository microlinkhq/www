---
title: 'Vanilla'
--- 

It is available as [npm package](https://www.npmjs.com/package/@microlink/vanilla)

<Terminal>npm install @microlink/vanilla --save</Terminal>

Optionally you can link it directly from the **CDN** as well

**UMD bundle**

```html
<script 
  src="//cdn.jsdelivr.net/npm/@microlink/vanilla@latest/umd/microlink.min.js">
</script>
```

**AMD bundle**

```html
<script 
  src="//cdn.jsdelivr.net/npm/@microlink/vanilla@latest/amd/microlink.min.js">
</script>
```

**CommonJS bundle**

```html
<script 
  src="//cdn.jsdelivr.net/npm/@microlink/vanilla@latest/cjs/microlink.min.js">
</script>
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
    microlink('.link-previews')
  })
</script>
```

<Figcaption children='We recommend calling the `microlink` method before the DOM finishes loading.' />

The vanilla interface is pretty simliar to jQuery/Zepto: You need to provide a CSS selector as target element you want to convert into beautiful preview.

<Microlink url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk' size='large' />

You can pass any [API Parameter](/api-parameter) as a object property, for example, `size`

```html
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('.link-previews', { 
      size: 'large'
    })
  })
</script>
```

<Figcaption children='Passing specific API Parameters as second argument.' />

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

that it will be rendered as

<Microlink url='https://www.theverge.com/tldr/2018/2/7/16984284/tesla-space-falcon-heavy-launch-elon-musk' style={{margin: 'auto', fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace'}} size='large' />
