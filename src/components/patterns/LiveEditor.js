import React, { Component } from 'react'
import { Text, Card as CardBase, Flex } from 'components/elements'
import styled from 'styled-components'

const Card = styled(CardBase)`
  &:hover {
    transform: none;
    box-shadow: 0;
  }
`

export default class extends Component {
  render () {
    return (
      <Flex flexDirection={['column', 'row']} justifyContent='center'>
        <Flex flexDirection={['row', 'column']} justifyContent='center'>
          <Text>Embed</Text>
          <Text>Embed</Text>
          <Text>Embed</Text>
          <Text>Embed</Text>
        </Flex>
        <Flex
          width='100%'
          flexDirection={['column', 'row']}
          justifyContent='space-between'
          mx={3}
        >
          <Card width='338.6808px' height='223.2px' />
          <Card width='338.6808px' height='223.2px' />
        </Flex>
        <Flex flexDirection={['row', 'column']} justifyContent='center'>
          <Text>Embed</Text>
          <Text>Embed</Text>
          <Text>Embed</Text>
          <Text>Embed</Text>
        </Flex>
      </Flex>
    )
  }
}
