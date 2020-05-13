import { isFastConnection, template } from 'helpers'
import { useDemoLinks } from 'components/hook'
import Microlink from '@microlink/react'
import React from 'react'

const media = [
  isFastConnection && 'video',
  isFastConnection && 'audio',
  'image',
  'logo'
].filter(Boolean)

export default ({ url, style, data, ...props }) => {
  const demoLinks = useDemoLinks()
  if (url) url = template(url)

  const { data: demolinkData } =
    demoLinks.find(item => item.data.url === url) || {}

  const mergedData = { ...demolinkData, ...data }

  return (
    <Microlink
      url={url}
      media={media}
      style={{ margin: 'auto', ...style }}
      fetchData={!demolinkData && !data}
      setData={mergedData}
      {...props}
    />
  )
}
