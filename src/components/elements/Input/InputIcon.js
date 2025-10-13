import Unavatar from '../Unavatar/Unavatar'
import FeatherIcon from '../../icons/Feather'
import React, { createElement } from 'react'

const InputIcon = React.memo(function InputIcon ({
  height = '24px',
  width = height,
  style,
  ...props
}) {
  if (props.query || props.url) {
    return createElement(Unavatar, {
      style: { ...style, height, width },
      ...props
    })
  }

  return (
    <FeatherIcon
      icon='link'
      color='black50'
      size={[0, 0, 1, 1]}
      css={{ width: '16px', height: '16px' }}
    />
  )
})

export default InputIcon
