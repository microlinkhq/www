const TIMESTAMPS_FILENAME = 'git-timestamps-modified.json'

let cachedTimestamps = null
let didLoadTimestamps = false

const loadTimestamps = async () => {
  if (didLoadTimestamps) {
    return cachedTimestamps
  }

  try {
    const { readFile } = await import('node:fs/promises')
    const path = await import('node:path')
    const timestampsPath = path.join(process.cwd(), 'data', TIMESTAMPS_FILENAME)
    const contents = await readFile(timestampsPath, 'utf8')
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
  const path = await import('node:path')
  const normalizedPath = path.isAbsolute(filepath)
    ? path.relative(process.cwd(), filepath)
    : filepath

  if (timestamps?.[normalizedPath]) {
    return parseGitTimestamp(timestamps[normalizedPath], filepath)
  }

  const { default: $ } = await import('tinyspawn')
  const { stdout: value } = await $(
    `git log --max-count=1 --format=%cI -- ${normalizedPath}`
  )

  if (!value) {
    return new Date().toISOString()
  }

  return parseGitTimestamp(value, filepath)
}

export const branchName = async () => {
  const { default: $ } = await import('tinyspawn')
  return $('git rev-parse --abbrev-ref HEAD').then(({ stdout }) => stdout)
}

export const mv = async (sourcePath, destinationPath) => {
  const { default: $ } = await import('tinyspawn')
  return $(`git mv "${sourcePath}" "${destinationPath}"`)
}
