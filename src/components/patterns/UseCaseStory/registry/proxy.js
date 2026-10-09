const vertical = 'proxy'
const category = 'Proxy'

export const PROXY = [
  {
    slug: 'proxy/scrape-cloudflare-protected-sites',
    vertical,
    category,
    name: 'Scrape Cloudflare-protected websites',
    cta: 'Scrape Cloudflare-protected sites',
    blurb:
      'Get the real page instead of “Just a moment”: on Pro plans, blocked requests escalate through proxy tiers up to residential IPs.',
    keywords: [
      'scrape cloudflare protected website',
      'cloudflare scraping api',
      'cloudflare just a moment scraper'
    ],
    related: [
      'proxy/fix-403-and-429-errors',
      'proxy/detect-antibot-protection',
      'proxy/rotating-proxy-alternative',
      'website-screenshot/built-in-proxy',
      'website-to-markdown/blocked-sites',
      'website-metadata/blocked-sites'
    ]
  },
  {
    slug: 'proxy/fix-403-and-429-errors',
    vertical,
    category,
    name: 'Fix 403 and 429 scraping errors',
    cta: 'Fix 403 and 429 errors',
    blurb:
      'Tell an antibot 403, a throttling 429 and your own quota apart, then route, cache or wait accordingly.',
    keywords: [
      'scraping 403 forbidden',
      '429 too many requests scraping',
      'scraper blocked'
    ],
    related: [
      'proxy/scrape-cloudflare-protected-sites',
      'proxy/detect-antibot-protection',
      'proxy/rotating-proxy-alternative',
      'website-metadata/blocked-sites',
      'website-to-markdown/blocked-sites',
      'website-to-pdf/blocked-sites'
    ]
  },
  {
    slug: 'proxy/bring-your-own-proxy',
    vertical,
    category,
    name: 'Bring your own proxy',
    cta: 'Route through your own proxy',
    blurb:
      'Pass your authenticated proxy URL per request and every redirect, asset and fetch of the page goes through it.',
    keywords: [
      'headless browser with custom proxy',
      'puppeteer proxy authentication',
      'byo proxy scraping'
    ],
    related: [
      'proxy/rotating-proxy-alternative',
      'proxy/geo-blocked-websites',
      'website-screenshot/built-in-proxy'
    ]
  },
  {
    slug: 'proxy/rotating-proxy-alternative',
    vertical,
    category,
    name: 'Rotating proxy alternative',
    cta: 'Replace your rotating proxy',
    blurb:
      'Skip the proxy pool: the API escalates to residential IPs only when a site blocks you and remembers what works per domain.',
    keywords: [
      'rotating proxy api',
      'scraping api with built-in proxies',
      'proxy rotation for scraping'
    ],
    related: [
      'proxy/scrape-cloudflare-protected-sites',
      'proxy/bring-your-own-proxy',
      'proxy/fix-403-and-429-errors',
      'proxy/geo-blocked-websites',
      'website-screenshot/built-in-proxy',
      'website-to-markdown/blocked-sites'
    ]
  },
  {
    slug: 'proxy/geo-blocked-websites',
    vertical,
    category,
    name: 'Fetch geo-blocked websites',
    cta: 'Reach geo-blocked pages',
    blurb:
      'Route any request through one of 181 countries with a two-letter code, and verify the exit before you trust the page.',
    keywords: [
      'fetch website from another country',
      'geo-restricted content api',
      'country proxy api'
    ],
    related: [
      'proxy/geo-targeted-prices',
      'proxy/bring-your-own-proxy',
      'proxy/rotating-proxy-alternative',
      'website-screenshot/proxy-geolocation',
      'website-metadata/localized-metadata',
      'website-to-pdf/blocked-sites'
    ]
  },
  {
    slug: 'proxy/geo-targeted-prices',
    vertical,
    category,
    name: 'Scrape prices by country',
    cta: 'Compare prices by country',
    blurb:
      'One extraction request per market, pinned to its country, merged into a table of comparable prices and currencies.',
    keywords: [
      'scrape prices by country',
      'localized price monitoring',
      'geo-targeted scraping api'
    ],
    related: [
      'proxy/geo-blocked-websites',
      'proxy/scrape-cloudflare-protected-sites',
      'website-metadata/localized-metadata'
    ]
  },
  {
    slug: 'proxy/detect-antibot-protection',
    vertical,
    category,
    name: 'Detect antibot protection',
    cta: 'Detect antibot protection',
    blurb:
      'Name the provider behind a block, from Cloudflare to DataDome to reCAPTCHA, with the open-source is-antibot library.',
    keywords: [
      'detect cloudflare challenge',
      'which bot protection does a site use',
      'antibot detection'
    ],
    related: [
      'proxy/scrape-cloudflare-protected-sites',
      'proxy/fix-403-and-429-errors',
      'website-metadata/blocked-sites'
    ]
  }
]
