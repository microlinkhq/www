import { layout, theme } from 'theme'
import Meta from 'components/elements/Meta/Meta'
import HeadingBase from 'components/elements/Heading'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import { useBlogIndex } from 'components/hook/use-blog-index'
import { useQueryState } from 'components/hook/use-query-state'
import { cdnUrl } from 'helpers/cdn-url'
import React, { useState, useEffect } from 'react'
import Toggle from 'components/elements/Toggle/Toggle'
import { Grid, List } from 'react-feather'
import { BlogPostGrid, BlogPostList } from 'components/pages/blog/blog-posts'

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
  const [{ view = 'grid' }, setQuery] = useQueryState()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const currentView = isMounted ? view : 'grid'
  const setViewMode = view => setQuery({ view })

  return (
    <Layout>
      <Flex css={theme({ pt: [2, 2, 4, 4], justifyContent: 'center' })}>
        <Flex css={{ flexDirection: 'column', alignItems: 'center' }}>
          <Heading css={{ maxWidth: layout.large }}>Blog</Heading>
          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 4, 4],
              mb: [4, 4, 5, 5],
              px: [4, 4, 0, 0],
              maxWidth: layout.small
            })}
            titleize={false}
          >
            Engineering details through Microlink.
          </Caption>
        </Flex>
      </Flex>

      <Box
        css={theme({ maxWidth: layout.large, mx: 'auto', px: [3, 3, 0, 0] })}
      >
        <Flex
          css={theme({
            pb: 4,
            justifyContent: 'flex-end',
            alignItems: 'center'
          })}
        >
          <Toggle
            defaultValue={currentView}
            onChange={setViewMode}
            css={{ width: 'auto' }}
          >
            {[
              { id: 'grid', node: <Grid size={16} /> },
              { id: 'list', node: <List size={16} /> }
            ]}
          </Toggle>
        </Flex>

        {currentView === 'grid'
          ? (
            <Box
              css={theme({
                display: 'grid',
                gridTemplateColumns: [
                  'repeat(1, 1fr)',
                  'repeat(2, 1fr)',
                  'repeat(3, 1fr)',
                  'repeat(3, 1fr)'
                ],
                gap: 4
              })}
            >
              {posts.map(post => (
                <BlogPostGrid key={post.title} {...post} />
              ))}
            </Box>
            )
          : (
            <Flex css={{ flexDirection: 'column' }}>
              {posts.map((post, index) => (
                <BlogPostList
                  key={post.title}
                  {...post}
                  isLastPost={index === posts.length - 1}
                />
              ))}
            </Flex>
            )}
      </Box>
    </Layout>
  )
}

export default PageBlog
