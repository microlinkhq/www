import React from 'react'
import styled from 'styled-components'

import Box from './Box'
import Text from './Text'

const Card = styled(Box)({ overflow: 'auto' })

Card.defaultProps = {
  bg: 'white',
  borderRadius: 3,
  boxShadow: 3
}

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

Card.Option = CardOption

export default Card
