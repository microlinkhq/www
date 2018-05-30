import React from 'react'
import { Divider, Text, Flex, Container } from 'components/elements'
import { H2 } from 'components/markdown'
import { Helmet } from 'react-helmet'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'

import { colors } from 'theme'

const Link = H2.extend`
  text-decoration: none;
  cursor: pointer;
  color: black;
  transition: all 0.1s ease-out;

  &:hover {
    color: ${colors.link};
  }
`

const BlogPost = ({ title, date, slug }) => {
  const timestamp = new Date(date)

  return (
    <Flex pb={3} pt={4} px={0} alignItems='center' flexDirection='column'>
      <Link
        fontSize={4}
        maxWidth='18em'
        mt={0}
        mb={3}
        mx='auto'
        textAlign='center'
        is='a'
        href={`/blog/${slug}`}
        children={title}
      />
      <Text fontSize={2} color='gray'>
        {formatDate(timestamp)} ({<TimeAgo date={date} />})
      </Text>
      <Divider width={'25%'} borderColor='rgb(234, 234, 234)' pt={4} />
    </Flex>
  )
}

export default ({ pathContext }) => {
  const { posts } = pathContext
  return (
    <Container mx='auto'>
      <Helmet title='Blog' />
      <Flex flexDirection='column' alignItems='center' pt={4}>
        {posts.map(post => <BlogPost key={post.title} {...post} />)}
      </Flex>
    </Container>
  )
}
