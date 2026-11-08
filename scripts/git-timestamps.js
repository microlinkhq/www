'use strict'

const { writeFile } = require('node:fs/promises')
const path = require('node:path')
const $ = require('tinyspawn')

const MODIFIED_OUTPUT_FILE = path.join(
  process.cwd(),
  'data',
  'git-timestamps-modified.json'
)
const CREATED_OUTPUT_FILE = path.join(
  process.cwd(),
  'data',
  'git-timestamps-created.json'
)

const INCLUDED_PREFIXES = ['src/content/', 'src/pages/']

const COMMIT_DATE_LINE = /^\d{4}-\d{2}-\d{2}T\d{2}:/

const isIncludedPath = value =>
  INCLUDED_PREFIXES.some(prefix => value.startsWith(prefix))

const toDayTimestamp = date =>
  `${date.toISOString().slice(0, 10)}T00:00:00.000Z`

const toLines = output =>
  output
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)

const orderTimestamps = timestamps =>
  Object.keys(timestamps)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = timestamps[key]
      return accumulator
    }, {})

const collectTimestamps = ({ log, staged = '', now = new Date() }) => {
  const modified = Object.create(null)
  const created = Object.create(null)

  const stamp = (file, timestamp) => {
    if (!isIncludedPath(file)) return
    if (!created[file]) created[file] = timestamp
    modified[file] = timestamp
  }

  let currentTimestamp = null

  for (const line of toLines(log)) {
    if (COMMIT_DATE_LINE.test(line)) {
      const parsedDate = new Date(line)
      currentTimestamp = Number.isNaN(parsedDate.getTime())
        ? null
        : toDayTimestamp(parsedDate)
    } else if (currentTimestamp) {
      stamp(line, currentTimestamp)
    }
  }

  const today = toDayTimestamp(now)
  for (const file of toLines(staged)) stamp(file, today)

  return {
    modified: orderTimestamps(modified),
    created: orderTimestamps(created)
  }
}

const toJson = value => `${JSON.stringify(value, null, 2)}\n`

const main = async () => {
  const [{ stdout: log }, { stdout: staged }] = await Promise.all([
    $('git -c core.quotePath=false log --reverse --format=%cI --name-only'),
    $('git -c core.quotePath=false diff --cached --name-only --diff-filter=d')
  ])

  const { modified, created } = collectTimestamps({ log, staged })

  await Promise.all([
    writeFile(MODIFIED_OUTPUT_FILE, toJson(modified)),
    writeFile(CREATED_OUTPUT_FILE, toJson(created))
  ])

  await $(
    'git add data/git-timestamps-modified.json data/git-timestamps-created.json'
  )
}

module.exports = { collectTimestamps }

if (require.main === module) {
  main().catch(error => {
    console.error(error)
    process.exit(1)
  })
}
