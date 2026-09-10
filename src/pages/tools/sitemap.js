import React from 'react'
import { theme, layout } from 'theme'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'
import { Hero } from 'components/pages/sitemap/hero'
import Faq from 'components/patterns/Faq/Faq'
import { Link } from 'components/elements/Link'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import { sitemapSdkSnippet } from 'helpers/get-sitemap-urls'

const TOP_FAQ_ITEMS = [
  {
    question: 'How do I list every URL in a website sitemap?',
    text: 'Paste any site URL. The tool reads Sitemap: from robots.txt, expands nested sitemap indexes, and lists every page location. Copy the list or download it as a text file.',
    answer: (
      <>
        <div>
          Paste any site URL into this <b>sitemap tool</b>. It reads{' '}
          <b>Sitemap:</b> from that origin’s robots.txt, walks nested sitemap
          indexes, and lists every page <b>loc</b>.
        </div>
        <div>
          Copy the list, download it as a text file, or reuse the same function
          from your own code with the{' '}
          <Link href='/docs/sdk/getting-started/overview' logoIcon>
            Microlink SDK
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question: 'How does this find the sitemap?',
    text: 'The tool fetches /robots.txt on the site origin and uses every Sitemap: line. It does not guess /sitemap.xml or scan HTML for link rel=sitemap.',
    answer: (
      <>
        <div>
          Discovery is robots-only. The function fetches <b>/robots.txt</b> on
          the origin you pasted and expands each <b>Sitemap:</b> URL. If
          robots.txt has no sitemap lines, the result is empty.
        </div>
        <div>
          Nested sitemap indexes are followed. Page URLs are the non-XML{' '}
          <b>loc</b> values.
        </div>
      </>
    )
  },
  {
    question: 'Can I run this from my own code?',
    text: 'Yes. The tool is a Microlink Function. Call microlink.function with the same helper to get the URL list in Node.js or the browser.',
    answer: (
      <>
        <div>
          The tool calls{' '}
          <Link href='/docs/sdk/methods/function' logoIcon>
            microlink.function()
          </Link>
          . The function does not start a browser — it reads robots.txt and
          sitemap XML in the Node sandbox.
        </div>
        <CodeEditor language='javascript' autoHeight>
          {sitemapSdkSnippet('https://microlink.io')}
        </CodeEditor>
      </>
    )
  }
]

const FAQ_QUESTIONS = [
  ...TOP_FAQ_ITEMS,
  {
    question: 'Why did the list time out or come back empty?',
    answer: (
      <>
        <div>
          The list is empty when robots.txt has no <b>Sitemap:</b> lines. A
          Function failure (timeout, blocked fetch, or budget) shows the error
          panel instead. Large or deeply nested sitemaps can exceed the free
          5-second limit.
        </div>
        <div>
          See the{' '}
          <Link href='/docs/guides/function/troubleshooting' logoIcon>
            function troubleshooting guide
          </Link>{' '}
          for timeout, memory, and outgoing-request limits.
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
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
        </div>
      </>
    )
  }
]

export const Head = () => (
  <Meta
    title='Sitemap URL Extractor: List Every Page From robots.txt'
    description='Paste a site URL to list every page in its sitemap. Reads Sitemap: from robots.txt, expands nested indexes, and lets you copy or download the URLs.'
    noSuffix
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/sitemap',
        name: 'Microlink Sitemap URL Extractor',
        description:
          'Paste a site URL to list every page location from Sitemap: lines in robots.txt. Copy or download the URL list.',
        url: 'https://microlink.io/tools/sitemap',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web, Platform-Agnostic',
        keywords:
          'sitemap extractor, robots.txt sitemap, list sitemap urls, xml sitemap parser, sitemap loc',
        provider: {
          '@type': 'Organization',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free online tool with no login required.',
          priceValidUntil: '2028-12-31'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://microlink.io/tools/sitemap#faq',
        url: 'https://microlink.io/tools/sitemap',
        mainEntity: TOP_FAQ_ITEMS.map(({ question, text }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text
          }
        }))
      }
    ]}
  />
)

const SitemapTool = () => {
  return (
    <Layout>
      <Box css={theme({ maxWidth: ['100%', layout.normal], mx: 'auto' })}>
        <Hero />
      </Box>
      <Box css={theme({ maxWidth: ['100%', layout.normal], mx: 'auto' })}>
        <Faq css={theme({ pt: 4, px: 0 })} questions={FAQ_QUESTIONS} />
      </Box>
    </Layout>
  )
}

export default withTitle(SitemapTool)
