---
title: 'What is Microlink'
description: 'Understand what Microlink is, when to use it, and how a single API call replaces browser infrastructure, scraping scripts, and rendering pipelines.'
---

import { Figcaption } from 'components/markdown/Figcaption'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Link } from 'components/elements/Link'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

Microlink is an API that turns any URL into structured data, screenshots, PDFs, and more. You send a URL, Microlink opens it in a headless browser, and returns exactly what you asked for — metadata, images, documents, or custom-extracted fields — through a single HTTP GET request.

<MultiCodeEditorInteractive height={120} mqlCode={{ url: 'https://github.com/microlinkhq' }} />

<Figcaption>Every request starts with a URL. By default, Microlink returns normalized metadata for the page.</Figcaption>

No infrastructure to manage. No browser to install. No Puppeteer cluster to scale. You get a production-ready API that handles rendering, caching, and asset delivery out of the box. 

Plus automatic proxy resolution on any <ProBadge /> plan to bypass IP blocking, CAPTCHAs, cookie banners, and other scraping shields, so you can reliably reach sites that actively resist automation.

## The core idea

Most web automation tasks — taking screenshots, extracting data, generating PDFs, detecting technologies — require the same underlying work: open a browser, load a page, wait for it to render, then do something with the result.

Microlink abstracts that entire pipeline into query parameters. Instead of writing and maintaining browser automation code, you describe *what you want* and the API handles *how to get it*.

```bash
https://api.microlink.io?url=https://example.com&screenshot=true&pdf=true
```

That single URL opens a headless browser, renders the page, captures a screenshot, stores it on a CDN, and returns the asset metadata as JSON — all in one request.

## What you can do

Microlink is not a single-purpose tool. It is a general-purpose browser automation API with several built-in workflows:

| Workflow | What it does | Key parameter |
|----------|-------------|---------------|
| **Metadata** | Extract normalized title, description, image, author, date, logo from any URL | Default behavior |
| **Screenshot** | Capture a full-page or element-level image of any website | `screenshot` |
| **PDF** | Generate a printable document from any page | `pdf` |
| **Data extraction** | Scrape specific fields using CSS selectors and extraction rules | `data` |
| **Markdown** | Convert page content to clean Markdown | `data` + `attr: 'markdown'` |
| **Function** | Run arbitrary JavaScript with full Puppeteer access | `function` |
| **Insights** | Detect technologies behind a site or run Lighthouse audits | `insights` |

Every workflow shares the same endpoint, the same caching layer, the same authentication model, and the same response format. Learn one, and the rest follow the same pattern.

## See it in action

### Extract metadata from any link

The default response gives you everything needed for a link preview — title, description, image, logo, author, date, language, and publisher:

<MultiCodeEditorInteractive height={100} mqlCode={{ url: 'https://vercel.com' }} />

<Figcaption>Normalized metadata works across millions of sites without any configuration. Useful for link previews, content aggregators, and SEO tools.</Figcaption>

### Take a screenshot

Add `screenshot: true` to capture a visual snapshot of the page:

<MultiCodeEditorInteractive height={160} mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true, meta: false }} />

<Figcaption>The generated image is returned under <code>data.screenshot.url</code>, hosted on a CDN and ready to use.</Figcaption>

### Extract specific data

Use `data` rules to pull exactly the fields you need from any page:

<MultiCodeEditorInteractive height={500} mqlCode={{
  url: 'https://news.ycombinator.com',
  data: {
    stories: {
      selectorAll: '.athing',
      attr: {
        title: { selector: '.titleline > a', attr: 'text' },
        href: { selector: '.titleline > a', attr: 'href' }
      }
    }
  }
}} />

<Figcaption>Define what you want with CSS selectors. Microlink renders the page in a real browser first, so JavaScript-heavy sites work too.</Figcaption>

### Generate a PDF

Turn any page into a printable document:

<MultiCodeEditorInteractive height={160} mqlCode={{ url: 'https://example.com', pdf: true, meta: false }} />

<Figcaption>The PDF is generated from a real browser render, so the output matches what you see in the browser print dialog.</Figcaption>

### Run custom code

When built-in parameters are not enough, run your own JavaScript inside the headless browser:

<MultiCodeEditorInteractive height={240} mqlCode={{
  url: 'https://news.ycombinator.com',
  function: '({ page }) => page.evaluate(() => `There are ${document.querySelectorAll("a[href]").length} links`)',
  meta: false
}} />

<Figcaption>Full Puppeteer access through a single API call. No infrastructure to manage.</Figcaption>

## When to use Microlink

Microlink is the right tool when you need browser rendering without owning browser infrastructure:

