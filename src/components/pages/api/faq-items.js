import React from 'react'

import { Link } from 'components/elements/Link'

export const FAQ_ITEMS = [
  {
    question: 'What is the Microlink API?',
    text: 'A REST API that turns any URL into structured data. Call api.microlink.io on the free plan, or pro.microlink.io with an API key. Metadata is returned by default. Add query parameters for screenshots, PDFs, markdown, embeds, or a browser function.',
    answer: (
      <>
        <div>
          A REST API that turns any URL into structured data. Call{' '}
          <Link href='https://api.microlink.io'>api.microlink.io</Link> on the
          free plan, or{' '}
          <Link href='/docs/api/basics/endpoint'>pro.microlink.io</Link> with an
          API key.
        </div>
        <div>
          Metadata is returned by default. Add query parameters for{' '}
          <Link href='/screenshot'>screenshots</Link>,{' '}
          <Link href='/pdf'>PDFs</Link>, <Link href='/markdown'>markdown</Link>,{' '}
          <Link href='/embed'>embeds</Link>, or a{' '}
          <Link href='/function'>browser function</Link>.
        </div>
      </>
    )
  },
  {
    question: 'Do I need an API key?',
    text: 'Not to start. The free plan is 25 requests per day with no key and no credit card. A Pro key unlocks Search, higher quota, proxy, custom headers, and configurable TTL.',
    answer: (
      <>
        <div>
          Not to start. The free plan is 25 requests per day with no key and no
          credit card.
        </div>
        <div>
          A <Link href='/pricing'>Pro</Link> key unlocks{' '}
          <Link href='/search'>Search</Link>, higher quota,{' '}
          <Link href='/features/proxy'>proxy</Link>,{' '}
          <Link href='/features/headers'>custom headers</Link>, and{' '}
          <Link href='/features/ttl'>configurable TTL</Link>.
        </div>
      </>
    )
  },
  {
    question: 'What can I get from one request?',
    text: 'Normalized metadata by default: title, description, image, logo, and more. The same request can also return a screenshot, PDF, markdown, HTML, iframe embed, or the return value of a browser function. When you only need one of those, add meta=false to skip metadata, which is usually the biggest speedup.',
    answer: (
      <>
        <div>
          Normalized metadata by default: title, description, image, logo, and
          more.
        </div>
        <div>
          The same request can also return a screenshot, PDF, markdown, HTML,
          iframe embed, or the return value of a browser function. See{' '}
          <Link href='/docs/guides/what-is-microlink#combine-workflows-in-one-call'>
            combining workflows
          </Link>
          .
        </div>
        <div>
          When you only need one of those, add <b>meta=false</b> to skip
          metadata, which is usually the biggest speedup. More in{' '}
          <Link href='/docs/guides/common/production-patterns'>
            production patterns
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'What does a response look like?',
    text: 'JSON with a status field: success, fail for a problem with the request, or error for a server-side issue. The payload lives in data. Failed requests add a code such as EINVALURL or ERATE and a human-readable message.',
    answer: (
      <>
        <div>
          JSON with a <b>status</b> field: success, fail for a problem with the
          request, or error for a server-side issue. The payload lives in{' '}
          <b>data</b>.
        </div>
        <div>
          Failed requests add a <b>code</b> such as EINVALURL or ERATE and a
          human-readable message. See the{' '}
          <Link href='/docs/api/basics/format'>response format</Link> and{' '}
          <Link href='/docs/api/basics/error-codes'>error codes</Link>.
        </div>
      </>
    )
  },
  {
    question: 'Can I use the API URL directly as an image or file?',
    text: 'Yes. Add embed with the field you want, such as embed=screenshot.url, and the API answers with that asset instead of JSON. The request URL then works as an img src, an og:image, or a PDF download link. Keep API keys out of those URLs.',
    answer: (
      <>
        <div>
          Yes. Add <Link href='/docs/api/parameters/embed'>embed</Link> with the
          field you want, such as <b>embed=screenshot.url</b>, and the API
          answers with that asset instead of JSON.
        </div>
        <div>
          The request URL then works as an img src, an og:image, or a PDF
          download link. Keep API keys out of those URLs. See{' '}
          <Link href='/docs/guides/screenshot/embedding'>
            embedding screenshots
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'How is this different from running Puppeteer myself?',
    text: 'You do not run browsers, proxies, caches, or a fleet. Pages that need rendering run in an isolated browser, Pro adds a residential proxy when a site blocks you, and responses are cached at the edge. Cache hits are free.',
    answer: (
      <>
        <div>You do not run browsers, proxies, caches, or a fleet.</div>
        <div>
          Pages that need rendering run in an{' '}
          <Link href='/features/isolation'>isolated browser</Link>, Pro adds a{' '}
          <Link href='/features/proxy'>residential proxy</Link> when a site
          blocks you, and responses are cached at the{' '}
          <Link href='/features/ttl'>edge</Link>. Cache hits are free.
        </div>
      </>
    )
  },
  {
    question: 'When is Microlink not the right fit?',
    text: 'When you need to crawl thousands of pages by following links, drive a live browser session interactively, or fetch static HTML that needs no rendering. A crawler, a local Puppeteer or Playwright instance, or a plain HTTP client fits those better.',
    answer: (
      <>
        <div>
          When you need to crawl thousands of pages by following links, drive a
          live browser session interactively, or fetch static HTML that needs no
          rendering.
        </div>
        <div>
          A crawler, a local Puppeteer or Playwright instance, or a plain HTTP
          client fits those better. See{' '}
          <Link href='/docs/guides/what-is-microlink#when-something-else-is-better'>
            when something else is better
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'How does caching work?',
    text: 'Every response is cached for 24 hours by default, and the x-cache-status header tells you whether it was a MISS or a HIT. Cache hits are free and fast. Add force to skip the cache. On Pro, ttl sets anything from 1 minute to 31 days and staleTtl serves the cached copy while a fresh one is fetched.',
    answer: (
      <>
        <div>
          Every response is cached for 24 hours by default, and the{' '}
          <b>x-cache-status</b> header tells you whether it was a MISS or a HIT.
          Cache hits are free and fast. Add{' '}
          <Link href='/docs/api/parameters/force'>force</Link> to skip the
          cache.
        </div>
        <div>
          On Pro, <Link href='/features/ttl'>ttl</Link> sets anything from 1
          minute to 31 days and{' '}
          <Link href='/docs/api/parameters/staleTtl'>staleTtl</Link> serves the
          cached copy while a fresh one is fetched. See the{' '}
          <Link href='/docs/guides/common/caching'>caching guide</Link>.
        </div>
      </>
    )
  },
  {
    question: 'What happens when a site blocks the request?',
    text: 'On the free plan, a site behind antibot protection returns the EPROXYNEEDED error. On Pro, Microlink names the antibot or CAPTCHA provider that blocked you and retries the same request through a residential proxy automatically.',
    answer: (
      <>
        <div>
          On the free plan, a site behind antibot protection returns the{' '}
          <b>EPROXYNEEDED</b> error.
        </div>
        <div>
          On Pro, Microlink{' '}
          <Link href='/features/antibot'>
            names the antibot or CAPTCHA provider
          </Link>{' '}
          that blocked you and retries the same request through a{' '}
          <Link href='/features/proxy'>residential proxy</Link> automatically.
          See the <Link href='/docs/guides/common/proxy'>proxy guide</Link>.
        </div>
      </>
    )
  },
  {
    question: 'What is included on the free plan?',
    text: '25 requests per day on every product except Search, no credit card. Adblock and cookie-banner dismissal are on by default. Pro adds Search, quota, proxy, custom headers, and configurable TTL.',
    answer: (
      <>
        <div>
          25 requests per day on every product except Search, no credit card.
        </div>
        <div>
          <Link href='/features/adblock'>Adblock</Link> and cookie-banner
          dismissal are on by default. Pro adds Search, quota, proxy, custom
          headers, and configurable TTL. See{' '}
          <Link href='/pricing'>pricing</Link>.
        </div>
      </>
    )
  },
  {
    question: 'How do I know how much quota is left?',
    text: 'All requests return x-rate-limit-limit, x-rate-limit-remaining, and x-rate-limit-reset. The free endpoint reports the daily window. Pro reports your plan quota, resets at the start of the next month in UTC, and can lag the live counter by a few minutes. Past the limit you get HTTP 429 with the ERATE code. There is no throttling, so parallel requests are fine within your quota. On Pro you are notified at 80% of your plan, and requests pause at 100% with no overage fees.',
    answer: (
      <>
        <div>
          All requests return <b>x-rate-limit-limit</b>,{' '}
          <b>x-rate-limit-remaining</b>, and <b>x-rate-limit-reset</b>. The free
          endpoint reports the daily window. Pro reports your plan quota, resets
          at the start of the next month in UTC, and can lag the live counter by
          a few minutes. Past the limit you get HTTP 429 with the ERATE code.
        </div>
        <div>
          There is no throttling, so parallel requests are fine within your
          quota. On Pro you are notified at 80% of your plan, and requests pause
          at 100% with no overage fees. See{' '}
          <Link href='/docs/guides/common/production-patterns#handle-rate-limits-gracefully'>
            handling rate limits
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'How do I authenticate?',
    text: 'Send your Pro token as the x-api-key request header to https://pro.microlink.io. Do not put the key in frontend code. Use a proxy that allowlists your domains.',
    answer: (
      <>
        <div>
          Send your Pro token as the <b>x-api-key</b> request header to{' '}
          <Link href='https://pro.microlink.io'>pro.microlink.io</Link>.
        </div>
        <div>
          Do not put the key in frontend code. Use a proxy that allowlists your
          domains, as shown in{' '}
          <Link href='/docs/api/basics/authentication'>authentication</Link>.
        </div>
      </>
    )
  },
  {
    question: 'Where is the documentation?',
    text: 'The API reference lives at /docs/api/getting-started/overview. Guides cover workflows, starting with what Microlink is and how a request works. The SDK has its own docs, and OpenAPI is at /openapi.json.',
    answer: (
      <>
        <div>
          The API reference lives in the{' '}
          <Link href='/docs/api/getting-started/overview'>docs</Link>.
        </div>
        <div>
          <Link href='/docs/guides'>Guides</Link> cover workflows, starting with{' '}
          <Link href='/docs/guides/what-is-microlink'>what Microlink is</Link>{' '}
          and how a request works. The{' '}
          <Link href='/docs/sdk/getting-started/overview'>SDK</Link> has its own
          docs, and the <Link href='/openapi.json'>OpenAPI spec</Link> is
          machine-readable.
        </div>
      </>
    )
  },
  {
    question: 'Do you offer an enterprise API?',
    text: 'Yes. Business is Pro with invoicing, net 30, NDA, DPA, and a named contact. Enterprise is a dedicated environment with your own endpoint, browser pool, storage, and CDN. Every paid plan has a 99.9% uptime SLA, and only Enterprise backs it with service credits.',
    answer: (
      <>
        <div>
          Yes. Business is Pro with invoicing, net 30, NDA, DPA, and a named
          contact.
        </div>
        <div>
          Enterprise is a dedicated environment with your own endpoint, browser
          pool, storage, and CDN. Every paid plan has a 99.9% uptime SLA, and
          only Enterprise backs it with service credits. See{' '}
          <Link href='/enterprise'>Business & Enterprise</Link>.
        </div>
      </>
    )
  }
]
