import React from 'react'
import { Text, Box, Metadata } from 'components/elements'
import { H1 } from 'components/markdown'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'

export default function PostLayout ({ title, date, image, slug }) {
  const timestamp = new Date(date)

  return function withContent (content) {
    const Post = ({ metadata }) => {
      const meta = {
        ...metadata,
        title,
        date,
        image: image || metadata.logo,
        siteUrl: `${metadata.siteUrl}/blog/${slug}`
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
            <H1>{title}</H1>
            <Text fontSize={2} color='gray'>
              {formatDate(timestamp)} ({<TimeAgo date={date} />})
            </Text>
          </Text>
          {content}
        </Box>
      )
    }

    return Post
  }
}
