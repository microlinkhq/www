---
title: 'CLI'
description: 'Install and use the CLI to interact with the API from your terminal. Perform requests, authenticate via API keys, and format JSON output.'
---

import { Terminal } from 'components/markdown/Terminal'

We provide a command-line interface for interacting with [Microlink API](/docs/api/getting-started/overview/) from your terminal, available as an [npm package](https://www.npmjs.com/package/@microlink/cli).

<Terminal>npm install @microlink/cli --global</Terminal>

Alternatively, if you have [npx](https://www.npmjs.com/package/npx), you can just run it.

<Terminal>npx install @microlink/cli --help</Terminal>

After that, `microlink` command will be available in your system.

```bash
microlink <url> [flags]

Flags
  --api-key      authenticate using an API key (default is `$MICROLINK_API_KEY`
  --colors       colorize output (default is `true`
  --copy         copy output to clipboard (default is `false`).
  --pretty       beauty response payload (default is `true`).


Examples
  microlink https://microlink.io&palette
  microlink https://microlink.io&palette --no-pretty
  microlink https://microlink.io&palette --api-key MY_API_KEY
```

