import Unavatar from '../Unavatar/Unavatar'
import React, { createElement, useState, useEffect } from 'react'
import { colors } from 'theme'

const InputIcon = React.memo(function InputIcon ({
  height = '24px',
  width = height,
  style,
  ...props
}) {
  const [LinkIcon, setLinkIcon] = useState(null)

  useEffect(() => {
    // Only load the Link icon when needed (not for query/url cases)
    if (!props.query && !props.url) {
      import('react-feather/dist/icons/link.js')
        .then(module => setLinkIcon(() => module.default))
        .catch(() => {
          // Fallback to main bundle
          import('react-feather').then(({ Link }) => setLinkIcon(() => Link))
        })
    }
  }, [props.query, props.url])

  if (props.query || props.url) {
    return createElement(Unavatar, {
      style: { ...style, height, width },
      ...props
    })
  }

  return LinkIcon
    ? createElement(LinkIcon, { color: colors.black50, size: '16px' })
    : null
})

export default InputIcon
