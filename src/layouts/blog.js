import React, { Fragment } from 'react'
import { Text, Flex, Container, Metadata } from 'components/elements'
import { H1, H2Link } from 'components/markdown'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'
import styled, { css } from 'styled-components'
import { colors, transition } from 'theme'
import is from 'styled-is'

const borderStyle = css`
  ${is('borderTop')`
    border-top: 1px solid ${colors.gray1};
  `};
  ${is('borderBottom')`
    border-bottom: 1px solid ${colors.gray1};
  `};
`

const CustomFlex = styled(Flex)`
  ${borderStyle};
  transition: background-color ${transition.short};
  &:hover {
    background-color: ${colors.gray0};
  }
`

const BlogPost = ({ title, date, slug, isLastPost }) => {
  const timestamp = new Date(date)

  return (
    <CustomFlex
      as='section'
      py={4}
      px={[4, 3]}
      alignItems='center'
      flexDirection='column'
      width='100%'
      borderTop
      borderBottom={isLastPost}
    >
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
    </CustomFlex>
  )
}

export default ({ pathContext }) => {
  const { posts } = pathContext
  console.log('posts.length', posts.length)
  return (
    <Fragment>
      <Metadata title='Blog' />
      <Container as='article' maxWidth={'inherit'}>
        <Flex flexDirection='column' alignItems='center' pt={4}>
          <H1 mt={0} mb={4} mx={0}>
            Blog
          </H1>
          {posts.map((post, index) => {
            const isLasPost = index === posts.length - 1
            return (
              <Fragment>
                <BlogPost key={post.title} {...post} isLastPost={isLasPost} />
              </Fragment>
            )
          })}
        </Flex>
      </Container>
    </Fragment>
  )
}
