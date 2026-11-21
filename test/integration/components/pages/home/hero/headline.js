import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/hero/headline.js'),
  'utf8'
)

const glintBlock = () => {
  const start = source.indexOf('const GlintHeading')
  const end = source.indexOf('export const HeroHeadline')
  return source.slice(start, end)
}

describe('home hero headline glint', () => {
  test('the sweep runs, and reduced motion removes it', () => {
    const block = glintBlock()
    const reduceAt = block.indexOf('$'.concat('{reduceMotion}'))
    expect(reduceAt).toBeGreaterThan(-1)
    const running = block.slice(0, reduceAt)
    const guard = block.slice(reduceAt)
    expect(running).toMatch(
      /animation: \$\{sweep\} \$\{GLINT_DURATION\} ease-in-out \$\{GLINT_DELAY\} infinite;/
    )
    expect(guard).toContain('animation: none')
    expect(guard).not.toMatch(/animation: \$\{sweep\}/)
  })
})
