export const CONTENT = {
  slug: 'website-to-pdf/batch-generation',
  head: {
    title: 'Generate PDFs in bulk without managing browsers',
    description:
      'Thousands of reports, invoices or certificates from URLs in one job: parallel requests without throttling, server-side retries and caching per document.'
  },
  hero: {
    title: 'Generate thousands of PDFs from URLs without running browsers',
    intro:
      'Month-end statements, event certificates, a report per customer: PDF work arrives in batches. Running a headless browser fleet for one night a month is expensive and fragile. The PDF API takes the batch as parallel requests and returns a hosted document for each.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Batch PDF jobs break browser pools',
    paragraphs: [
      'Ten thousand renders in an hour needs dozens of Chrome instances, memory to match, and a queue that survives crashes. Most teams build it once, watch it fail at the next peak, and rebuild it with more capacity that idles the rest of the month.',
      'Microlink applies no throttling limitation, so the batch runs as fast as your quota allows, in parallel. Each render has its own isolated browser and a 60-second budget on Pro plans, transient failures are retried server-side, and identical documents are served from the cache.'
    ]
  },
  how: {
    title: 'Fan out, retry, cache',
    intro:
      'The batch is a map over URLs. Concurrency, retries and caching are request options, not infrastructure.',
    steps: [
      {
        label: '1 · Render a batch in parallel',
        sdk: `const customers = await loadCustomers()

const documents = await Promise.all(
  customers.map(({ id }) =>
    microlink.pdf(\`https://app.example.com/statements/\${id}\`, {
      headers: {
        'x-api-header-authorization': \`Bearer \${process.env.APP_TOKEN}\`
      },
      filename: \`statement-\${id}.pdf\`,
      retry: 3
    })
  )
)`,
        note: 'One request per document; retry handles intermittent browser errors with exponential backoff.'
      },
      {
        label: '2 · Throttle on your side with a bounded pool',
        sdk: "const pool = async (items, limit, worker) => {\n  const results = []\n  let cursor = 0\n  const run = async () => {\n    while (cursor < items.length) {\n      const index = cursor++\n      results[index] = await worker(items[index])\n    }\n  }\n  await Promise.all(Array.from({ length: limit }, run))\n  return results\n}\n\nconst documents = await pool(urls, 20, url => microlink.pdf(url, { ttl: '7d' }))",
        note: 'Microlink does not throttle, but a bounded pool keeps your own memory and the target site comfortable.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://app.example.com/statements/42',
          params: { pdf: true, meta: false, retry: 3, ttl: '7d' },
          pro: true
        },
        note: 'Every option is a query parameter, so any language with an HTTP client can drive the batch.'
      }
    ],
    params: [
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff. Default 2.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Keep each document cached up to 31 days on Pro while the batch is consumed.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Separate cache entries for the same URL rendered per tenant or per run.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'false skips metadata extraction on every render, the biggest single speedup.'
      },
      {
        name: 'filename',
        href: '/docs/api/parameters/filename',
        note: 'Name each document so the batch output is self-describing. Pro plans.'
      },
      {
        name: 'timeout',
        href: '/docs/api/parameters/timeout',
        note: 'Per-request budget, up to 60 seconds on Pro.'
      }
    ],
    outro:
      'Watch for EPDFTOOLARGE on very long documents and EPAGERANGE on invalid page ranges; both are per-request errors that should not stop the batch.'
  },
  why: {
    title: 'Why a managed API fits batch work',
    intro:
      'Batches are peaks by definition. Capacity that exists only when you need it is the whole point.',
    cards: [
      {
        kicker: 'No throttling',
        title: 'The batch runs at the speed of your quota.',
        body: 'The API does not rate-limit per second; parallel requests count against your monthly quota and are processed as they arrive. When the quota is exhausted you get an explicit HTTP 429 with ERATE and reset headers.',
        note: 'Size the Pro plan to the batch: monthly quotas scale from tens of thousands of requests up, and Enterprise adds dedicated capacity.'
      },
      {
        kicker: 'Isolated and retried',
        title: 'One browser per document, retries for free.',
        body: 'Every render runs in its own isolated browser instance, so a single slow page cannot stall the batch, and retry re-runs transient failures server-side with exponential backoff.',
        note: 'Log x-request-id from each response; it is the handle for support when a specific document misbehaves.'
      },
      {
        kicker: 'Cache as a buffer',
        title: 'Consumers download from the CDN, not from the renderer.',
        body: 'Each document is cached with its own ttl, so the batch renders once and the downloads, emails or previews that follow are served from the edge for days.',
        note: 'When not to: a handful of documents a day does not need a batch pattern; a single request per document as the need arises is simpler and stays within the free tier.'
      }
    ]
  },
  faq: [
    {
      question: 'How many PDFs can I generate in parallel?',
      answer:
        'There is no per-second throttling; you can perform as many parallel requests as your quota allows. Use a bounded pool on your side to keep memory and the target site under control.'
    },
    {
      question: 'What is the time limit per PDF?',
      answer:
        'The request timeout is 30 seconds on the free endpoint and 60 seconds on Pro plans. Very long or heavy pages that exceed it fail for that document only; keep the page lean or split it with pageRanges.'
    },
    {
      question: 'How do I handle failures inside a PDF batch?',
      answer:
        'Set retry to 3 so transient browser errors are retried server-side, then catch errors per document in your code. A failed render returns an error code such as EBRWSRTIMEOUT or EPDFTOOLARGE that you can log and requeue.'
    },
    {
      question: 'Are the generated PDFs stored for me?',
      answer:
        'They are cached on the CDN for the request’s ttl, 24 hours by default and up to 31 days on Pro plans. Copy the files into your own storage when you need them longer.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to render',
    headlineAccent: 'PDFs in bulk',
    body: 'No browser fleet, no queue to babysit. Pick a Pro plan sized for your batch and generate your first thousand documents tonight.',
    href: '/pdf',
    label: 'Start a batch'
  }
}
