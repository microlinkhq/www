import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

describe('user agents page description', () => {
  test('the meta description pluralizes the bot and crawler counts', () => {
    const source = read('src/pages/user-agents.js')
    const start = source.indexOf('description={`')
    const end = source.indexOf('Free JSON endpoint, updated weekly.')
    const description = source.slice(start, end)
    expect(start).toBeGreaterThan(-1)
    expect(end).toBeGreaterThan(start)
    expect(description).toContain('AI bots and')
    expect(description).toContain('crawlers')
    expect(description).not.toContain('crawler names')
  })
})
