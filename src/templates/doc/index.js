import { getActiveRouteName } from 'components/patterns/Aside/constants'
import Markdown, { H1, ProBadge } from 'components/markdown'
import { Layout, Aside } from 'components/patterns'
import { fontSizes, layout, theme } from 'theme'
import { formatDate } from 'helpers'
import React from 'react'

import { Box, Choose, Container, Flex, Link, Text } from 'components/elements'

const DocTemplate = ({ meta, content, githubUrl, ...props }) => {
  const activeRouteName = getActiveRouteName(props.location)

  return (
    <Layout footer={false}>
      <Container
        css={theme({
          pt: [0, null, null, 4],
          mx: [3, null, null, 'auto'],
          px: 0,
          maxWidth: layout.large
        })}
      >
        <Aside activeRouteName={activeRouteName}>
          <Choose>
            <Choose.When condition={!!meta.title}>
              <Text as='header'>
                <H1
                  css={theme({
                    mt: [0, null, null, `calc(-1 * ${fontSizes[2]})`],
                    mb: 1
                  })}
                  variant={null}
                  slug={false}
                >
                  <span>{meta.title}</span>
                  {meta.isPro && (
                    <ProBadge css={theme({ top: '12px', ml: 2 })} />
                  )}
                </H1>
              </Text>
            </Choose.When>
            <Choose.Otherwise>
              <Box css={theme({ mt: 4 })} />
            </Choose.Otherwise>
          </Choose>
          <Markdown>{content}</Markdown>
          <Flex
            as='footer'
            css={theme({
              borderTop: 1,
              borderColor: 'black05',
              justifyContent: 'space-between',
              my: 4,
              pt: 4
            })}
          >
            <Text css={theme({ color: 'gray', fontSize: 0 })}>
              Last edited on {formatDate(meta.date)}
            </Text>
            <Link href={githubUrl} css={theme({ fontSize: 0 })}>
              Edit on GitHub
            </Link>
          </Flex>
        </Aside>
      </Container>
    </Layout>
  )
}

export default DocTemplate
