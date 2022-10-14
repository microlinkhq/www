---
title: 'Vue'
---

It's available as [npm package](https://www.npmjs.com/package/@microlink/vue).

```bash
npm install @microlink/vue --save
```

The Vue bundle is based on the [Vanilla](/docs/sdk/integrations/vanilla) version, but exported as a CommonJS Vue plugin/component.

Since it doesn't include the peer dependencies, you'll need to install those too:

```bash
npm install react react-dom styled-components --save
```

After that, you’re ready to import the Microlink SDK into your Vue project, either globally or on-demand.

#### Globally

###### App.js

```js
import Vue from 'vue'
import Microlink from '@microlink/vue'

Vue.use(Microlink)
```

###### MyComponent.vue

```vue
<template>
  <Microlink url="https://microlink.io" />
</template>
```

#### On-demand

```vue
<template>
  <Microlink url="https://microlink.io" />
</template>

<script>
import { Microlink } from '@microlink/vue'

export default {
  name: 'MyComponent',
  components: { Microlink }
}
</script>
```

Importing the SDK globally allows you to define global API options, this is handy for setting an API key for your whole application.

```js
import Vue from 'vue'
import Microlink from '@microlink/vue'

Vue.use(Microlink, { apiKey: 'MyApiKey' })
```

The Vue integration supports any [Microlink API](/docs/api/getting-started/overview) query parameter, just pass them as props.

```vue
<template>
  <Microlink url="https://www.youtube.com/watch?v=9P6rdqiybaw" size="large" />
</template>
```

<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' size="large" media='video' />

Although it's shipped with default styles, you can customize it using [CSS Classnames](docs/sdk/getting-started/considerations/#css-classnames)

```vue
<template>
  <div id="app">
    <Microlink url="https://www.youtube.com/watch?v=9P6rdqiybaw" />
  </div>
</template>

<style>
#app /deep/ .microlink_card {
  font-family: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace';
  max-width: 100%;
}
</style>
```

<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' media='video' style={{fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace', maxWidth: '100%'}} />
