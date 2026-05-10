---
title: 'Embed: Generate custom previews with AI'
description: 'Skip the SDK and ship link previews styled to your project. Use the Microlink metadata API for the data and let Cursor, Claude Code, or any AI coding assistant generate the markup that matches your existing design system.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'

The fastest way to add link previews that **match the rest of your app** is to skip the SDK, fetch the data with the metadata API, and let your AI coding assistant write the markup. No new dependency, no `<Microlink>` wrapper to override, no CSS reset to fight — just a card built from your own components and tokens.

This guide shows the prompts to paste into Cursor, Claude Code, ChatGPT, or any agent embedded in your IDE — and the style recipes you can ask it to adapt.

## The data your assistant will use

Every preview in this guide is built from the same payload:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://stripe.com' }} />

<Figcaption>The default response already includes <code>title</code>, <code>description</code>, <code>image</code>, <code>logo</code>, <code>publisher</code>, and the canonical <code>url</code>. Add <code>palette: true</code> for brand colors.</Figcaption>

Show this shape to your assistant once. From that point it can map the fields to whatever component, design tokens, or utility classes your project already uses.

## Why prompt your assistant instead of using the SDK

| If you want | Pick |
|-------------|------|
| Markup that uses *your* components, tokens, and Tailwind/CSS modules | This page (metadata API + AI prompt) |
| A drop-in component with built-in fetching, lazy-loading, and theming | <Link href='/docs/guides/embed/sdk' children='SDK' /> |
| The provider's native interactive player or widget | <Link href='/docs/guides/embed/iframe' children='iframe parameter' /> |

The benefits of the prompt-driven path:

- **No bundle cost.** No SDK install, no peer dependencies (`react`, `react-dom`, `styled-components`).
- **Matches your design system exactly.** Your assistant already knows your tokens, components, and conventions — let it use them.
- **Server-renderable.** The result is plain HTML/JSX, so it works in SSR, RSC, static sites, emails, and Markdown.
- **Easy to evolve.** When the design system changes, regenerate the card with the same prompt — no SDK upgrade dance.

## The base prompt

Paste this into Cursor, Claude Code, or your IDE's AI assistant before asking for a specific style. It establishes the contract once.

```text
I want to add link previews to this project without installing the
Microlink SDK. Instead, fetch the metadata directly from the API:

  GET https://api.microlink.io?url=<TARGET_URL>

The response is JSON with `data` containing at least:
  - data.title         (string)
  - data.description   (string)
  - data.publisher     (string)
  - data.url           (string, canonical)
  - data.image.url     (string, og:image)
  - data.logo.url      (string, favicon / brand mark)
  - data.author        (string | null)

Generate a preview component that:

  1. Reads those fields from `data`.
  2. Uses *this project's* design system — same components, tokens,
     spacing, typography, and theming primitives I already use here.
     Do not invent new design tokens. Do not use inline styles when
     the project already has CSS modules / Tailwind / styled-components.
  3. Handles the case where image, logo, description, or publisher
     are missing — render a graceful fallback, never a broken `<img>`.
  4. Stays accessible: anchor wraps the whole card with `rel="noopener
     noreferrer"`, decorative images use empty alt, the title is a
     real heading.

When I ask for a specific style (hero card, one-line, chat bubble,
tweet-style, notification, telegram-style), apply that layout while
keeping the rules above.
```

The prompt is intentionally framework-agnostic. Your assistant adapts it to React + Tailwind, Vue + CSS modules, Astro, Svelte, plain HTML — whatever the open project is using.

## Pick a style and ask for it

Each section below describes the layout, when it fits, the prompt to send, and a reference output. The reference is a starting point — your assistant should rewrite it in your project's idioms.

### Hero card

A full-bleed image with publisher, title, and description below. Best when the link is the focus of the section.

> **Prompt to send:**
> *"Generate a hero-style preview using the contract above. Image fills the top with a 16:9 ratio, then publisher (with logo), title, and a 3-line clamped description below. Match the card chrome and elevation we already use for other content cards in this project."*

Reference output:

```html
<a class="card" href="${data.url}" rel="noopener noreferrer">
  <img class="card__media" src="${data.image.url}" alt="" />
  <div class="card__body">
    <div class="card__meta">
      <img class="card__logo" src="${data.logo.url}" alt="" />
      <span class="card__publisher">${data.publisher}</span>
    </div>
    <h3 class="card__title">${data.title}</h3>
    <p class="card__description">${data.description}</p>
  </div>
</a>
```

```css
.card {
  display: block;
  max-width: 460px;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}
