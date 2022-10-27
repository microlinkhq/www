import { Choose, Flex, Heading, Text, Box } from 'components/elements'
import { PostFooter, PostTitle } from 'components/pages/blog'
import { Caption, Layout } from 'components/patterns'
import Markdown, { H1 } from 'components/markdown'
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
        <Flex
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
        >
          <Choose>
            <Choose.When condition={isBlogPage}>
              <H1 textAlign='center' mt={0} css={textGradient}>
                <PostTitle>{meta.title}</PostTitle>
              </H1>
              <Caption
                as='h2'
                color='black60'
                textAlign={['center', 'inherit']}
              >
                {formatDate(date)} (<TimeAgo date={date} />)
              </Caption>
            </Choose.When>
            <Choose.Otherwise>
              <Heading mt={0} titleize={false} maxWidth={layout.large}>
                <PostTitle>{meta.title}</PostTitle>
              </Heading>
            </Choose.Otherwise>
          </Choose>
        </Flex>
      </Text>

      <Box pt={[3, 3, 4, 4]}>
        <Markdown>{content}</Markdown>
      </Box>

      {isBlogPage && <PostFooter />}
    </Box>
  </Layout>
)

export default PageTemplate
