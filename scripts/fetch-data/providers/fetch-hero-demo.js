'use strict'

const { mkdir, readdir, rm, writeFile } = require('fs/promises')
const createClient = require('microlink.io')
const { default: pMap } = require('p-map')
const path = require('path')

const {
  DEMO_URLS,
  SNAPSHOT_URLS,
  REQUEST_OPTS
} = require('../../../src/components/pages/home/hero-demo-requests')

const DIST = path.resolve(__dirname, '../../../static/data/hero-demo')
const KEYLESS_CONCURRENCY = 2

const keyless = createClient()

const createFetchClient = (apiKey = process.env.MICROLINK_API_KEY) =>
  createClient({ apiKey })

const concurrencyFor = apiKey => (apiKey ? Infinity : KEYLESS_CONCURRENCY)

const toEntry = async (vertical, client = createFetchClient()) => {
  const url = DEMO_URLS[vertical]
  const opts = REQUEST_OPTS[vertical]
  const apiUrl = keyless.apiUrl(url, opts)
  const { response, ...body } = await client.request(url, opts)
  return {
    apiUrl,
    body,
    headers: Object.fromEntries(response.headers.entries())
  }
}

const fetchHeroDemo = ({
  apiKey = process.env.MICROLINK_API_KEY,
  client = createFetchClient(apiKey),
  dist = DIST
} = {}) =>
  require('../create-provider').fromCode(
    async () => {
      await mkdir(dist, { recursive: true })
      const entries = await pMap(
        Object.keys(SNAPSHOT_URLS),
        async vertical => {
          const entry = await toEntry(vertical, client)
          await writeFile(
            path.join(dist, `${vertical}.json`),
            JSON.stringify(entry)
          )
          return [vertical, entry.apiUrl]
        },
        { concurrency: concurrencyFor(apiKey) }
      )
      const snapshots = Object.fromEntries(entries)
      const stale = (await readdir(dist)).filter(
        file =>
          file.endsWith('.json') &&
          file !== 'index.json' &&
          snapshots[file.replace('.json', '')] === undefined
      )
      await Promise.all(stale.map(file => rm(path.join(dist, file))))
      return snapshots
    },
    { dist: path.join(dist, 'index.json') }
  )

module.exports = fetchHeroDemo
module.exports.dist = DIST
module.exports.toEntry = toEntry
module.exports.concurrencyFor = concurrencyFor
module.exports.createFetchClient = createFetchClient
