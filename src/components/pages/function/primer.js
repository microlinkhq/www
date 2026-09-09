import React from 'react'
import { SECTION_VERTICAL_SPACING, space, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'
import { Subhead, STORY_LAYOUT } from 'components/patterns/ProductStory'

import { ACCENT, PRIMER } from './product-shared'
const Item = ({ icon: Icon, title, description }) => (
  <Flex
    as='li'
    css={theme({
      flexDirection: 'column',
      gap: 2,
      minWidth: 0,
      flex: 1
    })}
  >
    <Flex css={theme({ alignItems: 'center', gap: 2 })}>
      <Box
        aria-hidden='true'
        css={theme({
          display: 'flex',
          alignItems: 'center',
          color: 'indigo8',
          lineHeight: 0
        })}
      >
        <Icon size={20} />
      </Box>
      <Text
        as='h3'
        css={theme({
          fontWeight: 'bold',
          color: 'black',
          lineHeight: 0
        })}
      >
        {title}
      </Text>
    </Flex>
    <Text css={theme({ color: 'black60' })}>{description}</Text>
  </Flex>
)

export const FunctionPrimer = () => (
  <Container
    as='section'
    id='capabilities'
    style={{ '--capability-accent': ACCENT }}
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
          {PRIMER.title}
          <LineBreak />
          <span css={{ color: 'var(--capability-accent)' }}>
            {PRIMER.titleAccent}
          </span>
        </Subhead>
        <Text
          as='p'
          css={theme({
            maxWidth: ['100%', '100%', '100%', '720px'],
            color: 'black60'
          })}
        >
          {PRIMER.caption}
        </Text>
      </Flex>
      <Box
        as='ul'
        css={theme({
          listStyle: 'none',
          m: 0,
          p: 0,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', 'repeat(3, 1fr)'],
          gap: [4, 4, 4, 5]
        })}
      >
        {PRIMER.items.map(item => (
          <Item key={item.title} {...item} />
        ))}
      </Box>
    </Flex>
  </Container>
)
