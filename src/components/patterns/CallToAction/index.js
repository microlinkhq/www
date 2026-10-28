import React from 'react'
import styled, { keyframes } from 'styled-components'
import { SECTION_VERTICAL_SPACING, colors, layout, theme } from 'theme'
import { Check as CheckIcon } from 'react-feather'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'
import { SignupLink } from 'components/patterns/SignupLink'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'

const CTA_DURATION = 6.2
const CTA_SWEEP_PCT = (1.2 / CTA_DURATION) * 100
const CTA_LEAD_TEXT = 'Start'
const CTA_LEAD_CHARS = CTA_LEAD_TEXT.split('').map((char, index) => ({
  char,
  charKey: `${char}${index}`,
  index
}))
const CTA_CHAR_PCT = CTA_SWEEP_PCT / CTA_LEAD_CHARS.length

const FREE_KEY_PERKS = [
  'Free API key',
  `${FREE_PLAN_REQUESTS_PER_DAY} requests/day`,
  'No credit card'
]

const sweepChar = (index, accent) => {
  const on = index * CTA_CHAR_PCT
  const off = on + CTA_CHAR_PCT
  return keyframes`
    0%, ${on}%, ${off}%, 100% { color: inherit; }
    ${on + 0.01}%, ${off - 0.01}% { color: ${accent}; }
  `
}

const sweepNow = accent => keyframes`
  0%, ${CTA_SWEEP_PCT}% { color: inherit; }
  ${CTA_SWEEP_PCT + 0.01}%, 100% { color: ${accent}; }
`

const CtaChar = styled('span')`
  animation: ${({ $i, $accent }) => sweepChar($i, $accent)} ${CTA_DURATION}s
    step-end infinite;
`

const CtaNow = styled('span')`
  animation: ${({ $accent }) => sweepNow($accent)} ${CTA_DURATION}s step-end
    infinite;
`

export const CallToAction = ({ id, accent, outcome, cta, children }) => (
  <Container
    as='section'
    id={id}
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto'
      })}
    >
      <Subhead
        css={theme({
          textAlign: 'center'
        })}
      >
        {CTA_LEAD_CHARS.map(({ char, charKey, index }) => (
          <CtaChar key={charKey} $i={index} $accent={accent}>
            {char}
          </CtaChar>
        ))}{' '}
        <CtaNow $accent={accent}>now</CtaNow>
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center'
        })}
      >
        Sign up for a free API key: {FREE_PLAN_REQUESTS_PER_DAY}&nbsp;requests
        per day with every Pro feature, no credit card. Add it to the request
        and start {outcome} in seconds.
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center'
        })}
      >
        <SignupLink
          cta={cta}
          css={theme({ fontSize: ['24px', '28px', '30px', '32px'] })}
        >
          Get your free API key
        </SignupLink>
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {FREE_KEY_PERKS.map(label => (
          <Flex
            key={label}
            css={theme({
              alignItems: 'center',
              gap: 1,
              color: 'black80',
              fontSize: [0, 0, 1, 1]
            })}
          >
            <CheckIcon size={16} color={colors.close} />
            <Text as='span'>{label}</Text>
          </Flex>
        ))}
      </Flex>
      {children && <Box css={theme({ pt: [4, 4, 5, 5] })}>{children}</Box>}
    </Flex>
  </Container>
)
