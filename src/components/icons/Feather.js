import * as FeatherIcons from 'react-feather'
import React, { createElement } from 'react'
import { Flex } from 'components/elements'
import { fontSizes, cx, theme } from 'theme'

const getWidth = size => {
  if (Array.isArray(size)) return size.map(index => fontSizes[index])
  return fontSizes[size]
}

const FeatherIcon = ({ color, icon, size = [1, 1, 2, 2], ...props }) => (
  <Flex
    css={theme({
      justifyContent: 'center',
      width: getWidth(size),
      height: '100%'
    })}
    as='span'
    {...props}
  >
    {createElement(FeatherIcons[icon], {
      color: color ? cx(color) : undefined
    })}
  </Flex>
)

export default React.memo(FeatherIcon)
