import React from 'react'
import { template, isSSR } from 'helpers'
import Microlink from '@microlink/react'
import get from 'dlv'

const effectiveType = isSSR
  ? undefined
  : get(window, 'navigator.connection.effectiveType')

const isFastConnection = effectiveType === '4g'

const media = [
  isFastConnection && 'video',
  isFastConnection && 'audio',
  'image',
  'logo'
].filter(Boolean)

export default ({ url, style, ...props }) => {
  if (url) url = template(url)
  return (
    <Microlink
      url={url}
      media={media}
      style={{ margin: 'auto', ...style }}
      {...props}
    />
  )
}
