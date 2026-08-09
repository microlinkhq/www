import React from 'react'
import { SECTION_VERTICAL_SPACING, theme } from 'theme'

import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import {
  ProductHero,
  ProductTimings,
  ProductCapabilities,
  ProductPricing,
  ProductCta,
  ProductFaq,
  Subhead,
  productStructured,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { ConversionCapabilitiesVisual } from 'components/pages/file-conversion/capabilities-visual'
import {
  ACCENT,
  TIMINGS_ACCENT,
  HERO,
  TIMINGS,
  CAPABILITIES,
  PRICING_CAPTION,
  CTA,
  FAQ_CAPTION,
  FAQ_ITEMS,
  META
} from 'components/pages/file-conversion/shared'

const FEATURES = [
  {
    title: 'Documents And Decks',
    description:
      'PDFs, Word documents, presentations and rich text all resolve to readable content through one request, with no per-format library to install.'
  },
  {
    title: 'Spreadsheets And Data Files',
    description:
      'Tabular formats convert through the same endpoint, so data files and prose documents share a single integration.'
  },
  {
    title: 'Choose Your Output',
    description:
      'The same source returns as HTML, Markdown or plain text, whichever fits the parser, model or docs pipeline that consumes it.'
  },
  {
    title: 'No Local Toolchain',
    description:
      'No LibreOffice container to run, no Ghostscript to patch, no parser dependencies to track. Conversion runs on our infrastructure.'
  },
  {
    title: 'Structure Preserved',
    description:
      'Headings, lists, tables and links survive conversion when the output format supports them, so documents stay navigable downstream.'
  },
  {
    title: 'URL In, Content Out',
    description:
      'Files are fetched and converted server-side, so you never proxy large binaries through your own servers to get readable content.'
  },
  {
    title: 'Edge Cached Responses',
    description:
      'Configurable TTL from 1 minute to 31 days. Cache hits are free, return instantly, and never reprocess the document.'
  },
  {
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready infrastructure with a 99.9% uptime SLA and guaranteed performance for business-critical document workflows.'
  },
  {
    title: 'Generous Free Tier',
    description:
      'Start immediately with 25 requests/day. No setup fees, no credit card, and pay-as-you-grow pricing that scales with your usage.'
  }
]

const REPOS = ['html-get', 'browserless', 'metascraper']

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    structured={productStructured({
      path: '/file-conversion',
      name: META.structuredName,
      description: META.structuredDescription,
      keywords: META.keywords,
      about: META.about,
      stars: getRepoStars(REPOS[0]),
      starsRepo: REPOS[0],
      faqItems: FAQ_ITEMS
    })}
  />
)

const FileConversionPage = () => (
  <Layout>
    <ProductHero {...HERO} accent={ACCENT} />
    <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
    <ProductCapabilities
      {...CAPABILITIES}
      accent={ACCENT}
      visual={<ConversionCapabilitiesVisual />}
    />
    <ProductPricing caption={PRICING_CAPTION} />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='The Microlink conversion pipeline is powered by battle-tested open source libraries used by thousands of developers worldwide. Our file conversion API is built on an open source foundation: explore the code, contribute, or run it yourself.'
    />
    <Features
      css={theme({ px: 4, py: SECTION_VERTICAL_SPACING })}
      title={
        <Subhead css={theme({ width: '100%', textAlign: 'left' })}>
          Any file in.{' '}
          <span
            css={{
              display: 'block',
              color: ACCENT,
              width: '100%',
              textAlign: 'left'
            }}
          >
            Content your code can read out.
          </span>
        </Subhead>
      }
      caption={
        <>
          One endpoint replaces a shelf of per-format parsers. See every
          supported format on the <Link href='/formats'>formats page</Link>.
        </>
      }
      features={FEATURES}
    />
    <ProductCta {...CTA} accent={ACCENT} />
    <ProductFaq caption={FAQ_CAPTION} questions={toFaqQuestions(FAQ_ITEMS)} />
  </Layout>
)

export default FileConversionPage
