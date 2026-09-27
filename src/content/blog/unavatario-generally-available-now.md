---
title: "unavatar.io is now generally available with a PRO plan"
description: 'unavatar.io, the unified API for resolving user avatars from any social network, is generally available. The new PRO plan removes the daily cap and resolves avatars behind bot protection using residential proxies.'
authors:
  - kiko
date: '2026-01-05'
---

import { Since } from 'components/markdown/Since'
import { Microlink } from 'components/markdown/Microlink'

[unavatar](https://unavatar.io) is now **Generally Available**, and it launches with a pay-as-you-go [PRO](https://unavatar.io/checkout) plan at $0.001 per avatar token. The free tier stays at 50 avatar resolutions a day per IP address.

<Microlink url='https://unavatar.io' />

**TL;DR**

- unavatar is now **Generally Available**, with a pay-as-you-go PRO plan at **$0.001 per avatar token**.
- The free tier stays at **50 avatar resolutions a day** per IP address.
- PRO removes the daily cap and resolves avatars behind bot protection on platforms like Instagram or LinkedIn.
- unavatar supports over 18 providers and resolves more than **200 million requests per month**.
- The default cache duration is now **7 days**, and the `ttl` parameter sets it anywhere between 1 hour and 28 days.

Resolving a user avatar across social networks means handling a different API format per network and getting past bot protection on platforms like Instagram or LinkedIn. unavatar puts all of that behind one URL.

## One URL for any username, email, or domain

You pass unavatar a username, an email address, or a domain name, and it resolves it and returns the avatar URL:

```bash

# Get avatar by X username
curl https://unavatar.io/x/microlinkhq      

# Get avatar by domain
curl https://unavatar.io/microlink.io       

# Get avatar by email
curl https://unavatar.io/hello@microlink.io
```

Instead of integrating with dozens of different APIs just to show a profile picture, you call one endpoint that works across X, email addresses, and domains with the same URL shape.

## 200 million requests a month outgrew the free tier

The project started almost **<Since from='2018' /> years ago**. Today, unavatar supports over 18 providers and resolves more than **200 million requests per month**.

Keeping that reliable and free got harder every year. Platforms like Instagram and LinkedIn introduced increasingly aggressive bot protection and stricter rate limits, and resolving their avatars became a game of cat and mouse.

The daily limits, originally designed to protect our infrastructure from automated abuse, became a bottleneck for users moving from side projects to production-grade applications that need more than 50 avatars a day. A high success rate across all providers required a level of infrastructure and complexity that the original free-tier architecture was never designed to handle.

## The free tier stays at 50 resolutions a day

Microlink is committed to always providing a free solution without expecting anything in return. That commitment is rooted in our open source core values, which is why [unavatar](https://unavatar.io) keeps a free tier.

**unavatar** remains free to use for everyone. You get **50 avatar resolutions every day** per IP address, which is enough for side projects, small experiments, and local development.

## PRO removes the daily cap

The [PRO](https://unavatar.io/checkout) plan lifts the 50-a-day limit of the free plan, so you can scale at the moment your usage requires it:

- **No daily cap:** Your application keeps resolving avatars without interruptions.
- **Advanced resolution:** unavatar jumps CAPTCHAs, handles bot protection, and bypasses restrictive challenges on platforms like Instagram or LinkedIn.
- **Dynamic pricing:** unavatar adjusts its strategy and cost to each provider's complexity to get the highest success rate.

## You control the cache with ttl

We shortened the default cache duration from 1 year, the fixed value before the [PRO](https://unavatar.io/checkout) plan existed, to **7 days**. You can now set it yourself to anything between **1 hour and 28 days** with the `ttl` parameter:

```bash
https://unavatar.io/x/microlinkhq?ttl=1d # 86400000
https://unavatar.io/x/microlinkhq?ttl=1day # 86400000
https://unavatar.io/x/microlinkhq?ttl=1h # 3600000
```

## Pricing is $0.001 per avatar token

The [PRO](https://unavatar.io/checkout) plan is pay-as-you-go at **$0.001 per avatar token**. The number of tokens an avatar resolution costs depends on the strategy unavatar needs to resolve it:

| Tokens | Resolved by |
| --- | --- |
| **1 token** | unavatar servers |
| **2 tokens** | a datacenter proxy |
| **4 tokens** | a residential proxy |

The service suggests an upgrade to [PRO](https://unavatar.io/checkout) only when it detects that a request failing under the free tier could be resolved with the PRO strategies, so you pay for proxies only on the requests that need them.

### What a resolution costs

A simple avatar resolves normally, for `1 × $0.001 = $0.001 total`. A complex provider such as Instagram or LinkedIn requires a residential proxy, for `1 × $0.001 + 2 × $0.001 + 4 × $0.001 = $0.007 total`.

The billing rules:

- You are only charged for the **first successful resolution**.
- All subsequent requests served from cache are **free**.
- We do **not** charge for failed resolutions.
- Only a few providers require a residential proxy, for example Instagram and similar complex platforms.

You can verify the tier and cost of a resolution in the response headers:

| Header | Values | Meaning |
| --- | --- | --- |
| `x-pricing-tier` | `free` / `pro` | which pricing tier was used |
| `x-proxy-tier` | `origin` / `datacenter` / `residential` | which resolution method was required |
| `x-unavatar-cost` | `n` | number of tokens consumed for the avatar resolution |

## Coming next: analytics and Bluesky, Vimeo, and WhatsApp

We are working on three additions:

- **Built-in analytics:** detailed usage metrics and insights.
- **Improved detection:** better domain and brand detection for automatic resolution.
- **New providers:** support for Vimeo, Bluesky, and WhatsApp.

## Upgrade to PRO

Try the free tier with `curl https://unavatar.io/microlink.io`, and upgrade to [PRO](https://unavatar.io/checkout) anytime at [unavatar.io/checkout](https://unavatar.io/checkout).
