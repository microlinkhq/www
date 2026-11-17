import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  FREE_PLAN_FUNCTION_TIMEOUT_SECONDS,
  FREE_PLAN_REQUEST_TIMEOUT_SECONDS,
  PRO_PLAN_FUNCTION_TIMEOUT_SECONDS,
  PRO_PLAN_REQUEST_TIMEOUT_SECONDS
} from '../../src/helpers/plan-timeouts'

const SRC = path.join(process.cwd(), 'src')
const HELPER = path.join(SRC, 'helpers', 'plan-timeouts.js')
const DATED_RECORDS = [
  path.join(SRC, 'content', 'fragments', 'changelog.md'),
  path.join(SRC, 'content', 'blog')
]
const COMPETITOR_PAGES = [
  path.join(SRC, 'pages', 'alternative'),
  path.join(SRC, 'pages', 'benchmarks')
]
const CONSTANTS = [
  'FREE_PLAN_REQUEST_TIMEOUT_SECONDS',
  'PRO_PLAN_REQUEST_TIMEOUT_SECONDS',
  'FREE_PLAN_FUNCTION_TIMEOUT_SECONDS',
  'PRO_PLAN_FUNCTION_TIMEOUT_SECONDS'
]
const PUBLISHED_TIMEOUTS = [10, 15, 30, 60, 90]
const GUARDED_TIMEOUTS = [
  ...new Set([
    FREE_PLAN_REQUEST_TIMEOUT_SECONDS,
    PRO_PLAN_REQUEST_TIMEOUT_SECONDS,
    FREE_PLAN_FUNCTION_TIMEOUT_SECONDS,
    PRO_PLAN_FUNCTION_TIMEOUT_SECONDS,
    ...PUBLISHED_TIMEOUTS
  ])
]

const GAP = String.raw`(?:[ \t\u00a0-]|&nbsp;|\\u00a0)?`
const TIMEOUT_LITERAL = new RegExp(
  String.raw`(?<![\d.,$=])(?<!timeout:\s?['"\`])\b(?:${GUARDED_TIMEOUTS.join(
    '|'
  )})${GAP}(?:s|sec|seconds?)\b`,
  'g'
)
const PLAN_CUE =
  /\b(?:free endpoint|free plan|on free|API key|paid plans?|pro\b|Pro\b|per call|per run|plan timeout|plan ceiling|request timeout|request ceiling|free limit)/i

const FENCED_CODE = /^\s*(```|~~~)[\s\S]*?^\s*\1/gm
const blankOut = block => block.replace(/[^\n]/g, '')

const trackedSources = () =>
  execFileSync('git', ['ls-files', '-z', '--', 'src'], { encoding: 'utf8' })
    .split('\0')
    .filter(file => /\.(jsx?|md)$/.test(file))
    .map(file => path.join(process.cwd(), file))

const readProse = file => {
  const source = fs.readFileSync(file, 'utf8')
  return file.endsWith('.md') ? source.replace(FENCED_CODE, blankOut) : source
}

const isUnder = roots => file =>
  roots.some(root => file === root || file.startsWith(root + path.sep))

const SOURCES = trackedSources()
  .filter(file => file !== HELPER)
  .filter(file => !isUnder(DATED_RECORDS)(file))
  .filter(file => !isUnder(COMPETITOR_PAGES)(file))
  .map(file => ({ file, source: readProse(file) }))

const hardcodedTimeouts = () =>
  SOURCES.flatMap(({ file, source }) =>
    source.split('\n').flatMap((line, index) =>
      PLAN_CUE.test(line)
        ? [...line.matchAll(TIMEOUT_LITERAL)].map(
            ([literal]) =>
              `${path.relative(process.cwd(), file)}:${
                index + 1
              } → hardcoded ${literal} plan timeout, import it from helpers/plan-timeouts`
          )
        : []
    )
  )

const mdxImportsOutsideCode = () =>
  SOURCES.filter(({ file }) => file.endsWith('.md')).flatMap(
    ({ file, source }) =>
      CONSTANTS.filter(
        name =>
          source.includes(name) &&
          !new RegExp(
            `^import \\{[^}]*\\b${name}\\b[^}]*\\} from '(helpers|[./]+)[^']*plan-timeouts'`,
            'm'
          ).test(source)
      ).map(
        name =>
          `${path.relative(
            process.cwd(),
            file
          )} uses ${name} without a top-level import outside code fences`
      )
  )

describe('plan timeouts', () => {
  test('function code runs inside the request budget of its plan', () => {
    expect(FREE_PLAN_FUNCTION_TIMEOUT_SECONDS).toBeLessThan(
      FREE_PLAN_REQUEST_TIMEOUT_SECONDS
    )
    expect(PRO_PLAN_FUNCTION_TIMEOUT_SECONDS).toBeLessThan(
      PRO_PLAN_REQUEST_TIMEOUT_SECONDS
    )
  })

  test('copy reads every plan timeout from helpers/plan-timeouts', () => {
    expect(hardcodedTimeouts()).toEqual([])
  })

  test('the guard catches the ways a plan timeout has been written', () => {
    const flagged = line =>
      PLAN_CUE.test(line) && [...line.matchAll(TIMEOUT_LITERAL)].length > 0
    const hardcoded = [
      'The maximum is 30 seconds on the free endpoint and 60 seconds with an API key.',
      'The free endpoint has a 30-second timeout; any API key extends it to 60 seconds.',
      'Paid plans allow 60 seconds and 128 MB per run.',
      'the function exceeded its plan timeout (10s free, 60s pro):',
      "microlink: '60 s per call',",
      '| Timeout | 10 seconds | 60 seconds | on the free plan',
      'can exceed the 15 second free limit and return a TimeoutError',
      'On paid plans a function gets 60&nbsp;seconds',
      'the request timeout is 90\\u00a0s with an API key'
    ]
    const notTimeouts = [
      'Browserbase documents that limit, along with a 60 second timeout',
      'https://microlink.io&timeout=10s with an API key',
      "mqlCode={{ url: 'https://microlink.io', timeout: '10s' }} on pro",
      'the free plan gives 25 requests per day'
    ]
    expect(hardcoded.filter(line => !flagged(line))).toEqual([])
    expect(notTimeouts.filter(flagged)).toEqual([])
  })

  test('markdown that interpolates a timeout imports it at the top level', () => {
    expect(mdxImportsOutsideCode()).toEqual([])
  })
})
