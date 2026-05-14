---
title: 'Embed: iframe parameter'
description: 'Return ready-to-inject embed HTML and scripts from any oEmbed provider. Learn what the iframe field returns, how to inject it, when to use it instead of a custom card, and which providers are supported.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Iframe } from 'components/markdown/Iframe'
import { Link } from 'components/elements/Link'

The `iframe` parameter asks Microlink to discover the provider's official interactive embed for the target URL — a real YouTube player, a Spotify track, a Tweet widget, a Vimeo video. When discovery succeeds, the response includes a new `iframe` field with HTML and any required scripts.

This is the right path when the goal is *the experience the source provides*: playable media, interactive widgets, or anything that is not just a thumbnail and title. If you want a wrapper component that handles the injection for you, see <Link href='/docs/guides/embed/sdk' children='SDK' /> with `media='iframe'`. If you want a styled card built from JSON, see <Link href='/docs/guides/embed/metadata-api' children='metadata API + custom HTML' />.

## What the iframe field returns

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://open.spotify.com/track/3BovdzfaX4jb5KFQwoPfAw',
  iframe: true
}} />

<Iframe
  src="https://open.spotify.com/embed/track/3BovdzfaX4jb5KFQwoPfAw?utm_source=oembed"
  allowFullScreen
/>

<Figcaption>The discovered iframe is rendered above. The response payload contains the markup that produced it.</Figcaption>

The `iframe` object has two subfields:

```json
{
  "iframe": {
    "html": "<iframe width=\"100%\" height=\"152\" src=\"https://open.spotify.com/embed/track/3BovdzfaX4jb5KFQwoPfAw?utm_source=oembed\" ...></iframe>",
    "scripts": []
  }
}
```

- `html` — the markup to inject into the page.
- `scripts` — an array of `{ src, async, charset }` entries that some providers need. Empty for most video and audio providers; populated for Twitter, Instagram, and other widget-based embeds.

## Inject the iframe HTML

The simplest pattern: fetch the data server-side, pass `iframe.html` to the client, and inject it.

#### Vanilla JavaScript

```js
import mql from '@microlink/mql'

const { data } = await mql(url, { iframe: true })

document.getElementById('embed').innerHTML = data.iframe.html

data.iframe.scripts.forEach(({ src, async, charset }) => {
  const script = document.createElement('script')
  script.src = src
  if (async) script.async = true
  if (charset) script.charset = charset
  document.head.appendChild(script)
})
```

The script step is what makes Twitter, Instagram, and similar widgets actually render — without it you get unstyled blockquotes.

#### React

```jsx
import mql from '@microlink/mql'

function ProviderEmbed ({ url }) {
  const [iframe, setIframe] = useState(null)

  useEffect(() => {
    let cancelled = false
    mql(url, { iframe: true }).then(({ data }) => {
      if (cancelled) return
      setIframe(data.iframe)
      data.iframe?.scripts?.forEach(({ src, async }) => {
        const s = document.createElement('script')
        s.src = src
        if (async) s.async = true
        document.head.appendChild(s)
      })
    })
    return () => { cancelled = true }
  }, [url])

  if (!iframe) return null
  return <div dangerouslySetInnerHTML={{ __html: iframe.html }} />
}
```

For React, the SDK already handles this — see <Link href='/docs/guides/embed/sdk' children='SDK' /> and pass `media="iframe"`.

#### Server-side rendering

If you SSR the page, write the HTML and the script tags directly into the response — no client fetch needed:

```js
const { data } = await mql(url, { iframe: true })

res.send(`
  <article>
    <h1>${data.title}</h1>
    ${data.iframe.html}
    ${data.iframe.scripts.map(s => `<script async src="${s.src}"></script>`).join('')}
  </article>
`)
```

## When to use iframe vs SDK vs custom HTML

| If you want | Use |
|-------------|-----|
| The provider's *real* interactive player or widget | iframe parameter (this page) |
| A drop-in component with fetching, lazy-loading, and theming | <Link href='/docs/guides/embed/sdk' children='SDK' /> with `media="iframe"` |
| A static rich card, fully styled by you | <Link href='/docs/guides/embed/metadata-api' children='metadata API + custom HTML' /> |

The SDK and the iframe parameter are not alternatives — the SDK consumes the same `iframe` field internally when you set `media="iframe"`. Pick the SDK if you want the wrapping component to also handle the loading state, lazy-loading, and CSS theming. Pick the raw `iframe` parameter if you want the markup and nothing else.

## Customize the iframe with oEmbed options

The iframe parameter accepts an object that forwards consumer options to the oEmbed endpoint:

<MultiCodeEditorInteractive mqlCode={{
  url: 'https://open.spotify.com/track/3BovdzfaX4jb5KFQwoPfAw',
  iframe: {
    maxWidth: 350
  }
}} />

<Figcaption>Each provider chooses which options it honors. <code>maxWidth</code> and <code>maxHeight</code> are the most widely supported.</Figcaption>

See the <Link href='https://oembed.com/' children='oEmbed specification' /> for the full list of consumer parameters.

## When iframe discovery fails

Not every URL has an oEmbed endpoint. If discovery fails, the `iframe` field is absent from the response — the rest of the metadata is still returned.

Plan your code for both shapes:

```js
const { data } = await mql(url, { iframe: true })

if (data.iframe) {
  container.innerHTML = data.iframe.html
} else {
  // fall back to a custom card built from data.title / data.image / data.description
  container.innerHTML = renderCard(data)
}
```

The full provider list lives in the <Link href='/docs/api/parameters/iframe#providers-supported' children='iframe parameter reference' /> — 280+ providers including YouTube, Spotify, Twitter/X, Vimeo, Instagram, TikTok, Figma, CodeSandbox, CodePen, Reddit, Pinterest, Behance, Dribbble, TED, SoundCloud, and Mixcloud.

## Pair iframe with metadata in one call

You usually want both — the iframe for playback, the metadata for the surrounding card frame:

<MultiCodeEditorInteractive height={300} mqlCode={{
  url: 'https://open.spotify.com/track/3BovdzfaX4jb5KFQwoPfAw',
  iframe: true,
  palette: true
}} />

<Figcaption>One request returns the player, the title and description, the publisher logo, and brand colors — enough to render a full provider-styled card.</Figcaption>

This is also why the SDK works the way it does: it requests `iframe`, `audio`, `video`, `image`, `logo` together and picks the best media available per URL.

## Security and sandboxing

Injecting third-party HTML and scripts is intentional here — that is how the player renders. To reduce blast radius:

- Apply a strict <Link href='https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP' children='Content Security Policy' /> that allowlists only the providers you embed.
- Add `sandbox` to the iframe element if you want to restrict navigation or popups.
- Strip query parameters that could leak referrer data when privacy matters (use the `nocookie` variants where the provider supports them, e.g. `youtube-nocookie.com`).

The HTML returned by Microlink mirrors what the provider hands out via oEmbed, so the security posture is the same as if you embedded the provider directly.

## Next step

For a wrapper component that handles the iframe injection plus loading/lazy/theming for you, see <Link href='/docs/guides/embed/sdk' children='SDK' />.
