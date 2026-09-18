---
title: 'Product brief #5: user agent and video parameters'
subtitle: 'metascraper v3.11 brought Custom Rules to the API'
description: 'Discover Microlink Product Brief, featuring custom User Agent support, optimized video detection parameters, and the major metascraper v3.11 update with Custom Rules.'
date: '2018-05-30'
---

import { Link } from 'components/elements/Link'
import { Figcaption } from 'components/markdown/Figcaption'

This product brief added two API parameters, a configurable [User Agent](/docs/api/parameters/headers) and an opt-in [video](/docs/api/parameters/video), and deployed metascraper v3.11 to the Microlink API. That update is what made **Custom Rules** possible: the ability to tell the API new rules to extract new data.

## The API examples highlight the term they document

[![](/images/2RNeKiR.png)](/docs/api/getting-started/overview)

<Figcaption>
  <Link href='/docs/api/getting-started/overview' children='Microlink API' /> examples was improved,
  highlighting the referenced term in each section.
</Figcaption>

Each section of the [Microlink API](/docs/api/getting-started/overview) documentation started highlighting, in its example, the term the section references.

### The user agent became an API parameter

The [User Agent](/docs/api/parameters/headers) of the request sent to the target website became configurable as an API parameter.

You rarely need to set it. Some websites return a different output based on the user agent of the incoming request. A common case is a site that serves images in [WebP](https://en.wikipedia.org/wiki/WebP) format when it detects Google Chrome.

### Video detection became opt-in

The [previous](/blog/product-brief-3) product brief introduced the first iteration of video support as one of the API data [types](/docs/api/getting-started/overview).

The `video` field is widely used when you consume the response through the [SDK](/docs/sdk-legacy/getting-started/overview/). If you only need the rest of the extracted data, such as `title` or `image`, detecting the video made response times heavier.

The new [video](/docs/api/parameters/video) parameter moved that decision to you, with a default value of \`false\`. Link previews rendered with the SDK had no breaking changes. If you call the API directly, pass `video` to keep the behavior you had until now.

## metascraper v3.11 made the extraction engine smaller and faster

[![](/images/logo-banner.png)](https://metascraper.js.org/#/)

[metascraper](https://metascraper.js.org) is the extraction engine behind the API, and every improvement to it reaches the API responses. The changes since the last brief:

- **Improved URL detection:** a [WHATWG URL](https://url.spec.whatwg.org) parser, contributed by [Stefan Andres Charsley](https://github.com/microlinkhq/metascraper/pull/82).
- **Optimized bootstrap:** the configuration file is loaded just [once](https://github.com/microlinkhq/metascraper/commit/cb18d36).
- **Faster core rules:** removing [non](https://github.com/microlinkhq/metascraper/commit/a36e240) [really](https://github.com/microlinkhq/metascraper/commit/296fda7) [necessary](https://github.com/microlinkhq/metascraper/commit/47ec0e5) steps left the core smaller and faster.
- **Rules parameter support:** load a specific set of [rules](https://metascraper.js.org/#/?id=rules-1) out of the box.
- **Exported core validators:** [reuse](https://github.com/microlinkhq/metascraper/pull/89) them to build consistent third-party rule sets.

## Custom Rules reached the API

These changes were deployed to the [Microlink API](/docs/api/getting-started/overview), and together they add **Custom Rules**: you send the API a rule, and it returns the new data field that rule describes.

A dedicated post explains how to write one: a `selector` to pick the element, an `attr` to pick its property, and a `type` to validate the value.
