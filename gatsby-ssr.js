'use strict'

const { Script } = require('gatsby')
const React = require('react')

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <Script key='crisp' async src='https://client.crisp.chat/l.js' />
  ])
}
