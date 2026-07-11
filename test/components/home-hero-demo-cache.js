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

describe('hero demo url canonicalization', () => {
  const shortUrl = url => url.replace(/^https?:\/\//, '').replace(/^www\./, '')

  const derive = evaluate(
    [
      "const SEARCH_EXAMPLE = { query: 'query' }",
      slice('const PARSE_RULES', 'const DEFAULT_URLS'),
      slice('const DEFAULT_URLS', 'const FALLBACK_URL'),
      "const FALLBACK_URL = 'https://example.com'",
      slice('const shortUrl', 'const promptFor'),
      slice('const demoKey', 'const TIMING_COLORS')
    ].join('\n'),
    'derive',
    {
      heroDemoRequests,
      PRODUCTS: new Proxy({}, { get: () => ({ label: 'label' }) }),
      colors: { gray2: '#eee' },
      VERT_BORDER_ACTIVE: '#ccc'
    }
  )

  test('every demo prompt derives back to the exact snapshot URL', () => {
    for (const [vertical, url] of Object.entries(DEMO_URLS)) {
      const derived = derive(`of ${shortUrl(url)}`, vertical)
      expect({ vertical, fullUrl: derived.fullUrl }).toEqual({
        vertical,
        fullUrl: url
      })
    }
  })

  test('the initial cycle prompt hits the snapshot gate', () => {
    const derived = derive('take screenshot of apple.com/music')
    expect(derived.vertical).toBe('screenshot')
    expect(derived.fullUrl).toBe(DEMO_URLS.screenshot)
  })

  test('user URLs that are not demos stay untouched', () => {
    expect(derive('take screenshot of stripe.com').fullUrl).toBe(
      'https://stripe.com'
    )
    expect(derive('take screenshot of www.apple.com/music/deep').fullUrl).toBe(
      'https://www.apple.com/music/deep'
    )
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

  test('snapshot runs never flash the loading state', () => {
    const run = slice('const runRequest', 'const D = useMemo')
    expect(run.indexOf('await fetchDemoSnapshot')).toBeLessThan(
      run.indexOf('setReq(loading)')
    )
  })

  test('snapshot fetches are memoized per vertical', () => {
    const cache = slice('const demoSnapshots', 'const snapshotReq')
    expect(cache).toContain('demoSnapshots.get(vertical)')
    expect(cache).toContain('demoSnapshots.set(vertical, promise)')
    expect(cache).toContain('heroDemoPath(vertical)')
    expect(cache).toContain('res.ok ? res.json() : null')
    expect(cache).toContain('.catch(() => null)')
  })

  test('snapshots load on demand only, never prefetched upfront', () => {
    expect(source.match(/fetchDemoSnapshot\(/g)).toHaveLength(1)
    expect(source).not.toContain('prefetchDemoSnapshots')
    expect(source).not.toContain('requestIdleCallback')
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
