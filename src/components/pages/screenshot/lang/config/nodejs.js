import React from 'react'
import { colors } from 'theme'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: colors.red6 }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/screenshot/nodejs'
const OG_IMAGE = 'https://cdn.microlink.io/banner/screenshot.jpeg'

const nodejs = {
  lang: 'nodejs',
  label: 'Node.js',

  meta: {
    title: 'Node.js Screenshot API — Capture Any Website in Code',
    description:
      'Take pixel-perfect website screenshots in Node.js with microlink.io. Three lines of code, no Puppeteer or Chromium to install, works on serverless & edge. Free to start.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Website Screenshot API for Node.js',
        name: 'Website Screenshot API for Node.js',
        description:
          'A developer guide to capturing website screenshots programmatically in Node.js using the microlink.io SDK — install, capture, framework integration, and serverless deployment without managing Headless Chrome.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Node.js 24+, microlink.io',
        keywords:
          'nodejs screenshot api, take screenshot node.js, website screenshot node, puppeteer alternative node, capture url node.js, microlink.io',
        author: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io',
          logo: {
            '@type': 'ImageObject',
            url: 'https://cdn.microlink.io/logo/logo.png'
          }
        },
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://microlink.io',
          url: 'https://microlink.io',
          name: 'Microlink'
        },
        about: {
          '@type': 'SoftwareApplication',
          name: 'Microlink Screenshot API',
          url: 'https://microlink.io/screenshot',
          applicationCategory: ['DeveloperApplication', 'WebAPI']
        },
        mainEntityOfPage: PAGE_URL
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Microlink',
            item: 'https://microlink.io'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Screenshot API',
            item: 'https://microlink.io/screenshot'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Node.js',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to take a website screenshot in Node.js',
        description:
          'Capture a screenshot of any URL in Node.js with the microlink.io SDK in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Node.js' },
          { '@type': 'HowToTool', name: 'microlink.io' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Install the SDK',
            text: 'Run npm install microlink.io in your Node.js project.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Capture the screenshot',
            text: 'Call microlink.screenshot(url) with the URL you want to capture.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the image URL',
            text: 'Read the hosted screenshot from the returned url and serve it to your users.'
          }
        ]
      }
    ]
  },

  breadcrumb: [
    { label: 'Screenshot API', href: '/screenshot' },
    { label: 'Node.js' }
  ],

  hero: {
    title: (
      <>
        <Accent>Node.js</Accent> Screenshot API
      </>
    ),
    subtitle:
      'Capture pixel-perfect screenshots of any URL in three lines of Node.js — no Puppeteer, no Chromium, no servers to maintain.',
    demoAlt: 'Node.js website screenshot API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/screenshot'
    }
  },

  quickstart: {
    title: (
      <>
        Take a <Accent>screenshot</Accent> in Node.js
      </>
    ),
    caption:
      'microlink.io is the official SDK: a tiny Promise-based client where every product is a method. Point it at a URL and you get back a hosted screenshot URL — ready to embed or store.',
    steps: [
      {
        title: 'Install the SDK',
        description:
          'A single dependency with zero native binaries, on Node.js 24 or newer.',
        code: { language: 'bash', source: 'npm install microlink.io' }
      },
      {
        title: 'Capture any URL',
        description:
          'Create the client once and call the screenshot method. It resolves to the asset itself — url, type, width, height and size — with no envelope to unwrap. Both CommonJS (require) and ESM (import) are supported.',
        code: {
          language: 'js',
          title: 'capture.js',
          source: `import createClient from 'microlink.io'
// CommonJS: const createClient = require('microlink.io')

const microlink = createClient()

const screenshot = await microlink.screenshot('https://example.com')

console.log(screenshot.url)`
        }
      },
      {
        title: 'Customize the capture',
        description:
          'Output format, full-page captures, device emulation, and waiting for content — every Headless Chrome option is just a field. Screenshot options nest under the product for you; anything else travels as an API parameter.',
        code: {
          language: 'js',
          title: 'options.js',
          source: `const screenshot = await microlink.screenshot('https://example.com', {
  type: 'jpeg',         // png (default) | jpeg
  fullPage: true,       // capture the entire scrollable page
  omitBackground: false,
  device: 'iPhone X',   // emulate any device
  waitForTimeout: 1000, // wait before capturing
  adblock: true         // strip ads & cookie banners (default)
})`
        }
      },
      {
        title: 'Save it to disk',
        description:
          'The response is a hosted image URL on a global CDN. Use the built-in fetch to download it, or just hand the URL to the browser.',
        code: {
          language: 'js',
          title: 'save.js',
          source: `import { writeFile } from 'node:fs/promises'
import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.screenshot('https://example.com')

const response = await fetch(url)
const buffer = Buffer.from(await response.arrayBuffer())
await writeFile('screenshot.png', buffer)`
        }
      }
    ]
  },

  framework: {
    title: (
      <>
        Drop it into your <Accent>framework</Accent>
      </>
    ),
    caption:
      'A route handler, a controller, or a plain HTTP server — the same ' +
      'three-line call becomes your own screenshot endpoint, perfect for ' +
      'dynamic Open Graph images on any runtime.',
    examples: [
      {
        id: 'express',
        label: 'Express',
        code: {
          language: 'js',
          title: 'server.js',
          source: `import express from 'express'
import createClient from 'microlink.io'

const app = express()
const microlink = createClient()

// GET /screenshot?url=https://example.com
app.get('/screenshot', async (req, res) => {
  const screenshot = await microlink.screenshot(req.query.url)

  // redirect to the hosted image, or res.json(screenshot)
  res.redirect(screenshot.url)
})

app.listen(3000)`
        }
      },
      {
        id: 'nextjs',
        label: 'Next.js',
        code: {
          language: 'js',
          title: 'app/api/screenshot/route.js',
          source: `import createClient from 'microlink.io'

const microlink = createClient()

// GET /api/screenshot?url=https://example.com
export async function GET (request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  const screenshot = await microlink.screenshot(url)

  // redirect to the hosted image, or return screenshot.url as JSON
  return Response.redirect(screenshot.url)
}`
        }
      },
      {
        id: 'fastify',
        label: 'Fastify',
        code: {
          language: 'js',
          title: 'server.js',
          source: `import Fastify from 'fastify'
import createClient from 'microlink.io'

const fastify = Fastify()
const microlink = createClient()

// GET /screenshot?url=https://example.com
fastify.get('/screenshot', async (request, reply) => {
  const screenshot = await microlink.screenshot(request.query.url)

  return reply.redirect(screenshot.url)
})

await fastify.listen({ port: 3000 })`
        }
      },
      {
        id: 'nestjs',
        label: 'NestJS',
        code: {
          language: 'js',
          title: 'screenshot.controller.ts',
          source: `import { Controller, Get, Query, Redirect } from '@nestjs/common'
import createClient from 'microlink.io'

const microlink = createClient()

@Controller('screenshot')
export class ScreenshotController {
  // GET /screenshot?url=https://example.com
  @Get()
  @Redirect()
  async capture (@Query('url') url: string) {
    const screenshot = await microlink.screenshot(url)
    return { url: screenshot.url }
  }
}`
        }
      },
      {
        id: 'node',
        label: 'Node.js',
        code: {
          language: 'js',
          title: 'server.js',
          source: `const http = require('node:http')
const createClient = require('microlink.io')

const microlink = createClient()

// GET /screenshot?url=https://example.com
http
  .createServer(async (req, res) => {
    const { searchParams } = new URL(req.url, 'http://localhost')

    const screenshot = await microlink.screenshot(searchParams.get('url'))

    res.writeHead(302, { Location: screenshot.url }).end()
  })
  .listen(3000)`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>Puppeteer</Accent> maintenance
      </>
    ),
    caption:
      'Running Headless Chrome yourself means shipping a 300 MB browser, tuning memory, and fighting cold starts. The API gives you the same control without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted Puppeteer',
        points: [
          'Bundle & maintain Chromium (~300 MB) plus system libraries',
          'Exceeds the AWS Lambda 50 MB limit — needs chrome-aws-lambda hacks',
          'Each browser eats hundreds of MB of RAM; OOM crashes under load',
          'Launching Chromium adds seconds of cold-start latency',
          'You build the browser pool, queueing, retries and autoscaling',
          'Write your own cookie-banner & ad dismissal scripts'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Node.js',
        points: [
          'npm install microlink.io — pure JavaScript, zero binaries',
          'Runs anywhere: serverless, edge, containers, your laptop',
          'Autoscaled managed browser fleet with a 99.95% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'Built-in adblock removes ads & cookie banners automatically',
          'Full-page, device emulation, overlays & DOM interaction included'
        ]
      }
    ]
  },

  features: {
    title: (
      <>
        Built for the way you write <Accent>Node</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API designed to feel native in JavaScript — typed, Promise-based,
        and at home in any runtime, from a long-running server to a Cloudflare
        Worker. Read the{' '}
        <Link href='/docs/guides/screenshot'>screenshot guide</Link> to go
        deeper.
      </>
    ),
    items: [
      {
        title: 'TypeScript Ready',
        description:
          'Ships type definitions out of the box, so every screenshot option autocompletes and type-checks in your editor.'
      },
      {
        title: 'ESM & CommonJS',
        description:
          'Use `import createClient from "microlink.io"` or `require("microlink.io")` — it works in any Node project without config.'
      },
      {
        title: 'Serverless & Edge Friendly',
        description:
          'No Chromium binary to bundle. Deploy to Vercel, AWS Lambda, or any container — the same client also runs in browsers and Deno.'
      },
      {
        title: 'Promise-Based API',
        description:
          'A single async call returns the hosted image URL. No callbacks, no streams to manage, no browser lifecycle to babysit.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'Managed Headless Chrome, autoscaled and load-balanced. No browser pool, no servers, no patching to maintain.'
      },
      {
        title: 'Built-in Adblock',
        description:
          'Captures arrive clean — GDPR cookie banners, newsletter popups, and injected ads are removed before the shot.'
      },
      {
        title: 'Full Browser Control',
        description:
          'Full-page captures, viewport and device emulation, click and wait, plus custom CSS and JavaScript injection.'
      },
      {
        title: 'Global Edge Caching',
        description: `Repeat captures are served sub-second from ${CDN_EDGES} edge locations, with configurable TTL to keep them fresh.`
      },
      {
        title: 'Generous Free Tier',
        description:
          'Start with 25 requests per day — no account, no credit card. Add an API key when you are ready to scale.'
      }
    ]
  },

  tool: {
    title: (
      <>
        Try it live in the <Accent>playground</Accent>
      </>
    ),
    caption:
      'Paste a URL and see the exact API request before you write a line of Node.',
    cta: {
      label: 'Open the screenshot tool',
      href: '/tools/website-screenshot'
    }
  },

  faq: {
    title: 'Node.js Screenshot FAQ',
    caption: (
      <>
        Everything Node developers ask before integrating the Microlink
        screenshot API.
      </>
    ),
    questions: [
      {
        question: 'Do I need Puppeteer or Chromium installed?',
        answer: (
          <>
            <div>
              No. <code>microlink.io</code> is a thin HTTP client with zero
              native dependencies — there is no Chromium binary to download and
              nothing to compile. The Headless Chrome fleet runs on Microlink's
              side.
            </div>
            <div>
              That is what makes it deploy cleanly to serverless and edge
              environments where bundling{' '}
              <Link href='https://pptr.dev/'>Puppeteer</Link> is painful.
            </div>
          </>
        )
      },
      {
        question: 'Does it work with TypeScript?',
        answer: (
          <>
            <div>
              Yes. The package ships its own type definitions, so the{' '}
              <code>createClient()</code> client and every screenshot option are
              typed and autocomplete in your editor — no <code>@types</code>{' '}
              package required.
            </div>
          </>
        )
      },
      {
        question: 'Can I use ESM and CommonJS?',
        answer: (
          <>
            <div>
              Both. Use <code>import createClient from 'microlink.io'</code> in
              ESM projects or{' '}
              <code>const createClient = require('microlink.io')</code> in
              CommonJS. The same options work either way.
            </div>
          </>
        )
      },
      {
        question: 'Does it run on Next.js, serverless, or the edge?',
        answer: (
          <>
            <div>
              Yes. Because there is no browser binary to bundle, it works inside
              Next.js Route Handlers, AWS Lambda, and Vercel functions out of
              the box, on Node.js 24 or newer. The same client also runs in
              browsers and Deno.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/sdk/getting-started/overview'>SDK overview</Link>{' '}
              for runtime details.
            </div>
          </>
        )
      },
      {
        question: 'Is there a free tier or do I need an API key?',
        answer: (
          <>
            <div>
              The free tier gives you 25 requests per day with no account, no
              credit card, and no API key. Just call the endpoint and start
              capturing.
            </div>
            <div>
              When you need more throughput or caching control, pass{' '}
              <code>apiKey</code> to <code>createClient()</code> and requests
              route to the Pro tier. See <Link href='/pricing'>pricing</Link> for the
              limits.
            </div>
          </>
        )
      },
      {
        question: 'How fast is it and how does it scale?',
        answer: (
          <>
            <div>
              Cached captures return sub-second from a global edge network, and
              the browser fleet autoscales behind a 99.95% uptime SLA — so a
              traffic spike does not mean provisioning more servers.
            </div>
            <div>
              Compare the numbers on the{' '}
              <Link href='/benchmarks/screenshot-api'>
                screenshot API benchmarks
              </Link>
              .
            </div>
          </>
        )
      }
    ]
  },

  cta: {
    title: (
      <>
        Start <Accent>capturing</Accent> in Node.js
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account and no credit card. Install the SDK and ship your first screenshot in minutes.',
    primary: {
      label: 'Read the Node.js docs',
      href: '/docs/sdk/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  },

  siblings: []
}

export default nodejs
