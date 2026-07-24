import React from 'react'

import { FeatureHero } from 'components/patterns/FeatureStory'

import { HERO, HeroMark } from './shared'

export const Hero = () => (
  <FeatureHero
    name={HERO.name}
    title={HERO.title}
    description={HERO.description}
    primaryCta={HERO.primaryCta}
    secondaryCta={HERO.secondaryCta}
    plans={HERO.plans}
    heroMark={<HeroMark />}
  />
)
