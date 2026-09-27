---
title: 'Product brief #3: video and up to 50% faster prerendering'
description: 'Boost your link previews with Microlink video support, auto-prerendering for 50% faster responses, and new SDK features.'
authors:
  - kiko
date: '2018-03-02'
---

import { Link } from 'components/elements/Link'
import { Figcaption } from 'components/markdown/Figcaption'

This release added a `video` field to the [Microlink API](/docs/api/getting-started/overview), made prerendering default to an `auto` mode that sped up responses by up to 50%, and let the Microlink SDK play that video inside its preview cards.

The SDK changes shipped in version **1.7.0**, so you needed that version or above to use them.

## The API detected video sources

![](/images/o8cC1k4.png)

<Figcaption>
  The new video data property in action.{' '}
  <Link
    href='https://api.microlink.io/?url=https://www.amazon.com/dp/B06XCM9LJ4'
    children='Explore'
  />{' '}
  the rest.
</Figcaption>

Video support landed in [metascraper](https://github.com/microlinkhq/metascraper/pull/56), the library that extracts the API's data. From that release on, every API response included a **video** field that pointed to the streaming source detected on the target URL, next to the title, description, and image you already got.

## Auto prerendering answered up to 50% faster

Prerendering retrieves the HTML the way a user's browser would: it loads the page, runs its scripts, and reads the result. That gives better data for pages built on the client, but each request takes longer to respond, and most popular sites serve their metadata without it.

The API therefore switched prerendering to an **auto** value by default. With `auto`, the service decided per target URL whether the page needed the prerendering technique or not, and skipped it when the plain HTML was enough. In our tests, that decision **sped up the process by up to 50%.**

Most of that gain came from work on [browserless](https://browserless.js.org), our library for driving headless Chrome. The [Puppeteer community](https://github.com/GoogleChrome/puppeteer) also helped us track down the performance issues along the way.

## SDK cards played the detected video

![](/images/MkuOzT9.gif)

<Figcaption>
  <Link href='/docs' children='Microlink SDK' /> now supports video
  previsualizations.{' '}
  <Link
    href='https://sdk-react.microlink.io/?selectedKind=Normal&selectedStory=with%20video%20media&full=0&addons=1&stories=1&panelRight=0&addonPanel=kadira%2Fjsx%2Fpanel'
    children='Explore'
  />{' '}
  the rest.
</Figcaption>

Because the API now returned a `video` field, the [SDK](/docs/sdk-legacy/getting-started/overview) placed that streaming source directly into the preview card instead of a static image.

![](https://cdn-images-1.medium.com/max/1440/1*PWDop7s7KmmmvccVbULiyA.gif)

<Figcaption>
  Video support is included for{' '}
  <Link
    href='/docs/sdk-legacy/parameters/size'
    children='normal or large'
  />{' '}
  card sizes.
</Figcaption>

The card also took three playback properties, named `autoplay`, `muted`, and `loop` in the SDK docs:

- **[autoplay](/docs/sdk-legacy/parameters/media/auto-play):** start the video as soon as the card renders.
- **[muted](/docs/sdk-legacy/parameters/media/muted):** play the video without sound.
- **[loop](/docs/sdk-legacy/parameters/media/loop):** restart the video when it ends.

## Cards loaded images smoothly and could flip their layout

![](https://cdn-images-1.medium.com/max/1440/1*FwTUJSw1Vn4g8eC5wzMCkQ.gif)

<Figcaption>
  The loading animation, with credit to{' '}
  <Link href='https://x.com/breadadams' children='@breadadamas' />.
</Figcaption>

The SDK card got a new transition between how it looked before its image and data loaded and how it looked after, which gave the loading state a more *natural* look.

![](/images/qyPAMve.png)

<Figcaption>
  Using the new{' '}
  <Link
    href='/docs/sdk-legacy/parameters/direction'
    children='direction'
  />{' '}
  API parameter to invert the media position in the card.
</Figcaption>

A new field called [reverse](/docs/sdk-legacy/parameters/direction) inverted the orientation of the card's content, placing the media on the opposite side from the text.

## Updating to SDK 1.7.0

The features above required version **1.7.0 or above** of the [Microlink SDK](/docs). You could load it from a CDN or install it from npm.

### From a CDN

The CDN was the quickest way to add the frontend library. You pasted the script for the bundle format you needed (UMD, AMD, or CJS) from unpkg before the closing `<body>` tag:

```js
<script type="text/javascript" src="//unpkg.com/@microlink/vanilla@latest/umd/microlink.min.js"></script>

<!-- Microlink SDK AMD bundle -->
<script type="text/javascript" src="//unpkg.com/@microlink/vanilla@latest/amd/microlink.min.js"></script>

<!-- Microlink SDK CJS bundle -->
<script type="text/javascript" src="//unpkg.com/@microlink/vanilla@latest/cjs/microlink.min.js"></script>`}</PreCode>
```

The [vanilla integration docs](/docs/sdk-legacy/integrations/vanilla) cover the full setup.

### From npm

If your project listed Microlink in its `package.json`, you updated the package from the npm registry instead.

**Vanilla version**

```bash
npm install @microlink/vanilla@latest
```

**React version**

```bash
npm update @microlink/react@latest
```

The [React integration docs](/docs/sdk-legacy/integrations/react) show how to render a card with `@microlink/react` once it is installed.
