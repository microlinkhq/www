export const CONTENT = {
  slug: 'website-to-pdf/batch-generation',
  head: {
    title: 'Bulk PDF generation from URLs without a browser fleet',
    description:
      'Generate thousands of PDFs from URLs in one job: parallel requests with no throttling, server-side retries, an isolated browser per document and caching.'
  },
  hero: {
    title: 'Generate thousands of PDFs from URLs without running browsers',
    intro:
      'Bulk PDF generation usually arrives as a deadline: month-end statements, event certificates, a report per customer, a catalog per region. Running a headless browser fleet for one night a month is expensive and fragile. The PDF API takes the batch as parallel requests and returns a hosted document for each URL.',
    cta: { label: 'Start with the PDF API', href: '/pdf' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Bulk PDF generation breaks self-hosted browser pools',
    paragraphs: [
      'Ten thousand renders in an hour needs dozens of Chrome instances, memory to match, and a queue that survives crashes. One page with a runaway script stalls a worker, a leaked tab eats the instance, and the job that was meant to finish overnight is still running when customers log in.',
      'Most teams build that pool once, watch it fail at the next peak, and rebuild it with more capacity that idles the rest of the month. PDF libraries that skip the browser avoid the fleet, and also skip the CSS, the fonts and the charts that made the page worth printing.',
      'Microlink applies [no throttling](/docs/api/basics/rate-limit), so the batch runs as fast as your quota allows, in parallel. Each render gets its own isolated browser and a 60-second budget on Pro plans, transient failures are retried server-side with [retry](/docs/api/parameters/retry), and documents you request again are served from the cache.'
    ]
  },
  how: {
    title: 'How to generate PDFs in bulk from a list of URLs',
    intro:
      'The batch is a map over URLs. Concurrency, retries and caching are request options, not infrastructure. The [production patterns guide](/docs/guides/common/production-patterns) covers rate-limit headers and backoff for long jobs.',
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
        note: 'One request per document. The bearer token travels as a forwarded header, filename makes the output self-describing, and retry: 3 re-runs intermittent browser errors with exponential backoff. Each result carries the hosted url and the file size.'
      },
      {
        label: '2 · Bound the concurrency on your side',
        sdk: `const pool = async (items, limit, worker) => {
  const results = []
  let cursor = 0
  const run = async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await worker(items[index]).catch(error => ({ error }))
    }
  }
  await Promise.all(Array.from({ length: limit }, run))
  return results
}

const documents = await pool(urls, 20, url => microlink.pdf(url, { ttl: '7d' }))`,
        note: 'Microlink does not throttle, but a bounded pool keeps your own memory and the target site comfortable. Catching per document means one failed render is logged and requeued instead of rejecting the whole batch.'
      },
      {
        label: '3 · The same request as a URL',
        request: {
          url: 'https://app.example.com/statements/42',
          params: { pdf: true, meta: false, retry: 3, ttl: '7d' },
          pro: true
        },
        note: 'Every option is a query parameter, so any language with an HTTP client can drive the batch. For a one-off list, the [bulk website to PDF converter](/tools/website-to-pdf/bulk) does the same from the browser.'
      }
    ],
    params: [
      {
        name: 'retry',
        href: '/docs/api/parameters/retry',
        note: 'Server-side retries with exponential backoff on unexpected browser errors. Default 2.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'Keeps each response cached from 1 minute to 31 days while the batch is consumed. Default 24 hours. Pro plans.'
      },
      {
        name: 'cacheKey',
        href: '/docs/api/parameters/cacheKey',
        note: 'Separate cache entries for the same URL rendered per tenant or per run. Pro plans.'
      },
      {
        name: 'meta',
        href: '/docs/api/parameters/meta',
        note: 'Set to false to skip metadata extraction on every render, the biggest single speedup.'
      },
      {
        name: 'filename',
        href: '/docs/api/parameters/filename',
        note: 'Names each document so the batch output is self-describing. Pro plans.'
      },
      {
        name: 'timeout',
        href: '/docs/api/parameters/timeout',
        note: 'Per-request budget: 30 seconds on the free endpoint, 60 seconds on Pro.'
      }
    ],
    outro:
      'Watch for EPDFTOOLARGE on very long documents and EPAGERANGE on invalid page ranges; both are per-request [error codes](/docs/api/basics/error-codes) that should not stop the batch. The [PDF caching and performance guide](/docs/guides/pdf/caching-and-performance) lists the settings that shave seconds off each render.'
  },
  why: {
    title: 'Why a managed PDF API fits batch generation',
    intro:
      'Batches are peaks by definition. Capacity that exists only when you need it is the whole point.',
    cards: [
      {
        kicker: 'No throttling',
        title: 'The batch runs at the speed of your quota.',
        body: 'The API does not rate-limit per second; parallel requests count against your quota and are processed as they arrive. When the quota is exhausted you get an explicit HTTP 429 with ERATE, not a silent slowdown.',
        note: 'Size the plan to the batch on the [pricing page](/pricing); every paid plan carries a 99.9% SLA, and [Enterprise](/enterprise) adds a dedicated endpoint and browser pool.'
      },
      {
        kicker: 'Isolated and retried',
        title: 'One browser per document, retries included.',
        body: 'Every render runs in its own isolated browser instance, so a single slow page cannot stall the batch or leak a session into the next document. retry re-runs transient failures server-side with exponential backoff.',
        note: 'The [isolation feature](/features/isolation) describes the sandbox each request gets. Log x-request-id from each response; it is the handle for support when a specific document misbehaves.'
      },
      {
        kicker: 'Cache as a buffer',
        title: 'Consumers download from the cache, not from the renderer.',
        body: 'Each response is cached with its own ttl, so the batch renders once and the downloads, emails or previews that follow are cache hits. Cache hits do not count against your quota.',
        note: 'When not to: a handful of documents a day does not need a batch pattern; a single request per document as the need arises is simpler and fits the free tier. For text pipelines, [bulk Markdown conversion](/use-cases/website-to-markdown/bulk-conversion) is the lighter output.'
      }
    ]
  },
  faq: [
    {
      question: 'How many PDFs can I generate in parallel?',
      answer:
        'There is no per-second throttling; you can perform as many parallel requests as your quota allows. Use a bounded pool on your side, for example 20 concurrent requests, to keep your memory and the target site under control.'
    },
    {
      question: 'What is the time limit for each PDF in a batch?',
      answer:
        'The request timeout is 30 seconds on the free endpoint and 60 seconds on Pro plans, and values above the plan ceiling are capped. A very long or heavy page that exceeds it fails for that document only, with EPDFTOOLARGE when the PDF cannot be rendered in time. Lower pdf.scale or split the source into shorter pages.'
    },
    {
      question: 'How do I handle failures inside a bulk PDF job?',
      answer:
        'Set retry to 3 so transient browser errors are retried server-side, then catch errors per document in your code instead of letting one rejection end the batch. A failed render returns an error code such as EBRWSRTIMEOUT or EPDFTOOLARGE that you can log and requeue. Do not retry configuration errors such as EINVALURL or EAUTH.'
    },
    {
      question: 'Are the generated PDFs stored for me after the batch?',
      answer:
        'Each response is cached for its ttl: 24 hours by default and up to 31 days on Pro plans, so repeat requests return the same hosted document. Treat that as a delivery buffer, and copy the files into your own storage when you need them longer.'
    },
    {
      question: 'Do repeated PDF requests for the same URL use up my quota?',
      answer:
        'No. Cache hits do not count against your quota, so re-running a batch inside the ttl only pays for the documents that are new. Pass force to regenerate a specific PDF when the underlying page changed, and check the x-cache-status header to confirm a HIT, MISS or BYPASS.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to render',
    headlineAccent: 'PDFs in bulk',
    body: 'No browser fleet, no queue to babysit. Pick a Pro plan sized for your batch and generate your first thousand documents tonight.',
    href: '/pdf',
    label: 'Start a batch'
  },
  howTo: {
    name: 'How to generate PDFs in bulk from a list of URLs',
    steps: [
      {
        title: 'Map the URLs to PDF requests',
        description:
          'Send one PDF request per URL in parallel, with retry set to 3, a filename per document and any authentication forwarded as an x-api-header-* header.'
      },
      {
        title: 'Bound the concurrency',
        description:
          'Run the requests through a small worker pool, for example 20 at a time, and catch errors per document so a failed render is logged and requeued.'
      },
      {
        title: 'Cache and collect the documents',
        description:
          'Set ttl so each response stays cached while downstream jobs download it, then copy the hosted files into your own storage for long-term retention.'
      }
    ]
  }
}
