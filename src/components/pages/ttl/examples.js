import React from 'react'

import { ExamplesSection } from 'components/patterns/FeatureStory'

import { EXAMPLES } from './shared'

export const Examples = () => (
  <ExamplesSection
    eyebrow={EXAMPLES.eyebrow}
    title={EXAMPLES.title}
    panels={EXAMPLES.panels}
  />
)
