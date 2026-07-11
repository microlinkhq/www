import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import themeSpec, { theme } from '../../src/theme'

describe('theme bg auto-contrast', () => {
  test('bg injects a black/white contrast color', () => {
    expect(theme({ bg: 'white' })({ theme: themeSpec }).color).toBe('#000')
    expect(theme({ bg: 'black' })({ theme: themeSpec }).color).toBe('#FFF')
  })

  test('color declared after bg wins over the injected contrast color', () => {
    const out = theme({ bg: 'white', color: 'gray6' })({ theme: themeSpec })
    expect(out.color).toBe(themeSpec.colors.gray6)
  })

  test('no home component declares color before bg in the same theme block', () => {
    const offenders = []
    const dir = path.join(process.cwd(), 'src/components/pages/home')
    const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'))
    for (const file of files) {
      const source = fs.readFileSync(path.join(dir, file), 'utf8')
      for (const match of source.matchAll(/theme\(\{([^}]*)\}/gs)) {
        const block = match[1]
        const colorIndex = block.search(/\bcolor:/)
        const bgIndex = block.search(/\bbg:/)
        if (colorIndex !== -1 && bgIndex !== -1 && colorIndex < bgIndex) {
          const line = source.slice(0, match.index).split('\n').length
          offenders.push(`${file}:${line}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })
})
