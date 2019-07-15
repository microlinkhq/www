import { Text, Flex, Container, Subhead } from 'components/elements'
import { H2Link } from 'components/markdown'
import styled, { css } from 'styled-components'
import { useBlogIndex } from 'components/hook'
import { Layout } from 'components/patterns'
import { borders, transition } from 'theme'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'
import Head from 'components/Head'
import is from 'styled-is'
import React from 'react'

const borderStyle = css`
  ${is('borderTop')`
    border-top: ${borders[1]} ${({ theme }) => theme.colors.border};
  `};
  ${is('borderBottom')`
    border-bottom: ${borders[1]} ${({ theme }) => theme.colors.border};
  `};
`

const CustomFlex = styled(Flex)`
  ${borderStyle};
  transition: background-color ${transition.short};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray0};
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
        href={slug}
        children={title}
      />
      <Text fontSize={[0, 2]} color='gray' textAlign={['center', 'inherit']}>
        {formatDate(timestamp)} ({<TimeAgo date={date} />})
      </Text>
    </CustomFlex>
  )
}

export default ({ posts = useBlogIndex() }) => {
  return (
    <Layout image='https://cdn.microlink.io/page/blog.png'>
      <Head title='Blog' />
      <Container px={0} as='article' maxWidth={'inherit'}>
        <Flex flexDirection='column' alignItems='center' pt={5}>
          <Subhead mb={4} slug={false} children='Blog' />
          {posts.map((post, index) => (
            <BlogPost
              key={post.title}
              {...post}
              isLastPost={index === posts.length - 1}
            />
          ))}
        </Flex>
      </Container>
    </Layout>
  )
}
