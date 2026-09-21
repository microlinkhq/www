export const CONTENT = {
  slug: 'website-screenshot/mobile',
  head: {
    title: 'Mobile website screenshots for any device or viewport',
    description:
      'Capture any URL the way an iPhone, Pixel or iPad renders it. Device presets set the viewport and user agent, and a custom viewport covers every other size.'
  },
  hero: {
    title: 'Take a mobile website screenshot at any device viewport',
    intro:
      'A mobile website screenshot has to show what a phone actually renders: the mobile layout, the mobile user agent and the phone’s pixel density. The Screenshot API emulates the device before it captures, so responsive website screenshots for QA runs, client reports, app store assets and social previews all come from one request. You can try a capture in the browser first with the [mobile screenshot tool](/tools/website-screenshot/mobile).',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Desktop screenshots hide what mobile visitors actually see',
    paragraphs: [
      'A page can look perfect at 1440px and break at 390px: overlapping menus, clipped tables, buttons too small to tap. If your captures only cover desktop, the bugs your visitors hit on their phones never show up in a QA run, a monitoring job or a client report.',
      'Shrinking the browser window does not fix it. Many sites also branch on the user agent, the device pixel ratio and the meta viewport tag, so a narrow desktop window still gets the desktop markup, just squeezed. Running your own headless browser with device descriptors works until the descriptors go stale and the fleet needs patching.',
      'The [device](/docs/api/parameters/device) parameter loads a complete profile, including the viewport and the user agent, for a named phone, tablet or desktop. When you need exact numbers, [viewport](/docs/api/parameters/viewport) overrides individual fields and merges them over the device defaults. Both settings apply to the whole request, so the site serves its mobile variant before the capture happens.'
    ],
    figure: {
      request: {
        url: 'https://microlink.io',
        params: {
          screenshot: true,
          meta: false,
          embed: 'screenshot.url',
          viewport: {
            width: 390,
            height: 844,
            deviceScaleFactor: 2,
            isMobile: true
          }
        }
      },
      alt: 'microlink.io captured at a 390 by 844 mobile viewport',
      width: 780,
      height: 1688,
      maxWidth: '360px',
      caption:
        'Generated live by the API call below: a 390×844 viewport at 2× pixel density.'
    }
  },
  how: {
    title: 'How to take a mobile screenshot of a website',
    intro:
      'Start with a device preset, because it sets everything a site can sniff. Drop down to a custom screenshot viewport only when you need a size that no real device has. The [browser settings guide](/docs/guides/screenshot/browser-settings) covers every rendering option in depth.',
    steps: [
      {
        label: '1 · Emulate a device preset',
        sdk: "const { url, width, height } = await microlink.screenshot(\n  'https://example.com',\n  { device: 'iPhone 15 Pro' }\n)",
        note: 'The browser renders the page with that device’s viewport and user agent, then returns the hosted image URL with its real width and height. Device names are case-insensitive.'
      },
      {
        label: '2 · Or set the exact viewport',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  viewport: {\n    width: 390,\n    height: 844,\n    deviceScaleFactor: 3,\n    isMobile: true,\n    hasTouch: true\n  }\n})",
        note: 'isMobile makes the browser respect the meta viewport tag and hasTouch enables touch events. Any field you leave out keeps the value of the default device.'
      },
      {
        label: '3 · Capture a device matrix in one job',
        sdk: "const devices = ['iPhone 15 Pro', 'Pixel 5', 'iPad Pro']\n\nconst captures = await Promise.all(\n  devices.map(device =>\n    microlink.screenshot('https://example.com', { device })\n  )\n)",
        note: 'Each device is its own request and its own cache entry. There is no throttling, so the three captures run in parallel within your quota.'
      },
      {
        label: '4 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: { screenshot: true, meta: false, device: 'iPhone 15 Pro' }
        },
        note: 'Every option is a query parameter, so the request works from any language. Add [embed](/docs/api/parameters/embed) and the URL returns the image itself, ready for an img tag.'
      }
    ],
    params: [
      {
        name: 'device',
        href: '/docs/api/parameters/device',
        note: 'Named preset such as iPhone 15 Pro, Pixel 5, iPad Pro or Macbook Pro 16. Defaults to Macbook Pro 13.'
      },
      {
        name: 'viewport',
        href: '/docs/api/parameters/viewport',
        note: 'width, height, deviceScaleFactor, isMobile, hasTouch and isLandscape, merged over the device defaults.'
      },
      {
        name: 'screenshot.fullPage',
        href: '/docs/api/parameters/screenshot/fullPage',
        note: 'Captures the whole scrollable page instead of the first screen. Off by default.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Set it to false to skip metadata detection when you only need the image.'
      }
    ],
    outro:
      'Tablets ship with landscape presets such as iPad Pro landscape, and isLandscape puts a custom viewport in landscape mode. When no device is set, the request renders with the default Macbook Pro 13 profile.'
  },
  why: {
    title: 'Why device emulation beats resizing the window',
    intro:
      'Three details separate a narrow desktop capture from a device emulation screenshot that matches a real phone.',
    cards: [
      {
        kicker: 'User agent included',
        title: 'The site serves its mobile variant, not a squeezed desktop page.',
        body: 'A device preset changes the user agent along with the viewport. Sites that branch on it, from adaptive layouts to app install banners, return the same markup a phone would receive. The setting applies to the whole request lifecycle, not only to the final capture.',
        note: 'Pair it with a [wait for JavaScript-rendered content](/use-cases/website-screenshot/dynamic-content) when the mobile layout hydrates after load.'
      },
      {
        kicker: 'Pixel density',
        title: 'deviceScaleFactor controls sharpness and file size.',
        body: 'A 3× capture of a 390px viewport is 1170px wide and stays crisp on retina displays. Drop to 1× when the image is a thumbnail or you are generating thousands of them. The response reports the final width and height, so you can lay the image out without measuring it.',
        note: 'The [faster, smaller screenshots](/use-cases/website-screenshot/faster-smaller-screenshots) recipe lists the other settings that cut response time and bytes.'
      },
      {
        kicker: 'Same options everywhere',
        title: 'Device emulation composes with every other option.',
        body: 'Add fullPage for the whole scroll, colorScheme for the dark theme or waitForSelector for late content, and they all run inside the emulated device. One request describes the full rendering condition, which keeps captures repeatable.',
        note: 'When not to: if you need the page laid out for paper rather than for a screen, the [PDF API](/pdf) with a paper format is the better fit.'
      }
    ]
  },
  faq: [
    {
      question: 'Which devices can I emulate for a mobile screenshot?',
      answer:
        'Recent iPhones, Pixel and Galaxy phones, iPads and other tablets in portrait and landscape, plus several MacBook and iMac profiles. Names are case-insensitive, and the full list lives on the [device parameter](/docs/api/parameters/device) page.'
    },
    {
      question: 'How do I take a website screenshot at a custom viewport size?',
      answer:
        'Pass viewport with any width and height, plus deviceScaleFactor, isMobile, hasTouch or isLandscape. The values you provide merge over the default device profile, so you only declare what changes.'
    },
    {
      question: 'Why does my mobile screenshot still show the desktop layout?',
      answer:
        'The site is probably reading the user agent or the meta viewport tag, not just the width. Use a device preset so the user agent changes too, or set isMobile to true in a custom viewport so the meta viewport tag is respected.'
    },
    {
      question: 'Does a mobile screenshot capture the full page?',
      answer:
        'By default it captures the first screen of the emulated viewport. Add screenshot.fullPage to capture the entire scrollable page; expect a slower response on tall pages. The [full page screenshot tool](/tools/website-screenshot/full-page) shows the difference.'
    },
    {
      question: 'Do mobile screenshots use more requests than desktop ones?',
      answer:
        'No. A screenshot is one request regardless of the device or viewport. Responses are cached for 24 hours by default, and cache hits do not count against your quota.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'mobile screenshots',
    body: 'One request per device, no browsers to run. Start on the free endpoint with 25 requests per day and add an API key when you move to production.',
    href: '/screenshot',
    label: 'Get your first mobile screenshot'
  },
  howTo: {
    name: 'How to take a mobile screenshot of a website with an API',
    steps: [
      {
        title: 'Emulate a device preset',
        description:
          'Pass device with a name such as iPhone 15 Pro so the browser renders the page with that device’s viewport and user agent.'
      },
      {
        title: 'Or set the exact viewport',
        description:
          'Pass viewport with width, height, deviceScaleFactor, isMobile and hasTouch when you need a size that is not a real device.'
      },
      {
        title: 'Capture several devices in parallel',
        description:
          'Map over a list of device names and send one request per device. Each capture is cached independently.'
      },
      {
        title: 'Use the request as a URL',
        description:
          'Send the same options as query parameters to the API endpoint, and add embed=screenshot.url to get the image itself.'
      }
    ]
  }
}
