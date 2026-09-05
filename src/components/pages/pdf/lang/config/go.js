import React from 'react'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'
import { ACCENT } from 'components/pages/pdf/shared'

const Accent = ({ children }) => (
  <span style={{ color: ACCENT }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/pdf/go'
const OG_IMAGE = 'https://cdn.microlink.io/banner/pdf.jpeg'

const HELPER_SOURCE = `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/url"
)

func pdfURL(target string) (string, error) {
    endpoint, err := url.Parse("https://api.microlink.io")
    if err != nil {
        return "", err
    }

    query := endpoint.Query()
    query.Set("url", target)
    query.Set("pdf", "true")
    query.Set("meta", "false")
    endpoint.RawQuery = query.Encode()

    res, err := http.Get(endpoint.String())
    if err != nil {
        return "", err
    }
    defer res.Body.Close()

    var payload struct {
        Data struct {
            PDF struct {
                URL string \`json:"url"\`
            } \`json:"pdf"\`
        } \`json:"data"\`
    }

    if err := json.NewDecoder(res.Body).Decode(&payload); err != nil {
        return "", err
    }

    return payload.Data.PDF.URL, nil
}

func main() {
    link, err := pdfURL("https://example.com")
    if err != nil {
        panic(err)
    }

    fmt.Println(link)
}`

const go = {
  lang: 'go',
  label: 'Go',

  meta: {
    title: 'Golang HTML to PDF API without chromedp',
    description:
      'Convert any URL to a pixel-perfect PDF in Go with one HTTP request — no chromedp, no Chrome binary to install. Works with net/http, Gin, Echo and Chi.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'HTML to PDF API for Go',
        name: 'HTML to PDF API for Go',
        description:
          'A developer guide to converting web pages to PDF programmatically in Go over the Microlink REST API — request, convert, framework integration, and serverless deployment without shipping a Chrome binary.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Go 1.21+, standard library only',
        keywords:
          'golang html to pdf api, url to pdf go, convert webpage to pdf golang, chromedp alternative, generate pdf from html go, net/http pdf',
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
            name: 'Go',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to convert a URL to PDF in Go',
        description:
          'Convert any URL into a PDF document in Go with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Go' },
          { '@type': 'HowToTool', name: 'net/http' }
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
            text: 'Decode the JSON response and read the hosted document from data.pdf.url.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the PDF URL',
            text: 'Serve the hosted document to your users or stream it to disk.'
          }
        ]
      }
    ]
  },

  breadcrumb: [{ label: 'PDF API', href: '/pdf' }, { label: 'Go' }],

  hero: {
    title: (
      <>
        <Accent>Go</Accent> HTML to PDF API
      </>
    ),
    subtitle:
      'Convert any URL into a pixel-perfect PDF with one HTTP request in Go — no chromedp, no Chrome binary in your image, no servers to maintain.',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/pdf'
    }
  },

  quickstart: {
    title: (
      <>
        Convert a URL to <Accent>PDF</Accent> in Go
      </>
    ),
    caption:
      'No SDK and no browser binaries — the Microlink REST API turns any URL into a hosted PDF with a single HTTP GET. Everything below is standard library: net/http, net/url and encoding/json.',
    steps: [
      {
        title: 'Start a module',
        description:
          'Nothing to go get. The API is plain HTTP, so the standard library is the only dependency.',
        code: { language: 'bash', source: 'go mod init example.com/pdf' }
      },
      {
        title: 'Convert any URL',
        description:
          'Point it at a page, ask for a PDF, and decode the hosted document URL from the JSON response. This helper is reused everywhere below.',
        code: {
          language: 'go',
          title: 'main.go',
          source: HELPER_SOURCE
        }
      },
      {
        title: 'Customize the document',
        description:
          'Paper format, margins, orientation, and print CSS are all query params. Nested options use dot notation, so pdf.format maps to the format field.',
        code: {
          language: 'go',
          title: 'options.go',
          source: `func withOptions(endpoint *url.URL, target string) {
    query := endpoint.Query()
    query.Set("url", target)
    query.Set("pdf.format", "A4")        // A0-A6 | Letter | Legal | Tabloid
    query.Set("pdf.margin", "0.35cm")    // cm, mm, in or px
    query.Set("pdf.landscape", "false")  // portrait (default) | landscape
    query.Set("mediaType", "print")      // print CSS stylesheets | screen (default)
    query.Set("meta", "false")
    endpoint.RawQuery = query.Encode()
}`
        }
      },
      {
        title: 'Stream it to disk',
        description:
          'The response is a hosted PDF URL on a global CDN. Copy it into a file with a second request, or hand the URL straight to your template.',
        code: {
          language: 'go',
          title: 'save.go',
          source: `func savePDF(target string) error {
    link, err := pdfURL(target)
    if err != nil {
        return err
    }

    res, err := http.Get(link)
    if err != nil {
        return err
    }
    defer res.Body.Close()

    file, err := os.Create("document.pdf")
    if err != nil {
        return err
    }
    defer file.Close()

    _, err = io.Copy(file, res.Body)
    return err
}`
        }
      }
    ]
  },

  framework: {
    title: (
      <>
        Drop it into your <Accent>router</Accent>
      </>
    ),
    caption:
      'A handler, a route, or a standalone binary — the same request becomes ' +
      'your own PDF endpoint, perfect for invoice downloads, nightly reports, ' +
      'and export views in net/http, Gin, Echo or Chi.',
    examples: [
      {
        id: 'nethttp',
        label: 'net/http',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
    "log"
    "net/http"
)

// GET /pdf?url=https://example.com
func main() {
    http.HandleFunc("/pdf", func(w http.ResponseWriter, r *http.Request) {
        link, err := pdfURL(r.URL.Query().Get("url"))
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadGateway)
            return
        }

        http.Redirect(w, r, link, http.StatusFound)
    })

    log.Fatal(http.ListenAndServe(":3000", nil))
}`
        }
      },
      {
        id: 'gin',
        label: 'Gin',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

// GET /pdf?url=https://example.com
func main() {
    router := gin.Default()

    router.GET("/pdf", func(c *gin.Context) {
        link, err := pdfURL(c.Query("url"))
        if err != nil {
            c.String(http.StatusBadGateway, err.Error())
            return
        }

        c.Redirect(http.StatusFound, link)
    })

    router.Run(":3000")
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
    "net/http"

    "github.com/labstack/echo/v4"
)

// GET /pdf?url=https://example.com
func main() {
    e := echo.New()

    e.GET("/pdf", func(c echo.Context) error {
        link, err := pdfURL(c.QueryParam("url"))
        if err != nil {
            return err
        }

        return c.Redirect(http.StatusFound, link)
    })

    e.Logger.Fatal(e.Start(":3000"))
}`
        }
      },
      {
        id: 'chi',
        label: 'Chi',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
    "log"
    "net/http"

    "github.com/go-chi/chi/v5"
)

