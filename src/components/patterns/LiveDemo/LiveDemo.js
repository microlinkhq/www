import React, { Component } from 'react'

import { Card, Flex, Text } from 'components/elements'
import Preview from './preview'

import {
  CARD_HEIGHT_DESKTOP,
  CARD_WIDTH_DESKTOP,
  CARD_WIDTH_MOBILE,
  CARD_HEIGHT_MOBILE
} from './theme'

const CardOption = ({ children, value, ...props }) => (
  <Text
    color={children === value ? 'black' : 'black60'}
    fontWeight={children === value ? 'regular' : 'normal'}
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

  render () {
    const { view } = this.state
    const { children, loading } = this.props
    const isSDK = view === 'preview'

    return (
      <Flex flexDirection='column' justifyContent='space-around'>
        <Flex flexDirection='column' mb={[4, 0]}>
          <Card
            css={`
              transition: none;
            `}
            px={isSDK ? 0 : 3}
            py={isSDK ? 0 : 3}
            width={[CARD_WIDTH_MOBILE, CARD_WIDTH_DESKTOP]}
            height={[CARD_HEIGHT_MOBILE, CARD_HEIGHT_DESKTOP]}
            style={{
              background: '#282a36',
              padding: 0,
              overflow: isSDK ? 'hidden' : 'auto'
            }}
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
