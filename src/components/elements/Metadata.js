import React from 'react'
import Helmet from 'react-helmet'

export default ({
  title,
  description,
  image,
  video,
  twitter,
  siteUrl,
  logo,
  siteName,
  ...props
}) => {
  return (
    <Helmet
      title={title}
      titleTemplate={`%s | Microlink`}
      meta={[
        { name: 'description', content: description },
        { itemProp: 'name', content: title },
        { itemProp: 'description', content: description },
        { itemProp: 'image', content: image },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:site', content: twitter },
        { name: 'twitter:domain', content: siteUrl },
        { name: 'twitter:player:stream', content: video },
        { name: 'twitter:image', content: image },
        { name: 'twitter:creator', content: twitter },
        { name: 'twitter:label1', value: 'API' },
        { name: 'twitter:data1', value: 'api.microlink.io' },
        { name: 'twitter:label2', value: 'Documentation' },
        { name: 'twitter:data2', value: 'docs.microlink.io' },
        { name: 'twitter:creator', content: twitter },
        { property: 'og:url', content: siteUrl },
        { property: 'og:type', content: 'product' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:video', content: video },
        { property: 'og:logo', content: logo },
        { property: 'og:site_name', content: siteName },
        { property: 'og:type', content: 'website' }
      ]}
    >
      <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
    </Helmet>
  )
}
