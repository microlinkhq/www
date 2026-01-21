import React from 'react'
import styled from 'styled-components'
import { transition, toPx, colors, theme, touchTargets } from 'theme'

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

const CardOption = ({ children, value, onClick, ...props }) => {
  const isActive = children === value
  return (
    <Text
      as='button'
      type='button'
      onClick={onClick}
      aria-pressed={isActive}
      css={theme({
        color: isActive ? 'black' : 'black60',
        fontWeight: isActive ? 'regular' : 'normal',
        pt: 3,
        pr: 2,
        fontSize: 1,
        textAlign: 'right',
        cursor: !isActive ? 'pointer' : 'default',
        transition: `color ${transition.medium}`,
        background: 'transparent',
        border: 0,
        minHeight: touchTargets.minHeight,
        minWidth: touchTargets.minHeight,
        _hover: {
          color: 'black'
        },
        _focus: {
          outline: 'none',
          boxShadow: '0 0 0 2px var(--link)'
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none'
        }
      })}
      {...props}
    >
      {children}
    </Text>
  )
}

Card.Option = CardOption
Card.width = BASE_WIDTH
Card.ratio = BASE_RATIO

export default Card
