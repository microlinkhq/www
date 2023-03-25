import * as FeatherIcons from 'react-feather'
import React, { createElement } from 'react'
import { Flex } from 'components/elements'
import { fontSizes, cx } from 'theme'

const getWidth = size => {
  if (Array.isArray(size)) return size.map(index => fontSizes[index])
  return fontSizes[size]
}

const FeatherIcon = ({ icon, size = [1, 1, 2, 2], ...props }) => (
  <Flex
    justifyContent='center'
    width={getWidth(size)}
    height='100%'
    as='span'
    {...props}
  >
    {createElement(FeatherIcons[icon], {
      color: props.color ? cx(props.color) : undefined
    })}
  </Flex>
)

export default React.memo(FeatherIcon)
