export const CONTENT = {
  slug: 'website-screenshot/mobile',
  head: {
    title: 'Mobile website screenshot API: any device or viewport',
    description:
      'Capture any URL as an iPhone, Android or tablet user sees it: device presets, custom viewports, pixel density and touch emulation in one API call.'
  },
  hero: {
    title: 'Screenshot a website at any mobile viewport',
    intro:
      'Responsive bugs, app store assets, QA evidence and client reports all need the mobile version of a page, not the desktop one. The Screenshot API emulates the device before it captures, so the layout, the user agent and the pixel density match a real phone.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Desktop screenshots hide what mobile users actually see',
    paragraphs: [
      'A page can look perfect at 1440px and break at 390px: overlapping menus, clipped tables, unreadable buttons. If your screenshots only cover desktop, the bugs your users hit on their phones never show up in your reports.',
      'Shrinking the browser window is not enough either. Responsive sites also read the user agent, the device pixel ratio and touch support, so a narrow desktop window still renders the desktop variant on many sites.'
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
    title: 'Pick a device preset or describe the viewport',
    intro:
      'The [device](/docs/api/parameters/device) parameter loads a known phone, tablet or desktop profile: viewport, user agent and pixel density in one go. When you need exact numbers, [viewport](/docs/api/parameters/viewport) overrides any of those fields.',
    steps: [
      {
        label: '1 · Emulate a device preset',
        sdk: "const { url, width, height } = await microlink.screenshot(\n  'https://example.com',\n  { device: 'iPhone 15 Pro' }\n)",
        note: 'Pass a device name and the browser renders the page with that device’s viewport, user agent and pixel density.'
      },
      {
        label: '2 · Or set the exact viewport',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  viewport: {\n    width: 390,\n    height: 844,\n    deviceScaleFactor: 3,\n    isMobile: true,\n    hasTouch: true\n  }\n})",
        note: 'Custom width, height, pixel density, mobile meta viewport and touch support merge over the default device.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: { screenshot: true, meta: false, device: 'iPhone 15 Pro' }
        },
        note: 'Every option is a query parameter, so the URL works from any language or straight from an img tag.'
      }
    ],
    params: [
      {
        name: 'device',
        href: '/docs/api/parameters/device',
        note: 'Named presets such as iPhone 15 Pro, Pixel 5, iPad Pro or Macbook Pro 16. Case-insensitive.'
      },
      {
        name: 'viewport',
        href: '/docs/api/parameters/viewport',
        note: 'width, height, deviceScaleFactor, isMobile, hasTouch and isLandscape, merged over the device defaults.'
      },
      {
        name: 'screenshot.fullPage',
        href: '/docs/api/parameters/screenshot/fullPage',
        note: 'Capture the whole scrollable page instead of the first screen.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Set it to false to skip metadata extraction when you only need the image.'
      }
    ],
    outro:
      'Device names are case-insensitive and the setting applies to the whole request, so a mobile capture also renders any mobile-only markup the site serves.'
  },
  why: {
    title: 'Why emulate instead of resize',
    intro:
      'Three details make the difference between a narrow desktop screenshot and a real mobile capture.',
    cards: [
      {
        kicker: 'User agent included',
        title: 'The site serves its mobile variant, not a squeezed desktop page.',
        body: 'A device preset changes the user agent along with the viewport. Sites that branch on it, from adaptive layouts to app banners, render the same markup a phone would receive.',
        note: 'This matters for [visual QA of dynamic pages](/use-cases/website-screenshot/dynamic-content) and for client reports where the screenshot must match what the customer sees on their own phone.'
      },
      {
        kicker: 'Pixel density',
        title: 'deviceScaleFactor controls sharpness and file size.',
        body: 'A 3× capture of a 390px viewport is 1170px wide and crisp on retina displays. Drop to 1× when the image is a thumbnail or you are generating thousands of them.',
        note: 'The response includes the real width and height of the image, so you can lay it out without measuring it first.'
      },
      {
        kicker: 'Same options everywhere',
        title: 'Device emulation composes with every other option.',
        body: 'Add fullPage for the whole scroll, colorScheme for dark mode or waitForSelector for late content, and they all run inside the emulated device.',
        note: 'When not to: if you need the page rendered at print size rather than on a screen, the [PDF API](/pdf) with a paper format is the better fit.'
      }
    ]
  },
  faq: [
    {
      question: 'Which mobile devices can I emulate?',
      answer:
        'Recent iPhones, Pixels and Galaxy phones, iPads and other tablets in portrait and landscape, plus several MacBook and iMac profiles. The full list of names lives on the [device parameter](/docs/api/parameters/device) page.'
    },
    {
      question: 'Can I capture a viewport that is not a real device?',
      answer:
        'Yes. Pass viewport with any width and height, plus deviceScaleFactor, isMobile, hasTouch or isLandscape. The values you provide merge over the default device profile.'
    },
    {
      question: 'Does a mobile screenshot include the full page?',
      answer:
        'By default it captures the first screen of the emulated viewport. Add screenshot.fullPage to capture the entire scrollable page; it takes longer on tall pages.'
    },
    {
      question: 'Do mobile screenshots cost more?',
      answer:
        'No. A screenshot is one request regardless of the device or viewport. Responses are cached for 24 hours by default, so repeating the same capture is served from the cache.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'mobile screenshots',
    body: 'One request per device. Start on the free tier with 25 requests per day and switch to a Pro key when you move to production.',
    href: '/screenshot',
    label: 'Get your first mobile screenshot'
  }
}
