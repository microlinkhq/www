'use strict'

const { identity, castArray, isEmpty } = require('lodash')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const pRetry = require('p-retry')
const got = require('got')

const fetchData = async url => {
  console.log({ url })
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
  const data = await pRetry(() => fetchData(url))
  try {
    console.log(url, {
      type: typeof data,
      data: !!data,
      preview: data.substring(1, 5)
    })
  } catch (err) {
    console.log('ERR', data)
  }
  const body = mapper(data)
  return jsonFuture.saveAsync(dist, castArray(body))
}
