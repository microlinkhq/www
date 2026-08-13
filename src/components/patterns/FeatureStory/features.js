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
    icon: 'radar',
    iconBg: 'pink7',
    borderColor: 'pink2',
    oneLiner:
      'Know exactly who blocked your request and why — 30+ antibot and CAPTCHA providers.',
    teachLine:
      'Use when you need to know who blocked you before you retry or escalate.'
  },
  {
    slug: 'automation',
    name: 'Browser Automation',
    footerLabel: 'Browser automation',
    tag: null,
    icon: 'mouse',
    iconBg: 'green7',
    borderColor: 'green2',
    oneLiner:
      'Click, scroll, wait, type, set device and more. Shape the page before you capture it.',
    teachLine:
      'Use when the page must be in a specific UI state before capture.'
  },
  {
    slug: 'adblock',
    name: 'Adblock & Cookie Banners',
    footerLabel: 'Adblock',
    tag: null,
    icon: 'slash',
    iconBg: 'red7',
    borderColor: 'red2',
    oneLiner:
      'Ads and trackers blocked, cookie banners dismissed automatically — on by default, on every plan.',
    teachLine:
      'Use when captures must be clean and repeatable instead of full of third-party noise.'
  },
  {
    slug: 'function',
    name: 'Browser Functions',
    footerLabel: 'Browser functions',
    tag: null,
    icon: 'js',
    iconBg: 'yellow5',
    borderColor: 'yellow2',
    oneLiner:
      'Run JavaScript with Puppeteer and npm packages. No infrastructure, no servers.',
    teachLine:
      'Use when products and declarative options cannot express the flow.'
  },
  {
    slug: 'ttl',
    name: 'Configurable Caching',
    footerLabel: 'Configurable TTL',
    tag: 'PRO',
    icon: 'clock',
    iconBg: 'violet9',
    borderColor: 'violet3',
    oneLiner:
      'Cache responses for 1 minute to 31 days. Cache hits are free and ultra fast.',
    teachLine:
      'Use when the same URL is requested repeatedly and freshness can wait.'
  },
  {
    slug: 'headers',
    name: 'Custom HTTP Headers',
    footerLabel: 'Custom headers',
    tag: 'PRO',
    icon: 'list',
    iconBg: 'orange7',
    borderColor: 'orange2',
    oneLiner:
      'Forward cookies, tokens and any header to the target page. Keep secrets out of the URL.',
    teachLine: 'Use when the target requires locale, cookies, or bearer tokens.'
  },
  {
    slug: 'proxy',
    name: 'Proxy Resolution',
    footerLabel: 'Proxy resolution',
    tag: 'PRO',
    icon: 'shield',
    iconBg: 'cyan7',
    borderColor: 'cyan2',
    oneLiner:
      'Automatically bypass Cloudflare, DataDome, Akamai and more. We handle the hard part.',
    teachLine:
      'Use when a direct request is blocked and you need residential routing.'
  },
  {
    slug: 'isolation',
    name: 'Request Isolation',
    footerLabel: 'Isolation',
    tag: null,
    icon: 'lock',
    iconBg: 'blue9',
    borderColor: 'blue3',
    oneLiner: 'One ephemeral browser per call. SSRF blocked before navigation.',
    teachLine: 'Always on — isolation and the SSRF gate apply to every request.'
  },
  {
    slug: 'scraping',
    name: 'Web Scraping',
    footerLabel: 'Web scraping',
    tag: null,
    icon: 'globe',
    iconBg: 'violet7',
    borderColor: 'violet2',
    oneLiner:
      'Extract structured JSON from any webpage using CSS selectors. URL → JSON in one request.',
    teachLine:
      'Declare the fields you need — Microlink fetches, renders, and returns typed data.'
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
