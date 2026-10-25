import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  FREE_PLAN_CONCURRENT_REQUESTS,
  FREE_PLAN_REQUESTS_PER_DAY,
  KEYLESS_REQUESTS_PER_DAY
} from '../../src/helpers/free-tier'

const SRC = path.join(process.cwd(), 'src')
const HELPER = path.join(SRC, 'helpers', 'free-tier.js')
const DATED_RECORDS = [
  path.join(SRC, 'content', 'fragments', 'changelog.md'),
  path.join(SRC, 'content', 'blog')
]
const PUBLISHED_QUOTAS = [5, 25, 50, 100]
const GUARDED_QUOTAS = [
  ...new Set([
    KEYLESS_REQUESTS_PER_DAY,
    FREE_PLAN_REQUESTS_PER_DAY,
    ...PUBLISHED_QUOTAS
  ])
]
const CONSTANTS = [
  'KEYLESS_REQUESTS_PER_DAY',
  'FREE_PLAN_REQUESTS_PER_DAY',
  'FREE_PLAN_CONCURRENT_REQUESTS'
]
const UNCAPPED_FREE_CONCURRENCY = [
  /free one included[^.]*unlimited[^.]*concurrency/gi,
  /no code-size or concurrency limits/gi,
  /shared concurrency/gi
]

const SEP = String.raw`(?:[ \t\n\u00a0]|&nbsp;|\\u00a0|<\/?b>)+`
const WORD = String.raw`[^\s\u00a0,;:<>'"\`(){}\\&/]+`
const DAILY = String.raw`(?:(?:per|a|every|each)${SEP}day\b|daily\b|${WORD}${SEP}?\/${SEP}?day\b)`
const NOT_A_REQUEST_COUNT = String.raw`(?!${SEP}(?:[—–·]|(?:browser-)?(?:minutes?|min|hours?|seconds?)\b|(?:thousand|million|billion)\b))`
const QUOTA_LITERAL = new RegExp(
  String.raw`(?<![\d.,$€])\b(?:${GUARDED_QUOTAS.join(
    '|'
  )})\b${NOT_A_REQUEST_COUNT}(?=${SEP}(?:${WORD}${SEP}){0,7}?${DAILY}|${SEP}requests\)|${SEP}<Label)`,
  'gi'
)

const PERIOD = String.raw`(?:day|month)\b`
const REQUESTS_PER_PERIOD = String.raw`${SEP}requests?${SEP}?(?:(?:per|a|every|each)${SEP}|\/${SEP}?)${PERIOD}`
const MONTHLY_QUOTA_LITERAL = new RegExp(
  String.raw`(?<![\d.,$€])\b(?:${GUARDED_QUOTAS.join(
    '|'
  )})\b(?=${SEP}requests?${SEP}?(?:(?:per|a|every|each)${SEP}|\/${SEP}?)month\b)`,
  'gi'
)
const LOCAL_QUOTA_CONSTANT = new RegExp(
  String.raw`\bconst\s+([A-Z][A-Z0-9_]*)\s*=\s*(?:${GUARDED_QUOTAS.join(
    '|'
  )})\b(?![\d.])`,
  'g'
)

