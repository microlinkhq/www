import React from 'react'

import Meta from 'components/elements/Meta/Meta'

import Layout from 'components/patterns/Layout'

import { Hero } from 'components/pages/features/hero'
import { Primitives } from 'components/pages/features/primitives'
import { META } from 'components/pages/features/shared'

const FeaturesIndexPage = () => (
  <Layout>
    <Hero />
    <Primitives />
  </Layout>
)

export const Head = () => (
  <Meta
    title={META.title}
    description={META.description}
    schemaType='WebPage'
  />
)

export default FeaturesIndexPage
