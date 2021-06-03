import React from 'react'
import PropTypes from 'prop-types'

export default function HTML (props) {
  return (
    <html lang='en' {...props.htmlAttributes}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* inter-200 - latin */
              @font-face {
                font-display: optional;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 200;
                src: local(''),
                     url('/fonts/inter-v2-latin-200.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                     url('/fonts/inter-v2-latin-200.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }
              /* inter-regular - latin */
              @font-face {
                font-display: optional;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                src: local(''),
                     url('/fonts/inter-v2-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                     url('/fonts/inter-v2-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }
              /* inter-500 - latin */
              @font-face {
                font-display: optional;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                src: local(''),
                     url('/fonts/inter-v2-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                     url('/fonts/inter-v2-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }
              /* inter-700 - latin */
              @font-face {
                font-display: optional;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 700;
                src: local(''),
                     url('/fonts/inter-v2-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                     url('/fonts/inter-v2-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              }`
          }}
        />
        {props.headComponents}
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
        <script
          crossOrigin='anonymous'
          src='https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2Cfetch%2Csmoothscroll'
        />
        <script async src='https://client.crisp.chat/l.js' />
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
