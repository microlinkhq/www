import React from 'react'

import { OverviewSection } from 'components/patterns/FeatureStory'

import { IsolationPrimerVisual } from './primer-visual'
import { OVERVIEW } from './shared'

export const Overview = () => (
  <OverviewSection {...OVERVIEW} media={<IsolationPrimerVisual />} />
)
