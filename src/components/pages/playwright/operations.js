import React from 'react'

import {
  Section,
  SectionHeader,
  StoryCard,
  StoryCardGrid
} from 'components/patterns/ProductStory'

import { OPERATIONS } from './shared'

export const Operations = () => (
  <Section id='playwright-in-production'>
    <SectionHeader title={OPERATIONS.title} caption={OPERATIONS.caption} />
    <StoryCardGrid $columns={3}>
      {OPERATIONS.items.map((item, index) => (
        <StoryCard
          key={item.title}
          index={index}
          title={item.title}
          description={item.body}
          descriptionColor='black'
        />
      ))}
    </StoryCardGrid>
  </Section>
)
