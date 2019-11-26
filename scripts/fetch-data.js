'use strict'

const { compact, map, chain, isNil, get, reduce } = require('lodash')
const debug = require('debug-logfmt')('microlink-www')
const filenamifyUrl = require('filenamify-url')
const humanizeUrl = require('humanize-url')
const beautyError = require('beauty-error')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const mql = require('@microlink/mql')
const download = require('download')
const pAll = require('p-all')
const path = require('path')

const { SITE_URL } = require('../env')
const { MICROLINK_API_KEY } = process.env

const API_MEDIA_PROPS = ['logo', 'screenshot', 'video', 'image']

const getMediaAssetPath = (data, propName) => {
  const propValue = get(data, `${propName}.url`)
  const type = get(data, `${propName}.type`)
  const dirname = `/data/${filenamifyUrl(data.url)}`
  const basename = filenamifyUrl(type ? `${propValue}.${type}` : propValue)
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

const toDownload = async data => {
  const assets = chain(API_MEDIA_PROPS)
    .map(propName => ({
      propName,
      propValue: get(data, propName)
    }))
    .filter(({ propValue }) => !isNil(propValue))
    .value()

  const downloads = assets.map(({ propName, propValue }) => {
    const { dirname, basename } = getMediaAssetPath(data, propName)
    const dist = path.join(path.resolve('static'), dirname)
    debug({ fetch: propName, url: propValue.url, dist })
    return download(propValue.url, dist, { filename: basename })
  })

  return Promise.all(downloads)
}

const fetchLink = async (key, { url, ...props }, mqlProps) => {
  const id = humanizeUrl(url)
  try {
    const { data } = await mql(url, {
      apiKey: MICROLINK_API_KEY,
      retry: 2,
      force: true,
      ...mqlProps
    })

    if (!data.lang) data.lang = 'en'
    await toDownload(data)
    debug(id)
    return { brand: key, data: toMapLocalAsset(data), url, ...props }
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = async ({ name, data, mqlProps, concurrency = 5 }) => {
  const filepath = `${path.resolve(__dirname, `../data/${name}.json`)}`

  try {
    if (await existsFile(filepath)) return
    const links = map(data, (value, key) => () =>
      fetchLink(key, value, mqlProps)
    )
    const payload = await pAll(links, { concurrency })
    return jsonFuture.saveAsync(filepath, compact(payload))
  } catch (err) {
    console.log(beautyError(err))
    process.exit(1)
  }
}
