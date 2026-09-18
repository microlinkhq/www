---
title: 'Headless browsers are easy locally and hard in production'
subtitle: 'From 16GB zombie processes to one API call'
description: 'Learn how headless web browser enables scraping SPAs, creating assets and E2E testing, and why self-hosting infrastructure is often a trap.'
authors:
  - kiko
date: '2026-01-15'
---

A headless browser is [Chrome](https://www.google.com/chrome/) without the window: no address bar, no tabs, no bookmarks, only the engine. Unlike a *curl* or *fetch* request, it executes JavaScript fully and gives you the DOM as a user sees it.

**TL;DR**

- A headless browser executes JavaScript fully and gives you the DOM as a user sees it, which a cURL request cannot.
- Running one on a laptop takes a **10-line script**. Running one in production brings memory leaks, missing fonts, and cold starts.
- Zombie Chromium processes left by a `browser.close()` that fails to fire can eat **16GB of RAM** and crash an entire server cluster.
- On serverless functions like AWS Lambda, a **2-second** browser boot lands directly on the user's request.
- Microlink runs the browser for you: one `mql` call returns a screenshot, metadata, or a PDF.

It renders HTML and runs JavaScript like any browser, but it is driven from code or a **Command Line Interface (CLI)** instead of a visual display. That makes it useless for browsing and the standard tool for E2E testing, generating [PDFs and screenshots](/screenshot), and scraping modern SPAs.

Running one on a laptop takes a 10-line script. Running one in production brings memory leaks, missing fonts, and cold starts, and that gap is the reason Microlink exists.

## cURL returns markup, not content

```bash
curl -G https://microlink.io

# <!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true"/><link rel="preconnect" href="https://cdn.microlink.io" crossorigin="anonymous"/><meta name="generator" content="Gatsby 5.15.0"/>...
```

Ten years ago, scraping a website meant sending a single HTTP GET request and parsing the HTML that came back.

Send the same request to a site built with React, Vue, or Angular and you get back an empty tag. Those sites use [Client-Side Rendering](https://developers.google.com/web/updates/2019/02/rendering-on-the-web), so the content does not exist until the JavaScript runs.

An HTTP client cannot execute JavaScript, and **a headless browser can**. It starts a [Chromium instance](https://www.chromium.org/Home/), downloads the assets, waits for the network to go idle, runs the scripts, and then returns the rendered data.

[Microlink](/) runs that browser for you. One request to the API returns ready-to-use assets or JSON, like the `title`, `description`, `image`, and `logo` fields below:

```json
// curl -G "https://api.microlink.io" -d "url=https://microlink.io"
{
  "status": "success",
  "data": {
    "lang": "en",
    "author": "Microlink",
    "title": "Microlink | Headless Browser API: Screenshot, PDF & Previews",
    "publisher": "Microlink",
    "image": {
      "url": "https://cdn.microlink.io/logo/banner.jpeg",
      "type": "jpg",
      "size": 56978,
      "height": 1009,
      "width": 1686,
      "size_pretty": "57 kB"
    },
    "date": "2026-01-15T19:47:35.000Z",
    "url": "https://microlink.io/",
    "description": "Turn any URL into structured data. The all-in-one API for browser automation: screenshots, PDFs, scraping, and link previews. No infrastructure to manage.",
    "logo": {
      "url": "https://cdn.microlink.io/logo/logo.png",
      "type": "png",
      "size": 5187,
      "height": 500,
      "width": 500,
      "size_pretty": "5.19 kB"
    }
  },
  "statusCode": 200,
  "redirects": [],
  "headers": { … }
}
```

## Five jobs only a real browser can do

Most developers reach for [**Puppeteer**](https://pptr.dev/) or [**Playwright**](https://playwright.dev/) for one of these five jobs:

1. **Creating assets:** turning a dynamic HTML invoice into a PDF, or rendering an Open Graph image for a social media preview.
2. **Scraping SPAs:** reading data from a client-rendered site, which only exists after the page's JavaScript has run.
3. **E2E testing:** simulating a real user who logs in, clicks "buy", and checks out, which needs a real browser engine rather than a mock.
4. **Performance monitoring:** measuring the exact time a browser needs to render your site, the same signal Google uses to rank it.
5. **Anti-bot walls:** reading content behind a captcha without clicking the "I'm not a robot" checkbox by hand.

## Production breaks what worked on a MacBook Pro

Locally, the setup is `npm install puppeteer` and a 10-line script. Then the same script ships to production and fails in ways it never did on the laptop.

I have spent more hours than I care to admit debugging headless browsers in [Docker containers](https://hub.docker.com/_/alpine). Self-hosting the stack comes with three recurring failures:

- **Memory:** a single `browser.close()` that fails to fire leaves zombie Chromium processes behind. I have seen them eat 16GB of RAM and crash an entire server cluster.
- **Fonts:** a screenshot that looks right locally renders on a Linux server with missing fonts and emojis as square boxes, and the fix is a long list of font packages in the image.
- **Cold starts:** booting a browser takes time, and on serverless functions like [AWS Lambda](https://aws.amazon.com/pm/lambda) a 2-second boot lands directly on the user's request.

## Browser infrastructure belongs behind an API

At [Vercel](https://vercel.com/) I spent years on edge performance and on the obscure edge cases of headless browsers. Running Puppeteer at scale meant zombie processes, cold starts, and memory leaks, and I learned each one in production.

That experience is why Microlink became my primary mission: fix the cold start and the font problem once, in one place, so the teams calling it do not have to. We turned the browser into a [utility](/metadata) that you call instead of operate.

Instead of maintaining Dockerfiles and concurrency limits, you call `mql` with a URL and the options you need, here a screenshot of the microlinkhq GitHub profile:

```javascript
import mql from '@microlink/mql'

const { data } = await mql('https://github.com/microlinkhq', { screenshot: true }) // easy peasy
```

The same request can extract metadata, render PDFs, or get past the [anti-bot protections](/blog/antibot-detection-at-scale) used by major platforms. Every option is in the [API docs](/docs/api/getting-started/overview).

## Learn with Playwright, ship with an API

A headless browser connects your backend code to the page a user actually sees. To learn how it works, install Playwright and write the 10-line script that opens a page and reads its DOM.

To ship it, replace the Chromium processes on your servers with one `mql` call to the Microlink API, and track its [uptime](/status) instead of your RAM graphs.
