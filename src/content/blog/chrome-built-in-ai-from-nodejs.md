---
title: 'Call Chrome Built-in AI from Node.js without a GPU'
subtitle: 'Running Gemini Nano on CPU with 16 GB RAM'
description: 'Chrome Built-in AI only exists inside a page, and Chrome for Testing will not download Gemini Nano. How we pack the model once, unpack it on the server, and call Prompt, Summarizer, and Language Detector from Node.js, on CPU, with no GPU and no extra API key.'
authors:
  - kiko
date: '2026-08-21'
---

![Gemini Nano wordmark](/images/google-gemini-nano-ai-1024x538.jpg)

[@browserless/ai](https://github.com/microlinkhq/browserless/tree/master/packages/ai) runs Chrome's Gemini Nano on a headless, GPU-less Chrome for Testing box and returns the result to your Node.js script. It evaluates three [Built-in AI](https://developer.chrome.com/docs/ai/built-in-apis) APIs: Prompt, Summarizer, and Language Detector.

**TL;DR**

- [Microlink](/) can run Gemini Nano on the same headless Chrome that already takes screenshots and PDFs, so Prompt, Summarizer, and Language Detector come with no extra cost.
- Anyone using [browserless](https://browserless.js.org) can do the same: [@browserless/ai](https://github.com/microlinkhq/browserless/tree/master/packages/ai) evaluates the page APIs and returns the result to your script.
- No GPU needed: Gemini Nano runs on a CPU with **16&nbsp;GB RAM** and 4+ cores, the same machines that take screenshots.

Built-in AI runs the model on-device, in the page. You can prompt, summarize, and detect language on the same origin as the content, instead of scraping the HTML, shipping it to a hosted LLM, and paying per token. The page never leaves Chrome.

## Chrome for Testing does not ship the model

We already run a [browserless](https://browserless.js.org) fleet and parse pages with [metascraper](https://metascraper.js.org). Local-first AI on that stack helps in the edge cases where the markup gives metascraper nothing else to read. Gemini Nano lives in the browser, and we run browsers, so it looked like an easy job. It wasn't.

When you launch a headless browser, you get **[Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing)**: a pinned, automation-only build with no auto-update and no branded-Chrome component updater. Gemini Nano is not in the Chrome binary, and the component updater is what downloads it, so Chrome for Testing has no way to get the model on its own.

## You call it from Node.js, Chrome runs it

[@browserless/ai](https://github.com/microlinkhq/browserless/tree/master/packages/ai) loads a packed model into Chrome. `createAI.unpack` puts the model in a `dir`, `createAI.launch({ dir })` starts Chrome for Testing with the model flags, and each call gets its own browser context that is destroyed when the call ends:

```js
const createBrowser = require('browserless')
const createAI = require('@browserless/ai')

// unpack a model you already packed
const { dir } = await createAI.unpack(createAI.download)

// launch Chrome for Testing with the model flags
const browser = createBrowser(createAI.launch({ dir }))

// one context per call; destroy it when the call ends
const ai = createAI(async teardown => {
  const browserless = await browser.createContext()
  teardown(() => browserless.destroyContext())
  return browserless
})


// Gemini Nano on action!
await ai.detectLanguage('https://example.com', { text: 'Hello, how are you today?' })
await ai.summarize('https://example.com', { type: 'tldr' })
await ai.prompt('https://example.com', { prompt: 'What is this page about?' })

// bye bye
await browser.close()
```

That `dir` is the model. Desktop Chrome already has it, and Chrome for Testing will not download it. After desktop Chrome has fetched Nano, the files live in two trees:

| Path | What it holds |
| --- | --- |
| OptGuideOnDeviceModel | weights.bin (~4&nbsp;GB) |
| optimization_guide_model_store | per-API adaptations (prompt, summarize, detect) |

Until those files are on disk, `ai.capabilities()` reports Prompt (`languageModel`) and Summarizer as `downloadable`, and Chrome for Testing never moves them past it:

```js
await ai.capabilities()
// {
//   languageModel: 'downloadable',
//   summarizer: 'downloadable',
//   languageDetector: 'unavailable',
//   translator: 'unavailable'
// }
```

## Pack the model once, run it anywhere

Packing runs on a machine that already has regular Chrome, and it produces the zip that Chrome for Testing will load:

```sh
# pack the model coming from regular Chrome binary
pnpm --filter @browserless/ai pack-model

# pack + upload the model
pnpm --filter @browserless/ai pack-model -- --upload
```

That writes `/tmp/browserless-ai-nano.zip`. The `--upload` flag pushes it to object storage over the S3 API, so every server in the fleet can fetch the same zip and pass it to `createAI.unpack`.

## Gemini Nano runs on CPU, on purpose

Chrome’s Built-in AI docs do not require a GPU for Prompt or Summarizer. They require either:

- a GPU with more than 4&nbsp;GB VRAM, or
- a CPU with 16&nbsp;GB RAM and 4+ cores

We take the second path, the same constraint we worked with in [WebGL without a GPU](/blog/webgl-without-a-gpu). Our servers have no GPU, so Gemini Nano runs on the CPU cores of the same machines that take screenshots.

## Try it

Pack the model with `pnpm --filter @browserless/ai pack-model`, then call `ai.prompt`, `ai.summarize`, or `ai.detectLanguage` with a URL. The source and the full example are in [@browserless/ai](https://github.com/microlinkhq/browserless/tree/master/packages/ai).
