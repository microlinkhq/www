import { existsSync, readFileSync } from 'node:fs'
import { mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import provider from '../../scripts/fetch-data/providers/fetch-hero-demo.js'
import heroDemoRequests from '../../src/components/pages/home/hero-demo-requests.js'

const { DEMO_URLS, SNAPSHOT_URLS, REQUEST_OPTS } = heroDemoRequests
const { toEntry, dist } = provider

const createClient = ({ failUrls = [] } = {}) => {
  let calls = 0
  const client = async url => {
    calls++
    if (failUrls.includes(url)) throw new Error('boom')
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

  test('demo verticals never include search', () => {
    expect(DEMO_URLS.search).toBeUndefined()
    expect(REQUEST_OPTS.search).toEqual({})
  })

  test('writes every snapshot plus a manifest, then reuses them', async () => {
    const dist = await tmpDist()
    const client = createClient()
    await provider({ client, dist })
    const manifest = JSON.parse(readFileSync(path.join(dist, 'index.json')))
    expect(Object.keys(manifest).sort()).toEqual(
      Object.keys(SNAPSHOT_URLS).sort()
    )
    for (const vertical of Object.keys(SNAPSHOT_URLS)) {
      expect(existsSync(path.join(dist, `${vertical}.json`))).toBe(true)
    }
    const before = client.calls()
    await provider({ client, dist })
    expect(client.calls()).toBe(before)
  })

  test('removes stale snapshots for verticals no longer covered', async () => {
    const dist = await tmpDist()
    await writeFile(path.join(dist, 'lighthouse.json'), '{}')
    await writeFile(path.join(dist, 'retired.json'), '{}')
    await provider({ client: createClient(), dist })
    expect(existsSync(path.join(dist, 'lighthouse.json'))).toBe(false)
    expect(existsSync(path.join(dist, 'retired.json'))).toBe(false)
    expect(existsSync(path.join(dist, 'screenshot.json'))).toBe(true)
  })

  test('fails the build when any snapshot fetch fails', async () => {
    const dist = await tmpDist()
    const client = createClient({ failUrls: [DEMO_URLS.pdf] })
    await expect(provider({ client, dist })).rejects.toThrow('boom')
    expect(existsSync(path.join(dist, 'index.json'))).toBe(false)
  })
})
