import Flex from 'components/elements/Flex'
import { fontSizes, cx, theme } from 'theme'
import React, { createElement } from 'react'

const getWidth = size => {
  if (Array.isArray(size)) return size.map(index => fontSizes[index])
  return fontSizes[size] || size
}

const FeatherIcon = ({
  color,
  icon: Icon,
  size = [1, 1, 2, 2],
  animations = true,
  ...props
}) => {
  return (
    <Flex
      css={theme({
        justifyContent: 'center',
        width: getWidth(size),
        height: '100%'
      })}
      as='span'
      {...props}
    >
      {createElement(Icon, {
        color: color ? cx(color) : undefined
      })}
    </Flex>
  )
}

export default React.memo(FeatherIcon)
