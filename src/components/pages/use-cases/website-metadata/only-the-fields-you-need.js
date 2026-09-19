export const CONTENT = {
  slug: 'website-metadata/only-the-fields-you-need',
  head: {
    title: 'Fetch only the metadata fields you need, faster',
    description:
      'Include or exclude normalized metadata fields per request with the meta object: skip images and logos for text-only jobs, or fetch just the title.'
  },
  hero: {
    title: 'Fetch only the metadata fields you need',
    intro:
      'The default metadata payload detects every field, resolves every image and checks every URL. A search indexer that only needs the title, or a text pipeline that never shows a logo, pays for all of it. The meta object turns detection into a menu.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Full detection is the expensive default',
    paragraphs: [
      'Detecting an image means finding candidates, fetching them, measuring them and verifying they load. Detecting a logo does the same for favicons and touch icons. When the consumer never renders either, that is wasted time on every request.',
      'Pass meta as an object. Fields set to true are the only ones detected; fields set to false are skipped from the default set. Combined with filter for the response shape, each request carries exactly what the consumer reads.'
    ],
    live: {
      label: 'Open the live JSON with only title and description',
      request: {
        url: 'https://github.com/microlinkhq',
        params: { meta: { title: true, description: true } }
      }
    }
  },
  how: {
    title: 'Include, exclude, then filter',
    intro: 'Two ways to scope detection, and one to scope the response.',
    steps: [
      {
        label: '1 · Include only what you render',
        sdk: "const { title, description } = await microlink.metadata('https://example.com', {\n  meta: { title: true, description: true }\n})",
        note: 'Only title and description are detected; image, logo and the rest are never processed.'
      },
      {
        label: '2 · Exclude the heavy fields',
        sdk: "const { title, author, date } = await microlink.metadata('https://example.com', {\n  meta: { image: false, logo: false }\n})",
        note: 'The default set minus media: text fields without any image fetching.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com',
          params: {
            meta: { title: true, description: true },
            filter: 'title,description'
          }
        },
        note: 'meta scopes detection; filter trims the JSON to the listed keys.'
      }
    ],
    params: [
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Object of field names set to true (include only) or false (exclude).'
      },
      {
        name: 'filter',
        href: '/docs/api/parameters/filter',
        note: 'Comma-separated dot-notation keys to keep in the JSON response.'
      },
      {
        name: 'ping',
        href: '/docs/api/parameters/ping',
        note: 'Disable per field when reachability checks are not worth the time.'
      },
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'false forces a plain fetch for pages you know are server-rendered.'
      }
    ],
    outro:
      'meta: false disables detection entirely, which is the right setting when the request only exists for a screenshot, a PDF or custom rules.'
  },
  why: {
    title: 'Why scoping detection pays',
    intro:
      'Every skipped field is work the browser does not do and bytes the network does not carry.',
    cards: [
      {
        kicker: 'Less work per request',
        title: 'Images and logos are the expensive fields.',
        body: 'Media detection fetches and measures candidate files. Excluding image and logo removes that step; including only title makes the request close to a plain fetch.',
        note: 'For [high-volume link previews](/use-cases/website-metadata/high-volume-link-previews) the saving multiplies across every uncached request.'
      },
      {
        kicker: 'Smaller payloads',
        title: 'filter returns only the keys you read.',
        body: 'A response with three fields is easier to log, cheaper to store and faster to parse than the full object with nested asset details.',
        note: 'filter works on nested keys too, such as image.url, when you want one property of a media field.'
      },
      {
        kicker: 'Same normalization',
        title: 'Scoped fields are still the normalized ones.',
        body: 'Including only title does not change how title is detected: it is still merged from Open Graph, Twitter Cards, JSON-LD and the HTML, in the same order of preference.',
        note: 'When not to: while exploring a new source, request the default set first to see what the page exposes; narrow the request once you know which fields are reliable.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I request only some metadata fields?',
      answer:
        'Pass meta as an object with the fields you want set to true, for example meta: { title: true, description: true }. Only those fields are detected.'
    },
    {
      question: 'How do I skip image and logo detection?',
      answer:
        'Set them to false in the meta object: meta: { image: false, logo: false }. The rest of the default set is still detected.'
    },
    {
      question: 'What is the difference between meta and filter?',
      answer:
        'meta controls which fields are detected, so it affects the work the request does. filter controls which keys appear in the JSON, so it only affects the response shape.'
    },
    {
      question: 'Does scoping fields change the cache entry?',
      answer:
        'The cache key is derived from the URL and the recognized parameters, so a request with a different meta object is a separate cache entry.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'lean metadata requests',
    body: 'Detect only what you render and return only what you read. Start on the free tier and trim your first request today.',
    href: '/metadata',
    label: 'Scope a metadata request'
  }
}
