'use strict'

const path = require('path')

module.exports = () =>
  require('../create-provider')({
    dist: path.resolve(__dirname, '../../../data/demo-links.json'),
    url: 'https://cdn.microlink.io/data/all.json'
  })
