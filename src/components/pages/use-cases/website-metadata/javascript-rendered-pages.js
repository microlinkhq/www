export const CONTENT = {
  slug: 'website-metadata/javascript-rendered-pages',
  head: {
    title: 'Extract metadata from single-page apps and React sites',
    description:
      'When a React or Vue app injects Open Graph tags with JavaScript, a plain fetch reads an empty shell. Render it in a browser, wait for the tags, read them.'
  },
  hero: {
    title: 'Extract metadata from single-page apps and client-rendered pages',
    intro:
      'To extract metadata from single-page apps, the page has to run first. Frameworks that set document.title and the meta tags at runtime leave the initial HTML empty, so crawlers that only fetch see the app name and no image. The Metadata API can render the page in a headless browser and read the tags the app actually produces.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Single-page apps set their metadata after the HTML is served',
    paragraphs: [
      'React Helmet, Vue Meta and their equivalents write title, description and og:image on the client. A fetch-based extractor reads the server response, which contains only the shell, and reports the same app name and the same generic description for every route.',
      'The textbook fix is server-side rendering, or a prerendering service in front of the app, and that is a project for the site’s owner. When you are unfurling links to other people’s apps, you cannot change how they render. Sleeping for a fixed time before reading the DOM is the other common hack, and it is too short on slow days and wasted time on fast ones.',
      'Microlink picks the fetch mode on its own with [prerender](/docs/api/parameters/prerender) set to auto. For pages you know are client-rendered, set prerender to true and add [waitForSelector](/docs/api/parameters/waitForSelector) for an element that only exists once the route has rendered. The metadata is then read from the live DOM and normalized like any other page.'
    ],
    live: {
      label: 'Open the live JSON of a client-rendered page',
      request: {
        url: 'https://dev.to',
        params: { prerender: true, waitForSelector: 'main' }
      }
    }
  },
  how: {
    title: 'How to prerender a page before reading its metadata',
    intro:
      'prerender decides whether a browser is used, and the wait options decide when the tags are trustworthy. The [page preparation guide](/docs/guides/metadata/page-preparation) has the full decision table.',
    steps: [
      {
        label: '1 · Force the browser',
        sdk: "const { title, description, image } = await microlink.metadata(\n  'https://app.example.com/items/42',\n  { prerender: true, waitForSelector: 'main h1' }\n)",
        note: 'The browser executes the app’s JavaScript, the route renders its h1, and only then is the metadata read. You get the same normalized fields as for a static page.'
      },
      {
        label: '2 · Wait for the tag itself',
        sdk: "const { image } = await microlink.metadata('https://app.example.com/items/42', {\n  prerender: true,\n  waitForSelector: 'meta[property=\"og:image\"]'\n})",
        note: 'When the app injects the tag late, wait for the tag rather than for visible content. Any CSS selector works, including attribute selectors on meta elements.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://app.example.com/items/42',
          params: { prerender: true, waitForSelector: 'main h1' }
        },
        note: 'The x-fetch-mode response header reports prerender when a browser was used and fetch when a plain request was enough. x-fetch-time shows how long that step took.'
      }
    ],
    params: [
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'auto (default) lets the service decide, true forces a headless browser, false forces a plain HTTP GET.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Pauses until the CSS selector appears in the DOM. Works for meta tags too.'
      },
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/waitUntil',
        note: 'Lifecycle event that marks navigation as done: auto (default), load, domcontentloaded, networkidle0 or networkidle2.'
      },
      {
        name: 'waitForTimeout',
        href: '/docs/api/parameters/waitForTimeout',
        note: 'A fixed wait, as a last resort when the page has no stable selector.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Restrict detection to the fields you need to keep renders fast.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache the rendered result for up to 31 days; browser renders are slower than fetches. Pro plans.'
      }
    ],
    outro:
      'Rendered requests take longer than plain fetches, so keep meta scoped to the fields you use and let the cache serve the repeats. When nothing else works, navigate with waitUntil set to domcontentloaded and then wait for the element you need, as the [waitUntil reference](/docs/api/parameters/waitUntil) suggests.'
  },
  why: {
    title: 'Why a headless browser is the only source for SPA Open Graph tags',
    intro:
      'If the tags are produced by code, only executing that code reveals them.',
    cards: [
      {
        kicker: 'The tags the app writes',
        title: 'Metadata read from the live document.',
        body: 'After the render, document.title, the meta tags and JSON-LD reflect the route a visitor would see. Microlink normalizes those exactly as it does for a server-rendered page, so your preview code does not branch per site.',
        note: 'Combine with [override rules](/use-cases/website-metadata/missing-or-wrong-metadata) when the app still gets a field wrong after rendering.'
      },
      {
        kicker: 'Auto by default',
        title: 'prerender: auto renders only when it must.',
        body: 'For mixed sources, leave prerender on auto: static pages get a plain HTTP GET and client-rendered ones get the browser. Force true only for hosts you know need it, and false for hosts you know do not.',
        note: 'x-fetch-mode tells you which path was taken, so you can build a per-domain setting from your logs.'
      },
      {
        kicker: 'Deterministic waits',
        title: 'Wait for the tag, not for a timer.',
        body: 'A selector wait on the meta tag returns the moment the app sets it and still covers slow networks. Fixed delays are either wasteful or unreliable.',
        note: 'When not to: if the site serves correct tags in its HTML, a plain fetch is faster and prerender adds nothing. The same render-then-read approach applies to [Markdown from JavaScript-rendered pages](/use-cases/website-to-markdown/javascript-rendered-pages) and [screenshots of dynamic content](/use-cases/website-screenshot/dynamic-content).'
      }
    ]
  },
  faq: [
    {
      question:
        'Why does the metadata show the app name instead of the page title?',
      answer:
        'The title is set by JavaScript after load, and the extraction read the initial HTML. Set prerender to true and wait for an element or tag that only exists once the route has rendered. The [metadata troubleshooting guide](/docs/guides/metadata/troubleshooting) covers the other causes of wrong fields.'
    },
    {
      question:
        'How do I get metadata from a React app that sets its tags with JavaScript?',
      answer:
        'Request the URL with prerender: true so the page runs in a headless browser, and add waitForSelector for an element or a meta tag that appears after the route renders. The title, description and image are then read from the live document. The same request works for Vue, Angular, Svelte and other client-rendered frameworks.'
    },
    {
      question:
        'Does prerender slow down metadata extraction from single-page apps?',
      answer:
        'A browser render takes longer than a plain fetch, because the browser waits for page events before reading the DOM. Keep prerender on auto for mixed sources, scope meta to the fields you use, and let the 24-hour cache serve the repeats.'
    },
    {
      question: 'Can the metadata request wait for the og:image tag specifically?',
      answer:
        'Yes. waitForSelector accepts any CSS selector, including meta[property="og:image"], so the extraction waits until the app injects the tag. A fixed waitForTimeout also works, but it cannot exceed the request timeout of 30 seconds on the free plan and 60 seconds on Pro.'
    },
    {
      question: 'How do I confirm a browser was used to extract the metadata?',
      answer:
        'Read the x-fetch-mode response header: prerender means the page was rendered in a browser, fetch means a plain request was enough. x-fetch-time reports how long the fetch step took.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to read',
    headlineAccent: 'client-rendered metadata',
    body: 'Render first, then extract. Start on the free tier and get the right title and image from your first single-page app today.',
    href: '/metadata',
    label: 'Extract from a web app'
  },
  howTo: {
    name: 'How to extract metadata from a single-page app',
    steps: [
      {
        title: 'Force a browser render',
        description:
          'Set prerender to true so the page runs in a headless browser and the app writes its title and meta tags.'
      },
      {
        title: 'Wait for the route to render',
        description:
          'Add waitForSelector with an element that only exists once the route has rendered, or with the og:image meta tag itself.'
      },
      {
        title: 'Read the normalized metadata',
        description:
          'The response carries the same normalized fields as for a static page: title, description, image, logo and the rest.'
      },
      {
        title: 'Confirm the fetch mode',
        description:
          'Check that the x-fetch-mode response header reports prerender, then scope meta and cache the result to keep rendered requests fast.'
      }
    ]
  }
}
