import Markdown, {
  H1,
  H2,
  Paraph,
  Strong,
  Link,
  Blockquote
} from 'components/markdown'
import { Chat, Layout } from 'components/patterns'
import { Text, Box } from 'components/elements'
import React, { Fragment } from 'react'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'
import Head from 'components/Head'

const PostFooter = () => (
  <Fragment>
    <H2>Come chat with us</H2>
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
  </Fragment>
)

export default ({ isBlogPage, date, meta, content }) => (
  <Layout>
    <Box px={3}>
      <Head {...meta} />
      <Text as='header' textAlign='center' mb={5} maxWidth='900px' mx='auto'>
        <H1
          textAlign='center'
          children={meta.title}
          slug={false}
          variant='gradient'
          mb={3}
        />
        {isBlogPage && (
          <Text fontSize={2} color='gray'>
            {formatDate(date)} ({<TimeAgo date={date} />})
          </Text>
        )}
      </Text>

      {!isBlogPage && date && (
        <Blockquote>
          <Paraph>
            Las Updated: {formatDate(date)} ({<TimeAgo date={date} />})
          </Paraph>
        </Blockquote>
      )}

      <Markdown children={content} />

      {isBlogPage && <PostFooter />}
    </Box>
  </Layout>
)
