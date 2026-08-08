import React from 'react'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'
import { ACCENT } from 'components/pages/pdf/shared'

const Accent = ({ children }) => (
  <span style={{ color: ACCENT }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/pdf/nodejs'
const OG_IMAGE = 'https://cdn.microlink.io/banner/pdf.jpeg'

const nodejs = {
  lang: 'nodejs',
  label: 'Node.js',

  meta: {
    title: 'Node.js HTML to PDF API — Convert Any URL to PDF',
    description:
      'Convert any URL or HTML to a pixel-perfect PDF in Node.js with @microlink/mql. Three lines of code, no Puppeteer or Chromium to install, works on serverless & edge. Free to start.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'HTML to PDF API for Node.js',
        name: 'HTML to PDF API for Node.js',
        description:
          'A developer guide to converting web pages to PDF programmatically in Node.js using the @microlink/mql SDK — install, convert, framework integration, and serverless deployment without managing Headless Chrome.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Node.js 18+, @microlink/mql',
        keywords:
          'nodejs html to pdf api, url to pdf node.js, convert webpage to pdf node, puppeteer pdf alternative, generate pdf from html node.js, @microlink/mql',
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
          name: 'Microlink PDF API',
          url: 'https://microlink.io/pdf',
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
            name: 'PDF API',
            item: 'https://microlink.io/pdf'
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
        name: 'How to convert a URL to PDF in Node.js',
        description:
          'Convert any URL into a PDF document in Node.js with the @microlink/mql SDK in three steps.',
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
            name: 'Convert the URL',
            text: 'Call mql(url, { pdf: true }) with the URL you want to convert.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the PDF URL',
            text: 'Read the hosted document from data.pdf.url and serve it to your users.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'PDF API', href: '/pdf' }, { label: 'Node.js' }],

  hero: {
    title: (
      <>
        <Accent>Node.js</Accent> HTML to PDF API
      </>
    ),
    subtitle:
      'Convert any URL into a pixel-perfect PDF document in three lines of Node.js — no Puppeteer, no Chromium, no servers to maintain.',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/pdf'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>PDF</Accent> in Node.js
      </>
    ),
    caption:
      'The official SDK, @microlink/mql, is a tiny Promise-based client. Install it, point it at a URL, and you get back a hosted PDF URL — ready to embed, download, or store.',
    steps: [
      {
        title: 'Install the SDK',
        description:
          'A single dependency with zero native binaries. It runs anywhere Node runs.',
        code: { language: 'bash', source: 'npm install @microlink/mql' }
      },
      {
        title: 'Convert any URL',
        description:
          'Pass the page you want and set pdf: true. With async/await you get the result in one call — both CommonJS (require) and ESM (import) are supported.',
        code: {
          language: 'js',
          title: 'convert.js',
          source: `import mql from '@microlink/mql'
// CommonJS: const mql = require('@microlink/mql')

const { status, data } = await mql('https://example.com', {
  pdf: true,
  meta: false // skip metadata extraction for a faster response
})

if (status === 'success') {
  console.log(data.pdf.url)
}`
        }
      },
      {
        title: 'Customize the document',
        description:
          'Paper format, margins, orientation, scale, and print CSS — every document option is just a field.',
        code: {
          language: 'js',
          title: 'options.js',
          source: `const { data } = await mql('https://example.com', {
  pdf: {
    format: 'A4',       // A0-A6 | Letter | Legal | Tabloid
    margin: '0.35cm',   // cm, mm, in or px
    landscape: false,   // portrait (default) | landscape
    scale: 1            // zoom the rendering, 0.1 to 2
  },
  mediaType: 'print',   // print CSS stylesheets | screen (default)
  waitForTimeout: 1000  // wait before generating
})`
        }
      },
      {
        title: 'Save it to disk',
        description:
          'The response is a hosted PDF URL on a global CDN. Use the built-in fetch to download it, or just hand the URL to the browser.',
        code: {
          language: 'js',
          title: 'save.js',
          source: `import { writeFile } from 'node:fs/promises'
import mql from '@microlink/mql'

const { data } = await mql('https://example.com', { pdf: true })

const response = await fetch(data.pdf.url)
const buffer = Buffer.from(await response.arrayBuffer())
await writeFile('document.pdf', buffer)`
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
      'three-line call becomes your own PDF endpoint, perfect for invoices, ' +
      'reports, and receipts on any runtime.',
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

// GET /pdf?url=https://example.com
app.get('/pdf', async (req, res) => {
  const { data } = await mql(req.query.url, {
    pdf: true,
    meta: false
  })

  // redirect to the hosted document, or res.json(data.pdf.url)
  res.redirect(data.pdf.url)
})

app.listen(3000)`
        }
      },
      {
        id: 'nextjs',
        label: 'Next.js',
        code: {
          language: 'js',
          title: 'app/api/pdf/route.js',
          source: `import mql from '@microlink/mql'

// GET /api/pdf?url=https://example.com
export async function GET (request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  const { data } = await mql(url, {
    pdf: true,
    meta: false
  })

  // redirect to the hosted document, or return data.pdf.url as JSON
  return Response.redirect(data.pdf.url)
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

// GET /pdf?url=https://example.com
fastify.get('/pdf', async (request, reply) => {
  const { data } = await mql(request.query.url, {
    pdf: true,
    meta: false
  })

  return reply.redirect(data.pdf.url)
})

await fastify.listen({ port: 3000 })`
        }
      },
      {
        id: 'nestjs',
        label: 'NestJS',
        code: {
          language: 'js',
          title: 'pdf.controller.ts',
          source: `import { Controller, Get, Query, Redirect } from '@nestjs/common'
import mql from '@microlink/mql'

@Controller('pdf')
export class PdfController {
  // GET /pdf?url=https://example.com
  @Get()
  @Redirect()
  async convert (@Query('url') url: string) {
    const { data } = await mql(url, { pdf: true, meta: false })
    return { url: data.pdf.url }
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

// GET /pdf?url=https://example.com
http
  .createServer(async (req, res) => {
    const { searchParams } = new URL(req.url, 'http://localhost')

    const { data } = await mql(searchParams.get('url'), {
      pdf: true,
      meta: false
    })

    res.writeHead(302, { Location: data.pdf.url }).end()
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
      'Running page.pdf() yourself means shipping a 300 MB browser, tuning memory, and fighting cold starts. The API gives you the same rendering engine without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted Puppeteer',
        points: [
          'Bundle & maintain Chromium (~300 MB) plus system libraries and fonts',
          'Exceeds the AWS Lambda 50 MB limit — needs chrome-aws-lambda hacks',
          'Each browser eats hundreds of MB of RAM; OOM crashes under load',
          'Launching Chromium adds seconds of cold-start latency per document',
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
          'Autoscaled managed browser fleet with a 99.9% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'A0-A6, Letter, Legal & Tabloid formats with margin and scale control',
          'Print or screen CSS, custom styles & DOM interaction included'
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
        Worker. Read the <Link href='/docs/guides/pdf'>PDF guide</Link> to go
        deeper.
      </>
    ),
    items: [
      {
        title: 'TypeScript Ready',
        description:
          'Ships type definitions out of the box, so every PDF option autocompletes and type-checks in your editor.'
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
          'A single async call returns the hosted document URL. No callbacks, no streams to manage, no browser lifecycle to babysit.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'Managed Headless Chrome, autoscaled and load-balanced. No browser pool, no servers, no patching to maintain.'
      },
      {
        title: 'Custom Paper & Layout',
        description:
          'A0-A6, Letter, Legal, and Tabloid formats with portrait or landscape orientation, margins in cm, mm, or px, and page ranges.'
      },
      {
        title: 'Screen & Print Media',
        description:
          'Render the web layout as-is or switch to print stylesheets with mediaType for clean, print-optimized documents.'
      },
      {
        title: 'Global Edge Caching',
        description: `Repeat conversions are served sub-second from ${CDN_EDGES} edge locations, with configurable TTL to keep documents fresh.`
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
      label: 'Open the PDF tool',
      href: '/tools/website-to-pdf'
    }
  },

  faq: {
    title: 'Node.js PDF FAQ',
    caption: (
      <>
        Everything Node developers ask before integrating the Microlink PDF API.
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
        question: 'What paper sizes and layout options are supported?',
        answer: (
          <>
            <div>
              All standard formats: A0 through A6, Letter, Legal, and Tabloid,
              in portrait or landscape. Margins accept cm, mm, in, or px, and{' '}
              <code>scale</code> and <code>pageRanges</code> give you precise
              control over the output.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/guides/pdf/page-size-and-layout'>
                page size & layout guide
              </Link>{' '}
              for every option.
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
              <code>mql()</code> client and every PDF option are typed and
              autocomplete in your editor — no <code>@types</code> package
              required.
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
              converting.
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
              Cached documents return sub-second from a global edge network, and
              the browser fleet autoscales behind a 99.9% uptime SLA — so a
              traffic spike does not mean provisioning more servers.
            </div>
            <div>
              Read the{' '}
              <Link href='/docs/guides/pdf/caching-and-performance'>
                caching & performance guide
              </Link>{' '}
              to tune TTL for your workload.
            </div>
          </>
        )
      }
    ]
  },

  cta: {
    title: (
      <>
        Start <Accent>converting</Accent> in Node.js
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account and no credit card. Install the SDK and ship your first PDF in minutes.',
    primary: {
      label: 'Read the Node.js docs',
      href: '/docs/mql/getting-started/installation'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default nodejs
