import { rgba } from 'polished'
import { colors, layout, theme } from 'theme'
import React from 'react'
import { Check } from 'react-feather'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { withTitle } from 'helpers/hoc/with-title'

const Subhead = withTitle(SubheadBase)

const hexToRgb = hex => {
  const h = hex.replace('#', '')
  const full =
    h.length === 3
      ? h
        .split('')
        .map(c => c + c)
        .join('')
      : h
  const int = parseInt(full, 16)
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

// Perceived luminance (0–1). Near-black brand colors (e.g. TikTok #010101)
// produce an almost-invisible tint, so we fall back to neutral grays.
const luminance = hex => {
  const [r, g, b] = hexToRgb(hex)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

const accentStyle = accentColor => {
  if (!accentColor || luminance(accentColor) < 0.2) {
    return { iconColor: colors.black80, badgeBg: colors.black05 }
  }
  return { iconColor: accentColor, badgeBg: rgba(accentColor, 0.12) }
}

const Badge = styled(Flex).withConfig({
  shouldForwardProp: prop => !['$bg'].includes(prop)
})`
  ${theme({
    width: '44px',
    height: '44px',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  })}
  flex-shrink: 0;
  background: ${({ $bg }) => $bg};
`

const WhyChoose = ({ heading, reasons, accentColor }) => {
  const { iconColor, badgeBg } = accentStyle(accentColor)

  return (
    <Container
      as='section'
      id='why-choose'
      css={theme({
        alignItems: 'center',
        pb: [4, 4, 5, 5],
        pt: [4, 4, 5, 5],
        mt: [3, 3, 4, 4]
      })}
    >
      <Subhead css={theme({ fontSize: [3, '30px', '35px', '45px'] })}>
        {heading}
      </Subhead>
      <Box
        css={theme({
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
          gap: [4, 4, '40px 48px', '40px 48px'],
          pt: [4, 4, 5, 5],
          width: '100%',
          maxWidth: [layout.normal, layout.normal, layout.large, layout.large]
        })}
      >
        {reasons.map(({ title, description }) => (
          <Flex
            key={title}
            css={theme({ gap: 3, alignItems: 'flex-start', textAlign: 'left' })}
          >
            <Badge $bg={badgeBg}>
              <Check size={20} color={iconColor} aria-hidden='true' />
            </Badge>
            <Box>
              <Text
                as='h3'
                css={theme({
                  fontWeight: 'bold',
                  color: 'black80',
                  fontSize: 2,
                  pb: 1
                })}
              >
                {title}
              </Text>
              <Text
                css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}
              >
                {description}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
    </Container>
  )
}

export default WhyChoose
