import React from 'react'

import { layout, theme } from 'theme'

import Container from 'components/elements/Container'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'

import {
  FAQ_ENTRIES,
  HERO_IMAGE,
  STRUCTURED_DATA
} from 'helpers/search-landing'

import HeroSection from 'components/pages/search/Hero'
import RetrievalSection from 'components/pages/search/RetrievalSection'
import PricingSection from 'components/pages/search/PricingSection'
import IntegrationSection from 'components/pages/search/IntegrationSection'
import FinalCtaSection from 'components/pages/search/FinalCtaSection'

const GooglePage = () => (
  <Layout>
    <HeroSection />
    <RetrievalSection />
    <PricingSection />
    <IntegrationSection />
    <FinalCtaSection />

    <Faq
      title='Product Information'
      caption='Everything you need to know about Microlink Search, pricing, and supported search surfaces.'
      questions={FAQ_ENTRIES.map(({ question, answers }) => ({
        question,
        answer: (
          <>
            {answers.map(answer => (
              <Text as='p' key={answer} css={theme({ m: 0 })}>
                {answer}
              </Text>
            ))}
          </>
        )
      }))}
    />

    <Container
      css={theme({
        justifyContent: 'center',
        pt: 5,
        maxWidth: layout.small
      })}
    >
      <Text
        as='p'
        css={theme({
          m: 0,
          color: 'black60',
          fontSize: [0, 0, 1, 1],
          lineHeight: 2,
          textAlign: 'center'
        })}
      >
        Google is a trademark of Google LLC. Microlink Search is an independent
        product and is not affiliated with or endorsed by Google.
      </Text>
    </Container>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Google Search API (SERP) for AI Agents | Microlink'
    description='Scrape Google Search results in ~1s. A reliable Google SERP API delivering normalized JSON for RAG pipelines, LLM tools, and developer workflows.'
    image={HERO_IMAGE}
    structured={STRUCTURED_DATA}
  />
)

export default GooglePage
