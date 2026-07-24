import React from 'react'

import { FeatureFaqSection } from 'components/patterns/FeatureStory'

import { FAQ_ITEMS } from './shared'

export { FAQ_ITEMS }

export const FaqSection = () => (
  <FeatureFaqSection
    questions={FAQ_ITEMS}
    moreHref='/docs/api/getting-started/overview'
  />
)
