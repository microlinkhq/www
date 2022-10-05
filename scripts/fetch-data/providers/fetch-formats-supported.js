'use strict'

const debug = require('debug-logfmt')('data:providers:formats-supported')
const mql = require('@microlink/mql')
const { sortBy } = require('lodash')
const { getType } = require('mime')
const path = require('path')
const got = require('got')

/* We avoid cdn.microlink.io explicity since it
  runs on top of CloudFlare and the compression
  removes 'content-length' header */
const MICROLINK_CDN_URL =
  'https://cdn-e6etw8l60-microlink.vercel.app/file-examples'

const fileUrls = async () =>
  (
    await got(`${MICROLINK_CDN_URL}/index.json`, {
      responseType: 'json',
      resolveBodyOnly: true
    })
  ).map(file => `${MICROLINK_CDN_URL}/${file}`)

const getConfidence = formats => {
  const total =
    formats.length * 3 +
    formats.reduce(
      (acc, { palette }) => (palette === undefined ? acc : acc + 1),
      0
    ) +
    formats.reduce(
      (acc, { duration }) => (duration === undefined ? acc : acc + 1),
      0
    )

  const score = formats.reduce((acc, format) => {
    if (format.size === false) --acc
    if (format.width === false) --acc
    if (format.height === false) --acc
    if (format.palette === false) --acc
    if (format.duration === false) --acc
    return acc
  }, total)

  const result = (score / total) * 100
  return { score: `${Math.round(result * 100) / 100}%` }
}

const fn = async () => {
  const result = []

  for (const fileUrl of await fileUrls()) {
    try {
      const contentType = getType(fileUrl) || 'application'
      const [type] = contentType?.split('/')
      const isImage = type === 'image'

      const { data, response } = await mql(
        `https://compose-html.vercel.app/?body=${fileUrl}`,
        {
          apiKey: process.env.MICROLINK_API_KEY,
          data: {
            file: {
              selector: 'body',
              type: isImage ? 'image' : 'url'
            }
          },
          filter: 'file',
          prerender: false,
          // force: true,
          palette: true
        }
      )

      const { file } = data

      const item = {
        url: file.url,
        extension: path.extname(fileUrl).substring(1),
        type,
        height: file.height !== null,
        width: file.height !== null,
        size: file.size !== null
      }

      if (isImage) {
        item.palette = file.palette !== null
      }

      if (file.duration !== undefined) {
        item.duration = file.duration !== null
      }

      debug(response.requestUrl, '→', item)
      result.push(item)
    } catch (err) {
      debug.error(fileUrl, err)
    }
  }

  return [getConfidence(result), sortBy(result, 'extension')]
}

module.exports = () =>
  require('../create-provider').fromCode(fn, {
    dist: path.resolve(__dirname, '../../../data/formats-supported.json')
  })
