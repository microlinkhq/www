import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: '#3e55ff' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/metadata/go'

const go = {
  lang: 'go',
  label: 'Go',

  meta: {
    title: 'Go Metadata API — Extract Metadata from Any URL',
    description:
      'Extract title, description, image and logo from any URL in Go with a single HTTP request — no HTML parsing, no headless browser. Open Graph, Twitter Cards and JSON-LD merged. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Website Metadata API for Go',
        name: 'Website Metadata API for Go',
        description:
          'A developer guide to extracting website metadata programmatically in Go over the Microlink REST API — request, extract, framework integration, and link previews without parsing HTML or running a headless browser.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Go 1.21+, standard library only',
        keywords:
          'go metadata api, website metadata api, url metadata golang, open graph parser go, link preview api, url preview golang',
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
            name: 'Go',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to extract website metadata in Go',
        description:
          'Extract title, description, image and logo from any URL in Go with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Go' },
          { '@type': 'HowToTool', name: 'net/http' }
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

  breadcrumb: [{ label: 'Metadata API', href: '/metadata' }, { label: 'Go' }],

  hero: {
    title: (
      <>
        <Accent>Go</Accent> Metadata API
      </>
    ),
    subtitle:
      'Extract title, description, image and logo from any URL with one HTTP request in Go — no HTML parsing, no tag soup, no browser to maintain.',
    demoAlt: 'Go website metadata API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/api/getting-started/overview'
    }
  },

  quickstart: {
    title: (
      <>
        Extract <Accent>metadata</Accent> in Go
      </>
    ),
    caption:
      'No module and no parser — the Microlink REST API turns any URL into normalized metadata with a single HTTP GET. Here it is with net/http from the Go standard library.',
    steps: [
      {
        title: 'Extract any URL',
        description:
          'A few lines with the standard library — no module to add. Point it at a page and read the metadata from the JSON response.',
        code: {
          language: 'go',
          title: 'extract.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
)

type Metadata struct {
  Title       string \`json:"title"\`
  Description string \`json:"description"\`
  Image       *Asset \`json:"image"\`
  Logo        *Asset \`json:"logo"\`
}

type Asset struct {
  URL string \`json:"url"\`
}

func main() {
  params := url.Values{"url": {"https://microlink.io"}}

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data Metadata \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(payload.Data.Title)
  fmt.Println(payload.Data.Description)
}`
        }
      },
      {
        title: 'Pick the fields you need',
        description:
          'Title, description, publisher, author, date, lang, image and logo all come back in one call — build exactly the object your product needs.',
        code: {
          language: 'go',
          title: 'fields.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
)

type Metadata struct {
  Title       string  \`json:"title"\`
  Description string  \`json:"description"\`
  Publisher   string  \`json:"publisher"\`
  Author      *string \`json:"author"\`
  Date        *string \`json:"date"\`
  Lang        string  \`json:"lang"\`
  Image       *Asset  \`json:"image"\`
  Logo        *Asset  \`json:"logo"\`
}

type Asset struct {
  URL string \`json:"url"\`
}

func main() {
  params := url.Values{"url": {"https://microlink.io"}}

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data Metadata \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Printf("%+v\n", payload.Data)
}`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Tags injected by client-side JavaScript only exist after the page renders — prerender with a real browser and wait for them, still one request.',
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
    "prerender":       {"true"}, // render JS in a real browser first
    "waitForSelector": {"h1"},   // wait until the content exists
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Title string \`json:"title"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(payload.Data.Title)
}`
        }
      },
      {
        title: 'Build a link preview',
        description:
          'Image and logo come back as absolute, CDN-hosted URLs — drop them straight into an img tag and you have a link preview.',
        code: {
          language: 'go',
          title: 'link_preview.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
)

type Metadata struct {
  URL         string \`json:"url"\`
  Title       string \`json:"title"\`
  Description string \`json:"description"\`
  Image       *Asset \`json:"image"\`
  Logo        *Asset \`json:"logo"\`
}

type Asset struct {
  URL string \`json:"url"\`
}

func main() {
  params := url.Values{"url": {"https://microlink.io"}}

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data Metadata \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  data := payload.Data
  image := ""
  if data.Image != nil {
    image = data.Image.URL
  } else if data.Logo != nil {
    image = data.Logo.URL
  }

  fmt.Printf(\`<a href="%s" class="card">
  <img src="%s" alt="" />
  <strong>%s</strong>
  <p>%s</p>
</a>\`, data.URL, image, data.Title, data.Description)
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
      'A Gin handler, an Echo route, or an enrichment worker — the same request becomes your own metadata endpoint for link previews and data pipelines.',
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

  // GET /preview?url=https://microlink.io
  r.GET("/preview", func(c *gin.Context) {
    params := url.Values{"url": {c.Query("url")}}

    res, err := http.Get("https://api.microlink.io?" + params.Encode())
    if err != nil {
      c.Status(http.StatusBadGateway)
      return
    }
    defer res.Body.Close()

    var payload struct {
      Data map[string]any \`json:"data"\`
    }
    json.NewDecoder(res.Body).Decode(&payload)

    c.JSON(http.StatusOK, payload.Data)
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

  // GET /preview?url=https://microlink.io
  e.GET("/preview", func(c echo.Context) error {
    params := url.Values{"url": {c.QueryParam("url")}}

    res, err := http.Get("https://api.microlink.io?" + params.Encode())
    if err != nil {
      return echo.ErrBadGateway
    }
    defer res.Body.Close()

    var payload struct {
      Data map[string]any \`json:"data"\`
    }
    json.NewDecoder(res.Body).Decode(&payload)

    return c.JSON(http.StatusOK, payload.Data)
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
)

// Enrichs a list of company URLs with metadata
func main() {
  targets := []string{"https://microlink.io", "https://vercel.com"}

  for _, target := range targets {
    params := url.Values{"url": {target}}

    res, err := http.Get("https://api.microlink.io?" + params.Encode())
    if err != nil {
      log.Printf("fetch %s: %v", target, err)
      continue
    }

    var payload struct {
      Data struct {
        Title string \`json:"title"\`
        Logo  *struct {
          URL string \`json:"url"\`
        } \`json:"logo"\`
      } \`json:"data"\`
    }
    json.NewDecoder(res.Body).Decode(&payload)
    res.Body.Close()

    log.Printf("%s → %s", target, payload.Data.Title)
  }
}`
        }
      },
      {
        id: 'go',
        label: 'Plain Go',
        code: {
          language: 'go',
          title: 'metadata.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "io"
  "net/http"
  "net/url"
  "os"
)

// go run metadata.go https://microlink.io
func main() {
  params := url.Values{"url": {os.Args[1]}}

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data json.RawMessage \`json:"data"\`
  }
  body, _ := io.ReadAll(res.Body)
  json.Unmarshal(body, &payload)

  var pretty any
  json.Unmarshal(payload.Data, &pretty)
  out, _ := json.MarshalIndent(pretty, "", "  ")

  fmt.Println(string(out))
}`
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
      'Rolling your own means fetching HTML, parsing Open Graph and Twitter Cards with goquery, merging JSON-LD and oEmbed, and adding chromedp for JavaScript-injected tags. The API gives you normalized metadata from any page without any of the moving parts.',
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
        heading: 'Microlink for Go',
        points: [
          'One HTTP request — net/http from the standard library, no module to add',
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
        Built for the way you write <Accent>Go</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in Go — one call, JSON back, and at home in
        anything from a CLI tool to a worker fleet. Read the{' '}
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
        title: 'Standard Library Only',
        description:
          'net/http and encoding/json ship with Go — the examples compile with zero external modules.'
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
          'Drop it into Gin, Echo, or an enrichment worker as a handler in a few lines.'
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
      'Paste a URL and see the exact metadata response before you write a line of Go.',
    cta: {
      label: 'Open the sharing debugger',
      href: '/tools/sharing-debugger'
    }
  },

  faq: {
    title: 'Go Metadata API FAQ',
    caption: (
      <>
        Everything Go developers ask before integrating the Microlink metadata
        API.
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
        question: 'Do I need to install a module?',
        answer: (
          <>
            <div>
              No. The examples use net/http and encoding/json from the Go
              standard library — they compile with zero external dependencies.
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
        Start <Accent>extracting</Accent> in Go
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

export default go
