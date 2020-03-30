'use strict'

const path = require('path')

require('./fetch-data')({
  dist: path.resolve(__dirname, '../data/analytics.json'),
  url: 'https://analytics.microlink.io',
  mapper: data => {
    const lastMonth = Object.keys(data.byMonth)[0]
    return [data.byMonth[lastMonth]]
  }
})
