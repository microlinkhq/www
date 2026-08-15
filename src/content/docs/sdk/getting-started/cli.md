---
title: 'CLI'
description: 'Use the microlink binary bundled with the Microlink SDK. Every product is a subcommand, with flags mapping one-to-one to the SDK options.'
---

Installing [microlink.io](https://www.npmjs.com/package/microlink.io) also ships a `microlink` binary where every product is a subcommand. Flags map one-to-one to the [options](/docs/sdk/getting-started/options) each method accepts:

```bash
microlink markdown https://example.com
microlink screenshot https://example.com --fullPage
microlink logo https://github.com --square
microlink links https://example.com
microlink search "best coffee" --limit 10 --location es --api-key YOUR_KEY
```

Strings print raw; objects pretty-print as JSON, so the output is pipe-friendly. Every subcommand except `search` runs on the free tier without credentials — `search` requires an API key, passed as shown above or exported once as described below.

## Authentication

Pass your API key per invocation or export it once as an environment variable:

```bash
microlink search "web performance" --api-key YOUR_KEY
```

```bash
export MICROLINK_API_KEY=YOUR_KEY
microlink screenshot https://example.com
```

## Headers

Forward headers to the target page with `--header`:

```bash
microlink markdown https://example.com --header 'Cookie: auth_token=…'
```

## Structured input

Commands that take structured arguments accept inline JSON, and [`run`](/docs/sdk/methods/specialized#run) accepts a file:

```bash
microlink extract https://microlink.io --data '{"image":{"selector":"meta[property=og:image]","attr":"content","type":"image"}}'
microlink function https://example.com --file ./fn.js
```

Looking for a richer standalone terminal experience? That's [@microlink/cli](/integrations/cli).
