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
      'Take pixel-perfect website screenshots in Node.js with @microlink/mql. Three lines of code, no Puppeteer or Chromium to install, works on serverless & edge. Free to start.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Website Screenshot API for Node.js',
        name: 'Website Screenshot API for Node.js',
        description:
          'A developer guide to capturing website screenshots programmatically in Node.js using the @microlink/mql SDK — install, capture, framework integration, and serverless deployment without managing Headless Chrome.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Node.js 18+, @microlink/mql',
        keywords:
          'nodejs screenshot api, take screenshot node.js, website screenshot node, puppeteer alternative node, capture url node.js, @microlink/mql',
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
          'Capture a screenshot of any URL in Node.js with the @microlink/mql SDK in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Node.js' },
          { '@type': 'HowToTool', name: '@microlink/mql' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Install the SDK',
            text: 'Run npm install @microlink/mql in your Node.js project.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Capture the screenshot',
            text: 'Call mql(url, { screenshot: true }) with the URL you want to capture.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the image URL',
            text: 'Read the hosted screenshot from data.screenshot.url and serve it to your users.'
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
      'The official SDK, @microlink/mql, is a tiny Promise-based client. Install it, point it at a URL, and you get back a hosted screenshot URL — ready to embed or store.',
    steps: [
      {
        title: 'Install the SDK',
        description:
          'A single dependency with zero native binaries. It runs anywhere Node runs.',
        code: { language: 'bash', source: 'npm install @microlink/mql' }
      },
      {
        title: 'Capture any URL',
        description:
          'Pass the page you want and set screenshot: true. With async/await you get the result in one call — both CommonJS (require) and ESM (import) are supported.',
        code: {
          language: 'js',
          title: 'capture.js',
          source: `import mql from '@microlink/mql'
// CommonJS: const mql = require('@microlink/mql')

const { status, data } = await mql('https://example.com', {
  screenshot: true,
  meta: false // skip metadata extraction for a faster response
})

if (status === 'success') {
  console.log(data.screenshot.url)
}`
        }
      },
      {
        title: 'Customize the capture',
        description:
          'Output format, full-page captures, device emulation, and waiting for content — every Headless Chrome option is just a field.',
        code: {
          language: 'js',
          title: 'options.js',
          source: `const { data } = await mql('https://example.com', {
  screenshot: {
    type: 'jpeg',   // png (default) | jpeg
    fullPage: true, // capture the entire scrollable page
    omitBackground: false
  },
  device: 'iPhone X',     // emulate any device
  waitForTimeout: 1000,   // wait before capturing
  adblock: true           // strip ads & cookie banners (default)
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
import mql from '@microlink/mql'

const { data } = await mql('https://example.com', { screenshot: true })

const response = await fetch(data.screenshot.url)
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
import mql from '@microlink/mql'

const app = express()

// GET /screenshot?url=https://example.com
app.get('/screenshot', async (req, res) => {
  const { data } = await mql(req.query.url, {
    screenshot: true,
    meta: false
  })

  // redirect to the hosted image, or res.json(data.screenshot.url)
  res.redirect(data.screenshot.url)
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
          source: `import mql from '@microlink/mql'

// GET /api/screenshot?url=https://example.com
export async function GET (request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  const { data } = await mql(url, {
    screenshot: true,
    meta: false
  })

  // redirect to the hosted image, or return data.screenshot.url as JSON
  return Response.redirect(data.screenshot.url)
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
import mql from '@microlink/mql'

const fastify = Fastify()

// GET /screenshot?url=https://example.com
fastify.get('/screenshot', async (request, reply) => {
  const { data } = await mql(request.query.url, {
    screenshot: true,
    meta: false
  })

  return reply.redirect(data.screenshot.url)
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
import mql from '@microlink/mql'

@Controller('screenshot')
export class ScreenshotController {
  // GET /screenshot?url=https://example.com
  @Get()
  @Redirect()
  async capture (@Query('url') url: string) {
    const { data } = await mql(url, { screenshot: true, meta: false })
    return { url: data.screenshot.url }
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
const mql = require('@microlink/mql')

// GET /screenshot?url=https://example.com
http
  .createServer(async (req, res) => {
    const { searchParams } = new URL(req.url, 'http://localhost')

    const { data } = await mql(searchParams.get('url'), {
      screenshot: true,
      meta: false
    })

    res.writeHead(302, { Location: data.screenshot.url }).end()
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
          'npm install @microlink/mql — pure JavaScript, zero binaries',
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
          'Use `import mql from "@microlink/mql"` or `require("@microlink/mql")` — it works in any Node project without config.'
      },
      {
        title: 'Serverless & Edge Friendly',
        description:
          'No Chromium binary to bundle. Deploy to Vercel, AWS Lambda, or Cloudflare Workers with the lightweight build.'
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
              No. <code>@microlink/mql</code> is a thin HTTP client with zero
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
              <code>mql()</code> client and every screenshot option are typed
              and autocomplete in your editor — no <code>@types</code> package
              required.
            </div>
          </>
        )
      },
      {
        question: 'Can I use ESM and CommonJS?',
        answer: (
          <>
            <div>
              Both. Use <code>import mql from '@microlink/mql'</code> in ESM
              projects or <code>const mql = require('@microlink/mql')</code> in
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
              the box. For the Edge runtime, import the lightweight build:{' '}
              <code>@microlink/mql/lightweight</code>.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/mql/getting-started/installation'>
                installation guide
              </Link>{' '}
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
              <code>apiKey</code> to <code>mql()</code> and requests route to{' '}
              the Pro tier. See <Link href='/pricing'>pricing</Link> for the
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
      href: '/docs/mql/getting-started/installation'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  },

  siblings: []
}

export default nodejs
