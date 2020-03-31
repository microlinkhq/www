import React from 'react'
import { Block, Caption } from 'components/patterns'
import { Hide, Box, Caps, Flex, Heading } from 'components/elements'
import { useAnalytics } from 'components/hook'
import styled from 'styled-components'
import theme from 'theme'
import take from 'lodash/take'

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
      <Heading color='white' variant={null}>
        Speed as a Feature
      </Heading>
      <Caption color='white80' variant={null}>
        Always fast. Always online. Always a hit.
      </Caption>
    </Flex>
  )

  const Stat = ({ value, name, isLast }) => (
    <Flex>
      <Flex alignItems='center' flexDirection='column'>
        <Heading as='div' color='white' variant={null}>
          {value}
        </Heading>
        <Caption
          color='white'
          fontWeight='normal'
          titleize={false}
          fontSize={[2, 2, 6, 6]}
        >
          <Caps color='white80'>{name}</Caps>
        </Caption>
      </Flex>
      {!isLast && <Separator mt={[1, 1, 0, 0]} mx={[3, 3, 4, 4]} />}
    </Flex>
  )

  const blockTwo = (
    <>
      <Hide breakpoints={[0, 1]}>
        <Flex pt={[3, 3, 5, 5]} width='100%' justifyContent='space-around'>
          {stats.map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 1}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <Flex pt={[3, 3, 5, 5]} width='100%' justifyContent='space-around'>
          {take(stats, stats.length - 1).map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 2}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
    </>
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
