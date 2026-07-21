import React from 'react'
import styled from 'styled-components'
import { borders, colors, theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { ApiErrorBody } from 'components/patterns/ApiError/ApiError'
import {
  MarkdownContentArea,
  MarkdownOverlay,
  Spinner,
  SpinnerCircle,
  WordCountBadge,
  ErrorInline,
  ErrorDismissButton,
  highlightMarkdown
} from '../shared'

const SplitPaneLabel = styled(Flex)`
  ${theme({
    px: 2,
    py: 2,
    fontSize: 1,
    fontWeight: 'bold',
    fontFamily: 'sans',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: ['wrap', 'wrap', 'nowrap', 'nowrap'],
    gap: 1,
    flexShrink: 0
  })};
`

const HtmlContentArea = styled('pre')`
  ${theme({
    m: 0,
    p: 3,
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 2,
    color: 'black80'
  })};
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
  -webkit-overflow-scrolling: touch;
`

export const CapSplitPane = ({
  capDisplayed,
  capHtmlDisplayed,
  capLoading,
  capHtmlLoading,
  capHasContentRef,
  capError,
  setCapError,
  capFmt,
  animatedCapMdWords,
  animatedCapMdTokens,
  animatedCapHtmlWords,
  animatedCapHtmlTokens
}) => (
  <Flex css={{ width: '100%', position: 'relative' }}>
    <Box
      css={theme({
        flex: 1,
        position: 'relative',
        height: ['280px', '320px', '380px', '420px'],
        overflow: 'hidden',
        borderRight: `${borders[1]} ${colors.black05}`
      })}
    >
      <SplitPaneLabel
        css={theme({
          color: 'black80',
          bg: 'white',
          borderBottom: `${borders[1]} ${colors.black05}`,
          position: 'relative',
          zIndex: 1
        })}
      >
        <Box
          css={theme({
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            bg: 'close',
            flexShrink: 0
          })}
        />
        Markdown
        {capDisplayed && (
          <WordCountBadge
            css={theme({
              fontSize: 0,
              color: 'black60',
              flexBasis: ['100%', '100%', 'auto', 'auto'],
              textAlign: 'center'
            })}
          >
            <Box
              as='span'
              css={theme({
                display: ['none', 'none', 'inline', 'inline']
              })}
            >
              ·{' '}
            </Box>
            {capFmt(animatedCapMdWords)} words · {capFmt(animatedCapMdTokens)}{' '}
            tokens
          </WordCountBadge>
        )}
      </SplitPaneLabel>
      <MarkdownContentArea
        css={theme({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          pt: 5
        })}
      >
        {highlightMarkdown(capDisplayed)}
      </MarkdownContentArea>
      {capLoading && (
        <MarkdownOverlay
          $dim={capHasContentRef.current}
          aria-label='Loading markdown'
          role='status'
        >
          <Spinner
            width='36'
            height='36'
            viewBox='0 0 50 50'
            aria-hidden='true'
          >
            <SpinnerCircle cx='25' cy='25' r='20' fill='none' strokeWidth='4' />
          </Spinner>
        </MarkdownOverlay>
      )}
    </Box>
    <Box
      css={theme({
        flex: 1,
        position: 'relative',
        height: ['280px', '320px', '380px', '420px'],
        overflow: 'hidden'
      })}
    >
      <SplitPaneLabel
        css={theme({
          color: 'black60',
          bg: 'gray0',
          borderBottom: `${borders[1]} ${colors.black05}`,
          position: 'relative',
          zIndex: 1
        })}
      >
        <Box
          css={theme({
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            bg: 'red6',
            flexShrink: 0
          })}
        />
        HTML
        {capHtmlDisplayed && (
          <WordCountBadge
            css={theme({
              fontSize: 0,
              color: 'black60',
              flexBasis: ['100%', '100%', 'auto', 'auto'],
              textAlign: 'center'
            })}
          >
            <Box
              as='span'
              css={theme({
                display: ['none', 'none', 'inline', 'inline']
              })}
            >
              ·{' '}
            </Box>
            {capFmt(animatedCapHtmlWords)} words ·{' '}
            {capFmt(animatedCapHtmlTokens)} tokens
          </WordCountBadge>
        )}
      </SplitPaneLabel>
      <HtmlContentArea
        css={theme({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          pt: 5
        })}
      >
        <code>{capHtmlDisplayed}</code>
      </HtmlContentArea>
      {capHtmlLoading && (
        <MarkdownOverlay
          $dim={!!capHtmlDisplayed}
          aria-label='Loading HTML'
          role='status'
        >
          <Spinner
            width='36'
            height='36'
            viewBox='0 0 50 50'
            aria-hidden='true'
          >
            <SpinnerCircle cx='25' cy='25' r='20' fill='none' strokeWidth='4' />
          </Spinner>
        </MarkdownOverlay>
      )}
    </Box>
    {capError && (
      <ErrorInline
        role='alert'
        aria-label='Error'
        css={theme({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2
        })}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          aria-hidden='true'
        >
          <circle
            cx='10'
            cy='10'
            r='9'
            stroke={colors.red5}
            strokeWidth='1.5'
          />
          <path
            d='M10 6v4M10 13v.5'
            stroke={colors.red5}
            strokeWidth='1.5'
            strokeLinecap='round'
          />
        </svg>
        <Text
          as='p'
          css={theme({
            fontFamily: 'sans',
            color: 'black60',
            fontSize: 1,
            lineHeight: 2,
            m: 0,
            pt: 2,
            textAlign: 'center',
            maxWidth: '300px'
          })}
        >
          <ApiErrorBody code={capError.code} fallback={capError.message} />
        </Text>
        <ErrorDismissButton
          type='button'
          aria-label='Dismiss error'
          onClick={() => setCapError(null)}
        >
          Dismiss
        </ErrorDismissButton>
      </ErrorInline>
    )}
  </Flex>
)
