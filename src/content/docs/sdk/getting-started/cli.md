---
title: 'CLI'
description: 'Use the microlink binary bundled with the Microlink SDK. Every product is a subcommand, with flags mapping one-to-one to the SDK options, plus login, tracing, and structured input.'
---

Installing [microlink.io](https://www.npmjs.com/package/microlink.io) also ships a `microlink` binary where every product is a subcommand. Flags map one-to-one to the [options](/docs/sdk/getting-started/options) each method accepts:

```bash
npm install -g microlink.io
```

```bash
microlink https://example.com
microlink markdown https://example.com
microlink screenshot https://example.com --fullPage
microlink logo https://github.com --square
microlink links https://example.com
microlink search "best coffee" --limit 10 --location es
```

Passing a URL with no product returns [metadata](/docs/sdk/methods/metadata). Strings print raw; objects pretty-print as JSON, so the output is pipe-friendly. Every subcommand except `search` runs on the free tier without credentials.

Print the markdown reference for any product with `docs`:

```bash
microlink extract docs
microlink screenshot docs
```

Run `microlink --help` for the list of products, or `microlink <product> --help` for the flags a product accepts. You can also try it without installing anything:

```bash
npx microlink.io screenshot https://example.com --fullPage
```

## Authentication

The `search` product needs an API key, and any other product uses it to unlock the [pro plan](/pricing). The CLI resolves it, in this order, from the `--api-key` flag, the `MICROLINK_API_KEY` environment variable, or the key saved by `microlink login`:

```bash
microlink search "web performance" --api-key YOUR_KEY
```

```bash
export MICROLINK_API_KEY=YOUR_KEY
microlink screenshot https://example.com
```

```bash
microlink login
```

`login` opens your [dashboard](https://dashboard.microlink.io) in the browser, lets you pick one of your API keys, and saves it under `~/.config/microlink/config.json` with owner-only permissions. `microlink logout` removes it.

## Headers

Forward headers to the target page with `--header` (or `-H`), repeatable:

```bash
microlink markdown https://example.com --header 'Cookie: auth_token=…'
```

Headers meant for the API request itself, rather than the target page, take the `--http.header.<name>` form:

```bash
microlink pdf https://example.com --http.header.authorization 'Bearer …'
```

## Structured input

Commands that take structured arguments accept inline JSON. [`extract`](/docs/sdk/methods/extract) reads its rules from `--data`, and [`function`](/docs/sdk/methods/function) reads its code from a file:

```bash
microlink extract https://microlink.io --data '{"image":{"selector":"meta[property=og:image]","attr":"content","type":"image"}}'
microlink function https://example.com --file ./fn.js
```

Any extra flag passed to `function` is forwarded to the function as a named argument, the same way [custom parameters](/docs/sdk/methods/function#custom-parameters) work in the SDK.

Object-shaped options such as `--viewport`, `--overlay`, or `--margin` take JSON too:

```bash
microlink screenshot https://example.com --viewport '{"width":1280,"height":800}'
```

## Tracing

Add `--trace` to print the exact API request and response instead of the result, with the API key masked. `--trace-full` prints the key in clear:

```bash
microlink screenshot https://example.com --fullPage --trace
```

Every successful call also prints a footer to stderr with the response size, timing, cache status, and `x-request-id`, so stdout stays clean for piping.

`--trace` is not available for `search` and `function`, which use their own transports.

## Endpoint

Point the CLI at a different API deployment with `--endpoint`, mirroring the client-level [option](/docs/sdk/getting-started/options#client-level-defaults) of the same name:

```bash
microlink metadata https://example.com --endpoint https://microlink.internal.example.com
```

See the [CLI](/integrations/cli) page for a walkthrough.
