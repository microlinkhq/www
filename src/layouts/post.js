import { Text, Box, Head } from 'components/elements'
import { Layout } from 'components/patterns'
import { StaticQuery, graphql } from 'gatsby'
import React, { Component } from 'react'
import { H1 } from 'components/markdown'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'

const query = graphql`
  query PostQuery {
    site {
      siteMetadata {
        url
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
                url: `${metadata.url}/blog/${frontmatter.slug}`
              }

              return (
                <Layout>
                  <Box px={3}>
                    <Head {...meta} />
                    <Text as='header' textAlign='center' mb={5} maxWidth='900px' mx='auto'>
                      <H1 textAlign='center' children={meta.title} />
                      {!meta.static && (
                        <Text fontSize={2} color='gray'>
                          {formatDate(timestamp)} ({<TimeAgo date={meta.date} />})
                        </Text>
                      )}
                    </Text>
                    {content}
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
