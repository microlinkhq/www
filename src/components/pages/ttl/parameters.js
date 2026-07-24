import React from 'react'

import { ParamsSection } from 'components/patterns/FeatureStory'

import { PARAMS } from './shared'

export const Parameters = () => (
  <ParamsSection rows={PARAMS.rows} docsHref={PARAMS.docsHref} />
)
