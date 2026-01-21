---
title: 'embed'
description: 'Return a specific data field directly as the response body with appropriate content-type headers. Embed screenshots, PDFs, or extracted data directly in HTML, CSS, or Markdown.'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'
import { Type } from 'components/markdown/Type'
import { mqlCode } from 'helpers/mql-code'

Type: <Type children='<string>'/>

It returns the specified data field as response over the target [url](/docs/api/parameters/url), mimicking the same headers and body of the original resource.

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://news.ycombinator.com/item?id=13713480', {
    screenshot: true, 
    embed: 'screenshot.url'
  })}
/>

<Figcaption children='You can use dot notation to reference a nested data field of the response payload.' />

## Why Use Embed

The embed parameter transforms Microlink API from a JSON endpoint into a direct asset server. Instead of receiving JSON and parsing it with JavaScript, you get the actual resource (image, PDF, etc.) that can be used directly in:

- HTML `<img>` tags
- CSS `background-image` properties
- Markdown image syntax
- Open Graph meta tags

## HTML Integration

Embed screenshots directly in your HTML markup:

```html
<img 
  src="https://api.microlink.io/?url=https%3A%2F%2Fnews.ycombinator.com%2Fitem%3Fid%3D13713480&meta=false&screenshot=&embed=screenshot.url" 
  alt="Hacker News"
>
```

And it will be rendered as an external image:

![](/images/embed.jpeg)

## CSS Integration

Use embedded URLs directly in stylesheets:

```css
.hero-background {
  background-image: url(/images/image-1.png);
  background-size: cover;
}
```

![Website Preview](/images/image-1.png)

## Markdown Integration

Embed in any Markdown document:

```md
![Website Preview](/images/image-1.png)
```

![Website Preview](/images/image-1.png)

## Common Embed Fields

| Field            | Description                | Use case                 |
|------------------|----------------------------|--------------------------|
| `screenshot.url` | Screenshot image URL       | Social cards, previews   |
| `pdf.url`        | Generated PDF URL          | Document downloads       |
| `image.url`      | Primary image URL          | Link previews            |
| `logo.url`       | Website logo URL           | Brand displays           |
| `video.url`      | Video source URL           | Media embeds             |


## Combining with Other Parameters

Embed works well with other parameters for customized output:

<MultiCodeEditorInteractive 
  mqlCode={mqlCode('https://microlink.io', {
    screenshot: true,
    device: 'iPhone X',
    embed: 'screenshot.url'
  })}
/>

<Figcaption children="Generate and embed a mobile screenshot directly." />

## Open Graph Images

A common use case is generating dynamic Open Graph images:

```html
<meta property="og:image" content="https://api.microlink.io/?url=https://your-site.com/blog/post&screenshot=true&meta=false&embed=screenshot.url">
```

## Security Considerations

To authenticate requests securely when using embed in client-side code, use [proxy](https://github.com/microlinkhq/proxy) and [edge-proxy](https://github.com/microlinkhq/edge-proxy) to protect your API credentials.

Read more about that at the [authentication](/docs/api/basics/authentication) section.
