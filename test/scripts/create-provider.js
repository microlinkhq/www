import { expect, describe, it } from 'vitest'
import { mkdtemp, readFile, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'

import { fromCode } from '../../scripts/fetch-data/create-provider'
import { isFresh } from '../../scripts/fetch-data/providers/fetch-analytics'

const tmpFile = async () =>
  path.join(await mkdtemp(path.join(tmpdir(), 'create-provider-')), 'data.json')

const FRESH = [{ reqs_pretty: '200M', cdn_edges: 337 }]
const STALE = [{ reqs_pretty: '200M' }]

describe('fromCode', () => {
  it('writes when the file is missing', async () => {
    const dist = await tmpFile()
    let calls = 0
    await fromCode(async () => ++calls && FRESH, { dist, isFresh })
    expect(calls).toBe(1)
    expect(JSON.parse(await readFile(dist))).toEqual(FRESH)
  })

  it('skips when the existing file passes isFresh', async () => {
    const dist = await tmpFile()
    await writeFile(dist, JSON.stringify(FRESH))
    let calls = 0
    await fromCode(async () => ++calls && FRESH, { dist, isFresh })
    expect(calls).toBe(0)
  })

  it('rewrites when the existing file fails isFresh', async () => {
    const dist = await tmpFile()
    await writeFile(dist, JSON.stringify(STALE))
    let calls = 0
    await fromCode(async () => ++calls && FRESH, { dist, isFresh })
    expect(calls).toBe(1)
    expect(JSON.parse(await readFile(dist))).toEqual(FRESH)
  })

  it('rewrites when the existing file is not valid JSON', async () => {
    const dist = await tmpFile()
    await writeFile(dist, 'not json')
    let calls = 0
    await fromCode(async () => ++calls && FRESH, { dist, isFresh })
    expect(calls).toBe(1)
    expect(JSON.parse(await readFile(dist))).toEqual(FRESH)
  })

  it('keeps legacy behavior without isFresh: any non-empty file is reused', async () => {
    const dist = await tmpFile()
    await writeFile(dist, JSON.stringify(STALE))
    let calls = 0
    await fromCode(async () => ++calls && FRESH, { dist })
    expect(calls).toBe(0)
  })
})

describe('isFresh', () => {
  it('accepts entries with a numeric cdn_edges and reqs_pretty', () => {
    expect(isFresh(FRESH)).toBe(true)
  })

  it('rejects entries missing cdn_edges', () => {
    expect(isFresh(STALE)).toBe(false)
  })

  it('rejects empty or non-array payloads', () => {
    expect(isFresh([])).toBe(false)
    expect(isFresh({})).toBe(false)
    expect(isFresh(undefined)).toBe(false)
  })
})
