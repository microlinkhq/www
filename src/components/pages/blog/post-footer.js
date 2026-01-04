import { H2, Paraph, Strong, Link } from 'components/markdown'
import Chat from 'components/patterns/Chat/Chat'
import React from 'react'

const PostFooter = () => (
  <>
    <H2 id='chat'>Join the community</H2>
    <Paraph>
      All of these improvements or features are{' '}
      <Strong>community driven</Strong>: We listen to your feedback and act
      accordingly.
    </Paraph>
    <Paraph>
      <Chat />
    </Paraph>

    <Paraph>
      Whether you are building a product, an indie developer, or just interested
      in web technologies, come <Link href='/community'>chat</Link> with us.
    </Paraph>
  </>
)

export default PostFooter
