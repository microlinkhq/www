---
title: 'Jekyll'
---

The Jekyll integration is pretty similar to the [Vanilla](/docs/sdk/integrations/vanilla/) approach.

Just you need to be sure to load the script. A good place to put it in `_layouts/default.html`:


```html
<script src="//cdn.jsdelivr.net/npm/@microlink/vanilla@latest/umd/microlink.min.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    microlink('.card-preview')
  });
</script>
```

In the code above, we are associating microlink cards with the class name `card-preview`. 

So now, when we write a new jekyll post, we are going to associate `card-preview` class name with the links we want to convert into beauty preview

```html
[](https://www.theverge.com/2016/4/1/11342104/tesla-model-3-announcement-photos){:.card-preview}
```

Then the link will be rendered as 

<Microlink url='https://www.theverge.com/2016/4/1/11342104/tesla-model-3-announcement-photos' />

You can pass any [API Parameter](/api-parameter) as `data-*` field

```html
[](https://www.theverge.com/2016/4/1/11342104/tesla-model-3-announcement-photos){:.card-preview data-size="large"}
```

It is equivalent to pass `{size: 'large'}` with the [Vanilla](/docs/sdk/integrations/vanilla/) integration

<Microlink url='https://www.theverge.com/2016/4/1/11342104/tesla-model-3-announcement-photos' size='large' />

In case you want to customize the style, it should be done using [CSS Classnames](/docs/sdk/getting-started/considerations/#css-classnames).
