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
      'Emulate a phone, a tablet or any custom viewport and capture the page exactly as those users see it.',
    keywords: [
      'mobile website screenshot api',
      'screenshot viewport',
      'device emulation screenshot'
    ],
    related: [
      'website-screenshot/capture-element',
      'website-screenshot/dark-mode',
      'website-screenshot/faster-smaller-screenshots'
    ]
  },
  {
    slug: 'website-screenshot/block-cookie-banners-and-ads',
    vertical,
    category,
    name: 'Screenshots without cookie banners or ads',
    cta: 'Block cookie banners and ads',
    blurb:
      'Ads, trackers and consent banners are blocked before the page renders, and first-party banners get dismissed with one option.',
    keywords: [
      'screenshot without cookie banner',
      'remove cookie consent popup screenshot',
      'ad free screenshot api'
    ],
    related: [
      'website-screenshot/capture-element',
      'website-screenshot/dynamic-content',
      'website-screenshot/behind-login',
      'website-to-pdf/clean-layout'
    ]
  },
  {
    slug: 'website-screenshot/capture-element',
    vertical,
    category,
    name: 'Screenshot a single element',
    cta: 'Capture a single element',
    blurb:
      'Crop the capture to one CSS selector, with a transparent background if you need it.',
    keywords: [
      'screenshot element css selector',
      'screenshot specific element api',
      'transparent screenshot'
    ],
    related: [
      'website-screenshot/block-cookie-banners-and-ads',
      'website-screenshot/dynamic-content',
      'website-screenshot/mobile'
    ]
  },
  {
    slug: 'website-screenshot/traffic-spikes',
    vertical,
    category,
    name: 'Screenshots under traffic spikes',
    cta: 'Handle traffic spikes',
    blurb:
      'Bursty screenshot traffic without provisioning browsers: no throttling, parallel requests and a cache that absorbs repeats.',
    keywords: [
      'screenshot api scale',
      'screenshot api rate limits',
      'high volume screenshots'
    ],
    related: [
      'website-screenshot/open-graph-images',
      'website-screenshot/faster-smaller-screenshots',
      'website-screenshot/built-in-proxy',
      'website-to-pdf/batch-generation'
    ]
  },
  {
    slug: 'website-screenshot/built-in-proxy',
    vertical,
    category,
    name: 'Screenshot blocked websites',
    cta: 'Screenshot blocked websites',
    blurb:
      'When a target blocks headless browsers, one option routes the capture through the built-in proxy.',
    keywords: [
      'screenshot api proxy',
      'screenshot cloudflare protected site',
      'screenshot blocked website'
    ],
    related: [
      'website-screenshot/proxy-geolocation',
      'website-screenshot/behind-login',
      'website-screenshot/traffic-spikes',
      'website-to-markdown/blocked-sites'
    ]
  },
  {
    slug: 'website-screenshot/proxy-geolocation',
    vertical,
    category,
    name: 'Screenshot a site from another country',
    cta: 'Capture from another country',
    blurb:
      'Pin the request to a country and capture the page the way a local visitor sees it.',
    keywords: [
      'screenshot website from another country',
      'geolocated screenshot api',
      'proxy location screenshot'
    ],
    related: [
      'website-screenshot/built-in-proxy',
      'website-screenshot/behind-login',
      'website-screenshot/mobile',
      'website-metadata/localized-metadata'
    ]
  },
  {
    slug: 'website-screenshot/dark-mode',
    vertical,
    category,
    name: 'Screenshots in dark mode',
    cta: 'Capture dark mode',
    blurb:
      'Force prefers-color-scheme before the capture and get the dark variant of any page that supports it.',
    keywords: ['screenshot dark mode', 'prefers-color-scheme screenshot api'],
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
      'Point og:image at an API URL and every share gets a fresh, cached screenshot of the page.',
    keywords: [
      'dynamic open graph image',
      'og image from screenshot',
      'social preview image api'
    ],
    related: [
      'website-screenshot/browser-frame',
      'website-screenshot/traffic-spikes',
      'website-screenshot/dark-mode',
      'website-to-pdf/download-links-and-previews',
      'website-metadata/missing-or-wrong-metadata'
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
      'screenshot logged in page api',
      'screenshot authenticated page',
      'screenshot with cookies api'
    ],
    related: [
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
      'Wait for the right element, event or delay so single-page apps and lazy sections are fully rendered before capture.',
    keywords: [
      'screenshot spa api',
      'screenshot after javascript loads',
      'wait for selector screenshot'
    ],
    related: [
      'website-screenshot/capture-element',
      'website-screenshot/block-cookie-banners-and-ads',
      'website-screenshot/faster-smaller-screenshots',
      'website-to-pdf/dynamic-content'
    ]
  },
  {
    slug: 'website-screenshot/browser-frame',
    vertical,
    category,
    name: 'Screenshots with a browser frame',
    cta: 'Add a browser frame',
    blurb:
      'Compose the capture inside a light or dark browser window over a color, gradient or image background.',
    keywords: [
      'website screenshot browser mockup api',
      'screenshot with browser frame',
      'browser window mockup generator api'
    ],
    related: [
      'website-screenshot/open-graph-images',
      'website-screenshot/dark-mode',
      'website-screenshot/mobile'
    ]
  },
  {
    slug: 'website-screenshot/faster-smaller-screenshots',
    vertical,
    category,
    name: 'Faster, smaller screenshots',
    cta: 'Speed up your screenshots',
    blurb:
      'Skip metadata, pick JPEG quality and pixel density, and wait for a selector instead of a timer.',
    keywords: [
      'fast screenshot api',
      'reduce screenshot size api',
      'screenshot jpeg quality'
    ],
    related: [
      'website-screenshot/traffic-spikes',
      'website-screenshot/dynamic-content',
      'website-screenshot/mobile'
    ]
  }
]
