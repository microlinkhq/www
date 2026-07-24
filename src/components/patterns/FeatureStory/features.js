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
    slug: 'scraping',
    name: 'Web Scraping',
    footerLabel: 'Web scraping',
    tag: null,
    category: 'Scraping',
    param: 'data',
    params: ['data'],
    paramDisplay: 'data',
    icon: 'globe',
    iconColor: 'violet7',
    iconBg: 'violet7',
    oneLiner:
      'Extract structured JSON from any webpage using CSS selectors. URL → JSON in one request.',
    snippet: "data: { headline: { selector: '.titleline > a', attr: 'text' } }"
  },
  {
    slug: 'function',
    name: 'Browser Functions',
    footerLabel: 'Browser functions',
    tag: null,
    category: 'Code execution',
    param: 'function',
    params: ['function'],
    paramDisplay: 'function',
    icon: 'js',
    iconColor: 'yellow7',
    iconBg: 'yellow5',
    oneLiner:
      'Run JavaScript with Puppeteer and npm packages. No infrastructure, no servers.',
    snippet: "function: '({ page }) => page.title()'"
  },
  {
    slug: 'automation',
    name: 'Browser Automation',
    footerLabel: 'Browser automation',
    tag: null,
    category: 'Page control',
    param: 'prerender',
    params: ['prerender'],
    paramDisplay: 'prerender',
    icon: 'mouse',
    iconColor: 'green7',
    iconBg: 'green7',
    oneLiner:
      'Click, scroll, wait, type, set device and more. Shape the page before you capture it.',
    snippet: "click: '.tab-annual', waitForSelector: '.price'"
  },
  {
    slug: 'proxy',
    name: 'Proxy Resolution',
    footerLabel: 'Proxy resolution',
    tag: 'PRO',
    category: 'Anti-bot & unblocking',
    param: 'proxy',
    params: ['proxy'],
    paramDisplay: 'proxy',
    icon: 'shield',
    iconColor: 'blue7',
    iconBg: 'blue7',
    oneLiner:
      'Automatically bypass Cloudflare, DataDome, Akamai and more. We handle the hard part.',
    snippet: 'x-fetch-mode: fetch-proxy'
  },
  {
    slug: 'antibot',
    name: 'Antibot Detection',
    footerLabel: 'Antibot detection',
    tag: 'PRO',
    category: 'Anti-bot & unblocking',
    param: 'x-fetch-mode',
    params: ['x-fetch-mode'],
    paramDisplay: 'x-fetch-mode',
    icon: 'radar',
    iconColor: 'red7',
    iconBg: 'red7',
    oneLiner:
      'Detect and identify 30+ anti-bot providers before you get blocked. Then we resolve it.',
    snippet: "detected: true, provider: 'cloudflare'"
  },
  {
    slug: 'ttl',
    name: 'Configurable Caching',
    footerLabel: 'Configurable TTL',
    tag: 'PRO',
    category: 'Performance & caching',
    param: 'ttl',
    params: ['ttl', 'staleTtl'],
    paramDisplay: 'ttl / staleTtl',
    icon: 'clock',
    iconColor: 'violet8',
    iconBg: 'violet8',
    oneLiner:
      'Cache responses for 1 minute to 31 days. Cache hits are free and ultra fast.',
    snippet: "ttl: '1d', staleTtl: '12h'"
  },
  {
    slug: 'headers',
    name: 'Custom HTTP Headers',
    footerLabel: 'Custom headers',
    tag: 'PRO',
    category: 'Authentication & access',
    param: 'headers',
    params: ['headers', 'x-api-header-*'],
    paramDisplay: 'headers / x-api-header-*',
    icon: 'list',
    iconColor: 'orange7',
    iconBg: 'orange7',
    oneLiner:
      'Forward cookies, tokens and any header to the target page. Keep secrets out of the URL.',
    snippet: "headers: { 'x-api-header-cookie': 'session=…' }"
  },
  {
    slug: 'security',
    name: 'Request Security',
    footerLabel: 'Security',
    tag: null,
    category: 'Trust & isolation',
    param: 'url',
    params: ['url'],
    paramDisplay: 'url',
    icon: 'lock',
    iconColor: 'blue8',
    iconBg: 'blue8',
    oneLiner:
      'Each request runs in its own isolated browser. SSRF protected by default.',
    snippet: "url: 'http://169.254.169.254' → EFORBIDDENURL"
  }
]

export const FEATURE_TOC = [
  { id: 'overview', label: 'Overview' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'quick-start', label: 'Quick start' },
  { id: 'parameters', label: 'Parameters' },
  { id: 'examples', label: 'Examples' },
  { id: 'use-cases', label: 'Use cases' },
  { id: 'related', label: 'Related features' },
  { id: 'faq', label: 'FAQ' }
]

export const getFeature = slug => FEATURES.find(f => f.slug === slug)

export const getRelatedFeatures = slug =>
  FEATURES.filter(f => f.slug !== slug).slice(0, 5)
