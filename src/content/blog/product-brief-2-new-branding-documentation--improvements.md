---
title: 'Product brief #2: new brand, unified docs, instant API credentials'
description: 'Discover Microlink second product brief, featuring a fresh brand identity, unified documentation portal, and key improvements to metascraper and the SDK.'
authors:
  - kiko
date: '2018-01-31'
---

import { Link } from 'components/elements/Link'
import { Figcaption } from 'components/markdown/Figcaption'
import { Microlink } from 'components/markdown/Microlink'

Microlink has a new brand, designed by [Silvia Calavera](http://silviacalavera.es/), and the website now follows it. This brief also covers a single home for all the documentation, the metascraper work on video, and a more responsive Microlink SDK.

## A new brand and instant API credentials

![the new microlink.io swag logo!](https://cdn-images-1.medium.com/max/800/1*qnT4Rmic-FA4_Kf8LdZs_g.png)

<Figcaption children='the new shiny microlink brand.' />

When the project started, the time went into a small API that worked efficiently, and nobody stopped to design a brand for microlink.io. The design was a debt we knew we would pay later. Silvia's logo and the rebuilt website pay it.

We also used the redesign to fix the payment process. You now receive your [API credentials](/docs/api/#api-basics/authentication) *immediately* after payment, handled by a dedicated payments microservice.

![](https://cdn-images-1.medium.com/max/800/1*k7dpxXR6YBtpvHlnw3vrXw.png)

<Figcaption>
  {'Meet '}
  <Link href='https://tom.js.org' children='tom.js.org' />, a microservice for managing payment
  process.
</Figcaption>

## All documentation in one portal

![](/images/tJxodpG.jpg)

<Figcaption>
  {'The only place for checking all the documentation is '}
  <Link href='/docs' children='/docs' />.
</Figcaption>

As announced in [newsletter #1](https://medium.com/microlink/microlink-newsletter-1-13b8a055cd6c), we started shipping a set of front end libraries that make the [Microlink API](/docs/api/getting-started/overview) as easy to consume as possible. Next to them, we want examples and integrations for popular frameworks such as WordPress and Jekyll.

Maintaining documentation for several libraries is laborious, so we combined **all** the documentation for [microlink.io](https://microlink.io) into one place. After comparing multiple approaches and how other companies handle it, we based the portal on the [Vercel documentation](https://vercel.com/docs).

<Microlink size='large' url={'https://x.com/Kikobeats/status/956221717319421952'} />

The migration took laborious work, and `/docs` is now the only place to check the API and SDK documentation. We are grateful to [Vercel](https://vercel.com) for making it possible.

## Metascraper targets video accuracy

![](https://cdn-images-1.medium.com/max/800/1*ns3f8OrzX3xOaPiS81Lc_w.png)

[metascraper](https://metascraper.js.org/) is our metadata extractor, and it gets improvements every week. The current target is data accuracy for **video** content.

This period brought internal improvements and a new package, [metascraper-youtube](https://www.npmjs.com/package/metascraper-youtube), which improves the results when the target is a YouTube URL.

We are also testing a new **video property** for the [Microlink API](/docs/api) ([spoiler](https://api.microlink.io/?url=https://x.com/verge/status/957383241714970624)). It returns any video detected in the target URL, which lets the [Microlink SDK](/docs/sdk-legacy/getting-started/overview/) build a richer content preview. Results will be in a following newsletter.

## A responsive Microlink SDK and 100 GitHub stars

![](https://cdn-images-1.medium.com/max/800/1*kCqm2r2HwPYMceWwj5cwbA.gif)

<Figcaption>
  {'A new '}
  <Link href='/docs/sdk-legacy/getting-started/overview/' children='Microlink SDK' /> demo at{' '}
  <Link href='https://microlink.io/' children='microlink.io' />.
</Figcaption>

The [Microlink SDK repository](https://github.com/microlinkhq/microlinkjs) reached 100 stars on GitHub.

Extra effort went into how the SDK cards respond to different viewports, to be sure every preview renders properly at each size. A new demo on microlink.io shows what you can build with the SDK.

With the unified documentation, the SDK docs also gained more examples and the API parameters you can use to customize your previews. To try them, open the demo on microlink.io, then copy an example from the SDK section of `/docs` into your own page.
