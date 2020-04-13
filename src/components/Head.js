import React from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from 'components/hook'

const mergeMeta = (props, metadata) => {
  const { siteUrl, video, twitter, headline } = metadata
  const description = props.description || metadata.description
  const title = props.title || headline
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
        { name: 'twitter:card', content: 'summary' },
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
        { property: 'og:updated_time', content: date },
        { property: 'apple-mobile-web-app-capable', content: 'yes' },
        { property: 'mobile-web-app-capable', content: 'yes' }
      ]}
      {...props}
    >
      <link
        rel='apple-touch-icon-precomposed'
        sizes='57x57'
        href='https://cdn.microlink.io/logo/apple-touch-icon-57x57.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='114x114'
        href='https://cdn.microlink.io/logo/apple-touch-icon-114x114.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='72x72'
        href='https://cdn.microlink.io/logo/apple-touch-icon-72x72.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='144x144'
        href='https://cdn.microlink.io/logo/apple-touch-icon-144x144.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='60x60'
        href='https://cdn.microlink.io/logo/apple-touch-icon-60x60.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='120x120'
        href='https://cdn.microlink.io/logo/apple-touch-icon-120x120.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='76x76'
        href='https://cdn.microlink.io/logo/apple-touch-icon-76x76.png'
      />
      <link
        rel='apple-touch-icon-precomposed'
        sizes='152x152'
        href='https://cdn.microlink.io/logo/apple-touch-icon-152x152.png'
      />
      <link
        rel='icon'
        type='image/png'
        href='https://cdn.microlink.io/logo/favicon-196x196.png'
        sizes='196x196'
      />
      <link
        rel='icon'
        type='image/png'
        href='https://cdn.microlink.io/logo/favicon-96x96.png'
        sizes='96x96'
      />
      <link
        rel='icon'
        type='image/png'
        href='https://cdn.microlink.io/logo/favicon-32x32.png'
        sizes='32x32'
      />
      <link
        rel='icon'
        type='image/png'
        href='https://cdn.microlink.io/logo/favicon-16x16.png'
        sizes='16x16'
      />
      <link
        rel='icon'
        type='image/png'
        href='https://cdn.microlink.io/logo/favicon-128.png'
        sizes='128x128'
      />
      <meta name='application-name' content='&nbsp;' />
      <meta name='msapplication-TileColor' content='#FFFFFF' />
      <meta
        name='msapplication-TileImage'
        content='https://cdn.microlink.io/logo/mstile-144x144.png'
      />
      <meta
        name='msapplication-square70x70logo'
        content='https://cdn.microlink.io/logo/mstile-70x70.png'
      />
      <meta
        name='msapplication-square150x150logo'
        content='https://cdn.microlink.io/logo/mstile-150x150.png'
      />
      <meta
        name='msapplication-wide310x150logo'
        content='https://cdn.microlink.io/logo/mstile-310x150.png'
      />
      <meta
        name='msapplication-square310x310logo'
        content='https://cdn.microlink.io/logo/mstile-310x310.png'
      />
    </Helmet>
  )
}

export default Head
