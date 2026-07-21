/* global fetch */

import { trackEvent } from 'helpers/plausible'
import { colors, theme, transition } from 'theme'
import React from 'react'
import { Check, Clipboard, Download, ExternalLink, Loader } from 'react-feather'
import styled, { keyframes } from 'styled-components'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import DotSpinner from 'components/elements/DotSpinner'
import Flex from 'components/elements/Flex'
import Spinner from 'components/elements/Spinner'
import Text from 'components/elements/Text'

import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { getErrorMeta } from 'helpers/api-error'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

import NerdStatsOverlay, {
  NerdStatsToggle
} from 'components/patterns/NerdStats/NerdStats'

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

export const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const SpinningLoader = styled(Loader)`
  animation: ${spinAnimation} 1s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const ViewportCard = styled(Box)`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.04);
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
`

export const SkeletonPulse = styled(Box)`
  background: linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 40%, #e2e8f0 80%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: #e2e8f0;
  }
`

export const FadeIn = styled(Box)`
  animation: ${fadeIn} 400ms cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const ActionButton = styled(Flex).attrs({ as: 'a' })`
  ${theme({
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    py: '10px',
    px: 3,
    borderRadius: 2,
    fontSize: 1,
    fontWeight: 'bold',
    cursor: 'pointer',
    flex: 1,
    textAlign: 'center'
  })}
  text-decoration: none;
  transition: background ${transition.medium}, box-shadow ${transition.medium},
    transform ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

export const downloadFile = async (fileUrl, filename) => {
  try {
    const response = await fetch(fileUrl)
    if (!response.ok) throw new Error(response.statusText)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename || 'screenshot.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(blobUrl)
  } catch {
    window.open(fileUrl, '_blank', 'noopener,noreferrer')
  }
}

export const PreviewLoadingState = ({
  imageUrl,
  isLoading,
  loadingText,
  maxWidth,
  maxHeight,
  setImagePainted
}) => (
  <FadeIn
    key='loading'
    css={theme({
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    })}
  >
    <Box
      css={theme({
        p: [3],
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      })}
    >
      {imageUrl && !isLoading && (
        <img
          src={imageUrl}
          alt=''
          aria-hidden
          onLoad={() => setImagePainted(true)}
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
            width: 0,
            height: 0
          }}
        />
      )}
      <ViewportCard
        style={{
          maxWidth: `${maxWidth}px`,
          maxHeight: `${maxHeight}px`
        }}
      >
        <SkeletonPulse
          role='progressbar'
          aria-label={isLoading ? loadingText : 'Loading image'}
          style={{
            width: '100%',
            height: `${maxHeight}px`
          }}
        />
      </ViewportCard>
    </Box>
    <Flex
      css={theme({
        p: 3,
        gap: 2,
        borderTop: 1,
        borderColor: 'black05',
        bg: 'white',
        justifyContent: 'center',
        alignItems: 'center'
      })}
      aria-live='polite'
      aria-label={isLoading ? loadingText : 'Loading image'}
    >
      <Spinner width='20px' height='14px' />
      <Text
        css={theme({
          color: 'black50',
          fontSize: 1,
          fontFamily: 'sans'
        })}
      >
        {isLoading ? loadingText : 'Loading image'}
        <DotSpinner />
      </Text>
    </Flex>
  </FadeIn>
)

export const PreviewErrorState = ({ error, onRetry }) => (
  <FadeIn
    key='error'
    css={theme({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: ['380px', '380px', '520px'],
      px: 4,
      textAlign: 'center'
    })}
  >
    <Text css={theme({ color: 'fullscreen', fontSize: 3, pb: 3 })}>
      <ApiErrorTitle code={error?.code} />
      <Text css={theme({ fontSize: 2, color: 'black60', pt: 2 })}>
        <ApiErrorBody
          code={error?.code}
          fallback={error?.message || 'Something went wrong. Please try again.'}
        />
      </Text>
    </Text>
    {getErrorMeta(error?.code).showRetry && (
      <Button onClick={onRetry}>
        <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
      </Button>
    )}
  </FadeIn>
)

export const PreviewResultState = ({
  scrollAreaRef,
  showNerdStats,
  nerdStats,
  mqlQuery,
  responseData,
  isPreviewTooBig,
  setIsPreviewTooBig,
  maxWidth,
  containerHeight,
  url,
  imageUrl,
  trackingVariant,
  downloaded,
  setDownloaded,
  copied,
  setCopied,
  toClipboard,
  onToggleNerdStats
}) => (
  <FadeIn
    key='result'
    css={theme({
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    })}
  >
    <Box
      ref={scrollAreaRef}
      css={theme({
        p: [3],
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: `${containerHeight}px`,
        maxHeight: ['60vh', '750px', '750px'],
        WebkitOverflowScrolling: 'touch',
        position: 'relative'
      })}
    >
      {showNerdStats && nerdStats && (
        <NerdStatsOverlay
          stats={nerdStats}
          mqlQuery={mqlQuery}
          responseData={responseData}
        />
      )}
      {isPreviewTooBig && (
        <Flex
          css={theme({
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%'
          })}
        >
          <ViewportCard
            as='section'
            aria-live='polite'
            aria-label='Screenshot preview notice'
            style={{ maxWidth: `${maxWidth}px` }}
          >
            <Flex
              css={theme({
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: [4, 5],
                textAlign: 'center',
                bg: 'gray0'
              })}
            >
              <Box
                css={theme({
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3
                })}
                style={{
                  background: colors.black025
                }}
              >
                <ExternalLink size={26} color={colors.link} />
              </Box>
              <Text
                role='status'
                css={theme({
                  fontSize: 2,
                  fontWeight: 'bold',
                  color: 'black80',
                  fontFamily: 'sans'
                })}
              >
                This screenshot is too large to preview here.
              </Text>
              <Text
                css={theme({
                  pt: 2,
                  fontSize: 1,
                  color: 'black60',
                  maxWidth: '420px',
                  fontFamily: 'sans'
                })}
              >
                You can still download the full image or open it in a new
                browser tab using the options below.
              </Text>
            </Flex>
          </ViewportCard>
        </Flex>
      )}
      {!isPreviewTooBig && (
        <ViewportCard style={{ maxWidth: `${maxWidth}px` }}>
          <img
            alt={`Screenshot of ${url}`}
            src={imageUrl}
            loading='lazy'
            decoding='async'
            onError={() => setIsPreviewTooBig(true)}
            style={{
              width: '100%',
              maxWidth: '100%',
              display: 'block',
              objectFit: 'contain',
              imageRendering: '-webkit-optimize-contrast'
            }}
          />
        </ViewportCard>
      )}
    </Box>

    <Flex
      css={theme({
        p: 3,
        gap: 2,
        borderTop: 1,
        borderColor: 'black05',
        bg: 'white',
        flexWrap: 'wrap'
      })}
    >
      <ActionButton
        role='button'
        tabIndex={0}
        onClick={e => {
          e.preventDefault()
          trackEvent('screenshot download', {
            variant: trackingVariant
          })
          downloadFile(imageUrl, `screenshot-${Date.now()}.png`)
          setDownloaded(true)
          setTimeout(() => setDownloaded(false), 1500)
        }}
        css={theme({
          bg: 'black',
          color: 'white',
          _hover: { bg: 'black80' }
        })}
      >
        {downloaded ? <SpinningLoader size={15} /> : <Download size={15} />}
        <Caps css={theme({ fontSize: 0 })}>
          {downloaded ? 'Saving' : 'Download'}
        </Caps>
      </ActionButton>

      <ActionButton
        as='button'
        type='button'
        onClick={() => {
          trackEvent('screenshot copy url', {
            variant: trackingVariant
          })
          toClipboard({
            copy: imageUrl,
            text: Tooltip.TEXT.COPIED('URL')
          })
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
        css={theme({
          bg: 'white',
          color: 'black80',
          border: 1,
          borderColor: 'black10',
          width: '100%',
          _hover: { bg: 'gray1', borderColor: 'black20' }
        })}
      >
        {copied ? <Check size={15} /> : <Clipboard size={15} />}
        <Caps css={theme({ fontSize: 0 })}>
          {copied ? 'Copied' : 'Copy URL'}
        </Caps>
      </ActionButton>

      <ActionButton
        href={imageUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Open screenshot in new tab'
        css={theme({
          bg: 'white',
          color: 'black80',
          border: 1,
          borderColor: 'black10',
          _hover: { bg: 'gray1', borderColor: 'black20' }
        })}
      >
        <ExternalLink size={15} />
        <Caps css={theme({ fontSize: 0 })}>Open</Caps>
      </ActionButton>

      {nerdStats && (
        <NerdStatsToggle active={showNerdStats} onClick={onToggleNerdStats} />
      )}
    </Flex>
  </FadeIn>
)
