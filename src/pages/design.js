import React from 'react'

import { Layout } from 'components/patterns'
import { Flex } from 'components/elements'

export default () => (
  <Layout title='Design System'>
    <Flex>
      <iframe
        frameBorder='0'
        target='_parent'
        src='https://design.microlink.io/'
        style={{
          height: '100vh',
          width: '100vw'
        }}
      />
    </Flex>
  </Layout>
)
