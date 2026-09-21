export const CONTENT = {
  slug: 'website-metadata/only-the-fields-you-need',
  head: {
    title: 'Select only the metadata fields you need, per request',
    description:
      'Include or exclude normalized metadata fields with the meta object: skip images and logos for text-only jobs, fetch just the title, trim the JSON response.'
  },
  hero: {
    title: 'Fetch only the metadata fields you need',
    intro:
      'A metadata API should let you select fields, because the default payload detects every field, resolves every image and checks every URL. A search indexer that only needs the title, or a text pipeline that never shows a logo, waits for all of it. The meta object turns detection into a menu, and filter trims the JSON to the keys you read.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Full metadata detection is the expensive default',
    paragraphs: [
      'Detecting an image means finding candidates, fetching them, measuring them and verifying they load. Detecting a logo does the same for favicons and touch icons. When the consumer never renders either, that is wasted time on every uncached request.',
      'Dropping the fields client-side changes nothing: the work already happened and the bytes already crossed the network. Writing a separate lightweight scraper for the title-only jobs means a second codebase, one that loses the normalization across Open Graph, Twitter Cards, JSON-LD and the HTML.',
      'Pass [meta](/docs/api/parameters/meta) as an object. Fields set to true are the only ones detected; fields set to false are removed from the default set. Combine it with [filter](/docs/api/parameters/filter) for the response shape and each request carries exactly what the consumer reads. The [choosing fields guide](/docs/guides/metadata/choosing-fields) has the include versus exclude table.'
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
    title: 'How to select fields for fast metadata extraction',
    intro:
      'There are two ways to scope detection, include and exclude, and one way to scope the response. All three work on the free endpoint.',
    steps: [
      {
        label: '1 · Include only what you render',
        sdk: "const { title, description } = await microlink.metadata('https://example.com', {\n  meta: { title: true, description: true }\n})",
        note: 'Only title and description are detected. image, logo and the rest of the default set are never processed.'
      },
      {
        label: '2 · Exclude the heavy fields',
        sdk: "const { title, author, date } = await microlink.metadata('https://example.com', {\n  meta: { image: false, logo: false }\n})",
        note: 'The default set minus media: title, description, lang, author, publisher, date and url, without any image fetching.'
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
        note: 'meta scopes detection and filter trims the JSON to the listed keys. filter accepts dot notation, so image.url returns one property of a media field.'
      }
    ],
    params: [
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Object of field names set to true (include only) or false (exclude). Default true, which detects everything.'
      },
      {
        name: 'filter',
        href: '/docs/api/parameters/filter',
        note: 'Comma-separated list of keys to keep in the JSON response, with dot notation for nested fields.'
      },
      {
        name: 'ping',
        href: '/docs/api/parameters/ping',
        note: 'Default true. Pass false, or an object such as { audio: false }, to skip reachability checks.'
      },
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'false forces a plain HTTP GET for pages you know are server-rendered. Default auto.'
      },
      {
        name: 'javascript',
        href: '/docs/api/parameters/javascript',
        note: 'Default true. Set false when the page does not need JavaScript to expose its metadata.'
      }
    ],
    outro:
      'meta: false disables detection entirely, and the x-fetch-mode header reports skipped. That is the right setting when the request only exists for a screenshot, a PDF or custom rules. The [caching and performance guide](/docs/guides/metadata/caching-and-performance) ranks the other speedups.'
  },
  why: {
    title: 'Why scoping fields makes for a lightweight link preview API',
    intro:
      'Every skipped field is work the API does not do and bytes the network does not carry.',
    cards: [
      {
        kicker: 'Less work per request',
        title: 'Images and logos are the expensive fields.',
        body: 'Media detection fetches and measures candidate files. Excluding image and logo removes that step, and including only title brings the request close to a plain fetch.',
        note: 'For [link previews at scale](/use-cases/website-metadata/high-volume-link-previews) the saving multiplies across every uncached request.'
      },
      {
        kicker: 'Smaller payloads',
        title: 'filter returns only the keys you read.',
        body: 'A response with three fields is easier to log, cheaper to store and faster to parse than the full object with nested asset details.',
        note: 'The [delivery and response guide](/docs/guides/metadata/delivery-and-response) covers filter next to the other ways of shaping the output.'
      },
      {
        kicker: 'Same normalization',
        title: 'Scoped fields are still the normalized ones.',
        body: 'Including only title does not change how title is detected. It is still merged from Open Graph, Twitter Cards, JSON-LD and the HTML, exactly as in a full request.',
        note: 'When not to: while exploring a new source, request the default set first to see what the page exposes, and narrow the request once you know which fields are reliable. The same trim-the-work idea applies to [faster, smaller screenshots](/use-cases/website-screenshot/faster-smaller-screenshots).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I request only some metadata fields?',
      answer:
        'Pass meta as an object with the fields you want set to true, for example meta: { title: true, description: true }. Only those fields are detected, and everything else is skipped before any work happens.'
    },
    {
      question: 'How do I skip image and logo detection in a metadata request?',
      answer:
        'Set them to false in the meta object: meta: { image: false, logo: false }. The rest of the default set is still detected, so you keep title, description, author, publisher and date without fetching any media.'
    },
    {
      question: 'What is the difference between meta and filter in the metadata API?',
      answer:
        'meta controls which fields are detected, so it changes the work the request does. filter controls which keys appear in the JSON, so it only changes the response shape. Use both when you want a fast request and a small payload.'
    },
    {
      question: 'Does selecting metadata fields change the cache entry?',
      answer:
        'Yes. The cache key is derived from the URL and every recognized parameter, so a request with a different meta object is a separate cache entry. Keep the meta object identical across calls to share the entry, and remember that cache hits do not count against your quota.'
    },
    {
      question: 'Which metadata fields are returned by default?',
      answer:
        'title, description, lang, author, publisher, date, url, image and logo. Text fields are strings, and image and logo are asset objects with url, type, size, width and height. video and audio are opt-in, and a field the page does not expose comes back as null.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready for',
    headlineAccent: 'lean metadata requests',
    body: 'Detect only what you render and return only what you read. Start on the free tier and trim your first request today.',
    href: '/metadata',
    label: 'Scope a metadata request'
  },
  howTo: {
    name: 'How to fetch only the metadata fields you need',
    steps: [
      {
        title: 'Include only the fields you render',
        description:
          'Pass meta as an object with the wanted fields set to true, for example title and description. Nothing else is detected.'
      },
      {
        title: 'Or exclude the heavy fields',
        description:
          'Set image and logo to false in the meta object to keep the default text fields without fetching any media.'
      },
      {
        title: 'Trim the response',
        description:
          'Add filter with a comma-separated list of keys, using dot notation for nested ones, so the JSON carries only what you read.'
      }
    ]
  }
}
