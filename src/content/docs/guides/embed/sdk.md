---
title: 'Embed: SDK'
description: 'The Microlink SDK turns any URL into a beautiful preview card or interactive iframe with one drop-in component. Available for React, Vue, and vanilla JavaScript, under 10KB, framework-agnostic.'
---

import { Microlink } from 'components/markdown/Microlink'
import { Link } from 'components/elements/Link'

The SDK is the fastest way to embed any URL: drop one component into your markup, pass a `url`, and get a live preview. It handles the API call, lazy-loading, the iframe-vs-card choice, and CSS theming.

If you would rather render previews yourself, see <Link href='/docs/guides/embed/metadata-api' children='metadata API with custom HTML/CSS' />. If you only need the provider's native player, see <Link href='/docs/guides/embed/iframe' children='iframe parameter' />.

## Quick start

#### React

```bash
npm install @microlink/react styled-components
```

```jsx
import Microlink from '@microlink/react'

<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' />
```

<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' />

#### Vue

```bash
npm install @microlink/vue
```

```vue
<template>
  <Microlink url="https://www.youtube.com/watch?v=9P6rdqiybaw" />
</template>

<script>
import { Microlink } from '@microlink/vue'
export default { components: { Microlink } }
</script>
```

#### Vanilla / CDN

```html
<script src="https://cdn.jsdelivr.net/combine/npm/react@16/umd/react.production.min.js,npm/react-dom@16/umd/react-dom.production.min.js,npm/react-is@16/umd/react-is.production.min.js,npm/styled-components@5/dist/styled-components.min.js,npm/@microlink/mql@latest/dist/mql.min.js,npm/@microlink/vanilla@5/dist/microlink.min.js"></script>

<a class="link-preview" href="https://www.youtube.com/watch?v=9P6rdqiybaw"></a>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    microlink('.link-preview', { size: 'large' })
  })
</script>
```

The vanilla integration is selector-driven — pass any CSS selector and the SDK replaces matching elements with previews. Pass options globally via the second argument, or per-element using `data-*` attributes.

The full reference for each integration lives in <Link href='/docs/sdk/integrations/react' children='React' />, <Link href='/docs/sdk/integrations/vue' children='Vue' />, and <Link href='/docs/sdk/integrations/vanilla' children='Vanilla' />.

## Card or iframe — your call

Toggle the `media` prop to switch between a static rich card and the provider's interactive iframe:

```jsx
// Static card — cheaper to render, better for long-scrolling pages
<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' media='image' />

// Real YouTube player
<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' media='iframe' />
```

<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' media='iframe' />

`media` accepts a single value or an array describing a fallback cascade:

```jsx
<Microlink
  url='...'
  media={['iframe', 'video', 'audio', 'image', 'logo']}
/>
```

The SDK picks the first field that exists in the response — so you ship one component that handles YouTube, Spotify, GitHub READMEs, and plain articles without branching. See the <Link href='/docs/sdk/parameters/media' children='media reference' />.

## Pass any API parameter as a prop

Every Microlink API parameter works as an SDK prop. The SDK forwards them to the API call:

```jsx
<Microlink
  url='https://github.com/microlinkhq'
  size='large'
  contrast
  palette
/>
```

That covers <Link href='/docs/sdk/parameters/size' children='size' />, <Link href='/docs/sdk/parameters/contrast' children='contrast' />, <Link href='/docs/sdk/parameters/direction' children='direction' />, and any API parameter — `screenshot`, `iframe`, `meta`, `palette`, `headers`, `proxy`, etc.

For the full prop list, see <Link href='/docs/sdk/getting-started/overview' children='SDK overview' />.

## Authentication

Pass your API key via `apiKey`:

```jsx
<Microlink
  url='https://github.com/microlinkhq'
  apiKey='YOUR_API_TOKEN'
/>
```

For Vue, set the key once when registering the plugin:

```js
import Vue from 'vue'
import Microlink from '@microlink/vue'

Vue.use(Microlink, { apiKey: 'YOUR_API_TOKEN' })
```

The free tier allows 50 requests per day and does not need an API key. See <Link href='/docs/sdk/parameters/api-key' children='apiKey reference' />.

## Lazy load by default

The SDK ships with `lazy={true}` enabled. Each preview triggers its API call only when it scrolls into view, using `IntersectionObserver`. Pass options if you want to start fetching earlier:

```jsx
<Microlink url='...' lazy={{ rootMargin: '200px' }} />
```

Disable it entirely with `lazy={false}` when you need the data immediately. See <Link href='/docs/sdk/parameters/lazy' children='lazy reference' />.

## Skip fetching with setData

If you already have the metadata — from your own backend, a CMS, or a build-time crawl — pass it through `setData` and disable `fetchData`:

```jsx
<Microlink
  url='https://example.com/post'
  fetchData={false}
  setData={{
    title: 'My post',
    description: 'Cached at build time',
    image: { url: '/images/og/post.jpg' },
    publisher: 'My Site'
  }}
/>
```

Useful for static sites and SSR — the API never gets called at runtime. See <Link href='/docs/sdk/parameters/set-data' children='setData reference' /> and <Link href='/docs/sdk/parameters/fetch-data' children='fetchData reference' />.

## Style with CSS variables

The SDK ships minimal default styles. Override them with CSS variables — no fork or wrapper needed:

```css
.microlink_card {
  --microlink-background-color: #fff;
  --microlink-border: 1px solid #e1e8ed;
  --microlink-color: #181919;
  --microlink-hover-background-color: #f5f8fa;
  --microlink-max-width: 500px;
}
```

For deeper customization, target the BEM classes (`microlink_card__content_title`, `microlink_card__media_image`, `microlink_card__media_video`, etc.). The full list lives in <Link href='/docs/sdk/getting-started/styling' children='SDK styling' />.

For React, you can also pass `style` directly:

```jsx
<Microlink
  url='...'
  style={{ fontFamily: 'Inter, sans-serif', maxWidth: '100%' }}
/>
```

Or wrap with `styled-components`:

```jsx
import styled from 'styled-components'

const PreviewCard = styled(Microlink)`
  font-family: 'Inter', sans-serif;
  border-radius: 12px;
  --microlink-max-width: 100%;
`
```

## Choose between SDK and metadata API

| If you want | Use |
|-------------|-----|
| A drop-in component, no boilerplate | SDK (this page) |
| Full control over markup, server-rendered HTML, no client JS | <Link href='/docs/guides/embed/metadata-api' children='Metadata API + custom HTML' /> |
| Just the provider's native player or widget | <Link href='/docs/guides/embed/iframe' children='iframe parameter' /> |

You can mix them: use the SDK for inline links inside posts and a custom HTML hero for the article header. They share the same underlying API.

## Next step

If you'd rather skip the SDK and have your AI coding assistant generate previews styled to your project, see <Link href='/docs/guides/embed/custom-previews-with-ai' children='generate custom previews with AI' />.
