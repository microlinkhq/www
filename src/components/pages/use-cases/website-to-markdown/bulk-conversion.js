export const CONTENT = {
  slug: 'website-to-markdown/bulk-conversion',
  head: {
    title: 'Convert thousands of URLs to Markdown with caching',
    description:
      'Crawl-scale Markdown conversion without a scraper fleet: parallel requests without throttling, per-URL caching with background refresh and retries.'
  },
  hero: {
    title: 'Convert thousands of URLs to Markdown, in parallel and cached',
    intro:
      'Building a knowledge base or refreshing a RAG index means converting a whole site, then converting it again next week. The Markdown API takes the batch as parallel requests, caches every URL, and refreshes in the background so re-indexing is cheap.',
    cta: { label: 'Start with the Markdown API', href: '/markdown' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Crawl-scale conversion is a capacity and freshness problem',
    paragraphs: [
      'A scraper fleet has to be sized for the initial crawl and then sits idle, and every re-crawl re-renders pages that did not change. Rate limits on the target side turn a one-hour job into a day.',
      'Microlink applies no throttling limitation, so parallel requests run as fast as your quota allows. Every URL is cached for 24 hours by default and up to 31 days with ttl; staleTtl serves the cached copy instantly while refreshing behind it, so the second crawl costs almost nothing in latency.'
    ]
  },
  how: {
    title: 'Fan out, scope, cache',
    intro:
      'The crawl is a map over URLs with a bounded concurrency. Scoping and caching are request options.',
    steps: [
      {
        label: '1 · Convert a batch with a bounded pool',
        sdk: "const pool = async (items, limit, worker) => {\n  const results = []\n  let cursor = 0\n  const run = async () => {\n    while (cursor < items.length) {\n      const index = cursor++\n      results[index] = await worker(items[index])\n    }\n  }\n  await Promise.all(Array.from({ length: limit }, run))\n  return results\n}\n\nconst documents = await pool(urls, 25, url =>\n  microlink.markdown(url, {\n    selector: 'main',\n    meta: false,\n    ttl: '7d',\n    staleTtl: 0,\n    retry: 3\n  })\n)",
        note: 'A pool of 25 keeps memory predictable; Microlink itself does not throttle.'
      },
      {
        label: '2 · Discover URLs with the links method',
        sdk: "const urls = await microlink.links('https://docs.example.com', {\n  selectorAll: 'nav a'\n})",
        note: 'links() returns absolute, deduplicated URLs; scope it to the navigation to get the site map.'
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
        note: 'ttl and staleTtl require a Pro key; the URL then targets the pro endpoint.'
      }
    ],
    params: [
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Cache lifetime per URL, 1 minute to 31 days on Pro plans.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serve the cached copy instantly and refresh in the background.'
      },
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff. Default 2.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata extraction on every conversion.'
      },
      {
        name: 'force',
        href: '/docs/api/parameters/force',
        note: 'Bypass the cache for a URL you know has changed.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Namespace cache entries per index or per tenant.'
      }
    ],
    outro:
      'Log x-cache-status per response: a high HIT ratio on the second crawl is the signal that the cache is doing its job.'
  },
  why: {
    title: 'Why caching changes crawl economics',
    intro:
      'The first crawl is a fixed cost. Every crawl after that should cost only what changed.',
    cards: [
      {
        kicker: 'No throttling',
        title: 'The batch runs at the speed of your quota.',
        body: 'There is no per-second rate limiter; parallel requests count against your quota and are processed as they arrive. Back-pressure is an explicit HTTP 429 with ERATE and reset headers, not a silent slowdown.',
        note: 'For [PDF batches](/use-cases/website-to-pdf/batch-generation) the same pattern applies with the PDF options.'
      },
      {
        kicker: 'Stale-while-revalidate',
        title: 'Re-indexing reads the cache and refreshes behind it.',
        body: 'With staleTtl at 0, every request returns the cached Markdown immediately and triggers a background refresh. The index stays fresh without waiting on a render per URL.',
        note: 'Pick ttl by how often the source changes: hours for feeds, days for docs, the 31-day maximum for stable references.'
      },
      {
        kicker: 'Scoped and small',
        title: 'Convert the content, not the chrome.',
        body: 'Scoping every conversion to main or article keeps documents small, which multiplies across thousands of URLs into fewer tokens to embed and store.',
        note: 'When not to: a full site crawl that follows links across thousands of pages is a job for a crawler; use Microlink for the conversion step and a queue or crawler for discovery.'
      }
    ]
  },
  faq: [
    {
      question: 'How many Markdown conversions can I run in parallel?',
      answer:
        'There is no per-second throttling; you can perform as many parallel requests as your quota allows. A bounded pool on your side keeps memory and the target site comfortable.'
    },
    {
      question: 'Does re-crawling a cached URL cost a request?',
      answer:
        'Yes, a cache hit is still one API call, but it is served from the edge in milliseconds instead of rendering the page again, which is what makes re-indexing fast.'
    },
    {
      question: 'How do I force a fresh conversion for a changed page?',
      answer:
        'Pass force: true for that URL. The response header x-cache-status reports BYPASS and the new result replaces the cached copy.'
    },
    {
      question: 'Can Microlink crawl a whole site for me?',
      answer:
        'Microlink converts the URLs you give it. Use links() to discover pages from navigation or index pages, or pair a crawler with the API for the conversion step.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to convert',
    headlineAccent: 'at crawl scale',
    body: 'Parallel, cached and refreshed in the background. Pick a Pro plan sized for your index and convert your first thousand pages today.',
    href: '/markdown',
    label: 'Start a bulk conversion'
  }
}
