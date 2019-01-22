import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function Head (props) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const description = props.description || data.site.siteMetadata.description
        const title = props.title
        const image = props.image || data.site.siteMetadata.image
        const logo = props.logo || data.site.siteMetadata.logo
        const twitter = data.site.siteMetadata.twitter
        const siteUrl = data.site.siteMetadata.url
        const video = data.site.siteMetadata.video
        const siteName = data.site.siteMetadata.name
        const dataLabel1 = props.dataLabel1 || data.site.siteMetadata.dataLabel1
        const dataValue1 = props.dataValue1 || data.site.siteMetadata.dataValue1
        const dataLabel2 = props.dataLabel2 || data.site.siteMetadata.dataLabel2
        const dataValue2 = props.dataValue2 || data.site.siteMetadata.dataValue2

        return (
          <Helmet
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
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
              { name: 'twitter:label1', value: dataLabel1 },
              { name: 'twitter:data1', value: dataValue1 },
              { name: 'twitter:label2', value: dataLabel2 },
              { name: 'twitter:data2', value: dataValue2 },
              { name: 'twitter:creator', content: twitter },
              { property: 'og:url', content: siteUrl },
              { property: 'og:type', content: 'product' },
              { property: 'og:title', content: title },
              { property: 'og:description', content: description },
              { property: 'og:image', content: image },
              { property: 'og:video:secure_url', content: video },
              { property: 'og:logo', content: logo },
              { property: 'og:site_name', content: siteName },
              { property: 'og:type', content: 'website' }
            ]}
          >
            <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
          </Helmet>
        )
      }}
    />
  )
}

const query = graphql`
  query HeadQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
        image
        video
        twitter
        paymentEndpoint
        paymentApiKey
        stripeKey
        siteName
        logo
      }
    }
  }
`

export default Head
