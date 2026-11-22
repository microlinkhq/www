import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

import {
  FREE_PLAN_CONCURRENT_REQUESTS,
  FREE_PLAN_FUNCTION_CODE_SIZE,
  FREE_PLAN_REQUESTS_PER_DAY,
  KEYLESS_REQUESTS_PER_DAY
} from '../../../../src/helpers/free-tier'
import { DEFAULT_PLAN } from '../../../../src/helpers/pro-plans'

const post = readFileSync(
  new URL(
    '../../../../src/content/blog/introducing-nodebox.md',
    import.meta.url
  ),
  'utf8'
)

const BYTES_PER_KB = 1024
const EMBED_ORIGIN = 'https://nodebox.microlink.io/e?'

const embedSources = () =>
  [...post.matchAll(/<Iframe\s+src='([^']+)'/g)].map(([, src]) => src)

describe('introducing nodebox', () => {
  test('states the keyless run quota readers get in an embed', () => {
    expect(post).toContain(
      `${KEYLESS_REQUESTS_PER_DAY} runs per day per IP address, up to ${FREE_PLAN_CONCURRENT_REQUESTS} at a time.`
    )
  })

  test('names the runtime as the current LTS, never a pinned major', () => {
    expect(post).toContain('the current Node.js LTS')
    expect(post).not.toMatch(/Node\.js v?\d+/)
  })

  test('opens with the Nodebox social card', () => {
    const body = post
      .split('\n')
      .filter(line => line && !/^(import |---|[a-z]+:| {2}- )/.test(line))
    expect(body[0]).toMatch(
      /^!\[Nodebox: [^\]]+\]\(\/images\/nodebox-og\.png\)$/
    )
  })

  test('reads the function timeouts from helpers/plan-timeouts', () => {
    expect(post).toMatch(
      /^import \{ FREE_PLAN_FUNCTION_TIMEOUT_SECONDS, PRO_PLAN_FUNCTION_TIMEOUT_SECONDS \} from 'helpers\/plan-timeouts'$/m
    )
    expect(post).toContain(
      `{FREE_PLAN_FUNCTION_TIMEOUT_SECONDS} seconds, 64 MB of memory and ${
        FREE_PLAN_FUNCTION_CODE_SIZE / BYTES_PER_KB
      } KB of code per run.`
    )
  })

  test('states the free key quota and the entry paid plan', () => {
    expect(post).toContain(
      `${FREE_PLAN_REQUESTS_PER_DAY} runs per day on the free key`
    )
    expect(post).toContain(
      `from $${DEFAULT_PLAN.monthlyPrice.USD} per month, ${DEFAULT_PLAN.reqsPerMonth} runs per month, {PRO_PLAN_FUNCTION_TIMEOUT_SECONDS}-second runs`
    )
  })

  test('imports Iframe, which MDX only resolves for the lowercase tag', () => {
    expect(post).toMatch(
      /^import \{ Iframe \} from 'components\/markdown\/Iframe'$/m
    )
  })

  test('every live embed is a Nodebox player with clipboard access', () => {
    const sources = embedSources()
    expect(sources.length).toBeGreaterThan(0)
    sources.forEach(src => expect(src.startsWith(EMBED_ORIGIN)).toBe(true))
    expect(post.match(/allow='clipboard-write'/g)).toHaveLength(sources.length)
  })

  test('no live embed relies on network access, which embeds do not have', () => {
    embedSources().forEach(src => {
      const template = new URL(src).searchParams.get('template')
      expect(['fetch', 'cheerio']).not.toContain(template)
    })
  })
})
