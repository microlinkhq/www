'use strict'

const { chain, isNil, get, reduce } = require('lodash')
const parseDomain = require('parse-domain')
const KeyvFile = require('keyv-file')
const download = require('download')
const pAll = require('p-all')
const Keyv = require('keyv')
const path = require('path')
const got = require('got')

const createApiUrl = require('../src/helpers/create-api-url')

const getDomain = url => (parseDomain(url) || {}).domain

const { SITE_URL, isProduction } = require('../env')
const { CACHE_PATH, URLS } = require('../data/urls')

const API_MEDIA_PROPS = ['logo', 'screenshot', 'video', 'image']

const keyv = new Keyv({ store: new KeyvFile({ filename: CACHE_PATH }) })

const getMediaAssetPath = (data, propName) => {
  const propValue = get(data, propName)

  const publisher = get(data, 'publisher') || getDomain(data.url)
  if (!publisher) throw new TypeError('publisher is empty.')

  const type = get(propValue, 'type')
  if (!type) throw new TypeError('type is empty.')

  const dirname = `/card/${publisher.toLowerCase()}`
  const basename = `${propName}.${type}`
  const filepath = `${dirname}/${basename}`

  return { dirname, basename, filepath }
}

const toMapLocalAsset = data => {
  const mapper = reduce(
    API_MEDIA_PROPS,
    (acc, propName) => {
      const propValue = get(data, propName)
      if (propValue) {
        const { filepath } = getMediaAssetPath(data, propName)
        const url = `${SITE_URL}${filepath}`
        acc[propName] = { ...propValue, url }
      }
      return acc
    },
    {}
  )

  return { ...data, ...mapper }
}

const toFetch = async url => {
  const { body } = await got(url, { json: true })
  const { data } = body
  return data
}

const toDownload = async data => {
  const assets = chain(API_MEDIA_PROPS)
    .map(propName => ({
      propName,
      propValue: get(data, propName)
    }))
    .filter(({ propValue }) => !isNil(propValue))
    .value()

  console.log(`fetch url=${data.url}`)

  const downloads = assets.map(({ propName, propValue }) => {
    const { dirname, basename } = getMediaAssetPath(data, propName)
    const dist = path.join(path.resolve('static'), dirname)
    console.log(`fetch:${propName} url=${propValue.url} dist=${dist}`)
    return download(propValue.url, dist, { filename: basename })
  })

  return Promise.all(downloads)
}

const fetchUrl = async url => {
  const key = createApiUrl(url, { force: true })

  const cachedData = await keyv.get(key)
  if (!isProduction && cachedData) return cachedData

  const data = await toFetch(key)
  await toDownload(data)
  const mappedData = toMapLocalAsset(data)
  await keyv.set(key, mappedData)
  return mappedData
}

const fetchUrls = URLS.map(url => () => fetchUrl(url))

pAll(fetchUrls, { concurrency: 2 }).catch(err => {
  console.log(err)
  process.exit(1)
})
