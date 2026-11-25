import { isFastConnection } from 'helpers/is-fast-connection'
import { findDemoLinkByVariations } from 'helpers/demo-links'
import { urlVariations } from 'helpers/url-variations'
import { template } from 'helpers/template'
import LinkPreview from '@microlink/react'
import { useAccountKeys } from 'components/hook/use-account-keys'
import React from 'react'

const defaultMedia = [
  'iframe',
  isFastConnection && 'video',
  isFastConnection && 'audio',
  'image',
  'logo'
].filter(Boolean)

const PENDING_KEYS = 'pending'
const KEYLESS = 'keyless'

const cardKeyOf = keys =>
  keys === undefined ? PENDING_KEYS : keys[0] ?? KEYLESS

const Microlink = ({
  url,
  style,
  fetchData,
  setData,
  media = defaultMedia,
  ...props
}) => {
  const keys = useAccountKeys()
  if (url) url = template(url)

  const variations = urlVariations(url)
  const demoLink = findDemoLinkByVariations(variations)
  const { data: demolinkData } = demoLink || {}

  const _fetchData = fetchData !== undefined ? fetchData : !demolinkData

  const _setData =
    typeof setData === 'function'
      ? setData(demolinkData)
      : { ...demolinkData, ...setData }

  const waitsForKeys = _fetchData && keys === undefined

  return (
    <LinkPreview
      key={_fetchData ? cardKeyOf(keys) : KEYLESS}
      url={url}
      media={media}
      style={{ margin: 'auto', ...style }}
      fetchData={_fetchData && !waitsForKeys}
      loading={waitsForKeys || undefined}
      setData={_setData}
      apiKey={keys?.[0]}
      {...props}
    />
  )
}

export default Microlink
