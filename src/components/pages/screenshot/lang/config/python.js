import React from 'react'
import { colors } from 'theme'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'

// Per-language configuration for /screenshot/python. Python has no official
// Microlink SDK, so every example calls the REST API over native HTTP (the
// requests package, with the standard library as the zero-dependency option).

const Accent = ({ children }) => (
  <span style={{ color: colors.red6 }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/screenshot/python'
const OG_IMAGE = 'https://cdn.microlink.io/banner/screenshot.jpeg'

const python = {
  lang: 'python',
  label: 'Python',

  // ── SEO ──────────────────────────────────────────────────────────────────
  // Owns the "python screenshot api" intent — distinct from the product page
  // (/screenshot, "website screenshot api") and the other language spokes.
  meta: {
    title: 'Python Screenshot API — Capture Any Website in Code',
    description:
      'Take pixel-perfect website screenshots in Python with a single HTTP request — no Selenium, no headless Chrome to install. Works with requests, the standard library, Django, Flask & FastAPI. Free to start.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Website Screenshot API for Python',
        name: 'Website Screenshot API for Python',
        description:
          'A developer guide to capturing website screenshots programmatically in Python over the Microlink REST API — request, capture, framework integration, and serverless deployment without running Selenium or Headless Chrome.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Python 3.8+, requests (optional)',
        keywords:
          'python screenshot api, take screenshot python, website screenshot python, selenium alternative python, capture url python, requests screenshot',
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
            name: 'Python',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to take a website screenshot in Python',
        description:
          'Capture a screenshot of any URL in Python with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Python' },
          { '@type': 'HowToTool', name: 'requests' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url and screenshot parameters.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the screenshot URL',
            text: 'Parse the JSON response and read the hosted image from data.screenshot.url.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the image URL',
            text: 'Serve the hosted screenshot to your users or save it to disk.'
          }
        ]
      }
    ]
  },

  // ── Breadcrumb (visual) ───────────────────────────────────────────────────
  breadcrumb: [
    { label: 'Screenshot API', href: '/screenshot' },
    { label: 'Python' }
  ],

  // ── Hero (centered, code-free) ────────────────────────────────────────────
  hero: {
    title: (
      <>
        <Accent>Python</Accent> Screenshot API
      </>
    ),
    subtitle:
      'Capture pixel-perfect screenshots of any URL with one HTTP request in Python — no Selenium, no headless Chrome, no servers to maintain.',
    demoAlt: 'Python website screenshot API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/screenshot'
    }
  },

  // ── Quickstart steps (vertical, progressively deeper) ─────────────────────
  quickstart: {
    title: (
      <>
        Take a <Accent>screenshot</Accent> in Python
      </>
    ),
    caption:
      'No SDK and no Selenium — the Microlink REST API turns any URL into a hosted screenshot with a single HTTP GET. Here it is with the popular requests package; the standard library works too.',
    steps: [
      {
        title: 'Install requests',
        description:
          'The most convenient way to talk to the API. Prefer zero dependencies? Skip this and use urllib from the standard library.',
        code: { language: 'bash', source: 'pip install requests' }
      },
      {
        title: 'Capture any URL',
        description:
          'Point it at a page, ask for a screenshot, and read the hosted image URL back from the JSON response.',
        code: {
          language: 'python',
          title: 'capture.py',
          source: `import requests

res = requests.get('https://api.microlink.io', params={
    'url': 'https://example.com',
    'screenshot': 'true',
    'meta': 'false'  # skip metadata extraction for a faster response
})

data = res.json()['data']
print(data['screenshot']['url'])`
        }
      },
      {
        title: 'Customize the capture',
        description:
          'Output format, full-page captures, device emulation, and ad blocking — every Headless Chrome option is just a query field (dot notation for nested ones).',
        code: {
          language: 'python',
          title: 'options.py',
          source: `res = requests.get('https://api.microlink.io', params={
    'url': 'https://example.com',
    'screenshot.type': 'jpeg',      # png (default) | jpeg
    'screenshot.fullPage': 'true',  # capture the entire scrollable page
    'device': 'iPhone X',           # emulate any device
    'adblock': 'true',              # strip ads & cookie banners (default)
    'meta': 'false'
})

print(res.json()['data']['screenshot']['url'])`
        }
      },
      {
        title: 'Save it to disk',
        description:
          'The response is a hosted image URL on a global CDN. Download it with a second request, or just hand the URL to the browser.',
        code: {
          language: 'python',
          title: 'save.py',
          source: `import requests

res = requests.get('https://api.microlink.io', params={
    'url': 'https://example.com',
    'screenshot': 'true'
})

image_url = res.json()['data']['screenshot']['url']

with open('screenshot.png', 'wb') as file:
    file.write(requests.get(image_url).content)`
        }
      }
    ]
  },

  // ── Framework integration (tabbed) ────────────────────────────────────────
  framework: {
    title: (
      <>
        Drop it into your <Accent>framework</Accent>
      </>
    ),
    caption:
      'A view, a route, or a standalone script — the same request becomes your ' +
      'own screenshot endpoint, perfect for dynamic Open Graph images on any ' +
      'runtime.',
    examples: [
      {
        id: 'flask',
        label: 'Flask',
        code: {
          language: 'python',
          title: 'app.py',
          source: `from flask import Flask, redirect, request
import requests

app = Flask(__name__)

# GET /screenshot?url=https://example.com
@app.get('/screenshot')
def screenshot():
    res = requests.get('https://api.microlink.io', params={
        'url': request.args['url'],
        'screenshot': 'true',
        'meta': 'false'
    })
    return redirect(res.json()['data']['screenshot']['url'])`
        }
      },
      {
        id: 'django',
        label: 'Django',
        code: {
          language: 'python',
          title: 'views.py',
          source: `from django.http import HttpResponseRedirect
import requests

# GET /screenshot?url=https://example.com
def screenshot(request):
    res = requests.get('https://api.microlink.io', params={
        'url': request.GET['url'],
        'screenshot': 'true',
        'meta': 'false'
    })
    return HttpResponseRedirect(res.json()['data']['screenshot']['url'])`
        }
      },
      {
        id: 'fastapi',
        label: 'FastAPI',
        code: {
          language: 'python',
          title: 'main.py',
          source: `from fastapi import FastAPI
from fastapi.responses import RedirectResponse
import requests

app = FastAPI()

# GET /screenshot?url=https://example.com
@app.get('/screenshot')
def screenshot(url: str):
    res = requests.get('https://api.microlink.io', params={
        'url': url,
        'screenshot': 'true',
        'meta': 'false'
    })
    return RedirectResponse(res.json()['data']['screenshot']['url'])`
        }
      },
      {
        id: 'python',
        label: 'Python',
        code: {
          language: 'python',
          title: 'screenshot.py',
          source: `import json
from urllib.parse import urlencode
from urllib.request import urlopen

# Standard library only — no dependencies to install
query = urlencode({
    'url': 'https://example.com',
    'screenshot': 'true',
    'meta': 'false'
})

with urlopen(f'https://api.microlink.io?{query}') as res:
    data = json.load(res)['data']

print(data['screenshot']['url'])`
        }
      }
    ]
  },

  // ── Why the API vs self-hosting a browser ─────────────────────────────────
  comparison: {
    title: (
      <>
        Skip the <Accent>Selenium</Accent> maintenance
      </>
    ),
    caption:
      'Driving Headless Chrome from Python means shipping a 300 MB browser, pinning ChromeDriver, and fighting cold starts. The API gives you the same control without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted Selenium',
        points: [
          'Install & pin ChromeDriver to match every Chrome update',
          'Bundle headless Chrome (~300 MB) into your image or Lambda layer',
          'Each browser eats hundreds of MB of RAM; workers crash under load',
          'Launching Chrome adds seconds of cold-start latency',
          'You build the pooling, queueing, retries and autoscaling',
          'Write your own cookie-banner & ad dismissal scripts'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Python',
        points: [
          'One HTTP request — works with requests or the standard library',
          'Runs anywhere: serverless, containers, a cron job, your laptop',
          'Autoscaled managed browser fleet with a 99.95% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'Built-in adblock removes ads & cookie banners automatically',
          'Full-page, device emulation, overlays & DOM interaction included'
        ]
      }
    ]
  },

  // ── Features (Python-flavored) ────────────────────────────────────────────
  features: {
    title: (
      <>
        Built for the way you write <Accent>Python</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in Python — one HTTP call, JSON back, and
        at home in any runtime from a Django app to an AWS Lambda. Read the{' '}
        <Link href='/docs/guides/screenshot'>screenshot guide</Link> to go
        deeper.
      </>
    ),
    items: [
      {
        title: 'No Browser to Install',
        description:
          'Skip Selenium and ChromeDriver entirely. There is no headless Chrome to download, pin, or keep in sync with Chrome releases.'
      },
      {
        title: 'requests or Standard Library',
        description:
          'Use the popular requests package or the built-in urllib — it is a plain HTTP GET either way, with no extra dependencies required.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Django, Flask, or FastAPI as a view or route in a few lines. The same request works everywhere.'
      },
      {
        title: 'Serverless Ready',
        description:
          'No 250 MB Chrome layer to bundle. Deploy to AWS Lambda, Google Cloud Functions, or any container with zero browser binaries.'
      },
      {
        title: 'Simple JSON Response',
        description:
          'A single request returns JSON with the hosted image URL. No drivers, no explicit waits, no browser lifecycle to manage.'
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
        title: 'Generous Free Tier',
        description:
          'Start with 25 requests per day — no account, no credit card. Add an API key when you are ready to scale.'
      }
    ]
  },

  // ── Try it live ───────────────────────────────────────────────────────────
  tool: {
    title: (
      <>
        Try it live in the <Accent>playground</Accent>
      </>
    ),
    caption:
      'Paste a URL and see the exact API request before you write a line of Python.',
    cta: {
      label: 'Open the screenshot tool',
      href: '/tools/website-screenshot'
    }
  },

  // ── FAQ (Python-specific) ─────────────────────────────────────────────────
  faq: {
    title: 'Python Screenshot FAQ',
    caption: (
      <>
        Everything Python developers ask before integrating the Microlink
        screenshot API.
      </>
    ),
    questions: [
      {
        question: 'Do I need Selenium or a headless browser?',
        answer: (
          <>
            <div>
              No. It is a plain HTTP request to the Microlink API — there is no
              ChromeDriver to pin and no Chromium binary to download. The
              Headless Chrome fleet runs on Microlink's side.
            </div>
            <div>
              That is what makes it deploy cleanly to serverless and container
              environments where bundling{' '}
              <Link href='https://www.selenium.dev/'>Selenium</Link> is painful.
            </div>
          </>
        )
      },
      {
        question: 'Should I use requests or the standard library?',
        answer: (
          <>
            <div>
              Either. <code>requests</code> is the most convenient, but{' '}
              <code>urllib</code> from the standard library works with zero
              dependencies — both just issue an HTTP <code>GET</code> and read
              JSON back.
            </div>
          </>
        )
      },
      {
        question: 'Does it work with Django, Flask, and FastAPI?',
        answer: (
          <>
            <div>
              Yes. Because it is just an HTTP call, it drops into any view or
              route handler in a few lines — see the tabs above for Flask,
              Django, and FastAPI, or the{' '}
              <Link href='/docs/guides/screenshot'>screenshot guide</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Does it run on AWS Lambda or serverless?',
        answer: (
          <>
            <div>
              Yes. Because there is no Chrome binary to bundle, it works inside
              AWS Lambda, Google Cloud Functions, and any container out of the
              box — no 250 MB browser layer required.
            </div>
            <div>
              See the{' '}
              <Link href='/docs/api/getting-started/overview'>
                API overview
              </Link>{' '}
              for request details.
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
              When you need more throughput or caching control, add an{' '}
              <code>apiKey</code> header and requests route to the Pro tier. See{' '}
              <Link href='/pricing'>pricing</Link> for the limits.
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
              traffic spike does not mean provisioning more workers.
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

  // ── Final CTA ─────────────────────────────────────────────────────────────
  cta: {
    title: (
      <>
        Start <Accent>capturing</Accent> in Python
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and ship a screenshot in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default python
