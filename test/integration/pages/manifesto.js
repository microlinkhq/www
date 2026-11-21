import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const ABOUT_PATH = path.join(process.cwd(), 'src/content/about.md')

describe('about page', () => {
  test('links to /manifesto', () => {
    expect(fs.readFileSync(ABOUT_PATH, 'utf8')).toMatch(/\]\(\/manifesto\)/)
  })
})
