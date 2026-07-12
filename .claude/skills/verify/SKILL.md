---
name: verify
description: Verify UI changes in microlink/www by driving the Gatsby dev server with agent-browser.
---

# Verify microlink/www changes

## Launch

Kiko usually has `npm run dev` already running on port 8000 — check with
`lsof -nP -iTCP:8000 -sTCP:LISTEN` before starting one (it serves this repo and
hot-reloads edits). If nothing is listening, run `npm run dev` in the background;
`predev` fetches remote data first, allow ~1-2 min until pages compile.

## Drive

Gatsby dev renders client-side, so `curl` won't show page content — use the
agent-browser skill:

```bash
agent-browser open http://localhost:8000/<page>
agent-browser wait --load networkidle   # first hit compiles the page; retry screenshot if it shows "Preparing requested page"
agent-browser screenshot out.png
agent-browser set viewport 480 800       # mobile check
agent-browser set media light reduced-motion   # a11y motion check
agent-browser eval "<js>"                # inspect DOM state
```

## Gotchas

- `[error] 404 page could not be found` in the console is a Gatsby dev artifact, not a bug.
- SPA navigation: exercise mount/unmount by clicking a `Link` then `window.history.back()` via eval.
- Lint changed files with `npx standard <files>`.
