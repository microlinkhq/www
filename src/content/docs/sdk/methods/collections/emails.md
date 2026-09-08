---
title: 'emails'
description: 'Get every email address found on a page as an array of bare strings with the Microlink SDK, from mailto links and plain text alike.'
---

Scans the whole document — `mailto:` links and plain text — and returns every address found as a bare string, with any `mailto:` prefix stripped:

```js
const emails = await microlink.emails('https://microlink.io')

console.log(emails)
// => ['hello@microlink.io']
```

## Options

The [collection options](/docs/sdk/methods/collections#options) override the default rule of `selector: 'html'`, `attr: 'html'`, and `type: 'email'`. The `'email'` type is what turns the swept HTML into addresses, so keep it when changing the scope.

## Examples

Only the addresses in the footer:

```js
const emails = await microlink.emails('https://example.com', {
  selector: 'footer'
})
```

Addresses on a contact page rendered on the client:

```js
const emails = await microlink.emails('https://example.com/contact', {
  prerender: true,
  waitForSelector: 'main'
})
```

Obfuscated addresses — `name [at] domain [dot] com`, images, or JavaScript-assembled links — are not detected. For those, run your own logic against the rendered page with [function](/docs/sdk/methods/function).
