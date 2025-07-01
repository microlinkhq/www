import { Choose, Flex, Heading, Text, Box } from 'components/elements'
import { PostFooter, PostTitle } from 'components/pages/blog'
import { Caption, Layout } from 'components/patterns'
import Markdown, { H1 } from 'components/markdown'
import { textGradient, layout, theme } from 'theme'
import { formatDate } from 'helpers/format-date'
import TimeAgo from 'react-timeago'
import React from 'react'

const PageTemplate = ({ isBlogPage, date, title, content, lastEdited }) => {
  return (
    <Layout>
      <Box css={theme({ px: 3 })}>
        <Text
          as='header'
          css={theme({
            textAlign: 'center',
            maxWidth: isBlogPage ? layout.normal : 'none',
            mx: 'auto'
          })}
        >
          <Flex
            css={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Choose>
              <Choose.When condition={isBlogPage}>
                <H1
                  css={{ ...textGradient, textAlign: 'center', marginTop: 0 }}
                >
                  <PostTitle>{title}</PostTitle>
                </H1>
                <Caption
                  forwardedAs='h2'
                  css={theme({
                    color: 'black60',
                    textAlign: ['center', 'inherit']
                  })}
                >
                  {formatDate(date)} (<TimeAgo date={date} />)
                </Caption>
              </Choose.When>
              <Choose.Otherwise>
                <Heading
                  css={{ marginTop: 0, maxWidth: layout.large }}
                  titleize={false}
                >
                  <PostTitle>{title}</PostTitle>
                </Heading>
                {lastEdited && (
                  <Caption forwardedAs='h2' css={theme({ fontSize: 2, pt: 4 })}>
                    Last updated on {formatDate(new Date(lastEdited))}
                  </Caption>
                )}
              </Choose.Otherwise>
            </Choose>
          </Flex>
        </Text>

        <Box css={theme({ pt: [3, null, 4] })}>
          <Markdown>{content}</Markdown>
        </Box>

        {isBlogPage && <PostFooter />}
      </Box>
    </Layout>
  )
}

export default PageTemplate
