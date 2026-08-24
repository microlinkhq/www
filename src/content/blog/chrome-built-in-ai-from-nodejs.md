---
title: 'Chrome Built-in AI from Node.js'
subtitle: 'How we run Gemini Nano on a GPU-less headless fleet'
description: 'Chrome Built-in AI only exists inside a page, and Chrome for Testing will not download Gemini Nano. How we pack the model once, unpack it on the server, and call Prompt, Summarizer, and Language Detector from Node.js — on CPU, with no GPU and no extra API key.'
date: '2026-08-21'
---

![Gemini Nano wordmark](/images/google-gemini-nano-ai-1024x538.jpg)

Chrome ships [Built-in AI](https://developer.chrome.com/docs/ai/built-in-apis): the model runs on-device, in the page.

You can prompt, summarize, and detect language on the same origin as the content. You do not scrape the HTML, ship it to a hosted LLM, and pay per token. The page never leaves Chrome.

We already run a [browserless](https://browserless.js.org) fleet and parse pages with [metascraper](https://metascraper.js.org). A little local-first AI on that stack would help in the edge cases where the markup gives you nothing else.

Gemini Nano lives in the browser, and we run browsers. That sounds like an easy job. It isn’t.

When you launch a headless browser, you get **[Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing)**: a pinned, automation-only build with no auto-update and no branded-Chrome component updater.

There is no way to run the model from Chrome for Testing, because the model is not in the binary.

That is why we shipped [@browserless/ai](https://github.com/microlinkhq/browserless/tree/master/packages/ai). It evaluates Prompt, Summarizer, and Language Detector on a headless, GPU-less Chrome for Testing box and returns the result to your script.

**TL;DR**

- [Microlink](/) can run Gemini Nano on the same headless Chrome that already takes screenshots and PDFs. Prompt, summarize, detect language with no extra cost.
- Anyone using [browserless](https://browserless.js.org) can too: The package [@browserless/ai](https://github.com/microlinkhq/browserless/tree/master/packages/ai) evaluates the page APIs and returns the result to your script.

## You call it from Node.js. Chrome runs it.

[@browserless/ai](https://github.com/microlinkhq/browserless/tree/master/packages/ai) loads a packed model into Chrome so you can call Prompt, Summarizer, and Language Detector from Node.js.

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

That `dir` is the model. Desktop Chrome already has it; Chrome for Testing will not download it. After desktop Chrome has fetched Nano, the files live in two trees:

| Path | What it holds |
| --- | --- |
| OptGuideOnDeviceModel | weights.bin (~4&nbsp;GB) |
| optimization_guide_model_store | per-API adaptations (prompt, summarize, detect) |

Until those files are on disk, Chrome for Testing keeps Prompt and Summarizer stuck:

```js
await ai.capabilities()
// {
//   languageModel: 'downloadable',
//   summarizer: 'downloadable',
//   languageDetector: 'unavailable',
//   translator: 'unavailable'
// }
```

## Pack it once. Run it anywhere.

Do this on a machine that already has regular Chrome. The zip is what Chrome for Testing will load:

```sh
# pack the model coming from regular Chrome binary
pnpm --filter @browserless/ai pack-model

# pack + upload the model
pnpm --filter @browserless/ai pack-model -- --upload
```

That writes `/tmp/browserless-ai-nano.zip`. `--upload` pushes it to object storage over the S3 API.

## On CPU, on purpose

Chrome’s Built-in AI docs do not require a GPU for Prompt or Summarizer. They require either:

- a GPU with more than 4&nbsp;GB VRAM, or
- a CPU with 16&nbsp;GB RAM and 4+ cores

We take the second path. Same constraint as [WebGL without a GPU](/blog/webgl-without-a-gpu).
