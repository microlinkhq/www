import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: '#3e55ff' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/metadata/nodejs'

const nodejs = {
  lang: 'nodejs',
  label: 'Node.js',

  meta: {
    title: 'Node.js Metadata API — Extract Metadata from Any URL',
    description:
      'Extract title, description, image and logo from any URL in Node.js with a single HTTP request — no HTML parsing, no headless browser. Open Graph, Twitter Cards and JSON-LD merged. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Website Metadata API for Node.js',
        name: 'Website Metadata API for Node.js',
        description:
          'A developer guide to extracting website metadata programmatically in Node.js over the Microlink REST API — request, extract, framework integration, and link previews without parsing HTML or running a headless browser.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Node.js 18+, global fetch only',
        keywords:
          'nodejs metadata api, website metadata api, url metadata nodejs, open graph parser nodejs, link preview api, url preview nodejs',
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
          name: 'Microlink Metadata API',
          url: 'https://microlink.io/metadata',
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
            name: 'Metadata API',
            item: 'https://microlink.io/metadata'
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
        name: 'How to extract website metadata in Node.js',
        description:
          'Extract title, description, image and logo from any URL in Node.js with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Node.js' },
          { '@type': 'HowToTool', name: 'fetch' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url parameter.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the metadata',
            text: 'Decode the JSON response and read title, description, image and logo from data.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the metadata',
            text: 'Render a link preview, enrich a record, or store the fields.'
          }
        ]
      }
    ]
  },

  breadcrumb: [
    { label: 'Metadata API', href: '/metadata' },
    { label: 'Node.js' }
  ],

  hero: {
    title: (
      <>
        <Accent>Node.js</Accent> Metadata API
      </>
    ),
    subtitle:
      'Extract title, description, image and logo from any URL with one HTTP request in Node.js — no HTML parsing, no tag soup, no browser to maintain.',
    demoAlt: 'Node.js website metadata API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/api/getting-started/overview'
    }
  },

  quickstart: {
    title: (
      <>
        Extract <Accent>metadata</Accent> in Node.js
      </>
    ),
    caption:
      'No package and no parser — the Microlink REST API turns any URL into normalized metadata with a single HTTP GET. Here it is with the global fetch that ships with Node.js 18+.',
    steps: [
      {
        title: 'Extract any URL',
        description:
          'A few lines with global fetch — no npm package to add. Point it at a page and read the metadata from the JSON response.',
        code: {
          language: 'js',
          title: 'extract.js',
          source: `const params = new URLSearchParams({ url: 'https://microlink.io' })

const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

console.log(data.title)       // 'Microlink | The web, transformed'
console.log(data.description) // 'A single API for turning any URL into data…'
console.log(data.image.url)   // absolute, CDN-hosted
console.log(data.logo.url)    // absolute, CDN-hosted`
        }
      },
      {
        title: 'Pick the fields you need',
        description:
          'Title, description, publisher, author, date, lang, image and logo all come back in one call — build exactly the object your product needs.',
        code: {
          language: 'js',
          title: 'fields.js',
          source: `const params = new URLSearchParams({ url: 'https://microlink.io' })

const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

const preview = {
  title: data.title,
  description: data.description,
  publisher: data.publisher,
  author: data.author,
  date: data.date,
  lang: data.lang,
  image: data.image?.url ?? null,
  logo: data.logo?.url ?? null
}`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Tags injected by client-side JavaScript only exist after the page renders — prerender with a real browser and wait for them, still one request.',
        code: {
          language: 'js',
          title: 'spa.js',
          source: `const params = new URLSearchParams({
  url: 'https://app.example.com',
  prerender: 'true',          // render JS in a real browser first
  waitForSelector: 'h1'       // wait until the content exists
})

const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

console.log(data.title)`
        }
      },
      {
        title: 'Build a link preview',
        description:
          'Image and logo come back as absolute, CDN-hosted URLs — drop them straight into an img tag and you have a link preview.',
        code: {
          language: 'js',
          title: 'link-preview.js',
          source: `const params = new URLSearchParams({ url: 'https://microlink.io' })

const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

const html = \`
  <a href="\${data.url}" class="card">
    <img src="\${data.image?.url ?? data.logo?.url}" alt="" />
    <strong>\${data.title}</strong>
    <p>\${data.description}</p>
  </a>\``
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
      'A route handler, an Express endpoint, or a chat bot unfurl — the same request becomes your own metadata endpoint for link previews and enrichment.',
    examples: [
      {
        id: 'nextjs',
        label: 'Next.js',
        code: {
          language: 'js',
          title: 'app/api/preview/route.js',
          source: `// GET /api/preview?url=https://microlink.io
export async function GET (request) {
  const url = new URL(request.url).searchParams.get('url')

  const { data } = await fetch(
    \`https://api.microlink.io?url=\${encodeURIComponent(url)}\`
  ).then(res => res.json())

  return Response.json({
    title: data.title,
    description: data.description,
    image: data.image?.url ?? null,
    logo: data.logo?.url ?? null
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

// GET /preview?url=https://microlink.io
app.get('/preview', async (req, res) => {
  const { data } = await fetch(
    \`https://api.microlink.io?url=\${encodeURIComponent(req.query.url)}\`
  ).then(res => res.json())

  res.json({
    title: data.title,
    description: data.description,
    image: data.image?.url ?? null
  })
})`
        }
      },
      {
        id: 'discord-bot',
        label: 'Discord Bot',
        code: {
          language: 'js',
          title: 'unfurl.js',
          source: `import { EmbedBuilder } from 'discord.js'

// Unfurl a URL into a rich embed
export async function unfurl (url) {
  const { data } = await fetch(
    \`https://api.microlink.io?url=\${encodeURIComponent(url)}\`
  ).then(res => res.json())

  return new EmbedBuilder()
    .setTitle(data.title)
    .setDescription(data.description)
    .setURL(data.url)
    .setImage(data.image?.url ?? null)
    .setFooter({ text: data.publisher ?? data.url })
}`
        }
      },
      {
        id: 'nodejs',
        label: 'Plain Node.js',
        code: {
          language: 'js',
          title: 'metadata.js',
          source: `// node metadata.js https://microlink.io
const { data } = await fetch(
  \`https://api.microlink.io?url=\${encodeURIComponent(process.argv[2])}\`
).then(res => res.json())

console.log(JSON.stringify(data, null, 2))`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>tag-parsing</Accent> maintenance
      </>
    ),
    caption:
      'Rolling your own means fetching HTML, parsing Open Graph and Twitter Cards, merging JSON-LD and oEmbed, and adding a headless browser for JavaScript-injected tags. The API gives you normalized metadata from any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY tag parsing',
        points: [
          'Fetch the HTML and parse og, twitter and meta tags yourself',
          'Merge JSON-LD, oEmbed and microdata by hand — every site differs',
          'Resolve relative image and logo URLs against redirects yourself',
          'JavaScript-injected tags need a headless browser — a 300 MB binary',
          'Each browser eats hundreds of MB of RAM per worker',
          'You build the caching, retries and autoscaling'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Node.js',
        points: [
          'One HTTP request — global fetch, no npm package to add',
          'Open Graph, Twitter Cards, JSON-LD and oEmbed merged for you',
          'Image and logo as absolute, CDN-hosted URLs',
          'JavaScript-injected tags captured with prerender=true',
          'Cached responses from a global edge network',
          'Autoscaled fleet with a 99.95% uptime SLA'
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
        A REST API that feels native in Node.js — one call, JSON back, and at
        home in anything from a script to a serverless function. Read the{' '}
        <Link href='/docs/api/getting-started/overview'>API overview</Link> to
        go deeper.
      </>
    ),
    items: [
      {
        title: 'No HTML Parsing',
        description:
          'No tag soup, no regex, no DOM library to install. One HTTP GET returns a normalized JSON object.'
      },
      {
        title: 'Zero Dependencies',
        description:
          'Node.js 18+ ships global fetch — the examples work with no npm install and nothing to vendor.'
      },
      {
        title: 'Every Source Merged',
        description:
          'Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata and plain HTML tags are merged into a single normalized response.'
      },
      {
        title: 'CDN-Hosted Assets',
        description:
          'Image and logo come back as absolute URLs on a global CDN — hot-link them directly, no downloading or proxying.'
      },
      {
        title: 'JavaScript Rendering',
        description:
          'Tags injected by client-side JavaScript are captured too, with prerender=true and waitForSelector.'
      },
      {
        title: 'Link Preview Ready',
        description:
          'Title, description, image, logo and publisher are exactly the fields a link preview card needs — one call, one card.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Next.js, Express, or a chat bot as a route or a few-line function.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'Managed Headless Chrome, autoscaled and load-balanced. No browser pool, no servers, no patching to maintain.'
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
      'Paste a URL and see the exact metadata response before you write a line of Node.js.',
    cta: {
      label: 'Open the sharing debugger',
      href: '/tools/sharing-debugger'
    }
  },

  faq: {
    title: 'Node.js Metadata API FAQ',
    caption: (
      <>
        Everything Node.js developers ask before integrating the Microlink
        metadata API.
      </>
    ),
    questions: [
      {
        question: 'Which metadata sources are covered?',
        answer: (
          <>
            <div>
              Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa and
              plain HTML tags — all merged and normalized into a single JSON
              response, so you never parse tag soup yourself.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a package?',
        answer: (
          <>
            <div>
              No. The examples use the global fetch that ships with Node.js 18+.
              If you prefer the official SDK, the microlink SDK wraps the same
              API with typed conveniences.
            </div>
          </>
        )
      },
      {
        question: 'What about tags rendered by JavaScript?',
        answer: (
          <>
            <div>
              Pass <code>prerender=true</code> and the page is rendered in a
              real browser before extraction, so tags injected by React, Vue or
              any client-side framework are captured too. Combine it with{' '}
              <code>waitForSelector</code> to wait for specific content.
            </div>
          </>
        )
      },
      {
        question: 'Are image and logo URLs ready to use?',
        answer: (
          <>
            <div>
              Yes. They come back as absolute URLs hosted on a global CDN —
              resolve-relative-URL bugs included — so you can hot-link them
              directly in an <code>img</code> tag or store them as-is.
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
              extracting.
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
        question: 'How fresh is the metadata?',
        answer: (
          <>
            <div>
              Responses are cached at the edge with a sane default TTL, and you
              control freshness per request — see the{' '}
              <Link href='/docs/api/getting-started/overview'>
                API overview
              </Link>{' '}
              for cache parameters.
            </div>
          </>
        )
      }
    ]
  },

  cta: {
    title: (
      <>
        Start <Accent>extracting</Accent> in Node.js
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and ship metadata in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default nodejs
