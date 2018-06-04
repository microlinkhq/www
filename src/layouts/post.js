/* global graphql */

import React from 'react'
import { Text, Section } from 'components/elements'
import { H1 } from 'components/markdown'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'
import Helmet from 'react-helmet'

export default function PostLayout ({ title, date }) {
  const timestamp = new Date(date)

  return function withContent (content) {
    const Post = props => {
      return (
        <Section px={3}>
          <Helmet title={title} />
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
        </Section>
      )
    }

    return Post
  }
}
