'use strict'

const path = require('path')

require('./fetch-data')({
  dist: path.resolve(__dirname, '../data/demo-links.json'),
  url: 'https://cdn.microlink.io/data/all.json'
})
