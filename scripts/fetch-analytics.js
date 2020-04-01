'use strict'

const path = require('path')

require('./fetch-data')({
  dist: path.resolve(__dirname, '../data/analytics.json'),
  url: 'https://analytics.microlink.io',
  mapper: data => {
    const lastMonth = Object.keys(data.byMonth)[1]
    return [data.byMonth[lastMonth]]
  }
})
