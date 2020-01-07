import React from 'react'

import { Layout } from 'components/patterns'
import { Iframe } from 'components/elements'
import { cdnUrl } from 'helpers'

const TITLE = 'Design'

export default () => (
  <Layout title={TITLE} image={cdnUrl('www/design.png')}>
    <Iframe
      width='100%'
      height='920px'
      title={TITLE}
      src='https://design.microlink.io'
    />
  </Layout>
)
