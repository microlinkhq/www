import React from 'react'

import { Link } from 'components/elements/Link'

export const FAQ_ITEMS = [
  {
    question: 'What is the Microlink API?',
    text: 'A REST API that turns any URL into structured data. Call pro.microlink.io with your free API key. Metadata is returned by default. Add query parameters for screenshots, PDFs, markdown, embeds, or a browser function.',
    answer: (
      <>
        <div>
          A REST API that turns any URL into structured data. Call{' '}
          <Link href='/docs/api/basics/endpoint'>pro.microlink.io</Link> with
          your free API key.
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
    text: 'Yes, and it is free: sign up and you get 100 requests per month with every Pro feature, Search included, no credit card. Paid plans add volume.',
    answer: (
      <>
        <div>
          Yes, and it is free: sign up and you get 100&nbsp;requests per month
          with every Pro feature, Search included, no credit card.
        </div>
        <div>
          The key includes <Link href='/search'>Search</Link>,{' '}
          <Link href='/features/proxy'>proxy</Link>,{' '}
          <Link href='/features/headers'>custom headers</Link>, and{' '}
          <Link href='/features/ttl'>configurable TTL</Link>. A{' '}
          <Link href='/pricing'>paid plan</Link> adds volume.
        </div>
      </>
    )
  },
  {
    question: 'What can I get from one request?',
    text: 'Normalized metadata by default: title, description, image, logo, and more, except when function is the only requested output. Set meta=true to include metadata for a function-only request. The same request can also return a screenshot, PDF, markdown, HTML, iframe embed, or the return value of a browser function. When you only need a screenshot, PDF, markdown, HTML, or iframe, add meta=false to skip metadata, which is usually the biggest speedup.',
    answer: (
      <>
        <div>
          Normalized metadata by default: title, description, image, logo, and
          more, except when function is the only requested output. Set{' '}
          <b>meta=true</b> to include metadata for a function-only request.
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
          When you only need a screenshot, PDF, markdown, HTML, or iframe, add{' '}
          <b>meta=false</b> to skip metadata, which is usually the biggest
          speedup. More in{' '}
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
    text: 'You do not run browsers, proxies, caches, or a fleet. Pages that need rendering run in an isolated browser, every API key brings a residential proxy for sites that block you, and responses are cached at the edge. Cache hits are free.',
    answer: (
      <>
        <div>You do not run browsers, proxies, caches, or a fleet.</div>
        <div>
          Pages that need rendering run in an{' '}
          <Link href='/features/isolation'>isolated browser</Link>, every API
          key brings a <Link href='/features/proxy'>residential proxy</Link> for
          sites that block you, and responses are cached at the{' '}
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
    text: 'Every response is cached for 24 hours by default, and the x-cache-status header tells you whether it was a MISS or a HIT. Cache hits are free and fast. Add force to skip the cache. With any API key, ttl sets anything from 1 minute to 31 days and staleTtl serves the cached copy while a fresh one is fetched.',
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
          With any API key, <Link href='/features/ttl'>ttl</Link> sets anything
          from 1 minute to 31 days and{' '}
          <Link href='/docs/api/parameters/staleTtl'>staleTtl</Link> serves the
          cached copy while a fresh one is fetched. See the{' '}
          <Link href='/docs/guides/common/caching'>caching guide</Link>.
        </div>
      </>
    )
  },
  {
    question: 'What happens when a site blocks the request?',
    text: 'On the keyless endpoint, a site behind antibot protection returns the EPROXYNEEDED error. With an API key, Microlink names the antibot or CAPTCHA provider that blocked you and retries the same request through a residential proxy automatically.',
    answer: (
      <>
        <div>
          On the keyless endpoint, a site behind antibot protection returns the{' '}
          <b>EPROXYNEEDED</b> error.
        </div>
        <div>
          With an API key, Microlink{' '}
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
    text: '100 requests per month on every product, Search included, with every Pro feature and no credit card. Adblock and cookie-banner dismissal are on by default. Paid plans add quota.',
    answer: (
      <>
        <div>
          100&nbsp;requests per month on every product, Search included, with
          every Pro feature and no credit card.
        </div>
        <div>
          <Link href='/features/adblock'>Adblock</Link> and cookie-banner
          dismissal are on by default. Paid plans add quota. See{' '}
          <Link href='/pricing'>pricing</Link>.
        </div>
      </>
    )
  },
  {
    question: 'How do I know how much quota is left?',
    text: 'All requests return x-rate-limit-limit, x-rate-limit-remaining, and x-rate-limit-reset. The keyless endpoint reports the daily window. With an API key the response reports your plan quota, resets at the start of the next month in UTC, and can lag the live counter by a few minutes. Past the limit you get HTTP 429 with the ERATE code. There is no throttling, so parallel requests are fine within your quota. On paid plans you are notified at 80% of your plan, and requests pause at 100% with no overage fees.',
    answer: (
      <>
        <div>
          All requests return <b>x-rate-limit-limit</b>,{' '}
          <b>x-rate-limit-remaining</b>, and <b>x-rate-limit-reset</b>. The
          keyless endpoint reports the daily window. With an API key the
          response reports your plan quota, resets at the start of the next
          month in UTC, and can lag the live counter by a few minutes. Past the
          limit you get HTTP 429 with the ERATE code.
        </div>
        <div>
          There is no throttling, so parallel requests are fine within your
          quota. On paid plans you are notified at 80% of your plan, and
          requests pause at 100% with no overage fees. See{' '}
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
    text: 'Send your API key as the x-api-key request header to https://pro.microlink.io. Do not put the key in frontend code. Use a proxy that allowlists your domains.',
    answer: (
      <>
        <div>
          Send your API key as the <b>x-api-key</b> request header to{' '}
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
