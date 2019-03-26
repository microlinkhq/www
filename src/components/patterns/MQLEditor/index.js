import React, { Component } from 'react'
import styled from 'styled-components'
import { CodeEditor, Card as CardBase, Flex, Text } from 'components/elements'
import { colors } from 'theme'

import {
  CARD_HEIGHT_DESKTOP,
  CARD_WIDTH_DESKTOP,
  CARD_WIDTH_MOBILE,
  CARD_HEIGHT_MOBILE
} from '../LiveDemo/theme'

const Card = styled(CardBase)`
  &&& {
    box-shadow: 0 10px 40px -10px ${colors.gray1};
    transition: none;
    &:hover {
      transform: none;
      box-shadow: 0;
    }
    &:focus {
      box-shadow: none;
    }
  }
`

const CODE = {
  HTTP: `
  const { status, data } = await mql('https://kikobeats.com', {
    palette: true,
    rules: {
      avatar: {
        type: 'image',
        selectors: [
          {
            selector: '#avatar',
            attr: 'href'
          }
        ]
      }
    }
  })`,
  GraphQL: `
  const { status, data } = await mql('https://kikobeats.com', {
    palette: true,
    rules: {
      avatar: {
        type: 'image',
        selectors: [
          {
            selector: '#avatar',
            attr: 'href'
          }
        ]
      }
    }
  })`
}

const CardOption = ({ children, value, ...props }) => (
  <Text
    color={children === value ? 'black' : 'gray8'}
    pt={3}
    pr={2}
    fontSize={0}
    textAlign='right'
    css={`
      ${children !== value && 'cursor: pointer;'};
      transition: color ${({ theme }) => theme.transition.short};

      &:hover {
        color: ${({ theme }) => theme.colors.black};
      }
    `}
    {...props}
  >
    {children}
  </Text>
)

export default class extends Component {
  state = { view: 'HTTP' }

  render () {
    const { view } = this.state

    return (
      <Flex flexDirection={'column'} justifyContent='space-around'>
        <Flex id='preview' flexDirection='column' mb={[4, 0]}>
          <Card
            bg='pinky'
            width={[CARD_WIDTH_MOBILE, CARD_WIDTH_DESKTOP]}
            height={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_DESKTOP]}
            style={{ overflow: 'auto' }}
          >
            <CodeEditor language='js'>{CODE[view]}</CodeEditor>
          </Card>
          <Flex justifyContent='flex-end'>
            <CardOption
              children='HTTP'
              value={view}
              onClick={() => this.setState({ view: 'HTTP' })}
            />
            <CardOption
              children='GraphQL'
              value={view}
              onClick={() => this.setState({ view: 'GraphQL' })}
            />
          </Flex>
        </Flex>
      </Flex>
    )
  }
}
