import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'

import { Hero } from 'components/pages/manifesto/hero'
import { Principles } from 'components/pages/manifesto/principles'
import { META } from 'components/pages/manifesto/shared'

const ManifestoPage = () => (
  <Layout>
    <Box
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        mx: 'auto',
        px: [3, 3, 4, 4]
      })}
    >
      <Hero />
      <Principles />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta title={META.title} description={META.description} />
)

export default ManifestoPage
