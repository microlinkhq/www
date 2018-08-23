/* global anchors */

import React, { Component } from 'react'
import { Text, Box, Metadata } from 'components/elements'
import { H1 } from 'components/markdown'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'

export default function PostLayout (frontmatter) {
  const timestamp = new Date(frontmatter.date)

  return function withContent (content) {
    const Post = class extends Component {
      componentDidMount () {
        if (document.getElementById('anchor-js')) this.configure()
        var s = document.createElement('script')
        s.id = 'anchor-js'
        s.src = 'https://cdn.jsdelivr.net/npm/anchor-js@4/anchor.min.js'
        s.onload = this.configure
        s.onerror = err => console.error(err)
        document.body.appendChild(s)
      }

      configure = () => {
        anchors.add()
      }

      render () {
        const { metadata } = this.props

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
    }

    return Post
  }
}
