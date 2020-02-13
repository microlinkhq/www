---
title: 'Angular'
---

It's available as an [npm package](https://www.npmjs.com/package/@microlink/angular).

<Terminal>npm install @microlink/angular --save</Terminal>

The Angular bundle is based on the [Vanilla](/docs/sdk/integrations/vanilla) version, but exported as an Angular library.

Since it doesn't include the peer dependencies, you'll need to install those too:

<Terminal>npm install react react-dom styled-components --save</Terminal>

After that, you're ready to import the Microlink SDK into your Angular project.

###### app.module.ts

```ts
import { NgModule } from '@angular/core'
import Microlink from '@microlink/angular'

@NgModule({
  imports: [Microlink.Module]
})
export class AppModule {}
```

<Figcaption children="There's also a `Component` export, for use with `declarations`."  />

###### app.component.html

```html
<microlink url="https://instagram.com/p/Bu1-PpyHmCn/"></microlink>
```

<Microlink url='https://instagram.com/p/Bu1-PpyHmCn/' />

The Angular integration supports any [API Parameter](/docs/api/getting-started/overview) via an `options` object prop.

```html
<microlink
  url="https://instagram.com/p/Bu1-PpyHmCn/"
  [options]="{ size: 'large' }"
></microlink>
```

<Microlink url='https://instagram.com/p/Bu1-PpyHmCn/' size='large' />

Although it's shipped with default styles, you can customize it using [CSS Classnames](docs/sdk/getting-started/considerations/#css-classnames)

###### app.component.css

```css
:host::ng-deep .microlink_card {
  font-family: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace';
  max-width: 100%;
}
```

<Microlink url='https://instagram.com/p/Bu1-PpyHmCn/' style={{fontFamily: 'Nitti, "Microsoft YaHei", 微软雅黑, monospace', maxWidth: '100%'}} />
