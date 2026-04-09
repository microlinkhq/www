# Microlink Features & Pricing

Source of truth for the `microlink` column in `COMPARISON_DATA` and for pricing claims. Only use features and facts listed here. Do not invent capabilities.

## Features (microlink: true)

These are the confirmed Microlink capabilities. Use the exact feature name strings from this list when building `COMPARISON_DATA`. The feature name may be phrased slightly differently per page for variety, but the capability must match.

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
- Built-in proxy (auto-rotating residential)
- Antibot detection (30+ providers: Cloudflare, DataDome, Akamai, etc.)

### Data extraction & enrichment

- Metadata extraction (Open Graph, Twitter Cards, JSON-LD, etc.)
- MQL (structured data extraction / Microlink Query Language)
- Lighthouse audits
- Technology detection
- Color palette extraction
- Markdown rendering / Markdown conversion

### Developer experience

- Link previews SDK (React, Vue, vanilla JS)
- Typed SDKs (React/Vue/JS)
- Browser chrome overlay (screenshot.overlay)
- Direct embed (no backend needed)
- MCP server
- Open-source core (MIT: Metascraper, MQL, Browserless)
- 240+ CDN edge nodes

### Partial / conditional

These should use `microlink: 'partial'` or `microlink: 'on demand'`:

- GPU rendering → `'on demand'`
- No-code integrations (Zapier, Make, n8n) → `'partial'`

### Not supported (microlink: false)

These are capabilities Microlink does NOT have. Use `microlink: false`:

- Async + webhooks
- S3 / cloud storage direct upload
- Bulk screenshots (batch processing)
- Geolocation targeting
- OpenAI Vision integration
- Team organizations / roles
- Scheduled screenshots (cron)
- Scrolling video capture (WebM/MP4/GIF of page scroll)
- BYOB storage (S3/Wasabi/GCS)
- Text/HTML extraction (as a standalone feature; Microlink extracts metadata but not raw page text)

## Pricing

Microlink pricing varies by which competitor is being compared. Use the tier that creates the most meaningful apples-to-apples comparison.

### Tier used in screenshotone comparison

- **Price**: $45/mo
- **Requests**: 46,000/month
- **Per-request cost**: ~$0.00098
- **Key points**:
  - Screenshots + PDF + metadata + previews + remote JS (all included)
  - Free tier: 50 requests/day, no credit card
  - No requests-per-minute cap
  - 240+ edge nodes, 99.9% SLA
  - Open-source core (MIT)

### Tier used in screenshotapi comparison

- **Price**: $39/mo
- **Requests**: 46,000/month
- **Per-request cost**: ~$0.00085
- **Key points**:
  - Screenshots, PDF, metadata, link previews, remote JS
  - Free: 50 requests/day, no credit card, no expiry
  - No rate limit on any paid plan
  - 240+ edge nodes, 99.9% SLA
  - Open-source core (MIT licensed)

### Free tier (always the same)

- 50 requests/day
- No credit card required
- No expiry / no time limit
- Same API, same quality, same edge network as paid plans

### Infrastructure facts

- 240+ Cloudflare edge nodes worldwide
- 99.9% uptime SLA (formal)
- No per-minute rate limit on paid plans
- Open-source core: Metascraper (metadata), MQL (query language), Browserless (headless browser) — all MIT licensed

## Choosing the comparison price

When creating a new landing page, pick the Microlink tier that makes the most direct comparison to the competitor's most popular or recommended plan. The goal is an honest apples-to-apples comparison. Document the competitor pricing source URL in a code comment.

If neither $39 nor $45 creates a clean comparison, ask the user which Microlink tier to use. The available tiers can be found at `https://microlink.io/#pricing`.
