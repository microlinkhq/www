import $ from 'tinyspawn'

export const getLastModifiedDate = async filepath => {
  const { stdout: value } = await $(
    `git log --max-count=1 --format=%cI -- ${filepath}`
  )

  if (!value) {
    throw new Error(`No git timestamp for ${filepath}`)
  }

  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid git timestamp for ${filepath}`)
  }

  return parsedDate.toISOString()
}

export const branchName = () =>
  $('git rev-parse --abbrev-ref HEAD').then(({ stdout }) => stdout)

export const mv = (sourcePath, destinationPath) =>
  $(`git mv "${sourcePath}" "${destinationPath}"`)
