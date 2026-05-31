---
title: 'CLI'
description: 'Install and use the CLI to interact with the API from your terminal. Perform requests, authenticate via API keys, and format JSON output.'
---

import { CodeEditor } from 'components/markdown/CodeEditor'

We provide a command-line interface for interacting with [Microlink API](/docs/api/getting-started/overview/) from your terminal, available as an [npm package](https://www.npmjs.com/package/@microlink/cli).

<CodeEditor language='shell' autoHeight showFade={false} showTitle={false} blinkCursor>
npm install @microlink/cli --global
</CodeEditor>

Alternatively, if you have [npx](https://www.npmjs.com/package/npx), you can just run it.

<CodeEditor language='shell' autoHeight showFade={false} showTitle={false} blinkCursor>
npx @microlink/cli --help
</CodeEditor>

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

