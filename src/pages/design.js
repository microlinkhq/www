import React from 'react'

import { Layout } from 'components/patterns'
import { Iframe } from 'components/elements'

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
