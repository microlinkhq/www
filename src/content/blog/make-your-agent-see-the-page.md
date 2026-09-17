---
title: 'Make Your Agent See the Page'
subtitle: 'Four copy-paste Functions for turning a rendered page into agent context'
description: 'Extract numbered interactive elements, JSON-LD, heading outlines, and technology signals from a page with Microlink Function.'
authors:
  - kiko
date: '2026-09-17'
---

An agent does not need every byte in a page. It needs a compact model of what the page means and what can be done next.

We prepared four templates for the [Microlink Editor](/editor). Each runs inside the rendered page through [Microlink Function](/function), then returns JSON that is small enough to put directly into an agent's context.

Install the SDK for the examples:

```shell
npm install microlink.io
```

```js
import createClient from 'microlink.io'
const microlink = createClient()
```

## 1. Number the interactive page state

This returns visible links, buttons, inputs, selects, and text areas. Each element gets a stable index for the current snapshot, a role, a readable label, and a CSS path.

```js
const result = await microlink.function(
  'https://example.com',
  ({ page }) => page.$$eval(
    'a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=link]',
    elements => {
      const selector = element => {
        const path = []
        for (let node = element; node && node !== document.body; node = node.parentElement) {
          const siblings = [...node.parentElement.children]
            .filter(sibling => sibling.tagName === node.tagName)
          path.unshift(node.localName + (siblings.length > 1
            ? `:nth-of-type(${siblings.indexOf(node) + 1})`
            : ''))
        }
        return `body>${path.join('>')}`
      }
      const roles = { A: 'link', BUTTON: 'button', INPUT: 'input', SELECT: 'select', TEXTAREA: 'textbox' }
      return {
        title: document.title,
        url: location.href,
        elements: elements.filter(element => element.offsetParent)
          .map((element, index) => ({
            index,
            role: roles[element.tagName] || element.localName,
            text: (element.getAttribute('aria-label') || element.placeholder || element.innerText || '')
              .replace(/\s+/g, ' ').trim(),
            selector: selector(element)
          }))
      }
    }
  )
)

console.log(result.value)
```

Treat the selectors as snapshot state, not permanent site identifiers. A navigation or DOM update can change them.

## 2. Read JSON-LD

Publishers and shops often describe articles, products, organizations, breadcrumbs, and prices in `application/ld+json` scripts. This template parses every valid block and ignores malformed ones.

```js
const result = await microlink.function(
  'https://microlink.io',
  ({ page }) => page.$$eval('script[type="application/ld+json"]', scripts =>
    scripts.flatMap(script => {
      try {
        const value = JSON.parse(script.textContent)
        return Array.isArray(value) ? value : [value]
      } catch (_) {
        return []
      }
    })
  )
)

console.log(result.value)
```

This is source data supplied by the page. Validate the fields your workflow depends on rather than assuming every publisher follows the schema perfectly.

## 3. Build a visible heading outline

Headings give an agent a cheap map before it decides what to read in depth.

```js
const result = await microlink.function(
  'https://microlink.io',
  ({ page }) => page.$$eval('h1, h2, h3, h4, h5, h6', headings =>
    headings
      .filter(heading => heading.getClientRects().length)
      .map(heading => ({
        level: Number(heading.tagName.slice(1)),
        text: heading.textContent.replace(/\s+/g, ' ').trim()
      }))
      .filter(heading => heading.text)
  )
)

console.log(result.value)
```

Filtering by rendered geometry removes headings hidden with CSS. The result describes what a visitor can see, not every heading left in the source.

## 4. Inspect technology signals

This template gathers declared generator metadata, script and stylesheet hosts, and a small set of browser globals.

```js
const result = await microlink.function(
  'https://microlink.io',
  ({ page }) => page.evaluate(() => ({
    generator: document.querySelector('meta[name="generator"]')?.content || null,
    scripts: [...document.scripts]
      .map(script => script.src).filter(Boolean)
      .map(src => new URL(src).hostname)
      .filter((host, index, hosts) => hosts.indexOf(host) === index),
    stylesheets: [...document.querySelectorAll('link[rel="stylesheet"][href]')]
      .map(link => new URL(link.href).hostname)
      .filter((host, index, hosts) => hosts.indexOf(host) === index),
    globals: ['React', 'Vue', 'angular', 'jQuery', 'Shopify', 'WordPress']
      .filter(name => name in window)
  }))
)

console.log(result.value)
```

These are signals, not a definitive technology inventory. Production builds may remove globals, proxies can hide hosts, and unrelated third-party scripts can add them.

## One rendered page, four useful views

The patterns answer different questions:

- page state: what can the agent interact with?
- JSON-LD: what structured facts does the publisher declare?
- outline: how is the visible content organized?
- technology signals: what implementation clues are present?

Open the [Editor](/editor), pick a template, change the URL, and inspect the response before putting it into a workflow. The code is ordinary Puppeteer-compatible JavaScript, so you can narrow each template to the exact context your agent needs.
