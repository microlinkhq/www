import { H2, Paraph, Strong, Link } from 'components/markdown'
import { Chat } from 'components/patterns'
import React from 'react'

export default () => (
  <>
    <H2 id='chat'>Come chat with us</H2>
    <Chat />
    <Paraph>
      All of these improvements or features are{' '}
      <Strong>community driven</Strong>: We listen to your feedback and act
      accordingly.
    </Paraph>
    <Paraph>
      Whether you are are building a product and you need fancy previews, you’re
      an indie hacker or simply you like frontend stuff, come{' '}
      <Link href='https://microlink.io/chat'>chat</Link> with us 🙂.
    </Paraph>
  </>
)
