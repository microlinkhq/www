import * as mdComponents from 'components/markdown'
import { Chat, Layout } from 'components/patterns'
import { useSiteMetadata } from 'components/hook'
import { Text, Box } from 'components/elements'
import React, { Fragment } from 'react'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'
import MDX from 'mdx-scoped-runtime'
import Head from 'components/Head'
import { graphql } from 'gatsby'
import slug from 'remark-slug'
import { omit } from 'lodash'

const { H1, H2, Paraph, Strong, Link, Blockquote } = mdComponents

const scopeComponents = omit(mdComponents, 'default')

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

export default function BlogPost ({ pageContext, data }, ...rest) {
  const { isBlogPost } = pageContext
  const { frontmatter, rawMarkdownBody } = data.markdownRemark
  const metadata = useSiteMetadata()

  const meta = {
    ...metadata,
    ...frontmatter,
    url: `${metadata.siteUrl}${frontmatter.slug}`
  }

  const date = frontmatter.date && new Date(frontmatter.date)

  return (
    <Layout>
      <Box px={3}>
        <Head {...meta} />
        <Text as='header' textAlign='center' mb={5} maxWidth='900px' mx='auto'>
          <H1 textAlign='center' children={meta.title} slug={false} />
          {isBlogPost && (
            <Text fontSize={2} color='gray'>
              {formatDate(date)} ({<TimeAgo date={date} />})
            </Text>
          )}
        </Text>

        {!isBlogPost && date && (
          <Blockquote>
            <Paraph>
              Las Updated: {formatDate(date)} ({<TimeAgo date={date} />})
            </Paraph>
          </Blockquote>
        )}

        <MDX
          components={mdComponents.default}
          scope={scopeComponents}
          mdPlugins={[slug]}
        >
          {rawMarkdownBody}
        </MDX>
        {isBlogPost && <PostFooter />}
      </Box>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      rawMarkdownBody
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      fields {
        slug
      }
    }
  }
`
