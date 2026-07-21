import React from 'react'
import styled, { keyframes } from 'styled-components'
import { colors, theme } from 'theme'
import Box from 'components/elements/Box'
import PdfViewer from 'components/elements/PdfViewer/PdfViewer'
import { rotate, dash } from 'components/keyframes'
import { ErrorModal } from './error-modal'

const shimmer = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

const PdfOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })};
  background: ${colors.gray0};
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${colors.white80} 50%,
      transparent 100%
    );
    animation: ${shimmer} 1.8s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`

const SkeletonLines = styled('div')`
  ${theme({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    px: 4,
    py: 4
  })};
  inset: 0;
  pointer-events: none;
`

const SkeletonLine = styled('div')`
  height: ${({ $h }) => $h || '12px'};
  width: ${({ $w }) => $w || '100%'};
  background: ${colors.black05};
  border-radius: 6px;
`

const Spinner = styled('svg')`
  animation: ${rotate} 1.4s linear infinite;
  z-index: 1;
`

const SpinnerCircle = styled('circle')`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke: ${colors.black40};
  stroke-linecap: round;
`

export const Viewport = ({
  pdfSrc,
  imgKeyRef,
  setIsLoading,
  isLoading,
  error,
  setError
}) => (
  <Box
    css={[
      theme({
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        zIndex: 1,
        bg: 'gray0'
      }),
      {
        aspectRatio: '16/10',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'thin',
        scrollbarColor: `${colors.black20} transparent`,
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
          background: colors.black20,
          borderRadius: '3px'
        }
      }
    ]}
  >
    {pdfSrc && (
      <PdfViewer
        key={imgKeyRef.current}
        src={pdfSrc}
        showToolbar={false}
        onLoad={() => {
          setIsLoading(false)
        }}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    )}
    {isLoading && (
      <PdfOverlay aria-label='Generating PDF…' role='status'>
        <SkeletonLines aria-hidden='true'>
          <SkeletonLine $w='55%' $h='18px' />
          <SkeletonLine $w='90%' />
          <SkeletonLine $w='80%' />
          <SkeletonLine $w='85%' />
          <SkeletonLine $w='40%' />
          <Box css={theme({ height: '12px' })} />
          <SkeletonLine $w='45%' $h='16px' />
          <SkeletonLine $w='95%' />
          <SkeletonLine $w='70%' />
          <SkeletonLine $w='88%' />
          <SkeletonLine $w='60%' />
          <Box css={theme({ height: '12px' })} />
          <SkeletonLine $w='50%' $h='16px' />
          <SkeletonLine $w='82%' />
          <SkeletonLine $w='75%' />
          <SkeletonLine $w='90%' />
          <SkeletonLine $w='35%' />
        </SkeletonLines>
        <Spinner width='36' height='36' viewBox='0 0 50 50' aria-hidden='true'>
          <SpinnerCircle cx='25' cy='25' r='20' fill='none' strokeWidth='4' />
        </Spinner>
      </PdfOverlay>
    )}
    {error && <ErrorModal error={error} setError={setError} />}
  </Box>
)
