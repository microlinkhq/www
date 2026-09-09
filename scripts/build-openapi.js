'use strict'

/**
 * Generates static/openapi.json from the API parameter docs and error codes.
 *
 * Usage:
 *   node scripts/build-openapi.js
 */

const { readdirSync, readFileSync, writeFileSync } = require('fs')
const path = require('path')

const ROOT_DIR = path.join(__dirname, '..')
const PARAMETERS_DIR = path.join(
  ROOT_DIR,
  'src',
  'content',
  'docs',
  'api',
  'parameters'
)
const ERROR_CODES_PATH = path.join(
  ROOT_DIR,
  'src',
  'content',
  'docs',
  'api',
  'basics',
  'error-codes.md'
)
const OUTPUT_PATH = path.join(ROOT_DIR, 'static', 'openapi.json')

const load = async () => {
  const { buildOpenApi, errorCodesFrom, parameterFromDoc } = await import(
    '../src/helpers/openapi.js'
  )

  const files = readdirSync(PARAMETERS_DIR, { recursive: true })
    .filter(entry => entry.endsWith('.md'))
    .map(entry => entry.split(path.sep).join('/'))
    .sort()

  const parameters = files.map(file =>
    parameterFromDoc(
      file,
      readFileSync(path.join(PARAMETERS_DIR, file), 'utf8')
    )
  )

  const spec = buildOpenApi({
    parameters,
    errorCodes: errorCodesFrom(readFileSync(ERROR_CODES_PATH, 'utf8'))
  })

  writeFileSync(OUTPUT_PATH, `${JSON.stringify(spec, null, 2)}\n`)
  console.log(`Generated ${path.relative(ROOT_DIR, OUTPUT_PATH)}`)
}

load()
