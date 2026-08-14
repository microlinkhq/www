import React from 'react'

import { OverviewSection } from 'components/patterns/FeatureStory'

import { AdblockCompare } from './compare'
import { OVERVIEW } from './shared'

export const Overview = () => (
  <OverviewSection {...OVERVIEW} media={<AdblockCompare />} />
)
