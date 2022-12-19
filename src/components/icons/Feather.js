import * as FeatherIcons from 'react-feather'
import React, { createElement } from 'react'
import { Flex } from 'components/elements'
import { fontSizes, cx } from 'theme'

const FeatherIcon = ({
  icon,
  size = [fontSizes[1], fontSizes[1], fontSizes[2], fontSizes[2]],
  ...props
}) => {
  return (
    <Flex
      justifyContent='center'
      width={size}
      height='100%'
      as='span'
      {...props}
    >
      {createElement(FeatherIcons[icon], {
        color: props.color ? cx(props.color) : undefined
      })}
    </Flex>
  )
}

export default FeatherIcon
