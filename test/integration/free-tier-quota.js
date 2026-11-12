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
const MISSTATED_FREE_RATE = [
  /free one included[^.]*unlimited[^.]*concurrency/gi,
  /no code-size or concurrency limits/gi,
  /shared concurrency/gi,
  /don't apply any throttling/gi
]
const GAP = String.raw`(?:[ \t\n\u00a0]|&nbsp;|\\u00a0)+`
const MONTHLY = String.raw`(?:monthly|(?:every|each|a)${GAP}month)\b`
const FREE_OFFER = String.raw`[Ff]ree${GAP}(?:API${GAP}key|api${GAP}key|[Tt]ier|[Pp]lan|requests?)\b`
const RENEWAL_VERB = String.raw`(?:renew|reset|refill)\w*`
const COMPETITOR_SUBJECT = String.raw`(?<!\b(?!(?:A|An|The|Our|Microlink)\b)[A-Z][\w.]*(?:'s|’s)?${GAP})`
const MONTHLY_FREE_RENEWAL = [
  new RegExp(
    String.raw`${COMPETITOR_SUBJECT}\b${FREE_OFFER}[^.\`'"]{0,40}?${RENEWAL_VERB}${GAP}${MONTHLY}`,
    'g'
  ),
  new RegExp(String.raw`\ballowance${GAP}${RENEWAL_VERB}${GAP}${MONTHLY}`, 'g'),
  /\bmicrolink: '[\d,]+\/month'/g
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

const misstatedFreeRateClaims = () =>
  SOURCES.filter(({ file }) => !isDatedRecord(file)).flatMap(
    ({ file, source }) =>
      MISSTATED_FREE_RATE.flatMap(pattern =>
        [...source.matchAll(pattern)].map(
          match =>
            `${location(file, source, match.index)} → "${
              match[0]
            }" contradicts the free key's ${FREE_PLAN_CONCURRENT_REQUESTS} concurrent requests cap, state it with FREE_PLAN_CONCURRENT_REQUESTS`
        )
      )
  )

const monthlyFreeRenewalClaims = () =>
  SOURCES.filter(({ file }) => !isDatedRecord(file)).flatMap(
    ({ file, source }) =>
      MONTHLY_FREE_RENEWAL.flatMap(pattern =>
        [...source.matchAll(pattern)].map(
          match =>
            `${location(file, source, match.index)} → "${
              match[0]
            }" contradicts the daily free tiers, say it renews daily`
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

  test('copy states the free key concurrency cap instead of an uncapped one', () => {
    expect(misstatedFreeRateClaims()).toEqual([])
  })

  test('no free tier is said to renew monthly', () => {
    expect(monthlyFreeRenewalClaims()).toEqual([])
  })

  test('the monthly renewal guard tells Microlink claims from competitor ones', () => {
    const flagged = sentence =>
      MONTHLY_FREE_RENEWAL.some(pattern => {
        pattern.lastIndex = 0
        return pattern.test(sentence)
      })
    const microlinkClaims = [
      'a free API key that renews monthly',
      'A free tier that refills every month',
      'The free\u00a0tier renews monthly',
      'the free plan, renewing each month',
      'free requests reset monthly',
      'Microlink free tier renews monthly',
      'The allowance renews monthly',
      "microlink: '100/month'"
    ]
    const competitorClaims = [
      "Firecrawl's free plan renews monthly",
      'ScraperAPI free plan resets monthly',
      'Jina Reader free tier refills every month',
      'A free API key that renews daily',
      'quota resets monthly on Pro'
    ]
    expect(microlinkClaims.filter(sentence => !flagged(sentence))).toEqual([])
    expect(competitorClaims.filter(flagged)).toEqual([])
  })

  test('markdown that interpolates a quota imports it at the top level', () => {
    expect(mdxImportsOutsideCode()).toEqual([])
  })
})
