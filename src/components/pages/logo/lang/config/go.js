import React from 'react'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: '#f59f00' }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/logo/go'

const go = {
  lang: 'go',
  label: 'Go',

  meta: {
    title: 'Go Logo API — Get the Logo of Any URL',
    description:
      'Get the logo of any website in Go with a single HTTP request — markup, BIMI and favicon detection, format and dimensions, brand palette, hotlink-ready. Free to start.',
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Logo API for Go',
        name: 'Logo API for Go',
        description:
          'A developer guide to getting the logo of any URL programmatically in Go over the Microlink REST API — detection, image metadata, brand palette and hotlink embedding without scraping markup or probing images.',
        url: PAGE_URL,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Go 1.21+, standard library only',
        keywords:
          'go logo api, golang logo api, get logo from url golang, brand logo api, website logo golang, favicon api go',
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
            name: 'Go',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to get the logo of any URL in Go',
        description:
          'Get the logo of any URL as a hotlink-ready image with format, dimensions and brand palette in Go with one HTTP request in three steps.',
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

  breadcrumb: [{ label: 'Logo API', href: '/logo' }, { label: 'Go' }],

  hero: {
    title: (
      <>
        <Accent>Go</Accent> Logo API
      </>
    ),
    subtitle:
      'Get the logo behind any URL with one HTTP request in Go — markup, BIMI and favicon detection merged, with format, dimensions and brand palette.',
    demoAlt: 'Go logo API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/api/getting-started/overview'
    }
  },

  quickstart: {
    title: (
      <>
        Get a <Accent>logo</Accent> in Go
      </>
    ),
    caption:
      'No module and no scraping — the Microlink REST API detects the best logo for any URL and returns it with a single HTTP GET. Here it is with net/http and encoding/json from the Go standard library.',
    steps: [
      {
        title: 'Extract any URL',
        description:
          'A few lines with the standard library — no module to add. Point it at a domain and read the logo from the JSON response.',
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

type Logo struct {
  URL        string \`json:"url"\`
  Type       string \`json:"type"\`
  Width      int    \`json:"width"\`
  SizePretty string \`json:"size_pretty"\`
}

func main() {
  params := url.Values{"url": {"https://stripe.com"}}

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Logo Logo \`json:"logo"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(payload.Data.Logo.URL)        // absolute, hotlink-ready
  fmt.Println(payload.Data.Logo.SizePretty) // '3.14 kB'
}`
        }
      },
      {
        title: 'Read the logo fields',
        description:
          'URL, format, dimensions and byte size come back in one call — everything an img tag or an avatar component needs.',
        code: {
          language: 'go',
          title: 'palette.go',
          source: `package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
)

func main() {
  params := url.Values{
    "url":     {"https://stripe.com"},
    "palette": {"true"}, // add the brand palette to every detected image
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Logo struct {
        URL     string   \`json:"url"\`
        Palette []string \`json:"palette"\`
      } \`json:"logo"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  // Ordered from most dominant color to least
  fmt.Println(payload.Data.Logo.Palette) // [#543CFC #DEDAFC ...]
}`
        }
      },
      {
        title: 'Render JavaScript pages',
        description:
          'Icons injected by client-side JavaScript only exist after the page renders — prerender in a real browser and they are detected too, still one request.',
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
    "waitForSelector": {"h1"},   // detect only when the content exists
  }

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Logo struct {
        URL string \`json:"url"\`
      } \`json:"logo"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  // Icons injected by client-side JavaScript are found too
  fmt.Println(payload.Data.Logo.URL)
}`
        }
      },
      {
        title: 'Hotlink the image directly',
        description:
          'Add embed=logo.url and the API URL becomes the image itself — drop it into an img tag or a CSS background with no JSON parsing.',
        code: {
          language: 'go',
          title: 'embed.go',
          source: `package main

import (
  "fmt"
  "net/url"
)

func main() {
  params := url.Values{
    "url":   {"https://stripe.com"},
    "embed": {"logo.url"}, // the API URL becomes the image itself
  }

  logoURL := "https://api.microlink.io?" + params.Encode()

  // Drop it straight into an <img> tag — no JSON parsing
  fmt.Printf(\`<img src="%s" alt="stripe logo" />\`, logoURL)
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
      'A Gin redirect, an Echo proxy, or an avatar worker — the same request becomes your own logo endpoint.',
    examples: [
      {
        id: 'gin',
        label: 'Gin',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
  "net/http"
  "net/url"

  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()

  // GET /logo?url=https://stripe.com — redirect to the hotlink-ready image
  r.GET("/logo", func(c *gin.Context) {
    params := url.Values{
      "url":   {c.Query("url")},
      "embed": {"logo.url"},
    }

    c.Redirect(http.StatusFound, "https://api.microlink.io?"+params.Encode())
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

  // GET /logo?url=https://stripe.com — proxy the image bytes
  e.GET("/logo", func(c echo.Context) error {
    params := url.Values{
      "url":   {c.QueryParam("url")},
      "embed": {"logo.url"},
    }

    res, err := http.Get("https://api.microlink.io?" + params.Encode())
    if err != nil {
      return err
    }
    defer res.Body.Close()

    return c.Stream(http.StatusOK, res.Header.Get("Content-Type"), res.Body.(io.Reader))
  })

  e.Logger.Fatal(e.Start(":1323"))
}`
        }
      },
      {
        id: 'worker',
        label: 'Avatar Worker',
        code: {
          language: 'go',
          title: 'avatar.go',
          source: `package main

import (
  "encoding/json"
  "net/http"
  "net/url"
)

type BrandAvatar struct {
  Src   string
  Color string
}

// Pre-fetch logo and brand color for an avatar component
func brandAvatar(target string) (BrandAvatar, error) {
  params := url.Values{
    "url":     {target},
    "palette": {"true"},
  }

  res, err := http.Get("https://api.microlink.io?" + params.Encode())
  if err != nil {
    return BrandAvatar{}, err
  }
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Logo struct {
        URL     string   \`json:"url"\`
        Palette []string \`json:"palette"\`
      } \`json:"logo"\`
    } \`json:"data"\`
  }
  if err := json.NewDecoder(res.Body).Decode(&payload); err != nil {
    return BrandAvatar{}, err
  }

  color := "#cccccc"
  if len(payload.Data.Logo.Palette) > 0 {
    color = payload.Data.Logo.Palette[0]
  }
  return BrandAvatar{Src: payload.Data.Logo.URL, Color: color}, nil
}`
        }
      },
      {
        id: 'go',
        label: 'Plain Go',
        code: {
          language: 'go',
          title: 'logo.go',
          source: `// go run logo.go https://stripe.com
package main

import (
  "encoding/json"
  "fmt"
  "net/http"
  "net/url"
  "os"
)

func main() {
  params := url.Values{"url": {os.Args[1]}}

  res, _ := http.Get("https://api.microlink.io?" + params.Encode())
  defer res.Body.Close()

  var payload struct {
    Data struct {
      Logo json.RawMessage \`json:"logo"\`
    } \`json:"data"\`
  }
  json.NewDecoder(res.Body).Decode(&payload)

  fmt.Println(string(payload.Data.Logo))
}`
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
        heading: 'Microlink for Go',
        points: [
          'One HTTP request — net/http, no module to add',
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
        Built for the way you write <Accent>Go</Accent>.
      </>
    ),
    caption: (
      <>
        A REST API that feels native in Go — one call, JSON back, and at home in
        anything from a CLI to a logo proxy. Read the{' '}
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
        title: 'Standard Library Only',
        description:
          'net/http and encoding/json ship with Go — the examples compile with zero external dependencies.'
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
          'Drop it into Gin, Echo, or an avatar worker as a handler in a few lines.'
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
      'Paste a URL and see the detected logo before you write a line of Go.',
    cta: {
      label: 'Open the live demo',
      href: '/logo'
    }
  },

  faq: {
    title: 'Go Logo API FAQ',
    caption: (
      <>
        Everything Go developers ask before integrating the Microlink logo API.
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
        Start <Accent>extracting</Accent> in Go
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

export default go
