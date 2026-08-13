import React from 'react'
import styled, { css } from 'styled-components'
import { colors, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  DemoCard,
  phaseWindow,
  windowIn
} from 'components/patterns/ProductStory/demo-card'

const LOOP = '11s'
const STEP = 20
const RESULT_END = 96

const SITES = [
  {
    domain: 'spotify.com',
    logo: 'https://cdn.microlink.io/data/assets/open.spotify.com!track!1W2919zs8SBCLTrOB1ftQT/logo.clearbit.com!spotify.com.png',
    palette: ['#1CD464', '#8CECAC', '#0F7537', '#11873F']
  },
  {
    domain: 'netflix.com',
    logo: 'https://cdn.microlink.io/data/assets/netflix.com!title!80057281/logo.clearbit.com!netflix.com.png',
    palette: ['#E30C14', '#F88185', '#88040C', '#91070C']
  },
  {
    domain: 'stackoverflow.com',
    logo: 'https://cdn.microlink.io/data/assets/stackoverflow.com!questions!245062!whats-the-difference-between-javascript-and-java/logo.clearbit.com!stackoverflow.com.png',
    palette: ['#F48830', '#F6A666', '#7D3C06', '#914507']
  },
  {
    domain: 'nasa.gov',
    logo: 'https://cdn.microlink.io/data/assets/nasa.gov!feature!goddard!2018!update-on-the-hubble-space-telescope-safe-mode/logo.clearbit.com!nasa.gov.png',
    palette: ['#245CA4', '#EC848C', '#2B62AC', '#545894']
  },
  {
    domain: 'apple.com',
    logo: 'https://cdn.microlink.io/data/assets/apple.com!music/logo.clearbit.com!apple.com.png',
    palette: ['#7F7F7F', '#BCBCBC', '#424242', '#151515']
  }
].map((site, index) => ({ ...site, base: index * STEP }))

const Body = styled(Box)(theme({ px: 4, py: 4, bg: 'white' }))

const Row = styled(Box)`
  position: relative;

  & + & {
    border-top: 1px solid ${colors.gray1};
  }
`

const RowGlow = styled(Box)`
  position: absolute;
  inset: 0;
  background: ${colors.yellow0};
  animation: ${props => css`
    ${phaseWindow(props.$from, props.$to)} ${LOOP} linear infinite
  `};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`

const RowInner = styled(Flex)(
  theme({
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
    px: 2,
    py: '12px'
  })
)

const Domain = styled(Text)(
  theme({ fontFamily: 'mono', fontSize: '12px', color: 'black70' }),
  'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
)

const Slot = styled(Box)`
  display: grid;
  justify-items: end;
  align-items: center;
  min-height: 24px;
  flex-shrink: 0;
`

const Result = styled(Flex)(
  theme({ alignItems: 'center', gap: 2 }),
  props => css`
    grid-area: 1 / 1;
    animation: ${windowIn(props.$at, RESULT_END)} ${LOOP} linear infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      opacity: 1;
      transform: none;
    }
  `
)

const ResultLogo = styled('img')`
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 6px;
`

const ResultSwatch = styled('span')`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 3px;
`

const FooterStack = styled('span')`
  display: inline-grid;
  min-width: 0;
`

const FooterLayer = styled(Text)`
  grid-area: 1 / 1;
  font-family: inherit;
  font-size: inherit;
  color: ${colors.black50};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  animation: ${props => css`
    ${phaseWindow(props.$from, props.$to)} ${LOOP} linear infinite
  `};

  b {
    color: ${colors.yellow9};
    font-weight: bold;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${props => (props.$to >= 96 ? 1 : 0)};
  }
`

export const LogoCapabilitiesVisual = () => (
  <DemoCard
    maxWidth='480px'
    footer={
      <FooterStack>
        <FooterLayer as='span' $from={0} $to={9}>
          queue · 5 urls · filter=logo · palette=true
        </FooterLayer>
        {SITES.map(({ domain, palette, base }, index) => (
          <FooterLayer
            key={domain}
            as='span'
            $from={base + 8}
            $to={index === SITES.length - 1 ? 100 : base + 8 + STEP}
          >
            <b>✓ {domain}</b> · logo.png · {palette[0]}
          </FooterLayer>
        ))}
      </FooterStack>
    }
  >
    <Body>
      {SITES.map(({ domain, logo, palette, base }) => (
        <Row key={domain}>
          <RowGlow $from={base} $to={base + 15} />
          <RowInner>
            <Domain as='span'>{domain}</Domain>
            <Slot>
              <Result $at={base + 8}>
                <ResultLogo src={logo} alt='' loading='lazy' />
                {palette.map(color => (
                  <ResultSwatch key={color} css={{ background: color }} />
                ))}
              </Result>
            </Slot>
          </RowInner>
        </Row>
      ))}
    </Body>
  </DemoCard>
)
