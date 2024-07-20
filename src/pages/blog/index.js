import { textGradient, layout, transition, theme, letterSpacings } from 'theme'
import { Meta, Heading, Link, Flex } from 'components/elements'
import { Layout, Caption } from 'components/patterns'
import { PostTitle } from 'components/pages/blog'
import styled from 'styled-components'
import { useBlogIndex } from 'components/hook'
import { cdnUrl, formatDate } from 'helpers'
import { H1Base } from 'components/markdown'
import TimeAgo from 'react-timeago'
import React from 'react'

const BlogSeparator = styled(Flex)`
  ${({ $isLastPost }) =>
    theme({
      py: 4,
      flexDirection: 'column',
      alignItems: 'center',
      border: 0,
      borderColor: 'black05',
      borderStyle: 'solid',
      borderTopWidth: 1,
      borderBottomWidth: $isLastPost ? 1 : 0,
      transition: `background-color ${transition.medium}`,

      _hover: {
        bg: 'gray0'
      }
    })}
`

const BlogLink = styled(Link)`
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
    <BlogLink
      href={slug}
      css={{ width: '100%', letterSpacing: letterSpacings[1] }}
    >
      <BlogSeparator $isLastPost={isLastPost}>
        <H1Base
          forwardedAs='h3'
          css={theme({
            mt: 0,
            px: 5,
            textAlign: 'center',
            maxWidth: [
              layout.small,
              layout.normal,
              layout.normal,
              layout.normal
            ]
          })}
        >
          <PostTitle>{title}</PostTitle>
        </H1Base>

        <Caption
          forwardedAs='h4'
          css={theme({ color: 'black60', textAlign: ['center', 'inherit'] })}
        >
          {formatDate(date)} (<TimeAgo date={date} />)
        </Caption>
      </BlogSeparator>
    </BlogLink>
  )
}

export const Head = () => (
  <Meta
    description='Engineering details through Microlink.'
    image={cdnUrl('banner/blog.jpeg')}
  />
)

const PageBlog = () => {
  const posts = useBlogIndex()

  return (
    <Layout>
      <Flex css={theme({ pt: 2, justifyContent: 'center' })}>
        <Flex css={{ flexDirection: 'column', alignItems: 'center' }}>
          <Heading css={{ maxWidth: layout.large }}>Blog</Heading>
          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 4, 4],
              mb: ['-16px', '-16px', '-32px', '-32px'],
              px: [4, 4, 0, 0],
              maxWidth: layout.small
            })}
            titleize={false}
          >
            Engineering details through Microlink.
          </Caption>
        </Flex>
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          flexDirection: 'column',
          alignItems: 'center'
        })}
      >
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
