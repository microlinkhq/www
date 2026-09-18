---
title: 'Know which antibot system blocked your request'
description: "is-antibot is an open-source, dependency-free library that tells you when a response was blocked by an antibot system and which provider blocked it. Microlink uses it to handle those failures at scale."
authors:
  - kiko
date: '2026-01-04'
---
import { CodeEditor } from 'components/markdown/CodeEditor'
import { Link } from 'components/elements/Link'

![](/images/hiRLMQQ.jpeg)

Today we're releasing <Link href="https://github.com/microlinkhq/is-antibot" logoIcon externalIcon>is-antibot</Link>, an open-source, dependency-free library that detects when a response was blocked by an antibot system and names the provider that blocked it. It is built for crawlers, scrapers, link previews, and metadata pipelines that make requests at scale.

Install it from [npm](https://www.npmjs.com/package/is-antibot):

<CodeEditor title='microlinkhq/is-antibot' language='bash'>
  {`# https://github.com/microlinkhq/is-antibot
npm install is-antibot --save`}
</CodeEditor>

For users of the <Link href="/docs/api/getting-started/overview">Microlink API</Link>, knowing why a request failed means fewer retries, cleaner data, and predictable behavior at scale.

## Blocks come from named providers

A scraper can send valid headers and a valid TLS handshake and still get a `403 Forbidden`, a `429 Too Many Requests`, or a *“Please prove you’re human”* challenge. These blocks are rarely random. Most come from a dedicated antibot provider, and each one blocks in its own way:

| Provider | How it blocks |
| --- | --- |
| **Cloudflare** | Challenge pages ("Just a moment...") and IP reputation scoring. |
| **DataDome** | Analyzes request signatures to block scrapers in real-time. |
| **Akamai Bot Manager** | Blocks data center IPs and suspicious behavior at the edge. |
| **Vercel Attack Mode** | Triggers challenges during high traffic or suspicious patterns. |
| **PerimeterX** | Behavioral bot detection using client-side fingerprinting. |
| **Shape Security** | Enterprise bot management with dynamic header patterns. |
| **Kasada** | Bot mitigation with real-time challenge generation. |
| **Imperva/Incapsula** | Web application firewall with bot detection capabilities. |
| **AWS WAF** | Amazon Web Services Web Application Firewall with bot control rules. |

Many sites also put a CAPTCHA provider in front of the content to verify human interaction:

| Provider | What it is |
| --- | --- |
| **reCAPTCHA** | Google's CAPTCHA service (v2 and v3). |
| **hCaptcha** | Privacy-focused CAPTCHA alternative. |
| **FunCaptcha** | Arkose Labs interactive challenges. |
| **GeeTest** | AI-powered CAPTCHA system. |
| **Cloudflare Turnstile** | Privacy-preserving CAPTCHA alternative. |

The missing piece for a pipeline is not a way to bypass Cloudflare or DataDome. It is knowing, on each response, that one of them answered instead of the site.

## Antibot checks run before your request reaches the site

Modern antibot systems score your request at several layers, often before it reaches application code: the IP it comes from, its headers, its TLS handshake, and the JavaScript it runs. A reCAPTCHA or hCaptcha widget is only the last and most visible of them. The common signals are:

- **IP reputation:** Data-center IPs are flagged by default, while residential traffic behaves differently.
- **HTTP consistency:** The full header set must match a real browser profile, not just the `User-Agent`.
- **TLS fingerprints (JA3):** The way a client negotiates TLS leaks whether it is a browser or a script.
- **Behavioral heuristics:** Timing, navigation order, and interaction patterns are all scored.
- **JavaScript fingerprinting:** Canvas, WebGL, fonts, and screen size are compared, and small inconsistencies are enough.

From those signals, the provider makes one of three decisions. An **allowed** request looks like a legitimate human visitor and passes through to the target website. A **blocked** request is highly suspicious, for example from a known malicious IP or with a broken TLS fingerprint, and gets an immediate `403 Forbidden` or `429 Too Many Requests`. A **challenged** request is one the system is unsure about, so it serves a CAPTCHA or a JavaScript interstitial that must be resolved before the actual content is released.

## is-antibot names the provider on every response

<Link href="https://github.com/microlinkhq/is-antibot" logoIcon externalIcon>is-antibot</Link> does not try to solve challenges. You pass it a `fetch` response, and it returns `detected` (whether a challenge or block happened) and `provider` (who triggered it):

```js
const isAntibot = require('is-antibot')

const response = await fetch('https://www.linkedin.com/company/microlinkhq')
const { detected, provider } = isAntibot(response)

if (detected) {
  console.log(`Antibot detected: ${provider}`)
}
```

To decide, it inspects four things on the response: HTTP status patterns, known challenge signatures, response headers and body markers, and provider-specific fingerprints. The check is deterministic and fast, so it can run on every request without becoming the bottleneck.

## A Cloudflare challenge needs a different fix than an Akamai block

Most pipelines treat a `403`, a `429`, and a challenge page the same way, with the same retry. Antibot systems are not interchangeable, so that retry often makes your next request look more suspicious:

- A Cloudflare JS challenge is not the same as an Akamai edge block.
- CAPTCHA responses differ by provider and version, such as reCAPTCHA v2 and v3.
- A retry strategy that works for one system amplifies detection in another.

Once `provider` tells you who blocked the request, you can adapt the retry strategy to that specific block, route the request through alternative IPs or proxies, escalate to full browser rendering when needed, or exit early to avoid wasting resources and costs. Detection is the decision point for all four.

## How the Microlink API uses it

Antibot detection is one of the first checks in the <Link href="/docs/api/getting-started/overview">Microlink API</Link> request flow. Instead of retrying every failure the same way, we identify why a request failed and route it through the resolution path required for that protection layer. The result is fewer retries, cleaner data, and predictable behavior at scale.

## Get started

Run `npm install is-antibot --save`, pass any `fetch` response to `isAntibot`, and read `detected` and `provider`. You can read the source on [GitHub](https://github.com/microlinkhq/is-antibot), and our [Microlink API docs](/docs/api/getting-started/overview) cover how requests are handled.
