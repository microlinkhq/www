import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const BENCHMARK_PAGES = [
  'apiflash',
  'screenshotapi',
  'screenshotlayer',
  'screenshotmachine',
  'screenshotone',
  'thumio',
  'urlbox'
]

const MIXED_FRAMINGS = [
  {
    pattern: /%\s*(?:<\/b>\s*)?faster/g,
    fix: 'say "N.N× faster" from benchmarkClaims'
  },
  { pattern: /latency by\b/g, fix: 'say "N.N× faster" from benchmarkClaims' },
  {
    pattern: /%\s*less\s+cold/g,
    fix: 'say "N.N× faster" from benchmarkClaims'
  },
  {
    pattern: /\b\d+(?:\.\d+)?\s?s\b(?! ?\w)/g,
    fix: 'show durations with formatDuration (whole ms)'
  }
]

const sourcesOf = slug => {
  const dir = path.join(process.cwd(), 'src/components/pages', slug)
  return [
    path.join(process.cwd(), 'src/pages/alternative', `${slug}.js`),
    ...fs.readdirSync(dir).map(file => path.join(dir, file))
  ]
}

const violations = () =>
  BENCHMARK_PAGES.flatMap(sourcesOf).flatMap(file => {
    const src = fs.readFileSync(file, 'utf8')
    return MIXED_FRAMINGS.flatMap(({ pattern, fix }) =>
      [...src.matchAll(pattern)].map(
        match =>
          `${path.relative(process.cwd(), file)}:${
            src.slice(0, match.index).split('\n').length
          } "${match[0]}" → ${fix}`
      )
    )
  })

describe('alternative page speed claims', () => {
  test('every benchmark page frames speed one way', () => {
    expect(violations()).toEqual([])
  })
})
