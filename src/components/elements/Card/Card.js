import React from 'react'
import styled from 'styled-components'
import { toPx } from 'theme'

import Flex from '../Flex'
import Text from '../Text'

const BASE_WIDTH = 500
const BASE_RATIO = 1.4
const BASE_HEIGHT = BASE_WIDTH / BASE_RATIO

const CardBase = styled(Flex)({ overflow: 'auto' })

const Card = ({ ratio, ...props }) => {
  const width = ratio.map(n => toPx(BASE_WIDTH * n))
  const height = ratio.map(n => toPx(BASE_HEIGHT * n))
  return <CardBase width={width} height={height} {...props} />
}

Card.defaultProps = {
  bg: 'white',
  borderRadius: 3,
  boxShadow: 0,
  ratio: [0.55, 0.75, 1, 1]
}

const CardOption = ({ children, value, ...props }) => (
  <Text
    as='span'
    color={children === value ? 'black' : 'black60'}
    fontWeight={children === value ? 'regular' : 'normal'}
    pt={3}
    pr={2}
    fontSize={0}
    textAlign='right'
    css={`
      ${children !== value && 'cursor: pointer;'};
      transition: color ${({ theme }) => theme.transition.medium};

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
