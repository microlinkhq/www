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
    text: 'Normalized metadata by default: title, description, image, logo, and more. The same request can also return a screenshot, PDF, markdown, HTML, iframe embed, or the return value of a browser function.',
    answer: (
      <>
        <div>
          Normalized metadata by default: title, description, image, logo, and
          more.
        </div>
        <div>
          The same request can also return a screenshot, PDF, markdown, HTML,
          iframe embed, or the return value of a browser function. See{' '}
          <Link href='/docs/api/getting-started/overview'>the docs</Link> for
          every parameter.
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
    text: 'The API reference lives at /docs/api/getting-started/overview. Guides cover workflows. OpenAPI is at /openapi.json.',
    answer: (
      <>
        <div>
          The API reference lives in the{' '}
          <Link href='/docs/api/getting-started/overview'>docs</Link>.
        </div>
        <div>
          <Link href='/docs/guides'>Guides</Link> cover workflows. The{' '}
          <Link href='/openapi.json'>OpenAPI spec</Link> is machine-readable.
        </div>
      </>
    )
  },
  {
    question: 'Do you offer an enterprise API?',
    text: 'Yes. Business is Pro with invoicing, net 30, NDA, DPA, and a named contact. Enterprise is a dedicated environment with your own endpoint, browser pool, storage, and CDN, plus service credits behind the 99.9% uptime SLA every paid plan gets.',
    answer: (
      <>
        <div>
          Yes. Business is Pro with invoicing, net 30, NDA, DPA, and a named
          contact.
        </div>
        <div>
          Enterprise is a dedicated environment with your own endpoint, browser
          pool, storage, and CDN, plus service credits behind the 99.9% uptime
          SLA every paid plan gets. See{' '}
          <Link href='/enterprise'>Business & Enterprise</Link>.
        </div>
      </>
    )
  }
]
