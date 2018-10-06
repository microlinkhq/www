'use strict'

/* eslint-disable */
require = require('esm')(module)
/* eslint-enable */

const KeyvFile = require('keyv-file')
const download = require('download')
const pAll = require('p-all')
const Keyv = require('keyv')
const path = require('path')
const got = require('got')

const { CACHE_PATH, URLS } = require('../data/urls')
const isProduction = process.env.NODE_ENV === 'production'

const keyv = new Keyv({ store: new KeyvFile({ filename: CACHE_PATH }) })

const {
  ASSETS_PROPS,
  default: getMediaAssetPath
} = require('../src/helpers/get-media-asset-path')

const { default: get } = require('../src/helpers/get')

const apiFetch = async targetUrl => {
  try {
    const key = `https://api.microlink.io?url=${targetUrl}&video&audio&palette&force`
    const cachedData = await keyv.get(key)
    if (!isProduction && cachedData) return cachedData
    const { body } = await got(key, { json: true })
    const { data } = body

    const assets = ASSETS_PROPS.map(propName => ({
      url: data.url,
      propName,
      propValue: get(data, propName)
    })).filter(({ propValue }) => !!propValue)

    const downloads = assets.map(({ url, propName, propValue }) => {
      const { dirname, basename } = getMediaAssetPath(propName, data)
      const dist = path.join(path.resolve('static'), dirname)
      console.log(`fetch:${propName} url=${targetUrl} dist=${dist}`)
      return download(propValue.url, dist, { filename: basename })
    })

    await Promise.all([Promise.all(downloads), keyv.set(key, data)])
    return data
  } catch (err) {
    err.message = `${err.message}: ${targetUrl}`
    throw err
  }
}
;(async () => {
  const actions = URLS.map(url => () => apiFetch(url))
  await pAll(actions, { concurrency: 2 })
})()
