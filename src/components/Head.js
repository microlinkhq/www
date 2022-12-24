import { useSiteMetadata } from 'components/hook'
import React, { useMemo } from 'react'
import get from 'dlv'

const getPage = props => {
  const pathname = get(props, 'location.pathname') || ''
  return pathname ? pathname.replace(/\/+$/, '').substring(1) : pathname
}

const getTitle = props => {
  const page = getPage(props)
  return page.charAt(0).toUpperCase() + page.slice(1)
}

const mergeMeta = ({ head = {}, ...props }, metadata) => {
  const { siteUrl, video, twitter, headline } = metadata

  const description = head.description || metadata.description
  const title = head.title || getTitle(props, metadata) || metadata.headline
  const image = head.image || metadata.image

  const { dataLabel1, dataLabel2, dataValue1, dataValue2, logo, name } = {
    ...props,
    ...metadata
  }

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

function Head ({ onChangeClientState, script, ...props }) {
  const siteMetadata = useSiteMetadata()

  const { canonicalUrl, author } = siteMetadata

  const {
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
  } = useMemo(() => mergeMeta(props, siteMetadata), [props, siteMetadata])

  const fullTitle = `${title} — ${name}`

  return (
    <>
      <script type='application/ld+json'>
        {`${JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'Organization',
          description: headline,
          image,
          logo,
          name,
          url: canonicalUrl,
          sameAs: [
            'https://twitter.com/microlinkhq',
            'https://github.com/microlinkhq'
          ]
        })}`}
      </script>

      {/* <!-- Search Engine --> */}
      <meta name='description' content={description} />
      <meta name='image' content={image} />
      <meta name='author' content={author} />
      <meta name='date' content={date} />

      <title>{fullTitle}</title>

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
      <meta property='og:updated_time' content={date} />
    </>
  )
}

export default Head
