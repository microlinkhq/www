import React from 'react'
import { SECTION_VERTICAL_SPACING, space, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'

import { Subhead, STORY_LAYOUT } from './shared'

export const ProductPrimer = ({
  id = 'primer',
  accent,
  title,
  titleAccent,
  caption,
  visual
}) => (
  <Container
    as='section'
    id={id}
    style={{ '--capability-accent': accent }}
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      px: [3, 3, 4, 5],
      py: SECTION_VERTICAL_SPACING,
      scrollMarginTop: space[5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: STORY_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: [4, 4, 5, 5]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          gap: [3, 3, 4, 4]
        })}
      >
        <Subhead titleize={false}>
          {title}
          <LineBreak />
          <span css={{ color: 'var(--capability-accent)' }}>{titleAccent}</span>
        </Subhead>
        <Text
          as='p'
          css={theme({
            maxWidth: ['100%', '100%', '100%', '720px'],
            color: 'black60'
          })}
        >
          {caption}
        </Text>
      </Flex>
      <Box css={theme({ width: '100%' })}>{visual}</Box>
    </Flex>
  </Container>
)
