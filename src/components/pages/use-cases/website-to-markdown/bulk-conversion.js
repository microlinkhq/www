export const CONTENT = {
  slug: 'website-to-markdown/bulk-conversion',
  head: {
    title: 'Bulk URL to Markdown conversion with per-URL caching',
    description:
      'Convert thousands of URLs to Markdown without a scraper fleet: parallel requests with no throttling, a cache per URL and refreshes in the background.'
  },
  hero: {
    title: 'Convert URLs to Markdown in bulk, in parallel and cached',
    intro:
      'Bulk URL to Markdown conversion is a loop over your URL list: the Markdown API takes the batch as parallel requests, caches every page and refreshes it in the background. Building a knowledge base, feeding a Markdown RAG pipeline or migrating a documentation site means converting a whole site once, then converting it again next week. The second pass should only cost you what changed.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Bulk Markdown conversion is a capacity and freshness problem',
    paragraphs: [
      'A thousand pages are a thousand fetches, some of them browser renders, all of them needing retries, timeouts and cleanup. Run them one by one and the job takes hours. Run them all at once on your own machines and you are now operating a browser pool.',
      'A scraper fleet has to be sized for the initial crawl and then sits idle until the next one. Every re-crawl renders pages that did not change, because nothing remembers the last result. Add a rate limiter on the API side and a one-hour job turns into a day of backoff logic.',
      'Microlink applies [no throttling](/docs/api/basics/rate-limit), so parallel requests run as fast as your quota allows. Every URL is cached for 24 hours by default and for up to 31 days with [ttl](/docs/api/parameters/ttl), and [staleTtl](/docs/api/parameters/staleTtl) serves the cached copy instantly while refreshing behind it. Cache hits do not count against your quota, so re-indexing an unchanged site is close to free.'
    ]
  },
  how: {
    title: 'How to convert a list of URLs to Markdown in bulk',
    intro:
      'The crawl is a map over URLs with bounded concurrency on your side. Scoping, caching and retries are request options, and the [caching patterns guide](/docs/guides/common/caching) explains how ttl and staleTtl interact.',
    steps: [
      {
        label: '1 · Convert a batch with a bounded pool',
        sdk: "const pool = async (items, limit, worker) => {\n  const results = []\n  let cursor = 0\n  const run = async () => {\n    while (cursor < items.length) {\n      const index = cursor++\n      results[index] = await worker(items[index])\n    }\n  }\n  await Promise.all(Array.from({ length: limit }, run))\n  return results\n}\n\nconst documents = await pool(urls, 25, url =>\n  microlink.markdown(url, {\n    selector: 'main',\n    meta: false,\n    ttl: '7d',\n    staleTtl: 0,\n    retry: 3\n  })\n)",
        note: 'Twenty-five workers pull from the list until it is empty, and each call resolves to the Markdown of the main element. The pool protects your memory and the target site; Microlink itself does not throttle.'
      },
      {
        label: '2 · Discover URLs with the links method',
        sdk: "const urls = await microlink.links('https://docs.example.com', {\n  selectorAll: 'nav a'\n})",
        note: 'links() returns absolute, deduplicated URLs. Scope it to the navigation and you get the site map of a documentation site in one request.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://docs.example.com/guide',
          params: {
            data: { markdown: { selector: 'main', attr: 'markdown' } },
            meta: false,
            ttl: '7d',
            staleTtl: 0
          },
          pro: true
        },
        note: 'Any language with an HTTP client can run the batch. ttl and staleTtl require a Pro key, so the URL targets the pro endpoint, and the Markdown comes back in the data.markdown field of the JSON response.'
      }
    ],
    params: [
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache lifetime per URL: 24 hours by default, 1 minute to 31 days on Pro plans.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serve the cached copy instantly and refresh it in the background. Cannot exceed ttl. Pro plans.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff. Default 2.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata detection on every conversion when you only index the body.'
      },
      {
        name: 'force',
        href: '/docs/api/parameters/force',
        note: 'Bypass the cache and store a fresh copy for a URL you know has changed.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Append an identifier to the cache key to keep separate entries per index or per tenant. Pro plans.'
      }
    ],
    outro:
      'Log the x-cache-status header of every response. A high ratio of HIT on the second crawl is the signal that the cache is doing its job, and BYPASS should only appear on the URLs you forced.'
  },
  why: {
    title: 'Why per-URL caching changes the cost of a Markdown crawl',
    intro:
      'The first crawl is a fixed cost. Every crawl after that should cost only what changed, which is the same logic behind [configurable cache TTLs](/features/ttl) on every Microlink request.',
    cards: [
      {
        kicker: 'No throttling',
        title: 'The batch runs at the speed of your quota.',
        body: 'There is no per-second rate limiter, so you can send as many parallel requests as your quota allows and they are processed as they arrive. When the quota runs out the API answers with HTTP 429 and the ERATE error code, an explicit signal instead of a silent slowdown.',
        note: 'The same fan-out pattern drives [bulk PDF generation](/use-cases/website-to-pdf/batch-generation) and [screenshots under traffic spikes](/use-cases/website-screenshot/traffic-spikes), with the options of each API.'
      },
      {
        kicker: 'Stale-while-revalidate',
        title: 'Re-indexing reads the cache and refreshes behind it.',
        body: 'With staleTtl at 0, every request returns the cached Markdown immediately and triggers a background refresh. The index stays fresh without waiting on a render per URL, and the cached reads are not deducted from your quota.',
        note: 'Pick ttl by how often the source changes: an hour or less for feeds, one to seven days for blogs and docs, the 31-day maximum for stable references.'
      },
      {
        kicker: 'Scoped and small',
        title: 'Convert the content, not the chrome.',
        body: 'Scoping every conversion to main or article keeps documents small. Across thousands of URLs that adds up to fewer tokens to embed, less storage and chunks that are about the page instead of its menu.',
        note: 'When not to: Microlink converts the URLs you give it and does not follow links on its own. For a recursive crawl across thousands of unknown pages, pair a crawler or a queue for discovery with the API for the conversion step. [Clean Markdown without boilerplate](/use-cases/website-to-markdown/clean-content) covers the scoping side.'
      }
    ]
  },
  faq: [
    {
      question: 'How many URLs can I convert to Markdown in parallel?',
      answer:
        'As many as your quota allows. Microlink does not apply per-second throttling, so concurrency is your decision. A bounded pool on your side, such as the 25 workers in the example, keeps your memory flat and avoids hammering the target site.'
    },
    {
      question: 'Does re-converting a cached URL to Markdown use my quota?',
      answer:
        'No. Cache hits do not count against your quota and are served from the edge in milliseconds. Only a MISS, an expired entry or a request with force renders the page again, which is why a second crawl of an unchanged site is fast and cheap.'
    },
    {
      question: 'How do I force a fresh Markdown conversion for a page that changed?',
      answer:
        'Pass [force: true](/docs/api/parameters/force) for that URL. The x-cache-status response header reports BYPASS and the new result replaces the cached copy, so later requests get the updated Markdown.'
    },
    {
      question: 'Can Microlink crawl a whole site and return Markdown for every page?',
      answer:
        'Microlink converts the URLs you send. Use links() to discover pages from a navigation or index page, or read the sitemap yourself, then feed the list to the pool. For recursive discovery, pair a crawler with the API for the conversion step.'
    },
    {
      question: 'What happens if my bulk Markdown job exceeds the plan quota?',
      answer:
        'Requests beyond the quota fail with HTTP 429 and the ERATE error code until the quota resets or you upgrade. Catch that code in the worker, pause the pool and resume later: everything converted so far is still cached.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to convert',
    headlineAccent: 'at crawl scale',
    body: 'Parallel, cached and refreshed in the background. Pick a Pro plan sized for your index and convert your first thousand pages today.',
    href: '/markdown',
    label: 'Start a bulk conversion'
  },
  howTo: {
    name: 'How to convert a list of URLs to Markdown in bulk',
    steps: [
      {
        title: 'Convert the batch with a bounded pool',
        description:
          'Map over your URL list with a fixed number of workers, calling the Markdown method with selector, meta: false, ttl, staleTtl and retry. Each call resolves to the Markdown of one page.'
      },
      {
        title: 'Discover the URLs with the links method',
        description:
          'Call links() on a navigation or index page with selectorAll set to the navigation anchors. It returns absolute, deduplicated URLs to feed the pool.'
      },
      {
        title: 'Run the same request from any language',
        description:
          'Request the pro endpoint with url, data.markdown.selector, data.markdown.attr=markdown, meta=false, ttl and staleTtl, and read the Markdown from data.markdown in the JSON response.'
      }
    ]
  }
}
