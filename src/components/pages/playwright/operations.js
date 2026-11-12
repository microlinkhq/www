import React from 'react'

import {
  Section,
  SectionHeader,
  StoryCard,
  StoryCardGrid
} from 'components/patterns/ProductStory'

import { ACCENT_NAME, OPERATIONS } from './shared'

export const Operations = () => (
  <Section id='playwright-in-production'>
    <SectionHeader title={OPERATIONS.title} caption={OPERATIONS.caption} />
    <StoryCardGrid $columns={3}>
      {OPERATIONS.items.map((item, index) => (
        <StoryCard
          key={item.title}
          accent={ACCENT_NAME}
          index={index}
          title={item.title}
          description={item.body}
        />
      ))}
    </StoryCardGrid>
  </Section>
)
