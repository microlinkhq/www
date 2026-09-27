---
title: "Your Agent Doesn't Need a Browser. It Needs Answers."
subtitle: 'The browser should be infrastructure, not a user interface for the model.'
description: 'Most agent web tasks are reads. Treat the browser as a stateless URL-to-data primitive and return only the answer the model needs.'
authors:
  - kiko
date: '2026-09-17'
---

We keep giving agents browsers because browsers are how people use the web.

That is understandable. It is also the wrong default.

A person opens a tab, looks around, scrolls, clicks, waits, copies, and closes it. An agent usually wants something narrower: the title, the price, the article, the table, the links, a screenshot, or a PDF. It does not need to experience the page. It needs the answer produced by the page.

**TL;DR**

- Use a live browser when the task is an action: sign in, fill a form, make a choice, or change state.
- For reading, turn the browser into a function: URL in, typed data or an artifact out.
- Stateless browser primitives are easier to retry, cache, parallelize, observe, and compose into agent tools.
- Microlink exposes that layer through one API and MCP, while keeping the real browser behind it.

## Browsing is a means, not an outcome

A browser session is stateful. Every step depends on the previous one. A cookie banner moves a button. An animation delays a click. A navigation invalidates a selector. A model pays tokens to understand every intermediate screen, then pays again to decide the next action.

That is justified when the journey matters. It is waste when the result can be stated as a value.

Compare these two interfaces:

```text
open page -> inspect screen -> scroll -> find article -> copy text
```

```text
markdown(url) -> clean article
```

The second interface is smaller because it names the outcome. It can still use a real browser to render JavaScript, dismiss noise, and read the final DOM. The agent simply does not have to drive it.

## Data and action are different workloads

Reading and acting fail differently.

A read can usually be repeated. The same request can be cached, fanned out, timed, compared, and retried somewhere else. Its result is explicit: JSON, Markdown, text, an image, or a PDF.

An action carries history. A second click may submit twice. Retrying a checkout may create two orders. Authentication, account identity, and user approval become part of the state.

So the useful split is not browser versus no browser. It is:

- **Data plane:** extract, transform, render, return.
- **Action plane:** navigate, decide, mutate, confirm.

Use the action plane when the task genuinely crosses that line. Keep everything else on the data plane.

## The browser as a pure-looking function

The web is not pure, but a good browser API can give agents a pure-looking contract:

```js
const { data } = await microlink('https://example.com')
```

The implementation may start Chrome, wait for the page, execute JavaScript, normalize metadata, upload an artifact, and cache the result. The caller sees a request and a response.

That boundary buys useful properties:

- **Small context:** return the content, not a transcript of how it was found.
- **Parallel work:** fetch ten independent URLs without ten interactive sessions.
- **Retries:** repeat a failed read without replaying a brittle click sequence.
- **Caching:** identical requests can reuse the same result.
- **Observability:** measure one operation, its inputs, output, timing, and failure.
- **Composition:** expose the primitive through HTTP, an SDK, CLI, workflow tool, or MCP.

This is why agents benefit from boring APIs. The smarter the model becomes, the less browser ceremony it should have to perform.

## Return the smallest useful artifact

The right output depends on the question.

Need a summary? Return clean [Markdown](/markdown), not the full HTML document.

Need fields? Use [data rules](/docs/api/parameters/data) or a [Function](/function) and return JSON.

Need visual proof? Return a [screenshot](/screenshot).

Need a document another system can store or sign? Return a [PDF](/pdf).

Need normalized link information? Return [metadata](/metadata).

The browser remains capable of all of it. The agent only receives the representation that helps it finish the task.

## Why real Chrome still matters

Hiding the browser does not mean replacing it with a simple HTTP fetch.

Modern pages render client-side, load data after navigation, depend on browser APIs, and produce meaning through layout. A useful URL-to-answer layer needs a real browser as its source of truth. The abstraction should remove the operational burden, not lower the fidelity.

Microlink runs Chrome, applies the requested operation, and returns data or a CDN-hosted artifact. The browser is there when the page needs it. It is absent from the agent's control loop when the agent does not.

## Give agents capabilities, not tabs

A general browser tool is important. Some tasks really do require exploration and action.

It should be the escape hatch, not the first move.

Start with the outcome. If the outcome is information, expose information-shaped tools. If it is a visual artifact, expose an artifact-shaped tool. Only hand over a live browser when the sequence itself cannot be reduced.

Your agent does not need to browse the web the way you do. It needs the web to answer back.

## Try it

- [Microlink MCP](/integrations/mcp)
- [Metadata](/metadata)
- [Markdown](/markdown)
- [Function](/function)
- [Screenshot](/screenshot)
- [PDF](/pdf)
