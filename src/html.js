/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  return (
    <html lang='en' {...props.htmlAttributes}>
      <head>
        {/* <!-- Basic --> */}
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0'
        />

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          rel='preconnect'
          href='https://cdn.microlink.io'
          crossOrigin='anonymous'
        />

        {props.headComponents}

        <link
          as='font'
          href='https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;700&display=swap'
        />

        <meta property='apple-mobile-web-app-capable' content='yes' />
        <meta property='mobile-web-app-capable' content='yes' />

        {/* <!-- Favicon --> */}

        <link
          rel='shortcut icon'
          href='https://cdn.microlink.io/logo/favicon.ico'
          type='image/x-icon'
        />

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
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key='noscript' id='gatsby-noscript'>
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key='body'
          id='___gatsby'
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}
