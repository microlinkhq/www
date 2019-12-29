import React from 'react'
import { template } from 'helpers'
import Microlink from '@microlink/react'

export default ({ url, style, ...props }) => {
  if (url) url = template(url)
  return <Microlink url={url} style={{ margin: 'auto', ...style }} {...props} />
}
