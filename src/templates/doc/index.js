import { getActiveRouteName } from 'components/patterns/Aside/constants'
import Markdown, { H1, ProBadge } from 'components/markdown'
import Layout from 'components/patterns/Layout'
import Aside from 'components/patterns/Aside/Aside'
import DocTabs from 'components/patterns/DocTabs/DocTabs'
import { TOOLBAR_PRIMARY_HEIGHT } from 'components/elements/Toolbar'
import { fontSizes, layout, theme } from 'theme'
import { formatDate } from 'helpers/format-date'
import React from 'react'

import Box from 'components/elements/Box'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link/base'
import Text from 'components/elements/Text'

const DocTemplate = ({
  title,
  date,
  isPro,
  meta,
  content,
  githubUrl,
  ...props
}) => {
  const activeRouteName = getActiveRouteName(props.location)

  return (
    <Layout footer={false}>
      <Box
        data-docs-navbar
        css={theme({
          position: 'fixed',
          top: TOOLBAR_PRIMARY_HEIGHT,
          left: 0,
          right: 0,
          zIndex: 2,
          background: 'white',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          display: ['none', 'none', 'none', 'block']
        })}
      >
        <Container
          css={theme({
            mx: [3, null, null, 'auto'],
            px: 0,
            pt: 0,
            maxWidth: layout.large
          })}
        >
          <DocTabs activeRouteName={activeRouteName} />
        </Container>
      </Box>
      <Container
        data-docs-container
        css={theme({
          pt: 0,
          mx: [3, null, null, 'auto'],
          px: 0,
          maxWidth: layout.large
        })}
      >
        <Aside activeRouteName={activeRouteName}>
          <Box css={theme({ mt: [0, 0, 0, 4] })} />
          <Choose>
            <Choose.When condition={!!title}>
              <Text as='header'>
                <H1
                  css={theme({
                    mt: [0, null, null, `calc(-1 * ${fontSizes[1]})`],
                    mb: 1
                  })}
                  variant={null}
                  slug={false}
                >
                  <span>{title}</span>
                  {isPro && <ProBadge css={theme({ top: '12px', ml: 2 })} />}
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
              Last updated on {formatDate(date)}
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
