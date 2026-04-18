import React from 'react'
import styled, { keyframes } from 'styled-components'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import CaptionBase from 'components/patterns/Caption/Caption'
import { withTitle } from 'helpers/hoc/with-title'
import { colors, layout, theme } from 'theme'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const CTA_DURATION = 6.2
const CTA_SWEEP_PCT = (1.2 / CTA_DURATION) * 100
const CTA_LEAD_TEXT = 'Start'
const CTA_LEAD_CHARS = CTA_LEAD_TEXT.split('')
const CTA_CHAR_PCT = CTA_SWEEP_PCT / CTA_LEAD_CHARS.length

const ctaCharAnim = index => {
  const on = index * CTA_CHAR_PCT
  const off = on + CTA_CHAR_PCT
  return keyframes`
    0%, ${on}%, ${off}%, 100% { color: inherit; }
    ${on + 0.01}%, ${off - 0.01}% { color: ${colors.pink7}; }
  `
}

const ctaAnims = Array.from({ length: CTA_LEAD_CHARS.length }, (_, i) =>
  ctaCharAnim(i)
)

const CtaChar = styled('span')`
  animation: ${({ $i }) => ctaAnims[$i]} ${CTA_DURATION}s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ctaNowAnim = keyframes`
  0%, ${CTA_SWEEP_PCT}% { color: inherit; }
  ${CTA_SWEEP_PCT + 0.01}%, 100% { color: ${colors.pink7}; }
`

const CtaNow = styled('span')`
  animation: ${ctaNowAnim} ${CTA_DURATION}s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    color: ${colors.pink7};
  }
`

const Cta = () => (
  <Container
    as='section'
    id='final-cta'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4]
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        textAlign: 'center'
      })}
    >
      <Subhead
        titleize={false}
        css={theme({
          fontSize: ['34px', '42px', '54px', '62px'],
          textAlign: 'center'
        })}
      >
        {CTA_LEAD_CHARS.map((char, i) => (
          <CtaChar key={i} $i={i}>
            {char}
          </CtaChar>
        ))}{' '}
        <CtaNow>now</CtaNow>.
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2]
        })}
      >
        Free forever plan, no credit card. Pro plans start at €39/month — cancel
        anytime.
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          flexDirection: ['column', 'row', 'row', 'row'],
          gap: [2, 3, 3, 3],
          alignItems: 'center',
          justifyContent: 'center'
        })}
      >
        <Button
          as='a'
          href='/docs/api/getting-started/overview'
          variant='black'
          data-event-location='Pricing'
          data-event-name='Final CTA · Get started free'
        >
          <Caps css={theme({ fontSize: [0, 0, 1, 1] })}>Get started free</Caps>
        </Button>
        <Button
          as='a'
          href='mailto:hello@microlink.io?subject=Microlink%20Enterprise&body=Hello%2C%20I%20want%20to%20learn%20more%20about%20Microlink%20Enterprise.'
          variant='white'
          data-event-location='Pricing'
          data-event-name='Final CTA · Talk to sales'
        >
          <Caps css={theme({ fontSize: [0, 0, 1, 1] })}>Talk to sales</Caps>
        </Button>
      </Flex>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <Text css={theme({ fontSize: 0, color: 'black60' })}>
          Questions?{' '}
          <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>
        </Text>
      </Box>
    </Flex>
  </Container>
)

export default Cta
