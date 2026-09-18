import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: 'rgb(224, 0, 172)' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/markdown/nodejs'

const nodejs = {
  lang: 'nodejs',
  label: 'Node.js',

  meta: {
    title: 'Node.js URL to Markdown API — Convert Any Website in Code',
    description:
      'Convert any URL to clean markdown in Node.js with a single HTTP request — no Puppeteer, no Turndown pipeline to maintain. Built for LLM ingestion, RAG and agents. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'URL to Markdown API for Node.js',
        name: 'URL to Markdown API for Node.js',
        description:
          'A developer guide to converting web pages to clean markdown programmatically in Node.js over the Microlink REST API — request, convert, framework integration, and LLM pipelines without running Puppeteer or a readability pipeline.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Node.js 18+, global fetch only',
        keywords:
          'nodejs url to markdown, url to markdown api, html to markdown nodejs, turndown alternative, llm ingestion nodejs, rag pipeline web data',
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
          name: 'Microlink URL to Markdown API',
          url: 'https://microlink.io/markdown',
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
            name: 'URL to Markdown API',
            item: 'https://microlink.io/markdown'
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
        name: 'How to convert a URL to markdown in Node.js',
        description:
          'Convert any URL to clean markdown in Node.js with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Node.js' },
          { '@type': 'HowToTool', name: 'fetch' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url and data.markdown.attr parameters.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the markdown',
            text: 'Decode the JSON response and read the markdown string from data.markdown.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the markdown',
            text: 'Feed it to your LLM, RAG index, or save it as a .md file.'
          }
        ]
      }
    ]
  },

  breadcrumb: [
    { label: 'URL to Markdown API', href: '/markdown' },
    { label: 'Node.js' }
  ],

  hero: {
    title: (
      <>
        <Accent>Node.js</Accent> URL to Markdown API
      </>
    ),
    subtitle:
      'Convert any URL to clean, LLM-ready markdown with one HTTP request in Node.js — no Puppeteer, no readability pipeline, no browser to maintain.',
    demoAlt: 'Node.js URL to markdown API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/content-conversion/url-to-markdown'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>markdown</Accent> in Node.js
      </>
    ),
    caption:
      'No package and no browser — the Microlink REST API turns any URL into clean markdown with a single HTTP GET. Here it is with the global fetch that ships with Node.js 18+.',
    steps: [
      {
        title: 'Convert any URL',
        description:
          'A few lines with global fetch — no npm package to add. Point it at a page and read the markdown string from the JSON response.',
        code: {
          language: 'js',
          title: 'convert.mjs',
          source: `const params = new URLSearchParams({
  url: 'https://example.com',
  'data.markdown.attr': 'markdown',
  meta: 'false' // skip metadata extraction for a faster response
})

const res = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

console.log(res.data.markdown)`
        }
      },
      {
        title: 'Scope the extraction',
        description:
          'Pass a CSS selector to keep just the article body and drop headers, footers, and sidebars — fewer tokens, better embeddings.',
        code: {
          language: 'js',
          title: 'scoped.mjs',
          source: `const params = new URLSearchParams({
  url: 'https://example.com/blog/post',
  'data.markdown.attr': 'markdown',
  'data.markdown.selector': 'article', // keep just the article body
  meta: 'false'
})

const res = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

console.log(res.data.markdown)`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Client-side rendered content only exists after JavaScript runs — prerender with a real browser and wait for the content, still one request.',
        code: {
          language: 'js',
          title: 'spa.mjs',
          source: `const params = new URLSearchParams({
  url: 'https://app.example.com/docs',
  'data.markdown.attr': 'markdown',
  'data.markdown.selector': 'main',
  prerender: 'true',               // render JS in a real browser first
  waitForSelector: 'main h1',      // wait until the content exists
  meta: 'false'
})

const res = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

console.log(res.data.markdown)`
        }
      },
      {
        title: 'Get markdown back directly',
        description:
          'Skip the JSON envelope entirely: embed=markdown returns the page as text/markdown, ready to pipe into a file or a prompt.',
        code: {
          language: 'js',
          title: 'embed.mjs',
          source: `import { writeFile } from 'node:fs/promises'

const params = new URLSearchParams({
  url: 'https://example.com',
  'data.markdown.attr': 'markdown',
  meta: 'false',
  embed: 'markdown' // respond with text/markdown instead of JSON
})

const markdown = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.text())

await writeFile('page.md', markdown)`
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
      'A route handler, an Express endpoint, or a LangChain loader — the same request becomes your own URL-to-markdown primitive for agents and RAG pipelines.',
    examples: [
      {
        id: 'nextjs',
        label: 'Next.js',
        code: {
          language: 'js',
          title: 'app/api/markdown/route.js',
          source: `// GET /api/markdown?url=https://example.com
export async function GET (request) {
  const url = new URL(request.url).searchParams.get('url')

  const params = new URLSearchParams({
    url,
    'data.markdown.attr': 'markdown',
    meta: 'false',
    embed: 'markdown'
  })

  const res = await fetch(\`https://api.microlink.io?\${params}\`)

  return new Response(res.body, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' }
  })
}`
        }
      },
      {
        id: 'express',
        label: 'Express',
        code: {
          language: 'js',
          title: 'server.js',
          source: `import express from 'express'

const app = express()

// GET /markdown?url=https://example.com
app.get('/markdown', async (req, res) => {
  const params = new URLSearchParams({
    url: req.query.url,
    'data.markdown.attr': 'markdown',
    meta: 'false'
  })

  const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
    .then(res => res.json())

  res.type('text/markdown').send(data.markdown)
})`
        }
      },
      {
        id: 'langchain',
        label: 'LangChain',
        code: {
          language: 'js',
          title: 'loader.js',
          source: `import { Document } from '@langchain/core/documents'

// A web loader backed by the Microlink API
export async function loadPage (url) {
  const params = new URLSearchParams({
    url,
    'data.markdown.attr': 'markdown',
    'data.markdown.selector': 'article',
    meta: 'false'
  })

  const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
    .then(res => res.json())

  return [
    new Document({
      pageContent: data.markdown,
      metadata: { source: url }
    })
  ]
}`
        }
      },
      {
        id: 'nodejs',
        label: 'Plain Node.js',
        code: {
          language: 'js',
          title: 'markdown.mjs',
          source: `// node markdown.mjs https://example.com
const params = new URLSearchParams({
  url: process.argv[2],
  'data.markdown.attr': 'markdown',
  meta: 'false'
})

const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

process.stdout.write(data.markdown)`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>readability pipeline</Accent> maintenance
      </>
    ),
    caption:
      'Rolling your own means fetching HTML, running a readability extractor, converting with Turndown, and adding Playwright when a page needs JavaScript. The API gives you clean markdown from any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY extraction pipeline',
        points: [
          'Fetch HTML, then chain readability + Turndown yourself',
          'Every site breaks your selectors in its own special way',
          'JavaScript-rendered pages need Playwright — a 300 MB browser',
          'Each browser eats hundreds of MB of RAM per worker',
          'You build the queueing, retries, caching and autoscaling',
          'Output quality drifts as sites change; you own the fixes'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Node.js',
        points: [
          'One HTTP request — global fetch, no npm package to add',
          'Runs anywhere: Vercel, AWS Lambda, containers, your laptop',
          'Real browser rendering built in with prerender=true',
          'CSS selector scoping keeps tokens focused on the content',
          'Cached responses from a global edge network',
          'Autoscaled fleet with a 99.9% uptime SLA'
        ]
      }
    ]
  },

  features: {
    title: (
      <>
        Built for the way you write <Accent>Node.js</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in Node.js — one fetch, JSON back, and at
        home in anything from a script to a serverless function. Read the{' '}
        <Link href='/docs/guides/content-conversion/url-to-markdown'>
          URL to Markdown guide
        </Link>{' '}
        to go deeper.
      </>
    ),
    items: [
      {
        title: 'No Browser to Install',
        description:
          'No Puppeteer or Playwright to install or keep patched. JavaScript rendering runs on Microlink’s side with prerender=true.'
      },
      {
        title: 'Zero Dependencies',
        description:
          'Node.js 18+ ships global fetch — the examples work with no npm install and nothing to vendor.'
      },
      {
        title: 'LLM-Ready Output',
        description:
          'Clean markdown instead of HTML noise — around 80% fewer tokens on average, so agents spend context on meaning, not markup.'
      },
      {
        title: 'CSS Selector Scoping',
        description:
          'Extract the whole page or narrow to article, main, or any selector — precise content targeting for better embeddings.'
      },
      {
        title: 'JavaScript Rendering',
        description:
          'SPAs and client-rendered docs are rendered in a real browser first, with waitForSelector to catch late content.'
      },
      {
        title: 'Documents Too',
        description:
          'Point it at a PDF or an office file — docx, xlsx, pptx — and the content is converted to markdown the same way.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Next.js, Express, or a LangChain loader as a route or a few-line function.'
      },
      {
        title: 'text/markdown Responses',
        description:
          'embed=markdown returns the page as text/markdown — pipe it straight into a file, a queue, or a prompt.'
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
      'Paste a URL and see the exact markdown output before you write a line of Node.js.',
    cta: {
      label: 'Open the URL to Markdown tool',
      href: '/tools/url-to-markdown'
    }
  },

  faq: {
    title: 'Node.js URL to Markdown FAQ',
    caption: (
      <>
        Everything Node.js developers ask before integrating the Microlink URL
        to Markdown API.
      </>
    ),
    questions: [
      {
        question: 'Do I need Puppeteer or Playwright?',
        answer: (
          <>
            <div>
              No. JavaScript rendering runs on Microlink’s managed browser fleet
              — pass <code>prerender=true</code> and the page is rendered before
              conversion. Your Node.js process stays browser-free.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a package?',
        answer: (
          <>
            <div>
              No. The examples use the global <code>fetch</code> that ships with
              Node.js 18+. If you prefer the official SDK,{' '}
              <Link href='/docs/sdk/getting-started/overview'>
                microlink SDK
              </Link>{' '}
              wraps the same API with conveniences like{' '}
              <code>microlink.markdown(url)</code>.
            </div>
          </>
        )
      },
      {
        question: 'How do I convert only the article body?',
        answer: (
          <>
            <div>
              Pass a CSS selector with{' '}
              <code>data.markdown.selector=article</code> and the extraction is
              scoped to that element — headers, footers, and sidebars are
              dropped before conversion, which keeps token counts down.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/guides/content-conversion/url-to-markdown'>
                URL to Markdown guide
              </Link>{' '}
              for scoping strategies.
            </div>
          </>
        )
      },
      {
        question: 'Does it work on serverless platforms?',
        answer: (
          <>
            <div>
              Yes. Because there is no browser binary to ship, it works on
              Vercel, AWS Lambda, Cloudflare Workers, and containers alike — a
              plain HTTPS call with no cold-start penalty.
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
              When you need more throughput or caching control, add an{' '}
              <code>apiKey</code> header and requests route to the Pro tier. See{' '}
              <Link href='/pricing'>pricing</Link> for the limits.
            </div>
          </>
        )
      },
      {
        question: 'Can I get the response as markdown instead of JSON?',
        answer: (
          <>
            <div>
              Yes. Add <code>embed=markdown</code> and the API responds with{' '}
              <code>text/markdown</code> directly — handy for piping into files,
              queues, or prompts without parsing an envelope.
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
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and ship markdown in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/guides/content-conversion/url-to-markdown'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default nodejs
