---
title: 'CLI'
---

We provided a Command Line Interface for interacting with [Microlink API](/docs/api/getting-started/overview/) from your terminal, available as [npm package](https://www.npmjs.com/package/@microlink/cli).

```bash
npm install @microlink/cli --global
```

Alternatively, if you have [npx](https://www.npmjs.com/package/npx), you can just run it.

```bash
npx install @microlink/cli --help
```

After that, `microlink-api` and `microlink-pro` commands will be available in your system.

```bash
$ microlink-api --help

A CLI for interacting with Microlink API.

Usage
  $ microlink-[api|pro] <url> [flags]

Flags
  --api-key       authenticate using an API key (default is `$MICROLINK_API_KEY`).
  --colors        colorize output (default is `true`).
  --copy          copy output to clipboard (default is `false`).
  --pretty        beauty response payload (default is `true`).


Examples
  microlink-api https://microlink.io&palette
  microlink-api --no-pretty https://microlink.io&palette
  microlink-pro --api-key=MyApiKey https://microlink.io&palette
```
