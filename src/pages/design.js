import React from 'react'

import { Layout } from 'components/patterns'
import { Flex } from 'components/elements'

const TITLE = 'Design System'

export default () => (
  <Layout title={TITLE}>
    <Flex>
      <iframe
        frameBorder='0'
        target='_parent'
        title={TITLE}
        src='https://design.microlink.io/'
        style={{
          height: '100vh',
          width: '100vw'
        }}
      />
    </Flex>
  </Layout>
)
