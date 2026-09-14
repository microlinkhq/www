import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: 'rgb(224, 0, 172)' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/markdown/python'

const python = {
  lang: 'python',
  label: 'Python',

  meta: {
    title: 'Python URL to Markdown API — Convert Any Website in Code',
    description:
      'Convert any URL to clean markdown in Python with a single HTTP request — no Playwright, no readability pipeline to maintain. Built for LLM ingestion, RAG and agents. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'URL to Markdown API for Python',
        name: 'URL to Markdown API for Python',
        description:
          'A developer guide to converting web pages to clean markdown programmatically in Python over the Microlink REST API — request, convert, framework integration, and LLM pipelines without running Playwright or a readability pipeline.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Python 3.8+, standard library only',
        keywords:
          'python url to markdown, url to markdown api, html to markdown python, markdownify alternative, llm ingestion python, rag pipeline web data',
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
            name: 'Python',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to convert a URL to markdown in Python',
        description:
          'Convert any URL to clean markdown in Python with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Python' },
          { '@type': 'HowToTool', name: 'urllib' }
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
    { label: 'Python' }
  ],

  hero: {
    title: (
      <>
        <Accent>Python</Accent> URL to Markdown API
      </>
    ),
    subtitle:
      'Convert any URL to clean, LLM-ready markdown with one HTTP request in Python — no Playwright, no readability pipeline, no browser to maintain.',
    demoAlt: 'Python URL to markdown API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/content-conversion/url-to-markdown'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>markdown</Accent> in Python
      </>
    ),
    caption:
      'No package and no browser — the Microlink REST API turns any URL into clean markdown with a single HTTP GET. Here it is with urllib and json from the Python standard library.',
    steps: [
      {
        title: 'Convert any URL',
        description:
          'A few lines with the standard library — no pip install to run. Point it at a page and read the markdown string from the JSON response.',
        code: {
          language: 'python',
          title: 'convert.py',
          source: `import json
import urllib.parse
import urllib.request

params = urllib.parse.urlencode({
    'url': 'https://example.com',
    'data.markdown.attr': 'markdown',
    'meta': 'false',  # skip metadata extraction for a faster response
})

with urllib.request.urlopen(f'https://api.microlink.io?{params}') as res:
    data = json.load(res)['data']

print(data['markdown'])`
        }
      },
      {
        title: 'Scope the extraction',
        description:
          'Pass a CSS selector to keep just the article body and drop headers, footers, and sidebars — fewer tokens, better embeddings.',
        code: {
          language: 'python',
          title: 'scoped.py',
          source: `import json
import urllib.parse
import urllib.request

params = urllib.parse.urlencode({
    'url': 'https://example.com/blog/post',
    'data.markdown.attr': 'markdown',
    'data.markdown.selector': 'article',  # keep just the article body
    'meta': 'false',
})

with urllib.request.urlopen(f'https://api.microlink.io?{params}') as res:
    data = json.load(res)['data']

print(data['markdown'])`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Client-side rendered content only exists after JavaScript runs — prerender with a real browser and wait for the content, still one request.',
        code: {
          language: 'python',
          title: 'spa.py',
          source: `import json
import urllib.parse
import urllib.request

params = urllib.parse.urlencode({
    'url': 'https://app.example.com/docs',
    'data.markdown.attr': 'markdown',
    'data.markdown.selector': 'main',
    'prerender': 'true',          # render JS in a real browser first
    'waitForSelector': 'main h1',  # wait until the content exists
    'meta': 'false',
})

with urllib.request.urlopen(f'https://api.microlink.io?{params}') as res:
    data = json.load(res)['data']

print(data['markdown'])`
        }
      },
      {
        title: 'Get markdown back directly',
        description:
          'Skip the JSON envelope entirely: embed=markdown returns the page as text/markdown, ready to write into a file or a prompt.',
        code: {
          language: 'python',
          title: 'embed.py',
          source: `import urllib.parse
import urllib.request

params = urllib.parse.urlencode({
    'url': 'https://example.com',
    'data.markdown.attr': 'markdown',
    'meta': 'false',
    'embed': 'markdown',  # respond with text/markdown instead of JSON
})

with urllib.request.urlopen(f'https://api.microlink.io?{params}') as res:
    markdown = res.read().decode('utf-8')

with open('page.md', 'w') as f:
    f.write(markdown)`
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
      'A FastAPI route, a Flask endpoint, or a LlamaIndex reader — the same request becomes your own URL-to-markdown primitive for agents and RAG pipelines.',
    examples: [
      {
        id: 'fastapi',
        label: 'FastAPI',
        code: {
          language: 'python',
          title: 'main.py',
          source: `import httpx
from fastapi import FastAPI, Response

app = FastAPI()

# GET /markdown?url=https://example.com
@app.get('/markdown')
async def markdown(url: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(
            'https://api.microlink.io',
            params={
                'url': url,
                'data.markdown.attr': 'markdown',
                'meta': 'false',
                'embed': 'markdown',
            },
        )

    return Response(res.text, media_type='text/markdown')`
        }
      },
      {
        id: 'flask',
        label: 'Flask',
        code: {
          language: 'python',
          title: 'app.py',
          source: `import json
import urllib.parse
import urllib.request

from flask import Flask, request, Response

app = Flask(__name__)

# GET /markdown?url=https://example.com
@app.get('/markdown')
def markdown():
    params = urllib.parse.urlencode({
        'url': request.args['url'],
        'data.markdown.attr': 'markdown',
        'meta': 'false',
    })

    with urllib.request.urlopen(f'https://api.microlink.io?{params}') as res:
        data = json.load(res)['data']

    return Response(data['markdown'], mimetype='text/markdown')`
        }
      },
      {
        id: 'llamaindex',
        label: 'LlamaIndex',
        code: {
          language: 'python',
          title: 'reader.py',
          source: `import json
import urllib.parse
import urllib.request

from llama_index.core import Document

# A web reader backed by the Microlink API
def load_page(url: str) -> list[Document]:
    params = urllib.parse.urlencode({
        'url': url,
        'data.markdown.attr': 'markdown',
        'data.markdown.selector': 'article',
        'meta': 'false',
    })

    with urllib.request.urlopen(f'https://api.microlink.io?{params}') as res:
        data = json.load(res)['data']

    return [Document(text=data['markdown'], metadata={'source': url})]`
        }
      },
      {
        id: 'python',
        label: 'Plain Python',
        code: {
          language: 'python',
          title: 'markdown.py',
          source: `import json
import sys
import urllib.parse
import urllib.request

# python markdown.py https://example.com
params = urllib.parse.urlencode({
    'url': sys.argv[1],
    'data.markdown.attr': 'markdown',
    'meta': 'false',
})

with urllib.request.urlopen(f'https://api.microlink.io?{params}') as res:
    data = json.load(res)['data']

print(data['markdown'])`
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
      'Rolling your own means fetching HTML, running readability-lxml, converting with markdownify, and adding Playwright when a page needs JavaScript. The API gives you clean markdown from any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY extraction pipeline',
        points: [
          'Fetch HTML, then chain readability-lxml + markdownify yourself',
          'Every site breaks your selectors in its own special way',
          'JavaScript-rendered pages need Playwright — a 300 MB browser',
          'Each browser eats hundreds of MB of RAM per worker',
          'You build the queueing, retries, caching and autoscaling',
          'Output quality drifts as sites change; you own the fixes'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Python',
        points: [
          'One HTTP request — urllib from the standard library, no pip install',
          'Runs anywhere: AWS Lambda, Modal, containers, your laptop',
          'Real browser rendering built in with prerender=true',
          'CSS selector scoping keeps tokens focused on the content',
          'Cached responses from a global edge network',
          'Autoscaled fleet with a 99.95% uptime SLA'
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
        A REST API that feels native in Python — one call, JSON back, and at
        home in anything from a notebook to a worker fleet. Read the{' '}
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
          'No Playwright or Selenium to install or keep patched. JavaScript rendering runs on Microlink’s side with prerender=true.'
      },
      {
        title: 'Standard Library Only',
        description:
          'urllib and json ship with Python — the examples run with zero pip installs and nothing to vendor.'
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
          'Drop it into FastAPI, Flask, or a LlamaIndex reader as a route or a few-line function.'
      },
      {
        title: 'text/markdown Responses',
        description:
          'embed=markdown returns the page as text/markdown — write it straight into a file, a queue, or a prompt.'
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
      'Paste a URL and see the exact markdown output before you write a line of Python.',
    cta: {
      label: 'Open the URL to Markdown tool',
      href: '/tools/url-to-markdown'
    }
  },

  faq: {
    title: 'Python URL to Markdown FAQ',
    caption: (
      <>
        Everything Python developers ask before integrating the Microlink
        URL to Markdown API.
      </>
    ),
    questions: [
      {
        question: 'Do I need Playwright or Selenium?',
        answer: (
          <>
            <div>
              No. JavaScript rendering runs on Microlink’s managed browser
              fleet — pass <code>prerender=true</code> and the page is rendered
              before conversion. Your Python process stays browser-free.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a package?',
        answer: (
          <>
            <div>
              No. The examples use <code>urllib</code> and <code>json</code>{' '}
              from the Python standard library. If you already use{' '}
              <code>requests</code> or <code>httpx</code>, the same call is one
              line shorter — see the FastAPI tab above.
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
        question: 'Does it work with LangChain or LlamaIndex?',
        answer: (
          <>
            <div>
              Yes. The output is a plain markdown string, so it drops into a
              LangChain <code>Document</code> or a LlamaIndex reader in a few
              lines — see the framework tabs above.
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
              <code>text/markdown</code> directly — handy for writing files or
              streaming into prompts without parsing an envelope.
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
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and ship markdown in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/guides/content-conversion/url-to-markdown'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default python
