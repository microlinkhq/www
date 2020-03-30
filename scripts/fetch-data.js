'use strict'

const { identity, castArray, isEmpty } = require('lodash')
const beautyError = require('beauty-error')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const pRetry = require('p-retry')
const got = require('got')

const fetchData = async url => {
  const body = await got(url).json()
  if (!body) throw new Error('DATA_NOT_FOUND')
  return body
}

module.exports = async ({ dist, url, mapper = identity }) => {
  try {
    if (await existsFile(dist)) {
      if (!isEmpty(require(dist))) {
        return
      }
    }
    const data = await pRetry(() => fetchData(url))
    const body = mapper(data)
    return jsonFuture.saveAsync(dist, castArray(body))
  } catch (err) {
    console.log(beautyError(err))
    process.exit(1)
  }
}
