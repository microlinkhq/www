'use strict'

const { identity, castArray, isEmpty } = require('lodash')
const jsonFuture = require('json-future')
const fs = require('fs/promises')
const got = require('got')

const exists = async filepath => {
  try {
    return (await fs.readFile(filepath)).byteLength !== 0
  } catch (_) {
    return false
  }
}

const fetchData = async url => {
  const { headers, body } = await got(url)
  if (isEmpty(body)) throw new Error('DATA_NOT_FOUND')

  const contentType = headers['content-type']
  const isJSON = contentType.includes('application/json')
  const data = isJSON ? JSON.parse(body) : body

  return { data, isJSON }
}

module.exports.fromUrl = async (url, { dist, mapper = identity }) => {
  if (await exists(dist)) return
  const { data, isJSON } = await fetchData(url)
  return isJSON
    ? jsonFuture.saveAsync(dist, castArray(mapper(data)))
    : fs.writeFile(dist, data)
}

module.exports.fromCode = async (fn, { dist }) =>
  !(await exists(dist)) && jsonFuture.saveAsync(dist, castArray(await fn()))
