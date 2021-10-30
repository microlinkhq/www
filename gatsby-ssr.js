'use strict'

const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script key='crisp' async src='https://client.crisp.chat/l.js' />
  ])
}
