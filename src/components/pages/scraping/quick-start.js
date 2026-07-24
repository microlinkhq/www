import React from 'react'

import { QuickStartSection } from 'components/patterns/FeatureStory'

import { LANGUAGES, QUICK_START } from './shared'

export const QuickStart = () => (
  <QuickStartSection
    languages={LANGUAGES}
    description={QUICK_START.description}
    playgroundHref={QUICK_START.playgroundHref}
    playgroundLabel={QUICK_START.playgroundLabel}
  />
)
