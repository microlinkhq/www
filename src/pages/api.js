import React from 'react'
import { SECTION_VERTICAL_SPACING, theme } from 'theme'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'
import {
  ProductPricing,
  ProductCta,
  ProductFaq,
  ProductTimings,
  productStructured,
  toFaqQuestions
} from 'components/patterns/ProductStory'
import { Hero } from 'components/pages/api/hero'
import { PageNav } from 'components/pages/api/page-nav'
import { Quickstart } from 'components/pages/api/quickstart'
import { Products } from 'components/pages/api/products'
import { Features } from 'components/pages/api/features'
import { Integrations } from 'components/pages/api/integrations'
import { Enterprise } from 'components/pages/api/enterprise'
import {
  ACCENT,
  CTA,
  CompactPricing,
  FAQ_CAPTION,
  FAQ_ITEMS,
  HOW_TO,
  META,
  PRICING_CAPTION,
  SPACIOUS_SECTION_SPACING,
  TIMINGS,
  TIMINGS_ACCENT,
  PageRoot
} from 'components/pages/api/shared'

const REPOS = ['metascraper', 'browserless', 'mql']

export const Head = () => (
  <Meta
    title={META.title}
    noSuffix
    description={META.description}
    structured={productStructured({
      path: '/api',
      name: META.structuredName,
      description: META.structuredDescription,
      keywords: META.keywords,
      about: META.about,
      stars: getRepoStars(REPOS[0]),
      starsRepo: REPOS[0],
      faqItems: FAQ_ITEMS,
      howTo: HOW_TO
    })}
  />
)

const ApiPage = () => (
  <Layout>
    <PageRoot>
      <Hero />
      <PageNav />
      <ProductTimings accent={TIMINGS_ACCENT} {...TIMINGS} />
      <Quickstart />
      <Products />
      <Features />
      <Integrations />
      <CompactPricing>
        <ProductPricing caption={PRICING_CAPTION} bg='white' />
      </CompactPricing>
      <Enterprise />
      <Box css={theme({ py: SECTION_VERTICAL_SPACING })}>
        <OpenSource
          repos={REPOS}
          accent={ACCENT}
          caption='The Microlink API runs on open source you can read, fork, and run yourself: metascraper for metadata, browserless for the headless browser, and mql, the HTTP client behind the SDK.'
        />
      </Box>
      <ProductFaq
        pt={SPACIOUS_SECTION_SPACING}
        title='Frequently asked questions'
        caption={FAQ_CAPTION}
        questions={toFaqQuestions(FAQ_ITEMS)}
      />
      <ProductCta {...CTA} accent={ACCENT} />
    </PageRoot>
  </Layout>
)

export default ApiPage
