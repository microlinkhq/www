'use strict'

const fs = require('fs')
const path = require('path')
const debug = require('debug-logfmt')('data:providers')
const beautyError = require('beauty-error')

const providers = fs.readdirSync(path.resolve(__dirname, 'providers'))

const fetch = async () =>
  Promise.all(
    providers.map(async providerPath => {
      const filepath = path.resolve(__dirname, 'providers', providerPath)
      const mod = require(filepath)
      const result = await mod()
      debug(providerPath.replace('.js', ''))
      return result
    })
  )

fetch().catch(error => console.error(beautyError(error)) || process.exit(1))
