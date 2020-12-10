import { useSiteMetadata } from 'components/hook'
import { Helmet } from 'react-helmet'
import { cdnUrl } from 'helpers'
import React from 'react'
import get from 'dlv'

const getPage = props => {
  const pathname = get(props, 'location.pathname') || '/'
  return pathname.replace(/\/$/, '')
}

const getTitle = (props, metadata) => {
  if (props.title) return props.title

  const page = getPage(props)

  switch (page) {
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
    case '/chat':
      return cdnUrl('banner/chat.jpeg')
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
    default:
      return metadata.image
  }
}

const mergeMeta = (props, metadata) => {
  const { siteUrl, video, twitter, headline } = metadata
  const description = props.description || metadata.description
  const title = getTitle(props, metadata)
  const image = getImage(props, metadata)
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

function Head ({ onChangeClientState, script, ...props }) {
  const siteMetadata = useSiteMetadata()

  const { canonicalUrl } = siteMetadata

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
      defaultTitle={`${name} — ${headline}`}
      titleTemplate={`%s — ${name}`}
      {...props}
    >
      {/* <!-- Basic --> */}
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
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
      <meta name='date' content={date} />
      <title>{title}</title>
      <meta
        name='viewport'
        content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
      />

      {/* <!-- Schema.org for Google --> */}
      <meta itemProp='name' content={title} />
      <meta itemProp='description' content={description} />
      <meta itemProp='image' content={image} />

      {/* <!-- Twitter --> */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
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
      <meta property='og:type' content='product' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:video:secure_url' content={video} />
      <meta property='og:logo' content={logo} />
      <meta property='og:site_name' content={name} />
      <meta property='og:type' content='website' />
      <meta property='og:updated_time' content={date} />

      {/* <!-- Favicon --> */}

      <meta property='apple-mobile-web-app-capable' content='yes' />
      <meta property='mobile-web-app-capable' content='yes' />

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
      <meta name='application-name' content='microlink.io' />
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
