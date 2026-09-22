export const INDUSTRIES = [
  {
    slug: 'industries/ecommerce',
    name: 'E-commerce data',
    cta: 'Build e-commerce data pipelines',
    blurb:
      'Prices, stock and product listings from any store and from Google Shopping, per country, as JSON.',
    head: {
      title: 'E-commerce data API: prices, products and stock',
      description:
        'Scrape product prices and stock, compare Google Shopping offers and read localized prices by country, with recipes and code for each step.'
    },
    h1: 'Web data for e-commerce teams',
    intro:
      'Price monitoring, assortment tracking and marketplace research all start with the same three questions: what does this product cost, where, and is it in stock. Microlink answers them with [extraction rules](/docs/guides/data-extraction) on product pages, the [Search API](/search) on Google Shopping and a [country-pinned proxy](/features/proxy) for localized prices, all behind one API key.',
    productHref: '/features/scraping',
    productLabel: 'Start with the Scraping API',
    pipeline: {
      title: 'From a product URL to a price history',
      intro:
        'Most e-commerce pipelines combine discovery, extraction and localization. Each step is one API call, so you can start with any of them.',
      cards: [
        {
          kicker: 'Discover',
          title: 'Find who sells the product.',
          body: 'A Google Shopping query returns merchants, prices already parsed as numbers and ratings, so you know which stores to watch before writing a single selector.',
          note: 'See [Google Shopping price comparison](/use-cases/search-api/price-comparison) for the query and the result fields.'
        },
        {
          kicker: 'Extract',
          title: 'Read price and stock from the product page.',
          body: 'CSS selector rules return exactly the fields you name, typed as numbers or strings, with fallbacks for stores that change their markup.',
          note: 'The [product prices recipe](/use-cases/scraping/product-prices) covers typed prices, fallback selectors and JavaScript-rendered stores.'
        },
        {
          kicker: 'Localize',
          title: 'See the price a shopper in each country sees.',
          body: 'Pin the proxy to a country and run the same rules once per market. On Pro plans the proxy also handles the antibot walls that big retailers put in front of product pages.',
          note: 'When not to: if the store publishes a feed or an affiliate API, read that first. Scraping is for the stores that do not.'
        }
      ]
    },
    useCases: [
      'scraping/product-prices',
      'proxy/geo-targeted-prices',
      'search-api/price-comparison',
      'scraping/tables-and-lists',
      'website-metadata/localized-metadata',
      'website-screenshot/proxy-geolocation'
    ],
    build: {
      title: 'What you still build',
      paragraphs: [
        'Microlink returns the page as data, one request at a time. It does not schedule requests, keep a price history or send alerts, so the loop that runs every hour, the table that stores each reading and the rule that flags a price drop live in your code.',
        'That split keeps you in control of cadence and cost: cache hits never count toward your quota, and [ttl](/docs/api/parameters/ttl) decides how fresh each reading must be.'
      ]
    },
    faq: [
      {
        question: 'Can I monitor competitor prices with an API instead of a scraper?',
        answer:
          'Yes. Extraction rules turn any product page into JSON with the fields you name, and the Google Shopping search type lists merchants and prices for a query. You run them on your own schedule and store the results.'
      },
      {
        question: 'How do I get the price shown in another country?',
        answer:
          'Set proxy.location to a two-letter country code on a Pro plan and run the same extraction rules once per country. See [prices by country](/use-cases/proxy/geo-targeted-prices).'
      },
      {
        question: 'What happens when a store blocks scrapers?',
        answer:
          'On Pro plans the proxy is automatic: when a request hits an antibot wall, Microlink escalates through proxy tiers up to residential and remembers what worked for that domain. On the free tier the API answers with EPROXYNEEDED instead.'
      },
      {
        question: 'Does Microlink alert me when a price changes?',
        answer:
          'No. Microlink returns the current data on each request. Scheduling, storing the history and deciding what counts as a change are up to your application.'
      }
    ],
    ctaSection: {
      headlinePrefix: 'Ready to track',
      headlineAccent: 'prices from any store',
      body: 'Start on the free tier with extraction rules, add a Pro key when you need proxies, countries or longer caching.',
      href: '/features/scraping',
      label: 'Start with the Scraping API'
    }
  },
  {
    slug: 'industries/seo-and-marketing',
    name: 'SEO and marketing',
    cta: 'Build SEO data workflows',
    blurb:
      'Google rankings by country, keyword ideas, SERP snapshots and the metadata every shared link depends on.',
    head: {
      title: 'SEO data API: rankings, keywords and metadata',
      description:
        'Track Google rankings by country, mine autocomplete for keywords, snapshot SERPs and audit Open Graph metadata, with recipes and code.'
    },
    h1: 'Web data for SEO and marketing teams',
    intro:
      'SEO and content teams spend their week on three datasets: where a page ranks, what people search for and how every page looks when it is shared. Microlink covers all three with the [Search API](/search) for Google results and the [Metadata API](/metadata) for titles, descriptions and Open Graph images, behind one API key.',
    productHref: '/search',
    productLabel: 'Start with the Search API',
    pipeline: {
      title: 'From a keyword list to a ranking report',
      intro:
        'Search data and page data answer different questions. Most SEO workflows need both, and each is one call.',
      cards: [
        {
          kicker: 'Research',
          title: 'Grow the keyword list from Google itself.',
          body: 'Autocomplete suggestions, related searches and People also ask questions come back as plain arrays you can feed into the next query.',
          note: 'See [keyword research with autocomplete](/use-cases/search-api/keyword-research). The results carry no search volume, so pair them with your volume source.'
        },
        {
          kicker: 'Track',
          title: 'Find where your pages rank, per country.',
          body: 'Run each keyword with a country code, walk the pages you care about and record the position of your domain in the organic results.',
          note: 'The [rank tracking recipe](/use-cases/search-api/rank-tracking) shows how to derive the position from the result order and page number.'
        },
        {
          kicker: 'Audit',
          title: 'Check how every page looks when it is shared.',
          body: 'The Metadata API normalizes title, description, image and logo for any URL, so broken or missing Open Graph tags show up in a spreadsheet instead of a Slack preview.',
          note: 'When not to: for a full technical crawl of your own site, use a crawler. These recipes are for checking results and pages at the scale of a keyword or URL list.'
        }
      ]
    },
    useCases: [
      'search-api/rank-tracking',
      'search-api/keyword-research',
      'search-api/serp-to-markdown',
      'website-screenshot/open-graph-images',
      'website-metadata/missing-or-wrong-metadata',
      'scraping/links-and-emails'
    ],
    build: {
      title: 'What you still build',
      paragraphs: [
        'The Search API returns Google results for a query; it does not store a ranking history or chart it. Your scheduler runs the keyword list, and your database keeps each day of positions.',
        'Search runs on paid plans from the first request, because every query goes through managed proxy capacity. Metadata and screenshots start on the free tier. Compare the options on the [pricing page](/pricing).'
      ]
    },
    faq: [
      {
        question: 'Can I track Google rankings in several countries?',
        answer:
          'Yes. Pass a two-letter country code as location on each query. Targeting is by country, not by city or device, and the position comes from the order of the organic results.'
      },
      {
        question: 'Does the Search API return search volume?',
        answer:
          'No. It returns Google results, suggestions, related searches and People also ask questions. Volume has to come from a keyword data provider.'
      },
      {
        question: 'How do I audit Open Graph tags across many URLs?',
        answer:
          'Call the Metadata API for each URL and compare the normalized title, description and image against what you expect. See [fix missing or wrong metadata](/use-cases/website-metadata/missing-or-wrong-metadata).'
      },
      {
        question: 'Is the Search API affiliated with Google?',
        answer:
          'No. Microlink is not affiliated with or endorsed by Google. The Search API returns structured data from public Google results pages.'
      }
    ],
    ctaSection: {
      headlinePrefix: 'Ready to measure',
      headlineAccent: 'search visibility',
      body: 'Query ten Google surfaces with one client and normalized results, next to the metadata of every page you rank with.',
      href: '/search',
      label: 'Start with the Search API'
    }
  },
  {
    slug: 'industries/sales-and-lead-enrichment',
    name: 'Sales and lead enrichment',
    cta: 'Enrich leads with web data',
    blurb:
      'Local business lists from Google Maps, contact links and emails, brand assets and company news for every account.',
    head: {
      title: 'Lead enrichment API: businesses, contacts and brands',
      description:
        'Build lead lists from Google Maps, pull emails and links from company sites, and add logos, colors and news to every account, with code.'
    },
    h1: 'Web data for sales and lead enrichment',
    intro:
      'A lead is only as useful as what you know about it. Microlink turns a category and a country into a list of businesses with the [Search API](/search), then fills in each company from its own website: links, emails, logo and brand colors through the [Metadata API](/metadata) and [extraction rules](/docs/guides/data-extraction).',
    productHref: '/search',
    productLabel: 'Start with the Search API',
    pipeline: {
      title: 'From a search to an enriched account',
      intro:
        'Enrichment works in two passes: find the companies, then read their sites. Each pass is one call per company.',
      cards: [
        {
          kicker: 'Find',
          title: 'List the businesses in a category and a country.',
          body: 'The maps and places search types return name, address, phone, website, rating, opening hours and Google Place IDs for a query.',
          note: 'See [local business leads from Google Maps](/use-cases/search-api/local-business-leads). Google Maps results do not include emails.'
        },
        {
          kicker: 'Enrich',
          title: 'Read contacts and brand assets from each site.',
          body: 'Pull every link and email address from the company website, then add the logo and brand colors so the account looks right in your CRM.',
          note: 'The [links and emails recipe](/use-cases/scraping/links-and-emails) explains which addresses are found and which are not.'
        },
        {
          kicker: 'Watch',
          title: 'Know when an account is in the news.',
          body: 'A Google News query per company, filtered to the last day or week, returns dated articles with the publisher, ready to post into a sales channel.',
          note: 'When not to: do not use these recipes to build lists of personal data you have no lawful basis to process. Check your local rules before you store contacts.'
        }
      ]
    },
    useCases: [
      'search-api/local-business-leads',
      'scraping/links-and-emails',
      'website-metadata/brand-colors',
      'search-api/news-monitoring',
      'scraping/website-to-json',
      'website-to-markdown/llm-context'
    ],
    build: {
      title: 'What you still build',
      paragraphs: [
        'Microlink finds and reads public pages. Deduplicating companies, matching them to CRM records and deciding who gets contacted are your application logic.',
        'Emails are found in mailto links and plain text only, so addresses hidden in images or assembled by scripts are missed. Treat the result as a starting point, not a verified contact list.'
      ]
    },
    faq: [
      {
        question: 'Can I get emails from Google Maps results?',
        answer:
          'No. Maps results include the phone number and the website but no email. Fetch the website with the emails method to find addresses published on the page.'
      },
      {
        question: 'How do I add a company logo and brand colors to a lead?',
        answer:
          'Call the Metadata API on the company homepage: it returns the logo, and palette adds the dominant colors of the detected images. See [brand colors](/use-cases/website-metadata/brand-colors).'
      },
      {
        question: 'Can I filter company news to the last 24 hours?',
        answer:
          'Yes. Use the news search type with period set to day. Each result carries an ISO 8601 date and the publisher name.'
      }
    ],
    ctaSection: {
      headlinePrefix: 'Ready to enrich',
      headlineAccent: 'every account',
      body: 'Find businesses on Google Maps and read their websites with the same client and the same API key.',
      href: '/search',
      label: 'Start with the Search API'
    }
  },
  {
    slug: 'industries/ai-agents',
    name: 'AI agents and RAG',
    cta: 'Give agents web access',
    blurb:
      'Live Google search, clean Markdown from any URL and a real browser your agent can drive, from your own tools or an MCP client.',
    head: {
      title: 'Web access for AI agents: search, Markdown, browser',
      description:
        'Give LLM agents live Google search, clean Markdown from any URL and a managed headless browser, as SDK tools or through an MCP server.'
    },
    h1: 'Web access for AI agents and RAG',
    intro:
      'An agent that cannot read the web answers from stale training data. Microlink gives it three tools: [live Google search](/search), [clean Markdown from any URL](/markdown) and a [managed browser](/function) for pages that need interaction. Call them from your own tool definitions, or connect the [MCP server](/integrations/mcp) to your AI client for the reading tools.',
    productHref: '/integrations/mcp',
    productLabel: 'Connect the MCP server',
    pipeline: {
      title: 'From a question to grounded context',
      intro:
        'Most agent loops search, read and, only when needed, interact. Each step is a single call your tool can make.',
      cards: [
        {
          kicker: 'Search',
          title: 'Find current sources for the question.',
          body: 'A Google query returns titles, URLs and snippets in about a second, with period filters down to the last hour for questions about recent events.',
          note: 'See [ground LLM answers with live search](/use-cases/search-api/rag-grounding) for the full loop.'
        },
        {
          kicker: 'Read',
          title: 'Turn the best results into Markdown.',
          body: 'Markdown keeps headings, lists and links while dropping navigation and ads, and uses fewer tokens than HTML. Each expansion is one extra request, so read only the results you need.',
          note: 'The [LLM context recipe](/use-cases/website-to-markdown/llm-context) covers conversion quality and what to strip.'
        },
        {
          kicker: 'Interact',
          title: 'Drive a browser when reading is not enough.',
          body: 'For pages behind a click or a Load more button, run Puppeteer code on a managed browser and return only the value the agent needs.',
          note: 'When not to: agents that must log in, fill forms across several steps or keep a session between calls need a stateful browser. Each Microlink call gets a fresh one.'
        }
      ]
    },
    useCases: [
      'search-api/rag-grounding',
      'search-api/serp-to-markdown',
      'website-to-markdown/llm-context',
      'website-to-markdown/bulk-conversion',
      'website-to-markdown/youtube-transcripts',
      'scraping/run-puppeteer-without-chrome'
    ],
    build: {
      title: 'What you still build',
      paragraphs: [
        'Microlink is the web layer, not the agent. Choosing when to search, ranking sources, chunking Markdown for a vector store and writing the final answer stay in your framework of choice.',
        'Every request runs in a fresh, isolated browser, so there is no session to leak between users. The [MCP server](/integrations/mcp) exposes Markdown, text, metadata, screenshots and PDFs to Claude, Cursor and other MCP clients without writing tool code.'
      ]
    },
    faq: [
      {
        question: 'How do I give an AI agent access to Google search?',
        answer:
          'Wrap microlink.search as a tool in your agent framework: it takes the query and returns titles, URLs and snippets your agent can read. Search runs on paid plans from the first request.'
      },
      {
        question: 'Why Markdown instead of HTML for LLM context?',
        answer:
          'Markdown keeps the structure the model needs, headings, lists, links and tables, and drops markup, so the same page costs fewer tokens.'
      },
      {
        question: 'Can my agent click buttons or scroll a page?',
        answer:
          'Yes, within one call. A browser function receives a Puppeteer page, runs your code and returns its value. Sessions are not kept between calls.'
      },
      {
        question: 'Does Microlink work with MCP clients like Claude and Cursor?',
        answer:
          'Yes. The [MCP server](/integrations/mcp) connects to Claude, Codex, Cursor and VS Code, and exposes metadata, screenshots, PDFs, Markdown and text as tools.'
      }
    ],
    ctaSection: {
      headlinePrefix: 'Ready to connect',
      headlineAccent: 'your agent to the web',
      body: 'Search, read and interact with the web through one API key, from your own tools or from any MCP client.',
      href: '/integrations/mcp',
      label: 'Connect the MCP server'
    }
  }
]
