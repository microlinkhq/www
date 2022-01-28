import { useSiteMetadata } from 'components/hook'
import { Helmet } from 'react-helmet'
import { cdnUrl } from 'helpers'
import React from 'react'
import get from 'dlv'

const getPage = props => {
  const pathname = get(props, 'location.pathname') || '/'
  if (pathname === '/') return '/'
  return pathname.replace(/\/$/, '')
}

const getTitle = (props, metadata) => {
  if (props.title) return props.title

  const page = getPage(props)

  switch (page) {
    case '/':
      return metadata.headline
    case '/insights':
      return 'Automate web performance'
    case '/meta':
      return 'Turn websites into data'
    case '/oss':
      return 'Open Source Sustainability'
    case '/payment':
    case '/payment/update':
      return 'Payment'
    case '/pdf':
      return 'Turn websites into a PDF'
    case '/sdk':
      return 'Beauty link previews'
    case '/screenshot':
      return 'Turn websites into screenshots'
    default: {
      const name = page.substr(1)
      return name.charAt(0).toUpperCase() + name.slice(1)
    }
  }
}

const getImage = (props, metadata) => {
  if (props.image) return props.image

  const page = getPage(props)

  switch (page) {
    case '/blog':
      return cdnUrl('banner/blog.jpeg')
    case '/community':
      return cdnUrl('banner/community.jpeg')
    case '/changelog':
      return cdnUrl('banner/changelog.jpeg')
    case '/design':
      return cdnUrl('banner/design.jpeg')
    case '/docs':
      return cdnUrl('banner/docs.jpeg')
    case '/insights':
      return cdnUrl('banner/insights.jpeg')
    case '/meta':
      return cdnUrl('banner/meta.jpeg')
    case '/oss':
      return cdnUrl('banner/oss.jpeg')
    case '/pdf':
      return cdnUrl('banner/pdf.jpeg')
    case '/recipes':
      return cdnUrl('banner/recipes.jpeg')
    case '/sdk':
      return cdnUrl('banner/sdk.jpeg')
    case '/Status':
      return cdnUrl('banner/Status.jpeg')
    case '/screenshot':
      return cdnUrl('banner/screenshot.jpeg')
    case '/enterprise':
      return cdnUrl('banner/enterprise.jpeg')
    default:
      return metadata.image
  }
}

const mergeMeta = (props, metadata) => {
  const { siteUrl, video, twitter, headline } = metadata
  const title = getTitle(props, metadata)
  const image = getImage(props, metadata)

  const {
    dataLabel1,
    dataLabel2,
    dataValue1,
    dataValue2,
    description,
    logo,
    name
  } = { ...props, ...metadata }

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
  } = mergeMeta(props, siteMetadata)

  return (
    <Helmet
      onChangeClientState={onChangeClientState}
      defaultTitle={`${headline} — ${name}`}
      titleTemplate={`%s — ${name}`}
      {...props}
    >
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
      <title>{title}</title>

      {/* <!-- Schema.org for Google --> */}
      <meta itemProp='name' content={`${title} — ${name}`} />
      <meta itemProp='description' content={description} />
      <meta itemProp='image' content={image} />
      <meta itemProp='author' content={author} />

      {/* <!-- Twitter --> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={`${title} — ${name}`} />
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
      <meta property='og:title' content={`${title} — ${name}`} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:video:secure_url' content={video} />
      <meta property='og:logo' content={logo} />
      <meta property='og:site_name' content={name} />
      <meta property='og:type' content='website' />
      <meta property='og:updated_time' content={date} />
    </Helmet>
  )
}

export default Head
