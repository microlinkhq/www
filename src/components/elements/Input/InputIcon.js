import { Link as LinkIcon } from 'react-feather'
import { Unavatar } from 'components/elements'
import React, { createElement } from 'react'
import { colors } from 'theme'

const InputIcon = React.memo(function InputIcon ({
  height = '24px',
  width = height,
  style,
  ...props
}) {
  return props.query || props.url
    ? createElement(Unavatar, { style: { ...style, height, width }, ...props })
    : createElement(LinkIcon, { color: colors.black50, size: '16px' })
})

export default InputIcon
