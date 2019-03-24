import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import styled from 'styled-components'
import { Card as CardBase, Flex, Text } from 'components/elements'
import { colors } from 'theme'
import Preview from './preview'

import {
  CARD_HEIGHT_DESKTOP,
  CARD_WIDTH_DESKTOP,
  CARD_WIDTH_MOBILE,
  CARD_HEIGHT_MOBILE
} from './theme'

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
  state = { view: 'preview' }

  componentDidUpdate () {
    if (this.node) ReactDOM.findDOMNode(this.node).scrollTop = 0
  }

  render () {
    const { view } = this.state
    const { children, loading } = this.props
    const isSDK = view === 'preview'

    return (
      <Flex flexDirection={'column'} justifyContent='space-around'>
        <Flex id='preview' flexDirection='column' mb={[4, 0]}>
          <Card
            ref={node => (this.node = node)}
            px={isSDK ? 0 : 3}
            py={isSDK ? 0 : 3}
            width={[CARD_WIDTH_MOBILE, CARD_WIDTH_DESKTOP]}
            height={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_DESKTOP]}
            style={{ overflow: isSDK ? 'hidden' : 'auto' }}
          >
            <Preview loading={loading} view={view} children={children} />
          </Card>
          <Flex justifyContent='flex-end'>
            <CardOption
              children='preview'
              value={view}
              onClick={() => this.setState({ view: 'preview' })}
            />
            <CardOption
              children='json'
              value={view}
              onClick={() => this.setState({ view: 'json' })}
            />
            <CardOption
              children='code'
              value={view}
              onClick={() => this.setState({ view: 'code' })}
            />
          </Flex>
        </Flex>
      </Flex>
    )
  }
}
