import React from 'react'

import Confetti from 'react-confetti'
import { Header, Layout } from 'components/patterns'
import { colors } from 'theme'
import { isSSR } from 'helpers'

const centerStyle = `
justify-content: center;
align-items: center;
display: flex;
`

export default () => (
  <Layout title='Payment success' css={centerStyle}>
    <Confetti
      width={!isSSR && window.innerWidth}
      height={!isSSR && window.innerHeight}
      colors={[
        colors.red5,
        colors.pink5,
        colors.grape5,
        colors.violet5,
        colors.indigo5,
        colors.blue5,
        colors.cyan5,
        colors.teal5,
        colors.green5,
        colors.lime5,
        colors.yellow5,
        colors.orange5
      ]}
    />
    <Header
      title='Thank you'
      caption='Payment processed, check your inbox.  '
    />
  </Layout>
)
