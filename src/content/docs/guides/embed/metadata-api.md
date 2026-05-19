---
title: 'Embed: Metadata API with custom HTML/CSS'
description: 'Build link previews entirely in your own markup. Use the Microlink metadata API to fetch normalized fields, then style them with custom HTML and CSS to match your design system.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

When the SDK is too opinionated and the iframe parameter is too provider-specific, you can render previews entirely from your own markup. The metadata API gives you the raw fields — title, description, image, logo, palette — and you decide everything else.

This is the right path when:

- You need previews to match an existing design system exactly.
- You want server-rendered HTML with no client-side JavaScript.
- You're embedding inside an email, RSS feed, or static site generator.
- You need to A/B test layouts without changing your data layer.

Want ready-made layouts to paste into Cursor or Claude Code? See <Link href='/docs/guides/embed/custom-previews-with-ai' children='generate custom previews with AI' /> — six recipes (hero card, one-line, tweet-style, telegram-style, notification, chat bubble) built on the same payload this page documents.

## The minimum metadata call

A bare metadata request returns everything most previews need:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://stripe.com' }} />

The response payload looks like this:

```json
"data": {
  "title": "Stripe | Financial Infrastructure to Grow Your Revenue",
  "description": "Stripe is a financial services platform that helps all types of businesses accept payments, build flexible billing models, and manage money movement.",
  "url": "https://stripe.com/",
  "publisher": "stripe.com",
  "lang": "en",
  "image": {
    "url": "https://images.stripeassets.com/fzn2n1nzq965/XtX984S1GJVsVOXFC7kMu/01988281e867728dfb09aa7793a6e3b9/Stripe.jpg?q=80",
    "type": "jpg",
    "size": 312818,
    "height": 1024,
    "width": 2048,
    "size_pretty": "313 kB"
  },
  "date": "2026-05-19T13:38:48.000Z",
  "author": "Kurtis Moyer, Lead Product Manager of Payments, Mindbody",
  "logo": {
    "url": "https://images.stripeassets.com/fzn2n1nzq965/4vVgZi0ZMoEzOhkcv7EVwK/8cce6fdcf2733b2ec8e99548908847ed/favicon.png?w=180&h=180",
    "type": "png",
    "size": 3143,
    "height": 180,
    "width": 180,
    "size_pretty": "3.14 kB"
  }
},
```

<Figcaption>The default response includes <code>title</code>, <code>description</code>, <code>image</code>, <code>logo</code>, <code>publisher</code>, and <code>url</code>.</Figcaption>

Read those fields directly from `data` and pass them into your template. No SDK install, no script tag, no iframe.

## Render a custom card from JSON

Fetch the metadata server-side, then render whatever HTML you want:

```js
import mql from '@microlink/mql'

export async function renderCard (url) {
  const { data } = await mql(url)

  return `
    <a class="link-card" href="${data.url}" rel="noopener noreferrer">
      <img class="link-card__image" src="${data.image.url}" alt="" loading="lazy" />
      <div class="link-card__body">
        <span class="link-card__publisher">${data.publisher ?? ''}</span>
        <h3 class="link-card__title">${data.title}</h3>
        <p class="link-card__description">${data.description ?? ''}</p>
      </div>
    </a>
  `
}
```

Pair it with a stylesheet — no framework required:

```css
.link-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  background: #fff;
}

.link-card__image { width: 100%; height: 100%; object-fit: cover; }
.link-card__body { padding: 16px; }
.link-card__publisher { font-size: 11px; text-transform: uppercase; color: #6b7280; }
.link-card__title { margin: 6px 0 4px; font-size: 16px; font-weight: 700; }
.link-card__description {
  font-size: 13px;
  color: #4b5563;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

The same data can power any layout. See <Link href='/docs/guides/embed/custom-previews-with-ai' children='generate custom previews with AI' /> for ready-made recipes (one-line, hero, tweet-style, notification, chat bubble).

## Direct embed — no JSON parsing

If you only need a single asset URL (the image, the logo, the screenshot), use `embed` to make the API URL behave like that asset:

```html
<img
  src="https://api.microlink.io?url=https://stripe.com&embed=image.url"
  alt="Stripe"
  loading="lazy"
