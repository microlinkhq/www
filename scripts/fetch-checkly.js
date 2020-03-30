'use strict'

const path = require('path')

require('./fetch-data')({
  dist: path.resolve(__dirname, '../data/checkly.json'),
  url: 'https://checkly.microlink.io'
})
