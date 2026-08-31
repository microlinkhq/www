import React from 'react'

import {
  Section,
  SectionHeader,
  StoryCard,
  StoryCardGrid
} from 'components/patterns/ProductStory'

import { ACCENT_NAME, CAPABILITIES } from './shared'

export const Capabilities = () => (
  <Section id='capabilities'>
    <SectionHeader
      title={CAPABILITIES.title}
      caption={CAPABILITIES.caption}
    />
    <StoryCardGrid $columns={3}>
      {CAPABILITIES.items.map(item => (
        <StoryCard key={item.title} accent={ACCENT_NAME} {...item} />
      ))}
    </StoryCardGrid>
  </Section>
)
