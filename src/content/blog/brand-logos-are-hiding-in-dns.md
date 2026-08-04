---
title: 'Brand Logos Are Hiding in DNS'
subtitle: 'How an email standard gave us vector logos instead of 32×32 favicons'
description: 'BIMI puts brand logos in DNS as square SVGs. How Microlink uses that record for the logo property, what the top 500 sites say about coverage, and how to publish one for your company.'
authors:
  - kiko
date: '2026-08-04'
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Figcaption } from 'components/markdown/Figcaption'

![](/images/types-logos-featured.jpg)

Getting a website's logo sounds like a solved problem until you look at the results.

HTML never standardized how websites should expose their primary logo. Most sites don't declare one at all, so you're left falling back to the favicon: a browser tab icon that's intentionally small, often simplified, and not necessarily the brand's official logo.

There is another source that's easy to overlook, and it's been sitting in DNS the whole time. It's always DNS.

**TL;DR**

- Brands publish their logo in DNS as a [BIMI](https://datatracker.ietf.org/doc/draft-blank-ietf-bimi/) record, the standard behind the logo your mailbox shows next to an email.
- Roughly one in five of the [top 500 sites](https://github.com/Kikobeats/top-sites) publish one. High precision, low recall, so it ships as an optional package, not a favicon replacement.
- Shipped as [metascraper-logo-bimi](https://github.com/microlinkhq/metascraper/tree/master/packages/metascraper-logo-bimi), with the record logic split out as [bimi-url](https://github.com/Kikobeats/bimi-url).

## Where to find a website logo

Without one place to look, you end up probing a handful of optional markup conventions. [metascraper](https://metascraper.js.org) does that for you; [metascraper-logo](https://github.com/microlinkhq/metascraper/tree/master/packages/metascraper-logo) walks the common hints in order:

```js
// Resolve `logo` from HTML markup (metascraper-logo), first match wins.
logo: [
  toLogo($ => $('meta[property="og:logo"]').attr('content')),
  toLogo($ => $('meta[itemprop="logo"]').attr('content')),
  toLogo($ => $('img[itemprop="logo"]').attr('src')),
  toLogo($ => toLogoUrl($, 'brand.logo')),
  toLogo($ => toLogoUrl($, 'organization.logo')),
  toLogo($ => toLogoUrl($, 'place.logo')),
  toLogo($ => toLogoUrl($, 'product.logo')),
  toLogo($ => toLogoUrl($, 'service.logo')),
  toLogo($ => toLogoUrl($, 'publisher.logo')),
  toLogo($ => toLogoUrl($, 'logo.url')),
  toLogo($ => toLogoUrl($, 'logo'))
]
```

Even after checking every common convention, many sites still expose no logo metadata. To improve coverage we built [metascraper-logo-favicon](https://github.com/microlinkhq/metascraper/tree/master/packages/metascraper-logo-favicon): almost every site exposes a `/favicon.ico`, so you can treat that as the logo when markup is empty:

| Favicon                      | File | Size       | Resolution |
| ---------------------------- | ---- | ---------- | ---------- |
| `x.com/favicon.ico`          | PNG  | 549&nbsp;B | 32×32      |
| `apple.com/favicon.ico`      | ICO  | 22&nbsp;KB | 64×64      |
| `cloudflare.com/favicon.ico` | PNG  | 908&nbsp;B | 99×96      |
| `adobe.com/favicon.ico`      | ICO  | 15&nbsp;KB | 48×48      |

This works surprisingly well for coverage, but it's a poor representation of a brand. Favicons are designed for browser tabs, not metadata. They're often tiny, simplified, or non-square because that's exactly what browsers need.

## Mailbox providers already solved this

The web never standardized logo discovery, but email effectively did.

![](/images/gmail-bimi-brand-logo.png)

[BIMI](https://datatracker.ietf.org/doc/html/draft-blank-ietf-bimi#section-4.2.2) (Brand Indicators for Message Identification) lets domains publish an official brand logo in DNS. Mail providers like Gmail and Apple Mail use it to display the sender's logo next to authenticated emails:

```console
$ dig +short TXT default._bimi.microlink.io
"v=BIMI1; l=https://cdn.microlink.io/logo/logo.svg;"
```

That makes BIMI an interesting source of logo metadata for several reasons:

- **DNS is fast.** Resolving a TXT record is typically cheaper than downloading and parsing an HTML document, especially once the resolver is warm.
- **No HTML required.** It still works when a page is JavaScript-rendered, rate-limited, or responds with a `403`.
- **The logo is intentional.** It's the same asset mailbox providers use to represent the brand.
- **The format is constrained.** BIMI requires a square SVG Tiny P/S image, which is much better suited for avatars than a random favicon.

## Why the record is a better source

BIMI requires [SVG Tiny P/S](https://datatracker.ietf.org/doc/html/draft-svg-tiny-ps-abrotman) (Portable/Secure), a restricted SVG profile designed specifically for safely displaying brand logos inside email clients.

- **No scripts**: the SVG cannot run JavaScript, so mailbox clients can render it safely.
- **No external assets**: no remote images, fonts, or stylesheets; the mark is self-contained.
- **Square by design**: every logo fits a 1:1 aspect ratio, making it immediately usable as an avatar or application icon.

Here are the same four sites from the favicon table, with their BIMI logos next to those icons:

| Domain         | Favicon                                                                                           | BIMI                                                                                        | Size        | Title                       |
| -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------- | --------------------------- |
| x.com          | <img src="/images/bimi/x-favicon.png" alt="X favicon" width="40" height="40" />                   | <img src="/images/bimi/x.svg" alt="X Corp. BIMI logo" width="40" height="40" />             | 520&nbsp;B  | X Corp.                     |
| apple.com      | <img src="/images/bimi/apple-favicon.png" alt="Apple favicon" width="40" height="40" />           | <img src="/images/bimi/apple.svg" alt="Apple BIMI logo" width="40" height="40" />           | 1.1&nbsp;KB | Apple                       |
| cloudflare.com | <img src="/images/bimi/cloudflare-favicon.png" alt="Cloudflare favicon" width="40" height="40" /> | <img src="/images/bimi/cloudflare.svg" alt="Cloudflare BIMI logo" width="40" height="40" /> | 1.4&nbsp;KB | Cloudflare Inc.             |
| adobe.com      | <img src="/images/bimi/adobe-favicon.png" alt="Adobe favicon" width="40" height="40" />           | <img src="/images/bimi/adobe.svg" alt="Adobe BIMI logo" width="40" height="40" />           | 474&nbsp;B  | Adobe: Creative, marketing… |

## A strong signal when it's there

We ran `dig TXT default._bimi.<domain>` across the [top 500 sites](https://github.com/Kikobeats/top-sites):

| Set | Publishes a logo |
| --- | --- |
| Top 100 | **19&nbsp;/&nbsp;100** (19%) |
| Top 500 | **97&nbsp;/&nbsp;500** (19%) |

Coverage is still limited. BIMI significantly improves quality when present, but it isn't common enough to replace existing discovery strategies. So it ships as its own package rather than folded into the favicon rule, and ordering is the caller's choice:

```js
const metascraper = require('metascraper')([
  require('metascraper-logo-bimi')(),
  require('metascraper-logo')(),
  require('metascraper-logo-favicon')()
])
```

Putting the BIMI rule first means it wins whenever the domain publishes a record, while existing HTML and favicon strategies remain unchanged for everyone else. On a warm resolver the lookup measured between **23 ms and 78 ms** (median **52 ms**). Since results are memoized per domain, that cost is typically paid only once.

## Try it

<MultiCodeEditorInteractive
  mqlCode={{
    url: 'https://www.cloudflare.com',
    meta: true
  }}
/>

<Figcaption>`logo` here comes from `default._bimi.cloudflare.com`, not from the page. The favicon path returns a 99×96 PNG for the same site.</Figcaption>

## Add BIMI to your company

If you want metadata tools (and mailboxes) to pick up your real logo, publish it. Three pieces, in order:

**1. Export the logo as SVG Tiny P/S.** Start from your official brand mark, not a favicon. The export has to match the [Portable/Secure profile](https://datatracker.ietf.org/doc/html/draft-svg-tiny-ps-abrotman) covered above: square, no scripts, no linked assets, `baseProfile="tiny-ps"` on the root `<svg>`. A default Illustrator or Figma SVG usually fails that check, so convert and validate before you upload anything.

**2. Host it over HTTPS.** Serve the file as `image/svg+xml`. Stay on `https` through any redirects. Put the mark on a stable URL you control (or your CA's BIMI host if you buy a VMC).

**3. Publish one TXT record** at `default._bimi.yourdomain.com`:

```console
$ dig +short TXT default._bimi.microlink.io
"v=BIMI1; l=https://cdn.microlink.io/logo/logo.svg;"
```

- `v=BIMI1` is the version.
- `l=` is the HTTPS URL of the SVG.
- `a=` is optional: a Verified Mark Certificate, if you want mailbox providers that require one (Gmail is the usual reason).

For inbox display you also need DMARC at enforcement (`p=quarantine` or `p=reject`). For metadata extraction, the DNS logo alone is enough: that is the part [metascraper-logo-bimi](https://github.com/microlinkhq/metascraper/tree/master/packages/metascraper-logo-bimi) reads.
