---
title: 'MCP'
description: 'Connect Microlink MCP to your AI client to extract metadata, screenshots, PDFs, insights, media, markdown, and text from any URL.'
---

import { Terminal } from 'components/markdown/Terminal'

Microlink MCP exposes [Microlink API](/docs/api/getting-started/overview/) as MCP tools for assistants like Claude, Codex, Cursor, and VS Code.

## Install

No global install is required. Run with `npx` (or `pnpm dlx` if you use pnpm):

<Terminal>npx -y @microlink/mcp</Terminal>

<Terminal>pnpm dlx @microlink/mcp</Terminal>

## Add it to your MCP client

Use this `mcpServers` entry:

```json
{
  "mcpServers": {
    "microlink": {
      "command": "npx",
      "args": ["-y", "@microlink/mcp"],
      "env": {
        // Optional. Free 50 reqs/day rate limit.
        "MICROLINK_API_KEY": "YOUR_MICROLINK_API_KEY"
      }
    }
  }
}
```

If no API key is provided, requests go to the free endpoint (`50 requests/day`).  
For higher/unlimited usage, get an API key at [microlink.io/#pricing](https://microlink.io/#pricing).

## Usage

Once you've added the MCP to your favorite LLM client, try asking it to take a screenshot of a specific webpage, generate a PDF, or fetch metadata. Just use plain language to describe what you want — the agent will know which **tool** to call and with what parameters.

## Tools

- `microlink_extract`: General extractor. Metadata + custom `data` scraping + optional screenshot/pdf/video/audio/insights/palette in one call.
- `microlink_screenshot`: Capture screenshots (`fullPage`, `element`, `overlay`, `type`, etc.).
- `microlink_pdf`: Generate PDFs (`format`, `margin`, `scale`, `pageRanges`, etc.).
- `microlink_video`: Extract playable video source (`data.video`).
- `microlink_audio`: Extract playable audio source (`data.audio`).
- `microlink_insights`: Lighthouse + technology detection.
- `microlink_meta`: Normalized metadata only (`title`, `description`, `image`, `logo`, etc.).
- `microlink_palette`: Extract color palette from detected images.
- `microlink_markdown`: Convert URL content to Markdown.
- `microlink_text`: Convert URL content to plain text.

Notes:
- `screenshot`, `pdf`, and `insights` accept `true` or `{ ...options }`.
- Empty objects like `{}` are treated as `true`.
- Boolean strings (`"true"`, `"false"`) and JSON-stringified objects are normalized for compatibility with some MCP clients.

## Response format

- JSON tools return `structuredContent` with:
  - `endpoint`, `requestUrl`, `finalUrl`, `statusCode`, `responseHeaders`, `microlink`
- Embed tools (`microlink_markdown`, `microlink_text`) return text in `content[0].text`.

## Examples

### Extract metadata + screenshot in one request

```json
{
  "tool": "microlink_extract",
  "arguments": {
    "url": "https://microlink.io",
    "screenshot": {
      "fullPage": true
    },
    "meta": true
  }
}
```

### Screenshot with overlay

```json
{
  "tool": "microlink_screenshot",
  "arguments": {
    "url": "https://microlink.io",
    "screenshot": {
      "overlay": { "browser": "dark" },
      "type": "png"
    }
  }
}
```

### Generate a PDF

```json
{
  "tool": "microlink_pdf",
  "arguments": {
    "url": "https://example.com",
    "pdf": {
      "format": "A4",
      "margin": "0.35cm"
    }
  }
}
```

### Get page insights

```json
{
  "tool": "microlink_insights",
  "arguments": {
    "url": "https://example.com",
    "insights": {
      "lighthouse": { "preset": "perf" },
      "technologies": true
    }
  }
}
```

### Convert a page to Markdown

```json
{
  "tool": "microlink_markdown",
  "arguments": {
    "url": "https://microlink.io/docs"
  }
}
```
