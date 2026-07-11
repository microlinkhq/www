'use strict'

const { readdirSync } = require('fs')
const { rm } = require('fs/promises')
const { castArray } = require('lodash')
const path = require('path')

const PROVIDERS_DIR = path.resolve(__dirname, 'providers')

const dists = () =>
  readdirSync(PROVIDERS_DIR).flatMap(providerPath => {
    const { dist } = require(path.join(PROVIDERS_DIR, providerPath))
    if (dist === undefined) throw new Error(`MISSING_DIST: ${providerPath}`)
    return castArray(dist)
  })

const clean = () =>
  Promise.all(dists().map(dist => rm(dist, { recursive: true, force: true })))

module.exports = { dists, clean }

if (require.main === module) {
  clean().catch(error => console.error(error) || process.exit(1))
}
