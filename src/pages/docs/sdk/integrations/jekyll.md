---
title: 'Jekyll'
---

The Jekyll integration is pretty similar to the [Vanilla](/docs/sdk/integrations/vanilla/) approach.

Just you need to be sure to load the script. A good place to put it is `_layouts/default.html`:


```html
<script src="//cdn.jsdelivr.net/npm/@microlink/vanilla@latest/umd/microlink.min.js"></script>

<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    microlink('.card-preview')
  });
</script>
```

In the code above, we are associating microlink cards with the class name `card-preview`. 

So now, when we write a new jekyll post, we are going to associate `card-preview` class name with the links we want to convert into previews.

```markdown
[](https://www.theverge.com/2016/4/1/11342104/tesla-model-3-announcement-photos){:.card-preview}
```

Then the link will be rendered as 

<Microlink url='https://www.theverge.com/2016/4/1/11342104/tesla-model-3-announcement-photos' />

You can pass any [API Parameter](/docs/api/getting-started/overview) as a `data-*` field.

```markdown
[](https://www.theverge.com/2016/4/1/11342104/tesla-model-3-announcement-photos){:.card-preview data-size="large"}
```

It's the equivalent to passing `{size: 'large'}` with the [Vanilla](/docs/sdk/integrations/vanilla/) integration.

<Microlink url='https://www.theverge.com/2016/4/1/11342104/tesla-model-3-announcement-photos' size='large' />

If you want to customize the style, it can be done using [CSS Classnames](/docs/sdk/getting-started/considerations/#css-classnames).
