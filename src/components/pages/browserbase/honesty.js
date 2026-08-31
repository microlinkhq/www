import React from 'react'

import {
  Section,
  SectionHeader,
  StoryCard,
  StoryCardGrid
} from 'components/patterns/ProductStory'

import { ACCENT_NAME, HONESTY } from './shared'

export const Honesty = () => (
  <Section id='when-browserbase' bg='gray0'>
    <SectionHeader title={HONESTY.title} caption={HONESTY.caption} />
    <StoryCardGrid $columns={2}>
      {HONESTY.items.map((item, index) => (
        <StoryCard
          key={item.title}
          accent={ACCENT_NAME}
          index={index}
          {...item}
        />
      ))}
    </StoryCardGrid>
  </Section>
)
