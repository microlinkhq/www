const vertical = 'website-screenshot'
const category = 'Screenshot API'

export const WEBSITE_SCREENSHOT = [
  {
    slug: 'website-screenshot/mobile',
    vertical,
    category,
    name: 'Mobile screenshots at any viewport',
    cta: 'Capture mobile screenshots',
    blurb:
      'Emulate an iPhone, a Pixel, an iPad or any custom viewport and capture the page exactly as those visitors see it.',
    keywords: [
      'mobile website screenshot api',
      'screenshot viewport',
      'device emulation screenshot',
      'responsive website screenshot'
    ],
    related: [
      'website-screenshot/capture-element',
      'website-screenshot/dark-mode',
      'website-screenshot/faster-smaller-screenshots',
      'website-screenshot/browser-frame',
      'website-screenshot/dynamic-content',
      'website-to-pdf/paper-size-and-margins'
    ]
  },
  {
    slug: 'website-screenshot/block-cookie-banners-and-ads',
    vertical,
    category,
    name: 'Screenshots without cookie banners or ads',
    cta: 'Block cookie banners and ads',
    blurb:
      'Ads, trackers and consent popups are blocked before the page renders, and one option dismisses first-party banners.',
    keywords: [
      'screenshot without cookie banner',
      'remove cookie consent popup screenshot',
      'ad free screenshot api',
      'clean website screenshot'
    ],
    related: [
      'website-screenshot/capture-element',
      'website-screenshot/dynamic-content',
      'website-screenshot/behind-login',
      'website-screenshot/faster-smaller-screenshots',
      'website-to-pdf/clean-layout',
      'website-to-markdown/clean-content'
    ]
  },
  {
    slug: 'website-screenshot/capture-element',
    vertical,
    category,
    name: 'Screenshot a single element',
    cta: 'Capture a single element',
    blurb:
      'Crop the capture to one CSS selector, such as a chart or a pricing table, with a transparent background if you need it.',
    keywords: [
      'screenshot element css selector',
      'screenshot specific element api',
      'transparent screenshot',
      'capture dom element as image'
    ],
    related: [
      'website-screenshot/block-cookie-banners-and-ads',
      'website-screenshot/dynamic-content',
      'website-screenshot/mobile',
      'website-screenshot/faster-smaller-screenshots',
      'website-screenshot/browser-frame',
      'website-to-markdown/clean-content'
    ]
  },
  {
    slug: 'website-screenshot/traffic-spikes',
    vertical,
    category,
    name: 'Screenshots under traffic spikes',
    cta: 'Handle traffic spikes',
    blurb:
      'Absorb bursts of screenshot traffic without a browser pool: no throttling, parallel requests and a cache whose hits are free.',
    keywords: [
      'high volume screenshots',
      'screenshot api rate limits',
      'screenshot api scale',
      'screenshot traffic spikes'
    ],
    related: [
      'website-screenshot/faster-smaller-screenshots',
      'website-screenshot/open-graph-images',
      'website-screenshot/built-in-proxy',
      'website-to-pdf/batch-generation',
      'website-to-markdown/bulk-conversion',
      'website-metadata/high-volume-link-previews'
    ]
  },
  {
    slug: 'website-screenshot/built-in-proxy',
    vertical,
    category,
    name: 'Screenshot blocked websites',
    cta: 'Screenshot blocked websites',
    blurb:
      'When a site blocks headless browsers, one option routes the capture through a managed, rotating proxy pool.',
    keywords: [
      'screenshot blocked website',
      'screenshot cloudflare protected site',
      'screenshot api proxy',
      'bypass bot protection screenshot'
    ],
    related: [
      'website-screenshot/proxy-geolocation',
      'website-screenshot/behind-login',
      'website-screenshot/dynamic-content',
      'website-screenshot/traffic-spikes',
      'website-to-markdown/blocked-sites',
      'website-metadata/blocked-sites'
    ]
  },
  {
    slug: 'website-screenshot/proxy-geolocation',
    vertical,
    category,
    name: 'Screenshot a site from another country',
    cta: 'Capture from another country',
    blurb:
      'Pin the request to a country with a two-letter code and capture the prices and copy a local visitor sees.',
    keywords: [
      'screenshot website from another country',
      'geolocated screenshot api',
      'proxy location screenshot',
      'screenshot geo-targeted page'
    ],
    related: [
      'website-screenshot/built-in-proxy',
      'website-screenshot/block-cookie-banners-and-ads',
      'website-screenshot/mobile',
      'website-screenshot/behind-login',
      'website-metadata/localized-metadata',
      'website-to-markdown/blocked-sites'
    ]
  },
  {
    slug: 'website-screenshot/dark-mode',
    vertical,
    category,
    name: 'Screenshots in dark mode',
    cta: 'Capture dark mode',
    blurb:
      'Set prefers-color-scheme before the capture and get the dark or light theme of any page that supports it.',
    keywords: [
      'screenshot dark mode',
      'prefers-color-scheme screenshot api',
      'dark mode website screenshot',
      'light and dark theme screenshots'
    ],
    related: [
      'website-screenshot/mobile',
      'website-screenshot/browser-frame',
      'website-screenshot/capture-element'
    ]
  },
  {
    slug: 'website-screenshot/open-graph-images',
    vertical,
    category,
    name: 'Dynamic Open Graph images',
    cta: 'Generate Open Graph images',
    blurb:
      'Point og:image at an API URL and every share shows a current, cached screenshot of the page.',
    keywords: [
      'dynamic open graph image',
      'og image from screenshot',
      'social preview image api',
      'og:image screenshot url'
    ],
    related: [
      'website-screenshot/browser-frame',
      'website-screenshot/traffic-spikes',
      'website-screenshot/dark-mode',
      'website-to-pdf/download-links-and-previews',
      'website-metadata/missing-or-wrong-metadata',
      'website-metadata/high-volume-link-previews'
    ]
  },
  {
    slug: 'website-screenshot/behind-login',
    vertical,
    category,
    name: 'Screenshots behind a login',
    cta: 'Capture pages behind a login',
    blurb:
      'Forward a session cookie or a bearer token as a request header and capture pages only your users can see.',
    keywords: [
      'screenshot page behind login',
      'screenshot authenticated page',
      'screenshot with cookies api',
      'screenshot logged in page api'
    ],
    related: [
      'website-screenshot/capture-element',
      'website-screenshot/dynamic-content',
      'website-screenshot/built-in-proxy',
      'website-screenshot/block-cookie-banners-and-ads',
      'website-screenshot/traffic-spikes',
      'website-to-pdf/invoices-and-receipts'
    ]
  },
  {
    slug: 'website-screenshot/dynamic-content',
    vertical,
    category,
    name: 'Screenshots of JavaScript-rendered pages',
    cta: 'Capture JavaScript-rendered pages',
    blurb:
      'Wait for a selector, a lifecycle event or a delay so single-page apps and lazy sections finish rendering before capture.',
    keywords: [
      'screenshot javascript rendered page',
      'screenshot after javascript loads',
      'wait for selector screenshot',
      'screenshot single page app'
    ],
    related: [
      'website-screenshot/capture-element',
      'website-screenshot/block-cookie-banners-and-ads',
      'website-screenshot/faster-smaller-screenshots',
      'website-to-pdf/dynamic-content',
      'website-to-markdown/javascript-rendered-pages',
      'website-metadata/javascript-rendered-pages'
    ]
  },
  {
    slug: 'website-screenshot/browser-frame',
    vertical,
    category,
    name: 'Screenshots with a browser frame',
    cta: 'Add a browser frame',
    blurb:
      'Wrap the capture in a light or dark browser window over a color, gradient or image background.',
    keywords: [
      'screenshot with browser frame',
      'website screenshot browser mockup api',
      'browser window mockup api',
      'framed website screenshot'
    ],
    related: [
      'website-screenshot/open-graph-images',
      'website-screenshot/dark-mode',
      'website-screenshot/mobile',
      'website-screenshot/capture-element',
      'website-screenshot/block-cookie-banners-and-ads',
      'website-metadata/brand-colors'
    ]
  },
  {
    slug: 'website-screenshot/faster-smaller-screenshots',
    vertical,
    category,
    name: 'Faster, smaller screenshots',
    cta: 'Speed up your screenshots',
    blurb:
      'Skip metadata, pick JPEG quality and pixel density, and wait for a selector instead of a timer to cut time and bytes.',
    keywords: [
      'fast screenshot api',
      'reduce screenshot file size',
      'screenshot jpeg quality',
      'screenshot api performance'
    ],
    related: [
      'website-screenshot/traffic-spikes',
      'website-screenshot/dynamic-content',
      'website-screenshot/capture-element',
      'website-screenshot/mobile',
      'website-screenshot/open-graph-images',
      'website-metadata/only-the-fields-you-need'
    ]
  }
]
