import React from 'react'
import { rgba } from 'polished'
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

const VIDEO_PHASE = { $from: 0, $to: 48 }
const AUDIO_PHASE = { $from: 48, $to: 96 }

const STAGE_HEIGHT = '200px'
const FRAME_WIDTH = '64px'
const FRAME_HEIGHT = '36px'

const BAR_HEIGHTS = [
  42, 78, 57, 114, 73, 146, 62, 125, 166, 94, 151, 52, 109, 177, 88, 135, 47,
  156, 104, 73, 140, 182, 78, 120, 57, 146, 99, 68, 161, 114, 83, 130
]

const FILM_TINTS = [
  0.28, 0.46, 0.2, 0.54, 0.32, 0.6, 0.24, 0.5, 0.36, 0.58, 0.22, 0.42
]

const FILM_REEL = [...FILM_TINTS, ...FILM_TINTS]

const dance = keyframes`
  from { transform: scaleY(0.35); }
  to { transform: scaleY(1); }
`

const progressRun = keyframes`
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
`

const filmRun = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

const cyclePhase = ({ $from, $to }) => css`
  animation: ${phaseWindow($from, $to)} ${LOOP} linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${$from === 0 ? 1 : 0};
  }
`

const Body = styled(Box)(theme({ px: 4, py: 4, bg: 'white' }))

const PlayerRow = styled(Flex)(theme({ alignItems: 'center', gap: 3, pt: 5 }))

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

const Stage = styled(Box)(
  theme({ display: 'grid', height: STAGE_HEIGHT, overflow: 'hidden' })
)

const StageLayer = styled(Box)`
  grid-area: 1 / 1;
  min-width: 0;
  ${cyclePhase};
`

const Equalizer = styled(Flex)(
  theme({ alignItems: 'flex-end', gap: '4px', height: '100%' })
)

const VideoScene = styled(Flex)(
  theme({ flexDirection: 'column', gap: 2, height: '100%' })
)

const Poster = styled(Box)`
  ${theme({
    position: 'relative',
    flex: 1,
    borderRadius: 3,
    overflow: 'hidden'
  })};
  background: linear-gradient(
    135deg,
    ${colors.grape1},
    ${colors.violet2} 55%,
    ${colors.grape3}
  );
`

const PosterBadge = styled(Text)(
  theme({
    position: 'absolute',
    top: 2,
    left: 2,
    px: 2,
    py: '2px',
    borderRadius: 1,
    bg: 'white70',
    color: 'black60',
    fontFamily: 'mono',
    fontSize: '11px',
    fontVariantNumeric: 'tabular-nums'
  })
)

const FilmStrip = styled(Box)(
  theme({ height: FRAME_HEIGHT, overflow: 'hidden', flexShrink: 0 })
)

const FilmReel = styled(Flex)`
  ${theme({ width: 'max-content' })};
  animation: ${filmRun} 18s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const FilmFrame = styled(Box)`
  ${theme({
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    mr: 1,
    borderRadius: 1,
    flexShrink: 0
  })};
  background: ${props => rgba(colors.grape5, props.$tint)};
`

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
  ${theme({ flexShrink: 0 })};
`

const CycleLayer = styled('span')`
  grid-area: 1 / 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${cyclePhase};
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
    footer={
      <HeaderStack>
        <CycleLayer {...VIDEO_PHASE}>
          <FooterText as='span'>
            <b>✓ tears-of-steel.mp4</b> · 1920×1080 · 12:14
          </FooterText>
        </CycleLayer>
        <CycleLayer {...AUDIO_PHASE}>
          <FooterText as='span'>
            <b>✓ tycho-awake.mp3</b> · audio/mpeg · 04:37
          </FooterText>
        </CycleLayer>
      </HeaderStack>
    }
  >
    <Body>
      <Stage>
        <StageLayer {...VIDEO_PHASE}>
          <VideoScene>
            <Poster>
              <PosterBadge as='span'>1920×1080</PosterBadge>
            </Poster>
            <FilmStrip>
              <FilmReel>
                {FILM_REEL.map((tint, index) => (
                  <FilmFrame key={index} $tint={tint} />
                ))}
              </FilmReel>
            </FilmStrip>
          </VideoScene>
        </StageLayer>
        <StageLayer {...AUDIO_PHASE}>
          <Equalizer>
            {BAR_HEIGHTS.map((height, index) => (
              <WaveBar
                key={index}
                $index={index}
                css={{ height: `${height}px` }}
              />
            ))}
          </Equalizer>
        </StageLayer>
      </Stage>
      <PlayerRow>
        <PlayButton>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='#fff'>
            <path d='M8 5v14l11-7z' />
          </svg>
        </PlayButton>
        <ProgressTrack>
          <ProgressFill />
        </ProgressTrack>
        <HeaderStack>
          <CycleLayer {...VIDEO_PHASE}>
            <TimeStamp as='span'>12:14</TimeStamp>
          </CycleLayer>
          <CycleLayer {...AUDIO_PHASE}>
            <TimeStamp as='span'>04:37</TimeStamp>
          </CycleLayer>
        </HeaderStack>
      </PlayerRow>
    </Body>
  </DemoCard>
)
