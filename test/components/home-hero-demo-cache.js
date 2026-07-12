import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import heroDemoRequests from '../../src/components/pages/home/hero-demo-requests.js'
import { parseServerTimingEntries } from '../../src/helpers/server-timing.js'
import { sourceHarness } from '../utils/eval-source.mjs'

const {
  DEMO_URLS,
  SNAPSHOT_URLS,
  INITIAL_VERTICAL,
  REQUEST_OPTS,
  FN_SNIPPET,
  heroDemoPath,
  shortUrl,
  canonicalDemoUrl
} = heroDemoRequests

const { source, slice, evaluate } = sourceHarness(
  'src/components/pages/home/hero.js'
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

  test('snapshots skip the demos that cannot be captured at build time', () => {
    expect(SNAPSHOT_URLS.lighthouse).toBeUndefined()
    expect(SNAPSHOT_URLS.search).toBeUndefined()
    expect(Object.keys(SNAPSHOT_URLS).sort()).toEqual(
      Object.keys(DEMO_URLS)
        .filter(key => key !== 'lighthouse')
        .sort()
    )
    expect(SNAPSHOT_URLS[INITIAL_VERTICAL]).toBe(DEMO_URLS[INITIAL_VERTICAL])
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
    expect(source).toContain('...heroDemoRequests.DEMO_URLS')
  })
})

describe('hero demo url canonicalization', () => {
  test('demo prompts canonicalize back to the exact snapshot URL', () => {
    for (const [vertical, url] of Object.entries(DEMO_URLS)) {
      expect(canonicalDemoUrl(`https://${shortUrl(url)}`, vertical)).toBe(url)
    }
  })

  test('the initial cycle prompt hits the snapshot gate', () => {
    expect(canonicalDemoUrl('https://apple.com/music', 'screenshot')).toBe(
      DEMO_URLS.screenshot
    )
  })

  test('user URLs that are not demos stay untouched', () => {
    expect(canonicalDemoUrl('https://stripe.com', 'screenshot')).toBe(
      'https://stripe.com'
    )
    expect(
      canonicalDemoUrl('https://www.apple.com/music/deep', 'screenshot')
    ).toBe('https://www.apple.com/music/deep')
  })

  test('derive routes typed URLs through canonicalization', () => {
    const derive = slice('const derive', 'const TIMING_COLORS')
    expect(derive).toContain('canonicalDemoUrl(p.url, v)')
  })
})

describe('hero demo snapshot cache', () => {
  test('runRequest serves snapshot demos before hitting the API', () => {
    const run = slice('const runRequest', 'const D = useMemo')
    expect(run).toContain(
      'snapshot.fullUrl === SNAPSHOT_URLS[snapshot.vertical]'
    )
    expect(run).toContain('cached.apiUrl === apiUrl')
    expect(run.indexOf('fetchDemoSnapshot')).toBeGreaterThan(-1)
    expect(run.indexOf('fetchDemoSnapshot')).toBeLessThan(
      run.indexOf('await mql(')
    )
  })

  test('snapshot runs defer the loading state behind a grace timer', () => {
    const run = slice('const runRequest', 'const D = useMemo')
    const gate = run.slice(
      run.indexOf('SNAPSHOT_URLS[snapshot.vertical]'),
      run.indexOf('const t0')
    )
    expect(gate).toContain('window.setTimeout')
    expect(gate).toContain(', 150)')
    expect(gate).toContain('window.clearTimeout(loadingTimer)')
    expect(gate.indexOf('window.setTimeout')).toBeLessThan(
      gate.indexOf('await fetchDemoSnapshot')
    )
    expect(gate.indexOf('await fetchDemoSnapshot')).toBeLessThan(
      gate.indexOf('window.clearTimeout')
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
  })

  test('the panel height is a single derived constant', () => {
    const output = fs.readFileSync(
      path.join(process.cwd(), 'src/components/pages/home/output.js'),
      'utf8'
    )
    expect(output).toContain('const MEDIA_MAX_HEIGHT = 440')
    expect(output).toContain('export const PANEL_HEIGHT = ')
    expect(output).toContain('MEDIA_MAX_HEIGHT + STAGE_PADDING * 2')
    expect(source).toContain(
      'minHeight: [null, null, PANEL_HEIGHT, PANEL_HEIGHT]'
    )
    expect(source).not.toContain("'504px'")
    expect(output).not.toContain("'504px'")
  })

  test('the initial request is seeded from the bundled snapshot', () => {
    expect(source).toContain(
      "import screenshotSnapshot from '../../../../static/data/hero-demo/screenshot.json'"
    )
    expect(source).toContain(
      'demoSnapshots.set(INITIAL_VERTICAL, Promise.resolve(screenshotSnapshot))'
    )
    expect(source).toContain('useState(INITIAL_REQ)')
    expect(source).toContain(
      'screenshotSnapshot.apiUrl === loadingReq(INITIAL_SNAPSHOT).apiUrl'
    )
  })

  const snapshotFile = path.join(
    process.cwd(),
    `static/data/hero-demo/${INITIAL_VERTICAL}.json`
  )

  test.skipIf(!fs.existsSync(snapshotFile))(
    'the bundled snapshot matches what the hero will request',
    () => {
      const snapshot = JSON.parse(fs.readFileSync(snapshotFile))
      expect(snapshot.apiUrl).toContain(
        encodeURIComponent(DEMO_URLS[INITIAL_VERTICAL])
      )
      expect(snapshot.body.status).toBe('success')
      expect(snapshot.headers).toBeTypeOf('object')
    }
  )

  test('pickers fill the vertical demo URL unless the user typed one', () => {
    const pick = slice('const typedUrl', 'const MENU_COLS')
    expect(pick).toContain('!isDemoUrl(raw)')
    expect(pick).toContain('typedUrl() || shortUrl(DEFAULT_URLS[vertical])')
    expect(pick).toContain(
      "typedUrl() || (k !== 'search' && shortUrl(DEFAULT_URLS[k]))"
    )
  })

  test('demoKey treats protocol, www and trailing slash as equivalent', () => {
    expect(heroDemoRequests.demoKey('https://www.apple.com/music/')).toBe(
      heroDemoRequests.demoKey('http://apple.com/music')
    )
    expect(heroDemoRequests.demoKey('https://stripe.com')).not.toBe(
      heroDemoRequests.demoKey('https://www.apple.com/music')
    )
  })

  test('snapshotReq rebuilds the full response state for both paths', () => {
    const snapshotReq = evaluate(
      [
        slice('const TIMING_COLORS', 'const GUTTER_X'),
        slice('const snapshotReq', 'demoSnapshots.set(INITIAL_VERTICAL')
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

  test('live responses are normalized to plain headers before snapshotReq', () => {
    const run = slice('const runRequest', 'const D = useMemo')
    expect(run).toContain('Object.fromEntries(response.headers.entries())')
    const headersToRows = evaluate(
      slice('const headersToRows', 'const parseServerTiming'),
      'headersToRows'
    )
    expect(headersToRows({ b: '2', a: '1' })).toEqual([
      { k: 'a', v: '1' },
      { k: 'b', v: '2' }
    ])
    expect(headersToRows(null)).toEqual([])
  })
})