const FENCED_CODE = /^\s*(```|~~~)[\s\S]*?^\s*\1/gm
const blankOut = block => block.replace(/[^\n]/g, '')

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return /\.(jsx?|md)$/.test(entry.name) ? [full] : []
  })

const readProse = file => {
  const source = fs.readFileSync(file, 'utf8')
  return file.endsWith('.md') ? source.replace(FENCED_CODE, blankOut) : source
}

const lineOf = (source, index) => source.slice(0, index).split('\n').length
const location = (file, source, index) =>
  `${path.relative(process.cwd(), file)}:${lineOf(source, index)}`

const isDatedRecord = file =>
  DATED_RECORDS.some(
    record => file === record || file.startsWith(record + path.sep)
  )

const SOURCES = walk(SRC)
  .filter(file => file !== HELPER)
  .map(file => ({ file, source: readProse(file) }))

const hardcodedQuotas = () =>
  SOURCES.filter(({ file }) => !isDatedRecord(file)).flatMap(
    ({ file, source }) =>
      [...source.matchAll(QUOTA_LITERAL)].map(
        match =>
          `${location(file, source, match.index)} → hardcoded ${
            match[0]
          }/day quota, import KEYLESS_REQUESTS_PER_DAY or FREE_PLAN_REQUESTS_PER_DAY from helpers/free-tier`
      )
  )

const hardcodedMonthlyQuotas = () =>
  SOURCES.filter(({ file }) => !isDatedRecord(file)).flatMap(
    ({ file, source }) =>
      [...source.matchAll(MONTHLY_QUOTA_LITERAL)].map(
        match =>
          `${location(file, source, match.index)} → hardcoded ${
            match[0]
          }/month free quota, the free tiers are daily: import KEYLESS_REQUESTS_PER_DAY or FREE_PLAN_REQUESTS_PER_DAY from helpers/free-tier`
      )
  )

const shadowedQuotaConstants = () =>
  SOURCES.filter(({ file }) => !isDatedRecord(file)).flatMap(
    ({ file, source }) =>
      [...source.matchAll(LOCAL_QUOTA_CONSTANT)].flatMap(([, name]) => {
        const usage = new RegExp(
          String.raw`\$?\{${name}\}(?=${REQUESTS_PER_PERIOD})`,
          'g'
        )
        return [...source.matchAll(usage)].map(
          match =>
            `${location(
              file,
              source,
              match.index
            )} → local ${name} renders a free-tier quota, import KEYLESS_REQUESTS_PER_DAY or FREE_PLAN_REQUESTS_PER_DAY from helpers/free-tier`
        )
      })
  )

const mdxImportsOutsideCode = () =>
  SOURCES.filter(({ file }) => file.endsWith('.md')).flatMap(
    ({ file, source }) =>
      CONSTANTS.filter(
        name =>
          source.includes(`{${name}}`) &&
          !new RegExp(
            `^import \\{[^}]*\\b${name}\\b[^}]*\\} from '(helpers|[./]+)[^']*free-tier'`,
            'm'
          ).test(source)
      ).map(
        name =>
          `${path.relative(
            process.cwd(),
            file
          )} uses {${name}} without a top-level import outside code fences`
      )
  )

const uncappedFreeConcurrencyClaims = () =>
  SOURCES.filter(({ file }) => !isDatedRecord(file)).flatMap(
    ({ file, source }) =>
      UNCAPPED_FREE_CONCURRENCY.flatMap(pattern =>
        [...source.matchAll(pattern)].map(
          match =>
            `${location(file, source, match.index)} → "${
              match[0]
            }" contradicts the ${FREE_PLAN_CONCURRENT_REQUESTS} concurrent request cap, use FREE_PLAN_CONCURRENT_REQUESTS`
        )
      )
  )

describe('free tier quota', () => {
  test('keyless allowance is below the free plan allowance', () => {
    expect(KEYLESS_REQUESTS_PER_DAY).toBeLessThan(FREE_PLAN_REQUESTS_PER_DAY)
  })

  test('copy reads the quota from helpers/free-tier instead of hardcoding it', () => {
    expect(hardcodedQuotas()).toEqual([])
  })

  test('no free quota is stated per month', () => {
    expect(hardcodedMonthlyQuotas()).toEqual([])
  })

  test('no local constant stands in for a free-tier quota', () => {
    expect(shadowedQuotaConstants()).toEqual([])
  })

  test('copy states the free plan concurrency cap instead of an uncapped one', () => {
    expect(uncappedFreeConcurrencyClaims()).toEqual([])
  })

  test('markdown that interpolates a quota imports it at the top level', () => {
    expect(mdxImportsOutsideCode()).toEqual([])
  })
})
