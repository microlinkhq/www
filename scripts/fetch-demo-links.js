'use strict'

const { compact, map, chain, isNil, get, reduce } = require('lodash')
const debug = require('debug-logfmt')('microlink-www')
const demoLinks = require('@microlink/demo-links')
const humanizeUrl = require('humanize-url')
const beautyError = require('beauty-error')
const parseDomain = require('parse-domain')
const existsFile = require('exists-file')
const jsonFuture = require('json-future')
const mql = require('@microlink/mql')
const download = require('download')
const pAll = require('p-all')
const path = require('path')

const getDomain = url => (parseDomain(url) || {}).domain

const { SITE_URL } = require('../env')
const DATA_DEMO_LINKS_PATH = path.resolve(__dirname, '../data/demo-links.json')
const { MICROLINK_API_KEY } = process.env

const API_MEDIA_PROPS = ['logo', 'screenshot', 'video', 'image']

const getMediaAssetPath = (data, propName) => {
  const propValue = get(data, propName)

  const publisher = get(data, 'publisher') || getDomain(data.url)

  if (!publisher) {
    throw new TypeError(`${data.url}: publisher for ${propName} is empty.`)
  }

  const type = get(propValue, 'type')

  if (!type) {
    throw new TypeError(`${data[propName].url}: type is empty.`)
  }

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

const fetchDemoLink = async (key, { url, ...props }) => {
  const id = humanizeUrl(url)
  try {
    const { data } = await mql(url, {
      apiKey: MICROLINK_API_KEY,
      browser: 'light',
      force: true,
      audio: true,
      palette: true,
      retry: 2,
      screenshot: true
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

const main = async () => {
  if (await existsFile(DATA_DEMO_LINKS_PATH)) return
  const links = map(demoLinks, (value, key) => () => fetchDemoLink(key, value))
  const data = await pAll(links, { concurrency: 5 })
  return jsonFuture.saveAsync(DATA_DEMO_LINKS_PATH, compact(data))
}

main()
  .then(() => process.exit())
  .catch(err => {
    console.log(beautyError(err))
    process.exit(1)
  })
