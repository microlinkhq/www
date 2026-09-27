const vertical = 'scraping'
const category = 'Scraping API'

export const SCRAPING = [
  {
    slug: 'scraping/website-to-json',
    vertical,
    category,
    name: 'Any website to JSON',
    cta: 'Turn a website into JSON',
    blurb:
      'Declare the fields you want as CSS selector rules and get typed JSON back, with null for anything the page does not have.',
    keywords: [
      'website to json api',
      'css selector scraping api',
      'html to json api',
      'scrape website to json'
    ],
    related: [
      'scraping/tables-and-lists',
      'scraping/product-prices',
      'scraping/javascript-rendered-pages',
      'scraping/json-endpoints',
      'website-metadata/custom-fields',
      'website-to-markdown/clean-content'
    ]
  },
  {
    slug: 'scraping/product-prices',
    vertical,
    category,
    name: 'Product prices and stock',
    cta: 'Scrape product prices',
    blurb:
      'Read prices as numbers and stock as text from any product page, with fallback rules that survive template changes.',
    keywords: [
      'scrape product prices api',
      'ecommerce price scraper',
      'extract price from url',
      'price monitoring api'
    ],
    related: [
      'scraping/website-to-json',
      'scraping/javascript-rendered-pages',
      'scraping/tables-and-lists',
      'website-metadata/custom-fields',
      'website-screenshot/proxy-geolocation',
      'website-metadata/blocked-sites'
    ]
  },
  {
    slug: 'scraping/tables-and-lists',
    vertical,
    category,
    name: 'Tables and lists to JSON arrays',
    cta: 'Scrape tables into JSON',
    blurb:
      'Turn table rows, product grids and search results into an array of objects, one nested rule per column.',
    keywords: [
      'scrape html table to json',
      'extract table data api',
      'scrape list from website',
      'html table to json api'
    ],
    related: [
      'scraping/website-to-json',
      'scraping/load-more-and-pagination',
      'scraping/product-prices',
      'scraping/links-and-emails',
      'website-to-markdown/clean-content',
      'website-metadata/custom-fields'
    ]
  },
  {
    slug: 'scraping/javascript-rendered-pages',
    vertical,
    category,
    name: 'Custom fields from JavaScript apps',
    cta: 'Scrape JavaScript-rendered pages',
    blurb:
      'Render React, Vue or Angular apps in a real browser, wait for the element you need, then run your rules.',
    keywords: [
      'scrape javascript rendered page',
      'scrape react website',
      'spa scraping api',
      'headless browser scraping api'
    ],
    related: [
      'scraping/website-to-json',
      'scraping/load-more-and-pagination',
      'scraping/run-puppeteer-without-chrome',
      'website-metadata/javascript-rendered-pages',
      'website-to-markdown/javascript-rendered-pages',
      'website-screenshot/dynamic-content'
    ]
  },
  {
    slug: 'scraping/behind-login',
    vertical,
    category,
    name: 'Scraping behind a login',
    cta: 'Scrape authenticated pages',
    blurb:
      'Forward a session cookie or bearer token as a request header and extract data from pages only your users can see.',
    keywords: [
      'scrape website behind login',
      'scrape authenticated pages',
      'bearer token scraping',
      'scrape with session cookie'
    ],
    related: [
      'website-screenshot/behind-login',
      'website-to-pdf/invoices-and-receipts',
      'scraping/website-to-json',
      'scraping/json-endpoints',
      'scraping/javascript-rendered-pages',
      'scraping/run-puppeteer-without-chrome'
    ]
  },
  {
    slug: 'scraping/links-and-emails',
    vertical,
    category,
    name: 'Every link and email on a page',
    cta: 'Extract links and emails',
    blurb:
      'Get every link as an absolute URL and every email address as a bare string, scoped to the part of the page you choose.',
    keywords: [
      'extract all links from website',
      'email extractor api',
      'get all urls from page',
      'extract emails from website'
    ],
    related: [
      'website-to-markdown/llm-context',
      'scraping/website-to-json',
      'scraping/tables-and-lists',
      'scraping/javascript-rendered-pages',
      'scraping/npm-packages-remotely',
      'website-metadata/only-the-fields-you-need'
    ]
  },
  {
    slug: 'scraping/json-endpoints',
    vertical,
    category,
    name: 'Cached JSON endpoints',
    cta: 'Fetch and cache JSON APIs',
    blurb:
      'Fetch any JSON endpoint without a browser, keep its shape intact and serve repeat calls from the cache.',
    keywords: [
      'fetch json from url api',
      'cache api responses',
      'scrape json endpoint',
      'json api cache proxy'
    ],
    related: [
      'scraping/website-to-json',
      'scraping/behind-login',
      'scraping/npm-packages-remotely',
      'scraping/tables-and-lists',
      'website-to-markdown/bulk-conversion',
      'website-metadata/high-volume-link-previews'
    ]
  },
  {
    slug: 'scraping/load-more-and-pagination',
    vertical,
    category,
    name: 'Pagination and Load more buttons',
    cta: 'Scrape paginated lists',
    blurb:
      'Scrape numbered pages in parallel, one call per page, or click Load more inside a function until the list is complete.',
    keywords: [
      'scrape load more button',
      'puppeteer click load more',
      'scrape paginated website',
      'scrape infinite list'
    ],
    related: [
      'scraping/tables-and-lists',
      'scraping/run-puppeteer-without-chrome',
      'scraping/javascript-rendered-pages',
      'scraping/website-to-json',
      'website-to-markdown/bulk-conversion',
      'website-to-pdf/batch-generation'
    ]
  },
  {
    slug: 'scraping/run-puppeteer-without-chrome',
    vertical,
    category,
    name: 'Puppeteer without hosting Chrome',
    cta: 'Run Puppeteer remotely',
    blurb:
      'Send a Puppeteer function with a URL and get its return value back. The browser, the sandbox and the cleanup run on Microlink.',
    keywords: [
      'puppeteer as a service',
      'serverless puppeteer',
      'hosted headless chrome api',
      'run puppeteer in the cloud'
    ],
    related: [
      'scraping/npm-packages-remotely',
      'scraping/load-more-and-pagination',
      'scraping/javascript-rendered-pages',
      'scraping/behind-login',
      'website-screenshot/dynamic-content',
      'website-to-pdf/dynamic-content'
    ]
  },
  {
    slug: 'scraping/npm-packages-remotely',
    vertical,
    category,
    name: 'JavaScript with npm packages',
    cta: 'Run JavaScript remotely',
    blurb:
      'Require any npm package inside a remote function, pin its version, and skip the browser entirely when the code does not need one.',
    keywords: [
      'run javascript remotely api',
      'cheerio in the cloud',
      'serverless javascript scraping',
      'run npm package online'
    ],
    related: [
      'scraping/run-puppeteer-without-chrome',
      'scraping/links-and-emails',
      'scraping/json-endpoints',
      'scraping/website-to-json',
      'scraping/load-more-and-pagination',
      'website-to-markdown/llm-context'
    ]
  }
]
