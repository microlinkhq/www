export const ALTERNATIVE_GROUPS = [
  {
    id: 'browsers',
    accent: 'blue9',
    title: 'Browsers and scraping',
    caption:
      'Running a headless browser yourself, renting one by the hour, or paying per credit for a scraping API.',
    alternatives: [
      {
        slug: 'puppeteer',
        name: 'Puppeteer',
        summary:
          'Keep the Chrome output, drop the Chrome fleet: binaries, memory, queues and retries.'
      },
      {
        slug: 'playwright',
        name: 'Playwright',
        summary:
          'Keep Playwright for tests. Move production screenshots, PDFs and scraping to one request.'
      },
      {
        slug: 'browserbase',
        name: 'Browserbase',
        summary: 'Rendered output in one call, with no remote session to drive.'
      },
      {
        slug: 'cloudflare',
        name: 'Cloudflare Browser Rendering',
        shortName: 'Cloudflare',
        summary: 'A screenshot URL with cache, proxy and adblock built in.'
      },
      {
        slug: 'scrapingbee',
        name: 'ScrapingBee',
        summary:
          'One call is one request, so plan size is page count. No credit multipliers.'
      },
      {
        slug: 'scraperapi',
        name: 'ScraperAPI',
        summary:
          'The same price for every URL, rendered or proxied, whatever the domain.'
      }
    ]
  },
  {
    id: 'ai-data',
    accent: 'violet7',
    title: 'Markdown and AI data',
    caption: 'Clean page content for LLMs, agents and retrieval pipelines.',
    alternatives: [
      {
        slug: 'firecrawl',
        name: 'Firecrawl',
        summary: 'LLM-ready markdown at one flat price per request.'
      },
      {
        slug: 'jina-reader',
        name: 'Jina Reader',
        summary:
          'One request per call whatever the page length, every format in one response.'
      },
      {
        slug: 'context-dev',
        name: 'Context.dev',
        summary:
          'Metadata, logo, palette, markdown and screenshot billed as one request.'
      },
      {
        slug: 'serpapi',
        name: 'SerpApi',
        summary:
          'Google results as JSON across 10 surfaces, with no hourly throughput cap.'
      }
    ]
  },
  {
    id: 'screenshots',
    accent: 'teal8',
    title: 'Screenshot APIs',
    caption:
      'Same request, same URL, same output format, compared on speed, price and what else comes back.',
    alternatives: [
      {
        slug: 'apiflash',
        name: 'ApiFlash',
        summary:
          'Production screenshot workloads with metadata and PDF in the same call.'
      },
      {
        slug: 'screenshotone',
        name: 'ScreenshotOne',
        summary: 'Faster cold starts on the same screenshot request.'
      },
      {
        slug: 'urlbox',
        name: 'Urlbox',
        summary: 'A lower cost per render for the same capture.'
      },
      {
        slug: 'screenshotapi',
        name: 'ScreenshotAPI',
        summary:
          'Screenshots, metadata and link previews billed as one request each.'
      },
      {
        slug: 'screenshotmachine',
        name: 'Screenshot Machine',
        summary:
          'Screenshots plus PDF, metadata and browser automation from the same API.'
      },
      {
        slug: 'screenshotlayer',
        name: 'Screenshotlayer',
        summary: '46,000 requests for $49 against 30,000 snapshots for $59.99.'
      },
      {
        slug: 'thumio',
        name: 'Thum.io',
        summary:
          'Full-page and element screenshots plus PDFs, with timing measured to the final image.'
      },
      {
        slug: 'url2png',
        name: 'URL2PNG',
        summary: '46,000 requests for $49 against 50,000 screenshots for $199.'
      }
    ]
  },
  {
    id: 'previews',
    accent: 'orange8',
    title: 'Link previews, embeds and logos',
    caption: 'Metadata, rich embeds and brand assets for any URL.',
    alternatives: [
      {
        slug: 'clearbit',
        name: 'Clearbit Logo API',
        shortName: 'Clearbit',
        summary:
          'logo.clearbit.com is gone. Resolve any site’s logo and brand colors on your server.'
      },
      {
        slug: 'embedly',
        name: 'Embedly',
        summary:
          'One shared request bucket for embeds, metadata and screenshots, at a lower per-URL price.'
      },
      {
        slug: 'iframely',
        name: 'Iframely',
        summary: 'Embeds, metadata and screenshots from one per-request quota.'
      }
    ]
  }
]

export const alternativeHref = slug => `/alternative/${slug}`

export const ALTERNATIVES = ALTERNATIVE_GROUPS.flatMap(
  ({ alternatives }) => alternatives
)

export const ALTERNATIVES_INDEX_HREF = '/alternative'

export const footerAlternativeLinks = () => [
  { label: 'All comparisons', href: ALTERNATIVES_INDEX_HREF },
  ...ALTERNATIVES.map(({ slug, name, shortName = name }) => ({
    label: `vs ${shortName}`,
    href: alternativeHref(slug)
  })).sort((a, b) => a.label.localeCompare(b.label))
]
