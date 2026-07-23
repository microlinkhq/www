import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'

import { Eyebrow } from 'components/patterns/FeatureStory'

export const SectionIntro = ({ eyebrow, title, children }) => (
  <Box css={theme({ maxWidth: layout.large })}>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{eyebrow}</Eyebrow>
    <Subhead css={theme({ textAlign: 'left' })}>{title}</Subhead>
    {children}
  </Box>
)
