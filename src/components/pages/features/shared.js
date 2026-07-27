import React from 'react'

import { Link } from 'components/elements/Link'

export const META = {
  title: 'Features: Microlink engineering primitives',
  description:
    'Learn the shared request primitives behind every Microlink product — scraping, browser functions, automation, proxy, antibot, caching, headers, and security — and when to use each.'
}

export const TOC = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'definition', label: 'What they are' },
  { id: 'mental-model', label: 'Mental model' },
  { id: 'ladder', label: 'Lightest tool' },
  { id: 'primitives', label: 'Key primitives' },
  { id: 'why', label: 'Why it matters' },
  { id: 'next-steps', label: 'Next steps' }
]

export const HERO = {
  eyebrow: 'Engineering',
  title: 'The principles behind every Microlink product.',
  description:
    'Scraping, proxy, caching, headers, and security aren’t bolted onto one product — they’re shared primitives every Microlink request can use.'
}

export const INTRODUCTION = {
  eyebrow: 'Introduction',
  title: 'Stop stitching browsers, proxies, and parsers.',
  body: (
    <>
      Teams that extract data from the web usually assemble the same stack over
      and over: a headless browser, a proxy pool, a cache layer, custom headers
      for logins, and ad-hoc parsing. Each piece has its own vendor, failure
      mode, and bill.
      <br />
      <br />
      Microlink collapses that stack into one API. You send a URL and the
      options you need; we run the browser, apply your rules, and return a clean
      result — with the same primitives available on every product call.
    </>
  )
}

export const DEFINITION = {
  eyebrow: 'What they are',
  title: 'Shared request primitives — not product silos.',
  definition:
    'Microlink features are composable request capabilities — extraction, code execution, page control, unblocking, caching, headers, and isolation — that any product method can use on a single call.',
  body: (
    <>
      That is the difference between a toolkit of separate services and a single
      request surface. When you call{' '}
      <Link href='/features/scraping'>microlink.extract()</Link> or{' '}
      <Link href='/features/function'>microlink.run()</Link>, you can also
      attach <Link href='/features/proxy'>proxy</Link>,{' '}
      <Link href='/features/ttl'>ttl</Link>, and{' '}
      <Link href='/features/headers'>headers</Link> without switching vendors or
      writing glue code.
    </>
  )
}

export const MENTAL_MODEL = {
  eyebrow: 'Mental model',
  title: 'One request. Compose what you need.',
  body: (
    <>
      Think of every Microlink call as a pipeline you configure with options —
      not a menu of separate products you must orchestrate yourself.
    </>
  ),
  steps: [
    {
      title: 'Pick a product',
      description: (
        <>
          Start with the lightest result shape —{' '}
          <Link href='/features/scraping'>extract / links / markdown</Link>, a
          screenshot, or <Link href='/features/function'>run()</Link>.
        </>
      )
    },
    {
      title: 'Shape the page if needed',
      description: (
        <>
          Use <Link href='/features/automation'>automation options</Link> (
          <Link href='/docs/api/parameters/device'>device</Link>,{' '}
          <Link href='/docs/api/parameters/click'>click</Link>,{' '}
          <Link href='/docs/api/parameters/waitUntil'>waitUntil</Link>) when the
          page must be in a specific state before capture.
        </>
      )
    },
    {
      title: 'Reach hard targets',
      description: (
        <>
          <Link href='/features/antibot'>Detect</Link> who blocks you, then{' '}
          <Link href='/features/proxy'>resolve with proxy</Link>. Forward{' '}
          <Link href='/features/headers'>session headers</Link> when the page
          needs auth.
        </>
      )
    },
    {
      title: 'Cache and stay safe',
      description: (
        <>
          <Link href='/features/ttl'>ttl</Link> makes repeats free.{' '}
          <Link href='/features/security'>Isolation and SSRF guards</Link> apply
          on every call by default.
        </>
      )
    }
  ]
}

export const LADDER = {
  eyebrow: 'Lightest tool',
  title: 'Choose the lightest tool that works.',
  body: (
    <>
      Heavier tools cost more time and money. Start at the top of the ladder and
      step down only when the job needs it — the same rule the{' '}
      <Link href='https://github.com/microlinkhq/microlink/tree/master/packages/core'>
        Microlink SDK
      </Link>{' '}
      is built around.
    </>
  ),
  rungs: [
    {
      title: 'Products & data rules',
      description: (
        <>
          <Link href='/features/scraping'>
            links(), emails(), markdown(), extract()
          </Link>{' '}
          — named results, no custom code.
        </>
      )
    },
    {
      title: 'Declarative automation',
      description: (
        <>
          <Link href='/features/automation'>
            device, click, waitUntil, scripts
          </Link>{' '}
          — shape the page, then capture.
        </>
      )
    },
    {
      title: 'Remote functions',
      description: (
        <>
          <Link href='/features/function'>microlink.run()</Link> — full
          Puppeteer and require() when the flow is truly custom. Browser boots
          only if your code touches page.
        </>
      )
    }
  ]
}

export const PRIMITIVES = {
  eyebrow: 'Key primitives',
  title: 'Eight capabilities. One request surface.',
  description:
    'Each card is a deeper teaching page — what it is, when to use it, and how it composes with the rest.'
}

export const WHY = {
  eyebrow: 'Why it matters',
  title: 'Less glue. Uniform guarantees. Cheaper repeats.',
  items: [
    {
      title: 'One SDK, every capability',
      description: (
        <>
          <Link href='https://github.com/microlinkhq/microlink/tree/master/packages/core'>
            Microlink SDK
          </Link>{' '}
          product methods set the right API shape and unwrap the result. Options
          like proxy and ttl attach to the same call.
        </>
      )
    },
    {
      title: 'Pro capabilities compose',
      description: (
        <>
          Unblocking, secrets, and cache controls are not siloed SKUs — they
          layer onto scraping, screenshots, PDFs, and{' '}
          <Link href='/features/function'>functions</Link> alike.
        </>
      )
    },
    {
      title: 'Hits are free',
      description: (
        <>
          With <Link href='/features/ttl'>configurable TTL</Link>, cache hits
          never count against plan quota — including expensive renders.
        </>
      )
    },
    {
      title: 'Safe by default',
      description: (
        <>
          <Link href='/features/security'>Per-request isolation</Link> and SSRF
          blocking apply on every plan, with no extra configuration.
        </>
      )
    }
  ]
}

export const NEXT_STEPS = {
  eyebrow: 'Next steps',
  title: 'Pick a primitive — or try a product call.',
  description:
    'Start with the lightest tool for your job, or open the docs and playground when you want a runnable example.',
  primaryCta: {
    label: 'Open the docs',
    href: '/docs/api/getting-started/overview'
  },
  secondaryCta: {
    label: 'View pricing',
    href: '/#pricing'
  }
}
