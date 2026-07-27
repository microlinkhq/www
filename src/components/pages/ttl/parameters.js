import React from 'react'

import { ParamsSection } from 'components/patterns/FeatureStory'

import { PARAMS } from './shared'

export const Parameters = () => (
  <ParamsSection
    eyebrow={PARAMS.eyebrow}
    title={PARAMS.title}
    rows={PARAMS.rows}
    docsHref={PARAMS.docsHref}
  />
)
