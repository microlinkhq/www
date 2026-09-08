import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'
import Hero from 'components/pages/cli/hero'
import Layout from 'components/patterns/Layout'

import { theme } from 'theme'

export const Head = () => (
  <Meta
    title='CLI'
    description='Use the Microlink API from your terminal. Install microlink.io, pass any URL or product subcommand, inspect pretty JSON, cache status, and timing.'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Microlink CLI',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'macOS, Linux, Windows',
        description:
          'Command-line interface for interacting with the Microlink API from a terminal.',
        url: 'https://microlink.io/cli',
        downloadUrl: 'https://www.npmjs.com/package/microlink.io',
        softwareVersion: '0.8.0',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      }
    ]}
  />
)

const CliPage = () => (
  <Layout>
    <Box css={theme({ bg: 'white' })}>
      <Hero />
    </Box>
  </Layout>
)

export default CliPage
