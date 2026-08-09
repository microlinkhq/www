import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { colors, fonts, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  DEMO_EASE,
  DemoCard,
  caretBlink,
  phaseWindow,
  windowIn
} from 'components/patterns/ProductStory/demo-card'

const LOOP = '13s'
const URL_TEXT = 'stripe.com/blog/payment-api-design'
const TYPE_START = 2
const TYPE_END = 15

const charIn = start => keyframes`
  0%, ${start}% { opacity: 0; }
  ${start + 0.5}%, 100% { opacity: 1; }
`

const loadPulse = keyframes`
  0%, 100% { opacity: 0.2; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-3px); }
`

const Stage = styled(Box)`
  display: grid;
  min-height: 640px;
  background: ${colors.white};
`

const Phase = styled(Box)`
  grid-area: 1 / 1;
  animation: ${props => css`
    ${phaseWindow(props.$from, props.$to)} ${LOOP} linear infinite
  `};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${props => (props.$to >= 96 ? 1 : 0)};
  }
`

const Centered = styled(Flex)(
  theme({
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    px: 4
  })
)

const TypedUrl = styled(Text)(
  theme({
    fontSize: [0, 0, 1, 1],
    color: 'black',
    textAlign: 'center'
  }),
  `font-family: ${fonts.mono}; letter-spacing: -0.01em; white-space: nowrap; max-width: 100%; overflow: hidden;`
)

const Char = styled('span')`
  animation: ${props => css`
    ${charIn(props.$at)} ${LOOP} linear infinite
  `};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
  }
`

const TypeCaret = styled('span')`
  display: inline-block;
  width: 8px;
  height: 16px;
  margin-left: 3px;
  vertical-align: middle;
  background: ${colors.orange6};
  animation: ${caretBlink} 1s steps(1, end) infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`

const LoadDot = styled(Box)`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${colors.orange6};
  animation: ${loadPulse} 1s ease-in-out ${props => props.$delay}s infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.6;
    transform: none;
  }
`

const Block = styled(Box)`
  animation: ${props => css`
    ${windowIn(props.$at, 94)} ${LOOP} ${DEMO_EASE} infinite
  `};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`

const Prose = styled(Text)(
  theme({ fontSize: 1, lineHeight: 2, color: 'black70', pb: 3 })
)

const FooterLayer = styled(Text)`
  grid-area: 1 / 1;
  font-family: inherit;
  font-size: inherit;
  color: ${colors.black50};
  animation: ${props => css`
    ${phaseWindow(props.$from, props.$to)} ${LOOP} linear infinite
  `};

  b {
    color: ${colors.orange8};
    font-weight: bold;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${props => (props.$to >= 96 ? 1 : 0)};
  }
`

const CHARS = URL_TEXT.split('').map((char, index) => ({
  char,
  id: `${char}${index}`,
  at: TYPE_START + (index * (TYPE_END - TYPE_START)) / URL_TEXT.length
}))

export const TextCapabilitiesVisual = () => (
  <DemoCard
    maxWidth='500px'
    footer={
      <>
        <FooterLayer as='span' $from={0} $to={28}>
          reading stripe.com/blog/payment-api-design…
        </FooterLayer>
        <FooterLayer as='span' $from={28} $to={100}>
          <b>✓ 1,850 tokens</b> · readable text · boilerplate removed
        </FooterLayer>
      </>
    }
  >
    <Stage>
      <Phase $from={0} $to={17}>
        <Centered>
          <TypedUrl as='p'>
            {CHARS.map(({ char, id, at }) => (
              <Char key={id} $at={at}>
                {char}
              </Char>
            ))}
            <TypeCaret />
          </TypedUrl>
        </Centered>
      </Phase>
      <Phase $from={18} $to={27}>
        <Centered>
          <Flex css={theme({ gap: 2 })}>
            <LoadDot $delay={0} />
            <LoadDot $delay={0.15} />
            <LoadDot $delay={0.3} />
          </Flex>
        </Centered>
      </Phase>
      <Phase $from={29} $to={96} css={theme({ px: 5, py: 5 })}>
        <Block $at={31}>
          <Text
            css={theme({
              fontSize: 3,
              fontWeight: 'bold',
              color: 'black',
              lineHeight: 1,
              pb: 2
            })}
          >
            Designing payment APIs
          </Text>
          <Text css={theme({ fontSize: 0, color: 'black40', pb: 4 })}>
            Stripe Engineering · 9 min read
          </Text>
        </Block>
        <Block $at={35}>
          <Prose>
            A good API is designed around the mental model of the developer
            using it. Payments are stateful, so idempotency keys and explicit
            lifecycle events matter more than clever abstractions.
          </Prose>
        </Block>
        <Block $at={39}>
          <Prose>
            Idempotency keys let a client retry a request without double
            charging anyone. The server remembers the first outcome and replays
            it, which turns an unreliable network into a safe one.
          </Prose>
        </Block>
        <Block $at={43}>
          <Text
            css={theme({
              fontSize: 2,
              fontWeight: 'bold',
              color: 'black',
              pt: 2,
              pb: 2
            })}
          >
            Explicit lifecycle events
          </Text>
          <Prose>
            Every payment moves through created, authorized, captured and
            settled. Exposing each transition as an event means integrators
            never have to poll or guess what state an object is in.
          </Prose>
        </Block>
        <Block $at={47}>
          <Prose css={{ paddingBottom: 0 }}>
            The result is an interface that reads like the domain it models:
            predictable states, observable transitions, and errors that tell you
            what to do next rather than what went wrong.
          </Prose>
        </Block>
      </Phase>
    </Stage>
  </DemoCard>
)
