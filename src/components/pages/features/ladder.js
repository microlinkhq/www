import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { Eyebrow, FeatureSection } from 'components/patterns/FeatureStory'

import { SectionTitle } from './section-title'
import { LADDER } from './shared'

export const Ladder = () => (
  <FeatureSection id='ladder'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>{LADDER.eyebrow}</Eyebrow>
    <SectionTitle>{LADDER.title}</SectionTitle>
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: [1, 1, 2, 2],
        color: 'black70',
        lineHeight: 2,
        pb: [3, 3, 4, 4],
        maxWidth: layout.normal
      })}
    >
      {LADDER.body}
    </Text>
    <Box
      as='ol'
      css={theme({
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: [3, 3, 4, 4]
      })}
    >
      {LADDER.rungs.map(({ title, description }, index) => (
        <Box
          as='li'
          key={title}
          css={theme({
            p: [3, 3, 4, 4],
            border: 1,
            borderColor: 'gray2',
            borderRadius: 3,
            bg: 'white',
            minWidth: 0
          })}
        >
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
            <Text
              as='span'
              css={theme({
                fontFamily: 'mono',
                fontSize: 0,
                color: 'secondary',
                pr: 2
              })}
            >
              {String(index + 1).padStart(2, '0')}
            </Text>
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
