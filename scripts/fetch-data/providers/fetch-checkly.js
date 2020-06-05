'use strict'

const path = require('path')

module.exports = () =>
  require('../create-provider')({
    dist: path.resolve(__dirname, '../data/checkly.json'),
    url: 'https://checkly.microlink.io'
  })
