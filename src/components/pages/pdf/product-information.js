import React from 'react'
import { SECTION_VERTICAL_SPACING, borders, colors, theme } from 'theme'
import { Link } from 'components/elements/Link'
import LineBreak from 'components/elements/LineBreak'
import Faq from 'components/patterns/Faq/Faq'
import { CDN_EDGES } from 'helpers/cdn-edges'

export const ProductInformation = () => (
  <Faq
    title='Product Information'
    caption={
      <>
        Everything you need to know about <LineBreak /> Microlink HTML to PDF
        API.
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
              <Link href='/docs/guides/pdf/embedding'>
                PDF document directly
              </Link>{' '}
              the easiest way to convert any URL to PDF without maintaining{' '}
              <Link href='https://pptr.dev/'>Puppeteer</Link> or{' '}
              <Link href='https://playwright.dev/'>Playwright</Link> on your own
              servers.
            </div>
          </>
        )
      },
      {
        question: 'Is there a free tier for the HTML to PDF API?',
        answer: (
          <>
            <div>
              Yes. Our free HTML to PDF API tier provides 25 requests per day
              with unrestricted access to all{' '}
              <Link href='/docs/api/parameters/pdf'>
                document generation features
              </Link>
              , including{' '}
              <Link href='/docs/guides/pdf/page-size-and-layout'>
                custom paper sizes
              </Link>
              ,{' '}
              <Link href='/docs/api/parameters/pdf/margin'>
                margin controls
              </Link>
              , and{' '}
              <Link href='/docs/guides/pdf/page-preparation'>
                CSS injection
              </Link>
              .
            </div>
            <div>
              No credit card, account creation, or API key is required to start
              developing. Try it instantly in the{' '}
              <Link href='/tools/website-to-pdf'>PDF playground</Link> or point
              your code at the endpoint and begin converting.
            </div>
          </>
        )
      },
      {
        question: 'What paper sizes and formats are supported?',
        answer: (
          <>
            <div>
              Our URL to PDF API supports all standard{' '}
              <Link href='/docs/guides/pdf/page-size-and-layout'>
                paper formats
              </Link>
              : A0 through A6, Letter, Legal, and Tabloid. You can switch
              between portrait and landscape orientation with a single
              parameter.
            </div>
            <div>
              Fine-tune{' '}
              <Link href='/docs/api/parameters/pdf/margin'>margins</Link> in cm,
              mm, or px, set custom{' '}
              <Link href='/docs/api/parameters/pdf/scale'>scaling</Link>, and
              extract specific{' '}
              <Link href='/docs/api/parameters/pdf/pageRanges'>
                page ranges
              </Link>{' '}
              for precise document output.
            </div>
          </>
        )
      },
      {
        question:
          'Can I interact with the DOM or run scripts before generating the PDF?',
        answer: (
          <>
            <div>
              Absolutely. Our web to PDF API provides complete browser control.
              You can execute arbitrary JavaScript via our{' '}
              <Link href='/docs/guides/function'>functions integration</Link>,
              or use native parameters for{' '}
              <Link href='/docs/guides/pdf/page-preparation'>
                page preparation
              </Link>{' '}
              scroll, click, wait for selectors, and inject custom CSS before
              PDF generation.
            </div>
            <div>
              It is built to handle complex, dynamic SPA rendering and produce
              pixel-perfect PDF documents from any web content.
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
              reliability with a 99.9% uptime SLA. Every request runs in an
              isolated browser instance to guarantee security and avoid
              shared-state leaks. Check real-time availability on the{' '}
              <Link href='/status'>status page</Link>. Need to generate PDFs
              from{' '}
              <Link href='/docs/guides/pdf/private-pages'>
                authenticated pages
              </Link>
              ? We support that too.
            </div>
            <div>
              For latency: PDFs are distributed via Cloudflare's {CDN_EDGES}{' '}
              edge locations, meaning{' '}
              <Link href='/docs/guides/pdf/caching-and-performance'>
                cached responses
              </Link>{' '}
              are delivered in milliseconds. Our optimized Chromium pool handles
              cold starts efficiently for consistent performance. See our{' '}
              <Link href='/docs/guides/pdf/troubleshooting'>
                troubleshooting guide
              </Link>{' '}
              for common questions.
            </div>
          </>
        )
      },
      {
        question: 'What output options are available?',
        answer: (
          <>
            <div>
              You can generate PDFs in any{' '}
              <Link href='/docs/api/parameters/pdf/format'>paper format</Link>{' '}
              with configurable{' '}
              <Link href='/docs/api/parameters/pdf/margin'>margins</Link>,{' '}
              <Link href='/docs/api/parameters/pdf/landscape'>orientation</Link>
              , and <Link href='/docs/api/parameters/pdf/scale'>scaling</Link>.
              Page ranges let you extract exactly the content you need.
            </div>
            <div>
              You can request a direct PDF binary via the{' '}
              <Link href='/docs/api/parameters/embed'>embed parameter</Link>, or
              a JSON payload that includes the PDF URL alongside{' '}
              <Link href='/metadata'>metadata</Link> and performance timings.
              Need screenshots too? Our API also supports{' '}
              <Link href='/screenshot'>screenshot capture</Link>.
            </div>
          </>
        )
      },
      {
        question:
          'How quickly can I integrate this HTML to PDF service into my stack?',
        answer: (
          <>
            <div>
              In minutes. Visit our{' '}
              <Link href='/docs/guides/pdf'>documentation</Link> for interactive
              playground examples, official{' '}
              <Link href='/integrations/sdk'>SDKs</Link> (Node.js, Python, Ruby,
              Go), and copy-paste code snippets for any language.
            </div>
            <div>
              Need architectural advice or have custom requirements? Check our{' '}
              <Link href='/enterprise'>enterprise offering</Link> or contact our
              engineering team at{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      }
    ]}
  />
)
