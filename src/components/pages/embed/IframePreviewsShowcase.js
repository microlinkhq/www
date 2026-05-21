import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { colors, theme } from 'theme'

import Box from 'components/elements/Box'

const CYCLE_INTERVAL_MS = 3000
const FADE_DURATION_MS = 560

const Stage = styled(Box)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${theme({ minHeight: ['480px', '520px', '560px', '560px'] })};
`

const Layer = styled(Box)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: opacity ${FADE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
    transform ${FADE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1),
    filter ${FADE_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: ${({ $active }) => ($active ? 'scale(1)' : 'scale(0.96)')};
  filter: ${({ $active }) => ($active ? 'blur(0)' : 'blur(6px)')};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};

  @media (prefers-reduced-motion: reduce) {
    transform: none;
    filter: none;
    transition: opacity ${FADE_DURATION_MS}ms ease;
  }
`

const CardShell = styled(Box)`
  width: 100%;
  max-width: 420px;
  background: #fff;
  border: 1px solid ${colors.black10};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
`

const TextLine = styled(Box)`
  height: ${({ $h = 8 }) => `${$h}px`};
  width: ${({ $w = '60%' }) => $w};
  border-radius: 999px;
  background: ${({ $tone = 'light' }) => {
    if ($tone === 'dark') return colors.black20
    if ($tone === 'whiteSoft') return 'rgba(255,255,255,0.2)'
    if ($tone === 'whiteBright') return 'rgba(255,255,255,0.72)'
    return colors.black10
  }};
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

/* ─── YouTube ─── */

const YTThumb = styled(Box)`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: radial-gradient(
      circle at 28% 30%,
      rgba(255, 90, 110, 0.55),
      transparent 55%
    ),
    radial-gradient(circle at 75% 72%, rgba(255, 0, 51, 0.55), transparent 60%),
    linear-gradient(135deg, #1a0608 0%, #7a0a18 50%, #ff0033 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`

const YTPlayBadge = styled(Box)`
  width: 56px;
  height: 40px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    border-style: solid;
    border-width: 8px 0 8px 12px;
    border-color: transparent transparent transparent #fff;
    margin-left: 2px;
  }
`

const YTDuration = styled(Box)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  padding: 2px 5px;
  background: rgba(0, 0, 0, 0.85);
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

const YTAvatar = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0070f3, #7928ca);
  flex-shrink: 0;
`

const YTSubscribeBtn = styled(Box)`
  padding: 6px 14px;
  border-radius: 999px;
  background: #0f0f0f;
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: 0.2px;
`

const YouTubePreview = () => (
  <CardShell>
    <YTThumb>
      <YTPlayBadge />
      <YTDuration>3:42</YTDuration>
    </YTThumb>
    <Box css={{ padding: '14px 14px 12px' }}>
      <Row css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Row css={{ gap: '12px' }}>
          <YTAvatar />
          <Col css={{ gap: '5px' }}>
            <TextLine $w='110px' $h={9} $tone='dark' />
            <TextLine $w='70px' $h={7} />
          </Col>
        </Row>
        <YTSubscribeBtn>Subscribe</YTSubscribeBtn>
      </Row>
    </Box>
    <Box css={{ padding: '0 14px 14px' }}>
      <Col css={{ gap: '8px' }}>
        <TextLine $w='95%' $h={11} $tone='dark' />
        <TextLine $w='62%' $h={11} $tone='dark' />
      </Col>
      <Row css={{ gap: '4px', marginTop: '8px' }}>
        <TextLine $w='30%' $h={7} />
        <TextLine $w='3%' $h={5} />
        <TextLine $w='34%' $h={7} />
      </Row>
    </Box>
  </CardShell>
)

/* ─── Spotify ─── */

const SpotifyShell = styled(CardShell)`
  background: #121212;
  border-color: #2a2a2a;
`

const SpotifyArt = styled(Box)`
  width: 100%;
  aspect-ratio: 2 / 1;
  background: radial-gradient(circle at 28% 32%, #ffd86b 0%, transparent 38%),
    radial-gradient(circle at 70% 60%, #ff6f61 0%, transparent 45%),
    linear-gradient(135deg, #1ed760 0%, #064c20 100%);
`

const SpotifyPlay = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1ed760;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    border-style: solid;
    border-width: 7px 0 7px 11px;
    border-color: transparent transparent transparent #000;
    margin-left: 3px;
  }
`

const SpotifyLogo = styled(Box)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #1ed760;
  flex-shrink: 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 4px;
    right: 4px;
    height: 1.5px;
    border-radius: 999px;
    background: #064c20;
  }
  &::before {
    top: 5px;
  }
  &::after {
    top: 10px;
    right: 6px;
  }
`

const SpotifyProgress = styled(Box)`
  position: relative;
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  flex: 1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 38%;
    background: #fff;
    border-radius: 999px;
  }
`

const SpotifyPreview = () => (
  <SpotifyShell>
    <SpotifyArt />
    <Box css={{ padding: '14px' }}>
      <Row css={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Col css={{ flex: 1, gap: '6px' }}>
          <TextLine $w='82%' $h={10} $tone='whiteBright' />
          <TextLine $w='55%' $h={8} $tone='whiteSoft' />
        </Col>
        <SpotifyLogo />
      </Row>
      <Row css={{ gap: '10px', marginTop: '14px', alignItems: 'center' }}>
        <SpotifyPlay />
        <SpotifyProgress />
      </Row>
    </Box>
  </SpotifyShell>
)

/* ─── Instagram ─── */

const IGAvatar = styled(Box)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
  flex-shrink: 0;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid #fff;
    background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
  }
`

const IGDots = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 3px;

  & > span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${colors.black60};
  }
`

const IGPhoto = styled(Box)`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: radial-gradient(circle at 30% 30%, #fde68a 0%, transparent 40%),
    radial-gradient(circle at 70% 70%, #fb7185 0%, transparent 45%),
    linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #fb923c 100%);
`

const InstagramPreview = () => (
  <CardShell>
    <Box css={{ padding: '10px 12px' }}>
      <Row css={{ justifyContent: 'space-between' }}>
        <Row css={{ gap: '10px' }}>
          <IGAvatar />
          <Col css={{ gap: '4px' }}>
            <TextLine $w='90px' $h={8} $tone='dark' />
            <TextLine $w='60px' $h={6} />
          </Col>
        </Row>
        <IGDots>
          <span />
          <span />
          <span />
        </IGDots>
      </Row>
    </Box>
    <IGPhoto />
    <Box css={{ padding: '10px 12px' }}>
      <Row css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Row css={{ gap: '14px' }}>
          <svg
            width='22'
            height='22'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#0f1419'
            strokeWidth='1.8'
            aria-hidden='true'
          >
            <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
          </svg>
          <svg
            width='22'
            height='22'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#0f1419'
            strokeWidth='1.8'
            aria-hidden='true'
          >
            <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
          </svg>
          <svg
            width='22'
            height='22'
            viewBox='0 0 24 24'
            fill='none'
            stroke='#0f1419'
            strokeWidth='1.8'
            aria-hidden='true'
          >
            <line x1='22' y1='2' x2='11' y2='13' />
            <polygon points='22 2 15 22 11 13 2 9 22 2' />
          </svg>
        </Row>
        <svg
          width='22'
          height='22'
          viewBox='0 0 24 24'
          fill='none'
          stroke='#0f1419'
          strokeWidth='1.8'
          aria-hidden='true'
        >
          <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' />
        </svg>
      </Row>
      <Col css={{ gap: '5px', marginTop: '10px' }}>
        <TextLine $w='38%' $h={7} $tone='dark' />
        <TextLine $w='88%' $h={6} />
        <TextLine $w='58%' $h={6} />
      </Col>
    </Box>
  </CardShell>
)

/* ─── X (Twitter) ─── */

const XAvatar = styled(Box)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1da1f2, #0070f3);
  flex-shrink: 0;
`

const XLogo = () => (
  <svg
    width='18'
    height='18'
    viewBox='0 0 24 24'
    fill='#0f1419'
    aria-hidden='true'
    style={{ flexShrink: 0 }}
  >
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </svg>
)

const XInlineCard = styled(Box)`
  border: 1px solid ${colors.black10};
  border-radius: 14px;
  overflow: hidden;
  margin-top: 10px;
`

const XInlineThumb = styled(Box)`
  width: 100%;
  aspect-ratio: 2 / 1;
  background: radial-gradient(
      circle at 30% 30%,
      rgba(29, 161, 242, 0.45),
      transparent 55%
    ),
    linear-gradient(135deg, #0f1419 0%, #1da1f2 100%);
`

const XPreview = () => (
  <CardShell>
    <Box css={{ padding: '14px' }}>
      <Row css={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Row css={{ gap: '10px', alignItems: 'center', flex: 1 }}>
          <XAvatar />
          <Col css={{ gap: '4px' }}>
            <TextLine $w='100px' $h={8} $tone='dark' />
            <TextLine $w='70px' $h={7} />
          </Col>
        </Row>
        <XLogo />
      </Row>
      <Col css={{ gap: '6px', marginTop: '12px' }}>
        <TextLine $w='92%' $h={8} />
        <TextLine $w='85%' $h={8} />
        <TextLine $w='60%' $h={8} />
      </Col>
      <XInlineCard>
        <XInlineThumb />
        <Box css={{ padding: '10px' }}>
          <Col css={{ gap: '5px' }}>
            <TextLine $w='40%' $h={6} />
            <TextLine $w='75%' $h={8} $tone='dark' />
            <TextLine $w='55%' $h={6} />
          </Col>
        </Box>
      </XInlineCard>
      <Row css={{ marginTop: '12px', justifyContent: 'space-between' }}>
        <TextLine $w='60px' $h={6} />
        <Row css={{ gap: '14px' }}>
          <TextLine $w='28px' $h={6} />
          <TextLine $w='28px' $h={6} />
          <TextLine $w='28px' $h={6} />
        </Row>
      </Row>
    </Box>
  </CardShell>
)

/* ─── Showcase ─── */

const PREVIEWS = [
  { id: 'youtube', component: YouTubePreview, name: 'YouTube iframe embed' },
  { id: 'spotify', component: SpotifyPreview, name: 'Spotify iframe embed' },
  {
    id: 'instagram',
    component: InstagramPreview,
    name: 'Instagram iframe embed'
  },
  { id: 'twitter', component: XPreview, name: 'X (Twitter) iframe embed' }
]

export const IframePreviewsShowcase = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % PREVIEWS.length)
    }, CYCLE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <Stage>
      {PREVIEWS.map(({ component: Variant, name }, i) => (
        <Layer key={i} $active={i === index} aria-hidden={i !== index}>
          <h3
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(0,0,0,0)'
            }}
          >
            {name}
          </h3>
          <Variant />
        </Layer>
      ))}
    </Stage>
  )
}

export default IframePreviewsShowcase
