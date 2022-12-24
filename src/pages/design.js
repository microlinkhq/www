import { Layout } from 'components/patterns'
import { Iframe } from 'components/elements'
import { cdnUrl } from 'helpers'
import React from 'react'

const DesignPage = () => (
  <Layout
    head={{
      description: 'The Microlink design system.',
      image: cdnUrl('banner/design.jpeg')
    }}
  >
    <Iframe
      width='100%'
      height='920px'
      title='Design'
      src='https://design.microlink.io'
    />
  </Layout>
)

export default DesignPage
