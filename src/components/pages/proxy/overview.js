import React from 'react'

import { OverviewSection } from 'components/patterns/FeatureStory'

import { OVERVIEW } from './shared'

export const Overview = () => (
  <OverviewSection
    eyebrow={OVERVIEW.eyebrow}
    title={OVERVIEW.title}
    body={OVERVIEW.body}
    bullets={OVERVIEW.bullets}
  />
)
