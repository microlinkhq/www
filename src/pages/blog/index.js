import { layout, theme } from 'theme'
import Meta from 'components/elements/Meta/Meta'
import HeadingBase from 'components/elements/Heading'
import Flex from 'components/elements/Flex'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import { useBlogIndex } from 'components/hook/use-blog-index'
import { cdnUrl } from 'helpers/cdn-url'
import React from 'react'
import { BlogPostList } from 'components/pages/blog/blog-posts'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

export const Head = () => (
  <Meta
    description='Engineering details through Microlink.'
    image={cdnUrl('banner/blog.jpeg')}
  />
)

const PageBlog = () => {
  const posts = useBlogIndex()

  return (
    <Layout footer={{ style: { background: 'transparent' } }}>
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center'
        })}
      >
        <Heading titleize={false} css={{ maxWidth: layout.large }}>
          Blog
        </Heading>

        <Caption
          forwardedAs='h2'
          css={theme({
            pt: [3, null, 4],
            px: 4,
            maxWidth: layout.small
          })}
          titleize={false}
        >
          Engineering details through Microlink.
        </Caption>

        <Flex
          css={theme({
            pt: [3, null, 4],
            px: [2, null, 4],
            width: '100%',
            maxWidth: layout.normal,
            flexDirection: 'column'
          })}
        >
          {posts.map((post, index) => (
            <BlogPostList
              key={post.title}
              {...post}
              isLastPost={index === posts.length - 1}
            />
          ))}
        </Flex>
      </Flex>
    </Layout>
  )
}

export default PageBlog
