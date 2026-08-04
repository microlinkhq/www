'use strict'

const optimo = require('optimo')

const onLogs = logEntry => console.error(logEntry)

const main = async filePaths => {
  const results = await Promise.all(
    filePaths.map(filePath => optimo.file(filePath, { onLogs }))
  )
  const missingBinaries = [
    ...new Set(results.flatMap(result => result?.missingBinaries ?? []))
  ]

  if (missingBinaries.length > 0) {
    console.error(
      `optimo: missing binaries in $PATH: ${missingBinaries.join(', ')}`
    )
    process.exit(1)
  }
}

main(process.argv.slice(2)).catch(error => {
  console.error(error)
  process.exit(1)
})
