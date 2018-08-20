import React from 'react'
import { Text, Box, Metadata } from 'components/elements'
import { H1 } from 'components/markdown'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'

export default function PostLayout (frontmatter) {
  const timestamp = new Date(frontmatter.date)

  return function withContent (content) {
    const Post = ({ metadata }) => {
      const meta = {
        ...metadata,
        ...frontmatter,
        image: frontmatter.image || metadata.logo,
        siteUrl: `${metadata.siteUrl}/blog/${frontmatter.slug}`
      }

      return (
        <Box px={3}>
          <Metadata {...meta} />

          <Text
            is='header'
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
        </Box>
      )
    }

    return Post
  }
}
