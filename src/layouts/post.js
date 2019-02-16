import { Text, Box } from 'components/elements'
import Head from 'components/Head'
import { H1, H2, Paraph, Strong, Link } from 'components/markdown'
import { Chat, Layout } from 'components/patterns'
import { StaticQuery, graphql } from 'gatsby'
import React, { Fragment, Component } from 'react'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'

const query = graphql`
  query PostQuery {
    site {
      siteMetadata {
        siteUrl
        headline
        description
        image
        video
        twitter
        name
        logo
      }
    }
  }
`

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
    const Post = class extends Component {
      render () {
        return (
          <StaticQuery
            query={query}
            render={data => {
              const { siteMetadata: metadata } = data.site

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
                          {formatDate(timestamp)} (
                          {<TimeAgo date={meta.date} />})
                        </Text>
                      )}
                    </Text>
                    {content}
                    {!frontmatter.static && <PostFooter />}
                  </Box>
                </Layout>
              )
            }}
          />
        )
      }
    }

    return Post
  }
}
