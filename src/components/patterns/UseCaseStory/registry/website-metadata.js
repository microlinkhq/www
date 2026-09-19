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
      'Prices, ratings, headings or any selector, typed and returned next to the normalized fields.',
    keywords: [
      'extract custom fields metadata api',
      'scrape price with open graph',
      'css selector metadata api'
    ],
    related: [
      'website-metadata/missing-or-wrong-metadata',
      'website-metadata/only-the-fields-you-need',
      'website-to-markdown/with-metadata'
    ]
  },
  {
    slug: 'website-metadata/missing-or-wrong-metadata',
    vertical,
    category,
    name: 'Fix missing or wrong og:image',
    cta: 'Fix a broken og:image',
    blurb:
      'Override any normalized field with a rule and chain fallbacks so previews never render empty.',
    keywords: [
      'og:image missing fallback',
      'override title metadata api',
      'fix link preview image'
    ],
    related: [
      'website-metadata/custom-fields',
      'website-metadata/javascript-rendered-pages',
      'website-screenshot/open-graph-images'
    ]
  },
  {
    slug: 'website-metadata/javascript-rendered-pages',
    vertical,
    category,
    name: 'Metadata from single-page apps',
    cta: 'Read metadata from single-page apps',
    blurb:
      'Render client-side apps in a real browser, wait for the tags, then read the normalized metadata.',
    keywords: [
      'metadata from react app',
      'spa open graph tags api',
      'prerender metadata'
    ],
    related: [
      'website-metadata/missing-or-wrong-metadata',
      'website-metadata/only-the-fields-you-need',
      'website-to-markdown/javascript-rendered-pages'
    ]
  },
  {
    slug: 'website-metadata/blocked-sites',
    vertical,
    category,
    name: 'Link previews for bot-protected sites',
    cta: 'Preview bot-protected sites',
    blurb:
      'One option routes the metadata request through the built-in proxy when a site blocks automated access.',
    keywords: [
      'link preview blocked by cloudflare',
      'metadata api proxy',
      'unfurl protected links'
    ],
    related: [
      'website-metadata/high-volume-link-previews',
      'website-metadata/localized-metadata',
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
      'The dominant palette and accessible text and background pairs from a site’s logo and preview image.',
    keywords: [
      'extract brand colors from website',
      'dominant color og image api',
      'color palette from logo'
    ],
    related: [
      'website-metadata/custom-fields',
      'website-metadata/only-the-fields-you-need',
      'website-metadata/missing-or-wrong-metadata'
    ]
  },
  {
    slug: 'website-metadata/high-volume-link-previews',
    vertical,
    category,
    name: 'Link previews at scale',
    cta: 'Scale your link previews',
    blurb:
      'Unfurl links at any volume: no throttling, a cache that serves the repeats and background refresh.',
    keywords: [
      'link preview api scale',
      'unfurl links caching',
      'metadata api rate limits'
    ],
    related: [
      'website-metadata/only-the-fields-you-need',
      'website-metadata/blocked-sites',
      'website-screenshot/traffic-spikes'
    ]
  },
  {
    slug: 'website-metadata/only-the-fields-you-need',
    vertical,
    category,
    name: 'Only the fields you need',
    cta: 'Request only the fields you need',
    blurb:
      'Include or exclude normalized fields per request and trim the response for faster, lighter calls.',
    keywords: [
      'metadata api select fields',
      'fast metadata extraction',
      'lightweight link preview api'
    ],
    related: [
      'website-metadata/high-volume-link-previews',
      'website-metadata/custom-fields',
      'website-metadata/brand-colors'
    ]
  },
  {
    slug: 'website-metadata/localized-metadata',
    vertical,
    category,
    name: 'Region-specific metadata',
    cta: 'Get region-specific metadata',
    blurb:
      'Titles, descriptions and prices as a visitor from a given country and language sees them.',
    keywords: [
      'localized metadata api',
      'price by country api',
      'metadata from another country'
    ],
    related: [
      'website-metadata/blocked-sites',
      'website-metadata/custom-fields',
      'website-screenshot/proxy-geolocation'
    ]
  }
]
