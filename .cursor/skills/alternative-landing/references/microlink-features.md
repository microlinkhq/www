# Microlink Features & Pricing

Source of truth for the `microlink` column in `COMPARISON.rows` and for feature claims. Only use features and facts listed here. Do not invent capabilities.

## Features (microlink: true)

These are the confirmed Microlink capabilities. Use these capabilities when building `COMPARISON.rows`. The feature name may be phrased slightly differently per page for variety, but the capability must match.

### Core capture

- Screenshot capture
- Full-page screenshots
- Element-level capture (CSS selector)
- PDF generation
- HTML rendering
- Animated GIF output / Animated screenshots
- Video output (page content)
- Dark/light mode capture
- Device emulation presets

### Browser interaction

- Custom JS/CSS injection
- Custom HTTP headers
- Custom cookies
- Hide/remove elements (CSS selectors)
- Click/scroll interactions
- Wait for selector
- Cookie banner blocking
- Ad blocking
- Remote JS execution (return values)

### Security & network

- Signed request URLs
- Built-in response cache
- Custom proxy support
- Built-in proxy (auto-rotating residential, on by default)
- Proxy geolocation: pick the exit country (181 countries; pages keep it as a `PROXY_COUNTRIES` constant)
- Antibot detection (30+ providers: Cloudflare, DataDome, Akamai, etc.)

### Data extraction & enrichment

- Metadata extraction (Open Graph, Twitter Cards, JSON-LD, etc.)
- MQL (structured data extraction / Microlink Query Language)
- Lighthouse audits
- Technology detection
- Color palette extraction
- Markdown rendering / Markdown conversion
- HTML and text extraction (`/html`, `/text`)
- File conversion (PDF, docx, xlsx, pptx to markdown)

### Developer experience

- Link previews SDK (React, Vue, vanilla JS)
- Typed SDKs (React/Vue/JS)
- Browser chrome overlay (screenshot.overlay)
- Direct embed (no backend needed)
- MCP server
- Open-source core (MIT: Metascraper, MQL, Browserless)
- CDN edge nodes: `CDN_EDGES` from `src/helpers/cdn-edges.js` (never type the count)

### Partial / conditional

These use a short string instead of a boolean:

- No-code integrations (Zapier, Make, n8n) → `'Partial'`

### Not supported (microlink: false)

These are capabilities Microlink does NOT have. Use `microlink: false`:

- Async + webhooks
- S3 / cloud storage direct upload
- Bulk screenshots (batch processing)
- OpenAI Vision integration
- Team organizations / roles
- Scheduled screenshots (cron)
- Scrolling video capture (WebM/MP4/GIF of page scroll)
- BYOB storage (S3/Wasabi/GCS)
- GPU rendering

## Pricing and plan facts

Never type a Microlink number. Import it:

| Fact | Source |
| --- | --- |
| Pro plans, monthly price, requests per month | `src/helpers/pro-plans.js` (`PLANS`, `DEFAULT_PLAN`) |
| Price per 1,000 requests | `pricePerThousand` in `src/helpers/pro-plans.js` |
| The Microlink pricing card (name, price, base facts) | `MICROLINK_PLAN`, `microlinkPlan`, `microlinkFacts` in `components/patterns/ProductStory/price-comparison.js` |
| Free plan quota and concurrency | `src/helpers/free-tier.js` (`FREE_PLAN_REQUESTS_PER_DAY`, `FREE_PLAN_CONCURRENT_REQUESTS`) |
| Edge nodes | `CDN_EDGES` in `src/helpers/cdn-edges.js` |

Every comparison page uses `DEFAULT_PLAN` (46,000 requests per month) as the Microlink side. Pick the competitor plan closest to it in volume or intent. If no competitor plan is a fair match, say so in the caption or ask before forcing one.

Wording that stays identical on every page:

- "No rate limit on paid plans"
- Free plan: "<FREE_PLAN_REQUESTS_PER_DAY> requests/day, renews daily, no credit card"
- A built-in rotating proxy, on by default
- 99.9% SLA, open-source core (MIT: Metascraper, MQL, Browserless)

Never claim volume discounts (only 10% off annual billing) and never publish an enterprise price.
