'use strict'

const { identity, castArray, isEmpty } = require('lodash')
const { readFile, writeFile } = require('fs/promises')
const jsonFuture = require('json-future')

const readExisting = async filepath => {
  try {
    const buffer = await readFile(filepath)
    return buffer.byteLength === 0 ? undefined : buffer
  } catch (_) {
    return undefined
  }
}

const isReusable = async (filepath, isFresh) => {
  const buffer = await readExisting(filepath)
  if (buffer === undefined) return false
  if (isFresh === undefined) return true
  try {
    return isFresh(JSON.parse(buffer)) === true
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

module.exports.fromUrl = async (url, { dist, mapper = identity, isFresh }) => {
  if (await isReusable(dist, isFresh)) return
  const { data, isJSON } = await fetchData(url)
  return isJSON
    ? jsonFuture.saveAsync(dist, castArray(mapper(data)))
    : writeFile(dist, data)
}

module.exports.fromCode = async (fn, { dist, isFresh }) =>
  !(await isReusable(dist, isFresh)) && jsonFuture.saveAsync(dist, await fn())
