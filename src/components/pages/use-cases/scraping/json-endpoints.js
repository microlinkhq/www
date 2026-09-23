export const CONTENT = {
  slug: 'scraping/json-endpoints',
  head: {
    title: 'Fetch and cache JSON APIs with one request',
    description:
      'Fetch JSON from any URL without a browser, keep its original shape and serve repeat calls from a cache you control, from 1 minute to 31 days.'
  },
  hero: {
    title: 'Fetch a JSON endpoint and cache the response for every repeat call',
    intro:
      'To fetch JSON from a URL through an API, you want the body parsed, the shape untouched and repeat calls answered from cache. Public datasets, third-party APIs with tight rate limits, config files and the JSON endpoints behind a single-page app all fit the pattern. The [Scraping API](/features/scraping) reads them with one rule and caches the result.',
    cta: { label: 'Start with the Scraping API', href: '/features/scraping' }
  },
  problem: {
    eyebrow: 'The problem',
    title: 'Every client that calls a slow JSON API pays for it again',
    paragraphs: [
      'A dashboard that reads a public API on every page view, a build step that pulls the same dataset a hundred times, a frontend that hits a rate-limited endpoint directly: each request goes all the way to the origin, waits for it and burns its quota, even when the answer has not changed in hours.',
      'The usual fix is a small caching service in front of the API. Now you run a server, choose a store, write expiry logic and handle the stampede when a popular key expires. Treating the endpoint as a web page to scrape is worse: a browser wraps the JSON in markup that you then have to strip.',
      'A rule with attr: \'json\' parses the response body with JSON.parse and returns it with its original shape, no URL rewriting and no value normalization. prerender: false fetches it without a browser, and every response is cached for 24 hours by default, tunable with [ttl](/docs/api/parameters/ttl) and served stale while refreshing with staleTtl.'
    ],
    live: {
      label: 'Open the live parsed JSON',
      request: {
        url: 'https://pokeapi.co/api/v2/pokemon',
        params: {
          data: { content: { attr: 'json' } },
          meta: false,
          prerender: false
        }
      }
    }
  },
  how: {
    title: 'How to scrape a JSON endpoint and cache the response',
    intro:
      'One rule reads the body, two options control freshness. The [extract JSON section](/docs/guides/data-extraction/defining-rules#extract-json) of the defining rules guide documents the parsing behavior.',
    steps: [
      {
        label: '1 · Parse the endpoint',
        sdk: "const { content } = await microlink.extract(\n  'https://pokeapi.co/api/v2/pokemon',\n  { content: { attr: 'json' } },\n  { prerender: false }\n)\n\nconsole.log(content.count, content.results.length)",
        note: 'content is the parsed body as native objects and arrays. Microlink reads the body directly, or the contents of a pre element when a browser wrapped it, so the rule works either way.'
      },
      {
        label: '2 · Cache it for a day, refresh in the background',
        sdk: "const { content } = await microlink.extract(\n  'https://pokeapi.co/api/v2/pokemon',\n  { content: { attr: 'json' } },\n  { prerender: false, ttl: '1d', staleTtl: 0 }\n)",
        note: 'ttl keeps the response for a day and [staleTtl](/docs/api/parameters/staleTtl) 0 serves the cached copy instantly while a fresh one is generated in the background. Both are Pro options.'
      },
      {
        label: '3 · Keep only the part you need',
        request: {
          url: 'https://pokeapi.co/api/v2/pokemon',
          params: {
            data: { content: { attr: 'json' } },
            meta: false,
            prerender: false,
            filter: 'content.results'
          }
        },
        note: '[filter](/docs/api/parameters/filter) with dot notation trims the payload to content.results, so a large endpoint returns only the array your client reads.'
      }
    ],
    params: [
      {
        name: 'attr',
        href: '/docs/sdk/methods/extract/attr',
        note: 'json parses the whole body. It is whole-page only and cannot be combined with selector.'
      },
      {
        name: 'prerender',
        href: '/docs/api/parameters/prerender',
        note: 'false fetches the endpoint with a plain HTTP request, no browser.'
      },
      {
        name: 'ttl',
        href: '/docs/api/parameters/ttl',
        note: 'How long the response stays cached, from 1 minute to 31 days. Default 24 hours. Pro plans.'
      },
      {
        name: 'staleTtl',
        href: '/docs/api/parameters/staleTtl',
        note: 'Serves the stale copy while revalidating in the background. Cannot exceed ttl. Pro plans.'
      },
      {
        name: 'filter',
        href: '/docs/api/parameters/filter',
        note: 'Keeps only the listed fields of the response, with dot notation for nested ones.'
      },
      {
        name: 'force',
        href: '/docs/api/parameters/force',
        note: 'Bypasses the cache for one request when you need the origin’s current answer.'
      }
    ],
    outro:
      'The x-cache-status response header reads HIT when a response came from cache and MISS when it was fetched fresh, and x-cache-ttl shows the effective lifetime. The [caching patterns guide](/docs/guides/common/caching) lists every cache header and recommended TTLs by content type.'
  },
  why: {
    title: 'Why a cached JSON fetch beats running your own caching proxy',
    intro:
      'The cache, the expiry and the background refresh are already there. You pick the lifetime per request instead of deploying a service to hold it.',
    cards: [
      {
        kicker: 'Shape preserved',
        title: 'The JSON comes back exactly as the origin sent it.',
        body: 'No URL rewriting, no array compaction, no value normalization. Strings that look like HTML pass through unchanged, and the parsed value can be any JSON type, not just an object.',
        note: 'When the JSON sits inside an HTML page instead of a dedicated endpoint, go back to selectors in [scrape any website to JSON](/use-cases/scraping/website-to-json).'
      },
      {
        kicker: 'Cache included',
        title: 'Repeat calls are served from the edge.',
        body: 'The first request creates a shared copy, and later requests are served from it and from the nearest edge node. Cache hits never count against your quota, so a popular endpoint costs roughly one request per cache window.',
        note: 'Rate-limited or slow upstreams benefit most. For crawl-scale refresh schedules, [bulk Markdown conversion with caching](/use-cases/website-to-markdown/bulk-conversion) shows ttl and staleTtl at volume.'
      },
      {
        kicker: 'Private endpoints too',
        title: 'Forward a token without putting it in the URL.',
        body: 'Authenticated APIs take the same rule. Send the token as an x-api-header-authorization request header on Pro and the target receives it as a regular authorization header.',
        note: 'When not to: an endpoint you own is better cached with its own HTTP cache headers. For per-user APIs, cached copies are keyed by URL and query parameters, not by token, so read [scraping behind a login](/use-cases/scraping/behind-login) and add a cacheKey per user.'
      }
    ]
  },
  faq: [
    {
      question: 'How do I fetch JSON from a URL through the API?',
      answer:
        'Send the endpoint URL with a data rule that has attr: \'json\' and no selector, plus prerender: false. The response field holds the parsed JSON with its original shape.'
    },
    {
      question: 'Can I combine attr json with a CSS selector?',
      answer:
        'No. json is whole-page only and always parses the entire response body. To read JSON embedded in an HTML page, use an evaluate rule or a selector with attr text and parse it on your side.'
    },
    {
      question: 'How long are cached API responses kept?',
      answer:
        'Every response is cached for 24 hours by default. On a Pro plan, ttl sets any lifetime from 1 minute to 31 days, staleTtl serves the cached copy while refreshing it, and force: true skips the cache for a single request.'
    },
    {
      question: 'Do cached JSON responses count against my quota?',
      answer:
        'No. Cache hits never count against your quota. Only the requests that go to the origin do, so a long ttl on a popular endpoint keeps usage close to one request per cache window.'
    },
    {
      question: 'Can I trim a large JSON API response to the fields I need?',
      answer:
        'Yes. Add filter with a dot-notation path such as content.results or content.count, and the payload keeps only those fields. [Delivery and response shaping](/docs/guides/data-extraction/delivery-and-response) compares filter with the other response models.'
    }
  ],
  cta: {
    headlinePrefix: 'Ready to cache',
    headlineAccent: 'any JSON endpoint',
    body: 'Parsed JSON with its shape intact and a cache you set per request. Start on the free tier and add ttl when you move to Pro.',
    href: '/features/scraping',
    label: 'Fetch a JSON endpoint'
  },
  howTo: {
    name: 'How to fetch and cache a JSON endpoint',
    steps: [
      {
        title: 'Parse the endpoint',
        description:
          'Send the endpoint URL with a rule that has attr json and no selector, and set prerender false to skip the browser.'
      },
      {
        title: 'Set the cache lifetime',
        description:
          'Add ttl with the lifetime you want and staleTtl 0 to serve the cached copy while it refreshes in the background.'
      },
      {
        title: 'Trim the payload',
        description:
          'Add filter with a dot-notation path such as content.results so the response keeps only the part of the JSON your client reads.'
      }
    ]
  }
}
