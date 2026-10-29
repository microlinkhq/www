---
title: 'prompt'
description: 'Describe the data you want in plain language and get back working Microlink function code, already run against the page, with its result.'
isPro: true
---

import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { Type } from 'components/markdown/Type'

Type: <Type children='<string>'/>

It turns a plain-language request into [function](/docs/api/parameters/function) code for the [url](/docs/api/parameters/url), runs that code, and returns both:

<MultiCodeEditorInteractive height={200} mqlCode={{
  url: 'https://news.ycombinator.com',
  prompt: 'get the title, points and comment count of the top stories',
  meta: false
}} />

The prompt describes the data, and the [url](/docs/api/parameters/url) says where it lives. A prompt is up to 4096 bytes and cannot be combined with custom [headers](/docs/api/parameters/headers), so it reads public pages only. Next to a [function](/docs/api/parameters/function), `prompt` is not a request for code: it reaches your function like any other [custom parameter](/docs/api/parameters/function#custom-parameters).

The code it writes uses selectors and the page's own data requests, never [page.goal](/docs/api/parameters/function#pagegoal) or an instruction to [page.extract](/docs/api/parameters/function#pageextract-with-an-instruction), so running it again needs no model.

## How it works

1. The page is opened in a browser and inspected: its rendered DOM and the requests it makes to load its data.
2. A model writes a function for that page. It may inspect a few more pages, such as one detail page, before writing it.
3. The function runs like any other [function](/docs/api/parameters/function) request, with the same limits.
4. When the run fails, returns nothing, or returns data that does not answer the prompt, the reason goes back to the model and it writes a fixed version, up to 3 attempts.

A second model reads a sample of the output and judges whether it answers the prompt. Its judgment is a check, not a proof: read the result before relying on it.

## Response

The response is the [function](/docs/api/parameters/function#response) response, so `isFulfilled`, `value`, `logging` and `profiling` mean the same, plus two fields:

| Field    | Description |
| -------- | ----------- |
| `code`   | The function as an ES module, ready to paste into your project and run with [microlink.io](https://www.npmjs.com/package/microlink.io) |
| `prompt` | How the code was written: `attempts`, `failures` (why each rejected attempt was rejected), `check`, `cost` (`usd`, tokens, `inspections`) and `timing` in milliseconds (`model`, `inspect`, `run`, `check`) |

`check.verdict` is `answers` when the output answers the prompt, `unsure` when the prompt can be read more than one way, `wrong` when the last output was rejected and no attempt was left to fix it, and `unchecked` when the check could not run.

When no attempt works, `isFulfilled` is `false`, `value` explains the last failure, and `code` is the last version written, so you can fix it yourself.

The `code` is yours: run it again as a [function](/docs/api/parameters/function) to get fresh data with no model involved.

## Caching

The response is cached like any other, keyed by the [url](/docs/api/parameters/url) and the prompt. Asking the same prompt again returns the cached code and result at no model cost. Use [force](/docs/api/parameters/force) to write the code again.

A response that did not end in working code the check accepted is cached for one minute only, so a passing failure is retried soon.

## Privacy

The prompt travels in the URL, like [function](/docs/api/parameters/function) code, so it can appear in logs and browser history. Do not put secrets in it.
