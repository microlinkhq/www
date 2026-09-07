import React from 'react'
import { colors } from 'theme'
import {
  Cpu as CpuIcon,
  Package as PackageIcon,
  Zap as ZapIcon,
  Terminal as TerminalIcon,
  Activity as ActivityIcon
} from 'react-feather'

import { Link } from 'components/elements/Link'

export const ACCENT = colors.indigo8
export const TILE_BG = colors.indigo0

export const TIMINGS_ACCENT = `radial-gradient(
  circle at center right,
  ${colors.gray9} 0%,
  ${colors.gray9} 48%,
  ${colors.indigo9} 48%,
  ${colors.indigo9} 52%,
  ${colors.indigo8} 52%,
  ${colors.indigo8} 65%,
  ${colors.indigo7} 65%,
  ${colors.indigo7} 79%,
  ${ACCENT} 79%,
  ${ACCENT} 100%
)`

export const HERO = {
  title: 'Browser functions API for developers',
  description:
    'Send JavaScript, get the return value. A sandbox runs your code with npm on the fly — a browser boots only when the function touches the page.',
  ctaHref: '/docs/guides/function',
  ctaLabel: 'Get Started',
  editorHeight: 300,
  examples: [
    {
      label: 'DOM handling',
      mqlCode: {
        url: 'https://news.ycombinator.com',
        function: `async ({ page }) => {
  const cheerio = require('cheerio')
  const $ = cheerio.load(await page.content())
  return $('.titleline > a')
    .map((i, el) => $(el).text())
    .toArray()
}`,
        meta: false
      }
    },
    {
      label: 'Page interaction',
      mqlCode: {
        url: 'https://example.com',
        function: `async ({ page }) => {
  await page.click('button.load-more')
  await page.waitForSelector('.results')
  return page.$$eval('.results li', items =>
    items.map(el => el.textContent.trim())
  )
}`,
        meta: false
      }
    },
    {
      label: 'Profiling',
      mqlCode: {
        url: 'https://example.com',
        function: '({ page }) => page.title()',
        binding: '{ profiling }',
        meta: false
      }
    }
  ]
}

export const TIMINGS = {
  title: 'Send the function',
  subtitle: 'Get the value back',
  stats: [
    { healthcheckKey: 'meta', label: 'P95 cold response' },
    { value: '99.9', unit: '%', label: 'SLA Guaranteed' }
  ]
}

export const CAPABILITIES = {
  title: 'Write a function.',
  titleAccent: 'Get a value.',
  titleBreak: true,
  caption:
    'CSS selectors stop being enough the moment you need to click, wait, compute, or pull in a package. microlink.run() ships your JavaScript to a sandbox and returns whatever the function returns.',
  items: [
    {
      icon: ZapIcon,
      title: 'Browser only when needed',
      description:
        'Skip page and Chrome never starts. Reference it and you get the full Puppeteer page — clicks, waits, evaluation — after the URL has loaded.'
    },
    {
      icon: PackageIcon,
      title: 'require() any npm package',
      description:
        'Dependencies are detected in your code, installed on the fly, and cached for later runs. Pin a version with require("cheerio@1.0.0").'
    },
    {
      icon: TerminalIcon,
      title: 'Errors come back as values',
      description:
        'A throw does not fail the request. isFulfilled is false and value carries { name, message }, so you handle failures in your own code.'
    },
    {
      icon: ActivityIcon,
      title: 'Profiling on every run',
      description:
        'install, build, spawn, and run timings ship with the result, plus CPU and memory, so you can see where a slow function spends its time.'
    },
    {
      icon: CpuIcon,
      title: 'Start lighter when you can',
      description: (
        <>
          Declarative <Link href='/docs/guides/data-extraction'>extract</Link>{' '}
          rules are shorter when CSS selectors are enough. Escalate to{' '}
          <Link href='/docs/guides/function'>run()</Link> when they are not.
        </>
      )
    }
  ]
}

export const PRICING_CAPTION =
  'No signup, no API key, no credit card. The functions API is free to start — write a function and call the endpoint.'

export const CTA = {
  caption:
    'Get 25 requests/day with zero commitment. The functions API is free to use, with no account and no credit card. Send a function and get the value back.',
  ctaHref: '/docs/guides/function',
  ctaLabel: 'Get started free'
}

export const FAQ_CAPTION =
  'Everything you need to know about the Microlink functions API.'

export const FAQ_ITEMS = [
  {
    question: 'When does the function start a browser?',
    text: 'Only when your code references page. Without it, Microlink skips the headless browser entirely, so plain compute runs faster and cheaper. Reference page to get the full Puppeteer API for clicks, waits, and evaluation.'
  },
  {
    question: 'When should I use run() instead of extract()?',
    text: 'Start with extract() — declarative CSS-selector rules are shorter and easier to maintain. Escalate to run() when you need to click, wait, compute, or orchestrate custom logic that rules cannot express.',
    answer: (
      <>
        <div>
          Start with <Link href='/docs/guides/data-extraction'>extract()</Link>{' '}
          — declarative CSS-selector rules are shorter and easier to maintain.
        </div>
        <div>
          Escalate to <Link href='/docs/guides/function'>run()</Link> when you
          need to click, wait, compute, or orchestrate custom logic that rules
          cannot express.
        </div>
      </>
    )
  },
  {
    question: 'Can I require() npm packages?',
    text: 'Yes. Any require() call is detected, installed on the fly into the sandbox, and cached for later runs. Pin a version with require("cheerio@1.0.0"). Operations such as spawning child processes or writing outside the sandbox are not permitted.'
  },
  {
    question: 'What happens if my function throws?',
    text: 'The promise still resolves: result.isFulfilled comes back false and result.value carries the error as { name, message } so you handle failures in your own code.'
  },
  {
    question: 'Is run() available on the free plan?',
    text: 'Yes. Free runs get a 5-second timeout, 16 MB of memory, 1024 bytes of code, and one concurrent execution per IP. Pro plans extend the timeout up to 60 seconds, raise memory to 32 MB, and remove code-size and concurrency limits.'
  },
  {
    question: 'Does every call execute the function again?',
    text: 'Only on a cache miss. Set a ttl and any repeat request for the same URL and function inside that window is served from the edge cache instantly, at no cost and without running the sandbox again.'
  }
]

export const META = {
  title: 'Browser Functions API — Run JavaScript on Any Page',
  description:
    'Write a function, get a value. Run JavaScript remotely with optional Puppeteer, npm on the fly, and no browser fleet. Free to start, 25 requests/day.',
  structuredName: 'Microlink Function API',
  structuredDescription:
    'A developer-first API that runs your JavaScript in a remote sandbox with optional Puppeteer access, on-the-fly npm packages, execution profiling, and a browser that boots only when the function touches the page.',
  keywords: [
    'browser functions api',
    'run javascript remotely',
    'puppeteer api',
    'headless browser functions',
    'serverless browser automation',
    'microlink run'
  ],
  about: [
    {
      name: 'Headless browser',
      sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
    },
    {
      name: 'Puppeteer',
      sameAs: 'https://en.wikipedia.org/wiki/Puppeteer_(software)'
    },
    {
      name: 'Serverless computing',
      sameAs: 'https://en.wikipedia.org/wiki/Serverless_computing'
    }
  ]
}
