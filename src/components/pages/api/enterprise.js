import React from 'react'
import styled from 'styled-components'
import { breakpoints, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'

import { ENTERPRISE_ITEMS, SectionBlock } from './shared'

const Cards = styled(Box).attrs({ as: 'ul' })`
  ${theme({
    display: 'grid',
    gap: [4, 4, 4, 4],
    width: '100%',
    listStyle: 'none',
    p: 0,
    m: 0
  })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const Enterprise = () => (
  <SectionBlock
    id='enterprise'
    title='Enterprise API controls, contracts, and support'
    caption='Business is the Pro API, bought the way your company buys. Enterprise is the same API on hardware that serves only you.'
  >
    <Cards>
      {ENTERPRISE_ITEMS.map(item => (
        <Box as='li' key={item.title} css={theme({ minWidth: 0 })}>
          <Text
            as='h3'
            css={theme({
              m: 0,
              fontWeight: 'bold',
              color: 'black'
            })}
          >
            {item.title}
          </Text>
          <Text
            css={theme({
              pt: 2,
              color: 'black70',
              fontSize: 1,
              lineHeight: 2
            })}
          >
            {item.description}
          </Text>
        </Box>
      ))}
    </Cards>
    <Flex css={theme({ pt: [4, 4, 5, 5] })}>
      <ArrowLink href='/enterprise'>Business & Enterprise</ArrowLink>
    </Flex>
  </SectionBlock>
)
