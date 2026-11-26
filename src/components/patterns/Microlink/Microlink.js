import { isFastConnection } from 'helpers/is-fast-connection'
import { findDemoLinkByVariations } from 'helpers/demo-links'
import { urlVariations } from 'helpers/url-variations'
import { template } from 'helpers/template'
import LinkPreview from '@microlink/react'
import { useCardData } from 'components/hook/use-card-data'
import React from 'react'
import styled from 'styled-components'
import { theme } from 'theme'

const defaultMedia = [
  'iframe',
  isFastConnection && 'video',
  isFastConnection && 'audio',
  'image',
  'logo'
].filter(Boolean)

const Viewport = styled('div')`
  ${theme({ width: '100%' })}
`

const CARD_QUERY_PROPS = [
  'apiKey',
  'contrast',
  'data',
  'endpoint',
  'force',
  'headers',
  'prerender',
  'proxy',
  'ttl'
]

const splitProps = props => {
  const query = {}
  const rest = {}
  for (const [name, value] of Object.entries(props)) {
    if (CARD_QUERY_PROPS.includes(name)) query[name] = value
    else rest[name] = value
  }
  return { query, rest }
}

const dataFor = (card, setData) =>
  card.phase === 'ready' ? { ...card.data, ...setData } : setData

const Microlink = ({
  url,
  style,
  fetchData,
  setData,
  lazy,
  media = defaultMedia,
  ...props
}) => {
  if (url) url = template(url)

  const variations = urlVariations(url)
  const demoLink = findDemoLinkByVariations(variations)
  const { data: demolinkData } = demoLink || {}

  const _fetchData = fetchData !== undefined ? fetchData : !demolinkData

  const _setData =
    typeof setData === 'function'
      ? setData(demolinkData)
      : { ...demolinkData, ...setData }

  const { query, rest } = splitProps(props)
  const [card, ref] = useCardData(url, {
    enabled: _fetchData,
    lazy,
    media,
    ...query
  })

  if (card.phase === 'failed') return <a href={url}>{url}</a>

  const preview = (
    <LinkPreview
      key={card.phase}
      url={url}
      media={media}
      style={{ margin: 'auto', ...style }}
      {...rest}
      contrast={query.contrast}
      lazy={false}
      fetchData={false}
      loading={card.phase === 'loading' || undefined}
      setData={dataFor(card, _setData)}
    />
  )

  return _fetchData ? <Viewport ref={ref}>{preview}</Viewport> : preview
}

export default Microlink
