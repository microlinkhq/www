---
title: 'Antibot detection at scale'
description: "Understand how modern antibot systems block requests and how Microlink detects and handles those failures at scale."
date: '2026-01-04'
---
import { CodeEditor } from 'components/markdown/CodeEditor'
import { Link } from 'components/elements/Link'

![](/images/hiRLMQQ.jpeg)

If you’re building crawlers, scrapers, link previews, or metadata pipelines, you’re constantly interacting with defenses designed to stop you. And they’re good—often invisible until they suddenly aren’t.

Today, we’re releasing <Link href="https://github.com/microlinkhq/is-antibot" logoIcon externalIcon>is-antibot</Link>, an open-source, dependency-free utility for detecting when responses are blocked by antibot systems at scale.

It’s open source, dependency-free, and built to work at scale.

<CodeEditor title='microlinkhq/is-antibot' language='bash'>
  {`# https://github.com/microlinkhq/is-antibot
npm install is-antibot --save`}
</CodeEditor>

For users of the <Link href="/docs/api/getting-started/overview">Microlink API</Link>, this means fewer retries, cleaner data, and predictable behavior at scale by understanding why requests fail.

## The problem

You deploy a scraper. Requests look fine. Headers are set. TLS is valid.

Then suddenly:

- 403 Forbidden
- 429 Too Many Requests
- A *“Please prove you’re human”* challenge

These blocks are rarely random. They’re usually enforced by dedicated antibot providers such as:

- **Cloudflare**: Uses challenge pages ("Just a moment...") and IP reputation scoring.
- **DataDome**: Analyzes request signatures to block scrapers in real-time.
- **Akamai Bot Manager**: Blocks data center IPs and suspicious behavior at the edge.
- **Vercel Attack Mode**: Triggers challenges during high traffic or suspicious patterns.
- **PerimeterX**: Behavioral bot detection using client-side fingerprinting.
- **Shape Security**: Enterprise bot management with dynamic header patterns.
- **Kasada**: Advanced bot mitigation with real-time challenge generation.
- **Imperva/Incapsula**: Web application firewall with bot detection capabilities.
- **AWS WAF**: Amazon Web Services Web Application Firewall with bot control rules.

Many sites also rely on CAPTCHA providers to verify human interaction:

- **reCAPTCHA**: Google's CAPTCHA service (v2 and v3).
- **hCaptcha**: Privacy-focused CAPTCHA alternative.
- **FunCaptcha**: Arkose Labs interactive challenges.
- **GeeTest**: AI-powered CAPTCHA system.
- **Cloudflare Turnstile**: Privacy-preserving CAPTCHA alternative.

The missing piece isn’t bypassing antibot systems: It’s knowing when you’ve hit one.

## Antibot is no longer just CAPTCHA

Modern antibot systems operate at multiple layers—often before your request even reaches application code.

Common signals include:

- **IP reputation**: Data-center IPs are flagged by default. Residential traffic behaves differently.
- **HTTP consistency**: Headers must match a real browser profile—not just User-Agent, but the full set.
- **TLS fingerprints (JA3)**: The way a client negotiates TLS leaks whether it’s a browser or a script.
- **Behavioral heuristics**: Timing, navigation order, and interaction patterns matter.
- **JavaScript fingerprinting**: Canvas, WebGL, fonts, screen size—small inconsistencies are enough.

Based on these signals, a request is either:

- **Allowed**: If the heuristics indicate a legitimate human visitor, the request is passed through to the target website.
- **Blocked**: If the request is highly suspicious (e.g., coming from a known malicious IP or with a broken TLS fingerprint), it is blocked immediately with a `403 Forbidden` or `429 Too Many Requests` error.
- **Challenged**: If the system is unsure, it serves a "challenge"—such as a CAPTCHA or a JavaScript-based interstitial—that must be resolved before the actual content is released.

## Detecting the invisible

Our library <Link href="https://github.com/microlinkhq/is-antibot" logoIcon externalIcon>is-antibot</Link> doesn’t try to solve challenges.

It does something more fundamental: it tells you that a challenge happened and who triggered it:

```js
const isAntibot = require('is-antibot')

const response = await fetch('https://www.linkedin.com/company/microlinkhq')
const { detected, provider } = isAntibot(response)

if (detected) {
  console.log(`Antibot detected: ${provider}`)
}
```

Under the hood, it inspects:

- HTTP status patterns
- Known challenge signatures
- Response headers and body markers
- Provider-specific fingerprints

The result is deterministic and fast—designed to run on every request without becoming the bottleneck.

This detection step is part of how the <Link href="/docs/api/getting-started/overview">Microlink API</Link> decides how to handle blocked requests at scale.


## Why detection beats bypassing

Most systems fail because they treat all failures the same.

But antibot systems aren’t interchangeable:

- A Cloudflare JS challenge is not the same as an Akamai edge block
- CAPTCHA responses differ by provider and version
- Retry strategies that work for one system amplify detection in another

Once you can identify the blocker, you can:

- adapt your retry strategy to the specific block
- route requests through alternative IPs or proxies
- escalate to full browser rendering when needed
- exit early to avoid wasting resources and costs

Detection is the decision point.

## How this improves Microlink

Antibot detection is one of the first checks in our request flow.

Instead of treating every failure the same, we identify why a request failed and route it through the exact resolution path required for that protection layer. The result:

- fewer retries
- cleaner data
- predictable behavior at scale
