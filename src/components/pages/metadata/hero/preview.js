import React from 'react'
import styled, { keyframes } from 'styled-components'
import { borders, breakpoints, colors, space, theme, transition } from 'theme'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Hide from 'components/elements/Hide'
import { rotate, dash } from 'components/keyframes'
import { JsonPreview } from './json-viewer'

const shimmer = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

const MetaOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: [`-${space[2]}`, `-${space[3]}`, `-${space[3]}`, `-${space[3]}`],
    bottom: 0,
    left: [`-${space[3]}`, `-${space[4]}`, `-${space[4]}`, `-${space[4]}`],
    right: [`-${space[3]}`, `-${space[4]}`, 0, 0]
  })};
  background: ${({ $dim }) => ($dim ? colors.black10 : colors.gray0)};
  pointer-events: none;
  overflow: hidden;
  transition: background ${transition.medium};

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
    opacity: ${({ $dim }) => ($dim ? 0 : 1)};

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

const HeroPreviewWrapper = styled(Box)`
  ${theme({
    position: 'relative',
    bg: 'gray0',
    px: [3, 4, 4, 4],
    pt: [2, 3, 3, 3],
    pb: 0,
    zIndex: 1
  })};
  aspect-ratio: 16/10;
  overflow: hidden;
`

const JsonScroll = styled(Box)`
  ${theme({ width: '100%', height: '100%' })};
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${colors.black20} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.black20};
    border-radius: 3px;
  }
`

const JSON_KEYS = [
  'title',
  'description',
  'lang',
  'author',
  'publisher',
  'date',
  'url',
  'image',
  'logo',
  'video',
  'audio'
]

const JsonKeyList = styled('ul')`
  ${theme({
    m: 0,
    p: 0,
    display: 'grid',
    gridTemplateColumns: [
      'repeat(3, minmax(0, 1fr))',
      'repeat(6, minmax(0, 1fr))',
      '1fr',
      '1fr'
    ],
    gap: 2,
    fontFamily: 'mono',
    fontSize: 0
  })};
  list-style: none;
`

const JsonKeyItem = styled('li')`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: 'black70',
    minWidth: 0
  })};
`

const KeyDot = styled('span')`
  ${theme({ width: '8px', height: '8px', borderRadius: '50%' })};
  background: ${({ $present }) => ($present ? colors.green7 : colors.black20)};
  flex-shrink: 0;
`

const DetectedColumn = styled(Box)`
  ${theme({
    width: ['100%', '100%', '160px', '160px'],
    flexShrink: 0,
    order: [1, 1, 2, 2],
    pl: [0, 0, 3, 3],
    pb: [3, 3, 0, 0]
  })};
  display: none;
  border-bottom: ${borders[1]} ${colors.gray3};
  border-left: 0;

  @media (min-width: ${breakpoints[0]}) {
    display: block;
  }

  @media (min-width: ${breakpoints[1]}) {
    border-bottom: 0;
    border-left: ${borders[1]} ${colors.gray3};
  }
`

export const MetadataPreview = ({ data, isLoading }) => (
  <HeroPreviewWrapper>
    <Flex
      css={theme({
        width: '100%',
        height: '100%',
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch',
        gap: 0
      })}
    >
      <Box
        css={theme({
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          width: '100%',
          order: [2, 2, 1, 1],
          pt: [2, 2, 0, 0],
          pr: [0, 0, 2, 2],
          position: 'relative'
        })}
      >
        <Box
          css={[
            theme({ width: '100%', height: '100%' }),
            {
              filter: isLoading && data ? 'blur(6px)' : 'blur(0px)',
              transition: 'filter 0.5s ease'
            }
          ]}
        >
          <JsonScroll>
            <JsonPreview data={data} />
          </JsonScroll>
        </Box>
        {isLoading && (
          <MetaOverlay
            $dim={Boolean(data)}
            aria-label='Loading metadata…'
            role='status'
          >
            {!data && (
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
              </SkeletonLines>
            )}
            <Spinner
              width='36'
              height='36'
              viewBox='0 0 50 50'
              aria-hidden='true'
            >
              <SpinnerCircle
                cx='25'
                cy='25'
                r='20'
                fill='none'
                strokeWidth='4'
              />
            </Spinner>
          </MetaOverlay>
        )}
      </Box>
      <DetectedColumn aria-label='Detected metadata fields'>
        <Hide breakpoints={[0, 1]}>
          <Caps
            css={theme({
              fontSize: 0,
              fontWeight: 'bold',
              color: 'black60',
              pb: 2,
              letterSpacing: 2
            })}
          >
            Detected
          </Caps>
        </Hide>
        <JsonKeyList>
          {JSON_KEYS.map(key => {
            const present = !isLoading && data && data[key] != null
            return (
              <JsonKeyItem key={key}>
                <KeyDot $present={present} />
                <span
                  css={theme({
                    color: present ? 'black' : 'black40',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  })}
                >
                  {key}
                </span>
              </JsonKeyItem>
            )
          })}
        </JsonKeyList>
      </DetectedColumn>
    </Flex>
  </HeroPreviewWrapper>
)
