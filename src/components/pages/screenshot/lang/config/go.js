import React from 'react'
import { colors } from 'theme'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { Link } from 'components/elements/Link'

const Accent = ({ children }) => (
  <span style={{ color: colors.red6 }}>{children}</span>
)

const PAGE_URL = 'https://microlink.io/screenshot/go'
const OG_IMAGE = 'https://cdn.microlink.io/banner/screenshot.jpeg'

const RESPONSE_TYPE = `type response struct {
    Data struct {
        Screenshot struct {
            URL string \`json:"url"\`
        } \`json:"screenshot"\`
    } \`json:"data"\`
}`

const SCREENSHOT_URL_FUNC = `func screenshotURL(target string) (string, error) {
    query := url.Values{
        "url":        {target},
        "screenshot": {"true"},
        "meta":       {"false"},
    }

    res, err := http.Get("https://api.microlink.io?" + query.Encode())
    if err != nil {
        return "", err
    }
    defer res.Body.Close()

    var body response
    if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
        return "", err
    }

    return body.Data.Screenshot.URL, nil
}`

const go = {
  lang: 'go',
  label: 'Go',

  meta: {
    title: 'Golang Screenshot API — Capture Any Website',
    description:
      'Golang screenshot API — capture any URL with one HTTP request. No chromedp, no Chrome binary. Works with net/http, Gin, Echo and Fiber. Free to start.',
    image: OG_IMAGE,
    structured: [
      {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': `${PAGE_URL}#article`,
        headline: 'Website Screenshot API for Go',
        name: 'Website Screenshot API for Go',
        description:
          'A developer guide to capturing website screenshots programmatically in Go over the Microlink REST API — request, capture, framework integration, and serverless deployment without running chromedp or Headless Chrome.',
        url: PAGE_URL,
        image: OG_IMAGE,
        inLanguage: 'en',
        proficiencyLevel: 'Beginner',
        dependencies: 'Go 1.21+, standard library only',
        keywords:
          'go screenshot api, golang screenshot api, take screenshot go, website screenshot golang, chromedp alternative, capture url go, net/http screenshot',
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
            name: 'Go',
            item: PAGE_URL
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#howto`,
        name: 'How to take a website screenshot in Go',
        description:
          'Capture a screenshot of any URL in Go with one HTTP request to the Microlink API in three steps.',
        tool: [
          { '@type': 'HowToTool', name: 'Go' },
          { '@type': 'HowToTool', name: 'net/http' }
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
            text: 'Decode the JSON response and read the hosted image from data.screenshot.url.'
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use the image URL',
            text: 'Serve the hosted screenshot to your users or write it to disk.'
          }
        ]
      }
    ]
  },

  breadcrumb: [
    { label: 'Screenshot API', href: '/screenshot' },
    { label: 'Go' }
  ],

  hero: {
    title: (
      <>
        <Accent>Go</Accent> Screenshot API
      </>
    ),
    subtitle:
      'Capture pixel-perfect screenshots of any URL with one HTTP request in Go — no chromedp, no Chrome binary next to your binary, no servers to maintain.',
    demoAlt: 'Go website screenshot API example',
    primaryCta: { label: 'Get started free', href: '#quickstart' },
    secondaryCta: {
      label: 'Read the docs',
      href: '/docs/guides/screenshot'
    }
  },

  quickstart: {
    title: (
      <>
        Take a <Accent>screenshot</Accent> in Go
      </>
    ),
    caption:
      'No SDK and no chromedp — the Microlink REST API turns any URL into a hosted screenshot with a single HTTP GET. Everything below is standard library: net/http, net/url and encoding/json.',
    steps: [
      {
        title: 'Start a module',
        description:
          'There is nothing to go get. net/http sends the request, encoding/json reads it back, and the dependency list stays empty.',
        code: { language: 'bash', source: 'go mod init example.com/screenshot' }
      },
      {
        title: 'Capture any URL',
        description:
          'Point it at a page, ask for a screenshot, and decode the hosted image URL out of the JSON response.',
        code: {
          language: 'go',
          title: 'capture.go',
          source: `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/url"
)

${RESPONSE_TYPE}

func main() {
    query := url.Values{
        "url":        {"https://example.com"},
        "screenshot": {"true"},
        "meta":       {"false"}, // skip metadata extraction for a faster response
    }

    res, err := http.Get("https://api.microlink.io?" + query.Encode())
    if err != nil {
        panic(err)
    }
    defer res.Body.Close()

    var body response
    if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
        panic(err)
    }

    fmt.Println(body.Data.Screenshot.URL)
}`
        }
      },
      {
        title: 'Customize the capture',
        description:
          'Output format, full-page captures, device emulation, and ad blocking — every Headless Chrome option is just a query field, with dot notation for the nested ones.',
        code: {
          language: 'go',
          title: 'options.go',
          source: `query := url.Values{
    "url":                 {"https://example.com"},
    "screenshot.type":     {"jpeg"},          // png (default) | jpeg
    "screenshot.fullPage": {"true"},          // capture the entire scrollable page
    "device":              {"iPhone 15 Pro"}, // emulate any device
    "adblock":             {"true"},          // strip ads & cookie banners (default)
    "meta":                {"false"},
}

res, err := http.Get("https://api.microlink.io?" + query.Encode())`
        }
      },
      {
        title: 'Write it to disk',
        description:
          'The response is a hosted image URL on a global CDN. Stream it into a file with a second request, or just hand the URL to the browser.',
        code: {
          language: 'go',
          title: 'save.go',
          source: `package main

import (
    "encoding/json"
    "io"
    "net/http"
    "net/url"
    "os"
)

${RESPONSE_TYPE}

func main() {
    query := url.Values{
        "url":        {"https://example.com"},
        "screenshot": {"true"},
    }

    res, err := http.Get("https://api.microlink.io?" + query.Encode())
    if err != nil {
        panic(err)
    }
    defer res.Body.Close()

    var body response
    if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
        panic(err)
    }

    image, err := http.Get(body.Data.Screenshot.URL)
    if err != nil {
        panic(err)
    }
    defer image.Body.Close()

    file, err := os.Create("screenshot.png")
    if err != nil {
        panic(err)
    }
    defer file.Close()

    if _, err := io.Copy(file, image.Body); err != nil {
        panic(err)
    }
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
      'A handler, a route, or a standalone binary — the same request becomes your own screenshot endpoint, perfect for dynamic Open Graph images on any runtime.',
    examples: [
      {
        id: 'go',
        label: 'Go',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
    "encoding/json"
    "net/http"
    "net/url"
)

${RESPONSE_TYPE}

${SCREENSHOT_URL_FUNC}

func main() {
    // GET /screenshot?url=https://example.com
    http.HandleFunc("/screenshot", func(w http.ResponseWriter, r *http.Request) {
        image, err := screenshotURL(r.URL.Query().Get("url"))
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadGateway)
            return
        }
        http.Redirect(w, r, image, http.StatusFound)
    })

    http.ListenAndServe(":3000", nil)
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
    "encoding/json"
    "net/http"
    "net/url"

    "github.com/gin-gonic/gin"
)

${RESPONSE_TYPE}

${SCREENSHOT_URL_FUNC}

func main() {
    router := gin.Default()

    // GET /screenshot?url=https://example.com
    router.GET("/screenshot", func(c *gin.Context) {
        image, err := screenshotURL(c.Query("url"))
        if err != nil {
            c.AbortWithError(http.StatusBadGateway, err)
            return
        }
        c.Redirect(http.StatusFound, image)
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
    "encoding/json"
    "net/http"
    "net/url"

    "github.com/labstack/echo/v4"
)

${RESPONSE_TYPE}

${SCREENSHOT_URL_FUNC}

func main() {
    e := echo.New()

    // GET /screenshot?url=https://example.com
    e.GET("/screenshot", func(c echo.Context) error {
        image, err := screenshotURL(c.QueryParam("url"))
        if err != nil {
            return err
        }
        return c.Redirect(http.StatusFound, image)
    })

    e.Logger.Fatal(e.Start(":3000"))
}`
        }
      },
      {
        id: 'fiber',
        label: 'Fiber',
        code: {
          language: 'go',
          title: 'main.go',
          source: `package main

import (
    "encoding/json"
    "net/http"
    "net/url"

    "github.com/gofiber/fiber/v2"
)

${RESPONSE_TYPE}

${SCREENSHOT_URL_FUNC}

func main() {
    app := fiber.New()

    // GET /screenshot?url=https://example.com
    app.Get("/screenshot", func(c *fiber.Ctx) error {
        image, err := screenshotURL(c.Query("url"))
        if err != nil {
            return err
        }
        return c.Redirect(image, fiber.StatusFound)
    })

    app.Listen(":3000")
}`
        }
      }
    ]
  },

  comparison: {
    title: (
      <>
        Skip the <Accent>chromedp</Accent> maintenance
      </>
    ),
    caption:
      'Driving Headless Chrome from Go means shipping a browser next to a statically linked binary, keeping it pinned to a Chrome release, and owning the pool. The API gives you the same control without any of the infrastructure.',
    columns: [
      {
        tone: 'negative',
        heading: 'Self-hosted chromedp',
        points: [
          'Install Chrome or Chromium on every host that runs your binary',
          'Ship headless Chrome (~300 MB) beside a Go binary built for scratch',
          'Each browser eats hundreds of MB of RAM; workers crash under load',
          'Launching Chrome adds seconds of cold-start latency',
          'You build the pooling, queueing, retries and autoscaling',
          'Write your own cookie-banner & ad dismissal scripts'
        ]
      },
      {
        tone: 'positive',
        heading: 'Microlink for Go',
        points: [
          'One HTTP request — net/http and encoding/json, nothing to go get',
          'Runs anywhere: scratch containers, Cloud Run, Lambda, your laptop',
          'Autoscaled managed browser fleet with a 99.95% uptime SLA',
          `Sub-second cached responses from ${CDN_EDGES} edge locations`,
          'Built-in adblock removes ads & cookie banners automatically',
          'Full-page, device emulation, overlays & DOM interaction included'
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
        home in anything from a Gin service to a Cloud Run container. Read the{' '}
        <Link href='/docs/guides/screenshot'>screenshot guide</Link> to go
        deeper.
      </>
    ),
    items: [
      {
        title: 'No Browser to Install',
        description:
          'Skip chromedp and go-rod entirely. There is no Chromium to download, pin, or keep in sync with Chrome releases.'
      },
      {
        title: 'Standard Library Only',
        description:
          'net/http sends the request, net/url builds the query, encoding/json decodes the response. Your go.mod stays empty.'
      },
      {
        title: 'Router Friendly',
        description:
          'Drop it into net/http, Gin, Echo, or Fiber as a handler in a few lines. The same request works everywhere.'
      },
      {
        title: 'Scratch Images & Serverless',
        description:
          'No browser to bundle, so a static binary in a scratch or distroless image still works. Deploy to Cloud Run, AWS Lambda, or Fly.'
      },
      {
        title: 'Goroutine Friendly',
        description:
          'Fan out captures across goroutines. There is no throttling beyond your plan quota, so parallelism is yours to choose.'
      },
      {
        title: 'Simple JSON Response',
        description:
          'A single request returns JSON with the hosted image URL. No contexts to cancel, no explicit waits, no browser lifecycle.'
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
      'Paste a URL and see the exact API request before you write a line of Go.',
    cta: {
      label: 'Open the screenshot tool',
      href: '/tools/website-screenshot'
    }
  },

  faq: {
    title: 'Go Screenshot FAQ',
    caption: (
      <>
        Everything Go developers ask before integrating the Microlink screenshot
        API.
      </>
    ),
    questions: [
      {
        question: 'Do I need chromedp or a headless browser?',
        answer: (
          <>
            <div>
              No. It is a plain HTTP request to the Microlink API — there is no
              Chromium binary to install next to your service and no DevTools
              protocol to speak. The Headless Chrome fleet runs on Microlink's
              side.
            </div>
            <div>
              That is what makes it deploy cleanly to scratch and distroless
              images, where shipping a browser alongside a static Go binary is
              painful.
            </div>
          </>
        )
      },
      {
        question: 'Which HTTP client should I use?',
        answer: (
          <>
            <div>
              The standard library. <code>net/http</code> sends the{' '}
              <code>GET</code>, <code>net/url</code> encodes the query, and{' '}
              <code>encoding/json</code> decodes the response — no third-party
              client required.
            </div>
            <div>
              Give your <code>http.Client</code> a timeout above the API budget:{' '}
              <Link href='/docs/api/parameters/timeout'>
                30 seconds on free
              </Link>
              , 60 seconds on Pro.
            </div>
          </>
        )
      },
      {
        question: 'Does it work with Gin, Echo, and Fiber?',
        answer: (
          <>
            <div>
              Yes. Because it is just an HTTP call, it drops into any handler in
              a few lines — see the tabs above for net/http, Gin, Echo, and
              Fiber, or the{' '}
              <Link href='/docs/guides/screenshot'>screenshot guide</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Can I fan out requests across goroutines?',
        answer: (
          <>
            <div>
              Yes. There is no throttling beyond your plan quota — parallel
              requests are limited only by the quota itself, so a{' '}
              <code>sync.WaitGroup</code> over a batch of URLs is fine.
            </div>
            <div>
              The exact limits are on the{' '}
              <Link href='/docs/api/basics/rate-limit'>rate limit</Link> page.
            </div>
          </>
        )
      },
      {
        question: 'Does it run on Cloud Run, Lambda, or a scratch image?',
        answer: (
          <>
            <div>
              Yes. Because there is no Chrome binary to bundle, a static Go
              binary in a scratch or distroless image works as-is — on Cloud
              Run, AWS Lambda, or any container.
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

  cta: {
    title: (
      <>
        Start <Accent>capturing</Accent> in Go
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

export default go
