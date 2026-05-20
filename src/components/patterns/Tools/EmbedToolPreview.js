import React from 'react'
import styled, { keyframes } from 'styled-components'
import { colors } from 'theme'

import Box from 'components/elements/Box'

const Stage = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 14px;
  overflow: hidden;
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
`

const Floater = styled(Box).withConfig({
  shouldForwardProp: prop => !['$delay'].includes(prop)
})`
  width: 100%;
  height: 100%;
  animation: ${float} 4.6s ease-in-out infinite;
  animation-delay: ${({ $delay = 0 }) => `${$delay}s`};
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Layer = styled(Box).withConfig({
  shouldForwardProp: prop => !['$z'].includes(prop)
})`
  position: absolute;
  z-index: ${({ $z = 1 }) => $z};
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.07));
`

/* Back: large YouTube-style poster, centered, slightly tilted. */
const BackLayer = styled(Layer)`
  top: 7%;
  left: 50%;
  width: 72%;
  max-width: 230px;
  transform: translateX(-50%) rotate(-3deg);

  @media (min-width: 600px) {
    top: 8%;
    width: 66%;
    max-width: 260px;
  }
`

/* Mid: wide Spotify-style card, bottom-right, in front of the poster. */
const MidLayer = styled(Layer)`
  bottom: 6%;
  right: 4%;
  width: 70%;
  max-width: 240px;
  transform: rotate(3deg);

  @media (min-width: 600px) {
    width: 68%;
    max-width: 260px;
  }
`

/* Front: small X-style card, bottom-left, on top of everything. */
const FrontLayer = styled(Layer)`
  bottom: 30%;
  left: 6%;
  width: 56%;
  max-width: 180px;
  transform: rotate(-5deg);

  @media (min-width: 600px) {
    width: 54%;
    max-width: 200px;
    bottom: 32%;
    left: 7%;
  }
`

const CardShell = styled(Box)`
  width: 100%;
  background: #fff;
  border: 1px solid ${colors.black10};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
`

const TextLine = styled(Box).withConfig({
  shouldForwardProp: prop => !['$w', '$h', '$tone'].includes(prop)
})`
  height: ${({ $h = 8 }) => `${$h}px`};
  width: ${({ $w = '60%' }) => $w};
  border-radius: 999px;
  background: ${({ $tone = 'light' }) =>
    $tone === 'dark' ? colors.black20 : colors.black10};
`

const Row = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Col = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

/* ── YouTube card ── */

const YTBadge = styled(Box)`
  width: 20px;
  height: 14px;
  border-radius: 4px;
  background: #ff0033;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 3.5px 0 3.5px 5px;
    border-color: transparent transparent transparent #fff;
  }
`

const YTThumb = styled(Box)`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #2a1f3d 0%, #4a2547 50%, #6a2a3f 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 0, 51, 0.92);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 6px 0 6px 9px;
    border-color: transparent transparent transparent #fff;
    margin-left: 2px;
  }
`

const YouTubeCard = () => (
  <CardShell>
    <Box css={{ padding: '8px 10px' }}>
      <Row>
        <YTBadge />
        <TextLine $w='55%' $h={7} $tone='dark' />
      </Row>
    </Box>
    <YTThumb />
    <Box css={{ padding: '10px' }}>
      <Col>
        <TextLine $w='82%' $h={9} $tone='dark' />
        <TextLine $w='52%' $h={6} />
      </Col>
    </Box>
  </CardShell>
)

/* ── Spotify card ── */

const SPBadge = styled(Box)`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #1ed760;
  flex-shrink: 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 3px;
    right: 3px;
    height: 1.3px;
    border-radius: 999px;
    background: #064c20;
  }
  &::before {
    top: 4px;
  }
  &::after {
    top: 8px;
    right: 5px;
  }
`

const SPArt = styled(Box)`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background: radial-gradient(circle at 30% 30%, #ffd86b 0%, transparent 35%),
    radial-gradient(circle at 70% 60%, #ff6f61 0%, transparent 40%),
    linear-gradient(135deg, #1ed760 0%, #064c20 100%);
  flex-shrink: 0;
`

const SpotifyCard = () => (
  <CardShell>
    <Box css={{ padding: '10px' }}>
      <Row css={{ alignItems: 'stretch' }}>
        <SPArt />
        <Col css={{ justifyContent: 'center', flex: 1, gap: '7px' }}>
          <Row css={{ gap: '6px' }}>
            <SPBadge />
            <TextLine $w='60%' $h={7} $tone='dark' />
          </Row>
          <TextLine $w='80%' $h={8} $tone='dark' />
          <TextLine $w='55%' $h={6} />
        </Col>
      </Row>
    </Box>
  </CardShell>
)

/* ── X (Twitter) card ── */

const XBadge = styled(Box)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #0f1419;
  flex-shrink: 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 1.5px;
    background: #fff;
    border-radius: 1px;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

const XCard = () => (
  <CardShell>
    <Box css={{ padding: '10px' }}>
      <Row css={{ alignItems: 'flex-start' }}>
        <XBadge />
        <Col css={{ flex: 1, gap: '6px' }}>
          <Row css={{ gap: '6px' }}>
            <TextLine $w='40%' $h={7} $tone='dark' />
            <TextLine $w='25%' $h={5} />
          </Row>
          <TextLine $w='92%' $h={6} />
          <TextLine $w='65%' $h={6} />
        </Col>
      </Row>
    </Box>
  </CardShell>
)

const EmbedToolPreview = () => {
  return (
    <Stage aria-hidden='true'>
      <BackLayer $z={1}>
        <Floater $delay={0}>
          <YouTubeCard />
        </Floater>
      </BackLayer>
      <MidLayer $z={2}>
        <Floater $delay={1.5}>
          <SpotifyCard />
        </Floater>
      </MidLayer>
      <FrontLayer $z={3}>
        <Floater $delay={3}>
          <XCard />
        </Floater>
      </FrontLayer>
    </Stage>
  )
}

export default EmbedToolPreview
