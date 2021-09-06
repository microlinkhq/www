'use strict'

const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script
      async
      key='polyfill-io'
      crossOrigin='anonymous'
      src='https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver%2Cfetch%2Csmoothscroll'
    />,
    <script key='crisp' async src='https://client.crisp.chat/l.js' />
  ])
}
