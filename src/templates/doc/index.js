import { getActiveRouteName } from 'components/patterns/Aside/constants'
import Markdown, { H1 } from 'components/markdown'
import ProBadge from 'components/patterns/ProBadge/ProBadge'
import DocTabs from 'components/patterns/DocTabs/DocTabs'
import Container from 'components/elements/Container'
import { Link } from 'components/elements/Link'
import Aside from 'components/patterns/Aside/Aside'
import { formatDate } from 'helpers/format-date'
import Layout from 'components/patterns/Layout'
import Choose from 'components/elements/Choose'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'
import { layout, theme } from 'theme'
import React from 'react'

import { TOOLBAR_PRIMARY_HEIGHT } from 'components/elements/Toolbar'

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
          display: ['none', 'block']
        })}
      >
        <Container
          css={theme({
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
          px: 0,
          maxWidth: layout.large
        })}
      >
        <Aside activeRouteName={activeRouteName}>
          <Box css={theme({ mt: [0, 4, 4, 4] })} />
          <Choose>
            <Choose.When condition={!!title}>
              <H1
                css={theme({
                  mt: 3,
                  mb: 1
                })}
                variant={null}
                slug={false}
              >
                <span>{title}</span>
                {isPro && <ProBadge css={theme({ top: '12px', ml: 2 })} />}
              </H1>
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
