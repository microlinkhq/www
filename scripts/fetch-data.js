'use strict'

const { noop, castArray, isEmpty } = require('lodash')
const beautyError = require('beauty-error')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const got = require('got')

module.exports = async ({ dist, url, mapper = noop }) => {
  try {
    if (await existsFile(dist)) {
      if (!isEmpty(require(dist))) {
        return
      }
    }
    const body = mapper(await got(url).json())
    return jsonFuture.saveAsync(dist, castArray(body))
  } catch (err) {
    console.log(beautyError(err))
    process.exit(1)
  }
}
