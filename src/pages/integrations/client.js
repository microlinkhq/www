import React from 'react'

import Meta from 'components/elements/Meta/Meta'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'

import Hero from 'components/pages/client/hero'
import Methods from 'components/pages/client/methods'
import Examples from 'components/pages/client/examples'
import { ACCENT, QUESTIONS } from 'components/pages/client/shared'

import { theme, SECTION_VERTICAL_SPACING } from 'theme'

const REPOS = ['microlink', 'mql', 'cli']

export const Head = () => (
  <Meta
    title='Microlink API Client — every product from one npm package'
    description='microlink.io is the official universal HTTP client for the Microlink API. One import for screenshots, PDFs, metadata, scraping, and search in Node.js, browsers, and Deno.'
    noSuffix
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/integrations/client',
        name: 'Microlink API Client',
        description:
          'Official universal HTTP client for the Microlink API. It organizes every product into semantic methods for Node.js, browsers, and Deno.',
        url: 'https://microlink.io/integrations/client',
        downloadUrl: 'https://www.npmjs.com/package/microlink.io',
        applicationCategory: ['DeveloperApplication', 'API'],
        operatingSystem: 'Node.js, Browsers, Deno',
        license: 'https://opensource.org/licenses/MIT',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        provider: {
          '@type': 'Organization',
          '@id': 'https://microlink.io/about',
          name: 'Microlink',
          url: 'https://microlink.io'
        },
        interactionStatistic: {
          '@type': 'InteractionCounter',
          interactionType: { '@type': 'https://schema.org/LikeAction' },
          userInteractionCount: getRepoStars(REPOS[0]),
          interactionService: {
            '@type': 'WebSite',
            name: 'GitHub',
            url: 'https://github.com/microlinkhq/microlink'
          }
        }
      }
    ]}
  />
)

const ClientPage = () => (
  <Layout>
    <Hero />
    <Methods />
    <Examples />
    <OpenSource
      repos={REPOS}
      accent={ACCENT}
      caption='The client, the transport layer beneath it, and the terminal experience on top are all developed in the open. Explore the code, contribute, or run it yourself — MIT licensed.'
    />
    <Faq
      css={theme({ py: SECTION_VERTICAL_SPACING })}
      title='FAQ'
      caption='Everything about the microlink.io package.'
      questions={QUESTIONS}
    />
  </Layout>
)

export default ClientPage
