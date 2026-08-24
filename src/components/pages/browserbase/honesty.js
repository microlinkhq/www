import React from 'react'
import { SECTION_VERTICAL_SPACING, borders, colors, layout, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Text from 'components/elements/Text'

import { Subhead, Caption } from 'components/patterns/ProductStory'

import { HONESTY } from './shared'

const HonestyItem = ({ title, description }) => (
  <Box
    as='li'
    css={theme({
      bg: 'white',
      border: 1,
      borderColor: 'black10',
      borderRadius: 3,
      p: [3, 3, 4, 4]
    })}
  >
    <Text
      as='h3'
      css={theme({
        m: 0,
        fontFamily: 'sans',
        fontSize: 2,
        fontWeight: 'bold',
        color: 'black'
      })}
    >
      {title}
    </Text>
    <Text
      css={theme({
        m: 0,
        pt: 2,
        fontFamily: 'sans',
        fontSize: 1,
        lineHeight: 2,
        color: 'black80'
      })}
    >
      {description}
    </Text>
  </Box>
)

export const Honesty = () => (
  <Box
    as='section'
    id='when-browserbase'
    css={theme({
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`,
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Container css={theme({ maxWidth: '100%' })}>
      <Box
        css={theme({ maxWidth: layout.large, mx: 'auto', textAlign: 'center' })}
      >
        <Subhead variant='gradient'>{HONESTY.title}</Subhead>
        <Caption
          forwardedAs='p'
          css={theme({ mx: 'auto', pt: [3, 3, 4, 4], maxWidth: layout.normal })}
        >
          {HONESTY.caption}
        </Caption>
      </Box>
      <Box
        as='ul'
        css={theme({
          listStyle: 'none',
          p: 0,
          m: 0,
          mx: 'auto',
          pt: [4, 4, 5, 5],
          maxWidth: layout.large,
          display: 'grid',
          gap: [3, 3, 4, 4],
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr']
        })}
      >
        {HONESTY.items.map(item => (
          <HonestyItem key={item.title} {...item} />
        ))}
      </Box>
    </Container>
  </Box>
)
