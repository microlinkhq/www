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

const isIncludedPath = value =>
  INCLUDED_PREFIXES.some(prefix => value.startsWith(prefix))

const buildTimestamps = async () => {
  const { stdout } = await $(
    'git -c core.quotePath=false log --reverse --format=%cI --name-only'
  )

  const modifiedTimestamps = Object.create(null)
  const createdTimestamps = Object.create(null)
  let currentTimestamp = null

  for (const rawLine of stdout.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue

    if (/^\d{4}-\d{2}-\d{2}T\d{2}:/.test(line)) {
      const parsedDate = new Date(line)
      currentTimestamp = Number.isNaN(parsedDate.getTime())
        ? null
        : parsedDate.toISOString()
      continue
    }

    if (currentTimestamp && isIncludedPath(line)) {
      if (!createdTimestamps[line]) {
        createdTimestamps[line] = currentTimestamp
      }

      modifiedTimestamps[line] = currentTimestamp
    }
  }

  const orderTimestamps = timestamps =>
    Object.keys(timestamps)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = timestamps[key]
        return accumulator
      }, {})

  const orderedModifiedTimestamps = orderTimestamps(modifiedTimestamps)
  const orderedCreatedTimestamps = orderTimestamps(createdTimestamps)

  await writeFile(
    MODIFIED_OUTPUT_FILE,
    `${JSON.stringify(orderedModifiedTimestamps, null, 2)}\n`
  )

  await writeFile(
    CREATED_OUTPUT_FILE,
    `${JSON.stringify(orderedCreatedTimestamps, null, 2)}\n`
  )

  await $(
    'git add data/git-timestamps-modified.json data/git-timestamps-created.json'
  )
}

buildTimestamps().catch(error => {
  console.error(error)
  process.exit(1)
})
