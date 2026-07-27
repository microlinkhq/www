import React from 'react'

import { RelatedFeaturesSection } from 'components/patterns/FeatureStory'

import { RELATED } from './shared'

export const Related = () => (
  <RelatedFeaturesSection
    slug='proxy'
    relatedSlugs={RELATED.relatedSlugs}
    title={RELATED.title}
  />
)
