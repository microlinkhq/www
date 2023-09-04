'use strict'

const { identity, castArray, isEmpty } = require('lodash')
const { readFile, writeFile } = require('fs/promises')
const jsonFuture = require('json-future')

const existsFile = async filepath => {
  try {
    return (await readFile(filepath)).byteLength !== 0
  } catch (_) {
    return false
  }
}

const fetchData = async url => {
  const res = await fetch(url)
  const body = Buffer.from(await res.arrayBuffer())
  if (isEmpty(body)) throw new Error('DATA_NOT_FOUND')
  const contentType = res.headers.get('content-type')
  const isJSON = contentType.includes('application/json')
  const data = isJSON ? JSON.parse(body) : body
  return { data, isJSON }
}

module.exports.fromUrl = async (url, { dist, mapper = identity }) => {
  if (await existsFile(dist)) return
  const { data, isJSON } = await fetchData(url)
  return isJSON
    ? jsonFuture.saveAsync(dist, castArray(mapper(data)))
    : writeFile(dist, data)
}

module.exports.fromCode = async (fn, { dist }) =>
  !(await existsFile(dist)) && jsonFuture.saveAsync(dist, castArray(await fn()))
