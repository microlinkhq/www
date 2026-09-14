---
title: 'Our MCP Server Passed the Spec. Real Clients Broke It.'
subtitle: 'What we learned testing @microlink/mcp against Claude Code, Cursor, and VS Code'
description: 'Strict MCP clients validate tool results against your outputSchema, and that silently swallowed our actionable errors. Two days of testing against real clients: 19 PRs, three releases, and a new rule for how errors should talk to agents.'
authors:
  - kiko
date: '2026-09-13'
---

Two days. 19 pull requests. Three releases. That is what it took to make our MCP server work the way we thought it already did.

[@microlink/mcp](/integrations/mcp) turns Microlink into tools any agent can call: URL metadata, screenshots, PDFs, Markdown and JSON extraction, JavaScript execution in a real browser, Google search, Lighthouse audits. One config block, 20 tools, no SDK. It passed the spec checks. Then we installed it into real clients and watched it fail in ways the spec never mentions.

**TL;DR**

- Strict MCP clients validate tool results against the tool's `outputSchema`. If your error does not match the schema, the client discards it and shows a generic validation failure instead. Your careful error message never reaches the model.
- Return failures as regular tool content with `isError: true`, and write them for the agent, not the developer: what failed, why, and the exact next step.
- Your onboarding docs are part of the integration. Ours had a broken link and a wrong VS Code config. No conformance suite will ever tell you that.

## The setup

The point of an MCP server is that the consumer never reads your docs. The model reads your tool descriptions, calls your tools, and interprets whatever comes back. So the honest way to test one is to be that consumer.

We installed `@microlink/mcp` into [Claude Code](https://claude.com/product/claude-code), [Cursor](https://cursor.com), and VS Code's native MCP support, and used it the way a real user would: ask for things, make mistakes, hit limits, copy-paste the config from the README.

## The failure mode nobody warns you about

We declare an `outputSchema` for every tool. That is good practice: it lets clients render structured results and lets models rely on a stable shape.

It also signs you into a contract that is easy to miss: **every result must match the schema, including the failures**.

When a call failed, we returned an error object where the schema expected a successful result. Strict clients validated it, rejected it, and surfaced a generic schema-validation failure. The actual error, the one that explained what went wrong and how to fix it, was swallowed before the model ever saw it. What the agent received looked like this (the wording varies by client):

```text
Tool result does not match the tool's output schema.
```

That is the worst failure an agent can get. There is no reason, no recovery path, nothing to relay to the user. The model will either retry the same call or improvise around it. Both waste the user's time, and neither tells them the fix was a paid capability, a missing API key, or a quota limit.

## Errors are content

The fix follows from the diagnosis: a failure is not a broken success. Return it as regular tool content with `isError: true`. Schema validation does not apply to error content, so the message always survives the trip to the model.

Then make the message do work. When we know the recovery path, the error carries it explicitly:

```js
{
  isError: true,
  content: {
    reason,   // stable machine-readable code: quota exceeded, proxy required...
    hint,     // the exact next step, written for the agent to relay
    upgrade   // how to unlock the capability, when it is a plan limit
  }
}
```

Our rule: an error should explain why it failed and guide you to the fix. A quota error is not an apology, it is a purchase moment. It should say what you hit and exactly how to get more. Same for capabilities behind an API key or a paid tier: name the capability, name the step.

We verified the fix against the published package, not the repo. Fresh install of the release, same failing scenario in a strict client, and the full reason and hint came through as a normal tool error the model could read and act on.

## The bugs that only exist in the real world

No spec test covers your docs. The real installs caught three:

- The link to the integration guide in our README 404'd.
- Our VS Code configuration snippet was wrong. VS Code has its own native MCP config format, ours did not match it, and copy-paste onboarding failed on the spot.
- The server requires Node.js 24+. We had never written that down anywhere.

Each is a one-line fix. Each completely blocks a new user. You only find them by doing the install yourself, in the client, from scratch.

## What shipped

The loop was always the same: install, break it, fix it, add a test, ship it as its own small PR. Two days of that produced 19 merged PRs and three releases (2.4.0, 2.5.0, 2.5.1): errors that explain and guide, `outputSchema` on all 20 tools, agent-oriented input descriptions, MCP annotations, server instructions, corrected nullable types, and the docs fixes above.

## Lessons

1. **`outputSchema` is a contract you sign for failures too.** Either your errors match it, or they travel as `isError` content. Anything in between gets replaced by a validation message that helps no one.
2. **The spec is the floor; clients are the truth.** Conformance tells you the server is valid. Only Claude Code, Cursor, or VS Code can tell you it is usable.
3. **Write errors for the reader, and the reader is a model.** Reason plus next step, every time. A stack trace is a dead end; a hint is a recovery.
4. **Onboarding is part of the protocol.** A wrong config block is a broken integration, exactly as much as a wrong status code.

## Try it

- [Integration page](/integrations/mcp)
- [Documentation](/docs/api/getting-started/mcp)
- [GitHub](https://github.com/microlinkhq/microlink)
