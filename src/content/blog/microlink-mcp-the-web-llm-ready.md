---
title: 'Microlink MCP: The Web, LLM-Ready'
description: 'Microlink is now available as an MCP server. Screenshots, PDFs, markdown conversion, and web scraping through natural language. The web, LLM-ready.'
authors:
  - joseba
date: '2026-03-02'
---

The web wasn't built for LLMs. Microlink bridges the gap. One config block gives [Claude Desktop](https://claude.ai/download), [Cursor](https://cursor.com), [Windsurf](https://windsurf.com), and any MCP-compatible client access to screenshots, PDFs, markdown conversion, metadata extraction, Lighthouse audits, and more. No boilerplate. No extra SDKs. Just ask.

[MCP — Model Context Protocol](https://modelcontextprotocol.io) is the open standard that lets AI agents use external tools through natural language. Instead of writing HTTP clients, handling auth, and parsing responses, you give your agent an MCP server and it handles the rest.

```json
{
  "mcpServers": {
    "microlink": {
      "command": "npx",
      "args": ["-y", "@microlink/mcp"],
      "env": {
        "MICROLINK_API_KEY": "your-api-key"
      }
    }
  }
}
```

No global install. No signup to start.


## What makes it different

Most agents struggle with the real web: bot detection blocks requests, cookie banners halt execution, and raw HTML — when it does come through — is thousands of tokens of nav bars, footers, and ad noise that buries the actual content.

Every Microlink MCP request routes through its headless browser infrastructure. Anti-bot evasion, automatic cookie banner dismissal, proxy routing. The target site sees Microlink, not your agent, not your IP. Your agent gets structured, clean output. Not a raw dump.


## 80% fewer tokens. Cleaner content.

Ask your agent to fetch a page via [`microlink_markdown`](/markdown) and it gets clean Markdown — body content, structured headings, relevant links. Headers, footers, cookie banners, ads stripped out. 80% fewer tokens than raw HTML.

`microlink_text` goes further: plain text only. The lightest option when you just need the words.

Less noise. Faster responses. More accurate results.


## Pixel-perfect screenshots, on demand

[`microlink_screenshot`](/screenshot) captures any URL and returns a CDN-hosted image in seconds. Full-page, element-level crops via CSS selector, any viewport, any device. Dark mode, browser chrome overlays, custom CSS injection before capture.

Designers: ask your agent to screenshot any URL at mobile, tablet, and desktop in one go. No browser open. No manual resizing. Just ask.


## One config block. Ten tools.

- [`microlink_screenshot`](/screenshot) — Full-page, element crops, device emulation, overlays, custom CSS/JS injection.
- [`microlink_pdf`](/pdf) — Any URL as a PDF. Paper size, margins, orientation, page ranges.
- [`microlink_markdown`](/markdown) — Any webpage as clean Markdown. 80% fewer tokens. No noise.
- `microlink_text` — Plain text only. The lightest way to read a page.
- [`microlink_meta`](/metadata) — Normalized metadata: title, description, author, date, image, favicon.
- `microlink_extract` — Metadata, CSS selector scraping, screenshot, PDF, video, [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) — one request.
- [`microlink_insights`](/insights) — [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) audit plus [Wappalyzer](https://www.wappalyzer.com) tech-stack detection.
- `microlink_video` and `microlink_audio` — Direct playable sources from YouTube, Vimeo, TikTok, SoundCloud, Spotify, and hundreds more.
- `microlink_palette` — Dominant color palette from any page. Hex codes plus [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)-safe colors.


## No code. Just ask.

*"What can you do with the Microlink tool?"* → The agent explains every capability in plain language. No docs needed.

*"Screenshot our landing page at mobile, tablet, and desktop — full page, JPEG"* → Three CDN URLs. Done.

*"Read this research paper and summarize the key findings"* → Clean Markdown, 80% fewer tokens, straight into context.

*"Audit this site's performance and tell me what stack they're running"* → Lighthouse scores plus tech-stack detection, in one response.

*"Convert this documentation page to an A4 PDF"* → Print-ready, CDN-hosted, immediately.


## Get started

- [Integration page](/integrations/mcp)
- [Documentation](/docs/api/getting-started/mcp)
- [GitHub](https://github.com/microlinkhq/mcp)
