import React, { Component } from 'react'
import { Caps, Text, Card, Flex, BlockLink } from 'components/elements'
import styled from 'styled-components'
import is from 'styled-is'

import { transition, space } from 'theme'

const CapsIcon = styled(Caps)`
  transition: margin-left ${transition.medium};

  ${is('hover')`
  margin-left: ${space[2]}px;
`};
`

CapsIcon.defaultProps = {
  blacklist: [...Object.keys(Caps.propTypes), 'hover']
}

const CardTitle = ({ children, hover }) => (
  <Text my={27}>
    <Caps
      as='span'
      fontWeight='bold'
      color='secondary'
      fontSize={2}
      children={children}
    />
    <CapsIcon
      as='span'
      fontWeight='bold'
      color='secondary'
      fontSize={2}
      ml={1}
      children='→'
      hover={hover}
    />
  </Text>
)

export default class extends Component {
  state = { hover: false }
  mouseOut = () => this.setState({ hover: false })
  onMouseOver = () => this.setState({ hover: true })
  render () {
    const {
      iconComponent: IconComponent,
      title,
      description,
      href
    } = this.props
    const { hover } = this.state
    return (
      <BlockLink
        href={href}
        onMouseOut={this.mouseOut}
        onMouseOver={this.onMouseOver}
      >
        <Card py={[47.6, 56]} px={4} width={[314.5, 370]} height={[400, 420]}>
          <Flex
            justifyContent='space-between'
            alignItems='center'
            flexDirection='column'
            style={{ height: '100%' }}
          >
            <IconComponent width='100%' />
            <CardTitle children={title} hover={hover} />
            <Text
              fontSize={15}
              textAlign='center'
              color='black80'
              lineHeight={3}
              children={description}
            />
          </Flex>
        </Card>
      </BlockLink>
    )
  }
}
