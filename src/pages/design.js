import React from 'react'

import { Layout } from 'components/patterns'
import { Iframe } from 'components/elements'
const TITLE = 'Design'

export default () => (
  <Layout title={TITLE} image='https://cdn.microlink.io/page/design.png'>
    <Iframe
      width='100%'
      height='920px'
      title={TITLE}
      src='https://design.microlink.io'
    />
  </Layout>
)
