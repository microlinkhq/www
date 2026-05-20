---
title: 'Embed: Generate custom previews with AI'
description: 'Skip the SDK and ship link previews styled to your project. Use the Microlink metadata API for the data and let Cursor, Claude Code, or any AI coding assistant generate the markup that matches your existing design system.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import {
  HeroCard,
  OneLineCard,
  TelegramCard,
  TweetCard,
  NotificationCard,
  ChatBubbleCard
} from 'components/pages/embed'

This guide builds on the <Link href='/docs/guides/embed/metadata-api' children='metadata API approach' /> — fetch the JSON, then let your AI coding assistant write the markup that matches your design system. No new dependency, no `<Microlink>` wrapper to override, no CSS reset to fight — just a card built from your own components and tokens.

This page covers the prompts to paste into Cursor, Claude Code, ChatGPT, or any agent embedded in your IDE — and the style recipes you can ask it to adapt.

## The payload your assistant will work with

The same metadata response powers every recipe below. Show it to your assistant once:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://stripe.com' }} />

<Figcaption>For the full field list, <code>palette</code>, <code>screenshot</code>, <code>filter</code>, and the security model, see <Link href='/docs/guides/embed/metadata-api' children='metadata API with custom HTML/CSS' />.</Figcaption>

## Why prompt your assistant instead of using the SDK

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

Rendered with `stripe.com` as the source:

<HeroCard />

<Figcaption>The shape your assistant should produce — image at the top, publisher + title + clamped description below.</Figcaption>

### One-line

Compact, scannable, and fits inside dense layouts. Good for search results, footnotes, and sidebars.

> **Prompt to send:**
> *"Generate a one-line preview using the contract above. Logo, publisher (bold), title (truncated), and the bare hostname on the right, all on a single row. Reuse the row primitives we already have for list items in this project."*

Rendered with `stripe.com` as the source:

<OneLineCard />

<Figcaption>Logo, publisher, title, and hostname collapsed to a single dense row.</Figcaption>

### Tweet-style

Vertical card with image-on-top, big title, big description — fits social-feed clones, comment threads, and replies.

> **Prompt to send:**
> *"Generate a tweet-style preview using the contract above. Round avatar from logo at the top with publisher and a fake @handle from the hostname, then the title as the post body, then a rounded media image. Use the radii and avatar utilities we already have."*

Rendered with `stripe.com` as the source:

<TweetCard />

<Figcaption>Avatar + @handle header, post body, embedded link card, action bar — the full embedded-tweet shape.</Figcaption>

### Telegram-style

A quoted reply with a colored accent bar pulled from the source's brand palette. Each card adapts to the link.

> **Prompt to send:**
> *"Generate a telegram-style preview using the contract above. Add `palette: true` to the metadata request so I get brand colors. Use a vertical accent bar on the left, colored with `data.image.palette[0]`, and tint the publisher line with the same color. Make sure the contrast pair (`background_color` + `color`) is respected for readability."*

Rendered with `stripe.com` as the source:

<TelegramCard />

<Figcaption>Accent bar pulled from <code>data.image.palette[0]</code> — every link automatically tints itself to the source brand.</Figcaption>

This recipe needs `palette: true`. See <Link href='/docs/api/parameters/palette' children='palette reference' />.

### Notification

Short, glanceable item designed for activity feeds, toasts, and push-style components.

> **Prompt to send:**
> *"Generate a notification-style preview using the contract above. A small logo on the left, title and publisher in the middle, and a primary-colored 'Open' link on the right. Reuse the toast / activity-row component we already have."*

Rendered with `stripe.com` as the source:

<NotificationCard />

<Figcaption>iOS-style notification — logo, publisher + timestamp, then the link title and a short description.</Figcaption>

### Chat bubble

Inline, conversational citation — the right pattern for AI chat products and comment threads.

> **Prompt to send:**
> *"Generate a chat-bubble citation using the contract above. A short text line referencing the publisher, then a pill-shaped link with a tiny logo and the title (truncated). Match the chat bubble we already render for AI responses in this project."*

Rendered with `stripe.com` as the source:

<ChatBubbleCard />

<Figcaption>WhatsApp-style bubble with an embedded link card and a clickable URL line — drop it into a chat thread as-is.</Figcaption>

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
