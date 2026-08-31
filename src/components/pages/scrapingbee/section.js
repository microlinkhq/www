import {
  SECTION_VERTICAL_SPACING,
  layout,
  space,
  textGradient,
  theme
} from 'theme'
import React from 'react'
import styled, { css } from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import { Subhead } from 'components/patterns/ProductStory'

export const GradientText = styled('span')`
  ${css`
    ${textGradient}
  `}
`

export const Section = ({ id, bg, bordered, children }) => (
  <Box
    as='section'
    id={id}
    css={theme({
      ...(bg ? { bg } : null),
      ...(bordered
        ? {
            borderTop: 1,
            borderTopColor: 'black05',
            borderBottom: 1,
            borderBottomColor: 'black05'
          }
        : null),
      width: '100%',
      px: [3, 3, 4, 4],
      py: SECTION_VERTICAL_SPACING,
      scrollMarginTop: space[5]
    })}
  >
    <Box css={theme({ width: '100%', maxWidth: layout.large, mx: 'auto' })}>
      {children}
    </Box>
  </Box>
)

export const SectionHeader = ({ title, caption }) => (
  <Box css={theme({ pb: [4, 4, 5, 5], textAlign: 'center' })}>
    <Subhead titleize={false}>{title}</Subhead>
    {caption && (
      <Text
        css={theme({
          pt: [3, 3, 4, 4],
          mx: 'auto',
          maxWidth: layout.normal,
          color: 'black60'
        })}
      >
        {caption}
      </Text>
    )}
  </Box>
)

export const SectionNote = ({ children }) => (
  <Text
    css={theme({
      pt: [3, 3, 4, 4],
      mx: 'auto',
      maxWidth: layout.normal,
      fontFamily: 'mono',
      fontSize: 0,
      color: 'black40',
      lineHeight: 2,
      textAlign: 'center'
    })}
  >
    {children}
  </Text>
)
