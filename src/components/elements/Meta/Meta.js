import { useLocation } from '@gatsbyjs/reach-router'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import React, { useMemo } from 'react'

const getPage = ({ pathname }) => pathname.replace(/\/+$/, '').substring(1)

const getTitle = location => {
  if (!location) return
  const page = getPage(location)
  return page.charAt(0).toUpperCase() + page.slice(1)
}

const mergeMeta = (props, location, metadata) => {
  const { siteUrl, video, twitter, headline } = metadata
  const title = props.title || getTitle(location) || metadata.headline

  const {
    dataLabel1,
    dataLabel2,
    dataValue1,
    dataValue2,
    date,
    image,
    logo,
    name
  } = {
    ...metadata,
    ...props
  }

  const description =
    props.description || metadata.description || metadata.headline

  const url = location
    ? `${siteUrl}${location.pathname}${location.search}`
    : siteUrl

  return {
    date: date === undefined ? new Date() : new Date(date),
    dataLabel1,
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
  }
}

function Meta ({ script, ...props }) {
  const siteMetadata = useSiteMetadata()
  const location = useLocation()
  const { author } = siteMetadata

  const {
    dataLabel1,
    dataLabel2,
    dataValue1,
    dataValue2,
    date,
    description,
    image,
    logo,
    name,
    title,
    twitter,
    url,
    video
  } = useMemo(
    () => mergeMeta(props, location, siteMetadata),
    [props, location, siteMetadata]
  )

  const fullTitle = `${title} — ${name}`

  return (
    <>
      {/* <!-- Search Engine --> */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='image' content={image} />
      <meta name='author' content={author} />
      {/* <!-- Schema.org for Google --> */}
      <meta itemProp='name' content={fullTitle} />
      <meta itemProp='description' content={description} />
      <meta itemProp='image' content={image} />
      <meta itemProp='author' content={author} />
      {/* <!-- Twitter --> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:site' content={twitter} />
      <meta name='twitter:domain' content={url} />
      <meta name='twitter:player:stream' content={video} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:creator' content={twitter} />
      <meta name='twitter:label1' value={dataLabel1} />
      <meta name='twitter:data1' value={dataValue1} />
      <meta name='twitter:label2' value={dataLabel2} />
      <meta name='twitter:data2' value={dataValue2} />
      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta property='og:url' content={url} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:video:secure_url' content={video} />
      <meta property='og:logo' content={logo} />
      <meta property='og:site_name' content={name} />
      <meta property='og:type' content='website' />
      <meta name='article:modified_time' content={date.toISOString()} />
    </>
  )
}

export default Meta
