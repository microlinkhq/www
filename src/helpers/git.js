import $ from 'tinyspawn'

export const getLastModifiedDate = filepath =>
  $(`git log --max-count=1 --format="%cI" -- ${filepath}`).then(
    ({ stdout }) => stdout
  )

export const branchName = () =>
  $('git rev-parse --abbrev-ref HEAD').then(({ stdout }) => stdout)

export const mv = (sourcePath, destinationPath) =>
  $(`git mv "${sourcePath}" "${destinationPath}"`)
