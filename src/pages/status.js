import { Layout } from 'components/patterns'
import { Iframe } from 'components/elements'
import { cdnUrl } from 'helpers'
import React from 'react'

const TITLE = 'Status'

export default () => (
  <Layout title={TITLE} image={cdnUrl('page/status.png')}>
    <Iframe height='920px' title={TITLE} src='https://status.microlink.io' />
  </Layout>
)
