export const CONTENT = {
  slug: 'website-metadata/custom-fields',
  head: {
    title: 'Extract custom fields alongside website metadata',
    description:
      'Get title, description and image normalized from any URL and add your own fields in the same request: prices, ratings, headings or any selector, typed.'
  },
  hero: {
    title: 'Extract custom fields alongside the normalized metadata',
    intro:
      'Open Graph tags cover the basics. The field your product needs, a price, a rating, a stock status, a list of headings, is usually somewhere else on the page. The Metadata API lets you declare it as a rule and returns it next to the normalized fields.',
    cta: { label: 'Start with the Metadata API', href: '/metadata' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Normalized metadata gets you close, not all the way',
    paragraphs: [
      'A link preview needs title, description and image, and the Metadata API normalizes those from Open Graph, Twitter Cards, JSON-LD and the HTML itself. A product card, a job listing or a directory entry needs one or two more values that no standard tag carries.',
      'The data parameter takes extraction rules: a CSS selector, the attribute to read and the type to validate as. Passed with a metadata request, the rules ride along and the response carries both the normalized fields and yours.'
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
    title: 'Declare the field, get it typed',
    intro:
      'A rule answers three questions: which element, what to read from it, and how to validate it. Add as many rules as you need to one request.',
    steps: [
      {
        label: '1 · Metadata plus a price',
        sdk: "const { title, image, price } = await microlink.metadata(\n  'https://example.com/product',\n  {\n    data: {\n      price: { selector: '.price', attr: 'text', type: 'number' }\n    }\n  }\n)",
        note: 'The normalized fields come back as usual; price is parsed as a number from the matching element.'
      },
      {
        label: '2 · Several fields, including a list',
        sdk: "const { title, rating, headings } = await microlink.metadata(\n  'https://example.com/product',\n  {\n    data: {\n      rating: { selector: '[itemprop=ratingValue]', attr: 'content', type: 'number' },\n      headings: { selectorAll: 'h2', attr: 'text' }\n    }\n  }\n)",
        note: 'selectorAll returns every match as an array; each rule validates independently.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://example.com/product',
          params: {
            data: { price: { selector: '.price', attr: 'text', type: 'number' } }
          }
        },
        note: 'Rules flatten to data.price.selector, data.price.attr and data.price.type query parameters.'
      }
    ],
    params: [
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'Custom extraction rules evaluated next to the normalized metadata.'
      },
      {
        name: 'selector',
        href: '/docs/sdk/methods/extract/selector',
        note: 'Which element: the first match of a CSS selector.'
      },
      {
        name: 'selectorAll',
        href: '/docs/sdk/methods/extract/selectorAll',
        note: 'Every match, returned as a collection.'
      },
      {
        name: 'attr',
        href: '/docs/sdk/methods/extract/attr',
        note: 'What to read: an HTML attribute, or text, html, markdown or json.'
      },
      {
        name: 'type',
        href: '/docs/sdk/methods/extract/type',
        note: 'How to validate: number, url, date, image, email, boolean and more.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Pick which normalized fields to keep alongside your rules.'
      }
    ],
    outro:
      'A rule that matches nothing, or whose value fails its type, resolves to null, so destructuring is always safe.'
  },
  why: {
    title: 'Why rules beat a second scraper',
    intro:
      'The normalized fields and your fields come from the same render, the same cache entry and the same request.',
    cards: [
      {
        kicker: 'One request',
        title: 'Standard and custom fields from a single fetch.',
        body: 'There is no second HTTP call, no second parse and no second cache to keep consistent. The page is rendered once and every rule reads from that DOM.',
        note: 'Use [extract](/docs/sdk/methods/extract) when you want only your fields and none of the normalized ones.'
      },
      {
        kicker: 'Typed output',
        title: 'Values are validated before they reach you.',
        body: 'A number rule returns a number, a url rule an absolute URL, an image rule an asset object with dimensions. Bad values become null instead of surprising strings.',
        note: 'Fallback arrays let a field try several selectors in order, so a layout change degrades gracefully.'
      },
      {
        kicker: 'Same options',
        title: 'Rules run after waits, clicks and the proxy.',
        body: 'Client-rendered prices need prerender and waitForSelector; blocked sites need proxy. Every shared option applies before the rules evaluate.',
        note: 'When not to: if the page already exposes the value in JSON-LD or Open Graph, the normalized metadata probably has it; check the response before adding a rule.'
      }
    ]
  },
  faq: [
    {
      question: 'Can I get metadata and custom fields in one request?',
      answer:
        'Yes. Pass the rules as the data option of a metadata request and the response contains the normalized fields plus one key per rule.'
    },
    {
      question: 'What types can a custom field have?',
      answer:
        'string, number, boolean, date, url, email, image, video, audio, logo and more. Media types resolve to asset objects with url, width, height and size. Unknown or failing values become null.'
    },
    {
      question: 'How do I extract a list of values?',
      answer:
        'Use selectorAll instead of selector. The rule returns an array with one value per matching element, validated by the same type.'
    },
    {
      question: 'Can a rule read text that only appears after JavaScript runs?',
      answer:
        'Yes. Add prerender: true and waitForSelector for the element; the rules evaluate against the rendered DOM.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to extract',
    headlineAccent: 'the fields you need',
    body: 'Normalized metadata plus your own rules in one call. Start on the free tier and add your first custom field today.',
    href: '/metadata',
    label: 'Add a custom field'
  }
}
