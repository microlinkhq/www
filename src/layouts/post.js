import { H1, H2, Paraph, Strong, Link } from 'components/markdown'
import { Chat, Layout } from 'components/patterns'
import { useSiteMetadata } from 'components/hook'
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
      <Link href='https://chat.microlink.io/'>chat</Link> with us 🙂.
    </Paraph>
  </Fragment>
)

export default function PostLayout (frontmatter) {
  const timestamp = new Date(frontmatter.date)

  return function withContent (content) {
    const Post = () => {
      const metadata = useSiteMetadata()

      const meta = {
        ...metadata,
        ...frontmatter,
        url: `${metadata.siteUrl}/blog/${frontmatter.slug}`
      }

      return (
        <Layout>
          <Box px={3}>
            <Head {...meta} />
            <Text
              as='header'
              textAlign='center'
              mb={5}
              maxWidth='900px'
              mx='auto'
            >
              <H1 textAlign='center' children={meta.title} />
              {!meta.static && (
                <Text fontSize={2} color='gray'>
                  {formatDate(timestamp)} ({<TimeAgo date={meta.date} />})
                </Text>
              )}
            </Text>
            {content}
            {!frontmatter.static && <PostFooter />}
          </Box>
        </Layout>
      )
    }

    return Post
  }
}
