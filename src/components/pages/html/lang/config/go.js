import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: '#7048e8' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/html/go'

const go = {
  lang: 'go',
  label: 'Go',

  meta: {
    title: 'Go HTML API — Get Rendered HTML from Any URL',
    description:
      'Get the fully rendered HTML of any URL in Go with a single HTTP request — real browser rendering, selector scoping, no headless browser to run. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'HTML Extraction API for Go',
        name: 'HTML Extraction API for Go',
        description:
          'A developer guide to getting the rendered HTML of any URL programmatically in Go over the Microlink REST API — request, selector scoping, JavaScript rendering, and framework integration without running a headless browser.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Go 1.21+, standard library only',
        keywords:
          'go html api, golang html api, get html from url golang, render html api, scrape html golang, website to html go',
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
          name: 'Microlink HTML API',
          url: 'https://microlink.io/html',
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
            name: 'HTML API',
            item: 'https://microlink.io/html'
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
        name: 'How to get the rendered HTML of any URL in Go',
        description:
          'Get the fully rendered HTML of any URL in Go with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Go' },
          { '@type': 'HowToTool', name: 'net/http' }
        ],
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Send the request',
            text: 'Make an HTTP GET to api.microlink.io with the url and data.html.attr=html parameters.',
            url: `${PAGE_URL}#quickstart`
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Read the HTML',
            text: 'Decode the JSON response and read the rendered markup from data.html.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the HTML',
            text: 'Archive the page, serve it, or feed it to your parser of choice.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'HTML API', href: '/html' }, { label: 'Go' }],

  hero: {
    title: (
      <>
        <Accent>Go</Accent> HTML API
      </>
    ),
    subtitle:
      'Get the fully rendered HTML of any URL with one HTTP request in Go — real Chromium under the hood, none to maintain.',
    demoAlt: 'Go HTML API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/api/getting-started/overview'
    }
  },

  quickstart: {
    title: (
      <>
        Get <Accent>HTML</Accent> in Go
      </>
    ),
    caption:
      'No module and no browser — the Microlink REST API renders any URL and returns the HTML with a single HTTP GET. Here it is with net/http and encoding/json from the Go standard library.',
    steps: [
      {
        title: 'Extract any URL',
        description:
          'A few lines with the standard library — no module to add, no Chromium download. Point it at a page and read the rendered HTML from the JSON response.',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
)

func main() {
  params := url.Values{
    "url":            {"https://microlink.io"},
    "data.html.attr": {"html"},
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      HTML string \`json:"html"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(len(payload.Data.HTML)) // full rendered document
}`
        }
      },
      {
        title: 'Scope to a selector',
        description:
          'Return the whole document or only the subtree you need — smaller responses, less parsing and lower token cost downstream.',
        code: {
          language: 'go',
          title: 'selector.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
)

func main() {
  params := url.Values{
    "url":               {"https://microlink.io/blog"},
    "data.html.attr":    {"html"},
    "data.html.selector": {"main"}, // only the <main> subtree
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      HTML string \`json:"html"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  // No nav, no footer — just the content you asked for
  fmt.Println(payload.Data.HTML)
}`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Client-rendered apps only produce their markup after JavaScript runs — prerender in a real browser and wait for it, still one request.',
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
    "url":             {"https://app.example.com"},
    "data.html.attr":  {"html"},
    "prerender":       {"true"}, // render JS in a real browser first
    "waitForSelector": {"h1"},   // capture only when the content exists
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      HTML string \`json:"html"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(payload.Data.HTML)
}`
        }
      },
      {
        title: 'Serve the raw HTML',
        description:
          'Ask for embed=html and the API answers with text/html directly — proxy it straight to a browser or write it to a file.',
        code: {
          language: 'go',
          title: 'raw.go',
          source: `package main

import (
  "fmt"
  "io"
  "net/http"
  "net/url"
)

func main() {
  params := url.Values{
    "url":            {"https://microlink.io"},
    "data.html.attr": {"html"},
    "embed":          {"html"}, // respond with text/html, no JSON
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  html, _ := io.ReadAll(res.Body) // ready to serve or store
  fmt.Println(string(html))
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
      'A Gin handler, an Echo endpoint, or an archive worker — the same request becomes your own rendering endpoint.',
    examples: [
      {
        id: 'gin',
        label: 'Gin',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
  "encoding/json"
  "net/http"
  "net/url"

  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()

  // GET /render?url=https://microlink.io
  r.GET("/render", func(c *gin.Context) {
    params := url.Values{
      "url":            {c.Query("url")},
      "data.html.attr": {"html"},
    }

    res, _ := http.Get("https://api.microlink.io?" + params.Encode())
    defer res.Body.Close()

    var payload struct {
      Data struct {
        HTML string \`json:"html"\`
      } \`json:"data"\`
    }
    json.NewDecoder(res.Body).Decode(&payload)

    c.Data(http.StatusOK, "text/html; charset=utf-8", []byte(payload.Data.HTML))
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
  "encoding/json"
  "net/http"
  "net/url"

  "github.com/labstack/echo/v4"
)

func main() {
  e := echo.New()

  // GET /render?url=https://microlink.io
  e.GET("/render", func(c echo.Context) error {
    params := url.Values{
      "url":            {c.QueryParam("url")},
      "data.html.attr": {"html"},
    }

    res, _ := http.Get("https://api.microlink.io?" + params.Encode())
    defer res.Body.Close()

    var payload struct {
      Data struct {
        HTML string \`json:"html"\`
      } \`json:"data"\`
    }
    json.NewDecoder(res.Body).Decode(&payload)

    return c.HTML(http.StatusOK, payload.Data.HTML)
  })

  e.Logger.Fatal(e.Start(":1323"))
}`
        }
      },
      {
        id: 'worker',
        label: 'Archiver',
        code: {
          language: 'go',
          title: 'archive.go',
          source: `package main

import (
  "encoding/json"
  "net/http"
  "net/url"
  "os"
)

// Save a fully rendered copy of a page
func archive(target, path string) error {
  params := url.Values{
    "url":            {target},
    "data.html.attr": {"html"},
  }

  res, err := http.Get("https://api.microlink.io?" + params.Encode())
  if err != nil {
    return err
  }
  defer res.Body.Close()

  var payload struct {
    Data struct {
      HTML string \`json:"html"\`
    } \`json:"data"\`
  }
  if err := json.NewDecoder(res.Body).Decode(&payload); err != nil {
    return err
  }

  return os.WriteFile(path, []byte(payload.Data.HTML), 0o644)
}`
        }
      },
      {
        id: 'go',
        label: 'Plain Go',
        code: {
          language: 'go',
          title: 'html.go',
          source: `// go run html.go https://microlink.io
package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
  "os"
)

func main() {
  params := url.Values{
    "url":            {os.Args[1]},
    "data.html.attr": {"html"},
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      HTML string \`json:"html"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(payload.Data.HTML)
}`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>browser-farm</Accent> ops
      </>
    ),
    caption:
      'Rolling your own means driving chromedp against your own Chromium fleet, writing per-site wait logic, and fighting antibot walls. The API returns the rendered HTML of any page without any of the moving parts.',
    columns: [
      {
        tone: 'negative',
        heading: 'DIY rendering stack',
        points: [
          'Run and patch your own headless Chromium fleet',
          'Write per-site wait logic for JavaScript-rendered pages',
          'Fight antibot walls and CAPTCHAs with your own proxy pool',
          'Each browser eats hundreds of MB of RAM per worker',
          'You build the caching, retries and autoscaling',
          'Every Chromium upgrade breaks a selector somewhere'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Go',
        points: [
          'One HTTP request — no rendering infrastructure to run',
          'Fully rendered HTML from managed Chromium, JS included',
          'Selector scoping to return only the subtree you need',
          'Antibot and CAPTCHA resolution handled for you',
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
        A REST API that feels native in Go — one call, JSON back, and at home in
        anything from a CLI to a render proxy. Read the{' '}
        <Link href='/docs/api/getting-started/overview'>API overview</Link> to
        go deeper.
      </>
    ),
    items: [
      {
        title: 'Real Browser Rendering',
        description:
          'Every request runs in managed Chromium, so client-rendered apps return complete markup instead of an empty shell.'
      },
      {
        title: 'Standard Library Only',
        description:
          'net/http and encoding/json ship with Go — the examples compile with zero external dependencies and no browser to manage.'
      },
      {
        title: 'Selector Scoping',
        description:
          'Return the full document or a single subtree with a selector — smaller payloads and less parsing downstream.'
      },
      {
        title: 'JSON or Raw HTML',
        description:
          'Read data.html from the JSON response, or ask for embed=html and get the document back as text/html — no JSON involved.'
      },
      {
        title: 'Readiness You Control',
        description:
          'waitUntil and waitForSelector let you block on network idle or on a specific element before the HTML is captured.'
      },
      {
        title: 'One Call, Many Formats',
        description:
          'Request HTML together with markdown, text, metadata, screenshots or PDFs and pay for a single render instead of several.'
      },
      {
        title: 'Framework Friendly',
        description:
          'Drop it into Gin, Echo, or an archive worker as a handler in a few lines.'
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
      'Paste a URL and see the rendered output before you write a line of Go.',
    cta: {
      label: 'Open the live demo',
      href: '/html'
    }
  },

  faq: {
    title: 'Go HTML API FAQ',
    caption: (
      <>
        Everything Go developers ask before integrating the Microlink HTML API.
      </>
    ),
    questions: [
      {
        question: 'Do I get the source HTML or the rendered DOM?',
        answer: (
          <>
            <div>
              Every request runs in a real Chromium instance, so data.html is
              the fully rendered DOM — JavaScript executed, lazy content loaded.
              Control the capture point with waitUntil and waitForSelector.
            </div>
          </>
        )
      },
      {
        question: 'Do I need to install a module or a browser?',
        answer: (
          <>
            <div>
              No. The examples use net/http and encoding/json from the Go
              standard library, and rendering runs on Microlink — no chromedp,
              no Chromium binary in your image.
            </div>
          </>
        )
      },
      {
        question: 'How do I control when the HTML is captured?',
        answer: (
          <>
            <div>
              Use <code>waitUntil</code> to block on network idle or a fixed
              delay, and <code>waitForSelector</code> to hold the capture until
              a specific element exists — the HTML comes back exactly when your
              page is ready, still in one request.
            </div>
          </>
        )
      },
      {
        question: 'Can I get only part of the page?',
        answer: (
          <>
            <div>
              Yes. Add a <code>selector</code> to the extraction rule and only
              that subtree comes back — ideal for articles, product cards or
              pricing tables, with smaller payloads and less parsing downstream.
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
        question: 'How fresh is the HTML?',
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
        Start <Accent>extracting</Accent> in Go
      </>
    ),
    caption:
      'Get 25 requests/day with zero commitment — no account and no credit card. Send your first request and get HTML back in minutes.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default go
