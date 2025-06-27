import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

import { hash } from './hash.js'
import { mqlCode } from './script.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const CASES = [
  ['https://github.com/microlinkhq'],
  ['https://github.com/microlinkhq', { apiKey: 'YOUR_API_TOKEN' }]
]

const output = CASES.reduce((acc, [url, options]) => {
  acc[hash(url, options)] = mqlCode(url, options)
  return acc
}, {})

const filepath = path.join(__dirname, 'definitions.json')
await writeFile(filepath, JSON.stringify(output, null, 2))