- **Link previews** — show a rich card (title, image, description) for any URL your users share.
- **Social cards and OG images** — generate dynamic `og:image` screenshots for blog posts, profiles, or dashboards.
- **Web scraping** — extract structured data from pages that require JavaScript rendering.
- **PDF generation** — convert invoices, reports, or articles into downloadable documents.
- **Content pipelines** — convert web pages to Markdown for CMS imports or LLM training data.
- **Competitive intelligence** — detect the tech stack behind any website.
- **Performance monitoring** — run Lighthouse audits programmatically without a local Chrome installation.
- **Automated testing** — capture visual snapshots for regression testing across devices and viewports.
- **Hard-to-reach sites** — scrape or screenshot pages protected by CAPTCHAs, IP blocking, cookie banners, or bot detection.
- **AI agents and LLMs** — give your agent eyes and hands on the web: browse behind proxy shields, convert pages to Markdown to save tokens, and take screenshots so the model can see what's on screen.

### Automatic proxy resolution <ProBadge />

Many websites actively block automated requests through IP rate limiting, CAPTCHAs, anti-bot shields, or geo-restrictions. With a <ProBadge /> plan, Microlink includes **automatic proxy resolution** — the API routes requests through rotating, high-quality proxies so you don't have to deal with blocking yourself.

