---
title: 'CLI'
description: 'Install and use the CLI to interact with the API from your terminal. Every product is a subcommand; flags map to API options.'
---

import { CodeEditor } from 'components/markdown/CodeEditor'

The `microlink` command ships with [microlink.io](https://www.npmjs.com/package/microlink.io). Install it globally, or run it with [npx](https://www.npmjs.com/package/npx):

<CodeEditor language='shell' autoHeight showFade={false} showTitle={false} blinkCursor>
npm install -g microlink.io
</CodeEditor>

<CodeEditor language='shell' autoHeight showFade={false} showTitle={false} blinkCursor>
npx microlink.io --help
</CodeEditor>

Every product is a subcommand. Pass a URL with no product to get unified metadata:

```bash
microlink https://example.com
microlink markdown https://example.com
microlink screenshot https://example.com --fullPage
microlink logo https://github.com --square
microlink search "best coffee" --limit 10 --location es
```

Strings print raw; objects pretty-print as JSON. Run `microlink login` to save an API key from your account, or pass `--api-key` / `$MICROLINK_API_KEY`. Add `--trace` to print the request and response.

See the [SDK CLI](/docs/sdk/getting-started/cli) page for authentication, headers, and structured input.
