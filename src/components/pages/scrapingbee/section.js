import { SECTION_VERTICAL_SPACING, layout, space, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'

import { Subhead, Caption } from 'components/patterns/ProductStory'

export const Section = ({ id, bg, children }) => (
  <Box
    as='section'
    id={id}
    css={theme({
      ...(bg ? { bg } : null),
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
  <Box css={theme({ pb: [4, 4, 5, 5] })}>
    <Subhead css={theme({ textAlign: 'left' })}>{title}</Subhead>
    {caption && (
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({ pt: [3, 3, 4, 4], textAlign: 'left' })}
      >
        {caption}
      </Caption>
    )}
  </Box>
)

export const Scroller = ({ children }) => (
  <Box
    css={theme({
      width: '100%',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch'
    })}
  >
    {children}
  </Box>
)
