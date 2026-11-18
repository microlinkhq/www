import React from 'react'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'

import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'

import { EDITOR_FRAME, HeroActions, HeroEditor } from './hero-parts'
import {
  Heading,
  Caption,
  STORY_LAYOUT,
  CENTERED_TO_LEFT,
  CENTERED_TO_START
} from './shared'

export const ProductHero = ({ title, description, ...props }) => (
  <Container
    as='section'
    id='hero'
    css={theme({
      alignItems: 'center',
      width: '100%',
      maxWidth: '100%',
      pt: [4, 4, 4, 5],
      pb: SECTION_VERTICAL_SPACING,
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: STORY_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['center', 'center', 'center', 'stretch'],
        gap: STORY_LAYOUT.gap
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', STORY_LAYOUT.secondaryWidth],
          justifyContent: 'center',
          alignItems: CENTERED_TO_START
        })}
      >
        <Heading
          css={theme({
            px: [2, 3, 4, 0],
            maxWidth: ['100%', '100%', '100%', '640px'],
            textAlign: CENTERED_TO_LEFT
          })}
        >
          {title}
        </Heading>
        <Caption
          forwardedAs='h2'
          css={theme({
            pt: [3, 3, 4, 4],
            px: [1, 2, 4, 0],
            maxWidth: ['100%', layout.small, layout.small, '640px'],
            textAlign: CENTERED_TO_LEFT
          })}
        >
          {description}
        </Caption>
        <Flex css={theme({ px: [4, 4, 4, 0], width: '100%' })}>
          <HeroActions {...props} justifyContent={CENTERED_TO_START} />
        </Flex>
      </Flex>
      <Flex
        css={theme({
          width: ['100%', '100%', '100%', STORY_LAYOUT.mainWidth],
          pt: [4, 4, 5, 0],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Flex
          css={[
            theme({
              width: ['100%', '100%', '85%', '100%'],
              justifyContent: 'center',
              pt: [0, 0, 4, 4],
              pb: [4, 4, 4, 5],
              px: [2, 3, 0, 0]
            }),
            EDITOR_FRAME
          ]}
        >
          <HeroEditor {...props} />
        </Flex>
      </Flex>
    </Flex>
  </Container>
)
