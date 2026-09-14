import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: 'rgb(224, 0, 172)' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/markdown/go'

const go = {
  lang: 'go',
  label: 'Go',

  meta: {
    title: 'Go URL to Markdown API — Convert Any Website in Code',
    description:
      'Convert any URL to clean markdown in Go with a single HTTP request — no headless browser, no readability pipeline to maintain. Built for LLM ingestion, RAG and agents. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'URL to Markdown API for Go',
        name: 'URL to Markdown API for Go',
        description:
          'A developer guide to converting web pages to clean markdown programmatically in Go over the Microlink REST API — request, convert, framework integration, and LLM pipelines without running a headless browser or a readability pipeline.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Go 1.21+, standard library only',
        keywords:
          'go url to markdown, url to markdown api, html to markdown golang, llm ingestion go, rag pipeline web data, convert webpage to markdown golang',
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
            name: 'Go',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to convert a URL to markdown in Go',
        description:
          'Convert any URL to clean markdown in Go with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Go' },
          { '@type': 'HowToTool', name: 'net/http' }
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
    { label: 'Go' }
  ],

  hero: {
    title: (
      <>
        <Accent>Go</Accent> URL to Markdown API
      </>
    ),
    subtitle:
      'Convert any URL to clean, LLM-ready markdown with one HTTP request in Go — no headless browser, no readability pipeline, no servers to maintain.',
    demoAlt: 'Go URL to markdown API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/content-conversion/url-to-markdown'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>markdown</Accent> in Go
      </>
    ),
    caption:
      'No module and no browser — the Microlink REST API turns any URL into clean markdown with a single HTTP GET. Here it is with net/http from the Go standard library.',
    steps: [
      {
        title: 'Convert any URL',
        description:
          'A few lines with the standard library — no module to add. Point it at a page and read the markdown string from the JSON response.',
        code: {
          language: 'go',
          title: 'convert.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
)

func main() {
  params := url.Values{
    "url":                 {"https://example.com"},
    "data.markdown.attr":  {"markdown"},
    "meta":                {"false"}, // skip metadata for a faster response
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Markdown string \`json:"markdown"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(payload.Data.Markdown)
}`
        }
      },
      {
        title: 'Scope the extraction',
        description:
          'Pass a CSS selector to keep just the article body and drop headers, footers, and sidebars — fewer tokens, better embeddings.',
        code: {
          language: 'go',
          title: 'scoped.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
)

func main() {
  params := url.Values{
    "url":                    {"https://example.com/blog/post"},
    "data.markdown.attr":     {"markdown"},
    "data.markdown.selector": {"article"}, // keep just the article body
    "meta":                   {"false"},
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Markdown string \`json:"markdown"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(payload.Data.Markdown)
}`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Client-side rendered content only exists after JavaScript runs — prerender with a real browser and wait for the content, still one request.',
        code: {
          language: 'go',
          title: 'spa.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
)

func main() {
  params := url.Values{
    "url":                    {"https://app.example.com/docs"},
    "data.markdown.attr":     {"markdown"},
    "data.markdown.selector": {"main"},
    "prerender":              {"true"},    // render JS in a real browser first
    "waitForSelector":        {"main h1"}, // wait until the content exists
    "meta":                   {"false"},
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Markdown string \`json:"markdown"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(payload.Data.Markdown)
}`
        }
      },
      {
        title: 'Get markdown back directly',
        description:
          'Skip the JSON envelope entirely: embed=markdown returns the page as text/markdown, ready to write into a file or a queue.',
        code: {
          language: 'go',
          title: 'embed.go',
          source: `package main

import (
  "io"
  "net/http"
  "net/url"
  "os"
)

func main() {
  params := url.Values{
    "url":                {"https://example.com"},
    "data.markdown.attr": {"markdown"},
    "meta":               {"false"},
    "embed":              {"markdown"}, // respond with text/markdown
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  markdown, _ := io.ReadAll(res.Body)

  os.WriteFile("page.md", markdown, 0o644)
}`
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
      'A Gin handler, an Echo route, or a queue worker — the same request becomes your own URL-to-markdown primitive for agents and RAG pipelines.',
    examples: [
      {
        id: 'gin',
        label: 'Gin',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
  "io"
  "net/http"
  "net/url"

  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()

  // GET /markdown?url=https://example.com
  r.GET("/markdown", func(c *gin.Context) {
    params := url.Values{
      "url":                {c.Query("url")},
      "data.markdown.attr": {"markdown"},
      "meta":               {"false"},
      "embed":              {"markdown"},
    }

    res, err := http.Get("https://api.microlink.io?" + params.Encode())
    if err != nil {
      c.Status(http.StatusBadGateway)
      return
    }
    defer res.Body.Close()

    markdown, _ := io.ReadAll(res.Body)

    c.Data(http.StatusOK, "text/markdown; charset=utf-8", markdown)
  })

  r.Run()
}`
        }
      },
      {
        id: 'echo',
        label: 'Echo',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
  "io"
  "net/http"
  "net/url"

  "github.com/labstack/echo/v4"
)

func main() {
  e := echo.New()

  // GET /markdown?url=https://example.com
  e.GET("/markdown", func(c echo.Context) error {
    params := url.Values{
      "url":                {c.QueryParam("url")},
      "data.markdown.attr": {"markdown"},
      "meta":               {"false"},
      "embed":              {"markdown"},
    }

    res, err := http.Get("https://api.microlink.io?" + params.Encode())
    if err != nil {
      return echo.ErrBadGateway
    }
    defer res.Body.Close()

    markdown, _ := io.ReadAll(res.Body)

    return c.Blob(http.StatusOK, "text/markdown; charset=utf-8", markdown)
  })

  e.Logger.Fatal(e.Start(":1323"))
}`
        }
      },
      {
        id: 'worker',
        label: 'Worker',
        code: {
          language: 'go',
          title: 'worker.go',
          source: `package main

import (
  "encoding/json"
  "log"
  "net/http"
  "net/url"
  "os"
)

// Converts a batch of URLs to markdown files
func main() {
  targets := []string{"https://example.com", "https://microlink.io"}

  for _, target := range targets {
    params := url.Values{
      "url":                    {target},
      "data.markdown.attr":     {"markdown"},
      "data.markdown.selector": {"article"},
      "meta":                   {"false"},
    }

    res, err := http.Get("https://api.microlink.io?" + params.Encode())
    if err != nil {
      log.Printf("fetch %s: %v", target, err)
      continue
    }

    var payload struct {
      Data struct {
        Markdown string \`json:"markdown"\`
      } \`json:"data"\`
    }
    json.NewDecoder(res.Body).Decode(&payload)
    res.Body.Close()

    name := url.QueryEscape(target) + ".md"
    os.WriteFile(name, []byte(payload.Data.Markdown), 0o644)
  }
}`
        }
      },
      {
        id: 'go',
        label: 'Plain Go',
        code: {
          language: 'go',
          title: 'markdown.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
  "os"
)

// go run markdown.go https://example.com
func main() {
  params := url.Values{
    "url":                {os.Args[1]},
    "data.markdown.attr": {"markdown"},
    "meta":               {"false"},
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Markdown string \`json:"markdown"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(payload.Data.Markdown)
}`
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
      'Rolling your own means fetching HTML, running a readability extractor like go-readability, converting to markdown, and adding chromedp when a page needs JavaScript. The API gives you clean markdown from any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY extraction pipeline',
        points: [
          'Fetch HTML, then chain go-readability + an HTML-to-md converter yourself',
          'Every site breaks your selectors in its own special way',
          'JavaScript-rendered pages need chromedp — a 300 MB browser',
          'Each browser eats hundreds of MB of RAM per worker',
          'You build the queueing, retries, caching and autoscaling',
          'Output quality drifts as sites change; you own the fixes'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Go',
        points: [
          'One HTTP request — net/http from the standard library, no module to add',
          'Runs anywhere: a single static binary, serverless, containers, your laptop',
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
        Built for the way you write <Accent>Go</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in Go — one call, JSON back, and at
        home in anything from a CLI tool to a worker fleet. Read the{' '}
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
          'No headless browser to install or keep patched. JavaScript rendering runs on Microlink’s side with prerender=true.'
      },
      {
        title: 'Standard Library Only',
        description:
          'net/http and encoding/json ship with Go — the examples compile with zero external modules.'
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
          'Drop it into Gin, Echo, or a queue worker as a handler in a few lines.'
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
      'Paste a URL and see the exact markdown output before you write a line of Go.',
    cta: {
      label: 'Open the URL to Markdown tool',
      href: '/tools/url-to-markdown'
    }
  },

  faq: {
    title: 'Go URL to Markdown FAQ',
    caption: (
      <>
        Everything Go developers ask before integrating the Microlink
        URL to Markdown API.
      </>
    ),
    questions: [
      {
        question: 'Do I need a headless browser?',
        answer: (
          <>
            <div>
              No. JavaScript rendering runs on Microlink’s managed browser
              fleet — pass <code>prerender=true</code> and the page is rendered
              before conversion. Your Go process stays browser-free.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a module?',
        answer: (
          <>
            <div>
              No. The examples use net/http and encoding/json from the Go standard library — they compile with zero external dependencies.
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
        question: 'Does it work in a single static binary?',
        answer: (
          <>
            <div>
              Yes. Because there is no browser binary or CGO dependency to ship, your Go service stays a single static binary — the rendering fleet runs on Microlink’s side.
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
              <code>text/markdown</code> directly — handy for piping into
              files, queues, or prompts without parsing an envelope.
            </div>
          </>
        )
      }
    ]
  },

  cta: {
    title: (
      <>
        Start <Accent>converting</Accent> in Go
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

export default go
