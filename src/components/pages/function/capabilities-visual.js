import React from 'react'
import styled, { css } from 'styled-components'
import { colors, fonts, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  DEMO_EASE,
  DemoCard,
  phaseWindow,
  windowIn
} from 'components/patterns/ProductStory/demo-card'

const LOOP = '14s'
const CHEERIO = { $from: 0, $to: 48 }
const CLICK = { $from: 48, $to: 96 }

const cyclePhase = ({ $from, $to }) => css`
  animation: ${phaseWindow($from, $to)} ${LOOP} linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: ${$from === 0 ? 1 : 0};
  }
`

const Body = styled(Box)(theme({ px: 4, py: 4, bg: 'white' }))

const Stage = styled(Box)(
  theme({
    display: 'grid',
    minHeight: ['260px', '260px', '280px', '280px']
  })
)

const StageLayer = styled(Box)`
  grid-area: 1 / 1;
  min-width: 0;
  ${cyclePhase};
`

const Panels = styled(Flex)(
  theme({
    flexDirection: ['column', 'column', 'row', 'row'],
    gap: 3,
    height: '100%'
  })
)

const Code = styled(Box)(
  theme({
    flex: 1.5,
    minWidth: 0,
    px: 3,
    py: 3,
    borderRadius: 3,
    bg: 'gray9'
  }),
  `font-family: ${fonts.mono};`
)

const Result = styled(Box)(
  theme({
    flex: 1,
    minWidth: 0,
    px: 3,
    py: 3,
    borderRadius: 3,
    bg: 'gray0',
    border: 1,
    borderColor: 'gray6'
  }),
  `font-family: ${fonts.mono};`
)

const Line = styled(Box)`
  font-size: 12px;
  line-height: 2;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  animation: ${props => css`
    ${windowIn(props.$at, 92)} ${LOOP} ${DEMO_EASE} infinite
  `};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }
`

const Kw = styled('span')(theme({ color: 'indigo2' }))

const Fn = styled('span')(theme({ color: 'white' }))

const Str = styled('span')(theme({ color: 'cyan3' }))

const Label = styled(Text)(
  theme({
    fontSize: '11px',
    fontWeight: 'bold',
    color: 'gray7',
    pb: 2,
    letterSpacing: 2
  }),
  'text-transform: uppercase;'
)

const ResultKey = styled('span')(
  theme({ color: 'indigo8', fontWeight: 'bold' })
)

const ResultVal = styled('span')(theme({ color: 'gray9' }))

const ResultStr = styled('span')(theme({ color: 'indigo8' }))

const FooterText = styled(Text)(
  theme({
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'gray7'
  }),
  `
  b {
    color: ${colors.indigo8};
    font-weight: bold;
  }
`
)

const HeaderStack = styled('span')`
  display: inline-grid;
  min-width: 0;
`

const CycleLayer = styled('span')`
  grid-area: 1 / 1;
  ${cyclePhase};
`

const CHEERIO_LINES = [
  {
    at: 4,
    code: (
      <>
        <Kw>const </Kw>
        <Fn>cheerio = </Fn>
        <Kw>require</Kw>
        <Fn>(</Fn>
        <Str>&apos;cheerio&apos;</Str>
        <Fn>)</Fn>
      </>
    )
  },
  {
    at: 8,
    code: (
      <>
        <Kw>const </Kw>
        <Fn>$ = cheerio.load(html)</Fn>
      </>
    )
  },
  {
    at: 12,
    code: (
      <>
        <Kw>return </Kw>
        <Fn>$(&apos;</Fn>
        <Str>.titleline &gt; a</Str>
        <Fn>&apos;)</Fn>
      </>
    )
  },
  {
    at: 16,
    code: <Fn>{'  .map((i, el) => $(el).text())'}</Fn>
  },
  {
    at: 20,
    code: <Fn>{'  .toArray()'}</Fn>
  }
]

const CLICK_LINES = [
  {
    at: 52,
    code: (
      <>
        <Kw>await </Kw>
        <Fn>page.click(</Fn>
        <Str>&apos;button.load-more&apos;</Str>
        <Fn>)</Fn>
      </>
    )
  },
  {
    at: 56,
    code: (
      <>
        <Kw>await </Kw>
        <Fn>page.waitForSelector(</Fn>
        <Str>&apos;.results&apos;</Str>
        <Fn>)</Fn>
      </>
    )
  },
  {
    at: 60,
    code: (
      <>
        <Kw>return </Kw>
        <Fn>page.$$eval(</Fn>
        <Str>&apos;.results li&apos;</Str>
        <Fn>,</Fn>
      </>
    )
  },
  {
    at: 64,
    code: <Fn>{'  items => items.map(el => el.textContent)'}</Fn>
  },
  {
    at: 68,
    code: <Fn>)</Fn>
  }
]

const ResultBlock = ({ at, children }) => (
  <>
    <Label as='p'>Result</Label>
    <Line $at={at}>{children}</Line>
  </>
)

export const FunctionCapabilitiesVisual = () => (
  <DemoCard
    url='news.ycombinator.com'
    maxWidth='640px'
    footer={
      <HeaderStack>
        <CycleLayer {...CHEERIO}>
          <FooterText as='span'>
            <b>✓ 30 stories</b> · cheerio · 1.1s
          </FooterText>
        </CycleLayer>
        <CycleLayer {...CLICK}>
          <FooterText as='span'>
            <b>✓ 12 items</b> · click + wait · 2.4s
          </FooterText>
        </CycleLayer>
      </HeaderStack>
    }
  >
    <Body>
      <Stage>
        <StageLayer {...CHEERIO}>
          <Panels>
            <Code>
              {CHEERIO_LINES.map(({ at, code }) => (
                <Line key={at} $at={at}>
                  {code}
                </Line>
              ))}
            </Code>
            <Result>
              <ResultBlock at={28}>
                <ResultVal>[</ResultVal>
              </ResultBlock>
              <Line $at={30}>
                <ResultStr> &quot;Show HN: …&quot;</ResultStr>
              </Line>
              <Line $at={32}>
                <ResultStr> &quot;Ask HN: …&quot;</ResultStr>
              </Line>
              <Line $at={34}>
                <ResultVal>]</ResultVal>
              </Line>
            </Result>
          </Panels>
        </StageLayer>
        <StageLayer {...CLICK}>
          <Panels>
            <Code>
              {CLICK_LINES.map(({ at, code }) => (
                <Line key={at} $at={at}>
                  {code}
                </Line>
              ))}
            </Code>
            <Result>
              <ResultBlock at={72}>
                <ResultKey>count</ResultKey>
                <ResultVal>: 12</ResultVal>
              </ResultBlock>
              <Line $at={74}>
                <ResultKey>first</ResultKey>
                <ResultVal>: </ResultVal>
                <ResultStr>&quot;Pricing&quot;</ResultStr>
              </Line>
            </Result>
          </Panels>
        </StageLayer>
      </Stage>
    </Body>
  </DemoCard>
)
