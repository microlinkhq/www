export const CONTENT = {
  slug: 'scraping/tables-and-lists',
  head: {
    title: 'Scrape tables and repeated lists into JSON arrays',
    description:
      'Scrape an HTML table to JSON with one object per row, or turn product grids and result lists into arrays, using nested CSS selector rules.'
  },
  hero: {
    title: 'Scrape an HTML table to JSON, one object per row',
    intro:
      'To scrape an HTML table to JSON you want rows as objects and columns as named keys, not a flat list of cell strings. Rankings, pricing tables, sports results, directories and search result pages all repeat the same block over and over. With the [Scraping API](/features/scraping) you describe one row once and get the whole table back as an array.',
    cta: { label: 'Start with the Scraping API', href: '/features/scraping' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Table cells come out flat and lose which row they belong to',
    paragraphs: [
      'Querying every td on a page gives you one long list of strings. Which cell was the company and which the country depends on counting positions, and one empty cell or a colspan shifts every value after it into the wrong column.',
      'Hand-written loops over rows fix the pairing but live in your code, one per site, and still return strings you convert yourself. Lists that are not tables, like product cards or search results, need yet another loop, and the whole thing fails on pages whose rows are rendered in the browser.',
      'Nested rules keep each row together. [selectorAll](/docs/sdk/methods/extract/selectorAll) matches every row, an object under attr describes the columns, and each column rule runs relative to its own row. The result is an array of objects with the keys you chose, typed per column. The [nested rules reference](/docs/sdk/methods/extract/attr#nested-rules) covers deeper structures.'
    ],
    live: {
      label: 'Open the live JSON for a sample HTML table',
      request: {
        url: 'https://www.w3schools.com/html/html_tables.asp',
        params: {
          data: {
            rows: {
              selectorAll: '#customers tr:not(:first-child)',
              attr: {
                company: { selector: 'td:nth-child(1)', attr: 'text' },
                contact: { selector: 'td:nth-child(2)', attr: 'text' },
                country: { selector: 'td:nth-child(3)', attr: 'text' }
              }
            }
          },
          meta: false
        }
      }
    }
  },
  how: {
    title: 'How to extract table data and lists with nested rules',
    intro:
      'One parent rule selects the repeated element, the children describe a single item. The same pattern covers tables, cards and search results.',
    steps: [
      {
        label: '1 · A table, one object per row',
        sdk: "const { rows } = await microlink.extract(\n  'https://www.w3schools.com/html/html_tables.asp',\n  {\n    rows: {\n      selectorAll: '#customers tr:not(:first-child)',\n      attr: {\n        company: { selector: 'td:nth-child(1)', attr: 'text' },\n        contact: { selector: 'td:nth-child(2)', attr: 'text' },\n        country: { selector: 'td:nth-child(3)', attr: 'text' }\n      }\n    }\n  }\n)",
        note: 'The :not(:first-child) selector skips the header row. rows resolves to an array such as { company: \'Alfreds Futterkiste\', contact: \'Maria Anders\', country: \'Germany\' } for each data row.'
      },
      {
        label: '2 · A product grid with typed fields',
        sdk: "const { products } = await microlink.extract('https://books.toscrape.com', {\n  products: {\n    selectorAll: 'article.product_pod',\n    attr: {\n      title: { selector: 'h3 a', attr: 'title' },\n      price: { selector: '.price_color', attr: 'text', type: 'number' },\n      url: { selector: 'h3 a', attr: 'href', type: 'url' }\n    }\n  }\n})",
        note: 'Each card becomes an object. The price column is validated as a number and the relative href resolves to an absolute URL, so the array is ready to store.'
      },
      {
        label: '3 · A plain list of values',
        request: {
          url: 'https://news.ycombinator.com',
          params: {
            data: { titles: { selectorAll: '.titleline > a', attr: 'text' } },
            meta: false
          }
        },
        note: 'Without a nested attr, each match contributes one plain value, so titles is an array of strings. Use it for headlines, tags or any single-column list.'
      }
    ],
    params: [
      {
        name: 'selectorAll',
        href: '/docs/sdk/methods/extract/selectorAll',
        note: 'Matches every row, card or list item and returns an array.'
      },
      {
        name: 'attr',
        href: '/docs/sdk/methods/extract/attr',
        note: 'An object of rules here describes the columns of one item.'
      },
      {
        name: 'type',
        href: '/docs/sdk/methods/extract/type',
        note: 'Validates each column on its own: number, url, date, image and more.'
      },
      {
        name: 'data',
        href: '/docs/api/parameters/data',
        note: 'The same rules as query parameters when calling the API directly.'
      },
      {
        name: 'filter',
        href: '/docs/api/parameters/filter',
        note: 'Returns only the named fields when a request extracts several lists.'
      }
    ],
    outro:
      'Build the smallest piece first: get one column right on its own, then wrap it in the row rule. The [defining rules guide](/docs/guides/data-extraction/defining-rules) follows the same order, and when rows span several pages, [scrape paginated lists](/use-cases/scraping/load-more-and-pagination) shows how to cover them all.'
  },
  why: {
    title: 'Why nested rules beat looping over cells yourself',
    intro:
      'The row is the unit you care about, so the rule set is shaped like a row. Pairing, typing and absolute URLs happen before the data leaves the API.',
    cards: [
      {
        kicker: 'Row integrity',
        title: 'Cells stay with the row they came from.',
        body: 'Each column rule runs relative to its own row element, so an empty cell becomes null in that row only. Nothing shifts, and the array length equals the number of matched rows.',
        note: 'A column rule can be a [fallback array](/docs/sdk/methods/extract#fallback-rules) when some rows use a different markup for the same value.'
      },
      {
        kicker: 'Typed columns',
        title: 'Each column has its own type.',
        body: 'Prices as numbers, links as absolute URLs, dates as dates. The table arrives the way your database wants it, not as strings to clean up in a second pass.',
        note: 'Product grids are just tables with more layout. For a single product page, [scrape product prices and stock](/use-cases/scraping/product-prices) adds fallbacks and client-rendered stores.'
      },
      {
        kicker: 'Any repeated block',
        title: 'Tables, cards and results share one grammar.',
        body: 'A tr, an article card and a search result item are all a repeated element with children. Change the parent selector and the child rules, and the same code handles all three.',
        note: 'When not to: if a model or a report only needs to read the table, attr: \'markdown\' on the table element converts it into a Markdown table in one rule, or convert the whole page with the [URL to Markdown tool](/tools/url-to-markdown).'
      }
    ]
  },
  faq: [
    {
      question: 'How do I scrape an HTML table to JSON?',
      answer:
        'Use a rule with selectorAll on the table rows and an object under attr with one rule per column, each using a cell selector such as td:nth-child(2). The response is an array with one object per row.'
    },
    {
      question: 'How do I skip the header row when extracting table data?',
      answer:
        'Target only the data rows: tbody tr when the table has a tbody, or tr:not(:first-child) when the header is the first row. Header cells are usually th, so a td column rule would return null for that row anyway.'
    },
    {
      question: 'Can I scrape a list from a website when items have different fields?',
      answer:
        'Yes. Every column rule is evaluated per item, and an item without that element gets null for that key only. Add fallback arrays for fields that appear in more than one markup variant.'
    },
    {
      question: 'Why does my table scrape return only the first row?',
      answer:
        'The parent rule uses selector instead of selectorAll. selector returns the first match, selectorAll every match. The [data extraction troubleshooting guide](/docs/guides/data-extraction/troubleshooting) lists this as the most common rule-shape mistake.'
    },
    {
      question: 'Can I scrape a table that loads with JavaScript?',
      answer:
        'Yes. Add prerender: true and waitForSelector with the row selector, so the rules run once the rows exist in the rendered DOM. See [scraping JavaScript-rendered pages](/use-cases/scraping/javascript-rendered-pages).'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to turn tables into',
    headlineAccent: 'JSON arrays',
    body: 'Describe one row, get every row. Start on the free tier and scrape your first table today.',
    href: '/features/scraping',
    label: 'Scrape a table'
  },
  howTo: {
    name: 'How to scrape an HTML table or list into a JSON array',
    steps: [
      {
        title: 'Select the repeated element',
        description:
          'Write a rule with selectorAll matching every data row, card or list item, skipping the header row.'
      },
      {
        title: 'Describe the columns',
        description:
          'Put an object under attr with one rule per column. Each rule runs relative to its row and can have its own type.'
      },
      {
        title: 'Use a plain list for single values',
        description:
          'Leave attr as a plain value such as text to get an array of strings instead of objects.'
      }
    ]
  }
}
