import { accentBorder, accentText, accentTile, breakpoints, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

import { Section, SectionHeader } from './section'
import { HONESTY } from './shared'

const ACCENT_NAME = 'cyan'

const Cards = styled(Box)`
  ${theme({ display: 'grid', gap: [3, 3, 4, 4], width: '100%' })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const CardBox = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: accentBorder(ACCENT_NAME),
    borderRadius: 3,
    boxShadow: 1,
    p: [3, 3, 4, 4]
  })}

  @media (prefers-reduced-motion: no-preference) {
    transition: box-shadow 0.25s ease, transform 0.25s ease;

    &:hover {
      ${theme({ boxShadow: 3 })}
      transform: translateY(-2px);
    }
  }
`

const Index = styled(Text)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  ${theme({
    bg: accentTile(ACCENT_NAME),
    color: accentText(ACCENT_NAME),
    borderRadius: 5,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    lineHeight: 0
  })}
`

const Card = ({ index, title, body }) => (
  <CardBox as='li'>
    <Index aria-hidden='true'>{String(index + 1).padStart(2, '0')}</Index>
    <Text
      as='h3'
      css={theme({
        pt: 3,
        m: 0,
        fontFamily: 'sans',
        fontSize: 2,
        fontWeight: 'bold',
        color: 'black'
      })}
    >
      {title}
    </Text>
    <Text css={theme({ pt: 2, fontSize: 1, color: 'black70', lineHeight: 2 })}>
      {body}
    </Text>
  </CardBox>
)

export const Honesty = () => (
  <Section id='scrapingbee-strengths' bg='gray0'>
    <SectionHeader title={HONESTY.title} caption={HONESTY.caption} />
    <Cards as='ul' css={theme({ listStyle: 'none', p: 0, m: 0 })}>
      {HONESTY.items.map((item, index) => (
        <Card key={item.title} index={index} {...item} />
      ))}
    </Cards>
  </Section>
)
