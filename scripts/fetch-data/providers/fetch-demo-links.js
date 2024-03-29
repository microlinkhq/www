'use strict'

const path = require('path')

module.exports = () =>
  require('../create-provider').fromUrl(
    'https://cdn.microlink.io/data/all.json',
    {
      dist: path.resolve(__dirname, '../../../data/demo-links.json')
    }
  )