/>
```

The same trick works for the logo:

```html
<img src="https://api.microlink.io?url=https://stripe.com&embed=logo.url" alt="" />
```

Or a real screenshot when `og:image` is missing or low-quality:

```html
<img
  src="https://api.microlink.io?url=https://stripe.com&screenshot&meta=false&embed=screenshot.url"
  alt="Stripe homepage"
/>
```

See the <Link href='/docs/api/parameters/embed' children='embed reference' /> for every supported field. The dot notation (`screenshot.url`, `image.url`, `logo.url`, `pdf.url`, `video.url`) follows the response payload.

## Open Graph and social cards

A common production use case — generate dynamic OG images for any page:

```html
<meta
  property="og:image"
  content="https://api.microlink.io?url=https://your-site.com/blog/post&screenshot&meta=false&embed=screenshot.url"
/>
<meta
  name="twitter:image"
  content="https://api.microlink.io?url=https://your-site.com/blog/post&screenshot&meta=false&embed=screenshot.url"
/>
```

Every share on Twitter, Slack, Discord, or LinkedIn now gets a fresh capture of the page. Combined with <Link href='/docs/guides/embed/caching-and-performance' children='caching' />, those images are served from the edge instead of regenerating per share.

## Add brand colors with palette

For UI that adapts to each link's brand, request `palette: true`:

<MultiCodeEditorInteractive height={260} mqlCode={{
  url: 'https://stripe.com',
  palette: true
}} />

<Figcaption>Each image and logo gets <code>palette</code>, <code>background_color</code>, <code>color</code>, and <code>alternative_color</code> fields with WCAG-aware contrast.</Figcaption>

Use those fields directly:

```js
const { data } = await mql('https://stripe.com', { palette: true })

card.style.background = data.image.background_color
card.style.color = data.image.color
card.querySelector('.accent-bar').style.background = data.image.palette[0]
```

See the <Link href='/docs/api/parameters/palette' children='palette reference' /> for details.

## Filter the JSON response

If you only need a few fields, `filter` reduces the payload to exactly those:

<MultiCodeEditorInteractive height={210} mqlCode={{
  url: 'https://stripe.com',
  filter: 'title,description,image.url,logo.url'
}} />

<Figcaption>Useful for high-volume preview pipelines where every byte over the wire counts.</Figcaption>

See the <Link href='/docs/api/parameters/filter' children='filter reference' /> for dot-notation rules.

## Keep credentials safe in markup

The `embed` URL is publicly visible in HTML, CSS, and `<meta>` tags. Never put an API key, cookie, or proxy URL into a public embed:

- For unauthenticated targets, use the free `https://api.microlink.io` endpoint.
- For authenticated targets, render the URL **server-side** and fetch the asset through your own backend, or front it with <Link href='https://github.com/microlinkhq/proxy' children='@microlink/proxy' /> / <Link href='https://github.com/microlinkhq/edge-proxy' children='@microlink/edge-proxy' />.

For the full security model, see <Link href='/docs/guides/embed/private-pages-and-proxy' children='private pages and proxy' />.

## Choose between metadata API and the other approaches

| If you need | Use |
|-------------|-----|
| Server-rendered HTML, no client-side JS, full control | Metadata API + custom HTML/CSS (this page) |
| Pre-built layouts and prompts to feed your AI coding assistant | <Link href='/docs/guides/embed/custom-previews-with-ai' children='Generate custom previews with AI' /> |
| A drop-in component with fetching, lazy-loading, and theming built in | <Link href='/docs/guides/embed/sdk' children='SDK' /> |
| The provider's interactive player (real YouTube embed, Spotify track) | <Link href='/docs/guides/embed/iframe' children='iframe parameter' /> |

Mixing them is fine — the metadata API powers all four.

## Next step

If you'd rather have your AI assistant write the markup so it matches your existing design system, see <Link href='/docs/guides/embed/custom-previews-with-ai' children='generate custom previews with AI' />.
