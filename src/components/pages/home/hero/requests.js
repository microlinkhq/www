import { PRODUCTS } from 'components/pages/home/catalog'
import heroDemoRequests from 'components/pages/home/hero-demo-requests'
import { parseServerTimingEntries } from 'helpers/server-timing'
import { colors } from 'theme'
import { getApiUrl } from '@microlink/mql'

import screenshotSnapshot from '../../../../../static/data/hero-demo/screenshot.json'

import { CYCLE, derive } from './constants'
import { VIOLET, ERROR, WARN } from './primitives'

const { REQUEST_OPTS, INITIAL_VERTICAL, heroDemoPath } = heroDemoRequests

const SUCCESS = colors.green8

const TIMING_COLORS = ['green5', 'blue5', 'yellow5', 'pink5', 'grape5', 'teal5']

const headersToRows = headers => {
  if (!headers) return []
  return Object.entries(headers)
    .map(([k, v]) => ({ k, v }))
    .sort((a, b) => a.k.localeCompare(b.k))
}

const parseServerTiming = raw => {
  if (!raw) return { bars: [], rows: [], totalMs: null }

  const entries = parseServerTimingEntries(raw).map(e => ({
    name: e.name,
    dur: e.dur ?? 0
  }))

  const total =
    entries.find(e => e.name === 'total')?.dur ??
    entries.reduce((sum, e) => sum + e.dur, 0)

  const pct = dur => (total ? (dur / total) * 100 : 0)

  const bars = entries.map((e, i) => ({
    name: e.name,
    dur: `${e.dur.toFixed(1)}ms`,
    pct: `${Math.max(2, Math.round(pct(e.dur)))}%`,
    color: TIMING_COLORS[i % TIMING_COLORS.length]
  }))

  const rows = entries.map(e => ({
    name: e.name,
    dur: `${e.dur.toFixed(1)}ms`,
    pct: `${pct(e.dur).toFixed(1)}%`
  }))

  return { bars, rows, totalMs: total }
}

const fmtDuration = ms =>
  ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`

const requestStatus = req => {
  if (req.status === 'loading') {
    return { text: 'running…', color: VIOLET, live: true }
  }
  if (req.status === 'rate-limited') {
    return { text: 'rate limited', color: WARN }
  }
  const took = req.elapsedMs != null ? ` in ${fmtDuration(req.elapsedMs)}` : ''
  if (req.status === 'error') {
    return { text: `error${took}`, color: ERROR }
  }
  return {
    text: `${req.body?.status || 'success'}${took}`,
    color: SUCCESS
  }
}

const SHARE_QUERY_KEY = 'q'
const SHARE_PRODUCT_KEY = 'product'

const readSharedState = () => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const q = params.get(SHARE_QUERY_KEY)
  if (!q || !q.trim()) return null
  const product = params.get(SHARE_PRODUCT_KEY)
  return { q, product: product && PRODUCTS[product] ? product : null }
}

const writeSharedState = (text, vertical) => {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  params.set(SHARE_QUERY_KEY, text)
  if (vertical) params.set(SHARE_PRODUCT_KEY, vertical)
  else params.delete(SHARE_PRODUCT_KEY)
  const { pathname, hash } = window.location
  window.history.replaceState(
    window.history.state,
    '',
    `${pathname}?${params.toString()}${hash}`
  )
}

const loadingReq = snapshot => ({
  status: 'loading',
  D: snapshot,
  apiUrl: getApiUrl(snapshot.fullUrl, REQUEST_OPTS[snapshot.vertical] || {})[0]
})

const demoSnapshots = new Map()

const fetchDemoSnapshot = vertical => {
  let promise = demoSnapshots.get(vertical)
  if (!promise) {
    promise = window
      .fetch(heroDemoPath(vertical))
      .then(res => (res.ok ? res.json() : null))
      .catch(() => null)
    demoSnapshots.set(vertical, promise)
  }
  return promise
}

const snapshotReq = (snapshot, cached, elapsedMs) => ({
  status: 'success',
  D: snapshot,
  apiUrl: cached.apiUrl,
  body: cached.body,
  headerRows: headersToRows(cached.headers),
  ...parseServerTiming(cached.headers['server-timing']),
  elapsedMs
})

demoSnapshots.set(INITIAL_VERTICAL, Promise.resolve(screenshotSnapshot))

const INITIAL_SNAPSHOT = derive(CYCLE[0])

const INITIAL_REQ =
  INITIAL_SNAPSHOT.vertical === INITIAL_VERTICAL &&
  screenshotSnapshot.apiUrl === loadingReq(INITIAL_SNAPSHOT).apiUrl
    ? snapshotReq(INITIAL_SNAPSHOT, screenshotSnapshot)
    : loadingReq(INITIAL_SNAPSHOT)

export {
  requestStatus,
  readSharedState,
  writeSharedState,
  loadingReq,
  fetchDemoSnapshot,
  snapshotReq,
  INITIAL_SNAPSHOT,
  INITIAL_REQ
}
