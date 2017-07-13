'use strict'

const config = require('config')
const pkg = require('./package.json')

// we do that for removing non object properties
const rawConfig = JSON.parse(JSON.stringify(config))

const globalConfig = Object.keys(rawConfig).reduce((acc, key) => {
  const value = rawConfig[key]
  acc[`APP_${key.toUpperCase()}`] = value
  return acc
}, {})

globalConfig.APP_VERSION = pkg.version

module.exports = globalConfig
