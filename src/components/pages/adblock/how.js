import React from 'react'

import { OverviewSection } from 'components/patterns/FeatureStory'

import { AdblockHowVisual } from './how-visual'
import { HOW } from './shared'

export const How = () => (
  <OverviewSection {...HOW} media={<AdblockHowVisual />} />
)
