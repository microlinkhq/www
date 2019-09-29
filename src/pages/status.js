import { Layout } from 'components/patterns'
import { Iframe } from 'components/elements'
import React from 'react'

const TITLE = 'Status'

export default () => (
  <Layout title={TITLE} image='https://cdn.microlink.io/page/status.png'>
    <Iframe height='920px' title={TITLE} src='https://status.microlink.io' />
  </Layout>
)
