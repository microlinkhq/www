import React from 'react'
import { theme, layout } from 'theme'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import Meta from 'components/elements/Meta/Meta'
import { Hero } from 'components/pages/sitemap/hero'
import Faq from 'components/patterns/Faq/Faq'
import { Link } from 'components/elements/Link'
import { editorTemplateHref } from 'components/pages/editor/shared'
import { FunctionExampleCard } from 'components/pages/function/examples-grid'
import { sitemapCardCode } from 'helpers/get-sitemap-urls'

const RobotsTxt = () => <Link href='/robots.txt'>robots.txt</Link>
const SitemapXml = () => <Link href='/sitemap.xml'>sitemap.xml</Link>

const TOP_FAQ_ITEMS = [
  {
    question: 'Why list sitemap URLs?',
    text: 'A sitemap is the site’s own map of pages it wants found, including orphan pages no internal link points to. Listing those URLs is faster than crawling, and it is the same starting point search engines use when they spend crawl budget.',
    answer: (
      <>
        <div>
          A sitemap is the site’s own map of pages it wants found, including{' '}
          <b>orphan pages</b> no internal link points to. Listing those URLs is{' '}
          <b>faster than crawling</b>, and it is the same starting point search
          engines already use when they spend crawl budget.
        </div>
        <div>
          You get every URL the site declared, not a sample guessed from
          internal links.
        </div>
      </>
    )
  },
  {
    question: 'What can I use this sitemap tool for?',
    text: 'Audit SEO coverage, export a content inventory, compare published URLs against a crawl, snapshot a site before a migration, research a competitor, seed a crawl, or feed an AI agent or data pipeline.',
    answer: (
      <div>
        Paste a site URL to get every page the site declared in its sitemap,
        without crawling. That list is useful for:
        <Faq.List>
          <li>
            <strong>SEO audits</strong>: see the URLs the site wants search
            engines to find
          </li>
          <li>
            <strong>Content inventories</strong>: export a checklist of
            published pages
          </li>
          <li>
            <strong>Coverage checks</strong>: compare the sitemap against a
            crawl or CMS export
          </li>
          <li>
            <strong>Migrations</strong>: snapshot the public URL list before you
            move a site
          </li>
          <li>
            <strong>Competitor research</strong>: see the public URL surface
            another site declared
          </li>
          <li>
            <strong>Seed a crawl</strong>: start from the sitemap instead of
            guessing links
          </li>
          <li>
            <strong>AI agents</strong>: give a pipeline the full URL inventory
            before it fetches pages
          </li>
          <li>
            <strong>Data pipelines</strong>: start an export from the public
            map, not a homepage walk
          </li>
        </Faq.List>
        Copy the list, or download it as a text file, when you need it in a
        spreadsheet or script.
      </div>
    )
  },
  {
    question: 'How do I list every URL from a website?',
    text: 'Paste a site URL and submit. The helper reads the origin, fetches /robots.txt, collects every sitemap, and walks nested indexes. Copy the list or download it as a text file. URLs the site never declared will not appear.',
    answer: (
      <>
        <div>
          Paste a site URL and submit. The helper reads the origin from the
          page, fetches <RobotsTxt />, collects every <b>sitemap</b>, and walks
          nested indexes. Copy the list, or download it as a text file, when you
          need it in a spreadsheet or script.
        </div>
        <div>
          URLs the site never declared will not appear. We don’t guess{' '}
          <SitemapXml /> if robots.txt has no <b>sitemap</b>, and we don’t
          filter PDFs or images out of the list. If they’re in the sitemap, they
          show up.
        </div>
      </>
    )
  },
  {
    question: 'How does it find the sitemap?',
    text: 'It reads page.url() for the origin, fetches /robots.txt, and collects every sitemap. Nested indexes are expanded. We do not try /sitemap.xml or other common paths. If robots.txt has no sitemap, the list is empty.',
    answer: (
      <>
        <div>
          The helper reads the origin from <b>page.url()</b>, fetches{' '}
          <RobotsTxt />, and collects every <b>sitemap</b>. Nested indexes are
          expanded from there.
        </div>
        <div>
          We don’t try <SitemapXml />, sitemap_index.xml, or other common paths.
          If there is no sitemap, the list is empty.
        </div>
      </>
    )
  },
  {
    question: 'How does it work?',
    text: 'The URL list is the return value of a Microlink Function. The helper reads the origin from page.url(), fetches /robots.txt, require()s robots-parser to collect sitemap URLs, then require()s xml-urls to walk nested indexes and return every page URL.',
    answer: (
      <>
        <div>
          This tool is implemented using{' '}
          <Link href='/function' logoIcon>
            Microlink Function
          </Link>
          .
        </div>
        <div>
          A Microlink Function allows you to combine{' '}
          <Link href='/docs/guides/function/writing-functions'>
            NPM dependencies
          </Link>{' '}
          to run in a{' '}
          <Link href='/docs/guides/function/browser-interaction'>
            remote browser page
          </Link>
          :
        </div>
        <FunctionExampleCard
          href={editorTemplateHref('sitemap')}
          title='List sitemap URLs'
          code={sitemapCardCode('https://microlink.io')}
        />
        <div>
          The code is discovering the <RobotsTxt /> file of the target URL,
          detecting the sitemap and collecting all the URLs.
        </div>
      </>
    )
  },
  {
    question: 'What’s the difference between this and crawling a site?',
    text: 'This tool reads the URLs the site already declared in its sitemap. A crawler walks links from a homepage and can find pages the sitemap never listed. It will also miss orphan pages that no link points to.',
    answer: (
      <>
        <div>
          This tool reads the URLs the site already declared in its sitemap. A
          crawler walks links from a homepage and can find pages the sitemap
          never listed. It will miss <b>orphan pages</b> that no link points to.
        </div>
        <div>
          Use this when the site publishes a <b>sitemap</b> in <RobotsTxt />.
          Pages not in the sitemap will not appear. If you need the rendered
          page, that’s{' '}
          <Link href='/screenshot' logoIcon>
            screenshot
          </Link>
          ,{' '}
          <Link href='/html' logoIcon>
            HTML
          </Link>
          , or{' '}
          <Link href='/markdown' logoIcon>
            markdown
          </Link>
          , not this list.
        </div>
      </>
    )
  },
  {
    question: 'Does it follow nested sitemap indexes?',
    text: 'Yes. Large sites usually publish a sitemap index (a sitemap of sitemaps) that points at many child files. xml-urls walks those indexes and returns the page URLs. If robots.txt has no sitemap, the list is empty.',
    answer: (
      <>
        <div>
          Yes. Large sites (shops, publishers, docs) usually publish a sitemap
          index, a sitemap of sitemaps, that points at many child files.{' '}
          <b>xml-urls</b> walks those indexes and returns the page URLs.
        </div>
        <div>
          Discovery still starts at <RobotsTxt />. If there is no <b>sitemap</b>
          , the list is empty. We don’t guess <SitemapXml />.
        </div>
      </>
    )
  },
  {
    question: 'What does the list include?',
    text: 'The loc URLs from the XML sitemaps robots.txt pointed at. lastmod, changefreq, and priority are not in the list. HTML sitemaps are not read. PDFs or images show up if they are listed as loc.',
    answer: (
      <>
        <div>
          The <b>loc</b> URLs from the XML sitemaps <RobotsTxt /> pointed at,
          the same locations search engines read. <b>lastmod</b>,{' '}
          <b>changefreq</b>, and <b>priority</b> are not in the list.
        </div>
        <div>
          HTML sitemaps (the human-readable page in a footer) are not read. PDFs
          or images show up if they’re listed as <b>loc</b>. We don’t filter
          them out.
        </div>
      </>
    )
  },
  {
    question: 'Why not parse the sitemap myself?',
    text: 'You would still fetch robots.txt, follow nested indexes, and host a parser. This page is that script, already running as a Microlink Function: require() the packages, send the function, get the URL list back.',
    answer: (
      <>
        <div>
          You’d still fetch <RobotsTxt />, follow nested indexes, and host a
          parser. This page is that script, already running as a{' '}
          <Link href='/function' logoIcon>
            Microlink Function
          </Link>
          : <b>require()</b> the packages, send the function, get the URL list
          back.
        </div>
        <div>
          Open the card in the{' '}
          <Link href={editorTemplateHref('sitemap')}>editor</Link> and change
          it. That’s the same helper, not a private endpoint.
        </div>
      </>
    )
  },
  {
    question: 'Is this sitemap tool free?',
    text: 'Yes. This page needs no login and no credit card. The same helper from your code runs as a Microlink Function on the free plan: 25 requests per day.',
    answer: (
      <>
        <div>
          Yes. This page needs no login and no credit card. The same helper from
          your code runs as a{' '}
          <Link href='/function' logoIcon>
            Microlink Function
          </Link>{' '}
          on the free plan: <b>25&nbsp;requests per day</b>.
        </div>
        <div>
          Need more? See <Link href='/pricing'>pricing</Link>.
        </div>
      </>
    )
  }
]

const FAQ_QUESTIONS = [
  ...TOP_FAQ_ITEMS,
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
    description='Paste a site URL to list every page in its sitemap. Reads the sitemap from robots.txt, expands nested indexes, and lets you copy or download the URLs.'
    noSuffix
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/sitemap',
        name: 'Microlink Sitemap URL Extractor',
        description:
          'Paste a site URL to list every page location from the sitemap in robots.txt. Copy or download the URL list.',
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

const SitemapTool = () => (
  <Layout
    css={theme({
      maxWidth: layout.small,
      width: '100%',
      minWidth: 0,
      mx: 'auto'
    })}
  >
    <Hero />
    <Faq css={theme({ pt: 0, px: 0 })} questions={FAQ_QUESTIONS} />
  </Layout>
)

export default withTitle(SitemapTool)
