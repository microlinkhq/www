'use strict'

const path = require('path')

const roundPretty = pretty => {
  const [, value, unit] = pretty.match(/^([\d.]+)(\D+)$/)
  return `${Math.floor(Number(value) / 50) * 50}${unit}`
}

module.exports = () =>
  require('../create-provider').fromUrl(
    'https://analytics.microlink.io?domain=microlink.io',
    {
      dist: path.resolve(__dirname, '../../../data/analytics.json'),
      mapper: data => {
        const lastMonth = Object.keys(data.byMonth)[1]
        const analytics = data.byMonth[lastMonth]
        return [
          { ...analytics, reqs_pretty: roundPretty(analytics.reqs_pretty) }
        ]
      }
    }
  )

module.exports.roundPretty = roundPretty
