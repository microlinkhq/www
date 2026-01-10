---
title: 'Antibot detection at scale'
description: 'Master antibot detection at scale. Learn how to bypass Cloudflare, DataDome, and Akamai challenges using Microlink.'
date: '2026-01-04'
---

Trying to get HTML from popular sites like **LinkedIn**, **Instagram**, or **YouTube** can be a frustrating experience. 

You write your scraper, set up your requests, and then—boom—you hit a "403 Forbidden", a "429 Too Many Requests", or a "Please prove you're human" challenge.

## Why you can't get HTML from popular sites

Websites receiving massive quantities of traffic throughout the day have sophisticated antibot systems to prevent automated access.

These systems are often powered by providers like:

- **Cloudflare**: Uses challenge pages ("Just a moment...") and IP reputation scoring.
- **DataDome**: Analyzes request signatures to block scrapers in real-time.
- **Akamai Bot Manager**: Blocks data center IPs and suspicious behavior at the edge.
- **Vercel Attack Mode**: Triggers challenges during high traffic or suspicious patterns.

There are many more. When you try to fetch the HTML of these sites without the right tools, you often end up with a blocked response that contains no useful data, just the challenge itself.

## How bot protection works

Antibot systems act as a gatekeeper between your request and the website's content. To determine if a visitor is a human or a bot, they analyze several layers of information from every incoming request:

- **IP Reputation**: They check if the request comes from a known data center (like AWS or Google Cloud) rather than a residential ISP. Data center IPs are often flagged as suspicious by default.
- **HTTP Headers**: Systems verify that headers are consistent with a real browser. A missing `User-Agent` or an unusual `Accept-Language` header can trigger a challenge.
- **TLS Fingerprinting**: Even before the HTTP request is processed, the way your client negotiates the TLS connection (JA3 fingerprint) can reveal if you are using a library like `axios` or `curl` instead of a real browser.
- **Behavioral Analysis**: They monitor how the visitor interacts with the page. Humans have unpredictable mouse movements and scroll patterns, while bots often follow rigid, programmatic paths.
- **Browser Fingerprinting**: Advanced systems run small JavaScript snippets to check your browser's capabilities, such as canvas rendering, WebGL support, and screen resolution, ensuring they match the declared `User-Agent`.

Based on the signals gathered, the antibot system makes a real-time decision on how to handle the request:

- **Allow**: If the heuristics indicate a legitimate human visitor, the request is passed through to the target website.
- **Block**: If the request is highly suspicious (e.g., coming from a known malicious IP or with a broken TLS fingerprint), it is blocked immediately with a `403 Forbidden` or `429 Too Many Requests` error.
- **Challenge**: If the system is unsure, it serves a "challenge"—such as a CAPTCHA or a JavaScript-based interstitial—that must be resolved before the actual content is released.

## How we detect Antibot protection

Knowing that you've been blocked is the first step toward a solution. Traditional scrapers often fail because they don't even realize they've been intercepted by a challenge page, leading to empty data or silent failures.

We developed [is-antibot](https://github.com/microlinkhq/is-antibot), a lightweight, vendor-agnostic JavaScript library that identifies when a response is actually an antibot challenge. 

```js
const isAntibot = require('is-antibot')

const response = await fetch('https://www.linkedin.com/company/microlinkhq')
const { detected, provider } = isAntibot(response)

if (detected) {
  console.log(`Antibot detected: ${provider}`)
}
```

Once a block is detected, the real complexity begins. A challenge from one provider requires a completely different resolution strategy than a block from another. Each system has its own set of rules, and a "one size fits all" approach simply doesn't work when you are scraping at scale.

This is where the Microlink magic happens: we don't just detect the block; we understand which specific system is standing in your way and apply the exact behavior needed to resolve it.
