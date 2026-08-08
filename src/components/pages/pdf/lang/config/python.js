import React from 'react'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'
import { ACCENT } from 'components/pages/pdf/shared'

const Accent = ({ children }) => (
  <span style={{ color: ACCENT }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/pdf/python'
const OG_IMAGE = 'https://cdn.microlink.io/banner/pdf.jpeg'

const python = {
  lang: 'python',
  label: 'Python',

  meta: {
    title: 'Python HTML to PDF API without wkhtmltopdf',
    description:
      'Convert any URL to a pixel-perfect PDF in Python with one HTTP request — no wkhtmltopdf, no headless Chrome. Works with Django, Flask and FastAPI.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'HTML to PDF API for Python',
        name: 'HTML to PDF API for Python',
        description:
          'A developer guide to converting web pages to PDF programmatically in Python over the Microlink REST API — request, convert, framework integration, and serverless deployment without running wkhtmltopdf or Headless Chrome.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Python 3.8+, requests (optional)',
        keywords:
          'python html to pdf api, url to pdf python, convert webpage to pdf python, wkhtmltopdf alternative python, generate pdf from html python, requests pdf',
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
            name: 'Python',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to convert a URL to PDF in Python',
        description:
          'Convert any URL into a PDF document in Python with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Python' },
          { '@type': 'HowToTool', name: 'requests' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url and pdf parameters.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the PDF URL',
            text: 'Parse the JSON response and read the hosted document from data.pdf.url.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the PDF URL',
            text: 'Serve the hosted document to your users or save it to disk.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'PDF API', href: '/pdf' }, { label: 'Python' }],

  hero: {
    title: (
      <>
        <Accent>Python</Accent> HTML to PDF API
      </>
    ),
    subtitle:
      'Convert any URL into a pixel-perfect PDF with one HTTP request in Python — no wkhtmltopdf, no headless Chrome, no servers to maintain.',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/pdf'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>PDF</Accent> in Python
      </>
    ),
    caption:
      'No SDK and no browser binaries — the Microlink REST API turns any URL into a hosted PDF with a single HTTP GET. Here it is with the popular requests package; the standard library works too.',
    steps: [
      {
        title: 'Install requests',
        description:
          'The most convenient way to talk to the API. Prefer zero dependencies? Skip this and use urllib from the standard library.',
        code: { language: 'bash', source: 'pip install requests' }
      },
      {
        title: 'Convert any URL',
        description:
          'Point it at a page, ask for a PDF, and read the hosted document URL back from the JSON response.',
        code: {
          language: 'python',
          title: 'convert.py',
          source: `import requests

res = requests.get('https://api.microlink.io', params={
    'url': 'https://example.com',
    'pdf': 'true',
    'meta': 'false'  # skip metadata extraction for a faster response
})

data = res.json()['data']
print(data['pdf']['url'])`
        }
      },
      {
        title: 'Customize the document',
        description:
          'Paper format, margins, orientation, and print CSS are all query params. Nested options use dot notation, so pdf.format maps to the format field.',
        code: {
          language: 'python',
          title: 'options.py',
          source: `res = requests.get('https://api.microlink.io', params={
    'url': 'https://example.com',
    'pdf.format': 'A4',        # A0-A6 | Letter | Legal | Tabloid
    'pdf.margin': '0.35cm',    # cm, mm, in or px
    'pdf.landscape': 'false',  # portrait (default) | landscape
    'mediaType': 'print',      # print CSS stylesheets | screen (default)
    'meta': 'false'
})

print(res.json()['data']['pdf']['url'])`
        }
      },
      {
        title: 'Save it to disk',
        description:
          'The response is a hosted PDF URL on a global CDN. Stream it to a file with a second request, or hand the URL straight to your template.',
        code: {
          language: 'python',
          title: 'save.py',
          source: `import requests

res = requests.get('https://api.microlink.io', params={
    'url': 'https://example.com',
    'pdf': 'true'
})

pdf_url = res.json()['data']['pdf']['url']

with open('document.pdf', 'wb') as file:
    file.write(requests.get(pdf_url).content)`
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
      'A view, a route, or a standalone script — the same request becomes your ' +
      'own PDF endpoint, perfect for invoice downloads, nightly reports, and ' +
      'export views in Django, Flask, or FastAPI.',
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

# GET /pdf?url=https://example.com
@app.get('/pdf')
def pdf():
    res = requests.get('https://api.microlink.io', params={
        'url': request.args['url'],
        'pdf': 'true',
        'meta': 'false'
    })
    return redirect(res.json()['data']['pdf']['url'])`
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

# GET /pdf?url=https://example.com
def pdf(request):
    res = requests.get('https://api.microlink.io', params={
        'url': request.GET['url'],
        'pdf': 'true',
        'meta': 'false'
    })
    return HttpResponseRedirect(res.json()['data']['pdf']['url'])`
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

# GET /pdf?url=https://example.com
@app.get('/pdf')
def pdf(url: str):
    res = requests.get('https://api.microlink.io', params={
        'url': url,
        'pdf': 'true',
        'meta': 'false'
    })
    return RedirectResponse(res.json()['data']['pdf']['url'])`
        }
      },
      {
        id: 'python',
        label: 'Python',
        code: {
          language: 'python',
          title: 'pdf.py',
          source: `import json
from urllib.parse import urlencode
from urllib.request import urlopen

# Standard library only — no dependencies to install
query = urlencode({
    'url': 'https://example.com',
    'pdf': 'true',
    'meta': 'false'
})

with urlopen(f'https://api.microlink.io?{query}') as res:
    data = json.load(res)['data']

print(data['pdf']['url'])`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>wkhtmltopdf</Accent> maintenance
      </>
    ),
    caption:
      'Generating PDFs from Python means wrestling with wkhtmltopdf binaries, WeasyPrint CSS limits, or driving headless Chrome yourself. The API gives you a real browser rendering engine without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted PDF tooling',
        points: [
          'wkhtmltopdf is archived upstream — an outdated engine frozen in time',
          'WeasyPrint & xhtml2pdf never execute JavaScript, so SPAs render blank',
          'Driving headless Chrome means pinning drivers and a ~300 MB binary',
          'Each browser eats hundreds of MB of RAM; workers crash under load',
          'You build the pooling, queueing, retries and autoscaling',
          'Fonts, emoji, and modern CSS break differently on every host'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Python',
        points: [
          'One HTTP request — works with requests or the standard library',
          'Runs anywhere: serverless, containers, a cron job, your laptop',
          'Autoscaled managed browser fleet with a 99.9% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'A0-A6, Letter, Legal & Tabloid — set as plain query params',
          'Print stylesheets, custom CSS & DOM interaction, no extra deps'
        ]
      }
    ]
  },

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
        <Link href='/docs/guides/pdf'>PDF guide</Link> to go deeper.
      </>
    ),
    items: [
      {
        title: 'No Binaries to Install',
        description:
          'Skip wkhtmltopdf and headless Chrome entirely. There is no rendering engine to download, patch, or keep in sync across hosts.'
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
          'No browser layer to bundle. Deploy to AWS Lambda, Google Cloud Functions, or any container with zero binaries.'
      },
      {
        title: 'Real Browser Rendering',
        description:
          'Pages render in Headless Chrome, so JavaScript-driven dashboards and charts come out right — the blind spot of WeasyPrint and xhtml2pdf.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'No Chrome to pin to a driver version and no browser pool inside your workers. Your app stays a plain HTTP client.'
      },
      {
        title: 'Custom Paper & Layout',
        description:
          'Every layout option is a query param: pdf.format, pdf.margin, pdf.landscape, pdf.scale, and pdf.pageRanges.'
      },
      {
        title: 'Screen & Print Media',
        description:
          'Pass mediaType="print" in the same params dict to apply print stylesheets, or keep the default screen layout.'
      },
      {
        title: 'Generous Free Tier',
        description:
          'Start with 25 requests per day — no account, no credit card. Point at pro.microlink.io with an x-api-key header when you scale.'
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
      'Paste a URL and see the exact API request before you write a line of Python.',
    cta: {
      label: 'Open the PDF tool',
      href: '/tools/website-to-pdf'
    }
  },

  faq: {
    title: 'Python PDF FAQ',
    caption: (
      <>
        What Python developers ask before integrating. For formats, limits, and
        SLA, see the <Link href='/pdf'>PDF API overview</Link>.
      </>
    ),
    questions: [
      {
        question: 'Do I need wkhtmltopdf or a headless browser?',
        answer: (
          <>
            <div>
              No. It is a plain HTTP request to the Microlink API — there is no
              wkhtmltopdf binary to ship and no Chromium to download. The
              Headless Chrome fleet runs on Microlink's side.
            </div>
            <div>
              That also means JavaScript-heavy pages render correctly — unlike
              WeasyPrint or xhtml2pdf, which never execute scripts.
            </div>
          </>
        )
      },
      {
        question: 'Does it work with asyncio?',
        answer: (
          <>
            <div>
              Yes. Nothing about the call is Python-specific — it is one HTTP{' '}
              <code>GET</code>, so <code>httpx</code> or <code>aiohttp</code>{' '}
              take the same parameters inside a coroutine. With{' '}
              <code>requests</code>, run it in a thread executor to avoid
              blocking the loop.
            </div>
            <div>
              The rendering happens on Microlink's side either way, so your
              worker only ever waits on the network.
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
              <Link href='/docs/guides/pdf'>PDF guide</Link>.
            </div>
          </>
        )
      },
      {
        question: 'How do I authenticate from Python?',
        answer: (
          <>
            <div>
              Two things change together: send your key as the{' '}
              <code>x-api-key</code> header, and point the request at{' '}
              <code>pro.microlink.io</code> instead of{' '}
              <code>api.microlink.io</code>. Sending the header to the free
              endpoint returns an <code>EPRO</code> error.
            </div>
            <div>
              With <code>requests</code> that is{' '}
              <code>
                requests.get('https://pro.microlink.io', params=…,
                headers=&#123;'x-api-key': KEY&#125;)
              </code>
              . See the{' '}
              <Link href='/docs/api/basics/authentication'>
                authentication docs
              </Link>{' '}
              and <Link href='/pricing'>pricing</Link>.
            </div>
          </>
        )
      },
      {
        question: 'How do I convert a batch of URLs?',
        answer: (
          <>
            <div>
              Each conversion is an independent stateless request, so a{' '}
              <code>ThreadPoolExecutor</code> or a task queue like Celery
              parallelises it without any coordination on your side.
            </div>
            <div>
              Concurrency is bounded by your plan rather than your hardware —
              check the{' '}
              <Link href='/docs/api/basics/rate-limit'>rate limit</Link> docs
              before fanning out widely.
            </div>
          </>
        )
      }
    ]
  },

  cta: {
    title: (
      <>
        Start <Accent>converting</Accent> in Python
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account, no credit card. Paste the snippet into a view and ship a PDF today.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default python
