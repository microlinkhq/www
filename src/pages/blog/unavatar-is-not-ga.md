---
title: 'unavatar.io is now GA'
date: '2026-01-05'
---

import { Since } from 'components/markdown/Since'

Resolving user avatars across different social networks can be a surprisingly difficult task: from handling different API formats to bypassing bot protection on platforms like Instagram or LinkedIn, it’s a constant battle to keep things working.

<Microlink url='https://unavatar.io' />

That's why we built [unavatar](https://unavatar.io), and today we're excited to announce that it's now **Generally Available**.

## Unified avatar resolution

[unavatar](https://unavatar.io) is the simplest way to get a user avatar from across the web. Whether you have a username, an email address, or a domain name, unavatar resolves it and returns the avatar URL instantly.

```bash

# Get avatar by X username
curl https://unavatar.io/x/microlinkhq      

# Get avatar by domain
curl https://unavatar.io/microlink.io       

# Get avatar by email
curl https://unavatar.io/hello@microlink.io
```

The core value of unavatar is that it eliminates the need for developers to integrate with dozens of different APIs just to show a profile picture. It provides a single, reliable endpoint that works across the entire internet.

## Scaling to the next level

The project started almost **<Since from='2018' /> years ago**. Today, unavatar supports over 18 providers and resolves more than **200 million requests per month**.

Throughout this journey, we've faced significant challenges in keeping the service both reliable and free. As platforms introduced increasingly aggressive bot protection and stricter rate limits, resolving avatars became a complex game of cat and mouse.

At the same time, the daily limits (originally designed to protect our infrastructure from automated abuse) became a significant bottleneck for users moving from side projects to production-grade applications.

We found that maintaining a high success rate across all providers required a level of infrastructure and complexity that the original free-tier architecture was never designed to handle.

## What's unchanged

As a company, we are committed to always providing a free solution without expecting anything in return. This is deeply rooted in our Open Source core values: ensuring that our tools remain accessible to everyone.

This is why **unavatar** remains free to use for everyone. You get **50 avatar resolutions every day** per IP address, which is plenty for side projects, small experiments, and local development.

## What's new

We’re thrilled to announce a major milestone for the project: **the official launch of the [PRO](https://unavatar.io/checkout) plan**.

Designed to unlock the free plan limitations, [PRO](https://unavatar.io/checkout) allows you to scale just in time when your usage requires it:

- **No daily cap**: Scale your application without interruptions.
- **Advanced resolution**: Jump CAPTCHAs, handle bot protection, and bypass restrictive challenges on platforms like Instagram or LinkedIn.
- **Dynamic pricing**: Automatically adjusts its strategy and cost based on each provider's complexity to ensure the highest success rate.

Also, we've shortened the cache duration: instead of 1 year (the fixed value prior to introducing the [PRO](https://unavatar.io/checkout) plan), we've lowered the new default to **7 days**. Additionally, you can now control this value yourself and set anything between **1 hour and 28 days** using the `ttl` parameter.

```bash
https://unavatar.io/x/microlinkhq?ttl=1d # 86400000
https://unavatar.io/x/microlinkhq?ttl=1day # 86400000
https://unavatar.io/x/microlinkhq?ttl=1h # 3600000
```

## What's the pricing

The [PRO](https://unavatar.io/checkout) plan uses a simple pay-as-you-go model at **$0.001 per avatar token**. 

unavatar uses different resolution strategies depending on what's required. An avatar resolution may cost:

- **1 token**: Resolved by unavatar servers.
- **2 tokens**: Resolved using a datacenter proxy.
- **4 tokens**: Resolved using a residential proxy.

Our goal is to stay out of your way: the service will proactively suggest an upgrade to [PRO](https://unavatar.io/checkout) only when it detects that a request failing under the free tier could be successfully resolved using our advanced strategies. This ensures you only pay for what you actually need, when you need it.

### Real-world emulation

- **Simple avatar**: Resolved normally (`1 × $0.001 = $0.001 total`).
- **Complex provider** (e.g., Instagram, LinkedIn): Requires a residential proxy (`1 × $0.001 + 2 × $0.001 + 4 × $0.001 = $0.007 total`).

Key points:

- You are only charged for the **first successful resolution**.
- All subsequent requests served from cache are **free**.
- We do **not** charge for failed resolutions.
- Only a few providers require a residential proxy (e.g., Instagram and similar complex platforms).

You can verify this information using the response headers:

- `x-pricing-tier` (`free` / `pro`): indicates which pricing tier was used.
- `x-proxy-tier` (`origin` / `datacenter` / `residential`): indicates which resolution method was required.
- `x-unavatar-cost` (`n`): number of tokens consumed for the avatar resolution.

## What's next

We're continuing to build and ship new features to make unavatar even better:

- **Built-in analytics**: Detailed usage metrics and insights.
- **Improved detection**: Better domain and brand detection for automatic resolution.
- **New providers**: Upcoming support for Vimeo, Bluesky, and WhatsApp.

You can upgrade to [PRO](https://unavatar.io/checkout) anytime at [unavatar.io/checkout](https://unavatar.io/checkout).

Thank you for being part of the journey from beta to GA!
