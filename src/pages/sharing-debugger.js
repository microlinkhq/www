import React from 'react'
import { theme } from 'theme'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import Meta from 'components/elements/Meta/Meta'
import { cdnUrl } from 'helpers/cdn-url'
import { Hero } from 'components/pages/sharing-debugger/hero'
import Faq from 'components/patterns/Faq/Faq'
import { Link } from 'components/elements/Link'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'
import { mqlCode } from 'helpers/mql-code'

export const Head = () => (
  <Meta
    description='Test how your website will look like on social networks.'
    image={cdnUrl('banner/sharing-debugger.jpeg')}
  />
)

const SharingDebugger = () => {
  return (
    <Layout>
      <Hero />
      {/* <Timings /> */}
      <Faq
        css={theme({ pt: 5 })}
        questions={[
          {
            question: 'How it works',
            answer: (
              <>
                <div>
                  This tool runs on{' '}
                  <Link href='https://metascraper.js.org/#/' logoIcon>
                    Metascraper
                  </Link>
                  ,{' '}the battle-tested library maintained by Microlink.
                  We don't just regex HTML; we use a flexible rule-based system
                  to normalize metadata from the wildest edge cases on the web.
                </div>
              </>
            )
          },
          {
            question: 'Supported Structured Data',
            answer: (
              <>
                <div>
                  We normalize data into a unified JSON response, prioritizing the most relevant source automatically.{' '}
                  <ul>
                    <li>
                      <Link href='https://ogp.me' logoIcon>Open Graph</Link>
                    </li>
                    <li>
                      <Link href='https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Microdata' logoIcon>
                        Microdata
                      </Link>
                    </li>
                    <li>
                      <Link href='https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards' logoIcon>
                        Twitter Cards
                      </Link>
                    </li>
                    <li>
                      <Link href='https://rdfa.info' logoIcon>RDFa</Link>
                    </li>
                    <li>
                      <Link href='https://json-ld.org' logoIcon>JSON-LD</Link>
                    </li>
                  </ul>
                </div>
              </>
            )
          },
          {
            question: 'Debugging & Caching logic',
            answer: (
              <>
                <div>
                  Social networks aggressively cache link previews. This validator fetches the live version of your URL, acting as a "fresh" crawler.
                  <ul>
                    <li><b>Agent Spoofing:</b> We simulate the User-Agent of bots (Googlebot, Twitterbot) to show you exactly what they see.</li>
                    <li><b>Rendered HTML:</b> Unlike standard scrapers, we can execute JavaScript to capture meta tags dynamically injected by React/Vue apps.</li>
                  </ul>
                </div>
              </>
            )
          },
          {
            question: 'Automating Screenshots for OG Images',
            answer: (
              <>
                <div>
                  Stop manually updating preview images. You can use Microlink's API
                  to generate Open Graph images on the fly. By passing screenshot=true
                  {' '}<a href='/docs/api/parameters/screenshot'>to our API</a>,
                  you get a hosted, cached image URL ready to be served in
                  your <i>meta property="og:image"</i> tag.

                  <MultiCodeEditorInteractive
                    mqlCode={mqlCode('https://microlink.io', {
                      screenshot: true
                    })}
                  />

                  <b>Need more granular control?</b> Discover how to capture specific DOM elements,
                  inject CSS, and customize viewports on the <Link href='/screenshot' logoIcon>Screenshot API page</Link>.
                </div>
              </>
            )
          },
          {
            question: 'Other questions?',
            answer: (
              <>
                <div>
                  We’re always available at{' '}
                  <Link href='mailto:hello@microlink.io'>
                    hello@microlink.io
                  </Link>
                  .
                </div>
              </>
            )
          }
        ]}
      />
    </Layout>
  )
}

export default withTitle(SharingDebugger)
