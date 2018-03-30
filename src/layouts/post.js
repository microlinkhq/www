/* global graphql */

import React, { Fragment } from 'react'
import { Container } from 'components/elements'
import Helmet from 'react-helmet'

export default function PostLayout ({ title, date }) {
  return function withContent (content) {
    const Post = props => {
      return (
        <Fragment>
          <Helmet title={title} />
          <Container mx='auto' maxWidth='828px' p={5}>
            {content}
          </Container>
        </Fragment>
      )
    }

    return Post
  }
}
