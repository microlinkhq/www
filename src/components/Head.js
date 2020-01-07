import React from 'react'
import Helmet from 'react-helmet'
import { useSiteMetadata } from 'components/hook'

const mergeMeta = (props, metadata) => {
  const { siteUrl, video, twitter, headline } = metadata
  const description = props.description || metadata.description
  const title = props.title
  const image = props.image || metadata.image
  const logo = props.logo || metadata.logo
  const name = props.name || metadata.name
  const dataLabel1 = props.dataLabel1 || metadata.dataLabel1
  const dataValue1 = props.dataValue1 || metadata.dataValue1
  const dataLabel2 = props.dataLabel2 || metadata.dataLabel2
  const dataValue2 = props.dataValue2 || metadata.dataValue2
  const date = (props.date ? new Date(props.date) : new Date()).toISOString()
  const url = props.location
    ? `${siteUrl}${props.location.pathname}${props.location.search}`
    : siteUrl

  return {
    dataLabel1,
    dataLabel2,
    dataValue1,
    dataValue2,
    date,
    description,
    headline,
    image,
    logo,
    name,
    title,
    twitter,
    url,
    video
  }
}

function Head (props) {
  const {
    dataLabel1,
    date,
    dataLabel2,
    dataValue1,
    dataValue2,
    description,
    headline,
    image,
    logo,
    name,
    title,
    twitter,
    url,
    video
  } = mergeMeta(props, useSiteMetadata())

  return (
    <Helmet
      defaultTitle={`${name}: ${headline}`}
      title={title}
      titleTemplate={`%s · ${name}`}
      meta={[
        { name: 'description', content: description },
        { name: 'date', content: date },
        { itemProp: 'name', content: title },
        { itemProp: 'description', content: description },
        { itemProp: 'image', content: image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:site', content: twitter },
        { name: 'twitter:domain', content: url },
        { name: 'twitter:player:stream', content: video },
        { name: 'twitter:image', content: image },
        { name: 'twitter:creator', content: twitter },
        { name: 'twitter:label1', value: dataLabel1 },
        { name: 'twitter:data1', value: dataValue1 },
        { name: 'twitter:label2', value: dataLabel2 },
        { name: 'twitter:data2', value: dataValue2 },
        { name: 'twitter:creator', content: twitter },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'product' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:video:secure_url', content: video },
        { property: 'og:logo', content: logo },
        { property: 'og:site_name', content: name },
        { property: 'og:type', content: 'website' },
        { property: 'og:updated_time', content: date }
      ]}
      {...props}
    >
      <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
    </Helmet>
  )
}

export default Head
