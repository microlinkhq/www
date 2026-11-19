import React from 'react'
import styled from 'styled-components'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'

import { GradientText } from './section'

export const AlternativeSection = styled(Box)`
  ${theme({
    py: SECTION_VERTICAL_SPACING,
    px: [3, 3, 4, 4]
  })}
`

export const AlternativeSectionInner = styled(Container)`
  ${theme({
    maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
    alignItems: 'center',
    pt: 0,
    px: 0
  })}
`

export const AlternativePricingTitle = ({ lead, highlight }) => (
  <>
    {lead}
    <br />
    <GradientText>{highlight}</GradientText>
  </>
)
