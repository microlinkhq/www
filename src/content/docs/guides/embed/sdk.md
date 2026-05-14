---
title: 'Embed: SDK'
description: 'The Microlink SDK turns any URL into a preview card or interactive iframe with one drop-in component. Available for React, Vue, and vanilla JavaScript, under 10KB, framework-agnostic.'
---

import { Microlink } from 'components/markdown/Microlink'
import { Link } from 'components/elements/Link'

The SDK is the fastest way to embed any URL: drop one component into your markup, pass a `url`, and get a live preview. It handles the API call, lazy-loading, the iframe-vs-card choice, and CSS theming.

Pick the SDK when you want something rendered today with zero markup decisions. If you would rather render previews yourself, see <Link href='/docs/guides/embed/metadata-api' children='metadata API with custom HTML/CSS' />. If you only need the provider's native player, see <Link href='/docs/guides/embed/iframe' children='iframe parameter' />.

## Quick start

#### React

```bash
npm install @microlink/react styled-components
```

```jsx
import Microlink from '@microlink/react'

<Microlink url='https://stripe.com' />
```

<Microlink url='https://stripe.com' />

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

The vanilla integration is selector-driven — pass any CSS selector and the SDK replaces matching elements with previews.

For the full per-integration reference, see <Link href='/docs/sdk/integrations/react' children='React' />, <Link href='/docs/sdk/integrations/vue' children='Vue' />, and <Link href='/docs/sdk/integrations/vanilla' children='Vanilla' />.

## Card or iframe — your call

The single embed-relevant decision the SDK adds is the `media` prop. Toggle it to switch between a static rich card and the provider's interactive iframe:

```jsx
// Static card — cheaper to render, better for long-scrolling pages
<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' media='image' />

// Real YouTube player
<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' media='iframe' />
```

<Microlink url='https://www.youtube.com/watch?v=9P6rdqiybaw' media='iframe' />

`media` also accepts an array describing a fallback cascade:

```jsx
<Microlink
  url='...'
  media={['iframe', 'video', 'audio', 'image', 'logo']}
/>
```

The SDK picks the first field that exists in the response — so one component handles YouTube, Spotify, GitHub READMEs, and plain articles without branching. See the <Link href='/docs/sdk/parameters/media' children='media reference' />.

## Everything else lives in the SDK reference

Every Microlink API parameter works as an SDK prop, and the SDK adds a few of its own:

| Prop | What it does | Reference |
|------|--------------|-----------|
| `apiKey` | Authenticate requests for Pro features | <Link href='/docs/sdk/parameters/api-key' children='apiKey' /> |
| `lazy` | Defer the API call until the card is in view (default `true`) | <Link href='/docs/sdk/parameters/lazy' children='lazy' /> |
| `setData` / `fetchData` | Skip the runtime fetch when you already have the metadata (SSR, build-time crawls) | <Link href='/docs/sdk/parameters/set-data' children='setData' /> |
| `size`, `contrast`, `direction` | Visual layout knobs | <Link href='/docs/sdk/parameters/size' children='size' /> |
| Any API parameter (`screenshot`, `iframe`, `palette`, `meta`, ...) | Forwarded to the API call | <Link href='/docs/api/getting-started/overview' children='API parameters' /> |

For the full prop list and styling (CSS variables, BEM classes, `styled-components` wrappers), see the <Link href='/docs/sdk/getting-started/overview' children='SDK overview' /> and <Link href='/docs/sdk/getting-started/styling' children='SDK styling' />.

## Choose between SDK and the other approaches

| If you want | Use |
|-------------|-----|
| A drop-in component, no boilerplate | SDK (this page) |
| Pre-built layouts and AI prompts to match your design system | <Link href='/docs/guides/embed/custom-previews-with-ai' children='Generate custom previews with AI' /> |
| Full control over markup, server-rendered HTML, no client JS | <Link href='/docs/guides/embed/metadata-api' children='Metadata API + custom HTML' /> |
| Just the provider's native player or widget | <Link href='/docs/guides/embed/iframe' children='iframe parameter' /> |

You can mix them: use the SDK for inline links inside posts and a custom HTML hero for the article header. They share the same underlying API.

## Next step

If you'd rather skip the SDK and have your AI coding assistant generate previews styled to your project, see <Link href='/docs/guides/embed/custom-previews-with-ai' children='generate custom previews with AI' />.
