import { urlVariations, isFastConnection, template } from 'helpers'
import LinkPreview from '@microlink/react'
import React from 'react'

import demoLinks from '../../../../data/demo-links'

const defaultMedia = [
  'iframe',
  isFastConnection && 'video',
  isFastConnection && 'audio',
  'image',
  'logo'
].filter(Boolean)

const Microlink = ({
  url,
  style,
  fetchData,
  setData,
  media = defaultMedia,
  ...props
}) => {
  if (url) url = template(url)

  const variations = urlVariations(url)
  const demoLink = demoLinks.find(item => variations.includes(item.data.url))
  const { data: demolinkData } = demoLink || {}

  const _fetchData = fetchData || !demolinkData

  const _setData =
    typeof setData === 'function'
      ? setData(demolinkData)
      : { ...demolinkData, ...setData }

  return (
    <LinkPreview
      url={url}
      media={media}
      style={{ margin: 'auto', ...style }}
      fetchData={_fetchData}
      setData={_setData}
      {...props}
    />
  )
}

export default Microlink
