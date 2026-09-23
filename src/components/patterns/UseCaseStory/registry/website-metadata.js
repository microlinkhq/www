const vertical = 'website-metadata'
const category = 'Metadata API'

export const WEBSITE_METADATA = [
  {
    slug: 'website-metadata/custom-fields',
    vertical,
    category,
    name: 'Custom fields alongside metadata',
    cta: 'Extract custom fields',
    blurb:
      'Get prices, ratings, headings or any CSS selector, typed and returned next to the normalized metadata.',
    keywords: [
      'extract custom fields metadata api',
      'scrape price with open graph',
      'css selector metadata api',
      'product metadata extraction'
    ],
    related: [
      'website-metadata/missing-or-wrong-metadata',
      'website-metadata/only-the-fields-you-need',
      'website-metadata/javascript-rendered-pages',
      'website-metadata/brand-colors',
      'website-to-markdown/with-metadata',
      'website-to-markdown/llm-context'
    ]
  },
  {
    slug: 'website-metadata/missing-or-wrong-metadata',
    vertical,
    category,
    name: 'Fix missing or wrong og:image',
    cta: 'Fix a broken og:image',
    blurb:
      'Override any normalized field with a rule and chain fallbacks so link previews never render empty.',
    keywords: [
      'og:image missing fallback',
      'override title metadata api',
      'fix link preview image',
      'og image not showing'
    ],
    related: [
      'website-metadata/custom-fields',
      'website-metadata/javascript-rendered-pages',
      'website-metadata/only-the-fields-you-need',
      'website-metadata/blocked-sites',
      'website-screenshot/open-graph-images',
      'website-to-markdown/with-metadata'
    ]
  },
  {
    slug: 'website-metadata/javascript-rendered-pages',
    vertical,
    category,
    name: 'Metadata from single-page apps',
    cta: 'Read metadata from single-page apps',
    blurb:
      'Render React, Vue or Angular apps in a headless browser, wait for the tags, then read the normalized metadata.',
    keywords: [
      'extract metadata from single-page apps',
      'metadata from react app',
      'spa open graph tags api',
      'prerender metadata'
    ],
    related: [
      'website-metadata/missing-or-wrong-metadata',
      'website-metadata/only-the-fields-you-need',
      'website-metadata/custom-fields',
      'website-to-markdown/javascript-rendered-pages',
      'website-screenshot/dynamic-content',
      'website-to-pdf/dynamic-content'
    ]
  },
  {
    slug: 'website-metadata/blocked-sites',
    vertical,
    category,
    name: 'Link previews for bot-protected sites',
    cta: 'Preview bot-protected sites',
    blurb:
      'Unfurl links to sites behind Cloudflare or DataDome: on a Pro key the built-in proxy resolves automatically.',
    keywords: [
      'link preview blocked by cloudflare',
      'metadata api proxy',
      'unfurl protected links',
      'link preview just a moment'
    ],
    related: [
      'website-metadata/high-volume-link-previews',
      'website-metadata/localized-metadata',
      'website-metadata/missing-or-wrong-metadata',
      'website-metadata/javascript-rendered-pages',
      'website-screenshot/built-in-proxy',
      'website-to-markdown/blocked-sites'
    ]
  },
  {
    slug: 'website-metadata/brand-colors',
    vertical,
    category,
    name: 'Brand colors from images',
    cta: 'Extract brand colors',
    blurb:
      'Get the dominant palette and an accessible text and background pair from a site’s logo and preview image.',
    keywords: [
      'extract brand colors from website',
      'dominant color og image api',
      'color palette from logo',
      'website color palette api'
    ],
    related: [
      'website-metadata/custom-fields',
      'website-metadata/only-the-fields-you-need',
      'website-metadata/missing-or-wrong-metadata',
      'website-metadata/high-volume-link-previews',
      'website-screenshot/open-graph-images',
      'website-screenshot/browser-frame'
    ]
  },
  {
    slug: 'website-metadata/high-volume-link-previews',
    vertical,
    category,
    name: 'Link previews at scale',
    cta: 'Scale your link previews',
    blurb:
      'Unfurl links at any volume: no throttling, background refresh and cache hits that never count against your quota.',
    keywords: [
      'link preview api scale',
      'unfurl links caching',
      'metadata api rate limits',
      'link unfurling service'
    ],
    related: [
      'website-metadata/only-the-fields-you-need',
      'website-metadata/blocked-sites',
      'website-metadata/missing-or-wrong-metadata',
      'website-screenshot/traffic-spikes',
      'website-to-markdown/bulk-conversion',
      'website-to-pdf/batch-generation'
    ]
  },
  {
    slug: 'website-metadata/only-the-fields-you-need',
    vertical,
    category,
    name: 'Only the fields you need',
    cta: 'Request only the fields you need',
    blurb:
      'Include or exclude normalized fields per request and trim the JSON for faster, lighter metadata calls.',
    keywords: [
      'metadata api select fields',
      'fast metadata extraction',
      'lightweight link preview api',
      'skip og image detection'
    ],
    related: [
      'website-metadata/high-volume-link-previews',
      'website-metadata/custom-fields',
      'website-metadata/brand-colors',
      'website-metadata/javascript-rendered-pages',
      'website-screenshot/faster-smaller-screenshots',
      'website-to-markdown/clean-content'
    ]
  },
  {
    slug: 'website-metadata/localized-metadata',
    vertical,
    category,
    name: 'Region-specific metadata',
    cta: 'Get region-specific metadata',
    blurb:
      'Fetch titles, descriptions and prices as a visitor from a given country and language sees them.',
    keywords: [
      'localized metadata api',
      'price by country api',
      'metadata from another country',
      'geo-targeted link preview'
    ],
    related: [
      'website-metadata/blocked-sites',
      'website-metadata/custom-fields',
      'website-screenshot/proxy-geolocation'
    ]
  }
]
