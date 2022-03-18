import { PostFooter, PostTitle } from 'components/pages/blog'
import { Caption, Layout } from 'components/patterns'
import Markdown, { H1 } from 'components/markdown'
import { Text, Box } from 'components/elements'
import { textGradient, layout } from 'theme'
import { formatDate } from 'helpers'
import TimeAgo from 'react-timeago'
import React from 'react'

const PageTemplate = ({ isBlogPage, date, meta, content }) => (
  <Layout {...meta}>
    <Box px={3}>
      <Text
        as='header'
        textAlign='center'
        maxWidth={isBlogPage ? layout.normal : 'none'}
        ml='auto'
        mr='auto'
      >
        <H1 textAlign='center' mt={0}>
          <PostTitle css={textGradient}>{meta.title}</PostTitle>
        </H1>
        {isBlogPage && (
          <Caption
            fontWeight='regular'
            color='black60'
            textAlign={['center', 'inherit']}
          >
            {formatDate(date)} (<TimeAgo date={date} />)
          </Caption>
        )}
      </Text>

      <Box pt={isBlogPage ? [3, 3, 4, 4] : undefined}>
        <Markdown>{content}</Markdown>
      </Box>

      {isBlogPage && <PostFooter />}
    </Box>
  </Layout>
)

export default PageTemplate
