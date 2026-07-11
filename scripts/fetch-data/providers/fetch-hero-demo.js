'use strict'

const { mkdir, readFile, writeFile } = require('fs/promises')
const debug = require('debug-logfmt')('data:providers')
const mql = require('@microlink/mql')
const path = require('path')

const {
  DEMO_URLS,
  REQUEST_OPTS
} = require('../../../src/components/pages/home/hero-demo-requests')

const DIST = path.resolve(__dirname, '../../../static/data/hero-demo')
const MANIFEST = path.join(DIST, 'index.json')

const ATTEMPTS = 2

const toEntry = async (vertical, client = mql) => {
  const url = DEMO_URLS[vertical]
  const opts = REQUEST_OPTS[vertical]
  const [apiUrl] = client.getApiUrl(url, opts)
  const { response, ...body } = await client(url, opts)
  return {
    apiUrl,
    body,
    headers: Object.fromEntries(response.headers.entries())
  }
}

const fetchEntry = async (vertical, client) => {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      return await toEntry(vertical, client)
    } catch (error) {
      debug.warn('fetch-hero-demo', {
        vertical,
        attempt,
        error: error.message
      })
      if (attempt === ATTEMPTS) return null
    }
  }
}

const isReusable = async () => {
  try {
    const buffer = await readFile(MANIFEST)
    return buffer.byteLength > 0
  } catch (_) {
    return false
  }
}

const fetchHeroDemo = async () => {
  if (await isReusable()) return
  await mkdir(DIST, { recursive: true })
  const entries = await Promise.all(
    Object.keys(DEMO_URLS).map(async vertical => {
      const entry = await fetchEntry(vertical)
      if (entry === null) return null
      await writeFile(
        path.join(DIST, `${vertical}.json`),
        JSON.stringify(entry)
      )
      return [vertical, entry.apiUrl]
    })
  )
  const manifest = Object.fromEntries(entries.filter(Boolean))
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2))
}

module.exports = fetchHeroDemo
module.exports.dist = DIST
module.exports.ATTEMPTS = ATTEMPTS
module.exports.toEntry = toEntry
module.exports.fetchEntry = fetchEntry
