---
title: 'Product Brief #1: Prerendering, Pricing & SDK First Steps'
description: 'Learn about Microlink first product brief: enabling browser prerendering by default, the launch of adaptive pricing plans, and the release of metascraper v3.'
date: '2017-12-30'
---

import { Figcaption } from 'components/markdown/Figcaption'

## Prerendering by default

![Example of using microlink for Amazon links. Prerending improves data accuracy.](/images/VC9vYjz.png)

<Figcaption children='Example of using microlink for Amazon links. Prerending improves data accuracy.' />

When you access into a web, normally you need to wait a few milliseconds after all the content is available: Your browser is **prerendering** all the content before you can interact with it.

We use this technique in order to be sure the data we can extract is loaded, using [prerender](/docs/api/parameters/prerender) parameter.

If you wanted to apply this behavior, you had to explicitly do it. This decision was driven because prerender makes response time slow and, in order to guarantee the minimum response time, we disable it by default.

But now it will be enabled by default **in all requests** 🙌.

You don’t want to worry about if the target web needs or not prerendering. You do not have to know!

We have made great improvements in infrastructure and now the response time is constant even with prerendering enabled, so we decided to enable it by default unless you explicitly deactivate it.

## Adaptative Professional Plans

![The new pricing table at microlink.io#pricing](https://cdn-images-1.medium.com/max/2244/1*JUalxjsY_tlU2txpxPsM9w.gif)

Our pricing now reflects different configurations based on your necessities.

The [authentication](/docs/#authentication) way for professional plans was updated as well.

The free plan is limited to a maximum of **500 requests per day**, with one concurrent request per second.

## Metascraper v3

![](https://metascraper.js.org/static/logo-banner.png)

We released a lot of open source under our [microlink on GitHub](https://github.com/microlinkhq).

We are a company that believes in **Open Source Sustainability** and we want to achieve a symbiosis between collaborative code and infrastructure service.

One of our core projects is [metascraper](https://github.com/microlinkhq/metascraper) that it converts regular HTML into structured data.

We worked together with [Ian Storm Taylor](https://github.com/ianstormtaylor), the original metascraper’s author for commit our improvements and make it accessible to everyone.`
