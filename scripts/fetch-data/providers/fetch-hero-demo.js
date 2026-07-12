'use strict'

const { mkdir, writeFile } = require('fs/promises')
const debug = require('debug-logfmt')('data:providers')
const mql = require('@microlink/mql')
const path = require('path')

const { isReusable } = require('../create-provider')
const {
  DEMO_URLS,
  SNAPSHOT_URLS,
  INITIAL_VERTICAL,
  REQUEST_OPTS
} = require('../../../src/components/pages/home/hero-demo-requests')

const DIST = path.resolve(__dirname, '../../../static/data/hero-demo')

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

const fetchHeroDemo = async ({ client, dist = DIST } = {}) => {
  const manifest = path.join(dist, 'index.json')
  if (await isReusable(manifest)) return
  await mkdir(dist, { recursive: true })
  const entries = await Promise.all(
    Object.keys(SNAPSHOT_URLS).map(async vertical => {
      const entry = await fetchEntry(vertical, client)
      if (entry === null) return null
      await writeFile(
        path.join(dist, `${vertical}.json`),
        JSON.stringify(entry)
      )
      return [vertical, entry.apiUrl]
    })
  )
  const snapshots = Object.fromEntries(entries.filter(Boolean))
  if (snapshots[INITIAL_VERTICAL] === undefined) {
    throw new Error('HERO_DEMO_UNAVAILABLE')
  }
  await writeFile(manifest, JSON.stringify(snapshots, null, 2))
}

module.exports = fetchHeroDemo
module.exports.dist = DIST
module.exports.ATTEMPTS = ATTEMPTS
module.exports.toEntry = toEntry
module.exports.fetchEntry = fetchEntry
