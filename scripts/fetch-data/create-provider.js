'use strict'

const { identity, castArray, isEmpty } = require('lodash')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const got = require('got')

const fetchData = async url => {
  const body = await got(url).json()
  if (isEmpty(body)) throw new Error('DATA_NOT_FOUND')
  return body
}

module.exports = async ({ dist, url, mapper = identity }) => {
  if (await existsFile(dist)) {
    if (!isEmpty(require(dist))) {
      return
    }
  }
  const data = await fetchData(url)
  const body = mapper(data)
  return jsonFuture.saveAsync(dist, castArray(body))
}
