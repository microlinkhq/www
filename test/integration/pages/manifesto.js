import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const ABOUT_PATH = path.join(process.cwd(), 'src/content/about.md')

describe('about page', () => {
  test('links to /manifesto from the pursuits introduction', () => {
    const about = fs.readFileSync(ABOUT_PATH, 'utf8')
    const pursue = about.slice(about.indexOf('## What we pursue'))
    const intro = pursue.slice(0, pursue.search(/\n### /))
    expect(intro).toMatch(/\]\(\/manifesto\)/)
  })
})
