import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'
import OpenSource, { getRepoStars } from 'components/patterns/OpenSource'

import Hero from 'components/pages/n8n/hero'
import Operations from 'components/pages/n8n/operations'
import Workflow from 'components/pages/n8n/workflow'
import {
  ACCENT,
  FAQ_ITEMS,
  INSTALL_STEPS,
  NPM_URL,
  REPOSITORY_URL
} from 'components/pages/n8n/shared'
import { toFaqQuestions } from 'components/patterns/ProductStory/structured'

import { theme, SECTION_VERTICAL_SPACING } from 'theme'

const REPOS = ['n8n-nodes-microlink', 'metascraper', 'browserless']

const PAGE_URL = 'https://microlink.io/integrations/n8n'

const QUESTIONS = toFaqQuestions(FAQ_ITEMS)

export const Head = () => (
  <Meta
    title='Microlink n8n node: screenshots, PDFs and Markdown'
    noSuffix
    description='Add the Microlink community node to n8n and turn any URL into a screenshot, PDF, Markdown, text or metadata. No code, no browser to host, AI Agent ready.'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': PAGE_URL,
        name: 'Microlink node for n8n',
        description:
          'n8n community node for the Microlink API. Nine operations turn any URL into metadata, screenshots, PDFs, Markdown, plain text, audio and video sources, performance insights or logo data.',
        url: PAGE_URL,
        downloadUrl: NPM_URL,
        codeRepository: REPOSITORY_URL,
        applicationCategory: ['DeveloperApplication', 'API'],
        operatingSystem: 'n8n (self-hosted)',
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
        ...(getRepoStars(REPOS[0]) > 0 && {
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: { '@type': 'https://schema.org/LikeAction' },
            userInteractionCount: getRepoStars(REPOS[0]),
            interactionService: {
              '@type': 'WebSite',
              name: 'GitHub',
              url: REPOSITORY_URL
            }
          }
        })
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        '@id': `${PAGE_URL}#install`,
        name: 'Install the Microlink node in n8n',
        step: INSTALL_STEPS.map(({ title, description }, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: title,
          text: description
        }))
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${PAGE_URL}#faq`,
        url: PAGE_URL,
        mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text }
        }))
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
        caption='The node, the engine behind Extract, and the browser behind every capture are all public. Read the code, open an issue, or run the pieces yourself.'
      />
      <Faq
        css={theme({ py: SECTION_VERTICAL_SPACING })}
        title='FAQ'
        caption='Installing, authenticating and saving files with the Microlink node.'
        questions={QUESTIONS}
      />
    </Box>
  </Layout>
)

export default N8nPage
