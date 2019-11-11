import React from 'react'
import Microlink from '@microlink/react'
import { template } from 'helpers'

export default ({ url, ...props }) => {
  return <Microlink url={template(url)} style={{ margin: 'auto' }} {...props} />
}
