import { Layout } from 'components/patterns'
import { Meta, Iframe } from 'components/elements'
import { cdnUrl } from 'helpers'
import React from 'react'

export const Head = () => (
  <Meta
    description='The Microlink design system.'
    image={cdnUrl('banner/design.jpeg')}
  />
)

const DesignPage = () => (
  <Layout>
    <Iframe
      width='100%'
      height='920px'
      title='Design'
      src='https://design.microlink.io'
    />
  </Layout>
)

export default DesignPage
