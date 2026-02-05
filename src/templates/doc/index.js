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

import { Markdown as MarkdownIcon } from 'components/icons/Markdown'
import { Clipboard as ClipboardIcon } from 'components/icons/Clipboard'

import { TOOLBAR_PRIMARY_HEIGHT } from 'components/elements/Toolbar'

const COPY = 'Copy for LLM'
const COPIED = 'Copied to LLM'

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
  const pathname = props.location?.pathname || ''
  const mdUrl = `${pathname.replace(/\/+$/, '')}.md`
  const [copyLabel, setCopyLabel] = React.useState(COPY)
  const copyTimeoutRef = React.useRef(null)

  const handleCopyForLlm = async event => {
    event.preventDefault()
    try {
      const response = await window.fetch(mdUrl)
      if (!response.ok) throw new Error('Failed to fetch markdown')
      const text = await response.text()
      await navigator.clipboard.writeText(text)
      setCopyLabel(COPIED)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = setTimeout(() => {
        setCopyLabel(COPY)
      }, 1000)
    } catch (error) {
      // Best-effort copy: fail silently to avoid breaking the page
    }
  }

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
              <Flex
                data-exclude-from-llms
                css={theme({ alignItems: 'center', fontSize: 1, gap: 2 })}
              >
                <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                  <ClipboardIcon css={theme({ color: 'gray8' })} />
                  <Link
                    href={mdUrl}
                    externalIcon={false}
                    title='Copy content for LLM'
                    onClick={handleCopyForLlm}
                  >
                    {copyLabel}
                  </Link>
                </Flex>
                <Text as='span' css={theme({ color: 'gray5' })}>
                  |
                </Text>
                <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                  <MarkdownIcon css={theme({ color: 'gray8' })} />
                  <Link
                    href={mdUrl}
                    css={theme({ fontSize: 1 })}
                    title='View content as Markdown'
                    prefetch={false}
                    isInternal={false}
                  >
                    View as Markdown
                  </Link>
                </Flex>
              </Flex>
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
