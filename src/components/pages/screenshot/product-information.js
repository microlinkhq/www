import React from 'react'
import { SECTION_VERTICAL_SPACING, borders, colors, theme } from 'theme'
import { Link } from 'components/elements/Link'
import LineBreak from 'components/elements/LineBreak'
import Faq from 'components/patterns/Faq/Faq'
import { CDN_EDGES } from 'helpers/cdn-edges'

export const ProductInformation = () => {
  return (
    <Faq
      title='Product Information'
      caption={
        <>
          Everything you need to know about <LineBreak /> Microlink website
          screenshot API.
        </>
      }
      css={theme({
        py: SECTION_VERTICAL_SPACING,
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`
      })}
      questions={[
        {
          question: 'Do I need to manage my own Headless Chrome instances?',
          answer: (
            <>
              <div>
                No. Microlink acts as a fully managed, "backendless"{' '}
                <Link href='/blog/what-is-a-headless-browser'>
                  browser service
                </Link>
                . We maintain the underlying Chromium infrastructure, manage the
                instance pool, and handle{' '}
                <Link href='/blog/edge-cdn'>edge caching</Link>.
              </div>
              <div>
                You simply make a REST API call and receive a structured JSON
                payload or a{' '}
                <Link href='/docs/guides/screenshot/embedding#direct-image-with-embed'>
                  binary image directly
                </Link>{' '}
                — the easiest way to automatically take screenshots of website
                pages without maintaining{' '}
                <Link href='https://pptr.dev/'>Puppeteer</Link> or{' '}
                <Link href='https://playwright.dev/'>Playwright</Link> on your
                own servers.
              </div>
            </>
          )
        },
        {
          question: 'Is there a free tier for testing and local development?',
          answer: (
            <>
              <div>
                Yes. Our free screenshot API tier provides 25 requests per day
                with unrestricted access to all browser automation features,
                including{' '}
                <Link href='/docs/api/parameters/device'>device emulation</Link>
                ,{' '}
                <Link href='/docs/api/parameters/headers'>
                  custom HTTP headers
                </Link>
                , and{' '}
                <Link href='/docs/guides/screenshot/page-interaction#injecting-custom-css'>
                  CSS injection
                </Link>
                .
              </div>
              <div>
                No credit card, account creation, or API key is required to
                start developing. Try it instantly in the{' '}
                <Link href='/tools/website-screenshot'>
                  screenshot playground
                </Link>{' '}
                or point your code at the endpoint and begin capturing.
              </div>
            </>
          )
        },
        {
          question: 'How do you handle cookie banners and ad popups?',
          answer: (
            <>
              <div>
                By default, our engine includes a built-in, frequently updated{' '}
                <Link href='/blog/microlink-adblock-now-handles-cookie-banners'>
                  adblocker
                </Link>
                . It automatically dismisses GDPR cookie consent banners, closes
                newsletter popups, and removes injected ads.
              </div>
              <div>
                This ensures your programmatic captures remain clean and focused
                on the actual page content without requiring you to write custom
                dismissal scripts.
              </div>
            </>
          )
        },
        {
          question:
            'Can I interact with the DOM or run scripts before capturing?',
          answer: (
            <>
              <div>
                Absolutely. Our screenshot API provides complete{' '}
                <Link href='/docs/guides/screenshot/browser-settings'>
                  browser control
                </Link>
                . You can execute arbitrary JavaScript via our{' '}
                <Link href='/docs/guides/function'>functions integration</Link>,
                or use native parameters to{' '}
                <Link href='/docs/guides/screenshot/page-interaction'>
                  scroll, click, and wait
                </Link>{' '}
                for specific DOM elements and network events to load.
              </div>
              <div>
                It is built to handle complex, dynamic SPA (Single Page
                Application) rendering and visual regression testing workflows
                with pixel-perfect accuracy.
              </div>
            </>
          )
        },
        {
          question: 'What is your uptime SLA and expected latency?',
          answer: (
            <>
              <div>
                We guarantee <Link href='/enterprise'>enterprise-grade</Link>{' '}
                reliability with a 99.95% uptime SLA. Every request runs in an
                isolated browser instance to guarantee security and avoid
                shared-state leaks. Check real-time availability on the{' '}
                <Link href='/status'>status page</Link>.
              </div>
              <div>
                For latency: assets are distributed via Cloudflare's {CDN_EDGES}{' '}
                edge locations, meaning{' '}
                <Link href='/docs/guides/screenshot/caching-and-performance'>
                  cached responses
                </Link>{' '}
                are delivered in milliseconds. For cold starts, our optimized
                Chromium pool typically responds in under 3&nbsp;seconds (P95).
                See our{' '}
                <Link href='/benchmarks/screenshot-api'>
                  independent benchmark
                </Link>{' '}
                for detailed provider comparisons.
              </div>
            </>
          )
        },
        {
          question: 'What output formats are supported?',
          answer: (
            <>
              <div>
                You can export captures as optimized{' '}
                <Link href='/docs/guides/screenshot/customizing-output'>
                  JPEG or PNG
                </Link>{' '}
                formats. We support specific viewport cropping, as well as{' '}
                <Link href='/tools/website-screenshot/full-page'>
                  full-page scrolling captures
                </Link>{' '}
                for long documents. If you need motion, you can even generate{' '}
                <Link href='/tools/website-screenshot/animated'>
                  animated recordings
                </Link>
                .
              </div>
              <div>
                Depending on your integration, you can request a raw image
                buffer via the{' '}
                <Link href='/docs/api/parameters/embed'>embed parameter</Link>,
                or a comprehensive JSON payload that includes the image URL
                alongside <Link href='/metadata'>metadata</Link>, performance
                timings, and HTTP headers.
              </div>
            </>
          )
        },
        {
          question: 'How quickly can I integrate this into my stack?',
          answer: (
            <>
              <div>
                In minutes. Visit our{' '}
                <Link href='/docs/guides/screenshot'>documentation</Link> for
                interactive playground examples, official{' '}
                <Link href='/integrations/sdk'>SDKs</Link> (Node.js, Python,
                Ruby, Go), and copy-paste code snippets.
              </div>
              <div>
                Need architectural advice or have custom requirements? Check our{' '}
                <Link href='/enterprise'>enterprise offering</Link> or contact
                our engineering team at{' '}
                <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>
                .
              </div>
            </>
          )
        }
      ]}
    />
  )
}
