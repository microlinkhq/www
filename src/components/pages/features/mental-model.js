import { layout, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  ACCENT,
  Eyebrow,
  FeatureSection
} from 'components/patterns/FeatureStory'

import { SectionTitle } from './section-title'
import { MENTAL_MODEL } from './shared'

export const MentalModel = () => (
  <FeatureSection id='mental-model'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>
      {MENTAL_MODEL.eyebrow}
    </Eyebrow>
    <SectionTitle>{MENTAL_MODEL.title}</SectionTitle>
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
      {MENTAL_MODEL.body}
    </Text>
    <Box
      as='ol'
      css={theme({
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: [4, 4, 5, 5]
      })}
    >
      {MENTAL_MODEL.steps.map(({ title, description }, index) => (
        <Flex
          as='li'
          key={title}
          css={theme({ gap: 3, alignItems: 'flex-start', minWidth: 0 })}
        >
          <Flex
            aria-hidden='true'
            css={theme({
              width: '40px',
              height: '40px',
              borderRadius: 2,
              bg: ACCENT.bgSoft,
              border: 1,
              borderColor: ACCENT.bgEdge,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'secondary',
              flexShrink: 0
            })}
          >
            <Text
              css={theme({
                fontFamily: 'mono',
                fontSize: 0,
                fontWeight: 'bold'
              })}
            >
              {String(index + 1).padStart(2, '0')}
            </Text>
          </Flex>
          <Box css={theme({ minWidth: 0, pt: 1 })}>
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
                lineHeight: 2,
                maxWidth: layout.normal
              })}
            >
              {description}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  </FeatureSection>
)
