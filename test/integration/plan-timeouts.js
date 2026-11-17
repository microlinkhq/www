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
const DATED_RECORDS = [path.join(SRC, 'content', 'fragments', 'changelog.md')]
const COMPETITOR_PAGES = [path.join(SRC, 'pages', 'alternative')]
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
  String.raw`(?<![.,$=])(?<!timeout:\s?['"\`])\b(?:${GUARDED_TIMEOUTS.join(
    '|'
  )})${GAP}(?:s|sec|seconds?)\b`,
  'g'
)
const PLAN_CUE =
  /\b(?:free endpoint|free plan|on free|API key|paid plans?|pro\b|per call|per run|plan timeout|plan ceiling|request timeout|request ceiling|free limit)/i

const FENCED_CODE = /^\s*(```|~~~)[\s\S]*?^\s*\1/gm
const blankOut = block => block.replace(/[^\n]/g, '')
const CUE_REACH = 80

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

const aboveProRequest = seconds => seconds > PRO_PLAN_REQUEST_TIMEOUT_SECONDS

const SOURCES = trackedSources()
  .filter(file => !isUnder(DATED_RECORDS)(file))
  .filter(file => !isUnder(COMPETITOR_PAGES)(file))
  .map(file => ({ file, source: readProse(file) }))

const planTimeoutsOn = line =>
  [...line.matchAll(TIMEOUT_LITERAL)].filter(match => {
    const nearby = line.slice(
      Math.max(0, match.index - CUE_REACH),
      match.index + match[0].length + CUE_REACH
    )
    return PLAN_CUE.test(nearby)
  })

const hardcodedTimeouts = () =>
  SOURCES.flatMap(({ file, source }) =>
    source
      .split('\n')
      .flatMap((line, index) =>
        planTimeoutsOn(line).map(
          ([literal]) =>
            `${path.relative(process.cwd(), file)}:${
              index + 1
            } → hardcoded ${literal} plan timeout, import it from helpers/plan-timeouts`
        )
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
    const flagged = line => planTimeoutsOn(line).length > 0
    const hardcoded = [
      'The maximum is 30 seconds on the free endpoint and 60 seconds with an API key.',
      'The free endpoint has a 30-second timeout; any API key extends it to 60 seconds.',
      'Paid plans allow 60 seconds and 128 MB per run.',
      'the function exceeded its plan timeout (10s free, 60s pro):',
      "microlink: '60 s per call',",
      '| Timeout | 10 seconds | 60 seconds | on the free plan',
      'can exceed the 15 second free limit and return a TimeoutError',
      'On paid plans a function gets 60&nbsp;seconds',
      'the request timeout is 90\\u00a0s with an API key',
      '60s pro',
      `pro${' '.repeat(77)}10 seconds`,
      '30 seconds on the free endpoint',
      '30 seconds on free',
      '60 seconds with an API key',
      '60 seconds per run',
      'the plan timeout is 10s',
      '90 seconds is the plan ceiling',
      'the request timeout is 90s',
      'the request ceiling is 90 seconds',
      '30\tseconds on the free plan',
      `30${String.fromCharCode(0xa0)}seconds on the free plan`,
      'a 30-second timeout on the free plan',
      '30sec on the free plan'
    ]
    const notTimeouts = [
      'Browserbase documents that limit, along with a 60 second timeout',
      'https://microlink.io&timeout=10s with an API key',
      "mqlCode={{ url: 'https://microlink.io', timeout: '10s' }} on pro",
      'the free plan gives 25 requests per day',
      `pro${' '.repeat(78)}10 seconds`,
      'the free plan renews in 1,60 seconds',
      'the free plan costs $60 seconds',
      'timeout: "10s" on pro',
      'timeout: `10s` on pro'
    ]
    expect(hardcoded.filter(line => !flagged(line))).toEqual([])
    expect(notTimeouts.filter(flagged)).toEqual([])
  })

  test('markdown that interpolates a timeout imports it at the top level', () => {
    expect(mdxImportsOutsideCode()).toEqual([])
  })

  test('the scan reads every tracked file that names a plan timeout', () => {
    const scanned = new Set(SOURCES.map(({ file }) => file).concat(HELPER))
    const missed = execFileSync('git', ['ls-files', '-z', '--', 'src'], {
      encoding: 'utf8'
    })
      .split('\0')
      .flatMap(file => {
        if (file === '') return []
        const full = path.join(process.cwd(), file)
        if (
          scanned.has(full) ||
          isUnder(DATED_RECORDS)(full) ||
          isUnder(COMPETITOR_PAGES)(full)
        ) {
          return []
        }
        const source = fs.readFileSync(full, 'utf8')
        return CONSTANTS.some(name => source.includes(name)) ? [file] : []
      })
    expect(missed).toEqual([])
  })

  test('HTTP clients wait longer than the pro request', () => {
    const responseWait =
      /(?:(?<![\w.])Timeout:\s*(\d+)\s*\*\s*time\.Second|read_timeout:\s*(\d+)|CURLOPT_TIMEOUT,\s*(\d+))/g
    const short = SOURCES.flatMap(({ file, source }) =>
      [...source.matchAll(responseWait)].flatMap(match => {
        const seconds = Number(match[1] || match[2] || match[3])
        return aboveProRequest(seconds)
          ? []
          : [
            `${path.relative(
              process.cwd(),
              file
            )} waits ${seconds}s, under the ${PRO_PLAN_REQUEST_TIMEOUT_SECONDS}s pro request`
            ]
      })
    )
    expect(short).toEqual([])
    expect(aboveProRequest(PRO_PLAN_REQUEST_TIMEOUT_SECONDS)).toBe(false)
  })

  test('the scan includes every tracked copy extension', () => {
    const tracked = execFileSync('git', ['ls-files', '-z', '--', 'src'], {
      encoding: 'utf8'
    })
      .split('\0')
      .filter(Boolean)
    const present = new Set(tracked.map(file => path.extname(file)))
    const scanned = new Set(trackedSources().map(file => path.extname(file)))
    const missed = ['.js', '.jsx', '.md'].filter(
      ext => present.has(ext) && !scanned.has(ext)
    )
    expect(missed).toEqual([])
  })

  test('a timeout error example quotes the API message', () => {
    const message = `Function exceeded the ${FREE_PLAN_FUNCTION_TIMEOUT_SECONDS}s free plan timeout. Upgrade to pro for up to ${PRO_PLAN_FUNCTION_TIMEOUT_SECONDS}s with retries.`
    const stale = trackedSources().flatMap(file => {
      const source = fs.readFileSync(file, 'utf8')
      return source.includes('free plan timeout') && !source.includes(message)
        ? [path.relative(process.cwd(), file)]
        : []
    })
    expect(stale).toEqual([])
  })
})
