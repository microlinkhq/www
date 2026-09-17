import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: '#f59f00' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/logo/nodejs'

const nodejs = {
  lang: 'nodejs',
  label: 'Node.js',

  meta: {
    title: 'Node.js Logo API — Get the Logo of Any URL',
    description:
      'Get the logo of any website in Node.js with a single HTTP request — markup, BIMI and favicon detection, format and dimensions, brand palette, hotlink-ready. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Logo API for Node.js',
        name: 'Logo API for Node.js',
        description:
          'A developer guide to getting the logo of any URL programmatically in Node.js over the Microlink REST API — detection, image metadata, brand palette and hotlink embedding without scraping markup or probing images.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Node.js 18+, global fetch only',
        keywords:
          'nodejs logo api, logo api, get logo from url nodejs, brand logo api, website logo nodejs, favicon api nodejs',
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
          name: 'Microlink Logo API',
          url: 'https://microlink.io/logo',
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
            name: 'Logo API',
            item: 'https://microlink.io/logo'
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
        name: 'How to get the logo of any URL in Node.js',
        description:
          'Get the logo of any URL as a hotlink-ready image with format, dimensions and brand palette in Node.js with one HTTP request in three steps.',
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
            name: 'Read the logo',
            text: 'Decode the JSON response and read the logo URL, format and dimensions from data.logo.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the logo',
            text: 'Hotlink the image with embed=logo.url, theme your UI with the palette, or store the asset.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'Logo API', href: '/logo' }, { label: 'Node.js' }],

  hero: {
    title: (
      <>
        <Accent>Node.js</Accent> Logo API
      </>
    ),
    subtitle:
      'Get the logo behind any URL with one HTTP request in Node.js — markup, BIMI and favicon detection merged, with format, dimensions and brand palette.',
    demoAlt: 'Node.js logo API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/api/getting-started/overview'
    }
  },

  quickstart: {
    title: (
      <>
        Get a <Accent>logo</Accent> in Node.js
      </>
    ),
    caption:
      'No package and no scraping — the Microlink REST API detects the best logo for any URL and returns it with a single HTTP GET. Here it is with the global fetch that ships with Node.js 18+.',
    steps: [
      {
        title: 'Extract any URL',
        description:
          'A few lines with global fetch — no npm package to add. Point it at a domain and read the logo from the JSON response.',
        code: {
          language: 'js',
          title: 'logo.js',
          source: `const params = new URLSearchParams({ url: 'https://stripe.com' })

const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

console.log(data.logo.url)         // absolute, hotlink-ready
console.log(data.logo.type)        // 'png'
console.log(data.logo.width)       // 180
console.log(data.logo.size_pretty) // '3.14 kB'`
        }
      },
      {
        title: 'Read the logo fields',
        description:
          'URL, format, dimensions and byte size come back in one call — everything an img tag or an avatar component needs.',
        code: {
          language: 'js',
          title: 'palette.js',
          source: `const params = new URLSearchParams({
  url: 'https://stripe.com',
  palette: 'true' // add the brand palette to every detected image
})

const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

// Ordered from most dominant color to least
console.log(data.logo.palette) // ['#543CFC', '#DEDAFC', ...]`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Icons injected by client-side JavaScript only exist after the page renders — prerender in a real browser and they are detected too, still one request.',
        code: {
          language: 'js',
          title: 'spa.js',
          source: `const params = new URLSearchParams({
  url: 'https://app.example.com',
  prerender: 'true',          // render JS in a real browser first
  waitForSelector: 'h1'       // detect only when the content exists
})

const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
  .then(res => res.json())

// Icons injected by client-side JavaScript are found too
console.log(data.logo.url)`
        }
      },
      {
        title: 'Hotlink the image directly',
        description:
          'Add embed=logo.url and the API URL becomes the image itself — drop it into an img tag or a CSS background with no JSON parsing.',
        code: {
          language: 'js',
          title: 'embed.js',
          source: `const params = new URLSearchParams({
  url: 'https://stripe.com',
  embed: 'logo.url' // the API URL becomes the image itself
})

const logoUrl = \`https://api.microlink.io?\${params}\`

// Drop it straight into an <img> tag — no JSON parsing
console.log(\`<img src="\${logoUrl}" alt="stripe logo" />\`)`
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
      'An image proxy route, a redirect endpoint, or an avatar payload — the same request becomes your own logo endpoint.',
    examples: [
      {
        id: 'nextjs',
        label: 'Next.js',
        code: {
          language: 'js',
          title: 'app/api/logo/route.js',
          source: `// GET /api/logo?url=https://stripe.com
export async function GET (request) {
  const url = new URL(request.url).searchParams.get('url')

  const upstream = await fetch(
    \`https://api.microlink.io?url=\${encodeURIComponent(url)}&embed=logo.url\`
  )

  return new Response(upstream.body, {
    headers: { 'content-type': upstream.headers.get('content-type') }
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

// GET /logo?url=https://stripe.com — redirect to the hotlink-ready image
app.get('/logo', (req, res) => {
  const params = new URLSearchParams({
    url: req.query.url,
    embed: 'logo.url'
  })

  res.redirect(\`https://api.microlink.io?\${params}\`)
})`
        }
      },
      {
        id: 'avatar',
        label: 'Brand Avatar',
        code: {
          language: 'js',
          title: 'avatar.js',
          source: `// Build the payload for a brand avatar component
export async function brandAvatar (url) {
  const params = new URLSearchParams({ url, palette: 'true' })

  const { data } = await fetch(\`https://api.microlink.io?\${params}\`)
    .then(res => res.json())

  return {
    src: data.logo?.url ?? null,
    color: data.logo?.palette?.[0] ?? '#cccccc' // dominant brand color
  }
}`
        }
      },
      {
        id: 'nodejs',
        label: 'Plain Node.js',
        code: {
          language: 'js',
          title: 'logo.js',
          source: `// node logo.js https://stripe.com
const { data } = await fetch(
  \`https://api.microlink.io?url=\${encodeURIComponent(process.argv[2])}\`
).then(res => res.json())

console.log(data.logo)`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>icon-hunting</Accent> scrapers
      </>
    ),
    caption:
      'Rolling your own means parsing apple-touch-icon, og:logo and JSON-LD per site, checking BIMI DNS records, probing image formats and building a palette pipeline. The API returns the best logo for any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY logo detection',
        points: [
          'Parse apple-touch-icon, og:logo and JSON-LD per site',
          'Check BIMI DNS records and favicon fallbacks yourself',
          'Probe image formats and dimensions with extra requests',
          'JavaScript-injected icons need a headless browser',
          'Extract brand palettes with your own image pipeline',
          'You build the caching, retries and autoscaling'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Node.js',
        points: [
          'One HTTP request — global fetch, no npm package to add',
          'Markup, BIMI and favicon detection merged for you',
          'Format, dimensions and byte size included',
          'Brand palette with WCAG-friendly color pairs',
          'Hotlink-ready with embed=logo.url',
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
        A REST API that feels native in Node.js — one call, JSON back, and at
        home in anything from a script to a serverless function. Read the{' '}
        <Link href='/docs/api/getting-started/overview'>API overview</Link> to
        go deeper.
      </>
    ),
    items: [
      {
        title: 'Three Detection Sources',
        description:
          'Page markup, the BIMI DNS record and the favicon as fallback — the best available asset wins, every time.'
      },
      {
        title: 'Zero Dependencies',
        description:
          'Node.js 18+ ships global fetch — the examples work with no npm install and nothing to vendor.'
      },
      {
        title: 'Complete Image Metadata',
        description:
          'Format, byte size and exact dimensions come with every logo — no HEAD requests or image probing on your side.'
      },
      {
        title: 'Hotlink-Ready',
        description:
          'The logo comes back as an absolute URL — hotlink it directly, or use embed=logo.url and the API URL is the image.'
      },
      {
        title: 'Real Browser Detection',
        description:
          'Icons injected by client-side JavaScript are detected too, with prerender=true and waitForSelector.'
      },
      {
        title: 'Brand Palette',
        description:
          'Enable palette=true and every detected image gains a dominant-color palette with WCAG-friendly pairs — theme your UI straight from the response.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Next.js, Express, or an avatar component as a route or a few-line function.'
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
      'Paste a URL and see the detected logo before you write a line of Node.js.',
    cta: {
      label: 'Open the live demo',
      href: '/logo'
    }
  },

  faq: {
    title: 'Node.js Logo API FAQ',
    caption: (
      <>
        Everything Node.js developers ask before integrating the Microlink logo
        API.
      </>
    ),
    questions: [
      {
        question: 'Where does the logo come from?',
        answer: (
          <>
            <div>
              Microlink walks the page markup — apple-touch-icon, Open Graph and
              JSON-LD — checks the BIMI record in DNS, and falls back to the
              favicon. The best available asset wins, with its format and
              dimensions included.
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
        question: 'What about icons injected by JavaScript?',
        answer: (
          <>
            <div>
              Pass <code>prerender=true</code> and the page is rendered in a
              real browser before detection, so icons injected by React, Vue or
              any client-side framework are found too. Combine it with{' '}
              <code>waitForSelector</code> to wait for specific content.
            </div>
          </>
        )
      },
      {
        question: 'Can I hotlink the logo directly?',
        answer: (
          <>
            <div>
              Yes. Add <code>embed=logo.url</code> and the API URL becomes the
              image itself — use it in an <code>img</code> tag or a CSS
              background with no JSON parsing and nothing to store on your side.
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
        question: 'How fresh is the logo?',
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
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and get logos back in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default nodejs
