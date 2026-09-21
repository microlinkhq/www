export const CONTENT = {
  slug: 'website-screenshot/dark-mode',
  head: {
    title: 'Screenshot any website in dark mode or light mode',
    description:
      'Set prefers-color-scheme to dark or light before the capture and get that theme on any site that supports it. Works with devices and element capture.'
  },
  hero: {
    title: 'Take a dark mode screenshot of any website',
    intro:
      'A dark mode screenshot used to mean toggling a system setting and capturing by hand. Design reviews, documentation, app store listings and marketing pages now need both themes of every page, kept in sync. Tell the browser which color scheme to prefer and the Screenshot API captures the dark or the light variant directly, with every other option unchanged.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Automated screenshots ignore dark mode and come back light',
    paragraphs: [
      'Most sites switch themes with the prefers-color-scheme media query, which follows the operating system. A headless browser reports no preference, so every automated capture comes back in the default theme, even for a product whose users mostly see the dark one.',
      'The workarounds do not scale. Changing the OS setting on a capture machine affects every job on it. Appending a theme query string only works on sites that invented one. Forcing dark colors with your own CSS produces a page no visitor has ever seen.',
      'The [colorScheme](/docs/api/parameters/colorScheme) parameter sets that media feature for the request: no-preference by default, or light or dark. Sites that implement prefers-color-scheme render the matching theme, and the capture is otherwise identical. It is one of the rendering conditions covered in the [browser settings guide](/docs/guides/screenshot/browser-settings), next to the viewport and the device.'
    ],
    figure: {
      request: {
        url: 'https://googlechromelabs.github.io/dark-mode-toggle/demo',
        params: {
          screenshot: true,
          meta: false,
          embed: 'screenshot.url',
          colorScheme: 'dark',
          viewport: { width: 1200, height: 750, deviceScaleFactor: 1 }
        }
      },
      alt: 'A demo page captured with its dark theme active',
      width: 1200,
      height: 750,
      caption:
        'Generated live by the API call below with colorScheme set to dark.'
    }
  },
  how: {
    title: 'How to screenshot a website in dark mode',
    intro:
      'One option covers every site that follows the system preference. For a site that stores the theme itself, trigger its switch with a [click](/docs/api/parameters/click) or apply its theme class with injected CSS.',
    steps: [
      {
        label: '1 · Force dark mode',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  colorScheme: 'dark'\n})",
        note: 'The browser reports prefers-color-scheme: dark, the site renders its dark theme, and the response carries the hosted image URL.'
      },
      {
        label: '2 · Capture both themes for a comparison',
        sdk: "const themes = ['light', 'dark']\n\nconst [light, dark] = await Promise.all(\n  themes.map(colorScheme =>\n    microlink.screenshot('https://example.com', { colorScheme })\n  )\n)",
        note: 'Two parallel requests return two images. The cache key includes every query parameter, so each theme gets its own cache entry.'
      },
      {
        label: '3 · Dark mode on a phone',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  colorScheme: 'dark',\n  device: 'iPhone 15 Pro'\n})",
        note: 'colorScheme composes with [device emulation](/docs/api/parameters/device), so the dark mobile variant takes one request.'
      },
      {
        label: '4 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: { screenshot: true, meta: false, colorScheme: 'dark' }
        },
        note: 'This works on the free endpoint with no API key. meta=false skips metadata detection, which is the biggest speedup for screenshot-only requests.'
      }
    ],
    params: [
      {
        name: 'colorScheme',
        href: '/docs/api/parameters/colorScheme',
        note: 'Sets the prefers-color-scheme media feature: no-preference (default), light or dark.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Clicks a site-specific theme switch before the capture.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Injects CSS to apply a theme when the site ignores the media query.'
      },
      {
        name: 'device',
        href: '/docs/api/parameters/device',
        note: 'Combine with a phone preset for the mobile dark theme. Defaults to Macbook Pro 13.'
      }
    ],
    outro:
      'colorScheme only affects sites that implement prefers-color-scheme. CSS animations and transitions are disabled by default for screenshots, which keeps themed captures stable from one run to the next.'
  },
  why: {
    title: 'Why emulate prefers-color-scheme for dark mode captures',
    intro:
      'A theme is a rendering condition, like a viewport. Treating it as a request option is what makes a prefers-color-scheme screenshot API repeatable.',
    cards: [
      {
        kicker: 'Standards based',
        title: 'The same signal real visitors send.',
        body: 'colorScheme sets the media feature the site already listens to. There is nothing site-specific to reverse engineer for any page that follows the platform convention, and nothing to maintain when the site redesigns its toggle.',
        note: 'Combine it with [mobile device emulation](/use-cases/website-screenshot/mobile) to get the dark mobile variant, the one designers usually check last.'
      },
      {
        kicker: 'Comparable output',
        title: 'Light and dark captures share every other setting.',
        body: 'The theme is one option among many, so the two captures have the same viewport, the same waits and the same blocked ads. A side-by-side comparison shows theme differences only, which is what a visual regression suite needs.',
        note: 'Running both themes from the same job is a map over two values, and there is no throttling on parallel requests.'
      },
      {
        kicker: 'Escape hatch',
        title: 'click and styles cover custom toggles.',
        body: 'Sites that persist the theme in local storage or a cookie ignore the media query. Click their switch, or inject the rules their dark theme uses, and the capture happens after the change applies.',
        note: 'When not to: if the site has no dark theme at all, colorScheme has no effect, and forcing dark colors with CSS produces a screenshot no visitor will ever see. For a dark presentation of a light page, put it in a [dark browser frame](/use-cases/website-screenshot/browser-frame) instead.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I take a dark mode screenshot of a website?',
      answer:
        'Add colorScheme=dark to the request. The browser reports prefers-color-scheme: dark and any site that implements that media query renders its dark theme before the capture.'
    },
    {
      question: 'Why does my dark mode screenshot still look light?',
      answer:
        'The site probably does not implement prefers-color-scheme, or it stores the theme in a cookie or local storage. Use click to activate its toggle, or [styles](/docs/api/parameters/styles) to apply its dark theme rules, then capture.'
    },
    {
      question: 'Can I capture light and dark screenshots in one request?',
      answer:
        'No, one request produces one image. Send two requests with colorScheme set to light and dark. They run in parallel and are cached independently.'
    },
    {
      question: 'Can I take a dark mode screenshot of the mobile version of a site?',
      answer:
        'Yes. colorScheme is a browser setting for the whole request, so it combines with a device preset or a custom viewport. The [mobile screenshot tool](/tools/website-screenshot/mobile) lets you preview the phone layout first.'
    },
    {
      question: 'Are dark mode screenshots available on the free plan?',
      answer:
        'Yes. colorScheme works on every plan, including the free endpoint with 25 requests per day. See [pricing](/pricing) when you need more volume.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'dark mode',
    body: 'One option, both themes, every plan. Start on the free endpoint and capture the dark variant of your first page today.',
    href: '/screenshot',
    label: 'Capture in dark mode'
  },
  howTo: {
    name: 'How to screenshot a website in dark mode with an API',
    steps: [
      {
        title: 'Force dark mode',
        description:
          'Pass colorScheme set to dark so the browser reports prefers-color-scheme: dark and the site renders its dark theme.'
      },
      {
        title: 'Capture both themes',
        description:
          'Send one request with colorScheme set to light and one set to dark to compare the two themes side by side.'
      },
      {
        title: 'Combine with a device',
        description:
          'Add device with a phone preset to capture the dark mobile variant in the same request.'
      },
      {
        title: 'Use the request as a URL',
        description:
          'Send colorScheme=dark as a query parameter together with screenshot=true and meta=false.'
      }
    ]
  }
}
