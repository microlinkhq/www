---
title: 'Product brief #1: default prerendering, new plans, and metascraper v3'
subtitle: 'Prerendering on every request, 500 free requests per day'
description: 'Learn about Microlink first product brief: enabling browser prerendering by default, the launch of adaptive pricing plans, and the release of metascraper v3.'
authors:
  - kiko
date: '2017-12-30'
---

import { Figcaption } from 'components/markdown/Figcaption'

With this first product brief, Microlink enabled prerendering by default **in all requests**. The same release shipped adaptive professional plans with an updated authentication, and metascraper v3, the open source engine that turns HTML into structured data.

## Prerendering became the default for every request

![Example of using microlink for Amazon links. Prerending improves data accuracy.](/images/VC9vYjz.png)

<Figcaption children='Example of using microlink for Amazon links. Prerending improves data accuracy.' />

When you open a website, your browser waits a few milliseconds after the content arrives: it is **prerendering** the page before you can interact with it. The API applies the same technique through the [prerender](/docs/api/parameters/prerender) parameter, so the data it extracts is loaded before it reads it.

Before this release, you had to pass `prerender` explicitly on each request. Prerendering made the response time slower, so the API disabled it by default to guarantee the minimum response time.

Improvements in the infrastructure made the response time constant even with prerendering enabled. So prerendering became the default for every request, and you no longer needed to know whether a target site, like the Amazon page above, required it. You could still deactivate it explicitly on any request with the `prerender` parameter.

## Professional plans adapted to your usage

![The new pricing table at microlink.io#pricing](https://cdn-images-1.medium.com/max/2244/1*JUalxjsY_tlU2txpxPsM9w.gif)

The pricing table started offering different plan configurations, so you could pick the one that matched your needs. The [authentication](/docs/#authentication) for professional plans was updated in the same release.

The free plan was limited to a maximum of **500 requests per day**, with one concurrent request per second.

## metascraper v3 shipped with its original author

![](/images/logo-banner.png)

Microlink released a lot of its code as open source under [microlink on GitHub](https://github.com/microlinkhq). The company believes in **Open Source Sustainability**: the collaborative code and the infrastructure service should feed each other.

One of the core projects is [metascraper](https://github.com/microlinkhq/metascraper), which converts regular HTML into structured data. For v3, we worked with [Ian Storm Taylor](https://github.com/ianstormtaylor), the original author of metascraper, to commit our improvements upstream and make them accessible to everyone.

To try it, point metascraper v3 at any HTML page and compare its structured output with what the Microlink API returns for the same URL.
