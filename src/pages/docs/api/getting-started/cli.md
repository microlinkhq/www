---
title: 'CLI'
---

We provided a Command Line Interface for interacting with [Microlink API](/docs/api/getting-started/overview/) from your terminal.

It is available as [npm package](https://www.npmjs.com/package/@microlink/cli)

<Terminal>npm install @microlink/cli --global</Terminal>

After that, `microlink-api` and `microlink-pro` commands will be available in your system.

```bash
$ microlink-dev --help

A CLI for interacting with Microlink API.

Usage
  $ microlink-[api|pro] <url> [flags]

Flags
  --headers       print response headers. [default=true]
  --body          print response body.    [default=true]
  --colors        colorize output.        [default=true]

Examples
  microlink-api https://microlink.io&palette
  microlink-pro https://microlink.io&palette&apiKey=MyApiKey
```
