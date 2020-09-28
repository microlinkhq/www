import { urlVariations, isFunction, isFastConnection, template } from 'helpers'
import Microlink from '@microlink/react'
import React from 'react'

import demoLinks from '../../../../data/demo-links'

const media = [
  'iframe',
  isFastConnection && 'video',
  isFastConnection && 'audio',
  'image',
  'logo'
].filter(Boolean)

export default ({ url, style, fetchData, setData, ...props }) => {
  if (url) url = template(url)

  const variations = urlVariations(url)
  const demoLink = demoLinks.find(item => variations.includes(item.data.url))
  const { data: demolinkData } = demoLink || {}

  const _fetchData = fetchData || !demolinkData

  const _setData = isFunction(setData)
    ? setData(demolinkData)
    : { ...demolinkData, ...setData }

  return (
    <Microlink
      url={url}
      media={media}
      style={{ margin: 'auto', ...style }}
      fetchData={_fetchData}
      setData={_setData}
      {...props}
    />
  )
}
