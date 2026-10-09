export const CONTENT = {
  slug: 'scraping/website-to-json',
  head: {
    title: 'Scrape any website to JSON with CSS selectors',
    description:
      'Turn any web page into typed JSON: declare each field as a CSS selector rule and get one key per rule back, with null when the page lacks it.'
  },
  hero: {
    title: 'Turn any website into JSON with CSS selector rules',
    intro:
      'A website to JSON API should return the fields you asked for, typed, and nothing else. Catalog imports, lead lists, content migrations and internal dashboards all start with the same job: read a few values off a page and store them as data. With the [Scraping API](/features/scraping) you describe each field as a rule and the response is the JSON object you described.',
    cta: { label: 'Start with the Scraping API', href: '/features/scraping' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'HTML is a document, not the JSON your code expects',
    paragraphs: [
      'Every page mixes the three values you need with navigation, scripts, ads and markup. Getting from that to a clean object means fetching the page, parsing it, walking the tree, trimming whitespace and converting strings into numbers, URLs and dates, once per site.',
      'The usual stack is an HTTP client plus an HTML parser, and it quietly fails on pages that build their content in the browser, where the fetched HTML is an empty shell. Adding a headless browser fixes that and hands you a fleet to run. Either way the output is loose strings, so a missing element surfaces later as undefined deep inside your code.',
      'The [data](/docs/api/parameters/data) parameter turns that into a schema. Each key is a rule: a CSS selector for the element, an attr for what to read and a type to validate it. Microlink fetches the page, renders it in a browser only when it needs to, applies the rules and returns one key per rule. The [extract method](/docs/sdk/methods/extract) is the same grammar from the SDK.'
    ],
    live: {
      label: 'Open the live JSON for the Hacker News front page',
      request: {
        url: 'https://news.ycombinator.com',
        params: {
          data: {
            stories: {
              selectorAll: '.athing',
              attr: {
                title: { selector: '.titleline > a', attr: 'text' },
                url: { selector: '.titleline > a', attr: 'href', type: 'url' }
              }
            }
          },
          meta: false
        }
      }
    }
  },
  how: {
    title: 'How to convert a website to JSON with CSS selector rules',
    intro:
      'Start with one field, check it, then add the rest. The [defining rules guide](/docs/guides/data-extraction/defining-rules) walks through single values, collections, nested objects and fallbacks in that order.',
    steps: [
      {
        label: '1 · Declare the fields',
        sdk: "const { title, author, published } = await microlink.extract(\n  'https://example.com/blog/post',\n  {\n    title: { selector: 'h1', attr: 'text' },\n    author: { selector: '[rel=author]', attr: 'text', type: 'author' },\n    published: { selector: 'time', attr: 'datetime', type: 'date' }\n  }\n)",
        note: 'extract resolves to an object with exactly one key per rule and none of the normalized metadata. A rule that matches nothing, or whose value fails its type, comes back as null.'
      },
      {
        label: '2 · Build nested objects',
        sdk: "const { stories } = await microlink.extract('https://news.ycombinator.com', {\n  stories: {\n    selectorAll: '.athing',\n    attr: {\n      title: { selector: '.titleline > a', attr: 'text' },\n      url: { selector: '.titleline > a', attr: 'href', type: 'url' }\n    }\n  }\n})",
        note: 'An object under attr is evaluated relative to each element matched by selectorAll, so the result is an array of objects. Nested rules can nest again to describe a whole section of the page.'
      },
      {
        label: '3 · The same schema as a URL',
        request: {
          url: 'https://example.com',
          params: {
            data: { title: { selector: 'h1', attr: 'text' } },
            meta: false
          }
        },
        note: 'Rules flatten to data.title.selector and data.title.attr query parameters, so any HTTP client can call it. meta: false skips the metadata pass, usually the biggest speedup for data-only requests.'
      }
    ],
    params: [
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'The output schema: one key per field, one rule per key.'
      },
      {
        name: 'selector',
        href: '/docs/sdk/methods/extract/selector',
        note: 'The first element matching a CSS selector. An array of selectors acts as a fallback list.'
      },
      {
        name: 'attr',
        href: '/docs/sdk/methods/extract/attr',
        note: 'Any HTML attribute, or text, html, outerHTML, markdown, json or val. Default html.'
      },
      {
        name: 'type',
        href: '/docs/sdk/methods/extract/type',
        note: 'Validates and normalizes the value: number, url, date, email, image and more. Default auto.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Set to false to return only your fields and skip the normalized metadata.'
      },
      {
        name: 'filter',
        href: '/docs/api/parameters/filter',
        note: 'Keeps only the listed fields in the payload, with dot notation for nested ones.'
      }
    ],
    outro:
      'Rules run on the rendered page when one is needed: prerender defaults to auto, so client-rendered pages get a browser and static ones do not. For apps that need a wait before the data exists, see [scraping JavaScript-rendered pages](/use-cases/scraping/javascript-rendered-pages).'
  },
  why: {
    title: 'Why a declarative JSON schema beats a hand-written parser',
    intro:
      'The rule set is the scraper. It lives in one object you can version, review and reuse across pages that share a template.',
    cards: [
      {
        kicker: 'Typed output',
        title: 'Numbers are numbers, URLs are absolute.',
        body: 'type validates each value before it reaches you. A url rule resolves relative hrefs to absolute ones, a number rule returns a number, and an image rule expands into an object with url, width, height and size.',
        note: 'A value that fails its type becomes null, which is what lets [fallback rules](/docs/sdk/methods/extract#fallback-rules) move on to the next candidate.'
      },
      {
        kicker: 'Predictable shape',
        title: 'Every key is always present.',
        body: 'Missing elements come back as null instead of throwing or disappearing, so destructuring is always safe and a schema change on the target site shows up as a null you can alert on.',
        note: 'Lists and rows use the same grammar: [scrape tables and repeated lists](/use-cases/scraping/tables-and-lists) shows nested rules turning each row into an object.'
      },
      {
        kicker: 'One endpoint',
        title: 'Fetch, render and extract in one call.',
        body: 'There is no parser to install and no browser to host. The same request decides whether the page needs rendering, applies adblock by default and returns the JSON.',
        note: 'When not to: if you want the whole article as text for a model or a search index, a schema is overkill. Convert the page to [clean Markdown](/use-cases/website-to-markdown/clean-content) instead.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I convert a website to JSON with an API?',
      answer:
        'Send the URL with a data object where each key is a field and each value is a rule with a CSS selector, the attr to read and an optional type. The response contains one key per rule. From JavaScript, microlink.extract(url, rules) does the same and returns only your fields.'
    },
    {
      question: 'What happens when a CSS selector rule matches nothing?',
      answer:
        'The field resolves to null, and so does a value that fails its type. The request still succeeds and every other field is returned, so one broken selector never takes down the whole object.'
    },
    {
      question: 'Can I use the HTML to JSON API without the JavaScript SDK?',
      answer:
        'Yes. The rules flatten into query parameters such as data.title.selector=h1 and data.title.attr=text, so any language or HTTP client can call the API. The [data extraction guide](/docs/guides/data-extraction) shows the raw URL form next to every example.'
    },
    {
      question: 'How do I get only my own fields in the JSON response?',
      answer:
        'Pass meta: false. Without it the API also returns normalized metadata such as title, description and image next to your fields. The SDK extract method skips it for you, while metadata() keeps both in one response.'
    },
    {
      question: 'Does scraping a website to JSON work on the free tier?',
      answer:
        'Yes. The API works without a key for 25 requests per day, enough to build and test a schema. A Pro plan adds configurable cache TTL, custom headers and automatic proxy resolution for sites that block automated traffic, see [pricing](/pricing).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to turn',
    headlineAccent: 'any page into JSON',
    body: 'Declare the fields, get typed JSON back. Start on the free tier and write your first rule in a minute.',
    href: '/features/scraping',
    label: 'Scrape your first page'
  },
  howTo: {
    name: 'How to convert a website to JSON with CSS selector rules',
    steps: [
      {
        title: 'Declare the fields',
        description:
          'Call extract with the URL and one rule per field: the CSS selector of the element, the attribute to read and the type to validate it as.'
      },
      {
        title: 'Build nested objects for repeated items',
        description:
          'Use selectorAll with an object of rules under attr, so each matched element becomes an object in an array.'
      },
      {
        title: 'Call the API directly from any language',
        description:
          'Flatten the rules into data query parameters and add meta=false to return only your fields.'
      }
    ]
  }
}
