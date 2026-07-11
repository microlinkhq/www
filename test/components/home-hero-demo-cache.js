import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import heroDemoRequests from '../../src/components/pages/home/hero-demo-requests.js'
import { parseServerTimingEntries } from '../../src/helpers/server-timing.js'

const { DEMO_URLS, REQUEST_OPTS, FN_SNIPPET, heroDemoPath } = heroDemoRequests

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/hero.js'),
  'utf8'
)

const slice = (start, end) =>
  source.slice(source.indexOf(start), source.indexOf(end))

const evaluate = (code, name, scope = {}) =>
  // eslint-disable-next-line no-new-func
  new Function(...Object.keys(scope), `${code}; return ${name}`)(
    ...Object.values(scope)
  )

describe('hero demo requests module', () => {
  test('covers every product except search', () => {
    const expected = Object.keys(REQUEST_OPTS)
      .filter(key => key !== 'search')
      .sort()
    expect(Object.keys(DEMO_URLS).sort()).toEqual(expected)
  })

  test('every demo URL is absolute https', () => {
    for (const url of Object.values(DEMO_URLS)) {
      expect(url).toMatch(/^https:\/\//)
    }
  })

  test('function opts embed the shared snippet', () => {
    expect(REQUEST_OPTS.function.function).toBe(FN_SNIPPET)
  })

  test('heroDemoPath maps a vertical to its static snapshot', () => {
    expect(heroDemoPath('screenshot')).toBe('/data/hero-demo/screenshot.json')
  })

  test('hero consumes the shared module instead of inline maps', () => {
    expect(source).toContain(
      "import heroDemoRequests from 'components/pages/home/hero-demo-requests'"
    )
    expect(source).toContain(
      'const { FN_SNIPPET, REQUEST_OPTS, heroDemoPath } = heroDemoRequests'
    )
    expect(source).toContain('...heroDemoRequests.DEMO_URLS')
  })
})

describe('hero demo snapshot cache', () => {
  test('runRequest serves demo URLs from the snapshot before hitting the API', () => {
    const run = slice('const runRequest', 'const D = useMemo')
    expect(run).toContain(
      'snapshot.fullUrl === DEFAULT_URLS[snapshot.vertical]'
    )
    expect(run).toContain('cached.apiUrl === apiUrl')
    expect(run.indexOf('fetchDemoSnapshot')).toBeGreaterThan(-1)
    expect(run.indexOf('fetchDemoSnapshot')).toBeLessThan(
      run.indexOf('await mql(')
    )
    expect(run.indexOf('id !== reqId.current')).toBeLessThan(
      run.indexOf('await mql(')
    )
  })

  test('snapshot fetches are memoized per vertical', () => {
    const cache = slice('const demoSnapshots', 'const prefetchDemoSnapshots')
    expect(cache).toContain('demoSnapshots.get(vertical)')
    expect(cache).toContain('demoSnapshots.set(vertical, promise)')
    expect(cache).toContain('heroDemoPath(vertical)')
    expect(cache).toContain('res.ok ? res.json() : null')
    expect(cache).toContain('.catch(() => null)')
  })

  test('homepage preloads the first demo snapshot', () => {
    const page = fs.readFileSync(
      path.join(process.cwd(), 'src/pages/index.js'),
      'utf8'
    )
    expect(page).toContain("heroDemoRequests.heroDemoPath('screenshot')")
    expect(page).toContain("rel='preload'")
    expect(page).toContain("as='fetch'")
    expect(page).toContain("crossOrigin='anonymous'")
  })

  test('idle prefetch warms every light snapshot and respects saveData', () => {
    expect(source).toContain("const HEAVY_SNAPSHOTS = ['lighthouse']")
    const prefetch = slice('const prefetchDemoSnapshots', 'const snapshotReq')
    expect(prefetch).toContain('HEAVY_SNAPSHOTS')
    expect(prefetch).toContain('forEach(fetchDemoSnapshot)')
    expect(source).toContain('navigator.connection.saveData')
    expect(source).toContain('requestIdleCallback')
    expect(source).toContain('cancelIdleCallback')
  })

  test('snapshotReq rebuilds the full response state from a snapshot', () => {
    const snapshotReq = evaluate(
      [
        slice('const TIMING_COLORS', 'const GUTTER_X'),
        slice('const snapshotReq', 'const Hero =')
      ].join('\n'),
      'snapshotReq',
      { parseServerTimingEntries }
    )
    const snapshot = { vertical: 'screenshot', fullUrl: DEMO_URLS.screenshot }
    const cached = {
      apiUrl: 'https://api.microlink.io/?url=x',
      body: { status: 'success', data: { url: 'x' } },
      headers: {
        'x-response-time': '12ms',
        'server-timing': 'total;dur=123.4'
      }
    }
    const req = snapshotReq(snapshot, cached, 18)
    expect(req.status).toBe('success')
    expect(req.apiUrl).toBe(cached.apiUrl)
    expect(req.body).toBe(cached.body)
    expect(req.elapsedMs).toBe(18)
    expect(req.totalMs).toBe(123.4)
    expect(req.headerRows).toEqual([
      { k: 'server-timing', v: 'total;dur=123.4' },
      { k: 'x-response-time', v: '12ms' }
    ])
    expect(req.bars).toHaveLength(1)
  })

  test('headersToRows handles both Headers instances and plain objects', () => {
    const headersToRows = evaluate(
      slice('const headersToRows', 'const parseServerTiming'),
      'headersToRows'
    )
    const plain = headersToRows({ b: '2', a: '1' })
    expect(plain).toEqual([
      { k: 'a', v: '1' },
      { k: 'b', v: '2' }
    ])
    const native = headersToRows(new Headers({ b: '2', a: '1' }))
    expect(native).toEqual(plain)
    expect(headersToRows(null)).toEqual([])
  })
})
