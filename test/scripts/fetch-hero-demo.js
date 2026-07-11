import { existsSync, readFileSync } from 'node:fs'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import provider from '../../scripts/fetch-data/providers/fetch-hero-demo.js'
import heroDemoRequests from '../../src/components/pages/home/hero-demo-requests.js'

const { DEMO_URLS, REQUEST_OPTS } = heroDemoRequests
const { ATTEMPTS, toEntry, fetchEntry, dist } = provider

const createClient = ({ failures = 0, failUrls = [] } = {}) => {
  let calls = 0
  const client = async url => {
    calls++
    if (calls <= failures || failUrls.includes(url)) throw new Error('boom')
    return {
      status: 'success',
      data: { url: 'https://example.com' },
      response: {
        headers: new Headers({ 'server-timing': 'total;dur=42' })
      }
    }
  }
  client.getApiUrl = (url, opts) => [
    `https://api.microlink.io/?url=${encodeURIComponent(url)}`
  ]
  client.calls = () => calls
  return client
}

const tmpDist = () => mkdtemp(path.join(tmpdir(), 'hero-demo-'))

describe('fetch-hero-demo provider', () => {
  test('writes snapshots into the gitignored static data directory', () => {
    expect(dist.endsWith('static/data/hero-demo')).toBe(true)
  })

  test('toEntry strips the response and keeps plain headers', async () => {
    const client = createClient()
    const entry = await toEntry('screenshot', client)
    expect(entry.apiUrl).toBe(
      client.getApiUrl(DEMO_URLS.screenshot, REQUEST_OPTS.screenshot)[0]
    )
    expect(entry.body).toEqual({
      status: 'success',
      data: { url: 'https://example.com' }
    })
    expect(entry.body.response).toBeUndefined()
    expect(entry.headers).toEqual({ 'server-timing': 'total;dur=42' })
  })

  test('fetchEntry retries once and recovers', async () => {
    const client = createClient({ failures: 1 })
    const entry = await fetchEntry('screenshot', client)
    expect(entry).not.toBeNull()
    expect(client.calls()).toBe(2)
  })

  test('fetchEntry returns null after exhausting attempts', async () => {
    const client = createClient({ failures: ATTEMPTS })
    const entry = await fetchEntry('screenshot', client)
    expect(entry).toBeNull()
    expect(client.calls()).toBe(ATTEMPTS)
  })

  test('demo verticals never include search', () => {
    expect(DEMO_URLS.search).toBeUndefined()
    expect(REQUEST_OPTS.search).toEqual({})
  })

  test('writes every snapshot plus a manifest, then reuses them', async () => {
    const dist = await tmpDist()
    const client = createClient()
    await provider({ client, dist })
    const manifest = JSON.parse(readFileSync(path.join(dist, 'index.json')))
    expect(Object.keys(manifest).sort()).toEqual(Object.keys(DEMO_URLS).sort())
    for (const vertical of Object.keys(DEMO_URLS)) {
      expect(existsSync(path.join(dist, `${vertical}.json`))).toBe(true)
    }
    const before = client.calls()
    await provider({ client, dist })
    expect(client.calls()).toBe(before)
  })

  test('skips failing verticals but keeps the rest', async () => {
    const dist = await tmpDist()
    const client = createClient({ failUrls: [DEMO_URLS.screenshot] })
    await provider({ client, dist })
    const manifest = JSON.parse(readFileSync(path.join(dist, 'index.json')))
    expect(manifest.screenshot).toBeUndefined()
    expect(manifest.pdf).toBeDefined()
    expect(existsSync(path.join(dist, 'screenshot.json'))).toBe(false)
  })

  test('fails loudly and writes no manifest when every fetch fails', async () => {
    const dist = await tmpDist()
    const client = createClient({ failures: Infinity })
    await expect(provider({ client, dist })).rejects.toThrow(
      'HERO_DEMO_UNAVAILABLE'
    )
    expect(existsSync(path.join(dist, 'index.json'))).toBe(false)
    await provider({ client: createClient(), dist })
    expect(existsSync(path.join(dist, 'index.json'))).toBe(true)
  })
})
