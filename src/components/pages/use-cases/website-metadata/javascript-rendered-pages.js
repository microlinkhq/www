export const CONTENT = {
  slug: 'website-metadata/javascript-rendered-pages',
  head: {
    title: 'Extract metadata from single-page apps',
    description:
      'When Open Graph tags are injected by JavaScript, a plain fetch sees nothing. Force a browser render with prerender, wait for the tags, then read them.'
  },
  hero: {
    title: 'Extract metadata from single-page apps and client-rendered pages',
    intro:
      'Frameworks that set document.title and meta tags at runtime leave the initial HTML empty. Crawlers that only fetch see a generic title and no image. The Metadata API can render the page in a real browser first and read the tags the app actually produces.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'The tags are set after the HTML is served',
    paragraphs: [
      'React Helmet, Vue Meta and their equivalents write title, description and og:image on the client. A fetch-based extractor reads the server response, which contains the shell, and reports the app name for every route.',
      'Microlink decides the fetch mode automatically with prerender set to auto. For pages you know are client-rendered, set prerender to true and add waitForSelector for an element that only exists once the route has rendered; the metadata is then read from the live DOM.'
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
    title: 'Render, wait, then read the tags',
    intro:
      'prerender chooses the browser and the wait options decide when the tags are trustworthy.',
    steps: [
      {
        label: '1 · Force the browser',
        sdk: "const { title, description, image } = await microlink.metadata(\n  'https://app.example.com/items/42',\n  { prerender: true, waitForSelector: 'main h1' }\n)",
        note: 'The page executes its JavaScript, the route renders, and the metadata is read afterwards.'
      },
      {
        label: '2 · Wait for the tag itself',
        sdk: "const { image } = await microlink.metadata('https://app.example.com/items/42', {\n  prerender: true,\n  waitForSelector: 'meta[property=\"og:image\"]'\n})",
        note: 'When the app injects the tag late, wait for the tag rather than for visible content.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://app.example.com/items/42',
          params: { prerender: true, waitForSelector: 'main h1' }
        },
        note: 'The x-fetch-mode response header reports prerender when a browser was used.'
      }
    ],
    params: [
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'auto (default), true to force a browser render, false for a plain fetch.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Pause until the selector matches; works for meta tags too.'
      },
      {
        name: 'waitUntil',
        href: '/docs/api/parameters/waitUntil',
        note: 'Lifecycle event to consider the page ready; accepts an array.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Restrict detection to the fields you need to keep renders fast.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache the rendered result; browser renders are slower than fetches.'
      }
    ],
    outro:
      'Rendered requests take longer than plain fetches, so keep meta scoped to the fields you use and cache the result with ttl on Pro plans.'
  },
  why: {
    title: 'Why a browser is sometimes the only source',
    intro:
      'If the tags are produced by code, only executing that code reveals them.',
    cards: [
      {
        kicker: 'The tags the app writes',
        title: 'Metadata read from the live document.',
        body: 'After the render, document.title, meta tags and JSON-LD reflect the route the user would see. Microlink normalizes those exactly as it would for a server-rendered page.',
        note: 'Combine with [override rules](/use-cases/website-metadata/missing-or-wrong-metadata) when the app still gets a field wrong.'
      },
      {
        kicker: 'Auto by default',
        title: 'prerender: auto renders only when it must.',
        body: 'For mixed sources, leave prerender on auto: static pages are fetched cheaply and client-rendered ones get the browser. Force it only for hosts you know need it.',
        note: 'x-fetch-mode tells you which path was taken, so you can tune per domain from your logs.'
      },
      {
        kicker: 'Deterministic waits',
        title: 'Wait for the tag, not for a timer.',
        body: 'A selector wait on the meta tag itself returns the moment the app sets it and still covers slow networks. Fixed delays are either wasteful or unreliable.',
        note: 'When not to: if the site serves correct tags in its HTML, a plain fetch is faster and prerender adds nothing; check x-fetch-mode before forcing it.'
      }
    ]
  },
  faq: [
    {
      question: 'Why does the metadata show the app name instead of the page title?',
      answer:
        'The title is set by JavaScript after load and the extraction read the initial HTML. Set prerender to true and wait for an element or tag that exists once the route has rendered.'
    },
    {
      question: 'Does prerender slow down metadata extraction?',
      answer:
        'A browser render takes longer than a plain fetch. Keep prerender on auto for mixed sources, scope meta to the fields you use, and cache with ttl on Pro plans.'
    },
    {
      question: 'Can I wait for the og:image tag specifically?',
      answer:
        'Yes. waitForSelector accepts any CSS selector, including meta[property="og:image"], so the extraction waits until the app injects the tag.'
    },
    {
      question: 'How do I confirm a browser was used for metadata?',
      answer:
        'Read the x-fetch-mode response header: prerender means the page was rendered in a browser, fetch means a plain request was enough.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to read',
    headlineAccent: 'client-rendered metadata',
    body: 'Render first, then extract. Start on the free tier and get the right title and image from your first single-page app today.',
    href: '/metadata',
    label: 'Extract from a web app'
  }
}
