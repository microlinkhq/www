import { readFile } from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'
import $ from 'tinyspawn'

const TIMESTAMPS_PATH = path.join(process.cwd(), 'data', 'git-timestamps.json')

let cachedTimestamps = null
let didLoadTimestamps = false

const loadTimestamps = async () => {
  if (didLoadTimestamps) {
    return cachedTimestamps
  }

  try {
    const contents = await readFile(TIMESTAMPS_PATH, 'utf8')
    cachedTimestamps = JSON.parse(contents)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }

  didLoadTimestamps = true
  return cachedTimestamps
}

const parseGitTimestamp = (value, filepath) => {
  if (!value) {
    throw new Error(`No git timestamp for ${filepath}`)
  }

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid git timestamp for ${filepath}`)
  }

  return parsedDate.toISOString()
}

export const getLastModifiedDate = async filepath => {
  const timestamps = await loadTimestamps()
  const normalizedPath = path.isAbsolute(filepath)
    ? path.relative(process.cwd(), filepath)
    : filepath

  if (timestamps?.[normalizedPath]) {
    return parseGitTimestamp(timestamps[normalizedPath], filepath)
  }

  const { stdout: value } = await $(
    `git log --max-count=1 --format=%cI -- ${normalizedPath}`
  )

  return parseGitTimestamp(value, filepath)
}

export const branchName = () =>
  $('git rev-parse --abbrev-ref HEAD').then(({ stdout }) => stdout)

export const mv = (sourcePath, destinationPath) =>
  $(`git mv "${sourcePath}" "${destinationPath}"`)
