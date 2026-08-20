import { breakpoints, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import { Section, SectionHeader } from './section'
import { HONESTY } from './shared'

const Cards = styled(Box)`
  ${theme({ display: 'grid', gap: 3, width: '100%' })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Card = ({ title, body }) => (
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
        fontFamily: 'sans',
        fontSize: 2,
        fontWeight: 'bold',
        color: 'black',
        m: 0
      })}
    >
      {title}
    </Text>
    <Text css={theme({ pt: 2, fontSize: 1, color: 'black80', lineHeight: 2 })}>
      {body}
    </Text>
  </Box>
)

export const Honesty = () => (
  <Section id='scrapingbee-strengths'>
    <SectionHeader title={HONESTY.title} caption={HONESTY.caption} />
    <Cards as='ul' css={theme({ listStyle: 'none', p: 0, m: 0 })}>
      {HONESTY.items.map(item => (
        <Card key={item.title} {...item} />
      ))}
    </Cards>
  </Section>
)
