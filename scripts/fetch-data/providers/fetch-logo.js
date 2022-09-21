'use strict'

const path = require('path')

module.exports = () =>
  require('../create-provider').fromUrl(
    'https://cdn.microlink.io/logo/logo.svg',
    {
      dist: path.resolve(__dirname, '../../../static/logo.svg')
    }
  )