This means you can reliably extract data, take screenshots, or generate PDFs from sites that resist scraping, without configuring or paying for a separate proxy service. The proxy infrastructure is [well-tested against the top 500 most popular websites worldwide](https://microlink.io/blog/proxy-capabilities).

You can also bring your own proxy if you need a specific geographic location or a provider you already pay for. See the <Link href='/docs/api/parameters/proxy' children='proxy reference' /> for details.

### When something else is better

Microlink is not the best fit for every scenario:

| Scenario | Better alternative |
|----------|--------------------|
| You need to crawl thousands of pages following links | A dedicated crawler (Scrapy, Crawlee) |
| You need real-time, bidirectional browser interaction (debugging, live preview) | A local Puppeteer or Playwright instance |
| You only need static HTML — no JavaScript rendering required | A simple HTTP client (`fetch`, `curl`) |
| You need to store large volumes of scraped data | A scraping platform with built-in storage |

## How requests work

Every Microlink request follows the same lifecycle:

1. **You send a URL** plus optional parameters via HTTP GET.
2. **Microlink opens the page** in a headless browser (Chromium), handling JavaScript, redirects, and rendering.
3. **The API executes your request** — metadata extraction, screenshot capture, data rules, functions, or any combination.
4. **Assets are stored on a CDN** and cached according to the TTL you configure.
5. **You get a JSON response** with the results, or a direct asset response if you use `embed`.

The response always includes a `status` field (`success` or `fail`) and a `data` object with the requested fields:

```json
{
  "status": "success",
  "data": {
    "title": "microlink.io",
    "description": "Turn websites into data.",
    "image": {
      "url": "https://avatars0.githubusercontent.com/u/29799436?s=280&v=4",
      "type": "png",
      "size": 4118,
      "width": 280,
      "height": 280,
      "size_pretty": "4.12 kB"
    }
  }
}
```

## Combine workflows in one call

A single request can produce multiple outputs. For example, extract metadata *and* take a screenshot at the same time:

<MultiCodeEditorInteractive mqlCode={{ url: 'https://github.com/microlinkhq', screenshot: true }} />

<Figcaption>The response includes both <code>data.screenshot</code> and the normalized metadata fields. Disable metadata with <code>meta: false</code> when you only need the screenshot.</Figcaption>

## Embed assets directly

Instead of parsing JSON, you can make the API URL behave like a direct image, PDF, or any other asset. Use `embed` to reference the field you want:

```html
<img src="https://api.microlink.io/?url=https://github.com/microlinkhq&screenshot&meta=false&embed=screenshot.url" />
```

This turns the API URL into a live screenshot you can use in `<img>` tags, CSS `background-image`, Markdown, or Open Graph meta tags — no JavaScript required.

## Microlink as a tool for AI agents

LLMs and autonomous agents need to interact with the web, but they face two problems: most websites block bot traffic, and raw HTML wastes context window tokens. Microlink solves both.

### Browse behind anti-bot shields

Agents that call URLs directly get blocked by CAPTCHAs, IP rate limits, and bot-detection scripts. Because Microlink renders pages through a real browser with automatic proxy resolution on <ProBadge /> plans, the agent can reach virtually any site without managing proxies or solving challenges itself.

### Save tokens with Markdown

Feeding raw HTML to an LLM is expensive and noisy — a typical page is 80%+ markup, scripts, and styling that carries no useful information. Convert the page to clean Markdown instead and send only the content the model needs:

<MultiCodeEditorInteractive height={300} mqlCode={{
  url: 'https://example.com',
  data: { content: { selector: 'body', attr: 'markdown' } },
  meta: false
}} />

<Figcaption>The Markdown output strips navigation, ads, and boilerplate. A page that would cost thousands of tokens as HTML fits in a fraction of that as Markdown.</Figcaption>

### Give the model eyes

Some tasks require the agent to *see* a page — verifying a layout, reading a chart, or understanding a visual element that isn't represented in the DOM. A screenshot gives the model a visual snapshot it can reason about:

<MultiCodeEditorInteractive height={200} mqlCode={{
  url: 'https://github.com/microlinkhq',
  screenshot: true,
  meta: false
}} />

<Figcaption>Feed the screenshot URL to a vision-capable model. The agent can describe, compare, or act on what it sees.</Figcaption>

### Extract structured data for tool use

Instead of asking the LLM to parse HTML, extract exactly the fields the agent needs as structured JSON — ready for tool calls, database writes, or downstream logic:

<MultiCodeEditorInteractive height={400} mqlCode={{
  url: 'https://news.ycombinator.com',
  data: {
    stories: {
      selectorAll: '.athing',
      attr: {
        title: { selector: '.titleline > a', attr: 'text' },
        href: { selector: '.titleline > a', attr: 'href' }
      }
    }
  },
  meta: false
}} />

<Figcaption>The agent gets clean JSON it can use directly — no parsing, no hallucinated selectors, no wasted tokens.</Figcaption>

### Why this matters

| Without Microlink | With Microlink |
|-------------------|----------------|
| Agent fetches HTML, gets blocked by CAPTCHA | Automatic proxy resolution bypasses anti-bot shields |
| Raw HTML eats 10,000+ tokens per page | Markdown conversion cuts token usage by 80%+ |
| Agent cannot see visual content | Screenshot gives the model a visual snapshot |
| LLM parses messy HTML, hallucinates structure | Structured JSON extraction returns exact fields |
| You manage headless browsers, proxies, and retries | One HTTP GET call, zero infrastructure |

## Built-in caching

Every response is cached on a global CDN. You control freshness with two parameters:

| Parameter | What it does | Default |
|-----------|-------------|---------|
| `ttl` <ProBadge /> | How long the cached response is considered fresh | 24 hours |
| `staleTtl` <ProBadge /> | How long a stale response can be served while Microlink refreshes it in the background | 0 |
| `force` <ProBadge /> | Bypass the cache entirely and generate a fresh response | `false` |

For most production use cases, the best setup is `ttl: '1d'` with `staleTtl: 0` — the user always gets an instant response, and Microlink refreshes the cache in the background.

See <Link href='/docs/guides/common/caching' children='caching patterns' /> for the full strategy.

## Free to start, scales with you

The API works **without an API key**. You get **50 free requests per day**, which is enough to build and test your integration. No signup, no credit card.

When you are ready for production, a <ProBadge /> plan unlocks higher quotas, configurable cache TTL, custom headers, proxy support, and priority rendering. See <Link href='/docs/api/basics/rate-limit' children='rate limit' /> and <Link href='/docs/api/basics/authentication' children='authentication' /> for details.

## Client libraries

You can call the API from any language that supports HTTP GET, but Microlink provides official libraries for a smoother developer experience:

| Library | Use case |
|---------|----------|
| <Link href='/docs/mql/getting-started/overview' children='MQL' /> | JavaScript/TypeScript client for Node.js, Edge runtimes, and the browser |
| <Link href='/docs/sdk/getting-started/overview' children='SDK' /> | Drop-in React, Vue, and vanilla JS components for rendering link previews |
| <Link href='/docs/api/getting-started/cli' children='CLI' /> | Explore the API from your terminal during local development |

## What's next

Now that you understand what Microlink does, pick the workflow that matches your goal:

- **<Link href='/docs/guides/screenshot' children='Screenshot' />** — capture high-quality images of any website.
- **<Link href='/docs/guides/data-extraction' children='Data extraction' />** — scrape structured data with CSS selectors.
- **<Link href='/docs/guides/metadata' children='Metadata' />** — get normalized link preview data.
- **<Link href='/docs/guides/pdf' children='PDF' />** — generate printable documents from any page.
- **<Link href='/docs/guides/markdown' children='Markdown' />** — convert pages to clean Markdown.
- **<Link href='/docs/guides/function' children='Function' />** — run JavaScript with full Puppeteer access.
- **<Link href='/docs/guides/insights' children='Insights' />** — detect technologies or run Lighthouse audits.

Or jump to <Link href='/docs/guides/common/production-patterns' children='production patterns' /> if you are ready to integrate.
