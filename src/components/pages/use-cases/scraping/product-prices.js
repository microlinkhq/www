export const CONTENT = {
  slug: 'scraping/product-prices',
  head: {
    title: 'Scrape product prices and stock from any store',
    description:
      'Extract a product price as a number and the stock status from any product URL, with fallback rules for stores whose markup differs.'
  },
  hero: {
    title: 'Scrape product prices and stock status as typed JSON',
    intro:
      'A scrape product prices API has one job: give you a number you can compare, not a string with a currency symbol glued to it. Price monitoring, competitor tracking, marketplace feeds and affiliate catalogs all need the current price and whether the item is in stock, from stores that never agreed on a markup. The [Scraping API](/features/scraping) reads both with a few typed rules per store.',
    cta: { label: 'Start with the Scraping API', href: '/features/scraping' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Every store formats the same price differently',
    paragraphs: [
      'One shop prints £51.77, another 51,77 € with a strikethrough list price next to it, a third renders the price after the page loads. The value you want is in there, but it arrives as text in a different element on every domain, and the stock status is a sentence rather than a flag.',
      'A regular expression per store works until the template changes, and parseFloat on the wrong element silently records the old price or the shipping fee. Stores that render prices in the browser return nothing to a plain HTTP fetch, and larger retailers put antibot protection in front of the product pages you care about most.',
      'Extraction rules make the price a typed field. type: \'number\' returns a number, an array of rules tries structured markup first and the visible label second, and waitForSelector holds the extraction until a client-rendered price exists. The [type reference](/docs/sdk/methods/extract/type) lists every validator.'
    ],
    live: {
      label: 'Open the live price and stock JSON',
      request: {
        url: 'https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html',
        params: {
          data: {
            price: {
              selector: '.product_main .price_color',
              attr: 'text',
              type: 'number'
            },
            stock: { selector: '.product_main .availability', attr: 'text' }
          },
          meta: false
        }
      }
    }
  },
  how: {
    title: 'How to extract a price from a product URL',
    intro:
      'Start with the visible price, then harden the rule with fallbacks. Each store gets its own small rule set, and the result has the same shape for all of them.',
    steps: [
      {
        label: '1 · Price as a number, stock as text',
        sdk: "const { price, stock } = await microlink.extract(\n  'https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html',\n  {\n    price: { selector: '.product_main .price_color', attr: 'text', type: 'number' },\n    stock: { selector: '.product_main .availability', attr: 'text' }\n  }\n)",
        note: 'On this demo store price comes back as 51.77 and stock as the label In stock (22 available). Turning that label into a boolean is one comparison on your side.'
      },
      {
        label: '2 · Fallbacks across templates',
        sdk: "const rules = {\n  price: [\n    { selector: '[itemprop=price]', attr: 'content', type: 'number' },\n    { selector: '.price-now', attr: 'text', type: 'number' },\n    { selector: '.price', attr: 'text', type: 'number' }\n  ],\n  currency: { selector: '[itemprop=priceCurrency]', attr: 'content' }\n}\n\nconst { price, currency } = await microlink.extract(url, rules)",
        note: 'The rules run in order and the first one that yields a valid number wins, so structured microdata is preferred and the visible label is the safety net. The currency travels as its own field.'
      },
      {
        label: '3 · Client-rendered stores',
        sdk: "const { price } = await microlink.extract(\n  url,\n  { price: { selector: '.price', attr: 'text', type: 'number' } },\n  { prerender: true, waitForSelector: '.price', ttl: '1h' }\n)",
        note: 'prerender forces a browser, [waitForSelector](/docs/api/parameters/waitForSelector) waits for the price element, and ttl keeps the result cached for an hour so repeated checks within that window are served from cache.'
      }
    ],
    params: [
      {
        name: 'type',
        href: '/docs/sdk/methods/extract/type',
        note: 'number returns a numeric price. A value that is not a valid number becomes null.'
      },
      {
        name: 'selector',
        href: '/docs/sdk/methods/extract/selector',
        note: 'The first element matching the price selector. Scope it to the main product block.'
      },
      {
        name: 'waitForSelector',
        href: '/docs/api/parameters/waitForSelector',
        note: 'Waits for the price element on stores that render it in the browser.'
      },
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'auto by default. Set true when the price is missing from the initial HTML.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'How long a price stays cached, from 1 minute to 31 days. Pro plans.'
      },
      {
        name: 'proxy.location',
        href: '/docs/api/parameters/proxy/location',
        note: 'Two-letter country code for stores that show a different price per country. Pro plans.'
      }
    ],
    outro:
      'There is no scheduler on the Microlink side: run the calls from your own job at the interval you need and compare the numbers there. When the price already sits in Open Graph product tags and you also want the title and image, [extract custom fields alongside metadata](/use-cases/website-metadata/custom-fields) returns everything in one response.'
  },
  why: {
    title: 'Why typed rules make a sturdier ecommerce price scraper',
    intro:
      'A price monitor fails quietly: the job keeps running and stores the wrong value. Types and fallbacks turn those quiet failures into nulls you can see.',
    cards: [
      {
        kicker: 'Comparable values',
        title: 'The price arrives as a number.',
        body: 'No currency symbols, no thousands separators to strip, no string comparison. Store the number, keep the currency as a separate field, and every store in your list produces the same shape.',
        note: 'Lists of products use the same rules nested under selectorAll, see [scrape tables and repeated lists](/use-cases/scraping/tables-and-lists) for category pages.'
      },
      {
        kicker: 'Resilient',
        title: 'Fallback chains survive redesigns.',
        body: 'When a store renames its price class, the next rule in the array takes over. When every rule fails, the field is null rather than a stale or wrong number, which is the signal to update the selectors.',
        note: 'The [data extraction troubleshooting guide](/docs/guides/data-extraction/troubleshooting) covers null fields, wrong selectors and pages that were not ready yet.'
      },
      {
        kicker: 'Reachable',
        title: 'Protected stores go through the proxy automatically.',
        body: 'On Pro plans, when a store answers with an antibot wall, the request escalates through proxy tiers up to residential and remembers what worked for that domain. On the free tier the same wall returns EPROXYNEEDED.',
        note: 'When not to: if the price only appears after choosing a size or color, a single rule reads the default variant. Click the option inside a [remote Puppeteer function](/use-cases/scraping/run-puppeteer-without-chrome) and read the price there.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I scrape a product price as a number?',
      answer:
        'Write a rule with the price element as selector, attr text and type number. The value comes back as a number, or null when the element is missing or its text is not a valid price.'
    },
    {
      question: 'Can an ecommerce price scraper keep the currency?',
      answer:
        'Yes, as a separate field. Stores that use schema.org microdata expose it in an element with itemprop priceCurrency, so a second rule reading its content attribute gives you the ISO code next to the numeric price.'
    },
    {
      question: 'How do I scrape prices from stores that render with JavaScript?',
      answer:
        'Add prerender: true and waitForSelector with the price selector. The page renders in a real browser and the rules run once the price element exists. [Scraping JavaScript-rendered pages](/use-cases/scraping/javascript-rendered-pages) covers the wait options in depth.'
    },
    {
      question: 'How often can I re-check a scraped product price?',
      answer:
        'As often as your job calls the API. Responses are cached for 24 hours by default, so on a Pro plan set ttl to your check interval, as low as one minute, or pass force: true to skip the cache. Cache hits never count against your quota.'
    },
    {
      question: 'What happens when a store blocks my price scraper?',
      answer:
        'On the free tier the API returns EPROXYNEEDED, which means the store uses antibot protection and needs a Pro plan. On Pro the proxy is on by default and resolves automatically, and proxy.location pins the country when prices vary by region. See the [proxy reference](/docs/api/parameters/proxy).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to track',
    headlineAccent: 'prices as numbers',
    body: 'Typed prices and stock from any product URL. Start on the free tier and write the rules for your first store today.',
    href: '/features/scraping',
    label: 'Scrape a product price'
  },
  howTo: {
    name: 'How to scrape a product price and stock status from a URL',
    steps: [
      {
        title: 'Read the price as a number',
        description:
          'Write a rule with the price element as selector, attr text and type number, plus a text rule for the stock label.'
      },
      {
        title: 'Add fallback rules',
        description:
          'Turn the price rule into an array that tries microdata first and visible labels after, and read the currency as its own field.'
      },
      {
        title: 'Handle client-rendered stores',
        description:
          'Add prerender true and waitForSelector for the price element, and set ttl to the interval at which you re-check prices.'
      }
    ]
  }
}
