import React from 'react'

import { RelatedFeaturesSection } from 'components/patterns/FeatureStory'

import { RELATED } from './shared'

export const Related = () => (
  <RelatedFeaturesSection
    slug='antibot'
    relatedSlugs={RELATED.relatedSlugs}
    title={RELATED.title}
  />
)
