import Choose from 'components/elements/Choose'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'
import { PostFooter } from 'components/pages/blog/post-footer'
import { PostTitle } from 'components/pages/blog/post-title'
import { PostAuthor } from 'components/pages/blog/post-author'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import Markdown, { H1, H2 } from 'components/markdown'
import { textGradient, layout, theme } from 'theme'
import { formatDate } from 'helpers/format-date'
import { title as titleize } from 'helpers/title'
import TimeAgo from 'react-timeago'
import React from 'react'
import { fontSize } from 'styled-system'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

const PageTemplate = ({
  isBlogPage,
  date,
  title,
  subtitle,
  authors,
  content,
  lastEdited
}) => {
  const authorList = Array.isArray(authors) ? authors : []
  return (
    <Layout>
      <Text
        as='header'
        css={theme({
          textAlign: 'center',
          maxWidth: layout.normal,
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
                css={theme({
                  ...textGradient,
                  textAlign: 'center',
                  mt: 0,
                  mb: subtitle ? 1 : undefined
                })}
              >
                <PostTitle>{title}</PostTitle>
              </H1>
              {subtitle && (
                <H2
                  css={theme({
                    textAlign: 'center',
                    mt: 0
                  })}
                >
                  <PostTitle>{titleize(subtitle)}</PostTitle>
                </H2>
              )}
              <PostAuthor authorIds={authorList} />
              <Caption
                forwardedAs='p'
                css={theme({
                  color: 'black60',
                  fontSize: 2
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
                {title}
              </Heading>
              {lastEdited && (
                <Caption
                  forwardedAs='p'
                  css={theme({ fontSize: 2, pt: 4, color: 'black60' })}
                >
                  Last updated on {formatDate(lastEdited)}
                </Caption>
              )}
            </Choose.Otherwise>
          </Choose>
        </Flex>
      </Text>

      <Box css={theme({ pt: [3, null, 4] })}>
        <Markdown isBlogPage>{content}</Markdown>
      </Box>

      {isBlogPage && (
        <Markdown isBlogPage={isBlogPage}>
          <PostFooter />
        </Markdown>
      )}
    </Layout>
  )
}

export default PageTemplate
