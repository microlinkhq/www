/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'

export default function HTML (props) {
  return (
    <html lang='en' {...props.htmlAttributes}>
      <head>
        {/* <!-- Basic --> */}
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
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
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;700&display=swap'
        />

        <meta property='apple-mobile-web-app-capable' content='yes' />
        <meta property='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-title' content='Microlink' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />

        {/* <!-- Favicon --> */}

        <link
          rel='icon'
          type='image/png'
          href='https://cdn.microlink.io/logo/favicon-96x96.png'
          sizes='96x96'
        />
        <link
          rel='icon'
          type='image/svg+xml'
          href='https://cdn.microlink.io/logo/favicon.svg'
        />
        <link
          rel='shortcut icon'
          href='https://cdn.microlink.io/logo/favicon.ico'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='https://cdn.microlink.io/logo/apple-touch-icon.png'
        />
        <link rel='manifest' href='https://cdn.microlink.io/site.webmanifest' />
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
