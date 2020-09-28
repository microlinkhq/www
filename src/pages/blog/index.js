import { textGradient, layout, borders, transition } from 'theme'
import { Link, Subhead, Flex } from 'components/elements'
import { Layout, Caption } from 'components/patterns'
import { PostTitle } from 'components/pages/blog'
import styled, { css } from 'styled-components'
import { useBlogIndex } from 'components/hook'
import { H2 } from 'components/markdown'
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

const CustomLink = styled(Link)`
  cursor: pointer;

  h2 {
    transition: background-image ${transition.medium};
  }

  &:hover {
    h2 {
      ${textGradient};
    }
  }
`

const BlogPost = ({ title, date, slug, isLastPost }) => {
  return (
    <CustomLink color='black' href={slug} width='100%'>
      <CustomFlex
        as='section'
        py={4}
        alignItems='center'
        flexDirection='column'
        borderTop
        borderBottom={isLastPost}
      >
        <H2
          mt={0}
          key={title}
          titleize={false}
          fontSize={4}
          px={5}
          slug={false}
          textAlign='center'
          maxWidth={[layout.small, layout.normal, layout.normal, layout.normal]}
        >
          <PostTitle children={title} />
        </H2>

        <Caption
          fontWeight='regular'
          color='black60'
          textAlign={['center', 'inherit']}
        >
          {formatDate(date)} ({<TimeAgo date={date} />})
        </Caption>
      </CustomFlex>
    </CustomLink>
  )
}

const PageBlog = ({ posts = useBlogIndex() }) => {
  return (
    <Layout>
      <Subhead pt={[4, 4, 5, 5]} children='Blog' />
      <Flex pt={[4, 4, 5, 5]} flexDirection='column' alignItems='center'>
        {posts.map((post, index) => (
          <BlogPost
            key={post.title}
            {...post}
            isLastPost={index === posts.length - 1}
          />
        ))}
      </Flex>
    </Layout>
  )
}

export default PageBlog
