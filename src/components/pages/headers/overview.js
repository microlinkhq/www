import React from 'react'

import { OverviewSection } from 'components/patterns/FeatureStory'

import { OVERVIEW } from './shared'

export const Overview = () => (
  <OverviewSection
    body={OVERVIEW.body}
    bullets={OVERVIEW.bullets}
    sample={OVERVIEW.sample}
    sampleTitle={OVERVIEW.sampleTitle}
  />
)
