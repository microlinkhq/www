/* global graphql */

import React from 'react'
import { Text, Section } from 'components/elements'
import { H1 } from 'components/markdown'
import Helmet from 'react-helmet'
import TimeAgo from 'react-timeago'

const formatDate = timestamp =>
  timestamp.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

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
            pb={3}
            maxWidth='900px'
            mx='auto'
          >
            <H1>{title}</H1>
            <Text fontSize={0} color='gray'>
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
