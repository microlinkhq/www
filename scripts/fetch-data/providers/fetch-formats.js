'use strict'

const debug = require('debug-logfmt')('fetch-formats')
const mql = require('@microlink/mql')
const { sortBy } = require('lodash')
const { getType } = require('mime')
const path = require('path')

const fileExamples = {}

/* We avoid cdn.microlink.io explicity since it
  runs on top of CloudFlare and the compression
  removes 'content-length' header */
const MICROLINK_CDN_URL = 'https://cdn-microlink.vercel.app'

fileExamples.avi = `${MICROLINK_CDN_URL}/file-examples/file_example_AVI_1280_1_5MG.avi`
fileExamples.csv = `${MICROLINK_CDN_URL}/file-examples/file_example_CSV_5000.csv`
fileExamples.mov = `${MICROLINK_CDN_URL}/file-examples/file_example_MOV_480_700kB.mov`
fileExamples.mp3 = `${MICROLINK_CDN_URL}/file-examples/file_example_MP3_700KB.mp3`
fileExamples.mp4 = `${MICROLINK_CDN_URL}/file-examples/file_example_MP4_480_1_5MG.mp4`
fileExamples.odp = `${MICROLINK_CDN_URL}/file-examples/file_example_ODP_200kB.odp`
fileExamples.ods = `${MICROLINK_CDN_URL}/file-examples/file_example_ODS_10.ods`
fileExamples.ogg = `${MICROLINK_CDN_URL}/file-examples/file_example_OOG_1MG.ogg`
fileExamples.ppt = `${MICROLINK_CDN_URL}/file-examples/file_example_PPT_250kB.ppt`
fileExamples.wav = `${MICROLINK_CDN_URL}/file-examples/file_example_WAV_1MG.wav`
fileExamples.wmv = `${MICROLINK_CDN_URL}/file-examples/file_example_WMV_480_1_2MB.wmv`
fileExamples.xls = `${MICROLINK_CDN_URL}/file-examples/file_example_XLS_10.xls`
fileExamples.xlsx = `${MICROLINK_CDN_URL}/file-examples/file_example_XLSX_10.xlsx`
fileExamples.xml = `${MICROLINK_CDN_URL}/file-examples/file_example_XML_24kb.xml`
fileExamples.doc = `${MICROLINK_CDN_URL}/file-examples/file-sample_100kB.doc`
fileExamples.docx = `${MICROLINK_CDN_URL}/file-examples/file-sample_100kB.docx`
fileExamples.odt = `${MICROLINK_CDN_URL}/file-examples/file-sample_100kB.odt`
fileExamples.rtf = `${MICROLINK_CDN_URL}/file-examples/file-sample_100kB.rtf`
fileExamples.pdf = `${MICROLINK_CDN_URL}/file-examples/file-sample_150kB.pdf`
fileExamples.html = `${MICROLINK_CDN_URL}/file-examples/index.html`
fileExamples.zip = `${MICROLINK_CDN_URL}/file-examples/zip_2MB.zip`
fileExamples.svg = `${MICROLINK_CDN_URL}/logo/logo.svg`
fileExamples.avif =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.avif'
fileExamples.bmp =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.bmp'
fileExamples.cur =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.cur'
fileExamples.dds =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.dds'
fileExamples.eps =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.eps'
fileExamples.gif =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.gif'
fileExamples.heic =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.heic'
fileExamples.heif =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.heif'
fileExamples.ico =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.ico'
fileExamples.jfif =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.jfif'
fileExamples.jpg =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.jpg'
fileExamples.mng =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.mng'
fileExamples.odd =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.odd'
fileExamples.pbm =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.pbm'
fileExamples.pgm =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.pgm'
fileExamples.png =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.png'
fileExamples.pnm =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.pnm'
fileExamples.ppm =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.ppm'
fileExamples.ps =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.ps'
fileExamples.psd =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.psd'
fileExamples.raw =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.raw'
fileExamples.tga =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.tga'
fileExamples.tiff =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.tiff'
fileExamples.webp =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.webp'
fileExamples.xbm =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.xbm'
fileExamples.xpm =
  'https://raw.githubusercontent.com/microlinkhq/splashy/master/test/fixtures/w3c_home.xpm'
fileExamples.webm =
  'https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4e/Sara_Danius_announces_the_Nobel_Prize_in_Literature_2016_03.webm/Sara_Danius_announces_the_Nobel_Prize_in_Literature_2016_03.webm.480p.vp9.webm'

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

  for (const [, url] of Object.entries(fileExamples)) {
    const contentType = getType(url) || 'application'
    const [type] = contentType?.split('/')
    const isImage = type === 'image'

    const { data, response } = await mql(
      `https://compose-html.vercel.app/?body=${url}`,
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
      extension: path.extname(url).substring(1),
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
  }

  return [getConfidence(result), sortBy(result, 'extension')]
}

module.exports = () =>
  require('../create-provider').fromCode(fn, {
    dist: path.resolve(__dirname, '../../../data/formats.json')
  })