// GET /pdf?url=https://example.com
func main() {
    router := chi.NewRouter()

    router.Get("/pdf", func(w http.ResponseWriter, r *http.Request) {
        link, err := pdfURL(r.URL.Query().Get("url"))
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadGateway)
            return
        }

        http.Redirect(w, r, link, http.StatusFound)
    })

    log.Fatal(http.ListenAndServe(":3000", router))
}`
        }
      }
    ],
    footnote: {
      text: 'Every tab reuses the helper from the quickstart:',
      code: 'func pdfURL(target string) (string, error)'
    }
  },

  comparison: {
    title: (
      <>
        Ship a binary, not a <Accent>browser</Accent>
      </>
    ),
    caption:
      'Rendering a web page to PDF from Go means driving headless Chrome yourself, shelling out to a binary, or drawing the document by hand. The API gives you a real browser rendering engine without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted PDF tooling',
        points: [
          'chromedp and rod need a Chrome install on every host that runs them',
          'wkhtmltopdf wrappers shell out to a binary archived upstream',
          'gofpdf and maroto draw documents from primitives, never from a URL',
          'Each browser eats hundreds of MB of RAM; workers crash under load',
          'You build the pooling, queueing, retries and autoscaling',
          'Fonts, emoji, and modern CSS break differently on every host'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Go',
        points: [
          'One HTTP request — net/http and encoding/json, nothing to go get',
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
        Built for the way you write <Accent>Go</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in Go — one HTTP call, JSON back, and at
        home in any runtime from a Chi service to an AWS Lambda. Read the{' '}
        <Link href='/docs/guides/pdf'>PDF guide</Link> to go deeper.
      </>
    ),
    items: [
      {
        title: 'No Binaries to Install',
        description:
          'Skip chromedp and the Chrome install it expects. There is no rendering engine to download, patch, or keep in sync across hosts.'
      },
      {
        title: 'Standard Library Only',
        description:
          'net/http builds the request, net/url builds the query, encoding/json reads the response. No module to add to go.mod.'
      },
      {
        title: 'Router Friendly',
        description:
          'Drop it into net/http, Gin, Echo, or Chi as a handler in a few lines. The same request works in every router.'
      },
      {
        title: 'Small Container Images',
        description:
          'No browser layer to bundle. A scratch or distroless image stays a static binary, which keeps cold starts on Lambda and Cloud Run short.'
      },
      {
        title: 'Real Browser Rendering',
        description:
          'Pages render in Headless Chrome, so JavaScript-driven dashboards and charts come out right — the blind spot of PDF builders that never run scripts.'
      },
      {
        title: 'Zero Infrastructure',
        description:
          'No Chrome to pin to a driver version and no browser pool inside your service. Your binary stays a plain HTTP client.'
      },
      {
        title: 'Custom Paper & Layout',
        description:
          'Every layout option is a query param: pdf.format, pdf.margin, pdf.landscape, pdf.scale, and pdf.pageRanges.'
      },
      {
        title: 'Screen & Print Media',
        description:
          'Set mediaType to print in the same query to apply print stylesheets, or keep the default screen layout.'
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
      'Paste a URL and see the exact API request before you write a line of Go.',
    cta: {
      label: 'Open the PDF tool',
      href: '/tools/website-to-pdf'
    }
  },

  faq: {
    title: 'Go PDF FAQ',
    caption: (
      <>
        What Go developers ask before integrating. For formats, limits, and SLA,
        see the <Link href='/pdf'>PDF API overview</Link>.
      </>
    ),
    questions: [
      {
        question: 'Do I need chromedp or a Chrome binary?',
        answer: (
          <>
            <div>
              No. It is a plain HTTP request to the Microlink API — there is no
              Chrome to install next to your binary and no driver to pin. The
              Headless Chrome fleet runs on Microlink&apos;s side.
            </div>
            <div>
              That keeps your container image a static binary, so a scratch or
              distroless base still works.
            </div>
          </>
        )
      },
      {
        question: 'Do I need a third-party HTTP client?',
        answer: (
          <>
            <div>
              No. <code>net/http</code> sends the request, <code>net/url</code>{' '}
              builds the query string, and <code>encoding/json</code> decodes
              the response — all standard library.
            </div>
            <div>
              Clients like <code>resty</code> work the same way if you already
              use one; the request is an ordinary <code>GET</code> either way.
            </div>
          </>
        )
      },
      {
        question: 'Is it safe to call from many goroutines?',
        answer: (
          <>
            <div>
              Yes. Each conversion is an independent stateless request, and an{' '}
              <code>http.Client</code> is safe for concurrent use by multiple
              goroutines, so one shared client serves your whole worker pool.
            </div>
            <div>
              Concurrency is bounded by your plan rather than your hardware —
              check the{' '}
              <Link href='/docs/api/basics/rate-limit'>rate limit</Link> docs
              before fanning out widely.
            </div>
          </>
        )
      },
      {
        question: 'Does it work with Gin, Echo, and Chi?',
        answer: (
          <>
            <div>
              Yes. Because it is just an HTTP call, it drops into any handler in
              a few lines — see the tabs above for net/http, Gin, Echo, and Chi,
              or the <Link href='/docs/guides/pdf'>PDF guide</Link>.
            </div>
          </>
        )
      },
      {
        question: 'How do I authenticate from Go?',
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
              Build the request with <code>http.NewRequest</code>, call{' '}
              <code>req.Header.Set(&quot;x-api-key&quot;, key)</code>, and send
              it with <code>client.Do(req)</code>. See the{' '}
              <Link href='/docs/api/basics/authentication'>
                authentication docs
              </Link>{' '}
              and <Link href='/pricing'>pricing</Link>.
            </div>
          </>
        )
      },
      {
        question: 'How do I set a timeout?',
        answer: (
          <>
            <div>
              Give the shared <code>http.Client</code> a <code>Timeout</code>,
              or build the request with <code>http.NewRequestWithContext</code>{' '}
              so an inbound request cancelling propagates to the conversion.
            </div>
            <div>
              Rendering happens on Microlink&apos;s side, so your service only
              ever waits on the network.
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
      'Get 25 requests/day with zero commitment — no account, no credit card. Paste the helper into a handler and ship a PDF today.',
    primary: {
      label: 'Read the API docs',
      href: '/docs/api/getting-started/overview'
    },
    secondary: { label: 'See pricing', href: '/pricing' },
    badges: ['No login needed', '25 reqs/day free', 'No credit card']
  }
}

export default go
