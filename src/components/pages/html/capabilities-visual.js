import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { colors, fonts, theme } from 'theme'
import { rgba } from 'polished'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Microlink } from 'components/logos'
import {
  DEMO_EASE,
  DemoCard,
  caretBlink,
  windowIn
} from 'components/patterns/ProductStory/demo-card'

const LOOP = '10s'

const logoFlip = keyframes`
  0%, 6% { transform: rotate(0); }
  14%, 100% { transform: rotate(360deg); }
`

const lockOpen = keyframes`
  0%, 16% { transform: rotate(0); }
  24%, 90% { transform: rotate(32deg); }
  97%, 100% { transform: rotate(0); }
`

const Wall = styled(Flex)(
  theme({
    position: 'relative',
    flexDirection: ['column', 'column', 'row', 'row'],
    alignItems: 'stretch',
    gap: 4,
    px: 4,
    py: 5,
    bg: 'gray0'
  })
)

const Panel = styled(Box)(theme({ flex: 1, minWidth: 0, borderRadius: 3 }))

const Denied = styled(Flex)(
  theme({
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    px: 4,
    py: 5,
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 3
  })
)

const DeniedLabel = styled(Text)(
  theme({
    pt: 3,
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: 'gray8',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 2
  })
)

const Skel = styled(Box)(theme({ bg: 'gray2', borderRadius: 1, height: '8px' }))

const Code = styled(Box)(
  theme({ px: 4, py: 4, borderRadius: 3, bg: 'gray9', height: '100%' }),
  `font-family: ${fonts.mono};`
)

const Line = styled(Box)`
  font-size: 12px;
  line-height: 2.2;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: ${props => css`
    ${windowIn(props.$at, 84)} ${LOOP} ${DEMO_EASE} infinite
  `};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`

const Tag = styled('span')`
  color: ${colors.violet3};
`

const CodeBody = styled('span')`
  color: ${colors.white80};
`

const Caret = styled('span')`
  display: inline-block;
  width: 7px;
  height: 13px;
  margin-left: 2px;
  vertical-align: middle;
  background: ${colors.violet4};
  animation: ${caretBlink} 1.1s steps(1, end) infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const BreachSpot = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`

const BreachGlow = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${rgba(colors.violet6, 0.22)},
    ${rgba(colors.violet6, 0)} 70%
  );
  filter: blur(6px);
`

const BreachCircle = styled(Flex)(
  theme({
    position: 'relative',
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    bg: 'white',
    boxShadow: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  css`
    animation: ${logoFlip} ${LOOP} ${DEMO_EASE} infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `
)

const Shackle = styled('g')`
  transform-box: fill-box;
  transform-origin: 100% 100%;
  animation: ${lockOpen} ${LOOP} ${DEMO_EASE} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: rotate(32deg);
  }
`

const ShieldIcon = () => (
  <svg width='56' height='56' viewBox='0 0 24 24' fill='none'>
    <path
      d='M12 2.5l7.5 3.2v5.8c0 4.5-3.1 8.6-7.5 9.7-4.4-1.1-7.5-5.2-7.5-9.7V5.7L12 2.5z'
      fill={colors.white}
      stroke={colors.violet6}
      strokeWidth='1.3'
    />
    <Shackle>
      <path
        d='M9.9 11.2V9.8a2.1 2.1 0 0 1 4.2 0v1.4'
        fill='none'
        stroke={colors.violet7}
        strokeWidth='1.4'
      />
    </Shackle>
    <rect
      x='8.7'
      y='11'
      width='6.6'
      height='5.2'
      rx='1.4'
      fill={colors.violet7}
    />
    <circle cx='12' cy='13' r='0.9' fill={colors.white} />
    <path
      d='M12 13.7v1.1'
      stroke={colors.white}
      strokeWidth='0.9'
      strokeLinecap='round'
    />
  </svg>
)

const FooterResult = styled(Text)`
  font-family: inherit;
  font-size: inherit;
  color: ${colors.black50};

  b {
    color: ${colors.violet7};
    font-weight: bold;
  }
`

const LINES = [
  {
    at: 26,
    code: (
      <>
        <Tag>{'<div'}</Tag>
        <CodeBody>{' id="root">'}</CodeBody>
      </>
    )
  },
  {
    at: 32,
    code: (
      <>
        <CodeBody>{'  '}</CodeBody>
        <Tag>{'<header>'}</Tag>
        <CodeBody>…</CodeBody>
        <Tag>{'</header>'}</Tag>
      </>
    )
  },
  {
    at: 38,
    code: (
      <>
        <CodeBody>{'  '}</CodeBody>
        <Tag>{'<main>'}</Tag>
      </>
    )
  },
  {
    at: 44,
    code: (
      <>
        <CodeBody>{'    '}</CodeBody>
        <Tag>{'<h1>'}</Tag>
        <CodeBody>Develop. Preview.</CodeBody>
        <Tag>{'</h1>'}</Tag>
      </>
    )
  },
  {
    at: 50,
    code: (
      <>
        <CodeBody>{'    '}</CodeBody>
        <Tag>{'<p>'}</Tag>
        <CodeBody>Vercel is the…</CodeBody>
        <Tag>{'</p>'}</Tag>
      </>
    )
  },
  {
    at: 56,
    code: (
      <>
        <CodeBody>{'  '}</CodeBody>
        <Tag>{'</main>'}</Tag>
      </>
    )
  },
  {
    at: 62,
    code: (
      <>
        <Tag>{'</div>'}</Tag>
        <Caret />
      </>
    )
  }
]

export const HtmlCapabilitiesVisual = () => (
  <DemoCard
    maxWidth='720px'
    footer={
      <FooterResult as='span'>
        <b>✓ 1,214 nodes</b> · antibot bypassed via residential proxy
      </FooterResult>
    }
  >
    <Wall>
      <Panel>
        <Denied>
          <ShieldIcon />
          <DeniedLabel as='p'>
            Anti-scraping
            <br />
            protection
          </DeniedLabel>
          <Flex
            css={theme({
              flexDirection: 'column',
              gap: 2,
              pt: 4,
              width: '72%'
            })}
          >
            <Skel />
            <Skel css={{ width: '84%' }} />
            <Skel css={{ width: '58%' }} />
          </Flex>
        </Denied>
      </Panel>
      <Panel>
        <Code>
          {LINES.map(({ at, code }) => (
            <Line key={at} $at={at}>
              {code}
            </Line>
          ))}
        </Code>
      </Panel>
      <BreachGlow aria-hidden='true' />
      <BreachSpot>
        <BreachCircle>
          <img
            src={Microlink.logoUri}
            alt=''
            css={{ width: '34px', height: 'auto', display: 'block' }}
          />
        </BreachCircle>
      </BreachSpot>
    </Wall>
  </DemoCard>
)
