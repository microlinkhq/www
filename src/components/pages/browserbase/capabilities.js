import React from 'react'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { Subhead, Caption } from 'components/patterns/ProductStory'

import { CAPABILITIES, ACCENT, TILE_BG } from './shared'

const CapabilityCard = ({ icon: Icon, title, description }) => (
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
    <Flex
      css={theme({
        width: 40,
        height: 40,
        borderRadius: 3,
        bg: TILE_BG,
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3
      })}
      aria-hidden='true'
    >
      <Icon size={20} color={ACCENT} />
    </Flex>
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

export const Capabilities = () => (
  <Container
    as='section'
    id='capabilities'
    css={theme({ maxWidth: '100%', py: SECTION_VERTICAL_SPACING })}
  >
    <Box
      css={theme({ maxWidth: layout.large, mx: 'auto', textAlign: 'center' })}
    >
      <Subhead variant='gradient'>
        {`${CAPABILITIES.title} ${CAPABILITIES.titleAccent}`}
      </Subhead>
      <Caption
        forwardedAs='p'
        css={theme({ mx: 'auto', pt: [3, 3, 4, 4], maxWidth: layout.normal })}
      >
        {CAPABILITIES.caption}
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
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr']
      })}
    >
      {CAPABILITIES.items.map(item => (
        <CapabilityCard key={item.title} {...item} />
      ))}
    </Box>
  </Container>
)
