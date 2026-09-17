export const CONTENT = {
  slug: 'website-screenshot/dark-mode',
  head: {
    title: 'Screenshot a website in dark mode via API',
    description:
      'Force prefers-color-scheme: dark before the capture and get the dark variant of any page that supports it. Composes with device and element capture.'
  },
  hero: {
    title: 'Screenshot a website in dark mode',
    intro:
      'Design reviews, documentation and marketing assets increasingly need both themes of a page. Instead of toggling a system setting, tell the browser which color scheme to prefer and capture the dark variant directly.',
    cta: { label: 'Start with the Screenshot API', href: '/screenshot' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Dark mode is a browser preference, not a URL',
    paragraphs: [
      'Most sites switch themes with the prefers-color-scheme media query, driven by the operating system. A headless browser defaults to no preference, so every automated screenshot comes back in light mode even for users who never see it.',
      'The colorScheme option sets that media feature for the request. Sites that implement prefers-color-scheme render their dark theme; the capture is otherwise identical.'
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
    title: 'Set the color scheme, then capture',
    intro:
      'One option covers sites that follow the system preference. For sites that store the theme themselves, trigger the switch with a click or CSS.',
    steps: [
      {
        label: '1 · Force dark mode',
        sdk: "const { url } = await microlink.screenshot('https://example.com', {\n  colorScheme: 'dark'\n})",
        note: 'The browser reports prefers-color-scheme: dark and the site renders its dark theme.'
      },
      {
        label: '2 · Capture both themes for a comparison',
        sdk: "const themes = ['light', 'dark']\n\nconst [light, dark] = await Promise.all(\n  themes.map(colorScheme =>\n    microlink.screenshot('https://example.com', { colorScheme })\n  )\n)",
        note: 'Two requests, two cache entries: the color scheme is part of the request.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: { screenshot: true, meta: false, colorScheme: 'dark' }
        },
        note: 'Works on the free endpoint; no key required.'
      }
    ],
    params: [
      {
        name: 'colorScheme',
        href: '/docs/api/parameters/colorScheme',
        note: 'no-preference (default), light or dark. Sets the prefers-color-scheme media feature.'
      },
      {
        name: 'click',
        href: '/docs/api/parameters/click',
        note: 'Toggle a site-specific theme switch before the capture.'
      },
      {
        name: 'styles',
        href: '/docs/api/parameters/styles',
        note: 'Force a theme class or override colors when the site ignores the media query.'
      },
      {
        name: 'device',
        href: '/docs/api/parameters/device',
        note: 'Combine with a phone preset for the mobile dark theme.'
      }
    ],
    outro:
      'colorScheme only affects sites that implement prefers-color-scheme. A site with its own toggle needs a click on that toggle or a CSS class set through styles.'
  },
  why: {
    title: 'Why emulate the preference',
    intro:
      'A theme is a rendering condition like a viewport. Treating it as one keeps captures repeatable.',
    cards: [
      {
        kicker: 'Standards based',
        title: 'The same signal real users send.',
        body: 'colorScheme sets the media feature the site already listens to. There is nothing site-specific to reverse engineer for every page that follows the platform convention.',
        note: 'Combine it with [device emulation](/use-cases/website-screenshot/mobile) to get the dark mobile variant designers usually check last.'
      },
      {
        kicker: 'Comparable output',
        title: 'Light and dark captures share every other setting.',
        body: 'Because the theme is just one option, the two captures have the same viewport, the same waits and the same blocked ads, so a side-by-side comparison shows theme differences only.',
        note: 'Visual regression suites can run both themes from the same job by mapping over the two values.'
      },
      {
        kicker: 'Escape hatch',
        title: 'click and styles cover custom toggles.',
        body: 'Sites that persist the theme in local storage or a cookie ignore the media query. Click their switch, or inject the class they use, and capture after it applies.',
        note: 'When not to: if the site has no dark theme at all, colorScheme has no effect; forcing dark colors with CSS produces a screenshot no user will ever see.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does my dark mode screenshot still look light?',
      answer:
        'The site probably does not implement prefers-color-scheme, or it stores the theme in a cookie or local storage. Use click to activate its toggle, or styles to apply its dark theme class, then capture.'
    },
    {
      question: 'Can I capture light and dark in one request?',
      answer:
        'No, one request produces one image. Send two requests with colorScheme set to light and dark; both are cached independently.'
    },
    {
      question: 'Does colorScheme affect PDFs and metadata too?',
      answer:
        'Yes. colorScheme is a browser setting for the whole request, so it applies to any product that renders the page in a browser, including PDF generation.'
    },
    {
      question: 'Is dark mode capture available on the free plan?',
      answer:
        'Yes. colorScheme works on every plan, including the free endpoint with 25 requests per day.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to capture',
    headlineAccent: 'dark mode',
    body: 'One option, both themes, every plan. Start on the free tier and capture the dark variant of your first page today.',
    href: '/screenshot',
    label: 'Capture in dark mode'
  }
}
