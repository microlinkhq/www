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

const TOP_FAQ_ITEMS = [
  {
    question: 'How do I debug a broken link preview for any URL?',
    text: 'Paste any URL into the sharing debugger to inspect its title, description, image, favicon, canonical URL, locale, and platform previews. Then compare the detected metadata with the recommended fixes and re-run the check after updating your tags.',
    answer: (
      <>
        <div>
          Paste any URL into this <b>sharing debugger tool</b> to inspect its
          title, description, image, favicon, canonical URL, locale, and link
          previews across major platforms. If you need the full extracted data,
          compare the result with{' '}
          <Link href='/metadata' logoIcon>
            Microlink Metadata
          </Link>
          .
        </div>
        <div>
          Compare the detected metadata with the recommended fixes, update your
          tags, and then re-run the check to verify the preview is correct. For
          implementation details, review the{' '}
          <Link href='/docs/guides/metadata' logoIcon>
            metadata guide
          </Link>
          .
        </div>
      </>
    )
  },
  {
    question:
      'Why is my URL showing the wrong title or description when shared?',
    text: 'The wrong sharing text usually comes from missing Open Graph tags, conflicting metadata sources, stale platform caches, or JavaScript-injected tags that are not rendered consistently. Check title, meta description, og:title, og:description, and canonical URL together to find the mismatch.',
    answer: (
      <>
        <div>
          The wrong sharing text usually comes from missing{' '}
          <Link href='https://ogp.me' logoIcon>
            Open Graph tags
          </Link>
          , conflicting metadata sources, stale platform caches, or
          JavaScript-injected tags that are not rendered consistently.
        </div>
        <div>
          Check <i>title</i>, <i>meta description</i>, <i>og:title</i>,{' '}
          <i>og:description</i>,{' '}
          <Link
            href='https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards'
            logoIcon
          >
            Twitter Cards
          </Link>
          , and the canonical URL together to find the mismatch.
        </div>
      </>
    )
  },
  {
    question: 'Why is my og:image missing or not showing?',
    text: 'A missing social image usually means og:image is absent, blocked, too large, too small, or cached incorrectly by the platform. Use a valid public image URL, ideally around 1200x630, and verify that both Open Graph and Twitter image tags point to the right file.',
    answer: (
      <>
        <div>
          A missing social image usually means{' '}
          <Link href='https://ogp.me/#structured' logoIcon>
            <i>og:image</i>
          </Link>{' '}
          is absent, blocked, too large, too small, or cached incorrectly by the
          platform.
        </div>
        <div>
          Use a valid public image URL, ideally around <b>1200x630</b>, and
          verify that both Open Graph and Twitter image tags point to the right
          file. If you need to generate one quickly, use the{' '}
          <Link href='/screenshot' logoIcon>
            screenshot API
          </Link>{' '}
          or the{' '}
          <Link href='/docs/guides/screenshot' logoIcon>
            screenshot guide
          </Link>
          .
        </div>
      </>
    )
  }
]