.card__media { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
.card__body { padding: 14px 16px; }
.card__meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.card__logo { width: 16px; height: 16px; border-radius: 4px; }
.card__publisher { font-size: 11px; font-weight: 700; color: #6b7280; letter-spacing: 1px; text-transform: uppercase; }
.card__title { margin: 0 0 4px; font-size: 16px; font-weight: 700; line-height: 1.3; }
.card__description {
  margin: 0; font-size: 13px; color: #4b5563; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
```

### One-line

Compact, scannable, and fits inside dense layouts. Good for search results, footnotes, and sidebars.

> **Prompt to send:**
> *"Generate a one-line preview using the contract above. Logo, publisher (bold), title (truncated), and the bare hostname on the right, all on a single row. Reuse the row primitives we already have for list items in this project."*

Reference output:

```html
<a class="oneline" href="${data.url}" rel="noopener noreferrer">
  <img class="oneline__logo" src="${data.logo.url}" alt="" />
  <span class="oneline__publisher">${data.publisher}</span>
  <span class="oneline__title">${data.title}</span>
  <span class="oneline__host">${new URL(data.url).hostname}</span>
</a>
```

```css
.oneline {
  display: flex; align-items: center; gap: 10px; max-width: 460px;
  padding: 10px 14px; border: 1px solid #e1e8ed; border-radius: 10px;
  background: #fff; text-decoration: none; color: inherit; font-size: 13px;
}
.oneline__logo { width: 20px; height: 20px; border-radius: 4px; flex-shrink: 0; }
.oneline__publisher { font-weight: 700; color: #111; flex-shrink: 0; }
.oneline__title { color: #4b5563; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; min-width: 0; }
.oneline__host { font-family: ui-monospace, monospace; font-size: 12px; color: #9ca3af; flex-shrink: 0; }
```

### Tweet-style

Vertical card with image-on-top, big title, big description — fits social-feed clones, comment threads, and replies.

> **Prompt to send:**
> *"Generate a tweet-style preview using the contract above. Round avatar from logo at the top with publisher and a fake @handle from the hostname, then the title as the post body, then a rounded media image. Use the radii and avatar utilities we already have."*

Reference output:

```html
<article class="tweet">
  <header class="tweet__header">
    <img src="${data.logo.url}" alt="" class="tweet__avatar" />
    <div>
      <div class="tweet__author">${data.publisher}</div>
      <div class="tweet__handle">@${new URL(data.url).hostname.split('.')[0]}</div>
    </div>
  </header>
  <p class="tweet__title">${data.title}</p>
  <img class="tweet__media" src="${data.image.url}" alt="" />
</article>
```

```css
.tweet { max-width: 460px; padding: 14px 16px; border: 1px solid #e1e8ed; border-radius: 16px; background: #fff; }
.tweet__header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.tweet__avatar { width: 40px; height: 40px; border-radius: 50%; }
.tweet__author { font-weight: 700; }
.tweet__handle { font-size: 13px; color: #6b7280; }
.tweet__title { font-size: 15px; line-height: 1.4; margin: 0 0 12px; }
.tweet__media { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 12px; display: block; }
```

### Telegram-style

A quoted reply with a colored accent bar pulled from the source's brand palette. Each card adapts to the link.

> **Prompt to send:**
> *"Generate a telegram-style preview using the contract above. Add `palette: true` to the metadata request so I get brand colors. Use a vertical accent bar on the left, colored with `data.image.palette[0]`, and tint the publisher line with the same color. Make sure the contrast pair (`background_color` + `color`) is respected for readability."*

Reference output:

```html
<a class="telegram" href="${data.url}" rel="noopener noreferrer"
   style="--accent: ${data.image.palette[0]}">
  <span class="telegram__bar"></span>
  <div class="telegram__body">
    <div class="telegram__publisher">${data.publisher}</div>
    <div class="telegram__title">${data.title}</div>
    <p class="telegram__description">${data.description}</p>
  </div>
</a>
```

```css
.telegram {
  position: relative; display: block; max-width: 380px;
  padding: 12px 14px 12px 22px; border: 1px solid #e1e8ed; border-radius: 18px;
  background: #fff; text-decoration: none; color: inherit;
}
.telegram__bar { position: absolute; left: 12px; top: 14px; bottom: 14px; width: 3px; border-radius: 2px; background: var(--accent); }
.telegram__publisher { font-size: 13px; font-weight: 700; color: var(--accent); }
.telegram__title { font-size: 14px; font-weight: 600; margin: 2px 0 4px; }
.telegram__description { font-size: 13px; color: #4b5563; margin: 0; }
```

This recipe needs `palette: true`. See <Link href='/docs/api/parameters/palette' children='palette reference' />.

### Notification

Short, glanceable item designed for activity feeds, toasts, and push-style components.

> **Prompt to send:**
> *"Generate a notification-style preview using the contract above. A small logo on the left, title and publisher in the middle, and a primary-colored 'Open' link on the right. Reuse the toast / activity-row component we already have."*

Reference output:

```html
<div class="note">
  <img class="note__logo" src="${data.logo.url}" alt="" />
  <div class="note__body">
    <div class="note__title">${data.title}</div>
    <div class="note__publisher">${data.publisher}</div>
  </div>
  <a class="note__cta" href="${data.url}" rel="noopener noreferrer">Open</a>
</div>
```

```css
.note {
  display: flex; align-items: center; gap: 12px; max-width: 420px;
  padding: 12px 14px; border: 1px solid #e1e8ed; border-radius: 14px;
  background: #fff; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
.note__logo { width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0; }
.note__body { flex: 1; min-width: 0; }
.note__title { font-size: 14px; font-weight: 600; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.note__publisher { font-size: 12px; color: #6b7280; }
.note__cta { font-size: 13px; font-weight: 600; color: #2563eb; text-decoration: none; flex-shrink: 0; }
```

### Chat bubble

Inline, conversational citation — the right pattern for AI chat products and comment threads.

> **Prompt to send:**
> *"Generate a chat-bubble citation using the contract above. A short text line referencing the publisher, then a pill-shaped link with a tiny logo and the title (truncated). Match the chat bubble we already render for AI responses in this project."*

Reference output:

```html
<div class="bubble">
  <p class="bubble__text">According to <a href="${data.url}">${data.publisher}</a>:</p>
  <a class="bubble__source" href="${data.url}" rel="noopener noreferrer">
    <img class="bubble__logo" src="${data.logo.url}" alt="" />
    <span class="bubble__title">${data.title}</span>
  </a>
</div>
```

```css
.bubble { max-width: 480px; padding: 12px 14px; border-radius: 14px; background: #f3f4f6; }
.bubble__text { margin: 0 0 8px; font-size: 14px; }
.bubble__source {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 10px; border: 1px solid #e1e8ed; border-radius: 999px;
  background: #fff; text-decoration: none; color: inherit; font-size: 13px;
}
.bubble__logo { width: 14px; height: 14px; border-radius: 3px; }
.bubble__title { max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

## Wire it up

Once your assistant has generated the markup, you only need a minimal data-fetching helper. Drop one of these into the project and the preview is ready to render.

#### Server / RSC / build-time

```js
import mql from '@microlink/mql'

export async function getPreview (url, options = {}) {
  const { data } = await mql(url, { palette: true, ...options })
  return data
}
```

```jsx
// app/components/LinkPreview.tsx (Next.js RSC example)
import { getPreview } from '@/lib/preview'

export async function LinkPreview ({ url }) {
  const data = await getPreview(url)
  return /* the JSX your assistant generated, reading from `data` */
}
```

#### Client-side

```jsx
import { useEffect, useState } from 'react'

export function useLinkPreview (url) {
  const [data, setData] = useState(null)
  useEffect(() => {
    let cancelled = false
    fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}&palette=true`)
      .then(r => r.json())
      .then(json => { if (!cancelled && json.status === 'success') setData(json.data) })
    return () => { cancelled = true }
  }, [url])
  return data
}
```

#### Direct from HTML

For static sites, README files, or markdown — skip the JSON entirely and use direct embed:

```html
<img src="https://api.microlink.io?url=https://stripe.com&embed=image.url" alt="Stripe" />
```

See the <Link href='/docs/api/parameters/embed' children='embed reference' /> for the full field list.

## Theming with palette

Ask your assistant to make any recipe brand-aware once `palette: true` is on. The pattern:

```js
const { data } = await mql(url, { palette: true })

card.style.setProperty('--brand', data.image.background_color)
card.style.setProperty('--brand-text', data.image.color)
card.style.setProperty('--brand-accent', data.image.palette[0])
```

The contrast pair (`background_color` + `color`) is WCAG-checked, so foreground text stays readable. See <Link href='/docs/api/parameters/palette' children='palette reference' />.

## When `og:image` is missing

Some pages don't expose a usable image. Tell your assistant to fall back to a real screenshot:

```js
const { data } = await mql(url, { screenshot: true, palette: true })
const heroImage = data.image?.url ?? data.screenshot.url
```

Or use `embed=screenshot.url` directly inside an `<img src>`. See the <Link href='/docs/guides/screenshot' children='screenshot guide' />.

## Iterate with your assistant

The recipes above are starting points. Once the first card is in your codebase, ask your assistant for variations without repeating the contract:

- *"Make the hero card horizontal, image on the left, content on the right."*
- *"Tighten the one-line variant for our sidebar — drop the description and switch to our `--text-xs` token."*
- *"Add a hover state matching how our other clickable cards lift on hover."*
- *"Animate the entry with the same enter transition we use on toasts."*

Because the AI is editing files in your repo, it can reuse hooks, mixins, utility classes, and component composition you already have — so the previews stay coherent as the codebase evolves.

## Next step

For optimizing repeat embed calls (especially when an AI agent fans out across many URLs), see <Link href='/docs/guides/embed/caching-and-performance' children='caching and performance' />.
