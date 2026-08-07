import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { colors, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  DemoCard,
  phaseWindow
} from 'components/patterns/ProductStory/demo-card'

const LOOP = '12s'

const BAR_HEIGHTS = [
  42, 78, 57, 114, 73, 146, 62, 125, 166, 94, 151, 52, 109, 177, 88, 135, 47,
  156, 104, 73, 140, 182, 78, 120, 57, 146, 99, 68, 161, 114, 83, 130
]

const dance = keyframes`
  from { transform: scaleY(0.35); }
  to { transform: scaleY(1); }
`

const progressRun = keyframes`
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
`

const Body = styled(Box)(theme({ px: 4, py: 5, bg: 'white' }))

const PlayerRow = styled(Flex)(theme({ alignItems: 'center', gap: 3, pb: 4 }))

const PlayButton = styled(Flex)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.grape6};
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const ProgressTrack = styled(Box)`
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background: ${colors.gray2};
  overflow: hidden;
`

const ProgressFill = styled(Box)`
  height: 100%;
  border-radius: 999px;
  background: ${colors.grape6};
  transform-origin: left;
  animation: ${progressRun} ${LOOP} linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scaleX(0.4);
  }
`

const TimeStamp = styled(Text)(
  theme({
    fontFamily: 'mono',
    fontSize: '11px',
    color: 'black50',
    fontVariantNumeric: 'tabular-nums',
    flexShrink: 0
  })
)

const Equalizer = styled(Flex)(
  theme({ alignItems: 'flex-end', gap: '4px', height: '200px' })
)

const WaveBar = styled(Box)`
  flex: 1;
  border-radius: 999px 999px 2px 2px;
  background: ${colors.grape5};
  opacity: ${props => 0.55 + (props.$index % 3) * 0.15};
  transform-origin: bottom;
  animation: ${dance} ${props => 1.1 + (props.$index % 5) * 0.16}s ease-in-out
    ${props => (props.$index % 7) * 0.13}s infinite alternate;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scaleY(0.8);
  }
`

const HeaderStack = styled('span')`
  display: inline-grid;
  min-width: 0;
`

const CycleLayer = styled('span')`
  grid-area: 1 / 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  animation: ${props => css`
    ${phaseWindow(props.$from, props.$to)} ${LOOP} linear infinite
  `};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${props => (props.$from === 0 ? 1 : 0)};
  }
`

const FooterText = styled(Text)`
  font-family: inherit;
  font-size: inherit;
  color: ${colors.black50};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  b {
    color: ${colors.grape7};
    font-weight: bold;
  }
`

export const MediaCapabilitiesVisual = () => (
  <DemoCard
    maxWidth='520px'
    url={
      <HeaderStack>
        <CycleLayer $from={0} $to={48}>
          api.microlink.io?url=vimeo.com/571394002&video
        </CycleLayer>
        <CycleLayer $from={48} $to={96}>
          api.microlink.io?url=soundcloud.com/tycho&audio
        </CycleLayer>
      </HeaderStack>
    }
    footer={
      <HeaderStack>
        <CycleLayer $from={0} $to={48}>
          <FooterText as='span'>
            <b>✓ tears-of-steel.mp4</b> · 1920×1080 · 12:14
          </FooterText>
        </CycleLayer>
        <CycleLayer $from={48} $to={96}>
          <FooterText as='span'>
            <b>✓ tycho-awake.mp3</b> · audio/mpeg · 04:37
          </FooterText>
        </CycleLayer>
      </HeaderStack>
    }
  >
    <Body>
      <PlayerRow>
        <PlayButton>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='#fff'>
            <path d='M8 5v14l11-7z' />
          </svg>
        </PlayButton>
        <ProgressTrack>
          <ProgressFill />
        </ProgressTrack>
        <TimeStamp as='span'>12:14</TimeStamp>
      </PlayerRow>
      <Equalizer>
        {BAR_HEIGHTS.map((height, index) => (
          <WaveBar key={index} $index={index} css={{ height: `${height}px` }} />
        ))}
      </Equalizer>
    </Body>
  </DemoCard>
)
