import fs from 'node:fs'
import { describe, expect, test } from 'vitest'
import { SRC, relative, walk } from '../utils/jsx-source'

const DEPS = /\n {4}\[([^\]]*)\]\n {2}\)/

describe('pasted api key', () => {
  test('the callback that sends the stored key lists it as a dependency', () => {
    const missing = []
    for (const file of walk(SRC)) {
      const source = fs.readFileSync(file, 'utf8')
      let from = 0
      while (from < source.length) {
        const at = source.indexOf('apiKey: localStorageData', from)
        if (at === -1) break
        const match = DEPS.exec(source.slice(at))
        const names = match ? match[1].split(',').map(name => name.trim()) : []
        if (!names.includes('localStorageData')) {
          missing.push(
            `${relative(file)}:${source.slice(0, at).split('\n').length}`
          )
        }
        from = at + 'apiKey: localStorageData'.length
      }
    }
    expect(missing).toEqual([])
  })
})
