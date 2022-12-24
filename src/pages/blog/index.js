import { textGradient, layout, borders, transition } from 'theme'
import { Heading, Link, Flex } from 'components/elements'
import { Layout, Caption } from 'components/patterns'
import { PostTitle } from 'components/pages/blog'
import styled, { css } from 'styled-components'
import { useBlogIndex } from 'components/hook'
import { cdnUrl, formatDate } from 'helpers'
import { H1 } from 'components/markdown'
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

  h3 {
    color: black;
  }

  &:hover {
    h3 {
      ${textGradient};
    }
  }
`

const BlogPost = ({ title, date, slug, isLastPost }) => {
  return (
    <CustomLink href={slug} width='100%'>
      <CustomFlex
        py={4}
        alignItems='center'
        flexDirection='column'
        borderTop
        borderBottom={isLastPost}
      >
        <H1
          as='h3'
          mt={0}
          key={title}
          titleize={false}
          px={5}
          slug={false}
          textAlign='center'
          maxWidth={[layout.small, layout.normal, layout.normal, layout.normal]}
        >
          <PostTitle>{title}</PostTitle>
        </H1>

        <Caption as='h4' color='black60' textAlign={['center', 'inherit']}>
          {formatDate(date)} (<TimeAgo date={date} />)
        </Caption>
      </CustomFlex>
    </CustomLink>
  )
}

const PageBlog = () => {
  const posts = useBlogIndex()

  return (
    <Layout
      head={{
        image: cdnUrl('banner/blog.jpeg'),
        description: 'Engineering details through Microlink.'
      }}
    >
      <Flex pt={[2, 2, 3, 3]} justifyContent='center'>
        <Flex flexDirection='column' align-items='center'>
          <Heading maxWidth={layout.large}>Blog</Heading>
          <Caption
            as='h2'
            pt={[3, 3, 4, 4]}
            mb={['-16px', '-16px', '-32px', '-32px']}
            px={[4, 4, 0, 0]}
            titleize={false}
            maxWidth={layout.small}
          >
            Engineering details through Microlink.
          </Caption>
        </Flex>
      </Flex>
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
