import React from 'react'
import { Divider, Text, Flex, Container, Metadata } from 'components/elements'
import { H2Link } from 'components/markdown'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'

const BlogPost = ({ title, date, slug }) => {
  const timestamp = new Date(date)

  return (
    <Flex pb={3} pt={4} px={[4, 3]} alignItems='center' flexDirection='column'>
      <H2Link
        lineHeight={[3, 2]}
        fontSize={[2, 4]}
        maxWidth='18em'
        mt={0}
        mb={3}
        mx='auto'
        textAlign='center'
        href={`/blog/${slug}`}
        children={title}
      />
      <Text fontSize={[0, 2]} color='gray' textAlign={['center', 'inherit']}>
        {formatDate(timestamp)} ({<TimeAgo date={date} />})
      </Text>
      <Divider width={'25%'} borderColor='rgb(234, 234, 234)' pt={[3, 4]} />
    </Flex>
  )
}

export default ({ pathContext }) => {
  const { posts } = pathContext
  return (
    <Container>
      <Metadata title='Blog' />
      <Flex flexDirection='column' alignItems='center' pt={4}>
        {posts.map(post => <BlogPost key={post.title} {...post} />)}
      </Flex>
    </Container>
  )
}
