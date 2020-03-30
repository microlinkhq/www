import React from 'react'
import { Block, Caption } from 'components/patterns'
import { Box, Caps, Flex, Heading } from 'components/elements'
import { useAnalytics } from 'components/hook'
import styled from 'styled-components'
import theme from 'theme'

const Separator = styled(Box)`
  border-right: 1px solid ${theme.colors.white20};
  width: 1px;
`

export default props => {
  const { reqs_pretty: reqsPretty, bytes_pretty: bytesPretty } = useAnalytics()

  const bytes = (() => {
    const [value, unit] = bytesPretty.split(' ')
    const fixedValue = Number(value).toFixed(0)
    return `${fixedValue}${unit}`
  })()

  const stats = [
    { value: 250, name: 'CDN Edges' },
    { value: reqsPretty, name: 'reqs per month' },
    { value: bytes, name: 'data served' },
    { value: '99.9%', name: 'uptime' }
  ]

  const blockOne = (
    <Flex
      as='section'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Heading color='white' variant={null} fontWeight='light'>
        Speed as a Feature
      </Heading>
      <Caption color='white' variant={null} fontWeight='light'>
        Always fast. Always online. Always a hit.
      </Caption>
    </Flex>
  )

  const Stat = ({ value, name, isLast }) => (
    <Flex>
      <Flex alignItems='center' flexDirection='column'>
        <Heading as='div' color='white' variant={null} fontWeight='bold'>
          {value}
        </Heading>
        <Caption
          color='white'
          fontWeight='normal'
          titleize={false}
          fontSize={5}
        >
          <Caps>{name}</Caps>
        </Caption>
      </Flex>
      {!isLast && <Separator mx={4} />}
    </Flex>
  )

  const blockTwo = (
    <Flex pt={[3, 3, 5, 5]} width='100%' justifyContent='space-around'>
      {stats.map((stat, index) => (
        <Stat key={stat.name} isLast={index === stats.length - 1} {...stat} />
      ))}
    </Flex>
  )

  return (
    <Block
      id='analytics'
      flexDirection='column'
      blockOne={blockOne}
      blockTwo={blockTwo}
      {...props}
    />
  )
}
