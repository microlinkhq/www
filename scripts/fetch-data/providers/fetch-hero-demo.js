'use strict'

const { mkdir, readdir, rm, writeFile } = require('fs/promises')
const mql = require('@microlink/mql')
const path = require('path')

const { isReusable } = require('../create-provider')

const {
  DEMO_URLS,
  SNAPSHOT_URLS,
  REQUEST_OPTS
} = require('../../../src/components/pages/home/hero-demo-requests')

const DIST = path.resolve(__dirname, '../../../static/data/hero-demo')

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

const fetchHeroDemo = async ({ client, dist = DIST } = {}) => {
  const manifest = path.join(dist, 'index.json')
  if (await isReusable(manifest)) return
  await mkdir(dist, { recursive: true })
  const entries = await Promise.all(
    Object.keys(SNAPSHOT_URLS).map(async vertical => {
      const entry = await toEntry(vertical, client)
      await writeFile(
        path.join(dist, `${vertical}.json`),
        JSON.stringify(entry)
      )
      return [vertical, entry.apiUrl]
    })
  )
  const snapshots = Object.fromEntries(entries)
  const stale = (await readdir(dist)).filter(
    file =>
      file.endsWith('.json') &&
      file !== 'index.json' &&
      snapshots[file.replace('.json', '')] === undefined
  )
  await Promise.all(stale.map(file => rm(path.join(dist, file))))
  await writeFile(manifest, JSON.stringify(snapshots, null, 2))
}

module.exports = fetchHeroDemo
module.exports.dist = DIST
module.exports.toEntry = toEntry
