import React from 'react'

import { ExamplesSection } from 'components/patterns/FeatureStory'

import { EXAMPLES } from './shared'

export const Examples = () => (
  <ExamplesSection examples={EXAMPLES.items} moreHref={EXAMPLES.moreHref} />
)
