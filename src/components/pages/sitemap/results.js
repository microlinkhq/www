import React from 'react'
import { ArrowUpRight, Clipboard, Download } from 'react-feather'
import styled from 'styled-components'
import { theme, layout, touchTargets } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import { Link } from 'components/elements/Link'
import { useClipboard } from 'components/hook/use-clipboard'

const LIST_MAX_HEIGHT = 44 * 12

const UrlList = ({ urls }) => (
  <Box
    as='ul'
    css={theme({
      listStyle: 'none',
      m: 0,
      p: 0,
      maxHeight: `${LIST_MAX_HEIGHT}px`,
      overflowY: 'auto',
      overscrollBehavior: 'contain'
    })}
  >
    {urls.map(url => (
      <UrlRow key={url} url={url} />
    ))}
  </Box>
)

const UrlRowItem = styled(Box)`
  a::after {
    content: '';
    position: absolute;
    inset: 0;
  }
`

const UrlRow = ({ url }) => (
  <UrlRowItem
    as='li'
    css={theme({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: touchTargets.minHeight,
      px: 3,
      borderBottom: 1,
      borderBottomColor: 'black05',
      position: 'relative',
      minWidth: 0,
      _hover: { bg: 'gray1' }
    })}
  >
    <Link
      href={url}
      externalIcon={false}
      css={theme({
        fontFamily: 'mono',
        fontSize: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minWidth: 0,
        pr: 2
      })}
    >
      {url}
    </Link>
    <Box
      as='span'
      aria-hidden
      css={theme({
        color: 'black40',
        flexShrink: 0,
        display: 'flex'
      })}
    >
      <ArrowUpRight size={16} />
    </Box>
  </UrlRowItem>
)

const downloadTxt = urls => {
  const blob = new Blob([urls.join('\n')], { type: 'text/plain' })
  const href = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = href
  anchor.download = 'sitemap-urls.txt'
  anchor.click()
  URL.revokeObjectURL(href)
}

const ActionButton = ({ children, ...props }) => (
  <Button type='button' variant='white' {...props}>
    <Flex as='span' css={theme({ alignItems: 'center' })}>
      {children}
    </Flex>
  </Button>
)

export const Results = ({ urls }) => {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const countLabel = new Intl.NumberFormat().format(urls.length)

  if (urls.length === 0) {
    return (
      <Text
        as='p'
        aria-live='polite'
        css={theme({
          mt: 4,
          fontSize: 1,
          color: 'black80',
          textAlign: 'center'
        })}
      >
        No Sitemap: lines in robots.txt — nothing to list.
      </Text>
    )
  }

  return (
    <Box
      css={theme({ mt: 4, width: '100%', maxWidth: layout.normal, mx: 'auto' })}
    >
      <ClipboardComponent />
      <Flex
        css={theme({
          alignItems: ['flex-start', 'center'],
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
          flexWrap: 'wrap',
          px: [2, 0]
        })}
      >
        <Box css={theme({ minWidth: 0 })}>
          <Text
            css={theme({
              fontWeight: 'bold',
              fontVariantNumeric: 'tabular-nums'
            })}
          >
            {countLabel} {urls.length === 1 ? 'URL' : 'URLs'}
          </Text>
          <Text css={theme({ fontSize: 1, color: 'black60', mt: 1 })}>
            Found from sitemap.xml and related files.
          </Text>
        </Box>
        <Flex css={theme({ gap: 2, flexShrink: 0 })}>
          <ActionButton
            onClick={() => {
              toClipboard({
                copy: urls.join('\n'),
                text: 'URLs copied'
              })
            }}
          >
            <Box
              as='span'
              aria-hidden
              css={theme({ display: 'inline-flex', mr: 2, lineHeight: 0 })}
            >
              <Clipboard size={14} />
            </Box>
            <Caps css={theme({ fontSize: 0 })}>Copy all</Caps>
          </ActionButton>
          <ActionButton onClick={() => downloadTxt(urls)}>
            <Box
              as='span'
              aria-hidden
              css={theme({ display: 'inline-flex', mr: 2, lineHeight: 0 })}
            >
              <Download size={14} />
            </Box>
            <Caps css={theme({ fontSize: 0 })}>Download</Caps>
          </ActionButton>
        </Flex>
      </Flex>
      <Box
        css={theme({
          border: 1,
          borderColor: 'black10',
          borderRadius: 3,
          overflow: 'hidden',
          bg: 'white'
        })}
      >
        <UrlList urls={urls} />
      </Box>
    </Box>
  )
}
