import React from 'react'
import { colors, theme } from 'theme'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { ApiErrorBody } from 'components/patterns/ApiError/ApiError'
import NerdStatsOverlay from 'components/patterns/NerdStats/NerdStats'
import {
  MarkdownContentArea,
  MarkdownOverlay,
  Spinner,
  SpinnerCircle,
  ErrorInline,
  ErrorDismissButton,
  highlightMarkdown
} from '../shared'

export const Viewport = ({
  displayedContent,
  isLoading,
  hasContentRef,
  showNerdStats,
  nerdStats,
  nerdQuery,
  nerdResponse,
  error,
  setError
}) => (
  <Box
    css={theme({
      position: 'relative',
      height: ['240px', '280px', '320px', '360px'],
      overflow: 'hidden'
    })}
  >
    <MarkdownContentArea
      css={theme({
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%'
      })}
    >
      {highlightMarkdown(displayedContent)}
    </MarkdownContentArea>
    {isLoading && (
      <MarkdownOverlay
        $dim={hasContentRef.current}
        aria-label='Loading markdown'
        role='status'
      >
        <Spinner width='36' height='36' viewBox='0 0 50 50' aria-hidden='true'>
          <SpinnerCircle cx='25' cy='25' r='20' fill='none' strokeWidth='4' />
        </Spinner>
      </MarkdownOverlay>
    )}
    {showNerdStats && nerdStats && (
      <NerdStatsOverlay
        stats={nerdStats}
        mqlQuery={nerdQuery}
        responseData={nerdResponse}
      />
    )}
    {error && (
      <ErrorInline role='alert' aria-label='Error'>
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
          <ApiErrorBody code={error.code} fallback={error.message} />
        </Text>
        <ErrorDismissButton
          type='button'
          aria-label='Dismiss error'
          onClick={() => setError(null)}
        >
          Dismiss
        </ErrorDismissButton>
      </ErrorInline>
    )}
  </Box>
)
