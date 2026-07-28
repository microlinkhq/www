// Features mirror the use-case data shape, but describe API capabilities —
// proxy, caching, headers, data extraction — rather than customer outcomes.
// There is no quote / author / role here on purpose.

// pink / secondary / pinky / pinkest — reserved for `src/pages/features/*.js`.
export const ACCENT = {
  text: 'secondary',
  bgSoft: 'pinky',
  bgEdge: 'pinkest',
  highlight: 'pink5'
}

export const FEATURES = [
  {
    slug: 'antibot',
    name: 'Antibot Detection',
    footerLabel: 'Antibot detection',
    tag: 'PRO',
    category: 'Anti-bot & unblocking',
    param: 'x-fetch-mode',
    icon: 'radar',
    iconBg: 'pink7',
    borderColor: 'pink2',
    oneLiner:
      'Detect and identify 30+ anti-bot providers before you get blocked. Then we resolve it.',
    teachLine: 'Use when you need to know who blocked you before you retry.',
    snippet: "detected: true, provider: 'cloudflare'"
  },
  {
    slug: 'automation',
    name: 'Browser Automation',
    footerLabel: 'Browser automation',
    tag: null,
    category: 'Page control',
    param: 'prerender',
    icon: 'mouse',
    iconBg: 'green7',
    borderColor: 'green2',
    oneLiner:
      'Click, scroll, wait, type, set device and more. Shape the page before you capture it.',
    teachLine:
      'Use when the page must be in a specific UI state before capture.',
    snippet: "click: '.tab-annual', waitForSelector: '.price'"
  },
  {
    slug: 'function',
    name: 'Browser Functions',
    footerLabel: 'Browser functions',
    tag: null,
    category: 'Code execution',
    param: 'function',
    icon: 'js',
    iconBg: 'yellow5',
    borderColor: 'yellow2',
    oneLiner:
      'Run JavaScript with Puppeteer and npm packages. No infrastructure, no servers.',
    teachLine:
      'Use when products and declarative options cannot express the flow.',
    snippet: "function: '({ page }) => page.title()'"
  },
  {
    slug: 'ttl',
    name: 'Configurable Caching',
    footerLabel: 'Configurable TTL',
    tag: 'PRO',
    category: 'Performance & caching',
    param: 'ttl',
    icon: 'clock',
    iconBg: 'violet9',
    borderColor: 'violet3',
    oneLiner:
      'Cache responses for 1 minute to 31 days. Cache hits are free and ultra fast.',
    teachLine:
      'Use when the same URL is requested repeatedly and freshness can wait.',
    snippet: "ttl: '1d', staleTtl: '12h'"
  },
  {
    slug: 'headers',
    name: 'Custom HTTP Headers',
    footerLabel: 'Custom headers',
    tag: 'PRO',
    category: 'Authentication & access',
    param: 'headers',
    icon: 'list',
    iconBg: 'orange7',
    borderColor: 'orange2',
    oneLiner:
      'Forward cookies, tokens and any header to the target page. Keep secrets out of the URL.',
    teachLine:
      'Use when the target requires locale, cookies, or bearer tokens.',
    snippet: "headers: { 'x-api-header-cookie': 'session=…' }"
  },
  {
    slug: 'proxy',
    name: 'Proxy Resolution',
    footerLabel: 'Proxy resolution',
    tag: 'PRO',
    category: 'Anti-bot & unblocking',
    param: 'proxy',
    icon: 'shield',
    iconBg: 'cyan7',
    borderColor: 'cyan2',
    oneLiner:
      'Automatically bypass Cloudflare, DataDome, Akamai and more. We handle the hard part.',
    teachLine:
      'Use when a direct request is blocked and you need residential routing.',
    snippet: 'x-fetch-mode: fetch-proxy'
  },
  {
    slug: 'security',
    name: 'Request Security',
    footerLabel: 'Security',
    tag: null,
    category: 'Trust & isolation',
    param: 'url',
    icon: 'lock',
    iconBg: 'blue9',
    borderColor: 'blue3',
    oneLiner:
      'Each request runs in its own isolated browser. SSRF protected by default.',
    teachLine:
      'Always on — understand the isolation and SSRF guarantees you get.',
    snippet: "url: 'http://169.254.169.254' → EFORBIDDENURL"
  },
  {
    slug: 'scraping',
    name: 'Web Scraping',
    footerLabel: 'Web scraping',
    tag: null,
    category: 'Scraping',
    param: 'data',
    icon: 'globe',
    iconBg: 'violet7',
    borderColor: 'violet2',
    oneLiner:
      'Extract structured JSON from any webpage using CSS selectors. URL → JSON in one request.',
    teachLine:
      'Declare the fields you need — Microlink fetches, renders, and returns typed data.',
    snippet: "data: { headline: { selector: '.titleline > a', attr: 'text' } }"
  }
]

export const FEATURE_TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'parameters', label: 'Parameters' },
  { id: 'examples', label: 'Examples' },
  { id: 'related', label: 'Related features' },
  { id: 'faq', label: 'FAQ' }
]

const FEATURES_BY_SLUG = new Map(
  FEATURES.map(feature => [feature.slug, feature])
)

export const getFeature = slug => FEATURES_BY_SLUG.get(slug)
