import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'

import Hero from 'components/pages/n8n/hero'
import Operations from 'components/pages/n8n/operations'
import Workflow from 'components/pages/n8n/workflow'
import { ACCENT, NPM_URL, QUESTIONS } from 'components/pages/n8n/shared'

import { theme, SECTION_VERTICAL_SPACING } from 'theme'

const REPOS = ['n8n-nodes-microlink', 'mql', 'browserless']

export const Head = () => (
  <Meta
    title='n8n node for screenshots, PDFs and page data'
    description='Install the Microlink community node in n8n. Any URL becomes metadata, a screenshot, a PDF, Markdown, text, media, insights or a logo.'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/integrations/n8n',
        name: 'Microlink node for n8n',
        description:
          'n8n community node for the Microlink API. Nine operations turn any URL into metadata, screenshots, PDFs, Markdown, plain text, audio and video sources, performance insights or logo data.',
        url: 'https://microlink.io/integrations/n8n',
        downloadUrl: NPM_URL,
        applicationCategory: ['DeveloperApplication', 'API'],
        operatingSystem: 'n8n Cloud, n8n self-hosted',
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
          userInteractionCount: getRepoStars(REPOS[1]),
          interactionService: {
            '@type': 'WebSite',
            name: 'GitHub',
            url: 'https://github.com/microlinkhq/mql'
          }
        }
      }
    ]}
  />
)

const N8nPage = () => (
  <Layout>
    <Box css={theme({ bg: 'white' })}>
      <Hero />
      <Operations />
      <Workflow />
      <OpenSource
        repos={REPOS}
        accent={ACCENT}
        caption='The node, the client it speaks to, and the browser behind the API are all public. Read the code, open an issue, or run the pieces yourself.'
      />
      <Faq
        css={theme({ py: SECTION_VERTICAL_SPACING })}
        title='FAQ'
        caption='Everything about running Microlink inside an n8n workflow.'
        questions={QUESTIONS}
      />
    </Box>
  </Layout>
)

export default N8nPage
