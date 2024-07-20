import React from 'react'
import styled from 'styled-components'
import { transition, toPx, colors, theme } from 'theme'

import Flex from '../Flex'
import Text from '../Text'

const BASE_WIDTH = 650
const BASE_RATIO = 1.35
const BASE_HEIGHT = BASE_WIDTH / BASE_RATIO

const CardBase = styled(Flex)`
  overflow: auto;
  transition: border-color ${transition.medium};

  &:hover {
    border-color: ${colors.black80};
  }
`

const Card = ({
  ratio = [0.55, 0.75, 1, 1],
  width = ratio.map(n => toPx(BASE_WIDTH * n)),
  height = ratio.map(n => toPx(BASE_HEIGHT * n)),
  ...props
}) => {
  return (
    <CardBase
      css={theme({
        width,
        height,
        bg: 'white',
        border: 1,
        borderColor: 'black10',
        borderRadius: 3
      })}
      {...props}
    />
  )
}

const CardOption = ({ children, value, ...props }) => (
  <Text
    as='span'
    css={theme({
      color: children === value ? 'black' : 'black60',
      fontWeight: children === value ? 'regular' : 'normal',
      pt: 3,
      pr: 2,
      fontSize: 1,
      textAlign: 'right',
      cursor: children !== value ? 'pointer' : 'default',
      transition: `color ${transition.medium}`,
      _hover: {
        color: 'black'
      }
    })}
    {...props}
  >
    {children}
  </Text>
)

Card.Option = CardOption
Card.width = BASE_WIDTH
Card.ratio = BASE_RATIO

export default Card
