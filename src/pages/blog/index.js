import { Text, Flex, Container } from 'components/elements'
import { Layout, SubHeadline } from 'components/patterns'
import styled, { css } from 'styled-components'
import { useBlogIndex } from 'components/hook'
import { H2Link } from 'components/markdown'
import { borders, transition } from 'theme'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'
import is from 'styled-is'
import React from 'react'

const borderStyle = css`
  ${is('borderTop')`
    border-top: ${borders[1]} ${({ theme }) => theme.colors.black05};
  `};
  ${is('borderBottom')`
    border-bottom: ${borders[1]} ${({ theme }) => theme.colors.black05};
  `};
`

const CustomFlex = styled(Flex)`
  ${borderStyle};
  transition: background-color ${transition.medium};
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
        ml='auto'
        mr='auto'
        textAlign='center'
        href={slug}
        children={title}
      />
      <Text fontSize={[0, 2]} color='black50' textAlign={['center', 'inherit']}>
        {formatDate(timestamp)} ({<TimeAgo date={date} />})
      </Text>
    </CustomFlex>
  )
}

export default ({ posts = useBlogIndex() }) => {
  return (
    <Layout>
      <Container px={0} as='article' maxWidth='inherit'>
        <Flex flexDirection='column' alignItems='center' pt={5}>
          <SubHeadline title='Blog' pb={4} />
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
