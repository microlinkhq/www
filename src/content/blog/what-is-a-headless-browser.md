---
title: 'What Is a Headless Browser?'
subtitle: 'And Why I Stopped Hating Them'
description: 'Learn how headless web browser enables scraping SPAs, creating assets and E2E testing, and why self-hosting infrastructure is often a trap.'
date: '2026-01-15'
---

Think of a headless browser as programmable Chrome without the window. Unlike basic *curl* or *fetch* requests, it executes JavaScript fully, giving you access to the DOM just as a user sees it.

Top uses include E2E testing, dynamic asset generation such as [PDFs and screenshots](/screenshot), and scraping modern SPAs. Running headless browsers in production causes issues like memory leaks, missing fonts, and cold starts.

If you strip away the address bar, the tabs, the bookmarks, and the entire graphical interface from [Chrome](https://www.google.com/chrome/), what do you have left?

You have the engine. That's a **headless browser**. A browser that doesn't value pixels on a screen; it only cares about reading code.

It handles standard tasks like rendering HTML and running JavaScript. It works only through a **Command Line Interface (CLI)** and not a visual display. For a regular user, this is useless. For a developer, it's the only way to automate the modern web.

## Why cURL doesn't cut it anymore

```bash
curl -G https://microlink.io

# response: <!DOCTYPE html><html lang="en"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true"/><link rel="preconnect" href="https://cdn.microlink.io" crossorigin="anonymous"/><meta name="generator" content="Gatsby 5.15.0"/>...
```

Ten years ago, if you wanted to scrape a website, you just sent a simple HTTP GET request.

Try that today on a site built with React, Vue, or Angular, and you'll get back an empty tag. That's because modern sites render content dynamically [(Client-Side Rendering)](https://developers.google.com/web/updates/2019/02/rendering-on-the-web). The content doesn't exist until the JavaScript executes.

A simple HTTP request can't execute JS. **A headless browser can**. It spins up a [Chromium instance](https://www.chromium.org/Home/), downloads the assets, waits for the network to idle, executes the scripts, and then hands you the data.

Instead, let [Microlink](/) handle these tasks. An API manages the infrastructure and gives you ready-to-use assets or JSON.

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

## The Big 5 Use Cases

Most of us reach for libraries like [**Puppeteer**](https://pptr.dev/) or [**Playwright**](https://playwright.dev/) for three reasons:

1. **Creating Assets:** You need to change a dynamic HTML invoice into a PDF. You also need to make a social media preview image (Open Graph) quickly.  
2. **Scraping SPAs:** As mentioned above, if you need data from a dynamic site, you need a headless browser to "see" it.  
3. **E2E Testing:** You need to simulate a real user logging in, clicking "buy," and checking out. You can't mock this; you need a real browser engine to prove the code works.  
4. **Performance monitoring:** Measure the exact time a web browser needs to render your site. Make Google love you.  
5. **Anti bot walls:** Viewing the content hidden behind a captcha without manually clicking the "I'm not a robot" checkbox.

## The "It Works on My Machine" Trap

Here is the part that generic tutorials won't tell you.

Running a headless browser on your local MacBook Pro is easy. You npm install puppeteer, write a 10-line script, and you feel like a genius.  

**Then you deploy it to production, and everything breaks. We've been there.**  

I have spent more hours than I care to admit debugging headless browsers in [Docker containers](https://hub.docker.com/_/alpine). Here is the reality of self-hosting this stack:

* **RAM Gluttony:** Chromium is hungry. I've seen "zombie" browser processes eat 16GB of RAM and crash an entire server cluster because a *browser.close()* function failed to fire.  
* **The Font Nightmare:** Your screenshot looks great locally. On your Linux server, the fonts are missing, and your emojis look like square boxes. Fixing this requires installing a bloat of font packages.  
* **Cold Starts:** Booting a browser takes time. If you are using serverless functions [(like AWS Lambda)](https://aws.amazon.com/pm/lambda), that 2-second boot time kills your user experience.

## Don't Build It. Call It.

If your core business isn't "building browser infrastructure," you shouldn't be managing headless instances. You should be using an API. That's the philosophy behind **Microlink**.

During my time at [Vercel](https://vercel.com/), I spent years obsessing over edge performance and debugging the most obscure edge cases of headless browser technology. I learned the hard way that running Puppeteer at scale is a nightmare of zombie processes, cold starts, and memory leaks.

My hatred turned into an obsession: after battling the nightmare of scaling browser infrastructure at Vercel, I decided to solve the 'cold start' and 'font nightmare' once and for all by making Microlink my primary mission.

We built Microlink to solve those specific engineering headaches so you don't have to, and because I needed it too. We turned the browser into a [high-performance utility](/meta).

Instead of fighting with Dockerfiles and concurrency limits, you just hit an endpoint:

```javascript
import mql from '@microlink/mql'

const { data } = await mql('https://github.com/microlinkhq', { screenshot: true }) // easy peasy
```

Explore our [docs](/docs/api/getting-started/overview) to see the full potential of browserless automation. Our infrastructure can even bypass the complex [anti bot protections](/blog/antibot-at-scale) used by major platforms.


## The Verdict

A headless browser is a powerful tool in your arsenal. It bridges the gap between your backend code and the frontend user experience.

If you are just learning? Go install Playwright and have fun. But if you are shipping to production? Do yourself a favor and offload the browser management. Your [uptime](/status) (and your sanity) will thank you.
