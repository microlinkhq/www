'use strict'

const { writeFile } = require('node:fs/promises')
const path = require('node:path')
const $ = require('tinyspawn')

const OUTPUT_FILE = path.join(process.cwd(), 'data', 'git-timestamps.json')

const INCLUDED_PREFIXES = ['src/content/', 'src/pages/']

const isIncludedPath = value =>
  INCLUDED_PREFIXES.some(prefix => value.startsWith(prefix))

const buildTimestamps = async () => {
  const { stdout } = await $(
    'git -c core.quotePath=false log --reverse --format=%cI --name-only'
  )

  const timestamps = Object.create(null)
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
      timestamps[line] = currentTimestamp
    }
  }

  const orderedTimestamps = Object.keys(timestamps)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = timestamps[key]
      return accumulator
    }, {})

  await writeFile(
    OUTPUT_FILE,
    `${JSON.stringify(orderedTimestamps, null, 2)}\n`
  )

  await $('git add data/git-timestamps.json')
}

buildTimestamps().catch(error => {
  console.error(error)
  process.exit(1)
})
