import { theme } from 'theme'
import React from 'react'

import Subhead from 'components/elements/Subhead'

import { Eyebrow, FeatureSection } from 'components/patterns/FeatureStory'

import { EXAMPLES } from './shared'
import { UseCaseSwitcher } from './use-cases'

export const Examples = () => (
  <FeatureSection id='examples'>
    <Eyebrow>Examples</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      {EXAMPLES.title}
    </Subhead>
    <UseCaseSwitcher panels={EXAMPLES.panels} />
  </FeatureSection>
)
