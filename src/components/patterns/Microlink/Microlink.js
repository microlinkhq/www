import React from 'react'
import { template } from 'helpers'
import Microlink from '@microlink/react'

export default ({ url, style, ...props }) => {
  if (url) url = template(url)
  return (
    <Microlink
      url={url}
      media={['video', 'audio', 'image', 'logo']}
      style={{ margin: 'auto', ...style }}
      {...props}
    />
  )
}
