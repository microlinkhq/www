'use strict'

const { writeFileSync, readFileSync } = require('node:fs')
const { dirname, join } = require('node:path')

const dts = readFileSync(
  join(dirname(require.resolve('microlink.io')), 'index.d.ts'),
  'utf8'
)

writeFileSync(
  join(__dirname, '../src/components/pages/editor/monaco-dts.js'),
  `export const MICROLINK_DTS = ${JSON.stringify(dts)}\n`
)
