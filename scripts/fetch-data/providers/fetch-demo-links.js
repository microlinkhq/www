'use strict'

const path = require('path')

const DIST = path.resolve(__dirname, '../../../data/demo-links.json')

module.exports = () =>
  require('../create-provider').fromUrl(
    'https://cdn.microlink.io/data/all.json',
    { dist: DIST }
  )

module.exports.dist = DIST
