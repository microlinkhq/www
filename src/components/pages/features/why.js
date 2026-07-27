import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { Eyebrow, FeatureSection } from 'components/patterns/FeatureStory'

import { SectionTitle } from './section-title'
import { WHY } from './shared'

export const Why = () => (
  <FeatureSection id='why'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{WHY.eyebrow}</Eyebrow>
    <SectionTitle>{WHY.title}</SectionTitle>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: [
          'minmax(0, 1fr)',
          'minmax(0, 1fr)',
          'repeat(2, minmax(0, 1fr))',
          'repeat(2, minmax(0, 1fr))'
        ],
        gap: [4, 4, 5, 5]
      })}
    >
      {WHY.items.map(({ title, description }) => (
        <Box key={title} css={theme({ minWidth: 0, maxWidth: layout.normal })}>
          <Text
            as='h3'
            css={theme({
              fontFamily: 'sans',
              fontWeight: 'bold',
              fontSize: 2,
              color: 'black',
              pb: 2,
              m: 0
            })}
          >
            {title}
          </Text>
          <Text
            css={theme({
              fontFamily: 'sans',
              fontSize: [1, 1, 2, 2],
              color: 'black70',
              lineHeight: 2
            })}
          >
            {description}
          </Text>
        </Box>
      ))}
    </Box>
  </FeatureSection>
)
