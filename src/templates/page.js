import Markdown, { H2, Paraph, Strong, Link } from 'components/markdown'
import { Headline, Chat, Layout } from 'components/patterns'
import { Text, Box } from 'components/elements'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'
import { layout } from 'theme'
import React from 'react'

const PostFooter = () => (
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

export default ({ isBlogPage, date, meta, content }) => (
  <Layout {...meta}>
    <Box pt={[0, 0, 0, 3]} px={3}>
      <Text maxWidth={isBlogPage ? layout.small : 'none'} ml='auto' mr='auto'>
        <Headline title={meta.title} pb={3} />
        {isBlogPage && (
          <Text fontSize={[2, 2, 2, 3]} textAlign='center' mb={4}>
            {formatDate(date)} ({<TimeAgo date={date} />})
          </Text>
        )}
      </Text>

      <Markdown children={content} />

      {isBlogPage && <PostFooter />}
    </Box>
  </Layout>
)
