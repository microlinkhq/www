export const CONTENT = {
  slug: 'website-metadata/custom-fields',
  head: {
    title: 'Extract custom fields with website metadata in one call',
    description:
      'Add prices, ratings, stock status or any CSS selector to a metadata request. The rules are typed and come back next to title, description and image.'
  },
  hero: {
    title: 'Extract custom fields alongside the normalized metadata',
    intro:
      'Extract custom fields from the same metadata API request that returns the title, description and image. Open Graph tags cover the basics, but the value your product needs, a price, a rating, a stock status or a list of headings, usually lives somewhere else on the page. Declare it as a rule and it comes back typed, next to the [normalized fields](/metadata).',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Open Graph metadata gets you close, not all the way',
    paragraphs: [
      'A link preview needs title, description and image, and the Metadata API normalizes those from Open Graph, Twitter Cards, JSON-LD and the HTML itself. A product card, a job listing, a recipe or a directory entry needs one or two more values that no standard tag carries.',
      'The common workaround is a second scraper: fetch the page again, parse it with your own selectors, and keep two caches and two failure modes in sync. If you want to scrape a price with the Open Graph data of the same product, you end up loading the page twice.',
      'The [data](/docs/api/parameters/data) parameter takes extraction rules: a CSS selector, the attribute to read and the type to validate as. Passed with a metadata request, the rules ride along and the response carries both the normalized fields and yours. The [defining rules guide](/docs/guides/data-extraction/defining-rules) covers the full grammar.'
    ],
    live: {
      label: 'Open the live JSON with a custom headings field',
      request: {
        url: 'https://microlink.io/docs/api/getting-started/overview',
        params: {
          data: { headings: { selectorAll: 'main h2', attr: 'text' } }
        }
      }
    }
  },
  how: {
    title: 'How to add a CSS selector field to a metadata API request',
    intro:
      'A rule answers three questions: which element, what to read from it, and how to validate it. Add as many rules as you need to one request; each becomes a key in the response.',
    steps: [
      {
        label: '1 · Metadata plus a price',
        sdk: "const { title, image, price } = await microlink.metadata(\n  'https://example.com/product',\n  {\n    data: {\n      price: { selector: '.price', attr: 'text', type: 'number' }\n    }\n  }\n)",
        note: 'The normalized fields come back as usual. price is read from the first element matching .price and parsed as a number.'
      },
      {
        label: '2 · Several fields, including a list',
        sdk: "const { title, rating, headings } = await microlink.metadata(\n  'https://example.com/product',\n  {\n    data: {\n      rating: { selector: '[itemprop=ratingValue]', attr: 'content', type: 'number' },\n      headings: { selectorAll: 'h2', attr: 'text' }\n    }\n  }\n)",
        note: 'selectorAll returns every match as an array. Each rule validates independently, so a missing rating does not affect the headings.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/product',
          params: {
            data: { price: { selector: '.price', attr: 'text', type: 'number' } }
          }
        },
        note: 'Rules flatten to data.price.selector, data.price.attr and data.price.type query parameters, so the request works from any language or from [the CLI](/docs/sdk/getting-started/cli).'
      }
    ],
    params: [
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'Object of custom extraction rules, evaluated next to the normalized metadata.'
      },
      {
        name: 'selector',
        href: '/docs/sdk/methods/extract/selector',
        note: 'Which element: the first match of a CSS selector.'
      },
      {
        name: 'selectorAll',
        href: '/docs/sdk/methods/extract/selectorAll',
        note: 'Every match of a CSS selector, returned as an array.'
      },
      {
        name: 'attr',
        href: '/docs/sdk/methods/extract/attr',
        note: 'What to read: any HTML attribute, or text, html, outerHTML, markdown, json or val. Default html.'
      },
      {
        name: 'type',
        href: '/docs/sdk/methods/extract/type',
        note: 'How to validate: number, url, date, image, email, boolean and more. Default auto.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Pick which normalized fields to keep alongside your rules.'
      }
    ],
    outro:
      'A rule that matches nothing, or whose value fails its type, resolves to null, so destructuring is always safe. When you want only your fields and none of the normalized ones, call [extract](/docs/sdk/methods/extract) instead.'
  },
  why: {
    title: 'Why extracting custom fields with rules beats a second scraper',
    intro:
      'The normalized fields and your fields come from the same fetch, the same cache entry and the same request.',
    cards: [
      {
        kicker: 'One request',
        title: 'Standard and custom fields from a single fetch.',
        body: 'There is no second HTTP call, no second parse and no second cache to keep consistent. The page is fetched once and every rule reads from that document.',
        note: 'The same rules can [override a normalized field](/use-cases/website-metadata/missing-or-wrong-metadata) when a page ships a wrong title or no og:image.'
      },
      {
        kicker: 'Typed output',
        title: 'Values are validated before they reach you.',
        body: 'A number rule returns a number, a url rule an absolute URL, an image rule an asset object with url, type, width, height and size. Values that fail their type become null instead of surprising strings.',
        note: 'An array of rules is a [fallback chain](/docs/sdk/methods/extract#fallback-rules): the first rule that yields a valid value wins, so a layout change degrades gracefully.'
      },
      {
        kicker: 'Same options',
        title: 'Rules run after waits, clicks and the proxy.',
        body: 'Client-rendered prices need prerender and waitForSelector. Blocked sites need the proxy. Every shared option applies before the rules evaluate, so a rule reads the page a visitor would see.',
        note: 'When not to: if the page already exposes the value in JSON-LD or Open Graph, the normalized metadata probably has it, so check the default response before adding a rule. When you need the whole article rather than one field, use [Markdown with metadata frontmatter](/use-cases/website-to-markdown/with-metadata).'
      }
    ]
  },
  faq: [
    {
      question: 'Can I get metadata and custom fields in one request?',
      answer:
        'Yes. Pass the rules as the data option of a metadata request and the response contains the normalized fields plus one key per rule. It is a single request and a single cache entry.'
    },
    {
      question: 'What types can a custom metadata field have?',
      answer:
        'string, number, boolean, date, url, email, ip, lang and regexp, among others, plus the media types image, video, audio and logo. Media types resolve to asset objects with url, type, width, height, size and size_pretty. A value that fails its type becomes null.'
    },
    {
      question: 'How do I extract a list of values next to the metadata?',
      answer:
        'Use selectorAll instead of selector. The rule returns an array with one value per matching element, validated by the same type. Put an object of rules under attr to turn each match into a structured item.'
    },
    {
      question:
        'How do I scrape a price with the Open Graph metadata of a product page?',
      answer:
        'Add a data rule such as price, with selector .price, attr text and type number, to the metadata request. The response carries title, description and image from the page’s tags and price from your selector. For client-rendered stores, add prerender: true and waitForSelector for the price element.'
    },
    {
      question:
        'Can a custom metadata rule read content that only appears after JavaScript runs?',
      answer:
        'Yes. Add prerender: true and waitForSelector for the element, and the rules evaluate against the rendered DOM. See [metadata from single-page apps](/use-cases/website-metadata/javascript-rendered-pages) for the wait options.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to extract',
    headlineAccent: 'the fields you need',
    body: 'Normalized metadata plus your own rules in one call. Start on the free tier and add your first custom field today.',
    href: '/metadata',
    label: 'Add a custom field'
  },
  howTo: {
    name: 'How to extract custom fields alongside website metadata',
    steps: [
      {
        title: 'Declare a rule for the field',
        description:
          'Give the field a name and a rule: the CSS selector of the element, the attribute to read and the type to validate the value as.'
      },
      {
        title: 'Pass the rules with the metadata request',
        description:
          'Send the rules as the data option of a metadata request. The response contains the normalized fields plus one key per rule.'
      },
      {
        title: 'Use selectorAll for lists',
        description:
          'Switch selector for selectorAll to get every match as an array, validated by the same type.'
      },
      {
        title: 'Handle null values',
        description:
          'A rule that matches nothing or fails its type resolves to null, so check for null before rendering the field.'
      }
    ]
  }
}
