import React from 'react'
import styled, { keyframes } from 'styled-components'
import { SECTION_VERTICAL_SPACING, borders, colors, theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import ArrowLink from 'components/patterns/ArrowLink'
import { ACCENT, Caption, Subhead } from './shared'

const speedLineAnim = keyframes`
  from { transform: translateX(-200px); opacity: 1; }
  to   { transform: translateX(100vw); opacity: 0; }
`

const SpeedLine = styled('div')`
  position: absolute;
  left: 0;
  top: ${p => p.$top};
  width: ${p => p.$w};
  height: ${p => p.$h};
  background: ${p => p.$color};
  border-radius: 9999px;
  box-shadow: 0 0 ${p => p.$glow} ${p => p.$color};
  animation: ${speedLineAnim} ${p => p.$dur} linear ${p => p.$delay} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Benchmark = () => (
  <section
    id='benchmark'
    css={theme({
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      py: SECTION_VERTICAL_SPACING,
      backgroundImage: `radial-gradient(
        circle at center right,
        ${colors.blue9} 0%,
        ${colors.blue9} 48%,
        ${colors.blue8} 48%,
        ${colors.blue8} 52%,
        ${colors.blue7} 52%,
        ${colors.blue7} 65%,
        ${colors.blue6} 65%,
        ${colors.blue6} 79%,
        ${ACCENT} 79%,
        ${ACCENT} 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`
    })}
  >
    <Box
      css={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <SpeedLine
        $top='12%'
        $w='140px'
        $h='3px'
        $dur='1.27s'
        $delay='0s'
        $color='rgba(255,255,255,0.45)'
        $glow='8px'
      />
      <SpeedLine
        $top='22%'
        $w='80px'
        $h='2px'
        $dur='1.78s'
        $delay='0.6s'
        $color='rgba(255,255,255,0.2)'
        $glow='4px'
      />
      <SpeedLine
        $top='32%'
        $w='110px'
        $h='2px'
        $dur='1.1s'
        $delay='0.15s'
        $color='rgba(255,255,255,0.55)'
        $glow='10px'
      />
      <SpeedLine
        $top='42%'
        $w='50px'
        $h='1px'
        $dur='2.11s'
        $delay='1.1s'
        $color='rgba(255,255,255,0.12)'
        $glow='3px'
      />
      <SpeedLine
        $top='52%'
        $w='130px'
        $h='3px'
        $dur='1.01s'
        $delay='0.3s'
        $color='rgba(255,255,255,0.6)'
        $glow='12px'
      />
      <SpeedLine
        $top='62%'
        $w='60px'
        $h='1px'
        $dur='1.91s'
        $delay='1.35s'
        $color='rgba(255,255,255,0.15)'
        $glow='3px'
      />
      <SpeedLine
        $top='17%'
        $w='90px'
        $h='2px'
        $dur='1.19s'
        $delay='0.2s'
        $color='rgba(255,255,255,0.35)'
        $glow='6px'
      />
      <SpeedLine
        $top='37%'
        $w='120px'
        $h='3px'
        $dur='0.94s'
        $delay='0s'
        $color='rgba(255,255,255,0.5)'
        $glow='10px'
      />
      <SpeedLine
        $top='47%'
        $w='45px'
        $h='1px'
        $dur='1.8s'
        $delay='0.8s'
        $color='rgba(255,255,255,0.18)'
        $glow='3px'
      />
      <SpeedLine
        $top='57%'
        $w='75px'
        $h='2px'
        $dur='1.35s'
        $delay='0.45s'
        $color='rgba(255,255,255,0.3)'
        $glow='5px'
      />
      <SpeedLine
        $top='67%'
        $w='105px'
        $h='3px'
        $dur='1.08s'
        $delay='0.15s'
        $color='rgba(255,255,255,0.5)'
        $glow='9px'
      />
      <SpeedLine
        $top='77%'
        $w='55px'
        $h='1px'
        $dur='1.97s'
        $delay='1.2s'
        $color='rgba(255,255,255,0.14)'
        $glow='3px'
      />
    </Box>
    <Flex
      css={theme({
        position: 'relative',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
        gap: [3, 3, 4, 4]
      })}
    >
      <Subhead
        css={theme({
          color: 'white',
          textAlign: 'center'
        })}
      >
        The most complete website metadata API{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          built for production workloads
        </span>
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          color: 'white80',
          textAlign: 'center',
          width: '100%',
          px: [4, 4, 4, 0]
        })}
      >
        Six metadata sources merged into one JSON response.
        <br />
        From Open Graph to JSON-LD, Microlink extracts the full picture in a
        single round-trip — no brittle scrapers, no partial results.
      </Caption>
      <ArrowLink
        href='/docs/guides/metadata'
        css={theme({
          fontSize: ['22px', '24px', '26px', '26px'],
          color: 'white'
        })}
        style={{ color: 'white' }}
      >
        Read the metadata guides
      </ArrowLink>
    </Flex>
  </section>
)
