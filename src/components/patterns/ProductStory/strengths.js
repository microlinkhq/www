import { layout, theme } from 'theme'
import React from 'react'

import Container from 'components/elements/Container'
import Text from 'components/elements/Text'

import { Section, SectionHeader } from './section'
import { StoryCard, StoryCardGrid } from './story-card'

export const ProductStrengths = ({ id, title, caption, items }) => (
  <Section id={id} bg='gray0'>
    <SectionHeader title={title} caption={caption} />
    <StoryCardGrid $columns={2}>
      {items.map((item, index) => (
        <StoryCard key={item.title} index={index} {...item} />
      ))}
    </StoryCardGrid>
  </Section>
)

export const ProductTrademarks = ({ children }) => (
  <Container
    css={theme({
      justifyContent: 'center',
      pt: 0,
      pb: 5,
      maxWidth: layout.small
    })}
  >
    <Text
      as='p'
      css={theme({
        m: 0,
        color: 'black60',
        fontSize: 0,
        lineHeight: 2,
        textAlign: 'center'
      })}
    >
      {children}
    </Text>
  </Container>
)
