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
  const dimensions = getWidth(size)

  return (
    <Flex
      css={theme({
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: dimensions,
        height: dimensions,
        '& svg': {
          width: '100%',
          height: '100%'
        }
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
