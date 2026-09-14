import React from 'react'
import styled from 'styled-components'
import { breakpoints, shadows, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'
import List from 'components/patterns/List/List'

import { START, SectionBlock } from './shared'

const Card = styled(Box)(
  theme({
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 4,
    p: [4, 4, 4, 4],
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: shadows[1]
  })
)

const Cards = styled(Box)`
  ${theme({
    display: 'grid',
    gap: 4,
    width: '100%'
  })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Path = ({ title, body, href, label, items }) => (
  <Card>
    <Text
      as='h3'
      css={theme({
        m: 0,
        fontWeight: 'bold',
        color: 'black'
      })}
    >
      {title}
    </Text>
    <Text
      css={theme({
        pt: 3,
        color: 'black70',
        lineHeight: 2,
        flex: 1
      })}
    >
      {body}
    </Text>
    <List css={theme({ pt: 4 })}>
      {items.map((item, index) => (
        <List.Item
          key={item}
          isLast={index === items.length - 1}
          css={theme({
            m: 0,
            mb: 0,
            color: 'black80',
            fontSize: 1
          })}
        >
          {item}
        </List.Item>
      ))}
    </List>
    <Flex css={theme({ pt: 4 })}>
      <ArrowLink href={href}>{label}</ArrowLink>
    </Flex>
  </Card>
)

export const Start = () => (
  <SectionBlock
    id='start'
    bg='pinky'
    title={START.title}
    caption='The same API either way. The difference is how you buy it and who answers when you write.'
  >
    <Cards>
      <Path {...START.selfServe} />
      <Path {...START.extra} />
    </Cards>
  </SectionBlock>
)
