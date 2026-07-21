import React from 'react'
import styled from 'styled-components'
import {
  borders,
  colors,
  fontSizes,
  radii,
  space,
  theme,
  transition
} from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import NerdStatsOverlay from 'components/patterns/NerdStats/NerdStats'
import { rotate, dash } from 'components/keyframes'

const ScreenshotOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })};
  background: ${({ $dim }) => ($dim ? colors.black60 : 'transparent')};
  pointer-events: none;
`

const Spinner = styled('svg')`
  animation: ${rotate} 1.4s linear infinite;
`

const SpinnerCircle = styled('circle')`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke: ${colors.white90};
  stroke-linecap: round;
`

const ErrorModalOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })};
  background: ${colors.black60};
  backdrop-filter: blur(${space[1]});
  z-index: 2;
`

const ErrorModalWindow = styled('div')`
  ${theme({ bg: 'black95', borderRadius: 4 })};
  border: ${borders[1]} ${colors.red7};
  width: 340px;
  box-shadow: 0 24px 64px ${colors.black80}, 0 4px 16px ${colors.black40};
  overflow: hidden;
`

const ErrorModalHeader = styled('div')`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  })};
  padding: ${space[3]} ${space[3]} ${space[2]};
  border-bottom: ${borders[1]} ${colors.white05};
`

const ErrorModalBody = styled('div')`
  ${theme({ p: 3 })};
`

const ErrorCloseButton = styled('button')`
  ${theme({
    bg: 'white10',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white50',
    flexShrink: 0,
    lineHeight: 0,
    fontSize: 0
  })};
  border: none;
  width: ${fontSizes[2]};
  height: ${fontSizes[2]};
  cursor: pointer;
  transition: background ${transition.short}, color ${transition.short};

  &:hover {
    background: ${colors.white20};
    color: ${colors.white90};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.white30};
    outline-offset: ${radii[1]};
  }
`

export const Viewport = ({
  alt,
  imgKey,
  screenshotSrc,
  imgVisible,
  setImgVisible,
  isLoading,
  setIsLoading,
  hasImageRef,
  imageLoadResolverRef,
  showNerdStats,
  nerdStats,
  nerdQuery,
  nerdResponse,
  error,
  setError,
  errorModalRef
}) => (
  <Box
    css={theme({
      position: 'relative',
      aspectRatio: '16/10',
      overflow: 'hidden'
    })}
  >
    <img
      key={imgKey}
      src={screenshotSrc}
      alt={alt}
      decoding='async'
      loading='eager'
      fetchpriority='high'
      onLoad={() => {
        hasImageRef.current = true
        setImgVisible(true)
        setIsLoading(false)
        if (imageLoadResolverRef.current) {
          imageLoadResolverRef.current()
          imageLoadResolverRef.current = null
        }
      }}
      onError={() => {
        setIsLoading(false)
        if (imageLoadResolverRef.current) {
          imageLoadResolverRef.current()
          imageLoadResolverRef.current = null
        }
      }}
      css={[
        theme({
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }),
        {
          filter: imgVisible ? 'blur(0px)' : 'blur(6px)',
          transition: 'filter 0.5s ease'
        }
      ]}
    />
    {isLoading && (
      <ScreenshotOverlay
        $dim={hasImageRef.current}
        aria-label='Loading screenshot'
        role='status'
      >
        <Spinner width='36' height='36' viewBox='0 0 50 50' aria-hidden='true'>
          <SpinnerCircle cx='25' cy='25' r='20' fill='none' strokeWidth='4' />
        </Spinner>
      </ScreenshotOverlay>
    )}
    {showNerdStats && nerdStats && (
      <NerdStatsOverlay
        stats={nerdStats}
        mqlQuery={nerdQuery}
        responseData={nerdResponse}
      />
    )}
    {error && (
      <ErrorModalOverlay
        role='dialog'
        aria-modal='true'
        aria-label='Error'
        onClick={e => {
          if (e.target === e.currentTarget) setError(null)
        }}
      >
        <ErrorModalWindow ref={errorModalRef} tabIndex={-1}>
          <ErrorModalHeader>
            <Flex css={theme({ alignItems: 'center', gap: 2 })}>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                aria-hidden='true'
              >
                <circle
                  cx='8'
                  cy='8'
                  r='7'
                  stroke={colors.red6}
                  strokeWidth='1.5'
                />
                <path
                  d='M8 5v3M8 10.5v.5'
                  stroke={colors.red5}
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
              <Text
                as='span'
                css={theme({
                  color: 'red5',
                  fontSize: 0,
                  fontWeight: 'bold',
                  letterSpacing: 0
                })}
              >
                <ApiErrorTitle code={error.code} />
              </Text>
            </Flex>
            <ErrorCloseButton
              type='button'
              aria-label='Dismiss error'
              onClick={() => setError(null)}
            >
              ×
            </ErrorCloseButton>
          </ErrorModalHeader>
          <ErrorModalBody>
            <Text
              as='p'
              css={theme({
                color: 'white90',
                fontSize: 1,
                lineHeight: 2,
                m: 0
              })}
            >
              <ApiErrorBody code={error.code} fallback={error.message} />
            </Text>
          </ErrorModalBody>
        </ErrorModalWindow>
      </ErrorModalOverlay>
    )}
  </Box>
)
