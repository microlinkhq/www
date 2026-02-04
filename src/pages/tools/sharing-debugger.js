import React from 'react'
import { theme, layout } from 'theme'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import Meta from 'components/elements/Meta/Meta'
import { cdnUrl } from 'helpers/cdn-url'
import { Hero } from 'components/pages/sharing-debugger/hero'
import Faq from 'components/patterns/Faq/Faq'
import { Link } from 'components/elements/Link'
import { MultiCodeEditorInteractive } from 'components/markdown/MultiCodeEditorInteractive'

export const Head = () => (
  <Meta
    title='Sharing Debugger Tool'
    description='Debug and validate metadata HTML markup, including Open Graph, microdata, RDFa, JSON-LD, and more. Preview how your URL appears on major social networks instantly.'
    image={cdnUrl('banner/sharing-debugger.jpeg')}
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/tools/sharing-debugger',
      name: 'Microlink Sharing Debugger',
      description:
        'Debug and validate metadata HTML markup, including Open Graph, microdata, RDFa, JSON-LD, and more. Preview social media sharing across platforms.',
      url: 'https://microlink.io/tools/sharing-debugger',
      applicationCategory: ['DeveloperApplication', 'Tool'],
      keywords: [
        'sharing debugger',
        'Open Graph debugger',
        'metadata validator',
        'HTML markup debugger',
        'microdata validator',
        'RDFa debugger',
        'JSON-LD validator',
        'social media preview',
        'meta tags validator',
        'SEO debugging tool'
      ],
      about: [
        { '@type': 'Thing', name: 'Open Graph Debugger' },
        { '@type': 'Thing', name: 'Microdata Validator' },
        { '@type': 'Thing', name: 'RDFa Debugger' },
        { '@type': 'Thing', name: 'JSON-LD Validator' },
        { '@type': 'Thing', name: 'HTML Markup Validator' },
        { '@type': 'Thing', name: 'Social Media Preview Tool' },
        { '@type': 'Thing', name: 'Meta Tags Validator' },
        { '@type': 'Thing', name: 'SEO Debugging Tool' }
      ]
    }}
  />
)

const SharingDebugger = () => {
  return (
    <Layout css={theme({ maxWidth: ['100%', layout.small], mx: 'auto' })}>
      <Hero />
      <Faq
        css={theme({ pt: 0, px: 0 })}
        questions={[
          {
            question: 'What can I debug with this tool?',
            answer: (
              <>
                <div>
                  This <b>link preview debugging tool</b> inspects and debug
                  metadata HTML markup, ensuring accurate titles, descriptions,
                  and images across all major social networks.
                </div>
                <div>
                  It runs on{' '}
                  <Link href='https://metascraper.js.org/#/' logoIcon>
                    Metascraper
                  </Link>
                  , the battle-tested library maintained by Microlink. We don't
                  just regex HTML; we use a flexible rule-based system to
                  normalize metadata from the wildest edge cases on the web.
                </div>
                <div>
                  We normalize data into a unified JSON response, prioritizing
                  the most relevant source automatically.{' '}
                </div>
                <Faq.List>
                  <li>
                    <Link href='https://ogp.me' logoIcon>
                      Open Graph
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Microdata'
                      logoIcon
                    >
                      Microdata
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards'
                      logoIcon
                    >
                      Twitter Cards
                    </Link>
                  </li>
                  <li>
                    <Link href='https://rdfa.info' logoIcon>
                      RDFa
                    </Link>
                  </li>
                  <li>
                    <Link href='https://json-ld.org' logoIcon>
                      JSON-LD
                    </Link>
                  </li>
                </Faq.List>
              </>
            )
          },
          {
            question: 'How does social media caching work?',
            answer: (
              <>
                <div>
                  Social networks aggressively cache link previews. This
                  validator fetches the live version of your URL, acting as a
                  "fresh" crawler.
                </div>
                <Faq.List>
                  <li>
                    <b>Agent Spoofing:</b> We simulate the User-Agent of bots
                    (Googlebot, Twitterbot) to show you exactly what they see.
                  </li>
                  <li>
                    <b>Rendered HTML:</b> Unlike standard scrapers, we can
                    execute JavaScript to capture meta tags dynamically injected
                    by React/Vue apps.
                  </li>
                </Faq.List>
                <div>
                  Update your metadata using our recommended patterns, then
                  re-run the test to verify the fix.
                </div>
              </>
            )
          },
          {
            question: 'Can I automate this process?',
            answer: (
              <>
                <div>
                  You can automate your Open Graph and SEO audit workflow using
                  the{' '}
                  <Link href='/docs/api/parameters/meta' logoIcon>
                    Microlink API
                  </Link>
                  . This allows you to programmatically validate metadata for
                  thousands of URLs without manual intervention.
                  <MultiCodeEditorInteractive
                    mqlCode={{ url: 'https://microlink.io', meta: true }}
                  />
                  By hitting our API endpoint, you get a structured JSON payload
                  containing every meta tag, allowing you to build internal
                  health checks or automated CI/CD scripts to ensure your
                  production deploys never break your social previews.
                </div>
                <Faq.List>
                  <li>
                    <b>Bulk Processing:</b> Read how to{' '}
                    <Link href='/blog/automate-open-graph-audit' logoIcon>
                      run a validation script across your entire sitemap
                    </Link>
                    .
                  </li>
                  <li>
                    <b>Integration Ready:</b> Easily integrate with Node.js,
                    Python, or even simple cURL commands.
                  </li>
                  <li>
                    <b>Edge Case Detection:</b> Programmatically detect missing{' '}
                    <i>og:image</i> tags, broken canonicals, or invalid JSON-LD
                    schemas across your whole domain.
                  </li>
                </Faq.List>
              </>
            )
          },
          {
            question: 'How can I create social media images?',
            answer: (
              <>
                <div>
                  In the era of link unfurling (Facebook, X, LinkedIn, etc.),
                  your <i>og:image</i> is your first impression. Manually
                  designing assets for every dynamic route is unscalable, but
                  generic logos get ignored.
                  <br />
                  <br />
                  Microlink solves this by treating your screenshots as an{' '}
                  <Link href='/screenshot' logoIcon>
                    Screenshot API
                  </Link>
                  .
                  <MultiCodeEditorInteractive
                    mqlCode={{
                      url: 'https://www.netflix.com/title/80057281',
                      screenshot: true
                    }}
                  />
                  Instead of storing static JPEGs, simply pass your page's URL
                  to{' '}
                  <Link href='/docs/api/parameters/screenshot' logoIcon>
                    Microlink with screenshot=true
                  </Link>
                  . We spin up a headless browser, capture the viewport, and
                  serve a globally cached image.
                </div>
                <Faq.List>
                  <li>
                    <b>Always Fresh:</b> Your social cards automatically reflect
                    your latest UI updates.
                  </li>
                  <li>
                    <b>Zero Maintenance:</b> No more Photoshop or Figma
                    templates for every blog post.
                  </li>
                  <li>
                    <b>High Performance:</b> Served via global CDN, ensuring
                    link previews load instantly.
                  </li>
                </Faq.List>
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