const FAQ_QUESTIONS = [
  ...TOP_FAQ_ITEMS,
  {
    question: 'How does social media caching work?',
    answer: (
      <>
        <div>
          Social networks aggressively cache link previews. This validator
          fetches the live version of your URL, acting as a "fresh" crawler.
        </div>
        <Faq.List>
          <li>
            <b>Agent Spoofing:</b> We simulate the User-Agent of bots
            (Googlebot, Twitterbot) to show you exactly what they see.
          </li>
          <li>
            <b>Rendered HTML:</b> Unlike standard scrapers, we can execute
            JavaScript to capture meta tags dynamically injected by React/Vue
            apps.
          </li>
        </Faq.List>
        <div>
          Update your metadata using our recommended patterns, then re-run the
          test to verify the fix.
        </div>
      </>
    )
  },
  {
    question: 'What can I debug with this tool?',
    answer: (
      <>
        <div>
          This <b>link preview debugging tool</b> inspects and debugs metadata
          HTML markup, ensuring accurate titles, descriptions, and images across
          all major social networks.
        </div>
        <div>
          It runs on{' '}
          <Link href='https://metascraper.js.org/#/' logoIcon>
            Metascraper
          </Link>
          , the battle-tested library maintained by Microlink. We don't just
          regex HTML; we use a flexible rule-based system to normalize metadata
          from the wildest edge cases on the web.
        </div>
        <div>
          We normalize data into a unified JSON response, prioritizing the most
          relevant source automatically.{' '}
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
    question: 'How can I create social media images?',
    answer: (
      <>
        <div>
          In the era of link unfurling (Facebook, X, LinkedIn, etc.), your{' '}
          <i>og:image</i> is your first impression. Manually designing assets
          for every dynamic route is unscalable, but generic logos get ignored.
          <br />
          <br />
          Microlink solves this with its{' '}
          <Link href='/screenshot' logoIcon>
            screenshot API
          </Link>{' '}
          — pass a URL, get a production-ready image back.
          <MultiCodeEditorInteractive
            mqlCode={{
              url: 'https://www.netflix.com/title/80057281',
              screenshot: true
            }}
          />
          Instead of storing static JPEGs, simply pass your page's URL to{' '}
          <Link href='/docs/guides/screenshot' logoIcon>
            Microlink with screenshot=true
          </Link>
          . We spin up a headless browser, capture the viewport, and serve a
          globally cached image.
        </div>
        <Faq.List>
          <li>
            <b>Always Fresh:</b> Your social cards automatically reflect your
            latest UI updates.
          </li>
          <li>
            <b>Zero Maintenance:</b> No more Photoshop or Figma templates for
            every blog post.
          </li>
          <li>
            <b>High Performance:</b> Served via global CDN, ensuring link
            previews load instantly.
          </li>
        </Faq.List>
      </>
    )
  },
  {
    question: 'Can I automate this process?',
    answer: (
      <>
        <div>
          You can automate your Open Graph and SEO audit workflow using the{' '}
          <Link href='/docs/guides/metadata' logoIcon>
            Microlink API
          </Link>
          . This allows you to programmatically validate metadata for thousands
          of URLs without manual intervention.
          <MultiCodeEditorInteractive
            mqlCode={{ url: 'https://microlink.io', meta: true }}
          />
          By hitting our API endpoint, you get a structured JSON payload
          containing every meta tag, allowing you to build internal health
          checks or automated CI/CD scripts to ensure your production deploys
          never break your social previews.
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
            <b>Integration Ready:</b> Easily integrate with Node.js, Python, or
            even simple cURL commands.
          </li>
          <li>
            <b>Edge Case Detection:</b> Programmatically detect missing{' '}
            <i>og:image</i> tags, broken canonicals, or invalid JSON-LD schemas
            across your whole domain.
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
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
        </div>
      </>
    )
  }
]

export const Head = () => (
  <Meta
    title='Sharing Debugger Tool: Free Open Graph & Meta Tags Validator'
    description='Validate Open Graph, Twitter Cards, JSON-LD, and meta tags for any URL. Preview how your links appear on Facebook, WhatsApp, X, LinkedIn, and Slack.'
    noSuffix
    image={cdnUrl('banner/sharing-debugger.jpeg')}
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/sharing-debugger',
        name: 'Microlink Sharing Debugger',
        description:
          'Validate Open Graph, Twitter Cards, JSON-LD, microdata, and RDFa markup for any URL. Preview how links appear across social networks and fix metadata issues instantly.',
        url: 'https://microlink.io/tools/sharing-debugger',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web, Platform-Agnostic',
        keywords:
          'sharing debugger, Open Graph debugger, meta tags validator, social media preview, Twitter Card validator, JSON-LD validator, og:image checker, link preview tool',
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
        },
        about: [
          {
            '@type': 'Thing',
            name: 'Open Graph protocol',
            sameAs:
              'https://en.wikipedia.org/wiki/Facebook_Platform#Open_Graph_protocol'
          },
          {
            '@type': 'Thing',
            name: 'Metadata',
            sameAs: 'https://en.wikipedia.org/wiki/Metadata'
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': 'https://microlink.io/tools/sharing-debugger#faq',
        url: 'https://microlink.io/tools/sharing-debugger',
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

const SharingDebugger = () => {
  return (
    <Layout css={theme({ maxWidth: ['100%', layout.small], mx: 'auto' })}>
      <Hero />
      <Faq css={theme({ pt: 4, px: 0 })} questions={FAQ_QUESTIONS} />
    </Layout>
  )
}

export default withTitle(SharingDebugger)
