'use strict'

const path = require('path')

module.exports = () =>
  require('../create-provider').fromUrl('https://analytics.microlink.io', {
    dist: path.resolve(__dirname, '../../../data/analytics.json'),
    mapper: data => {
      const lastMonth = Object.keys(data.byMonth)[1]
      return [data.byMonth[lastMonth]]
    }
  })
