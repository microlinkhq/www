---
title: 'Microlink MCP gives AI agents screenshots, PDFs, and clean Markdown'
description: 'Microlink is now available as an MCP server. Screenshots, PDFs, markdown conversion, and web scraping through natural language. The web, LLM-ready.'
authors:
  - joseba
date: '2026-03-02'
---

Microlink is now available as an MCP server. One config block gives [Claude Desktop](https://claude.ai/download), [Cursor](https://cursor.com), [Windsurf](https://windsurf.com), and any other MCP-compatible client access to screenshots, PDFs, Markdown conversion, metadata extraction, Lighthouse audits, and more, with no boilerplate and no extra SDKs.

**TL;DR**

- Microlink is now available as an MCP server: **ten tools** behind one config block, for Claude Desktop, Cursor, Windsurf, and any other MCP-compatible client.
- Every request routes through Microlink’s headless browser infrastructure, with anti-bot evasion, automatic cookie banner dismissal, and proxy routing.
- `microlink_markdown` returns clean Markdown with **80% fewer tokens** than raw HTML.
- `microlink_screenshot` captures any URL at any viewport and returns a CDN-hosted image in seconds.
- `npx -y @microlink/mcp` runs the server on demand, so there is no global install.

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) is the open standard that lets AI agents use external tools through natural language. Instead of writing HTTP clients, handling auth, and parsing responses, you give your agent an MCP server and it handles the rest.

Add Microlink to your client’s MCP config:

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

`npx -y @microlink/mcp` runs the server on demand, so there is no global install and no signup to start.

## Every request runs through a headless browser

Agents fetching the real web hit bot detection, cookie banners that halt execution, and raw HTML that buries the content under thousands of tokens of nav bars, footers, and ads.

Every Microlink MCP request routes through Microlink’s headless browser infrastructure, with anti-bot evasion, automatic cookie banner dismissal, and proxy routing. The target site sees Microlink, not your agent and not your IP. Your agent gets structured, clean output instead of a raw dump.

## Markdown uses 80% fewer tokens than raw HTML

Ask your agent to fetch a page via [microlink_markdown](/markdown) and it gets clean Markdown: body content, structured headings, and relevant links. Headers, footers, cookie banners, and ads are stripped out, which leaves 80% fewer tokens than raw HTML.

`microlink_text` goes further and returns plain text only. It is the lightest option when you just need the words.

## Screenshots at any viewport, returned as CDN URLs

[microlink_screenshot](/screenshot) captures any URL and returns a CDN-hosted image in seconds. It supports full-page captures, element-level crops via CSS selector, any viewport, and any device, plus dark mode, browser chrome overlays, and custom CSS injection before capture.

A designer can ask for one URL at mobile, tablet, and desktop in a single prompt, and `microlink_screenshot` returns three CDN URLs with no browser open and no manual resizing.

## Ten tools behind one config block

- [microlink_screenshot](/screenshot): full-page, element crops, device emulation, overlays, custom CSS/JS injection.
- [microlink_pdf](/pdf): any URL as a PDF, with paper size, margins, orientation, and page ranges.
- [microlink_markdown](/markdown): any webpage as clean Markdown, with 80% fewer tokens.
- `microlink_text`: plain text only, the lightest way to read a page.
- [microlink_meta](/metadata): normalized metadata, including title, description, author, date, image, and favicon.
- `microlink_extract`: metadata, CSS selector scraping, screenshot, PDF, video, and [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) in one request.
- [microlink_insights](/insights): a Lighthouse audit plus [Wappalyzer](https://www.wappalyzer.com) tech-stack detection.
- `microlink_video` and `microlink_audio`: direct playable sources from YouTube, Vimeo, TikTok, SoundCloud, Spotify, and hundreds more.
- `microlink_palette`: the dominant color palette of any page, as hex codes plus [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/)-safe colors.

## Prompts replace API calls

Each of these prompts maps to one or more of the tools above, from `microlink_screenshot` to `microlink_pdf`:

- *"What can you do with the Microlink tool?"* The agent explains every capability in plain language, so you don’t need the docs.
- *"Screenshot our landing page at mobile, tablet, and desktop, full page, JPEG"* returns three CDN URLs from `microlink_screenshot`.
- *"Read this research paper and summarize the key findings"* puts clean Markdown, with 80% fewer tokens, straight into context.
- *"Audit this site's performance and tell me what stack they're running"* returns Lighthouse scores plus tech-stack detection in one `microlink_insights` response.
- *"Convert this documentation page to an A4 PDF"* returns a print-ready, CDN-hosted PDF from `microlink_pdf`.

## Get started

Paste the config block above into your MCP client and replace `your-api-key` with your Microlink API key. Setup details live on the [integration page](/integrations/mcp) and in the [MCP documentation](/docs/api/getting-started/mcp), and the server’s source is on [GitHub](https://github.com/microlinkhq/mcp).
