---
title: 'CLI'
---

We provided a Command Line Interface for interacting with [Microlink API](/docs/api/getting-started/overview/) from your terminal, available as [npm package](https://www.npmjs.com/package/@microlink/cli).

<Terminal>npm install @microlink/cli --global</Terminal>

Alternatively, if you have [npx](https://www.npmjs.com/package/npx), you can just run it.

<Terminal>npx install @microlink/cli --help</Terminal>

After that, `microlink-api` and `microlink-pro` commands will be available in your system.

```bash
$ microlink-api --help

A CLI for interacting with Microlink API.

Usage
  $ microlink-[api|pro] <url> [flags]

Flags
  --print-resume      print response resume.  [default=true]
  --print-body        print response body.    [default=true]
  --colors            colorize output.        [default=true]

Examples
  microlink-api https://microlink.io&palette
  microlink-pro https://microlink.io&palette&apiKey=MyApiKey
```
