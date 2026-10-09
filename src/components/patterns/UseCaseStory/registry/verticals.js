export const VERTICALS = [
  {
    slug: 'website-screenshot',
    name: 'Website screenshot',
    product: 'Screenshot API',
    productHref: '/screenshot',
    docsHref: '/docs/guides/screenshot',
    docsLabel: 'Screenshot guide',
    toolHref: '/tools/website-screenshot',
    toolLabel: 'Free screenshot tool',
    icon: 'camera',
    iconBg: 'red7',
    hub: {
      title: 'Website screenshot API use cases',
      description:
        'Screenshot API recipes with code: mobile and dark mode captures, single elements, pages behind a login, blocked sites and Open Graph images.',
      h1: 'Website screenshot use cases',
      intro:
        'Recipes for the jobs a website screenshot API gets hired for: mobile and dark mode captures, single elements, pages behind a login, bot-protected sites, Open Graph images and bursty traffic. One problem per page, with the exact options that solve it, code you can paste, and a note on when it is not the right tool.',
      cta: {
        headlinePrefix: 'Ready to capture',
        headlineAccent: 'any website',
        body: 'Every recipe on this page runs on the same endpoint. Start on the free tier, add an API key when you need proxies, custom headers or longer caching.',
        label: 'Start with the Screenshot API'
      }
    }
  },
  {
    slug: 'website-to-pdf',
    name: 'Website to PDF',
    product: 'PDF API',
    productHref: '/pdf',
    docsHref: '/docs/guides/pdf',
    docsLabel: 'PDF guide',
    toolHref: '/tools/website-to-pdf',
    toolLabel: 'Free website to PDF tool',
    icon: 'pdf',
    iconBg: 'teal8',
    hub: {
      title: 'Website to PDF API use cases',
      description:
        'Website to PDF recipes with code: invoices behind a login, clean layouts without ads, paper size and margins, download links and bulk generation.',
      h1: 'Website to PDF use cases',
      intro:
        'Recipes for turning any URL into a PDF: invoices and receipts behind a login, clean print layouts without ads, paper size and margins, direct download links, article archives and bulk generation. One problem per page, with the PDF API options that produce the document, code you can paste, and the limits to plan for.',
      cta: {
        headlinePrefix: 'Ready to print',
        headlineAccent: 'any URL to PDF',
        body: 'Every recipe on this page runs on the same endpoint. Start on the free tier, add an API key when you need private pages, custom filenames or longer caching.',
        label: 'Start with the PDF API'
      }
    }
  },
  {
    slug: 'website-to-markdown',
    name: 'Website to Markdown',
    product: 'Markdown API',
    productHref: '/markdown',
    docsHref: '/docs/guides/content-conversion/url-to-markdown',
    docsLabel: 'URL to Markdown guide',
    toolHref: '/tools/url-to-markdown',
    toolLabel: 'Free URL to Markdown tool',
    icon: 'markdown',
    iconBg: 'violet7',
    hub: {
      title: 'URL to Markdown API use cases',
      description:
        'URL to Markdown recipes for LLM and RAG pipelines: clean article bodies, metadata frontmatter, JavaScript apps, PDFs, office files and YouTube.',
      h1: 'Website to Markdown use cases',
      intro:
        'Recipes for converting web pages, documents and videos into clean Markdown for LLMs and RAG pipelines: boilerplate-free articles, metadata frontmatter, JavaScript-rendered apps, PDFs and office files, YouTube transcripts and crawl-scale conversion. One problem per page, with the code to run and what the conversion does not cover.',
      cta: {
        headlinePrefix: 'Ready to convert',
        headlineAccent: 'any URL to Markdown',
        body: 'Every recipe on this page runs on the same endpoint. Start on the free tier, add an API key when you need proxies, custom headers or longer caching.',
        label: 'Start with the Markdown API'
      }
    }
  },
  {
    slug: 'website-metadata',
    name: 'Website metadata',
    product: 'Metadata API',
    productHref: '/metadata',
    docsHref: '/docs/guides/metadata',
    docsLabel: 'Metadata guide',
    toolHref: '/tools/sharing-debugger',
    toolLabel: 'Sharing debugger',
    icon: 'globe',
    iconBg: 'blue9',
    hub: {
      title: 'Website metadata API use cases',
      description:
        'Link preview and metadata extraction recipes: custom fields, missing og:image fixes, single-page apps, brand colors and unfurling at scale.',
      h1: 'Website metadata use cases',
      intro:
        'Recipes for link previews and website metadata extraction: custom fields next to Open Graph data, fixes for a missing og:image, single-page apps, brand colors, localized pages, bot-protected sites and unfurling at scale. One problem per page, with the code to run and a note on when a custom extraction rule is the better tool.',
      cta: {
        headlinePrefix: 'Ready to extract',
        headlineAccent: 'metadata from any URL',
        body: 'Every recipe on this page runs on the same endpoint. Start on the free tier, add an API key when you need proxies, custom headers or longer caching.',
        label: 'Start with the Metadata API'
      }
    }
  },
  {
    slug: 'scraping',
    name: 'Web scraping',
    product: 'Scraping API',
    productHref: '/features/scraping',
    docsHref: '/docs/guides/data-extraction',
    docsLabel: 'Data extraction guide',
    icon: 'code',
    iconBg: 'orange8',
    hub: {
      title: 'Web scraping API use cases',
      description:
        'Web scraping recipes with code: any page to JSON, product prices, tables, JavaScript apps, pages behind a login and Puppeteer without hosting Chrome.',
      h1: 'Web scraping use cases',
      intro:
        'Recipes for turning web pages into structured data: CSS selector rules to JSON, product prices, tables and repeated lists, JavaScript-rendered apps, pages behind a login, links and emails, Load more buttons and your own Puppeteer code running on a managed browser. One problem per page, with the rules or function that solve it, code you can paste, and the limits to plan for.',
      cta: {
        headlinePrefix: 'Ready to scrape',
        headlineAccent: 'any website to JSON',
        body: 'Every recipe on this page runs on the same endpoint. Start on the free tier, add an API key when you need proxies, custom headers or longer caching.',
        label: 'Start with the Scraping API'
      }
    }
  },
  {
    slug: 'proxy',
    name: 'Proxy',
    product: 'Proxy',
    productHref: '/features/proxy',
    docsHref: '/docs/guides/common/proxy',
    docsLabel: 'Proxy guide',
    icon: 'shield',
    iconBg: 'cyan8',
    hub: {
      title: 'Web scraping proxy use cases',
      description:
        'Proxy recipes with code: scrape Cloudflare-protected sites, fix 403 and 429 errors, geo-blocked pages, prices by country and your own proxy.',
      h1: 'Proxy use cases',
      intro:
        'Recipes for reaching the pages that refuse a headless browser: Cloudflare-protected sites, 403 and 429 errors, geo-blocked content, prices by country, antibot detection and bring-your-own proxy. On Pro plans the proxy is automatic, so most recipes are about what to expect and how to confirm the route. One problem per page, with code you can paste and the limits to plan for.',
      cta: {
        headlinePrefix: 'Ready to reach',
        headlineAccent: 'the pages that block you',
        body: 'Every recipe on this page runs on the same endpoint. Proxy resolution is included on Pro plans, with no proxy list to buy or rotate.',
        label: 'Start with the proxy'
      }
    }
  },
  {
    slug: 'search-api',
    name: 'Search API',
    product: 'Search API',
    productHref: '/search',
    docsHref: '/docs/guides/search',
    docsLabel: 'Search guide',
    icon: 'search',
    iconBg: 'indigo7',
    hub: {
      title: 'Google Search API use cases',
      description:
        'Search API recipes with code: news monitoring, Google Shopping prices, Maps leads, rank tracking, Scholar, patents and live search for LLMs.',
      h1: 'Search API use cases',
      intro:
        'Recipes for turning Google results into structured data: news and brand monitoring, Shopping price comparison, local business leads from Maps, rank tracking by country, keyword research, Scholar citations, patent search, image search and live search to ground LLM answers. One job per page, with the query options that solve it, code you can paste, and what the results do not include.',
      cta: {
        headlinePrefix: 'Ready to query',
        headlineAccent: 'Google as structured data',
        body: 'Every recipe on this page runs on the same search method. Ten Google surfaces, one client, normalized results.',
        label: 'Start with the Search API'
      }
    }
  }
]
